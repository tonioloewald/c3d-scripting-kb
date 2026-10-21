//
// Menger.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a Menger sponge polygon object.
//


var removehiden =   true;
var iterations	=   3;

c0	    =   0.0;
c1	    =   1.0/3.0;
c2	    =   2.0/3.0;
c3	    =   1.0;

function buildUI(obj){
    obj.setParameter("name","Particle-Menger");
    
    obj.addParameterInt("interations",2,0,3,true,true);
}

function hallo(obj){
   OS.beep(); 
}


function buildObject(obj){
    //get the particle core
    var core=obj.core();
    
    //get current parameter values
    iterations=obj.getParameter("interations");
    
    //build particles recursively
    menger_iteration(core ,new Vec3D(-0.5,-0.5,-0.5) ,new Vec3D(0.5,0.5,0.5) ,0);	
}


function menger_iteration(pcore,bmin,bmax,depth)
{
    if(depth<iterations){
	var nbmin=new Vec3D(0,0,0);
	var nbmax=new Vec3D(0,0,0);
	
	var vx=bmax.x-bmin.x;
	var vy=bmax.y-bmin.y;
	var vz=bmax.z-bmin.z;
	
			
	//first floor
	//  0-0-0
	nbmin.set(bmin.x + c0*vx, bmin.y + c0*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c1*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  1-0-0
	nbmin.set(bmin.x + c1*vx, bmin.y + c0*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c1*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-0-0
	nbmin.set(bmin.x + c2*vx, bmin.y + c0*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c1*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  0-0-1
	nbmin.set(bmin.x + c0*vx, bmin.y + c0*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c1*vy, bmin.z + c2*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-0-1
	nbmin.set(bmin.x + c2*vx, bmin.y + c0*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c1*vy, bmin.z + c2*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  0-0-2
	nbmin.set(bmin.x + c0*vx, bmin.y + c0*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c1*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  1-0-2
	nbmin.set(bmin.x + c1*vx, bmin.y + c0*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c1*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-0-2
	nbmin.set(bmin.x + c2*vx, bmin.y + c0*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c1*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	
	//  second floor
	//  0-1-0
	nbmin.set(bmin.x + c0*vx, bmin.y + c1*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c2*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-1-0
	nbmin.set(bmin.x + c2*vx, bmin.y + c1*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c2*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  0-1-2
	nbmin.set(bmin.x + c0*vx, bmin.y + c1*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c2*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-1-2
	nbmin.set(bmin.x + c2*vx, bmin.y + c1*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c2*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//third floor
	//  0-2-0
	nbmin.set(bmin.x + c0*vx, bmin.y + c2*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c3*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  1-2-0
	nbmin.set(bmin.x + c1*vx, bmin.y + c2*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c3*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-2-0
	nbmin.set(bmin.x + c2*vx, bmin.y + c2*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c3*vy, bmin.z + c1*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  0-2-1
	nbmin.set(bmin.x + c0*vx, bmin.y + c2*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c3*vy, bmin.z + c2*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-2-1
	nbmin.set(bmin.x + c2*vx, bmin.y + c2*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c3*vy, bmin.z + c2*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  0-2-2
	nbmin.set(bmin.x + c0*vx, bmin.y + c2*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c3*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  1-2-2
	nbmin.set(bmin.x + c1*vx, bmin.y + c2*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c3*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	
	//  2-2-2
	nbmin.set(bmin.x + c2*vx, bmin.y + c2*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c3*vy, bmin.z + c3*vz);
	menger_iteration(pcore,nbmin,nbmax,depth+1);
	}
    else{
	var	part=pcore.addParticle();
	var	particle_size=bmax.sub(bmin);
	var	particle_center=bmin.add(particle_size.multiply(0.5));
	
	part.setPosition(particle_center);
	part.setScale(particle_size);
	}
}


