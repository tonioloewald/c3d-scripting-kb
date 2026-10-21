// Source: https://www.cheetah3d.com/forum/index.php?threads/9060/post-75066
// Author: Edward (Cheetah3D forum), posted 2012-12-01
// Thread: "Jas Utility"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

//==========================================================
//	Jas Utility Demo.js
//----------------------------------------------------------
// This prints the weights produced by the Jas Utility
// script. It works by saving the scene to a temporary
// file, extracting the weight data, and then loading the
// results stored in a JSON file.
//----------------------------------------------------------

function main (document) {
	//------------------------------------------
	// Save the scene
	//------------------------------------------
	document.saveToFile("/tmp/Temp.jas","jas");
	
	//------------------------------------------
	// Extract the weights to a JSON file
	//------------------------------------------
	OS.system("cd ~; python \"Library/Application Support/Cheetah3D/Scripts/Macro/Jas Utility.py\" /tmp/Temp.jas");
	
	//------------------------------------------
	// Load and evaluate the JSON object
	//------------------------------------------
	file = new File("/tmp/Temp.json");
	file.open(READ_MODE);
	eval("var weights = "+file.read(file.size()))
	file.close()
	
	//------------------------------------------
	// Display the results to the console
	//------------------------------------------
	print("--------------------");
	print("      Weights       ");
	print("--------------------");
	
	for (var key in weights) {
		
		print(key);
		
		array = weights[key];
		
		for (var i = 0; i < weights[key].length; i++) {
			print("\t" + weights[key][i].toPrecision(2));
		}
	}
}
