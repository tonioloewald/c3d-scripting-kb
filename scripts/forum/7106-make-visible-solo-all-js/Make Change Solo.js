// Source: https://www.cheetah3d.com/forum/index.php?threads/7106/post-58123
// Author: tg_jp (Cheetah3D forum), posted 2011-03-30
// Thread: "Make Visible Solo/All.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Make Change Solo.js
// 
// This is macro script. Place it into ~/Library/Application Support/Cheetah3D/scripts/Macro folder.
// 
// 2011-03-30
// 

var selectionList = [];

var key = 'editorShading'; // parameter name
var recursive = false; // if parameter effects hierarchically, it should be true
var soloValue = 1 // 0 -> shading, 1 -> wireframe, 2 -> bounding box, 3 -> ISO parameter 
var allValue = 0; // 0 -> shading, 1 -> wireframe, 2 -> bounding box, 3 -> ISO parameter

function main(doc) {
	var obj = doc.selectedObject();
	var i, j;
	
	// getting object list to turn visible on.
	selectionList = [];
	
	if (obj == undefined) return;
	
	if (recursive) {
		var parentObj = obj.owner();
		while ( parentObj != undefined ) {
			selectionList.push( parentObj );
			parentObj = parentObj.owner();
		}
	}
	
	selectionList.push( obj );
	
	if (recursive) {
		var cc = obj.childCount();
		for (i = 0;i < cc;i++) {
			selectionList.push( obj.childAtIndex( i ) );
		}
	}
	//
	var root = doc.root();
	if ( root ) {
		makeChange( root, key, allValue );
	}
	
	for (i = 0;i < selectionList.length;i++ ) {
		var tObj = selectionList[i];
		var tcount = tObj.tagCount();
		for (j = 0;j < tcount;j++ ) {
			var tag = tObj.tagAtIndex(j);
			if (tag.type() == 103) {
				tag.setParameter(key, soloValue);
			}
		}
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
			tag.setParameter(key, value );
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