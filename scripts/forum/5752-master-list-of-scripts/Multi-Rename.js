// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-106010
// Author: crgreen (Cheetah3D forum), posted 2017-02-20
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
Multi-Rename.js
Created by crgreen. Pretty basic renaming. Includes appending.
project-wide, or selection-based.
*/

function buildUI( tool ) { 
    tool.addParameterSeparator('Multi-Rename');   
    tool.addParameterString("Search for", "", true);
    tool.addParameterString("Replace with", "", true);
    tool.addParameterSeparator('');
    tool.addParameterString("Append Head", "", true);
    tool.addParameterString("Append Tail", "", true);
    tool.addParameterSeparator('');
    tool.addParameterBool("Selected only",1,0,1,true,true);
    tool.addParameterBool("Recursion",1,0,1,true,true);
    tool.addParameterInt("Recursion Level Max.", 1, 1, 50, false, false);
    tool.addParameterSeparator('Note: If \'Selected only\'');
    tool.addParameterSeparator('is OFF, action will');
    tool.addParameterSeparator('be attempted on all objects.');
    tool.addParameterSeparator('(Supports undo)');
    tool.addParameterButton("Names", "change", "topLevelFunc");
    tool.addParameterSeparator('');
    
}

function topLevelFunc(tool) {
    var doc = tool.document();
	var root = doc.root();
	var searchTxt = tool.getParameter("Search for");
	var replTxt = tool.getParameter("Replace with");
	var appendHeadTxt = tool.getParameter("Append Head");
	var appendTailTxt = tool.getParameter("Append Tail");
	var selOnly = tool.getParameter("Selected only");
	var recurs = tool.getParameter("Recursion");
	var recursMax = tool.getParameter("Recursion Level Max.")+1;
	
	if (selOnly) {
	    var root = doc.selectedObject();
		try {
		    root.childCount();
        } catch (error) {
            root = false;
	    }
    }
	
	if ( root ) {
	    if (! selOnly) {
	        recurs = true;//it's weird if we leave children switch on for 'do all' setting
	    }
	    cc=root.childCount();//why is this here?
	    makeChange( root , searchTxt , replTxt, appendHeadTxt, appendTailTxt, recurs, recursMax, 1) ;
	    
	}
}

function makeChange( obj, searchTxt , replTxt, appendHeadTxt, appendTailTxt, recurs, recursMax, recursCount ) {
    obj.recordParametersForUndo();
	var cc = obj.childCount();
	
	doRename(obj , searchTxt , replTxt, appendHeadTxt, appendTailTxt);
	
	if (recurs) {
	    recursCount++;
		for (var i = 0;i < cc;i++) {
		    if (recursCount <= recursMax) {
                var c = obj.childAtIndex( i );
		        makeChange( c, searchTxt , replTxt, appendHeadTxt, appendTailTxt, recurs, recursMax, recursCount );		        		        
		    }
		    
		}
	}
}

function doRename( thisObj , searchTxt , replTxt, headAdd, tailAdd) {
    var newTxt = "";
    if (thisObj.getParameter("name") != "") {
        obNa = thisObj.getParameter("name").toString();
        newTxt = ( obNa.replace(searchTxt,replTxt).toString() );
    }else{
        newTxt = thisObj.getParameter("name");
    }
    
    thisObj.setParameter( "name", (headAdd + newTxt + tailAdd) );
}