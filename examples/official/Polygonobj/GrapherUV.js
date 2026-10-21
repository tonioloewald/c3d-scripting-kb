//
// GrapherUV.js
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

function deg(x){
    return 180.0*x/Math.PI;
    }

function rad(x){
    return Math.PI*x/180.0;
    }

//polygon script hooks
function buildUI(obj) {
    obj.setParameter("name","GrapherUV");
    
    obj.addParameterFloat("U min.",-1.0,-1000,1000,true,true);
    obj.addParameterFloat("U max.",1.0,-1000,1000,true,true);
    obj.addParameterInt("U sections",100,1,1000,true,true);
    
    obj.addParameterFloat("V min.",-1.0,-1000,1000,true,true);
    obj.addParameterFloat("V max.",1.0,-1000,1000,true,true);
    obj.addParameterInt("V sections",100,1,1000,true,true);
    
    obj.addParameterSeparator("Additional parameters");
    obj.addParameterFloat("P0",0.0,-1000,1000,true,true);
    obj.addParameterFloat("P1",0.0,-1000,1000,true,true);
    obj.addParameterFloat("P2",0.0,-1000,1000,true,true);
    obj.addParameterFloat("P3",0.0,-1000,1000,true,true);
    
    obj.addParameterSeparator("Functions");
    obj.addParameterString("X(u,v)","u",true);
    obj.addParameterString("Y(u,v)","u*v",true);
    obj.addParameterString("Z(u,v)","v",true);
	
    obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("normalType",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("normalAngle", 45.0, 5.0, 90.0, true, true);
	
    obj.setParameter("normalType",1);
}


function buildObject(obj) {
    var i,j;
    var uMin = obj.getParameter("U min.");
    var uMax = obj.getParameter("U max.");
    var uSec = obj.getParameter("U sections");
    var vMin = obj.getParameter("V min.");
    var vMax = obj.getParameter("V max.");
    var vSec = obj.getParameter("V sections");
    var p0 = obj.getParameter("P0");
    var p1 = obj.getParameter("P1");
    var p2 = obj.getParameter("P2");
    var p3 = obj.getParameter("P3");
    var core = obj.core();
    
    //compile functions
    var	xEquation=obj.getParameter("X(u,v)");
    var	yEquation=obj.getParameter("Y(u,v)");
    var	zEquation=obj.getParameter("Z(u,v)");
    var func_str="gfunc=function(u,v,p0,p1,p2,p3){ var _X=EQUATION_X;   var _Y=EQUATION_Y;   var _Z=EQUATION_Z;	    return new Vec3D(_X,_Y,_Z);}";
    func_str=func_str.replace(/EQUATION_X/g, xEquation);
    func_str=func_str.replace(/EQUATION_Y/g, yEquation);
    func_str=func_str.replace(/EQUATION_Z/g, zEquation);
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
    func_str=func_str.replace(/PI/g,    "Math.PI");
    
    eval(func_str);
    if(gfunc==null) return;
   
    //create vertices
    for(i=0;i<=uSec;i++){
	for(j=0;j<=vSec;j++){
	    var u=(uMax-uMin)*i/(uSec) + uMin;
	    var v=(vMax-vMin)*j/(vSec) + vMin;
	    
	    core.addVertex(false,gfunc(u,v,p0,p1,p2,p3));
	    }
	}
    
    //create quads
    var	secZP1=vSec+1;
    var	vindex=[0,0,0,0];
    var uvcoord=[new Vec2D(),new Vec2D(),new Vec2D(),new Vec2D()];
    for(i=0;i<uSec;i++){
	for(j=0;j<vSec;j++){
	    vindex[0]=i*secZP1+j;
	    vindex[1]=(i+1)*secZP1+j;
	    vindex[2]=(i+1)*secZP1+(j+1);
	    vindex[3]=i*secZP1+(j+1);
	    uvcoord[0].set(i/uSec,j/vSec);
	    uvcoord[1].set((i+1)/uSec,j/vSec);
	    uvcoord[2].set((i+1)/uSec,(j+1)/vSec);
	    uvcoord[3].set(i/uSec,(j+1)/vSec);
	    
	    core.addIndexPolygon(4, vindex,uvcoord);
	    }
	}
}



