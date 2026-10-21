// Source: https://www.cheetah3d.com/forum/index.php?threads/1456/post-9193
// Author: Herb (Cheetah3D forum), posted 2007-03-25
// Thread: "Coils and Arrows"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// TorusCoil.js
// (c) 2006 Looser Herbert	
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a spline to build a torus coil.
//

var velocity1	= 10.0;
var velocity2	= 1;
var radius1		= 1.0;
var radius2		= 2.0;
var TorusAngle	= 350;
var dphi_grad	= 1;


function buildUI(obj){
    obj.setParameter("name","TorusCoil");
    
    obj.addParameterFloat("velocity1",10,0,1000,true,true);
    obj.addParameterFloat("velocity2",1,0,1000,true,true);
    obj.addParameterFloat("radius1",1,0,10,true,true);
    obj.addParameterFloat("radius2",2,1,100,true,true);
    obj.addParameterFloat("TorusAngle",350,0,360,true,true);
    obj.addParameterFloat("dphi_grad",1,0,90,true,true);
}


function buildObject(obj){
    var spline=obj.core();
    var x;
    var y;
    var z;
    
    
    velocity1=obj.getParameter("velocity1");
    velocity2=obj.getParameter("velocity2");
    radius1=obj.getParameter("radius1");
    radius2=obj.getParameter("radius2");
    dphi_grad=obj.getParameter("dphi_grad");
    TorusAngle=obj.getParameter("TorusAngle");

    var dphi=Math.PI*dphi_grad/180;
    var	phi_end=Math.PI*TorusAngle/180;
    var phi=0.0;
    
	if (dphi>0) {
		for(phi=0;phi<phi_end; phi=phi+dphi){
			x=(radius1*Math.cos(velocity1*phi) + radius2)*Math.sin(velocity2*phi);
			y=(radius1*Math.cos(velocity1*phi) + radius2)*Math.cos(velocity2*phi);
			z=radius1*Math.sin(velocity1*phi);
			var pos=new Vec3D(x,z,y);
		
	
			if(phi==0)    spline.move(pos);
			else	    spline.line(pos);
		}
	}
}