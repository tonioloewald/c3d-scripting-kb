// Source: https://www.cheetah3d.com/forum/index.php?threads/1211/post-7666
// Author: ToddWR (Cheetah3D forum), posted 2007-01-12
// Thread: "fun with fractals"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// koch.js
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom spline object.
//

var length	= 1;
var newlength = Math.sqrt(2);
function buildUI(obj){
    obj.setParameter("name","dragon");
    
    obj.addParameterFloat("length",1,.005,100,true,true);
    obj.addParameterInt("levels",1,0,18,true,true);
}


function buildObject(obj){
    var spline=obj.core();
    
    length = obj.getParameter("length");
    var level = obj.getParameter("levels");
	
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
		var p = new Vec3D(0,0,0);
		var t = new Mat4D(TRANSLATE,len,0,0);
		var m = new Mat4D(ROTATE,0,0,ang);
		p = m.multiply(t.multiply(p));
		pnt = pnt.add(p);
		spln.line(pnt);
		return pnt;
	}
	pnt = plot(spln,pnt,len/newlength,ang+45,lvl - 1);
	pnt = plot1(spln,pnt,len/newlength,ang-45,lvl -1);
	return pnt;
}

function plot1(spln,pnt,len,ang,lvl) {
	if(lvl == 0 ) {
		//print("point ("+pnt.x+","+pnt.y+","+pnt.z+")  len = " + len);
		var p = new Vec3D(0,0,0);
		var t = new Mat4D(TRANSLATE,len,0,0);
		var m = new Mat4D(ROTATE,0,0,ang);
		p = m.multiply(t.multiply(p));
		pnt = pnt.add(p);
		spln.line(pnt);
		return pnt;
	}
	pnt = plot(spln,pnt,len/newlength,ang-45,lvl - 1);
	pnt = plot1(spln,pnt,len/newlength,ang+45,lvl -1);
	return pnt;
}
