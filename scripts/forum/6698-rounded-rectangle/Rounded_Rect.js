// Source: https://www.cheetah3d.com/forum/index.php?threads/6698/post-53309
// Author: Herb (Cheetah3D forum), posted 2010-12-21
// Thread: "Rounded Rectangle"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Rounded_Rectangle.js
// (c) 2010 Herbert Looser
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates an rounded rectangle using Bezier Spline (SplineScript).
//
// Version 0.2 (Jan 2, 2011); added parameter "Orientation"
//
var P1 =  new Vec3D(0,0,0);
var P2 =  new Vec3D(0,0,0);
var CP1 = new Vec3D(0,0,0);
var CP2 = new Vec3D(0,0,0);



function buildUI(obj){
    obj.setParameter("name","Rounded Rectangle");
    obj.addParameterFloat("Width",1,0.001,1000,true,true);
    obj.addParameterFloat("Height",0.5,0.001,1000,true,true);
    obj.addParameterFloat("Radius (< Min(W,H)/2)",.05,0.001,1000,true,true);
    obj.addParameterSelector("Orientation",["X","Y","Z"],true,true);
    obj.setParameter("Orientation",2);
}

function buildObject(obj){
    var rRectangle=obj.core();
    var a,b,a2,b2,r,maxr;
    var orient;
    var lambda1, lambda2, cx,cy;
    var cx = new Array;
    var cy = new Array;
    var orientation=2;

    
   //get current parameter values
    a			=obj.getParameter("Width");
    b 			=obj.getParameter("Height");
    r           =obj.getParameter("Radius (< Min(W,H)/2)");
    orientation =obj.getParameter("Orientation");
    
    switch(orientation) {
		case 0: var rot=new Mat4D(ROTATE,0,90,0); break;
		case 1: var rot=new Mat4D(ROTATE,90,0,0);   break;
        case 2: var rot=new Mat4D(ROTATE,0,0,0);    break;
	}
    
    
    maxr=Math.min(a,b)/2*0.999;
    if (r>maxr) {
        r=maxr*0.999;
        obj.setParameter("Radius (< Min(W,H)/2)",r);
    }

    a2=a/2; b2=b/2;
    
    var cx = new Array(a/2-r, a/2-r, -a/2+r, -a/2+r);
    var cy = new Array(-b/2+r, b/2-r, b/2-r, -b/2+r);
    var startP = new Array(new Vec3D(a2-r, -b2, 0), new Vec3D(a2, b2-r, 0), new Vec3D(-a2+r, b2, 0), new Vec3D(-a2, -b2+r, 0));    


    P1 = startP[0];
    P1 = rot.multiply(P1);
    
    rRectangle.move(P1);
    lambda1=-90; lambda2=0;    
    for (i=0; i<4; i++) {
        calcPoints(cx[i],cy[i],lambda1,lambda2,r);
        
        P2=rot.multiply(P2);
        CP1=rot.multiply(CP1);
        CP2=rot.multiply(CP2);
        rRectangle.curve(CP1,CP2,P2);
        lambda1=lambda1+90;
        lambda2=lambda2+90;
        if (i<3) {
            P2 = startP[i+1];
            P2=rot.multiply(P2);
            rRectangle.line(P2);
        }
    }
    rRectangle.close();
}


function calcPoints(cx,cy,lambda1,lambda2,r){
    var eta1, eta2, E1x, E1y, E2x, E2y, E1px, E1py, E2px, E2py, alpha, CP1x, CP1y, CP2x, CP2y;
    eta1=lambda1/180*Math.PI;
    eta2=lambda2/180*Math.PI;
    E1x=cx+r*Math.cos(eta1);
    E1y=cy+r*Math.sin(eta1);
    E1px=-r*Math.sin(eta1);
    E1py=+r*Math.cos(eta1);
    E2x=cx+r*Math.cos(eta2);
    E2y=cy+r*Math.sin(eta2);
    E2px=-r*Math.sin(eta2);
    E2py=+r*Math.cos(eta2);
    alpha = (Math.sqrt(7)-1)/3;
    CP1x=E1x+alpha*E1px;
    CP1y=E1y+alpha*E1py;
    CP2x=E2x-alpha*E2px;
    CP2y=E2y-alpha*E2py;
    P1=new Vec3D(E1x,E1y,0);
    CP1=new Vec3D(CP1x,CP1y,0);
    P2=new Vec3D(E2x,E2y,0);
    CP2=new Vec3D(CP2x,CP2y,0);
}