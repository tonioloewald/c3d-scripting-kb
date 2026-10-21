// Source: https://www.cheetah3d.com/forum/index.php?threads/2565/post-17752
// Author: ToddWR (Cheetah3D forum), posted 2008-01-15
// Thread: "relax and be Centered"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// Usage: Place this into scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//

Vec3D.prototype.toString = function() {
	return "(" + this.x.toFixed(4) + ", " + this.y.toFixed(4) + ", " + this.z.toFixed(4) + ")";
}

Array.prototype.indexOf = function(str) {
	for(var i=0;i<this.length;i++)
		if( this[i] == str)
			return i;
	return -1;
}

var selected = false;
// every script in cheetah needs to have this function
// it adds the controls for user input
function buildUI(obj){	
	// this adds a button to the UI
	// the paramters...  Center on is the label
	//  Object is the button label
	//  DoObject is the function name, called when the button is clicked
	obj.addParameterButton("Center on","Object","DoObject");
	obj.addParameterButton("Center","Selected","DoSelected");
}

function DoObject(obj) {
	selected = false;
	DoIt(obj);
}

function DoSelected(obj) {
	selected = true;
	DoIt(obj);
}

function DoIt(obj) {
	// the passed in object is used to get the document
	var root = obj.document();
	// the root is then used to find the selected object
	var o = root.selectedObject();
	// if nothing is selected do nothing
	if( o == null)
		return;
	// this call return which mode is selected
	// the mode will only matter if the selected button is clicked
	var mode = root.editMode();
	// which is one of the following: POINT_MODE, EDGE_MODE, POLY_MODE or OBJECT_MODE
	// the action this script takes depends on the edit mode of cheetah
	//   mode           action
	// -------------|------------
	// POINT_MODE       add up the selected points and move center to middle, if 2 points are selected 
	//                  move and align the ceter so the center is a pivit point
	// EDGE_MODE        use only the end points of all the selected edges, if 1 edge is selected
	//                  move the location to the middle of the line and adjust the heading and pitch.
	// POLY_MODE        use only the selected favces to find the new center.
	// OBJECT_MODE      nothing happens here
	//--------------------------
	// each object that is in cheetahs menu, ball, cube, etc...
	// has it own type. when those types are changed to a editable
	// form, it is changed into a POLYGONOBJ
	switch( o.type()) {
	case FOLDER:
		// a folder is an empty item. all it has is what every
		// object has name, position, rotation, scale
		// any object inside of cheetah can contain other objects
		// these are called child objects
		var loc = new Vec3D(0,0,0);
		// grab the number of children this folder has
		var size = o.childCount();
		var count = 0;
		// to cycle thru all the children of an object
		for( var i=0; i < size;i++) {
			// the value goes from 0 to childCount - 1
			var child = o.childAtIndex(i);
			var p = objCenter(child,selected,mode);
			if( p[1] != 0) {
				p[0] = child.objMatrix().multiply(p[0]);
				loc = loc.add( p[0]);
				count++;
			}
		}
		if(count == 0) return;
		// figure out the average location
		loc = loc.multiply(1/count);
		//print(count + "-" + loc.toString());
		// loop thru all the children again, altering the locations
		for(i=0;i<size;i++) {
			var child = o.childAtIndex(i);
			child.setParameter("position",child.getParameter("position").sub(loc));
		}
		// adjust the location of the folder
		o.setParameter("position",o.getParameter("position").add(loc));
		o.update();
		break;
	case POLYGONOBJ:
		// calling a function that returns an array, this is a shortcut
		var loc = objCenter(o,selected,mode);
		if(loc[1] == 0) return;
		// loc is now the point that is the center point of the object
		// use it to alter the vertexes in the object
		objAdjust(o,loc[0]);
		// now to adjust the center of the object by adding the position
		o.setParameter("position",o.getParameter("position").add(loc[0]));
		// then tell cheetah to update the object
		o.update();
	
		break;
	}
}


// these lines of code were made into their own function
// for them they could be called several times for objects
// inside of folders
function objCenter(obj,selected,mode) {
	var core;
	var size;
	var loc;
	var count = 0;
	var m = obj.objMatrix();
	// given an object return the objects centers
	if( selected && mode != OBJECT_MODE) {
		switch(mode) {
		case POINT_MODE:
			core = obj.modCore();	
			size = core.vertexCount();
			loc = new Vec3D(0,0,0);
			for( var i = 0; i < size;i++) {
				if( core.vertexSelection(i)) { 
					var v = core.vertex(i);
					loc = loc.add(v);
					count++;
				}
			}
			if(count != 0)
				loc = loc.multiply(1/count);
			break;
		case EDGE_MODE:
			core = obj.modCore();	
			size = core.polygonCount();
			var used = new Array();
			loc = new Vec3D(0,0,0);
			for(var i = 0;i<size;i++) {
				var size2 = core.polygonSize(i);
				for(var j=0;j<size2;j++) {
					if(core.edgeSelection(i,j,SELECT)) {
						var v1 = core.vertexIndex(i,j);
						var v2 = core.vertexIndex(i,(j+1)%size2);
						var s = Math.min(v1,v2)+","+Math.max(v1,v2);
						if( used.indexOf(s) == -1) {
							loc = loc.add(core.vertex(v1));
							loc = loc.add(core.vertex(v2));
							count++;
							used.push(s);
						}
					}
				}
			}
			if(count != 0)
				loc = loc.multiply(1/(2*count));
			break;
		case POLY_MODE:
			core = obj.modCore();	
			size = core.polygonCount();
			loc = new Vec3D(0,0,0);
			var used = new Array();
			for(var i = 0;i<size;i++) {
				if( core.polygonSelection(i)) {
					var size2 = core.polygonSize(i);
					for(var j=0;j<size2;j++) {
						var v1 = core.vertexIndex(i,j);
						var v2 = core.vertexIndex(i,(j+1)%size2);
						var s = Math.min(v1,v2)+","+Math.max(v1,v2);
						if( used.indexOf(s) == -1) {
							loc = loc.add(core.vertex(v1));
							loc = loc.add(core.vertex(v2));
							count++;
							used.push(s);
						}
					}
				}
			}
			if(count != 0)
				loc = loc.multiply(1/(2*count));
			break;
		}
	} else {
		// now take the object and ask for the polyCore object
		// this is asking for the points of the object after any modiferies are applied
		core = obj.modCore();	
		// now that we have the core of the object, ask how many points are in it
		size = core.vertexCount();
		// now set an accumalator to zero
		loc = core.vertex(0);
		// now loop thru all the points
		for( var i = 0; i < size;i++) {
			// grab the vertex
			var v = core.vertex(i);
			// add them all to the accum
			loc = loc.add(v);
		}
		// now devide the total by the number of points
		// it has to be done this way because there is no .divide operator
		loc = loc.multiply(1/size);
		// return this result on index 0 of the result array
		count = size;
	}
	var result = new Array();
	result[0] = loc;
	result[1] = count;
	return result;
}

function objAdjust(obj,point) {
	var core = obj.modCore();	
	// now that we have the core of the object, ask how many points are in it
	var size = core.vertexCount();
	// loop thru all the points
	for(  i = 0; i < size;i++) {
		// take each point and subtract out the center
		var v = core.vertex(i).sub(point);
		// then reset the point to the new position
		core.setVertex(i,v);
	}

}













