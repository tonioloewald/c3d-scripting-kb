// Source: https://www.cheetah3d.com/forum/index.php?threads/10025/post-84294
// Author: Edward (Cheetah3D forum), posted 2014-01-07
// Thread: "Camera Aspect Ratio Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(tool) {
	
	// ..Removed duplicate 'var selectorArrayMonitor' declaration..
	
	tool.addParameterSeparator("Monitor");
	tool.addParameterSelector("Monitor Size", selectorArrayMonitor, false, false);
	tool.addParameterButton("Set Active Camera", "OK", "setCameraMonitor");
	
	tool.addParameterSeparator("Imperial");
	tool.addParameterSelector("Imperial Size", selectorArrayImperial, false, false);
	tool.addParameterButton("Set Active Camera", "OK", "setCameraImperial");
	
	tool.addParameterSeparator("Metric");
	tool.addParameterSelector("Metric Size", selectorArrayMetric, false, false);
	tool.addParameterButton("Set Active Camera", "OK", "setCameraMetric");
}