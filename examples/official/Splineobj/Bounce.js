//
// Sinecircle.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom spline object.
//

var velocity	= 0.5;
var height	= 1.0;
var damping	= 0.8;
var jumps	= 5;
var g		= 9.81;


function buildUI(obj){
    obj.setParameter("name","Bounce");
    
    obj.addParameterFloat("velocity",0.5,0,1000,true,true);
    obj.addParameterFloat("height",1,0,1000,true,true);
    obj.addParameterFloat("damping",0.9,0,10,true,true);
    obj.addParameterInt("jumps",5,1,100,true,true);
}


function buildObject(obj){
    var spline=obj.core();
    var	t=0.0;
    var dt=0.0;
    
    velocity=obj.getParameter("velocity");
    height=obj.getParameter("height");
    damping=obj.getParameter("damping");
    jumps=obj.getParameter("jumps");
    
    
    for(var i=0;i<jumps;i++){
	var dt=Math.sqrt(2.0*height/g);
	
	var start=  new Vec3D(t*velocity			    ,0	    ,0);
	var lcont1= new Vec3D(t*velocity + dt*velocity/3.0	    ,dt*(dt*g)/3.0 ,0);
	var lcont2= new Vec3D((t+dt)*velocity - dt*velocity/3.0    ,height	    ,0);
	var middle= new Vec3D((t+dt)*velocity			    ,height	    ,0);
	var rcont1= new Vec3D((t+dt)*velocity + dt*velocity/3.0    ,height	    ,0);
	var rcont2= new Vec3D((t+2*dt)*velocity - dt*velocity/3.0  ,dt*(dt*g)/3.0 ,0);
	var end=    new Vec3D((t+2*dt)*velocity		    ,0	    ,0);
	
	
	if(i==0)    spline.move(start);
	spline.curve(lcont1,lcont2,middle);
	spline.curve(rcont1,rcont2,end);
	
	t+=2*dt;
	height*=damping;
	}
}