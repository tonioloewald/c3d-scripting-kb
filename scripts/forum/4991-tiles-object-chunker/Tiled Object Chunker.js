// Source: https://www.cheetah3d.com/forum/index.php?threads/4991/post-35691
// Author: Physt (Cheetah3D forum), posted 2009-11-23
// Thread: "Tiles Object Chunker"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------


var tTriangulate = false;
var tGridWidth = 0;
var tPolyNum = 0;
var tName = '';
var tObjIndex = 0;
var tObj = null;
var tCore = null;
var tMatrix = null;

var min = new Vec3D(0, 0, 0);
var max = new Vec3D(0,  0, 0);

function buildUI( tool ) {
	
	tool.addParameterSeparator('Object Chunker');
	tool.addParameterInt('grid width', 2, 1, 100, false, false);
	tool.addParameterBool('triangulate', 1, 0, 1, false, false);
	
	tool.addParameterButton('make chunk', 'make', 'makeChunk');
}

function makeChunk( tool ) {
	var doc = tool.document();
	var obj = doc.selectedObject();
	
	if (!obj && (obj.type() == FOLDER || obj.family() == NGONFAMILY)) {
		OS.messageBox('No available object is selected.', 'A object or folder selection required.');
		return;
	}
	
	tObjIndex = 0;
	tPolyNum = 0;
	tObj = null;
	tCore = null;
	tGridWidth = tool.getParameter('grid width');
	tTriangulate = tool.getParameter('triangulate');
	
	tName = obj.getParameter('name');
	
    // find x z extent of object

    CreateTiles(tool, obj, tGridWidth);
}

function findExtent( obj ) {
    if (obj.family() == NGONFAMILY) {
        var tMatrix = obj.obj2WorldMatrix();
		var core = obj.modCore();
		var polygonCount = core.polygonCount();
        
        for (var i = 0;i < polygonCount;i++) {
            var polygonSize = core.polygonSize( i );
            var verts = [];
            var uvs = [];
            
            for (var j = 0; j < polygonSize; j++ ) {
                    v = tMatrix.multiply( core.vertex( core.vertexIndex( i, j ) ) );
                    
                    if (v.x < min.x) {
                        min.x = v.x;
                    }
                    
                    if (v.y < min.y) {
                        min.y = v.y;
                    }
                    
                    if (v.z < min.z) {
                        min.z = v.z;
                    }
                    
                    
                    if (v.x > max.x) {
                        max.x = v.x;
                    }
                    
                    if (v.y > max.y) {
                        max.y = v.y;
                    }
                    
                    if (v.z > max.z) {
                        max.z = v.z;
                    }
            }
        }
    }
}

function CreateTiles(tool, obj, cellNumber)
{
    var delta = new Vec3D(0, 0, 0);
    
    findExtent( obj );

    print("CellNumber = " + cellNumber + "\n");

    delta.x = (max.x - min.x) / cellNumber;
    delta.y = (max.y - min.y);
    delta.z = (max.z - min.z) / cellNumber;
    print("DELTA: " + delta.x + ", " + delta.y + ", " + delta.z + "\n");

    var y = min.y;
    var ix = 0;
    for (var x=min.x; x<max.x; x+=delta.x) {
        var iz = 0;
        for (var z=min.z; z<max.z; z+=delta.z) {

            var p1 = new Vec3D(0, 0, 0);
            p1.x = x;
            p1.y = y;
            p1.z = z;

            var p2 = new Vec3D(0, 0, 0);
            p2.x = x + delta.x;
            p2.y = y + delta.y;
            p2.z = z + delta.z;

            print("CELL [" + ix +", " + iz +"]  ");
            makeChunkFromObject( tool, obj, ix, iz, p1, p2 );
            iz++;
        }
    ix++;
    }
}


function isPointInside(verts, p1, p2)
{

    // check first point of poly
    //var p = verts[0];
    
    var p = new Vec3D(0, 0, 0);
    
    for (i=0; i<verts.length; i++) {
        p.x += verts[i].x;
        p.y += verts[i].y;
        p.z += verts[i].z;
    }
    
    p.x /= verts.length;
    p.y /= verts.length;
    p.z /= verts.length;
    
    if (p.x >= p1.x && p.x <= p2.x) {
        if (p.y >= p1.y && p.y <= p2.y) {
            if (p.z >= p1.z && p.z <= p2.z) {
                return true;
            }
        }
    }
    
    return false;
}


function makeChunkFromObject( tool, obj, ix, iz, p1, p2 ) {
	
	if (obj.family() == NGONFAMILY) {
		tMatrix = obj.obj2WorldMatrix();
		var core = obj.modCore();
		
		var polygonCount = core.polygonCount();
		for (var i = 0;i < polygonCount;i++) {
			if (!tObj) {
				tObj = tool.document().addObject( POLYGONOBJ );
				tool.document().root().addChildAtIndex( tObj, tool.document().root().childCount() );
				
				//var tObjIndex_str = '' + tObjIndex;
				//while (tObjIndex_str.length < 4) {
				//	tObjIndex_str = '0' + tObjIndex_str;
				//}
				
				//tObj.setParameter("name", tName+'_'+tObjIndex_str);
                tObj.setParameter("name", tName+'_'+ix+'_'+iz);
				tObj.setParameter("normalType", obj.getParameter("normalType"));
				tObj.setParameter("normalAngle", obj.getParameter("normalAngle"));
				tCore = tObj.core();
			}
            
			var polygonSize = core.polygonSize( i );
			
			if (tTriangulate) {
				for (var k = 0;k < polygonSize - 2;k++) {
					var verts = [];
					var uvs = [];
					var indices = core.triangle( i, k );
					print(indices);
					for (var j = 0;j < 3;j++) {
						verts.push( tMatrix.multiply( core.vertex( core.vertexIndex( i, indices[j] ) ) ) );
						uvs.push( core.uvCoord( i, indices[j]) );
					}
                    
                    if (isPointInside(verts, p1, p2)) {
                        var pi = tCore.addPolygon( 3, true, verts );
                        for (var j = 0;j < 3;j++) {
                            tCore.setUVCoord( pi, j, uvs[j] );
                        }
                        tPolyNum++;
                    }
				}
			} else {
				var verts = [];
				var uvs = [];
				for (var j = 0;j < polygonSize;j++) {
					verts.push( tMatrix.multiply( core.vertex( core.vertexIndex( i, j ) ) ) );
					uvs.push( core.uvCoord( i, j ) );
				}
				if (polygonSize > 2) {
                    if (isPointInside(verts, p1, p2)) {
                        var pi = tCore.addPolygon( polygonSize, true, verts );
                        for (var j = 0;j < polygonSize;j++) {
                            tCore.setUVCoord( pi, j, uvs[j] );
                        }
                        tPolyNum++;
                    }
				}
			}
			
            // No longer need the poly limit
			//if (tPolyNum >= tPolyCount) {
			//	tObj = null;
			//	tPolyNum = 0;
			//	tObjIndex++;
			//}
		}
        
        // clear these values so we make a new object the next time we come in here
        tObj = null;
		tPolyNum = 0;
		tObjIndex++;
		
	}
    
	var childCount = obj.childCount();
        for (var i = 0;i < childCount;i++) {
            makeChunkFromObject( tool, obj.childAtIndex( i ) );
	}
}