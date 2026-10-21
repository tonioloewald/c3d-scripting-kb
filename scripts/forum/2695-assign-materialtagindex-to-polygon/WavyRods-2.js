// Source: https://www.cheetah3d.com/forum/index.php?threads/2695/post-18581
// Author: tg_jp (Cheetah3D forum), posted 2008-02-18
// Thread: "Assign materialTagIndex to Polygon"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// WavyRods.js
//
//  
//  required version : Cheetah3D v3.4
//	Herbert Looser
//  deduced from "PointArray.js" by 2006 Hiroto Tsubaki
//
//	2008-2-15

//	Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//


function buildUI(obj){
    var normalType, normalAngle;
    
    obj.setParameter("name","WChain");
    
    obj.addParameterButton("update","Update","objectUpdate");

    obj.addParameterSeparator("Wave Properties");
    obj.addParameterBool("variation",0,0,1,true,true);
    obj.addParameterFloat("shift x",0.02,-1000,1000,true,true);
    obj.addParameterFloat("shift y",0,-1000,1000,true,true);
    obj.addParameterFloat("shift z",0,-1000,1000,true,true);
	obj.addParameterFloat("dz rel",0,-1,1000,true,true);
    obj.addParameterSeparator("---")
    obj.addParameterInt("NCyls",25,0,1000,true,true);
    obj.addParameterFloat("Amplitude",10,0,180,true,true);
    obj.addParameterFloat("WLength",5,2,1000,true,true);
    obj.addParameterFloat("Phase",0,-100000,100000,true,true);
    
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


function copyMasterToVertex(core, masterCore, masterMat, posV,  rotV, dzrel, iter) {
    var i, j;
    var truescalez=1+iter*dzrel;
	if	(truescalez <= 0) {
		truescalez = -dzrel;	//scale can only  become smaller, if dzrel is negative
	}
	var polyCount = masterCore.polygonCount();  // number of polygons in master
    var vertexCount = masterCore.vertexCount();  // .. of vertex
    
    var trans = new Mat4D(TRANSLATE,posV.x,posV.y,posV.z);
    var rot =	new Mat4D(ROTATE,rotV.x,rotV.y,rotV.z);
	var scale=	new Mat4D(SCALE,1,1,truescalez);
    //print(iter*scalez); 
    
    for (i = 0;i < vertexCount;i++) {
        var vert = masterMat.multiply(masterCore.vertex(i));
        vert = scale.multiply(trans.multiply(rot.multiply(vert)));
        core.addVertex(false, vert);	//without test if already existing
    }
    
	for (i = 0;i < polyCount;i++) {
        var size = masterCore.polygonSize(i);	// determine size of polygon
        var verts = new Array;
        var uvs = new Array;
        for (j = 0;j < size;j++) {
            verts[j]= masterCore.vertexIndex(i, j)+(iter*vertexCount);  // index of the new vertex
            uvs[j]	= masterCore.uvCoord(i,j);
		}
        //var materialIndex=masterCore.materialTagIndex(i); // return document's material index, not polyselection index!
						
		core.addIndexPolygon(size, verts, uvs);		// add polygon to core
		
		//core.setActivePolygonSelection(materialIndex);
		//core.setPolygonSelection(i+iter*polyCount, true); // add polygon to selection group
	}
	
	// code for copy polygonselection to core from masterCore
	for (i = 0;i < 16;i++) { // poly selection index 0 to 15
		masterCore.setActivePolygonSelection(i); // set polyselection index for materialTag to GET
		core.setActivePolygonSelection(i); // set polyselection index for materialTag. to SET
		for (j = 0;j < polyCount;j++) {
			if (masterCore.polygonSelection(j)) { // if polygon is selected with polyselection.
				core.setPolygonSelection(j+iter*polyCount, true);
			}
		}
	}
} 

function buildObject(obj){
    var core = obj.core();
    var h,i,j,k;
    
    var shx = obj.getParameter("shift x");
    var shy = obj.getParameter("shift y");
    var shz = obj.getParameter("shift z");
	var dzrel = obj.getParameter("dz rel");
    var ncyl = obj.getParameter("NCyls");
    var amp = obj.getParameter("Amplitude");
    var wlength = obj.getParameter("WLength");
    var phase = obj.getParameter("Phase");
    var variation = obj.getParameter("variation");

    
    if ((obj.childCount() > 0) && variation) {
        var master = obj.childAtIndex(0);
        var masterMat = master.objMatrix();
        
        if (master.family() == NGONFAMILY) {
            var gVert = new Vec3D(0,0,0);
			var gshift= new Vec3D(shx, shy, shz);
            var gRot = new Vec3D(1,0,0);
            var masterCore = master.modCore();
			var ang=0;
			
            
            j = 0;
            for (i = 0;i < ncyl;i++) {
				ang=amp*Math.sin(i*2*Math.PI/wlength-Math.PI/180*phase);
				gRot.x=ang;
                copyMasterToVertex(core,masterCore,masterMat,gVert,gRot,dzrel,j);
				gVert=gVert.add(gshift);
                j++;
            }
            
        }
    }  
}

function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}



