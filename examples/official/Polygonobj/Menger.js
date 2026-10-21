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
    obj.setParameter("name","Menger");
    
    obj.addParameterInt("interations",2,0,3,true,true);
    obj.addParameterBool("removeHidden",true,true,true);
}

function hallo(obj){
   OS.beep(); 
}


function buildObject(obj){
    var core=obj.core();
    
    //get current parameter values
    iterations=obj.getParameter("interations");
    removehiden=obj.getParameter("removeHidden");
    
    core.buildVertexBSP(new Vec3D(-0.5,-0.5,-0.5) ,new Vec3D(0.5,0.5,0.5));
	menger_iteration(core ,[1,1,1,1,1,1] ,new Vec3D(-0.5,-0.5,-0.5) ,new Vec3D(0.5,0.5,0.5) ,0);	
    core.destroyVertexBSP();
}


function menger_iteration(polycore,mask,bmin,bmax,depth)
{
    if(depth<iterations){
	var nbmin=new Vec3D(0,0,0);
	var nbmax=new Vec3D(0,0,0);
	
	var vx=bmax.x-bmin.x;
	var vy=bmax.y-bmin.y;
	var vz=bmax.z-bmin.z;
	
	var newmask=[1,1,1,1,1,1];
	
	//first floor
	//  0-0-0
	if(removehiden) newmask=[mask[0],mask[1],0,0,mask[4],0];
	nbmin.set(bmin.x + c0*vx, bmin.y + c0*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c1*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  1-0-0
	if(removehiden) newmask=[mask[0],0,1,0,mask[4],1];
	nbmin.set(bmin.x + c1*vx, bmin.y + c0*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c1*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-0-0
	if(removehiden) newmask=[mask[0],0,0,mask[3],mask[4],0];
	nbmin.set(bmin.x + c2*vx, bmin.y + c0*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c1*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  0-0-1
	if(removehiden) newmask=[mask[0],mask[1],0,1,0,1];
	nbmin.set(bmin.x + c0*vx, bmin.y + c0*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c1*vy, bmin.z + c2*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-0-1
	if(removehiden) newmask=[mask[0],1,0,mask[3],0,1];
	nbmin.set(bmin.x + c2*vx, bmin.y + c0*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c1*vy, bmin.z + c2*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  0-0-2
	if(removehiden) newmask=[mask[0],mask[1],mask[2],0,0,0];
	nbmin.set(bmin.x + c0*vx, bmin.y + c0*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c1*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  1-0-2
	if(removehiden) newmask=[mask[0],0,mask[2],0,1,1];
	nbmin.set(bmin.x + c1*vx, bmin.y + c0*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c1*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-0-2
	if(removehiden) newmask=[mask[0],0,mask[2],mask[3],0,0];
	nbmin.set(bmin.x + c2*vx, bmin.y + c0*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c1*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	
	//  second floor
	//  0-1-0
	if(removehiden) newmask=[0,mask[1],1,1,mask[4],0];
	nbmin.set(bmin.x + c0*vx, bmin.y + c1*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c2*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-1-0
	if(removehiden) newmask=[0,1,1,mask[3],mask[4],0];
	nbmin.set(bmin.x + c2*vx, bmin.y + c1*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c2*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  0-1-2
	if(removehiden) newmask=[0,mask[1],mask[2],1,1,0];
	nbmin.set(bmin.x + c0*vx, bmin.y + c1*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c2*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-1-2
	if(removehiden) newmask=[0,1,mask[2],mask[3],1,0];
	nbmin.set(bmin.x + c2*vx, bmin.y + c1*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c2*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//third floor
	//  0-2-0
	if(removehiden) newmask=[0,mask[1],0,0,mask[4],mask[5]];
	nbmin.set(bmin.x + c0*vx, bmin.y + c2*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c3*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  1-2-0
	if(removehiden) newmask=[1,0,1,0,mask[4],mask[5]];
	nbmin.set(bmin.x + c1*vx, bmin.y + c2*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c3*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-2-0
	if(removehiden) newmask=[0,0,0,mask[3],mask[4],mask[5]];
	nbmin.set(bmin.x + c2*vx, bmin.y + c2*vx, bmin.z + c0*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c3*vy, bmin.z + c1*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  0-2-1
	if(removehiden) newmask=[1,mask[1],0,1,0,mask[5]];
	nbmin.set(bmin.x + c0*vx, bmin.y + c2*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c3*vy, bmin.z + c2*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-2-1
	if(removehiden) newmask=[1,1,0,mask[3],0,mask[5]];
	nbmin.set(bmin.x + c2*vx, bmin.y + c2*vx, bmin.z + c1*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c3*vy, bmin.z + c2*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  0-2-2
	if(removehiden) newmask=[0,mask[1],mask[2],0,0,mask[5]];
	nbmin.set(bmin.x + c0*vx, bmin.y + c2*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c1*vx, bmin.y + c3*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  1-2-2
	if(removehiden) newmask=[1,0,mask[2],0,1,mask[5]];
	nbmin.set(bmin.x + c1*vx, bmin.y + c2*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c2*vx, bmin.y + c3*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	
	//  2-2-2
	if(removehiden) newmask=[0,0,mask[2],mask[3],0,mask[5]];
	nbmin.set(bmin.x + c2*vx, bmin.y + c2*vx, bmin.z + c2*vx);
	nbmax.set(bmin.x + c3*vx, bmin.y + c3*vy, bmin.z + c3*vz);
	menger_iteration(polycore,newmask,nbmin,nbmax,depth+1);
	}
    else{
	var     verts=[new Vec3D(0,0,0), new Vec3D(0,0,0), new Vec3D(0,0,0), new Vec3D(0,0,0)];
    
	if(mask[0]==1){
	    verts[0].set(bmin.x ,bmin.y ,bmin.z);
	    verts[1].set(bmin.x ,bmin.y ,bmax.z);
	    verts[2].set(bmax.x ,bmin.y ,bmax.z);
	    verts[3].set(bmax.x ,bmin.y ,bmin.z);
	    polycore.addPolygon(4,true,verts);
	    }
	if(mask[1]==1){
	    verts[0].set(bmin.x ,bmin.y ,bmin.z);
	    verts[1].set(bmin.x ,bmax.y ,bmin.z);
	    verts[2].set(bmin.x ,bmax.y ,bmax.z);
	    verts[3].set(bmin.x ,bmin.y ,bmax.z);
	    polycore.addPolygon(4,true,verts);
	    }
	if(mask[2]==1){
	    verts[0].set(bmin.x ,bmin.y ,bmax.z);
	    verts[1].set(bmin.x ,bmax.y ,bmax.z);
	    verts[2].set(bmax.x ,bmax.y ,bmax.z);
	    verts[3].set(bmax.x ,bmin.y ,bmax.z);
	    polycore.addPolygon(4,true,verts);
	    }
	if(mask[3]==1){
	    verts[0].set(bmax.x ,bmax.y ,bmax.z);
	    verts[1].set(bmax.x ,bmax.y ,bmin.z);
	    verts[2].set(bmax.x ,bmin.y ,bmin.z);
	    verts[3].set(bmax.x ,bmin.y ,bmax.z);
	    polycore.addPolygon(4,true,verts);
	    }
	if(mask[4]==1){
	    verts[0].set(bmin.x ,bmin.y ,bmin.z);
	    verts[1].set(bmax.x ,bmin.y ,bmin.z);
	    verts[2].set(bmax.x ,bmax.y ,bmin.z);
	    verts[3].set(bmin.x ,bmax.y ,bmin.z);
	    polycore.addPolygon(4,true,verts);
	    }
	if(mask[5]==1){
	    verts[0].set(bmin.x ,bmax.y ,bmin.z);
	    verts[1].set(bmax.x ,bmax.y ,bmin.z);
	    verts[2].set(bmax.x ,bmax.y ,bmax.z);
	    verts[3].set(bmin.x ,bmax.y ,bmax.z);
	    polycore.addPolygon(4,true,verts);
	    }
	}
}


