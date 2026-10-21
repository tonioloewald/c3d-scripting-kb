// Source: https://www.cheetah3d.com/forum/index.php?threads/1099/post-6870
// Author: ToddWR (Cheetah3D forum), posted 2006-11-29
// Thread: "a tale of two splines"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	Between Splines.js
//
// Todd Rogers
// Usage: Place this into scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//
//
//	11/28/06  V1 : released and forgot
//            V2 : fixed by using the object matrix
//            V3 : sets the new objects center between the splines centers 
var objectOne = null;
var splineOne = null;

function buildUI(tool){
    
    tool.addParameterSeparator("Between Splines.js");
    tool.addParameterInt("Divisions",10,1,1000,false,false);
    tool.addParameterButton("First Spline","select","getFirst");
    tool.addParameterSeparator("Select the second spline");
    tool.addParameterButton("Create ","OK","makeIt");
    tool.addParameterSeparator("-");
    tool.addParameterButton("About/Help ","Help","showIt");
}

function getFirst(tool) {
    var  doc=tool.document();
	var object = doc.selectedObject();
	if( object == null) {
		OS.messageBox("Error","Nothing was selected.");
		return;
	}
	splineOne = object.modCore();
	if( splineOne == null) {
		OS.messageBox("Error","Object's spline core is null.");
		return;
	}
	if( object.family() != SPLINEFAMILY) {
		OS.messageBox("Error","Object was not a spline.");
		splineOne = null;
		return;
	}
	objectOne = object;
}

function makeIt(tool){
	if( splineOne == null )
		return;
    var doc=tool.document();
	var object = doc.selectedObject();
	if( object == null) {
		OS.messageBox("Error","Nothing was selected.");
		return;
	}
	var splineTwo = object.modCore();
	if( splineTwo == null) {
		OS.messageBox("Error","Object's spline core is null.");
		return;
	}
	if( object.family() != SPLINEFAMILY) {
		OS.messageBox("Error","Object was not a spline.");
		return;
	}
	var newObject = doc.addObject(POLYGONOBJ);
	var core = newObject.core();
	
	//	the spline might have more than 1 path
	//	just look at the first one
	var pth1 = splineOne.cache(0);
	var lst1 = new Array();
	var len1 = calcSplineLength(pth1,lst1);
	
	var pth2 = splineTwo.cache(0);
	var lst2 = new Array();
	var len2 = calcSplineLength(pth2,lst2);
	
	var t1 = objectOne.obj2WorldMatrix();
	var t2 = object.obj2WorldMatrix();
	// grab the x,y,z locations of the two Mat4Ds
	var x = (t1.m03 + t2.m03)/2;
	var y = (t1.m13 + t2.m13)/2;
	var z = (t1.m23 + t2.m23)/2;
	var t = new Mat4D(TRANSLATE,-x,-y,-z);
	// I did this in order to create an object with a more local center
	var div = tool.getParameter("Divisions");
	var i;
	var p1 = pointFromPercentage(pth1,lst1,0);
	var p2 = pointFromPercentage(pth2,lst2,0);
	p1 = t.multiply(t1.multiply(p1));
	p2 = t.multiply(t2.multiply(p2));
	for(i=0;i<div;i++) {
		var p3 = pointFromPercentage(pth2,lst2,(i+1)/div);
		var p4 = pointFromPercentage(pth1,lst1,(i+1)/div);
		p3 = t.multiply(t2.multiply(p3));
		p4 = t.multiply(t1.multiply(p4));
		var p = [p1,p2,p3,p4];
		core.addPolygon(4,true,p);
//		core.addPolygon(4,true,p,u);
		// tried to install UV coords but just couldn't get them right
		// if your reading this your welcome to try your hand at it
		p1 = p4;
		p2 = p3;
	}
	newObject.setParameter("position",new Vec3D(x,y,z));
	newObject.update();
}

function calcLen(p1,p2) {
	var p = p1.sub(p2);
	return Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
}

function calcSplineLength(points,lst) {
	var l = points.length;
	var i;
	var accum = 0;
	lst[0] = 0;
	for(i=0;i<l-1;i++) {
		var p = points[i+1].sub(points[i]);
		accum = accum + Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
		lst[i+1] = accum;
	}
	for(i=0;i<l;i++) {
		lst[i] = lst[i]/accum;
	}
	return accum;
}

// percent must be >= 0 and <= 1
function pointFromPercentage(path,lst,percent) {
	var i;
	var d = percent;
	for(i=1;i < path.length - 1;i++) 
		if( percent < lst[i]) 
			break;
	var p1 = path[i-1];
	var p2 = path[i];
	//	convert d into a percentage between the two points
	d = (d - lst[i-1])/(lst[i] - lst[i-1]);
	p1 = p1.multiply(1-d).add(p2.multiply(d));
	return p1;
}


function showIt(tool){
	OS.messageBox("About / Help","Between Splines\r\
by Todd Rogers.\r\r\
To use:\r\
	Set the number of divisions for the splines;\r\
	Select first spline object;\r\
	click select;\r\
	select the second spline object;\r\
	click OK");
}















