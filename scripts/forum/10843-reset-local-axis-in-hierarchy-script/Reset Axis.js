// Source: https://www.cheetah3d.com/forum/index.php?threads/10843/post-91579
// Author: artgolf (Cheetah3D forum), posted 2014-11-18
// Thread: "Reset local axis in hierarchy script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 	Pose Utilities.js

	©2010-12 Tonio Loewald
	Permission to use, copy, and modify with attribution is hereby granted.
	
	May 2013
	version 5, trying to fix problem with flipping in new rotation system
	
	February 16 2010
	Version 4, fixed error handling (paste without copy)
	
	February 15 2010
	Version 3, added extensive comments
	
	February 14 2010
	Version 2, added copy, paste, and paste flipped
	Version 1, initial release
	
	March 31 2012
	Set the default naming convention to Left/Right (to make tutorials in the book easier)
	
	This is a TOOL script
*/

var version = "5";

// Naming conventions (left prefix,right prefix). Note that suffixes aren't supported because I don't use them
// To support suffixes a simple option might simply be to use a special character (e.g. …) to represent the body,
// so '….L,….R' would be recognized as a suffix pair.
var conventions = ['left,right', 'L,R', 'l,r', 'L-,R-','l-,r-', 'Left-,Right-', 'left-,right-'];

var pitchaxis = ['X', 'Y', 'Z'];

// We declare the clipboard out here so it can retain state between calls (at least, while the tool remains active).
var clipboard = {};

function alert( msg ){
	OS.beep();
	OS.messageBox( 'Error', msg );
}

// Wouldn't it be cool if we could simply allow the user to type in his/her naming convention, and remember it between
// sessions? Hint, hint Martin!
function buildUI(tool) {
    tool.addParameterSeparator("Pose Utilities v" + version);
	tool.addParameterButton("Zero Rotations","OK","reset");
    tool.addParameterButton("Reset Axis","OK","reset2");
    tool.addParameterSeparator("Mirroring");
    tool.addParameterSelector("Naming Convention",conventions,false,false);
    tool.addParameterSelector("Second Axis",pitchaxis,false,false);
    tool.addParameterButton("Swap Right and Left","OK","flip");
	tool.addParameterButton("Copy Right-to-Left", "OK","mirror_r2l");
	tool.addParameterButton("Copy Left-to-Right", "OK","mirror_l2r");
	tool.addParameterButton("Mirror and Rename", "OK","mirror");
	tool.addParameterButton("Copy Pose","OK","copy");
	tool.addParameterButton("Paste Pose","OK","paste");
	tool.addParameterButton("Paste Pose Swapped","OK","paste_flipped");
}

/*
	Reset all the rotations in a hierarchy.
	This is about as simple as it gets.
*/
function reset(tool) {
	// We create a zero vector OUTSIDE the function we're about to define
	var z = new Vec3D();

	// We declare a simple function that sets the passed object's rotation
	// to our locally defined zero vector, but because the function is defined
	// in the variable's scope, it's a CLOSURE around that variable
	var f = function( obj ){
		obj.setParameter("rotation", z);
	}
	
	// We use the global iterator to apply this function to the selected
	// object (and all its descendants). All in five lines of code.
	iterateTree(tool.document().selectedObject(), f)
}

/*
	Reset all the local axis in a hierarchy.
	This is about as simple as it gets.
 */
function reset2(tool) {
    // We create a zero vector OUTSIDE the function we're about to define
    var z = new Vec3D();
    
    var base = tool.document().selectedObject();
    var global_mats = valueList2( base );
    var local_mats = valueList3( base );
    var parents = valueList4( base );
    
    // We declare a simple function that sets the passed object's rotation
    // to our locally defined zero vector, but because the function is defined
    // in the variable's scope, it's a CLOSURE around that variable
    
    var f = function( obj ){
        var name = obj.getParameter('name');
        
        var mat_parent;
        if (!parents[name]) {
            mat_parent = new Mat4D();
        } else {
            mat_parent = global_mats[parents[name]];
        }
        var mat = mat_parent.multiply(local_mats[name]);
        
        var pos = new Vec3D(mat.m03, mat.m13, mat.m23);
        var pos_origin = new Vec3D(mat_parent.m03, mat_parent.m13, mat_parent.m23);
        
        var p = pos.sub(pos_origin);
        
        obj.setParameter("position", p);

        obj.setParameter("rotation", z);
        obj.setParameter("prefrot", z);
        obj.setParameter("postrot", z);
        obj.setParameter("prerot", z);
    }
    iterateTree( base, f );
}

