// Source: https://www.cheetah3d.com/forum/index.php?threads/12890/post-111861
// Author: KurtF (Cheetah3D forum), posted 2018-05-05
// Thread: "soloSelected"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// showAll is a Macro Script that turns the visibility of all scene
// objects (except cameras and lights) On. Best use is to turn objects back
// on after they have been turned off with soloSelected.
// Place showAll into the Macro folder and launch (or restart) Cheetah 3D.

// This script is based on several ideas gleaned from scripts by Users Hiroto,
// Martin Wengenmayer, and others. Script by Kurt Fillmore, May 2018.

// Feel free to use or modify for your own creations.

function main(doc){

var selectedObject = doc.selectedObject();

var sceneRoot = doc.root();

var rootChildCount = sceneRoot.childCount();

for(var i=0; i<rootChildCount; i++)

	{
	var object = sceneRoot.childAtIndex(i);
	
	var objType = object.type();
	
	if(objType != 2 && objType != 5 )
	
		{
		
		var tag = object.tagAtIndex(0);
		
		tag.setParameter("editorActive", true);
				
		}
	}

	var myTag = selectedObject.tagAtIndex(0);
	
	myTag.setParameter("editorActive", true);

}