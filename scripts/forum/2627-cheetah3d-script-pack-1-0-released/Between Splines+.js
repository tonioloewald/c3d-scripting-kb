// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	Between Splines+.js
//
// Todd Rogers
// Usage: Place this into scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//
//
//	11/28/06  V1 : released and forgot
//            V2 : fixed by using the object matrix
//            V3 : sets the new objects center between the splines centers 
//	11/29/06  V1 : modded to use childern instead of selecting one and then another

// hold each of the splines list of points
var pth = new Array();
// this is the list of percentages for the above splines
var lst = new Array();
// the array of object matrixes
var mat = new Array();


function buildUI(tool){
    
    tool.addParameterSeparator("Between Splines+.js");
    tool.addParameterInt("Divisions",50,1,1000,false,false);
    tool.addParameterBool("Flip",false,false,true,false,false);
    tool.addParameterButton("Create ","OK","makeIt");
    tool.addParameterSeparator("-");
    tool.addParameterButton("About/Help ","Help","showIt");
}

function makeIt(tool){
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
	
	pth[0] = object.modCore().cache(0);
	lst[0] = new Array();
	calcSplineLength(pth[0],lst[0]);
	mat[0] = object.obj2WorldMatrix();
	// this will find the center of the new object
	var x = mat[0].m03;
	var y = mat[0].m13;
	var z = mat[0].m23;

	// gather info about the children of the spline
	var n = object.childCount();
	if(n > 0) {
		var i;
		//print("scanning " + n + " objects");
		for( i = 0; i< n; i++) {
			var c = object.childAtIndex(i);
			//print("index "+i+"  " + c.family() + ":" + SPLINEFAMILY);
				// gather only the spline info
			if( c.family() == SPLINEFAMILY) {
				pth[i+1] = c.modCore().cache(0);
				lst[i+1] = new Array();
				calcSplineLength(pth[i+1],lst[i+1]);
				mat[i+1] = c.obj2WorldMatrix();
				x = x + mat[i+1].m03;
				y = y + mat[i+1].m13;
				z = z + mat[i+1].m23;
			} 
			
		}
		if(lst.length < 2) {
			OS.messageBox("Error","There are no spline objects in the selected object.");
			return;
		}
		x = x / mat.length;
		y = y / mat.length;
		z = z / mat.length;
	} else {
		OS.messageBox("Error","Please add spline objects to the select object.");
		return;
	}
	
	var newObject = doc.addObject(POLYGONOBJ);
	var core = newObject.core();
	
	var t = new Mat4D(TRANSLATE,-x,-y,-z);
	//print( "x = " + x + "  y = " + y + "   z = " + z);
	var div = tool.getParameter("Divisions");
	var flip = tool.getParameter("Flip");
	var i,j;
	var pth1;
	var lst1;
	var mat1;
	var pth2;
	var lst2;
	var mat2;
	for(j = 0; j<n;j++) {
		if( flip) {
			pth1 = pth[j];
			lst1 = lst[j];
			mat1 = mat[j];
			pth2 = pth[j+1];
			lst2 = lst[j+1];
			mat2 = mat[j+1];
		} else {
			pth2 = pth[j];
			lst2 = lst[j];
			mat2 = mat[j];
			pth1 = pth[j+1];
			lst1 = lst[j+1];
			mat1 = mat[j+1];
		}
		var p1 = pointFromPercentage(pth1,lst1,0);
		var p2 = pointFromPercentage(pth2,lst2,0);
		p1 = t.multiply(mat1.multiply(p1));
		p2 = t.multiply(mat2.multiply(p2));
		for(i=0;i<div;i++) {
			var p3 = pointFromPercentage(pth2,lst2,(i+1)/div);
			var p4 = pointFromPercentage(pth1,lst1,(i+1)/div);
			p3 = t.multiply(mat2.multiply(p3));
			p4 = t.multiply(mat1.multiply(p4));
			var p = [p1,p2,p3,p4];
			core.addPolygon(4,true,p);
			p1 = p4;
			p2 = p3;
		}
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
	OS.messageBox("About / Help","Between Splines+\r\
by Todd Rogers.\r\r\
To use:\r\
	Set the number of divisions for the splines;\r\
	Select spline object containing other splines;\r\
	click OK");
}















