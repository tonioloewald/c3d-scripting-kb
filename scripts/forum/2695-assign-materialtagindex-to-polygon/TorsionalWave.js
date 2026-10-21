// Source: https://www.cheetah3d.com/forum/index.php?threads/2695/post-18593
// Author: Herb (Cheetah3D forum), posted 2008-02-19
// Thread: "Assign materialTagIndex to Polygon"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  TorsionalWave.js
//
//  
//  required version : Cheetah3D v3.4
//	Herbert Looser
//  deduced from "PointArray.js" by 2006 Hiroto Tsubaki
//
//	2008-2-15
//
//	Creates "NCopies" copies of a master, shifting each by .. and rotating it around the x-axis in a "wavy manner".
//	Set wavelength, amplitude and phase of this torsional wave by setting the parameters.
//
//	The z-extension of the objects can be increased/decreased by setting "dz rel"≠0. If you set "dzrel"=-0.1, 
//	the z-extension of the first copy will be 0.9 times the extension of the master, second will have 0.8, third has 0.7 ..
//	"dz rel" thus produces a wedge that allows to connect two wave-media with different z-extensions.
//	In reality, the wavelength changes in such a wedged medium. However, if the wedge is short, nonexperts will not notice.
//
//
//	Usage: Place this script into scripts/Polygonobj folder. 
//	Restart Cheetah3D, then select from Tools -> Script -> Polygon Script -> TorsionalWave
//	Create a cylinder with radius 0.01 and make it a child of "Torsional Wave".
//	Select the "Torsional Wave" in the Object browser and set the checkbox "create wave". Enjoy.
//

function buildUI(obj){
    var normalType, normalAngle;
    
    obj.setParameter("name","Torsional Wave");
    
    obj.addParameterButton("update","Update","objectUpdate");

    obj.addParameterSeparator("Wave Properties");
    obj.addParameterBool("create wave",0,0,1,true,true);
    obj.addParameterFloat("shift x",0.02,-1000,1000,true,true);
    obj.addParameterFloat("shift y",0,-1000,1000,true,true);
    obj.addParameterFloat("shift z",0,-1000,1000,true,true);
	obj.addParameterFloat("dz rel",0,-1,1000,true,true);
    obj.addParameterSeparator("---")
    obj.addParameterInt("NCopies",25,0,1000,true,true);
    obj.addParameterFloat("Amplitude",5,0,10000,true,true);
    obj.addParameterFloat("WLength",12.5,2,1000,true,true);
    obj.addParameterFloat("Phase",0,-360,360,true,true);
    
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
}


function objectUpdate(obj) {
    obj.update();
}


function copyMasterToVertex(core, masterCore, masterMat, posV,  rotV, dzrel, iter) {
    var i, j;
    var truescalez=1+iter*dzrel;
	if	(truescalez <= 0) {
		truescalez = -dzrel;					//scale becomes smaller, if dzrel is negative
	}
	var polyCount = masterCore.polygonCount();  // number of polygons in master
    var vertexCount = masterCore.vertexCount();  // .. of vertex
    
    var trans = new Mat4D(TRANSLATE,posV.x,posV.y,posV.z);
    var rot =	new Mat4D(ROTATE,rotV.x,rotV.y,rotV.z);
	var scale=	new Mat4D(SCALE,1,1,truescalez);
    
    for (i = 0;i < vertexCount;i++) {
        var vert = masterMat.multiply(masterCore.vertex(i));
        vert = trans.multiply(rot.multiply(scale.multiply(vert)));
        core.addVertex(false, vert);				//without vertex test, because we are copying an existing object
    }
    
	for (i = 0;i < polyCount;i++) {
        var size = masterCore.polygonSize(i);		// determine size of polygon
        var verts = new Array;
        var uvs = new Array;
        for (j = 0;j < size;j++) {
            verts[j]= masterCore.vertexIndex(i, j)+(iter*vertexCount);  // index of the new vertex
            uvs[j]	= masterCore.uvCoord(i,j);
		}
						
		core.addIndexPolygon(size, verts, uvs);		// add polygon to core
	}
	
	// code for copy polygonselection to core from masterCore
	for (i = 0;i < 16;i++) {						// poly selection index 0 to 15
		masterCore.setActivePolygonSelection(i);	// set polyselection index for materialTag to GET
		core.setActivePolygonSelection(i);			// set polyselection index for materialTag. to SET
		for (j = 0;j < polyCount;j++) {
			if (masterCore.polygonSelection(j)) {	// if polygon is selected with polyselection.
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
    var ncop = obj.getParameter("NCopies");
    var amp = obj.getParameter("Amplitude");
    var wlength = obj.getParameter("WLength");
    var phase = obj.getParameter("Phase");
    var create = obj.getParameter("create wave");

    
    if ((obj.childCount() > 0) && create) {
        var master = obj.childAtIndex(0);
        var masterMat = master.objMatrix();
        
        if (master.family() == NGONFAMILY) {
            var gVert = new Vec3D(0,0,0);
			var gshift= new Vec3D(shx, shy, shz);
            var gRot = new Vec3D(1,0,0);
            var masterCore = master.modCore();
			var ang=0;
			
            
            j = 0;
            for (i = 0;i < ncop;i++) {
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



