// Source: https://www.cheetah3d.com/forum/index.php?threads/3537/post-24976
// Author: podperson (Cheetah3D forum), posted 2008-09-28
// Thread: "Center Bounds"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
	Center_Bounds
	
	Based on Todd WR's center.js
	
	Usage: 
	Place this into scripts/Tool folder.
	Restart Cheetah3D.
	Then select from Tools -> Scripts -> Tool Script
*/
function buildUI(obj){
	// I'm using three parameters to determine what happens to the X, Y, and Z coordinates
	// 0 will set a coordinate to the bounding box minimum, 1 to the maximum. The default will center it.
	obj.addParameterFloat("X", 0.5, 0, 1, false, false);
	obj.addParameterFloat("Y", 0.5, 0, 1, false, false);
	obj.addParameterFloat("Z", 0.5, 0, 1, false, false);
	obj.addParameterButton("Recenter","OK","DoObject");
}

function DoObject(obj) {
	var root = obj.document();
	var o = root.selectedObject();
	// if nothing is selected, we bail out
	if( o == null)
		return;

	var core = o.modCore();	
	// now that we have the core of the object, ask how many points are in it
	var size = core.vertexCount();
	// if the object has no points, we bail out (note this is missing from the original script)
	if( size == 0 )
		return;

	// Todd's script averages all the vertices of the mesh to find the center. This is almost certainly
	// NOT what a modeler expects for any complex or assymmetric mesh. I'm going to calculate the bounding
	// box and use that instead...
	var minLoc = core.vertex(0); // will hold the minimum x, y, and z
	var maxLoc = core.vertex(0); // will hold the maximum x, y, and z
	// Note that the only safe starting point for min and max value is a datapoint from the initial dataset
	
	// p is a scratch vector we'll be using
	var p = new Vec3D(0,0,0);
	for( var i = 0; i < size;i++) {
		p = core.vertex(i);
		minLoc.x = p.x < minLoc.x ? p.x : minLoc.x;
		minLoc.y = p.y < minLoc.y ? p.y : minLoc.y;
		minLoc.z = p.z < minLoc.z ? p.z : minLoc.z;
		maxLoc.x = p.x > maxLoc.x ? p.x : maxLoc.x;
		maxLoc.y = p.y > maxLoc.y ? p.y : maxLoc.y;
		maxLoc.z = p.z > maxLoc.z ? p.z : maxLoc.z;
	}
	
	// we're now going to set p's coordinates to weighted values somewhere between the minimum and
	// maximum X, Y, and Z values we found
	p.x = minLoc.x + obj.getParameter("X") * (maxLoc.x - minLoc.x);
	p.y = minLoc.y + obj.getParameter("Y") * (maxLoc.y - minLoc.y);
	p.z = minLoc.z + obj.getParameter("Z") * (maxLoc.z - minLoc.z);
	for(  i = 0; i < size;i++) {
		var v = core.vertex(i).sub(p);
		core.setVertex(i,v);
	}
	o.setParameter("position",o.getParameter("position").add(p));
	o.update();
}
