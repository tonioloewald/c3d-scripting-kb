// Source: https://www.cheetah3d.com/forum/index.php?threads/9677/post-79910
// Author: alcarazr (Cheetah3D forum), posted 2013-06-20
// Thread: "Particle Size Distribution (PSD)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// PSDGenerator.js
// (c) 2013 Rodrigo Alcaraz de la Osa
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose:
//		Allows for creating a particle system with a custom Particle Size Distribution (PSD). 
//      Prints (and optionally saves to file) the position and the radius of each sphere to the console.
// Usage:   
//      1. Create a particle array or particle emitter with balls.
//      2. Set the radius of the balls to 1 and adjust their positions as you want.
//      3. Select the particle system in the object browser.
//      4. Execute the script.
//      5. The position and the radius of each sphere are printed to the console.  
// Parameters
var mu = 0.9; // average radius for the PSD
var sigma = 0.5; // standard deviation for the PSD

function main(doc)
{	  
    // get selected object
    var obj = doc.selectedObject();
    
    // test if there is a object
    if(obj == null)
    {
		OS.beep();
		OS.messageBox("Error","Please select a object before calling that script.");
		return;
	}
	
	var ParticleCore = obj.core();
	var numberParticles = ParticleCore.particleCount();
	
	// get path for file
	var save = OS.messageBox("Question","Save to file?");
	if(save==1)
	{		
		var path=OS.runSavePanel("txt");
		if(path==null)
		{
			return;
		}
	
		// open file
		var file = new File(path);
		file.open(WRITE_MODE);
	
		// write file headings
		file.writeln("i    x      y      z   radius");
	}
    	
	print("i        x            y            z      radius");
	for (var i=0;i<numberParticles;i++)
	{ 
		var Particle = ParticleCore.particleAtIndex(i); // obtain the particle at index i
		var position = Particle.getPosition(); // get the position of the particle
		// Obtain a normally distributed random scale for the particle
		var X = Math.random()*2 - 1; // uniform random between -1 and 1
		var Y = Math.random()*2 - 1; // uniform random between -1 and 1
		var Z = Math.random()*2 - 1; // uniform random between -1 and 1
		var G = X + Y + Z; // Central Limit Theorem (CLT)
		var radius = G*sigma + mu; // (normally distributed random scale)
		Particle.setScale(radius,radius,radius); // set the scale of the particle		
	    print((i+1) + ' ' + position.x.toFixed(4) + ' ' + position.y.toFixed(4) + ' ' + position.z.toFixed(4) + ' ' + radius.toFixed(4));
	    if(save==1)
	    {
	        file.writeln((i+1) + ' ' + position.x.toFixed(4) + ' ' + position.y.toFixed(4) + ' ' + position.z.toFixed(4) + ' ' + radius.toFixed(4));
	    }
	}
	if(save==1)
	{
	    // close file
		file.close();
	}
	OS.beep();	        
   	OS.messageBox("Output","Particles' positions and radii printed to the console.");
}