/*
	Copy all the rotations and positions in the selected hierarchy to our
	"clipboard".
*/
function copy(tool){
	var base = tool.document().selectedObject();
	clipboard = [];
	clipboard.rotations = valueList( base, 'rotation' );
	clipboard.positions = valueList( base, 'position' );
}

/*
	Apply saved rotations and positions to items in the selected hierarchy
	with matching names.
*/
function paste(tool){
	var base = tool.document().selectedObject();
	if( clipboard.rotations ){
		var f = function( obj ){
			copy_property( obj, clipboard.rotations, 'rotation' );
			copy_property( obj, clipboard.positions, 'position' );
		}
		iterateTree( base, f );
	} else {
		alert( 'Copy a pose first!' );
	}
}

/*
	Apply flipped rotations and positions to items in the selected hierarchy with
	the appropriate (flipped) names.
*/
function paste_flipped(tool){
	var base = tool.document().selectedObject();
	var names = conventions[tool.getParameter('Naming Convention')].split(',');
    var pitch = pitchaxis[tool.getParameter('Second Axis')];
	
	if( clipboard.rotations ){
		var f = function( obj ){
			copy_flipped_property( obj, names[0], names[1], clipboard.rotations, 'rotation', pitch );
			copy_flipped_property( obj, names[1], names[0], clipboard.rotations, 'rotation', pitch );
			copy_flipped_property( obj, names[0], names[1], clipboard.positions, 'position', pitch );
			copy_flipped_property( obj, names[1], names[0], clipboard.positions, 'position', pitch );
		}
		iterateTree( base, f );
	} else {
		alert( 'Copy a pose first!' );
	}
}

/*
	Copy a named property to an object from a list -- if it's there
*/
function copy_property( obj, list, prop_name ){
	s = obj.getParameter('name');
	if( list[s] ){
		obj.setParameter( prop_name, list[s] );
	}
}

/*
	Copy a flipped property to an object from a list -- if it's there
*/
function copy_flipped_property( obj, from, to, list, prop_name, pitch ){
	var s = obj.getParameter('name');
	if( s.substr(0, to.length ) == to ){
		s = from + s.substr(to.length);
		if( list[s] ){
			var p = list[s];
			switch( prop_name ){
				case 'position':
					p.x = -p.x;
					break;
				case 'rotation':
                    switch(pitch) {
                        case 'X':
                            p.x = -p.x;
                            p.z = -p.z;
                            break;
                        case 'Y':
                            p.y = -p.y;
                            p.z = -p.z;
                            break;
                        case 'Z':
                            p.x = -p.x;
                            p.y = -p.y;
                            break;
                    }
					break;
			}
			obj.setParameter(prop_name, p);
		}
	}
}

/*
	Flip the hierarchy's pose (rotations and positions) by first storing them all
	and then flipping them and assigning them to the corresponding opposite items
*/
function flip(tool){
	var base = tool.document().selectedObject();
	var rotations = valueList( base, 'rotation' );
	var positions = valueList( base, 'position' );
	var names = conventions[tool.getParameter('Naming Convention')].split(',');
    var pitch = pitchaxis[tool.getParameter('Second Axis')];
	
	var f = function( obj ){
		copy_flipped_property( obj, names[0], names[1], rotations, 'rotation', pitch );
		copy_flipped_property( obj, names[1], names[0], rotations, 'rotation', pitch );
		copy_flipped_property( obj, names[0], names[1], positions, 'position', pitch );
		copy_flipped_property( obj, names[1], names[0], positions, 'position', pitch );
	}
	iterateTree( base, f );
}

