// Source: https://www.cheetah3d.com/forum/index.php?threads/10025/post-84264
// Author: Edward (Cheetah3D forum), posted 2014-01-06
// Thread: "Camera Aspect Ratio Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//---------------------------------------------------
//              Adjust Camera DPI.js
//---------------------------------------------------
// This should get you started. It isn't exactly what
// you described, but should at least give you an
// introduction to creating tool scripts.
//---------------------------------------------------

function buildUI (tool) {
	
	// The buildUI function is called once when Cheetah3D
	// starts the script, and sets up the interface. Look
	// at the Base object of Cheetah3D's help to see other
	// types of parameters that can be edited.
	
	tool.addParameterSeparator("Adjust Camera DPI");
	tool.addParameterFloat ("Width (Inches)",   6, 1,  12, false, false);
	tool.addParameterFloat ("Height (Inches)",  4, 1,  12, false, false);
	tool.addParameterInt   ("Dots Per Inch",   72, 1, 600, false, false);
	tool.addParameterButton("Apply","OK","updateDimensions");
}

function updateDimensions (tool) {

	// To get the active camera, first get the document
	// from the tool object. The document object has a
	// function named 'activeCamera' that returns the
	// active camera object. Look in Cheetah3D's help
	// to see what else can be done with the document.
	
	var document = tool.document();
	var camera = document.activeCamera();
	
	// Next get the parameters from the tool object that
	// were created in the buildUI() function. Make sure
	// that the parameter name matches exactly, or you
	// will get an error.
	
	var widthInInches  = tool.getParameter("Width (Inches)");
	var heightInInches = tool.getParameter("Height (Inches)");
	var dotsPerInch    = tool.getParameter("Dots Per Inch");
	
	// Now perform any calculations you need to determine
	// the new image dimensions for the camera. In this
	// example, I will multiply the number of inches in
	// each dimension times the dots (pixels) per inch.
	
	var widthInPixels  = widthInInches * dotsPerInch;
	var heightInPixels = heightInInches * dotsPerInch;
	
	// Now that you have your values, you want to update
	// the camera's output dimensions. Objects store their
	// values as parameters, which can be seen in the
	// Console after running the ParameterInfo.js script.
	// Ok, so you want to set the resolutionX [int] and
	// resolutionY [int] parameters, so just call the
	// setParameter function to set the integer values
	// for each parameter.
	
	camera.setParameter("resolutionX",widthInPixels);
	camera.setParameter("resolutionY",heightInPixels);
}
