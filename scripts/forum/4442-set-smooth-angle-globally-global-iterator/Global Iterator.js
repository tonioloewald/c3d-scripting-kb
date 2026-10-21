// Source: https://www.cheetah3d.com/forum/index.php?threads/4442/post-31150
// Author: podperson (Cheetah3D forum), posted 2009-08-02
// Thread: "Set Smooth Angle Globally / Global Iterator"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Global Iterator
//
// Loosely based on "Scale Light Intensity.js"
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Goes down the whole scene graph and multiplies the 
//	intensity of every light by a certain factor which
//	has to be specified via the UI.
//

function buildUI(tool){
    tool.addParameterSeparator("Set Smooth Angle");
    tool.addParameterFloat("Angle",15.0,0.0,90.0,true,true);
    tool.addParameterButton("Set Smooth Angle","OK","set_smooth");
}

function set_smooth(tool){ 
    var doc = tool.document();
    // var root = doc.selectedObject() ? doc.selectedObject() : doc.root();
    var angle = tool.getParameter("Angle");
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
			obj.setParameter("normalAngle", angle);
		}
	}
    iterateTree(doc.root(), fn);
}


function iterateTree(obj, fn){
	fn( obj );
    for( var i=0; i<obj.childCount(); i++ ){
		iterateTree( obj.childAtIndex(i), fn );
	}
}
