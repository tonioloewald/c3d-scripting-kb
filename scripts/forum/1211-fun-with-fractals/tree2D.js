// Source: https://www.cheetah3d.com/forum/index.php?threads/1211/post-7666
// Author: ToddWR (Cheetah3D forum), posted 2007-01-12
// Thread: "fun with fractals"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// tree2d.js
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom spline object.
//

var length	= 1;
var angl1 = 30.0;
var angl2 = 30.0;
var var1 = 0.0;
var var2 = 0.0;
var rndList = new Array();
var rndCount = 0;

function buildUI(obj){
    obj.setParameter("name","tree2D");
    
    obj.addParameterFloat("length",1,.005,100,true,true);
    obj.addParameterFloat("angle1",30,5,180,true,true);
    obj.addParameterFloat("angle2",30,5,180,true,true);
    obj.addParameterFloat("varation1",0,0,180,true,true);
    obj.addParameterFloat("varation2",0,0,180,true,true);
    obj.addParameterInt("levels",1,0,12,true,true);
    obj.addParameterButton("Re-seed","RESEED","reseed");
}


function buildObject(obj){
    var spline=obj.core();
    
    length = obj.getParameter("length");
	angl1 = obj.getParameter("angle1");
	angl2 = obj.getParameter("angle2");
	var1 = obj.getParameter("varation1");
	var2 = obj.getParameter("varation2");
    var level = obj.getParameter("levels");
	rndCount = 0; // start rnd at the beginning
	var pos = new Vec3D(0,0,0);
//	print("start -----------");
//	print("angle =  "+angle+"  : angle2 = "+angle2);
	spline.move(pos);
	plot(spline,pos,length,0,level);
}

//	print("point ("+pnt.x+","+pnt.y+","+pnt.z+")  len = " + len);
function plot(spln,pnt,len,ang,lvl) {
	if(lvl == 0 ) {
		//print("point ("+pnt.x+","+pnt.y+","+pnt.z+")  len = " + len);
		var p = new Vec3D(0,len,0);
		var m = new Mat4D(ROTATE,0,0,ang);
		pnt = pnt.add(m.multiply(p));
		spln.line(pnt);
		return pnt;
	}
	var p = new Vec3D(0,len/3,0);
	var m = new Mat4D(ROTATE,0,0,ang);
	pnt = pnt.add(m.multiply(p));
	spln.line(pnt);
	
	plot(spln,pnt,2*len/3,ang+angl1+rnd(var1),lvl -1);
	spln.move(pnt);
	plot(spln,pnt,2*len/3,ang-angl2+rnd(var2),lvl - 1);
	return pnt;
}

function rnd(n) {
	var r;
	if( rndCount < rndList.length) {
		r = rndList[rndCount];
		rndCount = rndCount + 1;
		return r;
	}
	r =  (Math.random() * n * 2) - n;
	rndList[rndCount] = r;
	rndCount = rndCount + 1;
	return r;
}



function reseed(obj) {
	rndCount = 0;
	rndList = new Array();
	obj.update();
}











