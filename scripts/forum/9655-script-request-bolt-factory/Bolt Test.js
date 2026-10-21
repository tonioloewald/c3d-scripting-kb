// Source: https://www.cheetah3d.com/forum/index.php?threads/9655/post-79677
// Author: Swizl (Cheetah3D forum), posted 2013-06-11
// Thread: "Script Request: Bolt Factory"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//Bolts.js
//(c) 2012 Simon Strom

//This script is in the public domain. Feel free to modify it or use 
//it as a starting point for your own creations.
//Purpose: 
//Creates Bolts and Nuts at either standard presets, or user defined parameters.
//Put into script folder Polygonobj

// ADD IN FUTURE VERSIONS:
// 1. Model: (Nut or Bold) 
//		- This effects all settings below. 
//		- Need to figure out how to make this modal in the UI. 
// 2. Preset Sizes: (Metric or Imperial)
//		- Create one list with all, or make modal also?
// 3. Bit Type: (None, Allen & Phillips, Other?)
// 4. Head Type Selection:
//		Bolt: (Counter-Sink, Pan, Dome, Cap, or Hex) 
//		Nut:  (Hex or Lock)

function buildUI(obj){
// DIVIDER
	obj.setParameter("name","Bolts & Nuts");
	obj.addParameterSelector("Select Model Type",["Bolt","Nut"],true,true); // Main Selector
	
// UI Elements
	obj.addParameterSeparator("BOLT HEAD");
	obj.addParameterSelector("Nut Type",["Hex","Lock"],true,true); // Only for Nuts
	obj.addParameterSelector("Presets",["M12","M10","M8","M6","M5","M4","M3"],true,true);
	obj.addParameterSelector("Bit Type",["None","Allen","Phillips"],true,true); // Only for Bolts
	obj.addParameterSelector("Bolt Head Shape",["Counter-Sink","Pan","Dome","Cap","Hex"],true,true); // Only for Bolts

	
// Settings below used for both Nuts and Bolts.
	obj.addParameterFloat("Head Height",1,0,1000,true,true);
	obj.addParameterFloat("Flat Distance",10,3,1000,true,true);

// Settings below are only used for Bolts.
// DIVIDER
	obj.addParameterSeparator("BOLT SHANK");
	obj.addParameterFloat("Shank Length",1,1,1000,true,true);
	obj.addParameterFloat("Shank Diameter",.03,0,1000,true,true);

// DIVIDER
	obj.addParameterSeparator("BOLT THREAD");
	
// UI Elements
	obj.addParameterFloat("Thread Length",5,0,1000,true,true);
	obj.addParameterFloat("Major Diameter",2,0,1000,true,true); //for Debug: it was 2
	obj.addParameterFloat("Minor Diameter",0,0,1,true,true);
	obj.addParameterFloat("Pitch",0,0,1,true,true);
	obj.addParameterFloat("Crest Percent",0,0,1,true,true);
	obj.addParameterFloat("Root Percent",0,0,1,true,true);
}

function buildObject(obj){
	var Head_Height			=obj.getParameter("Head Height");
	var Flat_Distance		=obj.getParameter("Flat Distance");
	var Shank_Length		=obj.getParameter("Shank Length");
	var Shank_Diameter		=obj.getParameter("Shank Diameter");
	var Thread_Length		=obj.getParameter("Thread Length");
	var Major_Diameter		=obj.getParameter("Major Diameter");
	var Minor_Diameter		=obj.getParameter("Minor Diameter");
	var Pitch				=obj.getParameter("Pitch");
	var Crest_Percent		=obj.getParameter("Crest Percent");
	var Root_Percent		=obj.getParameter("Root Percent");
}