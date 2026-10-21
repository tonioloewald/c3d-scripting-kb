// Source: https://www.cheetah3d.com/forum/index.php?threads/4394/post-30844
// Author: tg_jp (Cheetah3D forum), posted 2009-07-21
// Thread: "Cheetah have facility for slicing an object into arbitrary complexity?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Obect Chunker.js

/*
Vec3D.prototype.toString = function() {
	return this.x.toFixed(3) + ' ' + this.y.toFixed(3) + ' ' + this.z.toFixed(3);
}
*/

var tTriangulate = false;
var tPolyCount = 0;
var tPolyNum = 0;
var tName = '';
var tObjIndex = 0;
var tObj = null;
var tCore = null;
var tMatrix = null;

var bspMin = new Vec3D(-100, -100, -100);
var bspMax = new Vec3D( 100,  100,  100);

function buildUI( tool ) {
	
	tool.addParameterSeparator('Object Chunker');
	tool.addParameterInt('target poly count', 2000, 10, 100000000, false, false);
	tool.addParameterBool('triangulate', 0, 0, 1, false, false);
	
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
	tPolyCount = tool.getParameter('target poly count');
	tTriangulate = tool.getParameter('triangulate');
	
	tName = obj.getParameter('name');
	
	makeChunkFromObject( tool, obj );
}

function makeChunkFromObject( tool, obj ) {
	
	if (obj.family() == NGONFAMILY) {
		tMatrix = obj.obj2WorldMatrix();
		var core = obj.modCore();
		
		var polygonCount = core.polygonCount();
		for (var i = 0;i < polygonCount;i++) {
			if (!tObj) {
				tObj = tool.document().addObject( POLYGONOBJ );
				tool.document().root().addChildAtIndex( tObj, tool.document().root().childCount() );
				
				var tObjIndex_str = '' + tObjIndex;
				while (tObjIndex_str.length < 4) {
					tObjIndex_str = '0' + tObjIndex_str;
				}
				
				tObj.setParameter("name", tName+'_'+tObjIndex_str);
				tObj.setParameter("normalType", obj.getParameter("normalType"));
				tObj.setParameter("normalAngle", obj.getParameter("normalAngle"));
				
				tCore = tObj.core();
				//tCore.buildVertexBSP( bspMin, bspMax );
			}
			var polygonSize = core.polygonSize( i );
			
			if (tTriangulate) {
				for (var k = 0;k < polygonSize - 2;k++) {
					var verts = [];
					var uvs = [];
					var indices = core.triangle( i, k );
					//print(indices);
					for (var j = 0;j < 3;j++) {
						verts.push( tMatrix.multiply( core.vertex( core.vertexIndex( i, indices[j] ) ) ) );
						uvs.push( core.uvCoord( i, indices[j]) );
					}
					var pi = tCore.addPolygon( 3, true, verts );
					for (var j = 0;j < 3;j++) {
						tCore.setUVCoord( pi, j, uvs[j] );
					}
					tPolyNum++;
				}
			} else {
				var verts = [];
				var uvs = [];
				for (var j = 0;j < polygonSize;j++) {
					verts.push( tMatrix.multiply( core.vertex( core.vertexIndex( i, j ) ) ) );
					uvs.push( core.uvCoord( i, j ) );
				}
				if (polygonSize > 2) {
					var pi = tCore.addPolygon( polygonSize, true, verts );
					for (var j = 0;j < polygonSize;j++) {
						tCore.setUVCoord( pi, j, uvs[j] );
					}
					tPolyNum++;
				}
			}
			
			if (tPolyNum >= tPolyCount) {
				//tCore.destroyVertexBSP();
				
				tObj = null;
				tPolyNum = 0;
				tObjIndex++;
			}
		}
		
	}
	var childCount = obj.childCount();
	for (var i = 0;i < childCount;i++) {
		makeChunkFromObject( tool, obj.childAtIndex( i ) );
	}
}