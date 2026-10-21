// Source: https://www.cheetah3d.com/forum/index.php?threads/7106/post-58123
// Author: tg_jp (Cheetah3D forum), posted 2011-03-30
// Thread: "Make Visible Solo/All.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Make Change All.js
// 
// This is macro script. Place it into ~/Library/Application Support/Cheetah3D/scripts/Macro folder.
// 
// 2011-03-30
// 

var key = 'editorShading'; // parameter name
var recursive = false; // if parameter effects hierarchically, it should be true
var allValue = 0; // 0 -> shading, 1 -> wireframe, 2 -> bounding box, 3 -> ISO parameter

function main(doc) {
	var root = doc.root();
	if ( root ) {
		makeChange( root, key, allValue );
	}
}

function makeChange( obj, key, value ) {
	var cc = obj.childCount();
	
	if (1) { // 1 => recursive / 0 => no recursive
		for (var i = 0;i < cc;i++) {
			var c = obj.childAtIndex( i );
			makeChange( c, key, value );
		}
	}
	
	var tcount = obj.tagCount();
	if (tcount > 1) {
		var tag = obj.tagAtIndex(1); // mode tag's index will be 1.
		if (tag.type() == 103) {
			// 
			tag.setParameter(key, value);
		}
	}
	/*
	for (var i = 0;i < tcount;++i) {
		var tag = obj.tagAtIndex(i);
		if (tag.type() == 103) {
			// 
			tag.setParameter(key, value );
		}
	}
	*/
}