/*
	Copy left-side pose to the right-side
*/
function mirror_l2r(tool){
	var base = tool.document().selectedObject();
	var rotations = valueList( base, 'rotation' );
	var positions = valueList( base, 'position' );
	var names = conventions[tool.getParameter('Naming Convention')].split(',');
    var pitch = pitchaxis[tool.getParameter('Second Axis')];
	
	var f = function( obj ){
		copy_flipped_property( obj, names[0], names[1], rotations, 'rotation', pitch );
		copy_flipped_property( obj, names[0], names[1], positions, 'position', pitch );
	}
	iterateTree( base, f );
}

/*
	Copy right-side pose to the left-side
*/
function mirror_r2l(tool){
	var base = tool.document().selectedObject();
	var rotations = valueList( base, 'rotation' );
	var positions = valueList( base, 'position' );
	var names = conventions[tool.getParameter('Naming Convention')].split(',');
    var pitch = pitchaxis[tool.getParameter('Second Axis')];
	
	var f = function( obj ){
		copy_flipped_property( obj, names[1], names[0], rotations, 'rotation', pitch );
		copy_flipped_property( obj, names[1], names[0], positions, 'position', pitch );
	}
	iterateTree( base, f );
}

/*
	Exchange joints hierarchy
*/
function mirror(tool){
	var base = tool.document().selectedObject(),
		names = conventions[tool.getParameter('Naming Convention')].split(',');
    var pitch = pitchaxis[tool.getParameter('Second Axis')];
	
	var f = function( obj ){
		var p, s;
		
		s = obj.getParameter( 'name' );
		if( s.substr(0, names[0].length) === names[0] ){
			s = names[1] + s.substr(names[0].length);
		} else if ( s.substr(0, names[1].length) === names[1] ){
			s = names[0] + s.substr(names[1].length);
		} else {
			return;
		}
		obj.setParameter('name', s);
		p = obj.getParameter( 'position' );
		p.x = -p.x;
		obj.setParameter( 'position', p );
		
		p = obj.getParameter( 'rotation' );
        switch(pitch) {
            case 'X':
                p.x = -p.x;
                p.z = -p.z;
                break;
            case 'Y':
                p.y = -p.y;
                p.z = -p.z;
                break;
            case 'Z':
                p.x = -p.x;
                p.y = -p.y;
                break;
        }
		obj.setParameter( 'rotation', p );
	}
	iterateTree( base, f );
}

// create a look-up table of parameters of objects contained in the base object
function valueList( base, param ){
	var props = [];
	var f = function( obj ){
		props[obj.getParameter('name')] = obj.getParameter( param );
	}
	iterateTree( base, f );
	return props;
}

// create a look-up table of parameters of objects contained in the base object
function valueList2( base ){
    var props = [];
    var f = function( obj ){
        props[obj.getParameter('name')] = obj.obj2WorldMatrix();
    }
    iterateTree( base, f );
    return props;
}

// create a look-up table of parameters of objects contained in the base object
function valueList3( base ){
    var props = [];
    var f = function( obj ){
        props[obj.getParameter('name')] = obj.objMatrix();
    }
    iterateTree( base, f );
    return props;
}

// create a look-up table of parameters of objects contained in the base object
function valueList4( base ){
    var props = [];
    var f = function( obj ){
        for( var i=0; i<obj.childCount(); i++ ){
            props[obj.childAtIndex(i).getParameter('name')] = obj.getParameter('name');
        }
    }
    iterateTree( base, f );
    return props;
}

/*
	This is a neat JavaScript trick -- pass it an object and a function and it applies the
	function recursively to the object and all of its descendants. You'll see this pattern
	all the way through the preceding code -- define a function and then pass the selected
	object (or the scene root) and that function to iterateTree.
*/
function iterateTree(obj, fn){
	fn( obj );
    for( var i=0; i<obj.childCount(); i++ ){
		iterateTree( obj.childAtIndex(i), fn );
	}
}