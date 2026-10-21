// Source: https://www.cheetah3d.com/forum/index.php?threads/6604/post-52345
// Author: Herb (Cheetah3D forum), posted 2010-12-01
// Thread: "Mirror PolygonObjects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Mirror.js
//
//  required version : Cheetah3D v5.6
//	Herbert Looser Dez. 1. 2010
//      
//	Use: Place this into scripts/Polygonobj folder. Select from Tools -> Script -> Polygon Script
//      Add a plane and a general polygon object as children to the object and invoke "update"
//	to mirror the object.
//	The mirror-plane might also be defined by a general polygon object, of which the first three vertices
//      define the mirror plane (numbering of vertices according to internals)


function buildUI(obj){
    var normalType, normalAngle;
    
    obj.setParameter("name","mirror");
    
    obj.addParameterButton("update","Update","objectUpdate");

    obj.setParameter("normalType",2); //?
    obj.setParameter("normalAngle",45.0); //?
    
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterInt("smooth type", 2,0,2,true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    obj.addParameterButton("set smooth","Set","setSmooth");
    
    setSmooth(obj);       
}


function setSmooth(obj) {
    var normalType = obj.getParameter("smooth type");
    var normalAngle = obj.getParameter("smooth angle");
    obj.setParameter("normalType",normalType);
    obj.setParameter("normalAngle",normalAngle);
    
    normalType = obj.getParameter("normalType");
    normalAngle = obj.getParameter("normalAngle");
}

function objectUpdate(obj) {
    obj.update();
}


function CreateMirrorImage(core, Orig,  Normal, OriginToMirror) {
    var objToWorld = new Mat4D();
    var vert       = new Vec3D(0,0,0);
    var mirrorVec  = new Vec3D(0,0,0);
    var i, j, polysize, materialIndex, pindex;
    var OrigCore = Orig.modCore();
    var vertexCount = OrigCore.vertexCount();  // number of vertices in master	
    var polyCount = OrigCore.polygonCount();  // number of polygons in master
    var skalarprod;
    var materialIndex;
    var existingVerts = core.vertexCount();
    
    objToWorld = Orig.objMatrix();

    for (i = 0;i < vertexCount;i++) {
        vert = objToWorld.multiply( OrigCore.vertex(i) );
	skalarprod = 2*( skProd(OriginToMirror,Normal) - skProd(vert,Normal) );
	mirrorVec  = Normal.multiply(skalarprod);
	vert = vert.add(mirrorVec);
        core.addVertex(false, vert);	//without test whether already existing
    }

    for (i = 0;i < polyCount;i++) {
        var verts = new Array;
        var uvs   = new Array;
    
        polySize  = OrigCore.polygonSize(i);	// determine size of polygon
	for (j = 0; j < polySize; j++) {
	    verts[j]    = OrigCore.vertexIndex(i, polySize-1-j)+existingVerts;  // index of the new vertex
	    uvs[j]	= OrigCore.uvCoord( i,polySize-1-j);
	}
	pindex = core.addIndexPolygon(polySize, verts);		// add polygon to core
	for (j=0; j < polySize; j++) {
	    core.setUVCoord(pindex, j, uvs[j]);
	}
	materialIndex = OrigCore.materialTagIndex(i);
	core.setActivePolygonSelection(materialIndex);
	core.setPolygonSelection(i, true); // add polygon to selection group
    }
} 

function buildObject(obj){
    if  (obj.childCount() > 1) {
        var mirrorPlane = obj.childAtIndex(0);
        if (mirrorPlane.family() == NGONFAMILY) {
	    var mirrorPlaneCore = mirrorPlane.modCore();
	    var core = obj.core();
	    var objToWorld = new Mat4D();
            var Vert0 = new Vec3D(0,0,0);
            var Vert1 = new Vec3D(0,0,0);
            var Vert2 = new Vec3D(0,0,0);
	    var Vec01 = new Vec3D(0,0,0);
	    var Vec02 = new Vec3D(0,0,0);
            var Normal = new Vec3D(0,0,0);
            var OriginToMirror = new Vec3D(0,0,0);
	    
	    objToWorld = mirrorPlane.objMatrix();
            Vert0 = objToWorld.multiply(mirrorPlaneCore.vertex(0));
            Vert1 = objToWorld.multiply(mirrorPlaneCore.vertex(1));
            Vert2 = objToWorld.multiply(mirrorPlaneCore.vertex(2));
            Vec01 = Vert1.add(Vert0.multiply(-1));
            Vec02 = Vert2.add(Vert0.multiply(-1));
            Normal = Vec01.cross(Vec02);
            Normal = Normal.multiply( 1/Normal.norm() ); // normal vector (unity) on mirror plane
            OriginToMirror = Normal.multiply(Normal.dot(Vert0)); // Vector Origin - Mirror Plane
		
	    for (i=1; i < obj.childCount(); i++ ) {
		var Orig = obj.childAtIndex(i);
		var matTags = new Array;
		if (Orig.family() == NGONFAMILY) {
		    CreateMirrorImage(core, Orig,  Normal, OriginToMirror);
		}
		
	    }
        }
    }
}
    
function skProd(vec1,vec2) {
    var result = vec1.x*vec2.x+vec1.y*vec2.y+vec1.z*vec2.z;
    return result;
}

function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
    }