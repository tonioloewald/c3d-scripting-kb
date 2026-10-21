// Source: https://www.cheetah3d.com/forum/index.php?threads/12767/post-110696
// Author: KurtF (Cheetah3D forum), posted 2018-01-28
// Thread: "Center Pivot"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
	// Center_Pivot.js - sort of by Kurt Fillmore - 2018

	// This script is a mash up of elements from javascripts written by Todd WR,
	// Tonio Loewald, and Martin Wengenmayer. Basically I took the best of these
	// and combined them to create a script that centers the pivot of an object.
	
	// Feel free to use or modify. This script is in the public domain and
	// can be used to springboard your own creations. As I am a beginner with
	// coding, this script is heavily commented, mostly to help me keep things
	// straight in my own head.
	
	
	// This is a Macro Script. Place it into the Macro Folder and relaunch Cheetah
	// 3D. Select any SINGLE Object who's pivot has become shifted away from that 
	// object. Run the script and the Object's Bounding Box is calculated, and
	// the pivot is set to the average X, Y, and Z coordinates, recentering
	// the pivot.
	
	
	// First we call the main function - passing it the Cheetah 3D scene as doc.

function main(doc){

	// we then declare a variable OBJ and pass into it our selected object using
	// the selectedObject method.

	var obj = doc.selectedObject();

	// next we test that an object has actually been selected.
	// If there isn't an object in our selection, we alert the user, then error
	// out.
	
	// This section is from Martin Wengenmayer's Parameter Info script.	

    if(obj==null){
	OS.beep();
	OS.messageBox("Error","Please select an object before calling that script.");
	return;
	}

	// Next we create a variable CORE, which will hold an Array of numbers which
	// are the vertices of our selected object. We do this using the modCore method
	// on our object OBJ.
	
    var core = obj.modCore();

	// Next we create yet another variable SIZE, and pass to it the number of vertices
	// in the Array CORE. We do this with the vertexCount method.

	var size = core.vertexCount();

	// Next we create two variables MINLOC, and MAXLOC. They will eventually
	// hold the Minimum and Maximum values of the various Vertex points, but for
	// now they are set to the values (x, y, and z) for the 1st Vertex in our 
	// CORE variable. This is done with the vertex method for the value of (0)
	// which is the 1st index in the array.

	var minLoc = core.vertex(0); 
	var maxLoc = core.vertex(0);

	// Next we create a new Vector variable called P, and initialize it to (0,0,0).
	// P will be used within a For Loop, as we check each member of the CORE
	// array, comparing and checking to find the least and greatest value
	// for the X, Y, and Z positions.
	// As this loop executes the minLoc and maxLoc variables will be assigned
	// their respective Minimum and Maximum values for X, Y, and Z.
	
	var p = new Vec3D(0,0,0);

	// the Javascript syntax for this comparison uses the ? operator and is quite
	// clever. You can check Mozilla's Javascript Reference for the particulars
	// of this syntax. Well done Tonio!

	for( var i = 0; i < size; i++) {
		p = core.vertex(i);
		minLoc.x = p.x < minLoc.x ? p.x : minLoc.x;
		minLoc.y = p.y < minLoc.y ? p.y : minLoc.y;
		minLoc.z = p.z < minLoc.z ? p.z : minLoc.z;
		maxLoc.x = p.x > maxLoc.x ? p.x : maxLoc.x;
		maxLoc.y = p.y > maxLoc.y ? p.y : maxLoc.y;
		maxLoc.z = p.z > maxLoc.z ? p.z : maxLoc.z;
	}


	// This is my addition to the script. Instead of working on the position, we will 
	// average the minimum and maximum vertex points, and set the Objects Pivot to
	// this average, thus centering the pivot for the object.
	
	
	// Create a new vector variable called newPivot to hold the 
	// average calculated value and initialize it to (0,0,0).
	
	var newPivot = new Vec3D(0,0,0);

	// As the Pivot is a Vector, i.e. an array with 3 values, we now calculate the
	// average for the X, Y, and Z.
	
	newPivot.x = (minLoc.x + maxLoc.x)/2
	newPivot.y = (minLoc.y + maxLoc.y)/2
	newPivot.z = (minLoc.z + maxLoc.z)/2
	
	// Now we call the OBJ object and use the setParameter method, specifying "Pivot"
	// and feeding it the variable - newPivot

	obj.setParameter("pivot", newPivot);

	// we then update the OBJ object with the update method

	obj.update();




}