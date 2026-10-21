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
var flag = true;

function buildUI(obj){
    obj.setParameter("name","hilbert");
    
    obj.addParameterFloat("length",1,.005,100,true,true);
    obj.addParameterFloat("a",0,-100,100,true,true);
    obj.addParameterFloat("b",0,-100,100,true,true);
    obj.addParameterInt("levels",1,0,8,true,true);
}


function buildObject(obj){
    var spline=obj.core();
    
    length = obj.getParameter("length");
    var a = obj.getParameter("a");
    var b = obj.getParameter("b");
    var level = obj.getParameter("levels");
	flag = true;
	var pos = new Vec3D(0,0,0);
//	print("start -----------");
//	print("angle =  "+angle+"  : angle2 = "+angle2);
	spline.move(pos);
	hilbert(spline,-length/2, -length/2 , length, a, b,length, level);
}

function hilbert(spln, x0,  y0,  xis,  xjs,  yis,  yjs,  n)
{
	if(n <= 0) {
//		data[index].x = x0 + (xis + yis)/2;  
//		data[index].y = 0.0;
//		data[index].z = y0 + (xjs + yjs)/2;
//		index++;
		var x = x0 + (xis + yis)/2;  
		var y = 0.0;
		var z = y0 + (xjs + yjs)/2;
		if( flag) {
			flag = false;
			spln.move( new Vec3D(x,y,z));
		} else
			spln.line( new Vec3D(x,y,z));
	} else {
		hilbert(spln,x0,y0,yis/2,yjs/2,xis/2,xjs/2,n - 1);
		hilbert(spln,x0 + xis/2,y0 + xjs/2,xis/2,xjs/2,yis/2,yjs/2,n - 1);
		hilbert(spln,x0 + xis/2 + yis/2,y0 + xjs/2 + yjs/2,xis/2,xjs/2,yis/2,yjs/2, n - 1);
		hilbert(spln,x0 + xis/2 + yis,y0 + xjs/2 + yjs,-yis/2,-yjs/2,-xis/2,-xjs/2,n - 1);
	}
}