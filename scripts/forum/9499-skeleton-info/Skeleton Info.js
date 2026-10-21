// Source: https://www.cheetah3d.com/forum/index.php?threads/9499/post-78360
// Author: Edward (Cheetah3D forum), posted 2013-04-20
// Thread: "Skeleton Info"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// ----------------------------------------------------------
//   Skeleton Info
// ----------------------------------------------------------
// This sample reads skeleton information directly from a
// text JAS file using a helper script. Running the script
// requires having the desired mesh selected and index of
// the skeleton tag. The indices start at zero, so the
// fourth tag will be at index 3. The results will display
// in the console tab.
// ----------------------------------------------------------

function buildUI (tool) {
	tool.addParameterSeparator("Skeleton");
	tool.addParameterInt      ("Tag Index", 0, 0, 10, false, false);
	tool.addParameterButton   ("Run","OK","exportSkeleton");
}

// ----------------------------------------------------------
// ----------------------------------------------------------

function exportSkeleton (tool) {
	var document = tool.document();
	var object   = document.selectedObject();
	var name     = object.getParameter("name");
	var index    = tool.getParameter("Tag Index");
	var script   = 'Library/Application Support/Cheetah3D/Scripts/Tool/Skeleton Helper.py';
	var command  = "cd ~; python '" + script + "' '" + name + "' " + index;
	
	// ------------------------------------------
	//  Extract Skeleton Info
	// ------------------------------------------
	document.saveToFile("/tmp/Temp.jas","jas");
	OS.system(command);
	
	var file = new File("/tmp/Joints.json");
	file.open(READ_MODE);
	eval("var joints = " + file.read(file.size()));
	file.close();
	
	// ------------------------------------------
	//  Display Skeleton Info
	// ------------------------------------------
	for (var name in joints) {
		print("-----------------");
		print("Name:     " + name);
		print("Position: " + joints[name].position);
		print("Rotation: " + joints[name].rotation);
		print("Scaling:  " + joints[name].scaling);
		print("Weights:  " + joints[name].weights);
		print("Indices:  " + joints[name].indices);
	}
}
