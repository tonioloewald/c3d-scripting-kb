// Source: https://www.cheetah3d.com/forum/index.php?threads/10282/post-86329
// Author: ByDesign Games (Cheetah3D forum), posted 2014-03-22
// Thread: "Mass Rename macro now available"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Mass Rename
// Version: 0.1
// Author:	ByDesign Games
// Support:	http://www.bydesignames.com
// 
// (based on: "Global Iterator")
// (c) 2010-11 Tonio Loewald
// 
// Copyright:
//	This script is in the public domain. Feel free to modify it or use it as you wish!
// 
// Purpose: 
//	Traverses scene graph to rename any object containing specified string; useful for removing unwanted namespaces.
// 
// To use:
//	Tools -> Script -> Tool Script -> Mass Renamer
//	Replace "old" with desired string to remove.
//	Replace "new" with new desired or empty string.
//	Enable / Disable Selection Only, to change names only on selected objects.
//	Enable / Disable Recurse Children to change names on child objects.
//	Click Rename!

function buildUI (tool)
{
	tool.addParameterString("Search For", "old", false);
	tool.addParameterString("Replace With", "new", false);
	tool.addParameterBool("Selection Only", true, false, true, false, false);
	tool.addParameterBool("Recurse Children", true, false, true, false, false);
    tool.addParameterButton("Rename","OK","RenameObjs");
}
                                          
function RenameObjs (tool)
{
	var doc = tool.document();
	var fn = function ( obj ) {
		var str = obj.getParameter("name");
		var strPre = tool.getParameter("Search For");
		var strPost = tool.getParameter("Replace With");

		var n = str.indexOf( strPre );
		if ( n == 0 ) {
			// OS.messageBox ( "Results", "Name: " + str + ", found: " + strPre + ", replacing with: " + strPost + ", for a result of: " + str.replace (strPre, strPost) );
			obj.setParameter( "name", str.replace (strPre, strPost) );
		}
	}
	iterateOnObjects( tool, target(tool), fn );
	doc.redrawAll();
}

// sets scope based on UI
function target (tool)
{
	var doc = tool.document();
	if ( tool.getParameter("Selection Only") ) {
		return doc.selectedObject();
	} 
	else {
		return doc.root();
	}
}

// applies a function to every object in the scene
function iterateOnObjects ( tool, obj, fn )
{
	fn( obj );
	if ( tool.getParameter("Recurse Children") ) {
		for( var i=0; i<obj.childCount(); i++ ) {
			iterateOnObjects( tool, obj.childAtIndex(i), fn );
		}
	}
}