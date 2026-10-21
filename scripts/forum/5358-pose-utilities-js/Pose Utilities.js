// Source: https://www.cheetah3d.com/forum/index.php?threads/5358/post-127350
// Author: frank beckmann (Cheetah3D forum), posted 2023-09-15
// Thread: "Pose Utilities.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 	Pose Utilities.js

	©2010 Tonio Loewald
	Permission to use, copy, and modify with attribution is hereby granted.
	
	February 16 2010
	Version 4, fixed error handling (paste without copy)
	
	February 15 2010
	Version 3, added extensive comments
	
	February 14 2010
	Version 2, added copy, paste, and paste flipped
	Version 1, initial release
	
	This is a TOOL script
*/

// Naming conventions (left prefix,right prefix). Note that suffixes aren't supported because I don't use them
// To support suffixes a simple option might simply be to use a special character (e.g. …) to represent the body,
// so '….L,….R' would be recognized as a suffix pair.
var conventions = ['L-,R-','l-,r-','L,R','Left-,Right-','left-,right-'];

// We declare the clipboard out here so it can retain state between calls (at least, while the tool remains active).
var clipboard = {};

function alert( msg ){
	OS.beep();
	OS.messageBox( 'Error', msg );
}

// Wouldn't it be cool if we could simply allow the user to type in his/her naming convention, and remember it between
// sessions? Hint, hint Martin!
function buildUI(tool) {
	tool.addParameterButton("Zero Rotations","OK","reset");
    tool.addParameterSeparator("Mirroring");
    tool.addParameterSelector("Naming Convention",conventions,false,false);
    tool.addParameterButton("Swap Right and Left","OK","flip");
	tool.addParameterButton("Copy Right-to-Left", "OK","mirror_r2l");
	tool.addParameterButton("Copy Left-to-Right", "OK","mirror_l2r");
	tool.addParameterButton("Flip", "OK","mirror");
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
	
	if( clipboard.rotations ){
		var f = function( obj ){
			copy_flipped_property( obj, names[0], names[1], clipboard.rotations, 'rotation' );
			copy_flipped_property( obj, names[1], names[0], clipboard.rotations, 'rotation' ); 
			copy_flipped_property( obj, names[0], names[1], clipboard.positions, 'position' );
			copy_flipped_property( obj, names[1], names[0], clipboard.positions, 'position' ); 
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
function copy_flipped_property( obj, from, to, list, prop_name ){
	s = obj.getParameter('name');
	if( s.substr(0, to.length ) == to ){
		s = from + s.substr(to.length);
		if( list[s] ){
			var p = list[s];
			switch( prop_name ){
				case 'position':
					p.x = -p.x;
					break;
				case 'rotation':
					p.z = -p.z;
					p.x = -p.x;
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
	
	var f = function( obj ){
		copy_flipped_property( obj, names[0], names[1], rotations, 'rotation' );
		copy_flipped_property( obj, names[1], names[0], rotations, 'rotation' ); 
		copy_flipped_property( obj, names[0], names[1], positions, 'position' );
		copy_flipped_property( obj, names[1], names[0], positions, 'position' ); 
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
	
	var f = function( obj ){
		copy_flipped_property( obj, names[0], names[1], rotations, 'rotation' );
		copy_flipped_property( obj, names[0], names[1], positions, 'position' );
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
	
	var f = function( obj ){
		copy_flipped_property( obj, names[1], names[0], rotations, 'rotation' );
		copy_flipped_property( obj, names[1], names[0], positions, 'position' ); 
	}
	iterateTree( base, f );
}

function mirror(tool){
	var base = tool.document().selectedObject();
	
	var f = function( obj ){	
		var p;
		
		p = obj.getParameter( 'position' );
		p.x = -p.x;
		obj.setParameter( 'position', p );
		
		p = obj.getParameter( 'rotation' );
		p.z = -p.z;
		p.x = -p.x;
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