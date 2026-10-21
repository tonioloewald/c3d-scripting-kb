// Source: https://www.cheetah3d.com/forum/index.php?threads/10572/post-88889
// Author: Martin (Cheetah3D forum), posted 2014-07-22
// Thread: "Grapher.js  (function plotter)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Grapher.js
// (c) 2014 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Simple function plotter implemented as a polygon script.
//
// Installation:
//		Copy the Grapher.js script to the "~/Library/Application Support/Cheetah3D/Scripts/Polygonobj/" folder and restart Cheetah3D
//

var gfunc=null;

//custom functions
function length(x,y){
    return Math.sqrt(x*x + y*y);
    }

//polygon script hooks
function buildUI(obj) {
    obj.setParameter("name","Grapher");
	
    obj.addParameterFloat("Size X",1.0,0,1000,true,true);
    obj.addParameterFloat("Size Z",1.0,0,1000,true,true);
    obj.addParameterFloat("T",0.0,-1000,1000,true,true);
    obj.addParameterInt("Sections X",100,1,1000,true,true);
    obj.addParameterInt("Sections Z",100,1,1000,true,true);
    obj.addParameterString("f(x,z,t)","x*z",true);
	
    obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
	
    obj.setParameter("smooth",1);
}


function buildObject(obj) {
    var i,j;
    var sizeX = obj.getParameter("Size X");
    var sizeZ = obj.getParameter("Size Z");
    var t = obj.getParameter("T");
    var secX=obj.getParameter("Sections X");
    var secZ=obj.getParameter("Sections Z");
    var equation = obj.getParameter("f(x,z,t)");
    var core = obj.core();
    
    //create Javascript function string from equation
    var func_str="gfunc=function(x,y,t){ return EQUATION;}";
    func_str=func_str.replace(/EQUATION/g, equation);
    func_str=func_str.replace(/abs/g,   "Math.abs");
    func_str=func_str.replace(/ceil/g,  "Math.ceil");
    func_str=func_str.replace(/cos/g,   "Math.cos");
    func_str=func_str.replace(/exp/g,   "Math.exp");
    func_str=func_str.replace(/floor/g, "Math.floor");
    func_str=func_str.replace(/log/g,   "Math.log");
    func_str=func_str.replace(/max/g,   "Math.max");
    func_str=func_str.replace(/min/g,   "Math.min");
    func_str=func_str.replace(/pow/g,   "Math.pow");
    func_str=func_str.replace(/random/g,"Math.random");
    func_str=func_str.replace(/sin/g,   "Math.sin");
    func_str=func_str.replace(/sqrt/g,  "Math.sqrt");
    func_str=func_str.replace(/tan/g,   "Math.tan");
    
    //evaluate function string to generate gfunc
    eval(func_str);
    if(gfunc==null) return;
    
    //create vertices
    for(i=0;i<=secX;i++){
	for(j=0;j<=secZ;j++){
	    var x=sizeX*i/(secX) - 0.5*sizeX;
	    var z=sizeZ*j/(secZ) - 0.5*sizeZ;
	    var y=gfunc(x,z,t);
	    core.addVertex(false,new Vec3D(x,y,z));
	    }
	}
	
    //create quads
    var	secZP1=secZ+1;
    for(i=0;i<secX;i++){
	for(j=0;j<secZ;j++){
	    core.addIndexPolygon(4, [i*secZP1+j,(i+1)*secZP1+j,(i+1)*secZP1+(j+1),i*secZP1+(j+1)]);
	    }
	} 
}



