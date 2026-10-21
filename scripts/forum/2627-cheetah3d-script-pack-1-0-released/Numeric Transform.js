// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	NUMERIC TRANSFORM v1.1 - A tool script for Cheetah3D 3.x or greater
//	Matt Howell, http://luddite.n3.net
//	Feel free to use this script and its code however you see fit.

//	Takes the point, edge, or polygon selection and performs basic operations/numeric tranformations on it

//	Usage: Place this into scripts/Tool folder, restart Cheetah3D, then select from Tools -> Script -> Tool Script


var title = 'Numeric Transform';

function buildUI(tool) {
	tool.addParameterSeparator(title);
	if (!tool.document().editMode) tool.addParameterSelector('Use selected',['points','edges','polygons'],false,false);	// Mode is automatic in 4.0 and greater, but needs a menu in 3.x
	tool.addParameterButton('Get position','Get','getPos');
	tool.addParameterButton('Set position','Set','setPos');
	tool.addParameterFloat('X-axis',0,-9999,9999,false,false);
	tool.addParameterFloat('Y-axis',0,-9999,9999,false,false);
	tool.addParameterFloat('Z-axis',0,-9999,9999,false,false);
	tool.addParameterButton('Translate','Translate','translate');
	tool.addParameterButton('Rotate','Rotate','rotate');
	tool.addParameterButton('Scale','Scale','scale');
	tool.addParameterBool('Allow scaling to zero',false,false,false,false,false);
	tool.addParameterSeparator('Help');
	tool.addParameterButton('More info','About','help');
}

// Defining constants for the menu items above
aGET_POS = 0;
aSET_POS = 1;
aTRANSLATE = 2;
aROTATE = 3;
aSCALE = 4;

mPOINTS = 0;
mEDGES = 1;
mPOLYGONS = 2;

function getPos(tool) { go(tool,aGET_POS); }
function setPos(tool) { go(tool,aSET_POS); }
function translate(tool) { go(tool,aTRANSLATE); }
function rotate(tool) { go(tool,aROTATE); }
function scale(tool) { go(tool,aSCALE); }

function help() {
	OS.messageBox(title,'This script will take the current point, edge, or polygon selection and perform transformations numerically, such as rotating by 30 degrees or scaling by 2.  It will also allow you to get or set the position of the selection by its centerpoint.\n\nIf the "allow scaling by zero" option is not checked when scaling, any zero values will automatically be changed to 1.');
}

function vectorMath(subj,operation,val) {	// Takes two Vec3Ds (or one Vec3D and a number, which is turned into a suitable Vec3D) and which operation to perform, and returns the resulting Vec3D
	var vec1 = subj.copy();
	if (typeof(val) != 'number') var vec2 = val.copy();
	else var vec2 = new Vec3D(val,val,val);
	
	if (operation == '+') {
		vec1.x += vec2.x;
		vec1.y += vec2.y;
		vec1.z += vec2.z;
	} else if (operation == '-') {
		vec1.x -= vec2.x;
		vec1.y -= vec2.y;
		vec1.z -= vec2.z;
	} else if (operation == '*') {
		vec1.x *= vec2.x;
		vec1.y *= vec2.y;
		vec1.z *= vec2.z;
	}
	return vec1;
}

function findCenter(core,points) {	// Finds the centerpoint of a group of vertices
	for (iter in points) {
		if (xMax == null) {
			var xMin = core.vertex(points[iter]).x;
			var xMax = core.vertex(points[iter]).x;
			var yMin = core.vertex(points[iter]).y;
			var yMax = core.vertex(points[iter]).y;
			var zMin = core.vertex(points[iter]).z;
			var zMax = core.vertex(points[iter]).z;
		} else {
			var xMin = Math.min(xMin,core.vertex(points[iter]).x);
			var xMax = Math.max(xMax,core.vertex(points[iter]).x);
			var yMin = Math.min(yMin,core.vertex(points[iter]).y);
			var yMax = Math.max(yMax,core.vertex(points[iter]).y);
			var zMin = Math.min(zMin,core.vertex(points[iter]).z);
			var zMax = Math.max(zMax,core.vertex(points[iter]).z);
		}
	}
	var xCenter = xMin + .5 * (xMax-xMin);
	var yCenter = yMin + .5 * (yMax-yMin);
	var zCenter = zMin + .5 * (zMax-zMin);
	var centerPt = new Vec3D(xCenter,yCenter,zCenter);
	return centerPt;
}

function setCenter(core,vSelected,posVec) {	// Moves a group of vertices so that their center is at posVec
	var centerPt = findCenter(core,vSelected);
	for (iter in vSelected) {
		var moveFrom = vectorMath(core.vertex(vSelected[iter]),'-',centerPt);
		var moveTo = vectorMath(posVec,'+',moveFrom);
		core.setVertex(vSelected[iter],moveTo);
	}
}

