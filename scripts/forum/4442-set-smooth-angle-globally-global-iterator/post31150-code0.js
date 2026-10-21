// Source: https://www.cheetah3d.com/forum/index.php?threads/4442/post-31150
// Author: podperson (Cheetah3D forum), posted 2009-08-02
// Thread: "Set Smooth Angle Globally / Global Iterator"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(tool){
    tool.addParameterSeparator("Set Smooth Angle");
    tool.addParameterFloat("Angle",15.0,0.0,90.0,true,true);
    tool.addParameterButton("Set Smooth Angle","OK","set_smooth");
}

function set_smooth(tool){ 
    var doc = tool.document();
    var angle = tool.getParameter("Angle");

// here we create a function which will be run on every object in the scene
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
// note that we're using the LOCAL variable angle, which is stored in 
// the function as a closure (don't worry, it "just works")
			obj.setParameter("normalAngle", angle);
		}
	}
// we could call it on document.selectedNode() instead, but it would then be
// really hard to do the whole scene
    iterateTree(doc.root(), fn);
}


// iterateTree applies fn to every obj in the entire scene -- how slick is that?
function iterateTree(obj, fn){
	fn( obj );
    for( var i=0; i<obj.childCount(); i++ ){
		iterateTree( obj.childAtIndex(i), fn );
	}
}