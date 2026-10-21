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
var ratio = 1/2.5;
function buildUI(obj){
    obj.setParameter("name","Hex Gosper");
    
    obj.addParameterFloat("length",1,.005,100,true,true);
    obj.addParameterInt("levels",1,0,8,true,true);
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

function plot(spln,pnt,len,ang,lvl) {
	if(lvl == 0 ) {
		//print("point ("+pnt.x+","+pnt.y+","+pnt.z+")  len = " + len);
		var p = new Vec3D(0,0,0);
		var t = new Mat4D(TRANSLATE,len,0,0);
		var m = new Mat4D(ROTATE,0,0,ang);
		p = m.multiply(t.multiply(p));
		pnt = pnt.add(p);
		spln.line(pnt);
		return new Array(pnt,ang);
	}
	var a;
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] + 60;
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] + 120;
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] - 60;
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] - 120;
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1];
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1]-60;
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1]+60;
	return new Array(pnt,ang);
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
		return new Array(pnt,ang);
	}
	var a;
	ang -= 60;
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] + 60;
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1];
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] + 120;
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] + 60;
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] - 120;
	a = plot (spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1] - 60;
	a = plot1(spln,pnt,len*ratio,ang,lvl - 1);	pnt = a[0]; ang = a[1];
	return new Array(pnt,ang);
}
