// Source: https://www.cheetah3d.com/forum/index.php?threads/10376/post-87098
// Author: McShaman (Cheetah3D forum), posted 2014-04-21
// Thread: "Array of all objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function getChildObjects( root, nest ) {
	
	// Set nest default
	if( typeof nest === 'undefined' ) {
		nest = true;
	}
	
	var objects = []; // Array of child objects
	
	var count = root.childCount();
	
	for( var i = 0; i < count; i++ ) {
		
		var object = root.childAtIndex( i );
		
		objects.push( object );
		
		// Process all nested child objects
		if( object.childCount && nest ) {
			
			objects = objects.concat( getChildObjects( object ) );
			
		}
		
	}
	
	return( objects );
	
}

function main( doc ) {

	var root = doc.root();
	
	var allObjects = getChildObjects( root );
	
}