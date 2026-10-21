// Particle Image.js
// (c) 2016 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a particle system based on an image.
//

//C3D_VERSION_REQUIREMENT	7.0.0

function buildUI(obj){
    obj.setParameter("name","Particle-Image");
    
    obj.addParameterVec3D("Size",new Vec3D(1,.1,1),-10000,10000,true,true);
    obj.addParameterInt("Items width",32,4,512,true,true);
    obj.addParameterInt("Items height",32,4,512,true,true);
    obj.addParameterTexture("Texture","none",true);
}

function buildObject(obj){
    //get the particle core
    var core=obj.core();
    
    //get parameters
    var size=obj.getParameter("Size");
    var itemsWidth=obj.getParameter("Items width");
    var itemsHeight=obj.getParameter("Items height");
    var tex=obj.getParameter("Texture.tex");
    
    //precalcs
    var particleScale=1.0/Math.max(itemsWidth,itemsHeight);
    
    //create particles
	for(var i=0;i<itemsWidth;i++){
		for(var j=0;j<itemsHeight;j++){
			var	S=i/itemsWidth;
			var T=j/itemsHeight;
			var col=(tex) ? tex.sample(S,T) : new Vec4D(0.0);

			var	part=core.addParticle();
			var	particle_scale=new Vec3D(particleScale,particleScale,particleScale);
			var	particle_pos=new Vec3D((-0.5+(i/(itemsWidth-1.0)))*size.x,size.y*col.x,(-0.5+(j/(itemsHeight-1.0)))*size.z);
	
			part.setPosition(particle_pos);
			part.setScale(particle_scale);
			}
		}
}

