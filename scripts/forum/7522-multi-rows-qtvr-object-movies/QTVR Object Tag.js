// Source: https://www.cheetah3d.com/forum/index.php?threads/7522/post-62017
// Author: Francois (Cheetah3D forum), posted 2011-07-24
// Thread: "multi-rows QTVR Object movies"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Name : QTVR Object Tag.js
// June 2010 - Version 7
//
// This script is in the public domain. Feel free to modify it or use part of it.
//
// Purpose : This script can be used with Cheetah3D to generate a series of images around an object.
// These images can then be used, with another program like Object2VR ( http://gardengnomesoftware.com/object2vr.php ),
//  to generate a QTVR object movie.
// This script has been tested with Cheetah3D version 5.7
//	
// Installation : To use it, place it into your "scripts/Tag" folder.
//
// How to use it :
// - Select the camera that will be rendering images. Adjust camera settings and eventual camera tags ( HDRI/Radiosity ...) settings as usual
// - Select / Run this script from the Tools->Script->Tag Script menu
// - A script tag is added to the camera that was selected - See the included ReadMe file for more details.




// Global variables settings **** These default values can be changed by the user ****
	var imagetype = '.jpg';		// Format of saved images. 

// Preference values for resetting the UI **** These default values can be changed by the user ****
	var columns_def = 12;		// eg : 360 deg / 30 deg = 12 images on each row - 1 image every 30 deg auround the object.
	var rows_def = 3;			// eg : 90 deg / 30 deg = 3 images per column - 1 image every 30 deg in half mode.
	var nb_def = 0;			// use 0 for 90° (half mode - above object) or 1 for 180° (full mode - above and below object)
	var radius_def = 5;			// default radius of sphere around the object
	var start_imagenb_def = 1;	// default starting image number



// Building the user's interface
function buildUI(tag) {

 	tag.addParameterSeparator("QTVR Object - Camera Parameters");

    	tag.addParameterFloat("radius",radius_def,0,300,false,false);
  	tag.addParameterButton("move to start position","Move","Move");
	
	tag.addParameterSeparator("Nb of Columns & Rows");
	tag.addParameterInt("columns",columns_def,4,72,false,false);
    	tag.addParameterInt("rows",rows_def,1,18,false,false);
   	tag.addParameterSelector("half/full (90 or 180)",["half","full"],false,false);
	
	tag.addParameterSeparator("Reset all values");
  	tag.addParameterButton("reset","Reset","Reset");
	
	tag.addParameterSeparator("Render all images");
	tag.addParameterInt("image name number",start_imagenb_def,1,200,false,false);
   	tag.addParameterButton("render all images","Render","Render");
	
	Move(tag);
}



// Move to start position
function Move(tag) {
	var doc = tag.document();
	var cam= doc.activeCamera();
	if(cam==null) return;
	radius = tag.getParameter("radius");
	var start_pos = new Vec3D(0,0,radius);
	var start_rot = new Vec3D(0,0,0);
	
	cam.setParameter("position",start_pos);
	cam.setParameter("rotation",start_rot);
	print("Camera moved to starting position");
}



// Rendering images
function Render(tag) {

	//Get directory and filename for where to save images
	var path=OS.runSavePanel("");
	if(path==null){
	return;
	}
        
	var file=new File(path);
	var lastpathcomp=file.lastPathComponent();
	var dir=file.directory()+"/";
	var comps= lastpathcomp.split(/\./);
	var filename=comps[0];

	var doc = tag.document();
	var cam=doc.activeCamera();
	if(cam==null) return; 
	
//	Save original camera position
	var oldPos = cam.getParameter("position");
	var oldRot = cam.getParameter("rotation");
	var oldFov = cam.getParameter("fieldOfView");
	
//	Move camera to 0,0,0 (as the center of the object and origin of the QTVR)
	var origin_pos = new Vec3D(0,0,0);
	var origin_rot = new Vec3D(0,0,0);
	
	cam.setParameter("position",origin_pos);
	cam.setParameter("rotation",origin_rot);

//	Getting parameters values
	var columns = tag.getParameter("columns");
	var rows = tag.getParameter("rows");
	var nb = tag.getParameter("half/full (90 or 180)");

		if (nb == 0) {
			nb=90;
		} else {
			nb=180;
		}
	
	var radius = tag.getParameter("radius");
	var start_imagenb = tag.getParameter("image name number");

    	var stepsize = 360 / columns;
	
	// If only 1 row, this is to avoid the divide by 0
	if (rows == 1) {
		var cyclesize = nb / (rows);
	} else {
		var cyclesize = nb / (rows - 1);
	}
	
	imagenb = start_imagenb
	count=1
    
//	Start calculating positions and render images
	for (var j = 0;j<rows;j++) {
	
		if (rows == 1) j=1; // If only 1 row, this is to move the camera to y = 0
    
        	for (var i = 0;i < columns;i++) {
    
		var newPos = origin_pos.add(new Vec3D(radius*(Math.cos((i*Math.PI/180)*stepsize))*(Math.sin((j*Math.PI/180)*cyclesize)), radius*(Math.cos((j*Math.PI/180)*cyclesize)), radius*(Math.sin((i*Math.PI/180)*stepsize))*Math.sin((j*Math.PI/180)*cyclesize)));
		var newRot = new Vec3D(90 - (i*stepsize), (j*cyclesize)-90, 0);
        
		//Position the camera
		cam.setParameter("position",newPos);
		cam.setParameter("rotation",newRot);
				
		//Rendering and saving image nb (imagenb)
		print("Rendering  "+ filename + imagenb + imagetype + "  :  " +  count + "  of  " + (columns*rows));
        	doc.render(dir + filename + imagenb + imagetype);

        	//Increase image number for next view/image to be saved
		count = count+1
        	imagenb=imagenb+1

		}
	}
    
//	After rendering all images, restore the original camera position and rotation values.
	cam.setParameter("position",oldPos);
	cam.setParameter("rotation",oldRot);
}



// Reset all parameters to default values
function Reset(tag) {

	// Resetting the UI to these values
    	tag.setParameter("columns", columns_def);
    	tag.setParameter("rows", rows_def);
   	tag.setParameter("half/full (90 or 180)", nb_def);
    	tag.setParameter("radius", radius_def);
	tag.setParameter("image name number",start_imagenb_def);
	
	// Resetting camera position
	Move(tag);
	
	// Confirming in the console
	print("*************************");
	print('Resetting to these values :');
	var rad_def = tag.getParameter("radius");
	print("Radius = " + rad_def);	
	var col_def = tag.getParameter("columns");
	print("Columns = " + col_def);
	var row_def = tag.getParameter("rows");
	print("Rows = " + row_def);
	var nob_def = tag.getParameter("half/full (90 or 180)");
	print("Half/Full = " + nob_def);
	var start_def = tag.getParameter("image name number");
	print("Image name number = " + start_def);
	print("*************************");
	print ("\n");
}
