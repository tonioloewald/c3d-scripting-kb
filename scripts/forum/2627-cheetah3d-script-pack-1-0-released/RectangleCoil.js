// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// RectangleCoil.js
// (c) 2006 Looser Herbert	
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a Spline for building a coil with rectangular shape.
//

var pitch		= 0.1;
var widthA		= 1.0;
var widthB		= 2.0;
var turns		= 10;
var cRadius		= 0.2;
var NptsC		=	5;


function buildUI(obj){
    obj.setParameter("name","Rechteckspule");
    
    obj.addParameterFloat("pitch",0.01,0,10,true,true);
    obj.addParameterFloat("widthA",2,0,1000,true,true);
    obj.addParameterFloat("widthB",1,0,1000,true,true);
    obj.addParameterInt("turns",10,1,1000,true,true);
    obj.addParameterFloat("cornerRadius",0.2,0,20,true,true);
    obj.addParameterInt("NptsCorner",5,1,100,true,true);
    
}


function buildObject(obj){
    var spline=obj.core();
    var x;
    var y;
    var z;
    
    
    pitch=obj.getParameter("pitch");
    widthA=obj.getParameter("widthA");
    widthB=obj.getParameter("widthB");
    turns=obj.getParameter("turns");
    cRadius=obj.getParameter("cornerRadius");
    NptsC=obj.getParameter("NptsCorner");

    var dphi=Math.PI/2/NptsC;
    var Nturn=1.0;
    var cStep=1;
    
	if (turns>0) {
		z=0;
		for(Nturn=1;Nturn<=turns; Nturn=Nturn+1){
						
			if(Nturn==1) {
				x=0;
				y=widthB/2;
				var pos=new Vec3D(x,z,y);
				spline.move(pos);
			}
			
			x=widthA/2-cRadius;
			y=widthB/2;
			z=z + pitch*x;
			var pos=new Vec3D(x,z,y);
			spline.line(pos);
			
			//Corner 1
			for (cStep=1;cStep<=NptsC; cStep=cStep+1){
				x=widthA/2+cRadius*(Math.sin(cStep*dphi) - 1);
				y=widthB/2-cRadius*(1-Math.cos(cStep*dphi));
				z=z + pitch*cRadius*dphi;
				var pos=new Vec3D(x,z,y);
				spline.line(pos);
			}
			
			//side 2
			x=widthA/2;
			y=-widthB/2+cRadius;
			z=z + pitch*(widthB-2*cRadius);
			var pos=new Vec3D(x,z,y);
			spline.line(pos);
			
			
			//Corner 2
			for (cStep=1;cStep<=NptsC; cStep=cStep+1){
				x=widthA/2-cRadius*(1-Math.cos(cStep*dphi));
				y=-widthB/2+cRadius*(1-Math.sin(cStep*dphi));
				z=z + pitch*cRadius*dphi;
				var pos=new Vec3D(x,z,y);
				spline.line(pos);
			}
			
			
			// side 3
			x=-widthA/2+cRadius;
			y=-widthB/2;
			z= z + pitch*(widthA-2*cRadius);
			var pos=new Vec3D(x,z,y);
			spline.line(pos);
			
			// Corner 3
			for (cStep=1;cStep<=NptsC; cStep=cStep+1){
				x=-widthA/2+cRadius*(1-Math.sin(cStep*dphi));
				y=-widthB/2+cRadius*(1-Math.cos(cStep*dphi));
				z=z + pitch*cRadius*dphi;
				var pos=new Vec3D(x,z,y);
				spline.line(pos);
			}

			//side 4
			x=-widthA/2;
			y=widthB/2-cRadius;
			z= z + pitch*(widthB-2*cRadius);
			var pos=new Vec3D(x,z,y);
			spline.line(pos);

			
			//Corner 4
			for (cStep=1;cStep<=NptsC; cStep=cStep+1){
				x=-widthA/2+cRadius*(1-Math.cos(cStep*dphi));
				y=widthB/2-cRadius*(1-Math.sin(cStep*dphi));
				z=z + pitch*cRadius*dphi;
				var pos=new Vec3D(x,z,y);
				spline.line(pos);
			}
			
			//rest
			x=0;
			y=widthB/2;
			z=z + pitch*(widthA/2-cRadius);
			var pos=new Vec3D(x,z,y);
			spline.line(pos);
		}
	}
}