function go(tool,action) {
	var doc = tool.document();
	var selectedObj = doc.selectedObject();
	var core = doc.selectedObject().core();
	
	if (selectedObj && core) {
		if (doc.editMode) {	// Mode is automatic in 4.0 and greater, but needs a menu in 3.x
			var mode = doc.editMode();
			var selErr = 'Please make a point, edge, or polygon selection first.';
		} else {
			var mode = tool.getParameter('Use selected');
			var selErr = 'Please make a selection in the specified mode first.';
		}
		
		var toolVals = new Vec3D(tool.getParameter('X-axis'),tool.getParameter('Y-axis'),tool.getParameter('Z-axis'));
		
		// Okay, the first thing we need to do is get the vertices that we're going to operate on
		var vSelected = new Array();
		if (mode == mPOINTS) {	// Simple, just loop through all vertices and find selected ones
			var vCount = core.vertexCount();
			for (var iter=0; iter<vCount; iter++) {
				if (core.vertexSelection(iter)) vSelected.push(iter);
			}
		
		} else if (mode == mEDGES) {	// The most complicated -- we have to loop through every edge in every poly to see if it's selected...
			var polyCount = core.polygonCount();
			for (var iter1=0; iter1<polyCount; iter1++) {
				var ptCount = core.polygonSize(iter1);
				for (var iter2=0; iter2<ptCount; iter2++) {
					if (core.edgeSelection(iter1,iter2,SELECT)) {
						vSelected.push(core.vertexIndex(iter1,iter2));	// And then get the vertex that matches the edge's index, plus the next vertex
						if (iter2 == ptCount-1) vSelected.push(core.vertexIndex(iter1,0));
						else vSelected.push(core.vertexIndex(iter1,iter2+1));
					}
				}
			}
		
		} else if (mode == mPOLYGONS) {	// Loop through each poly, see if it's selected
			var polyCount = core.polygonCount();
			for (var iter1=0; iter1<polyCount; iter1++) {
				if (core.polygonSelection(iter1)) {
					var ptCount = core.polygonSize(iter1);
					for (var iter2=0; iter2<ptCount; iter2++) vSelected.push(core.vertexIndex(iter1,iter2));	// If so, get all its vertices
				}
			}
		}
			
		if (vSelected.length == 0) {
			OS.messageBox(title,selErr);
			return;
		} else {
			doc.retainRedrawLock();	// Save some time by suspending UI redraws
			
			if (mode != mPOINTS) {	// Remove any redundant vertices (identical numbers), resulting from adjacent polys or edges
				var unique = new Array();	// (why doesn't Javascript have a function to do this kind of cleanup?)
				for (iter1 in vSelected) {
					var found = false;
					for (iter2 in unique) {
						if (vSelected[iter1]==unique[iter2]) {
							found = true;
							break;
						}
					}
					if (!found) unique.push(vSelected[iter1]);
				}
				vSelected = unique;
			}
		}
		
		if (action == aGET_POS) {
			var centerPt = findCenter(core,vSelected);
			tool.setParameter('X-axis',centerPt.x);
			tool.setParameter('Y-axis',centerPt.y);
			tool.setParameter('Z-axis',centerPt.z);
		
		} else if (action == aSET_POS) {
			setCenter(core,vSelected,toolVals);
		
		// And now... the transformation matrix functions!
		
		} else if (action == aTRANSLATE) {
			var matrix = new Mat4D(TRANSLATE,toolVals.x,toolVals.y,toolVals.z);
			for (iter in vSelected) {
				var result = matrix.multiply(core.vertex(vSelected[iter]));
				core.setVertex(vSelected[iter],result);
			}
		
		} else if (action == aROTATE) {
			var matrix = new Mat4D(ROTATE,toolVals.x,toolVals.y,toolVals.z);
			var centerPt = findCenter(core,vSelected);
			setCenter(core,vSelected,vectorMath(centerPt,'*',-1));
			for (iter in vSelected) {
				var result = matrix.multiply(core.vertex(vSelected[iter]));
				core.setVertex(vSelected[iter],result);
			}
			setCenter(core,vSelected,centerPt);
		
		} else if (action == aSCALE) {
			if (!tool.getParameter('Allow scaling to zero')) {	// Don't let us scale to 0 unless we REALLY wanted to
				if (toolVals.x == 0) {
					toolVals.x = 1;
					tool.setParameter('X-axis',1);
				}
				if (toolVals.y == 0) {
					toolVals.y = 1;
					tool.setParameter('Y-axis',1);
				}
				if (toolVals.z == 0) {
					toolVals.z = 1;
					tool.setParameter('Z-axis',1);
				}
			}
			var matrix = new Mat4D(SCALE,toolVals.x,toolVals.y,toolVals.z);
			var centerPt = findCenter(core,vSelected);
			setCenter(core,vSelected,vectorMath(centerPt,'*',-1));
			for (iter in vSelected) {
				var result = matrix.multiply(core.vertex(vSelected[iter]));
				core.setVertex(vSelected[iter],result);
			}
			setCenter(core,vSelected,centerPt);				
		}
		
		selectedObj.update();	// Update the object; fix normals, etc.
	
		doc.releaseRedrawLock();	// We're done, release the UI
		doc.redrawAll();
	} else {
		OS.messageBox(title,'Please make a selection within a polygon object first.');
	}
}