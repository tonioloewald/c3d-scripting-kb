// Source: https://www.cheetah3d.com/forum/index.php?threads/6607/post-52376
// Author: Herb (Cheetah3D forum), posted 2010-12-02
// Thread: "Ellipse Spline"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Bezier_Ellipse.js
// (c) 2010 Herbert Looser
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates an Ellipse using Bezier Spline (SplineScript). Introduces Controlpoints at n*90deg if appropriate.
//
// Version 0.2 (Jan 2, 2011); added parameter "Orientation"
//
var R1, R2;
var P1 =  new Vec3D(0,0,0);
var P2 =  new Vec3D(0,0,0);
var CP1 = new Vec3D(0,0,0);
var CP2 = new Vec3D(0,0,0);


function buildUI(obj){
    obj.setParameter("name","Ellipse");
    obj.addParameterFloat("Rx",1,0,1000,true,true);
    obj.addParameterFloat("Rz",0.5,0,1000,true,true);
    obj.addParameterFloat("start_angle",0,-360,360,true,true);
    obj.addParameterFloat("stop_angle",90,-360,360,true,true);
    obj.addParameterSelector("Orientation",["X","Y","Z"],true,true);
    obj.setParameter("Orientation",1);
    
}

function buildObject(obj){
    var ellipse=obj.core();
    var i,Nsteps;
    var phi1,phi2;
    var degToRad=Math.PI/180;
    var piHalf=Math.PI/2;
    var twoPi=Math.PI*4;
    var interm;
    var negative=0;
    var orientation=1;
    
   //get current parameter values
    R1			=obj.getParameter("Rx");
    R2 			=obj.getParameter("Rz");
    phiStart	=obj.getParameter("start_angle")/180*Math.PI;
    phiEnd		=obj.getParameter("stop_angle")/180*Math.PI;
    orientation =obj.getParameter("Orientation");
   
    var angles = new Array;
    var inputAngles = new Array(phiStart, phiEnd);
    
    if (phiEnd < phiStart) { inputAngles.reverse(); }
    // to avoid rounding errors ... we go to positive branch of angles
    if (inputAngles[0]<0) {
        negative=1;
        inputAngles[0]=inputAngles[0]+twoPi;
        inputAngles[1]=inputAngles[1]+twoPi;
    }
    
    angles.push(inputAngles[0]-negative*twoPi); 
    interm=inputAngles[0]-inputAngles[0]%piHalf+piHalf;
    while (interm < inputAngles[1]) {
        angles.push(interm-negative*twoPi);
        interm=interm+piHalf;
    }
    angles.push(inputAngles[1]-negative*twoPi);
    
    if (phiEnd < phiStart) { angles.reverse(); }
    switch(orientation) {
		case 0: var rot=new Mat4D(ROTATE,0,0,90.0);  break;
		case 1: var rot=new Mat4D(ROTATE,0,0,0);     break;
        case 2: var rot=new Mat4D(ROTATE,-90.0,0,0); break;
	}
    
    Nsteps=angles.length-1;
    if (orientation==0) {}
    for (i=0; i<Nsteps; i++){
        calcPoints(angles[i], angles[i+1]);
        if (i==0) {
            P1=rot.multiply(P1);
            ellipse.move(P1);
        }
        P2=rot.multiply(P2);
        CP1=rot.multiply(CP1);
        CP2=rot.multiply(CP2);
        ellipse.curve(CP1,CP2,P2);
    }
}

function calcPoints(phi1, phi2){
    var eta1, eta2, E1x, E1z, E2x, E2z, E1px, E1pz, E2px, E2pz, alpha, CP1x, CP1z, CP2x, CP2z;
    eta1=calcEta(phi1, R1, R2);
    eta2=calcEta(phi2, R1, R2);
    E1x=calcEx(eta1, R1, R2);
    E1z=calcEz(eta1, R1, R2);
    E1px=calcEpx(eta1, R1, R2);
    E1pz=calcEpz(eta1, R1, R2);
    E2x=calcEx(eta2, R1, R2);
    E2z=calcEz(eta2, R1, R2);
    E2px=calcEpx(eta2, R1, R2);
    E2pz=calcEpz(eta2, R1, R2);
    alpha = Math.tan( (eta2-eta1)/2);
    alpha = Math.sin(eta2-eta1)*(Math.sqrt( (4 + 3*alpha*alpha) ) - 1)/3;
    CP1x=E1x+alpha*E1px;
    CP1z=E1z+alpha*E1pz;
    CP2x=E2x-alpha*E2px;
    CP2z=E2z-alpha*E2pz;
    P1=new Vec3D(E1x,0,E1z);
    CP1=new Vec3D(CP1x,0,CP1z);
    P2=new Vec3D(E2x,0,E2z);
    CP2=new Vec3D(CP2x,0,CP2z);
}

function calcEta(phi, R1, R2) {
    var result=Math.atan2( Math.sin(phi)/R2, Math.cos(phi)/R1);
    return result;
}

function calcEx(eta, R1, R2) {
    var result=R1*Math.cos(eta);
    return result;
}

function calcEz(eta, R1, R2) {
    var result=R2*Math.sin(eta);
    return result;
}

function calcEpx(eta, R1, R2) {
    var result=-R1*Math.sin(eta);
    return result;
}

function calcEpz(eta, R1, R2) {
    var result=R2*Math.cos(eta);
    return result;
}