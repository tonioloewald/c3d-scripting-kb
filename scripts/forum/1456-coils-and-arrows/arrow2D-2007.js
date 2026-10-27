// Source: https://www.cheetah3d.com/forum/index.php?threads/1456/post-9193
// Author: Herb (Cheetah3D forum), posted 2007-03-25
// Thread: "Coils and Arrows"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// arrow2DD.js
// (c) 2006 Herbert Looser
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a 2D-Arrow
//
var points = new Array;

function buildUI(obj){
    obj.setParameter("name","Arrow2D");
    
    obj.addParameterFloat("length",1,0,1000,true,true);
    obj.addParameterFloat("L_of_head",.3,0,1000,true,true);
    obj.addParameterFloat("diam_of_shaft",.1,0,1000,true,true);
    obj.addParameterFloat("diam_of_head",.25,0,1000,true,true);
    obj.addParameterInt("axis",0,0,2,true,true);
    obj.addParameterBool("rot_90",false,false,true,true,true);
    obj.addParameterBool("double",false,false,true,true,true);
    obj.addParameterBool("reverse",false,false,true,true,true);
}

function buildObject(obj){
    var arrow=obj.core();
    var i;
    var x,y,z;
    
    //get current parameter values
    Length			=obj.getParameter("length");
    L_of_head		=obj.getParameter("L_of_head");
    diam_of_shaft 	=obj.getParameter("diam_of_shaft");
    diam_of_head	=obj.getParameter("diam_of_head");
    axes			=obj.getParameter("axis");
    rot				=obj.getParameter("rot_90");
    doubl  			=obj.getParameter("double");
    reverse			=obj.getParameter("reverse");
    
    var x1=diam_of_shaft/2;
    var z1=Length/2-L_of_head;
    var x2=diam_of_head/2;
    var z2=Length/2;
	var	NrOfEdge=7
	if (doubl) {NrOfEdge=10}
	
    var points = new Array;
    if (doubl) { points.push( new Vec3D(x1,0,-z1) ); } else { points.push( new Vec3D(x1,0,-z2) ); }
    points.push( new Vec3D(x1,0,z1) );
    points.push( new Vec3D(x2,0,z1) );
    points.push( new Vec3D(0,0,z2) );
    points.push( new Vec3D(-x2, 0,z1) );
    points.push( new Vec3D(-x1,0,z1) );
	if (doubl) { points.push( new Vec3D(-x1,0,-z1) );} else { points.push( new Vec3D(-x1,0,-z2) );}
    points.push( new Vec3D(-x2, 0,-z1) );
    points.push( new Vec3D(0,0,-z2) );
    points.push( new Vec3D(x2,0,-z1) );
	
	var i;
	if (reverse){
		for (i=0; i<NrOfEdge; i++) {
			reverseP(points[i]);
		}
	}
	
	
	if (rot) {
		for (i=0; i<NrOfEdge; i++) {
		flip(points[i]);
		}
	}
	for (i=0; i<NrOfEdge; i++) {
		rotate(points[i], axes);
	}    
	

	arrow.move(points[0]);	
	for(i=1;i<NrOfEdge; i++) {
		arrow.line(points[i]);
	}

//	arrow.close();
	arrow.line(points[0]);
}

function rotate(pos, axes){
	var posi=new Vec3D();
	posi.x=pos.x;
	posi.y=pos.y;
	posi.z=pos.z;
	if (axes==1) {
		pos.x=posi.y;
		pos.y=posi.z;
		pos.z=posi.x;
		}
	if (axes==2) {
		pos.x=posi.z;
		pos.y=posi.x;
		pos.z=posi.y;
		}
}
	
function flip(pos){
	var posi=new Vec3D();
	posi.x=pos.x;
	posi.y=pos.y;
	pos.x=posi.y;
	pos.y=posi.x;
}

function reverseP(pos){
	var posi=new Vec3D();
	posi.z=pos.z;
	pos.z=-posi.z;
}


//print('set normal:'+normalType+','+normalAngle);