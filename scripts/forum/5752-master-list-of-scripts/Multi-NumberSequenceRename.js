// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-106010
// Author: crgreen (Cheetah3D forum), posted 2017-02-20
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
Multi-NumberSequenceRename.js
Renaming children of a group or parent with number sequencing
Created by crgreen. Object name numbering.
project-wide, or selection-based.
*/

//global:
var x = 0;
//////////


function buildUI( tool ) { 
    tool.addParameterSeparator('Multi-NumberSequenceRename');
    tool.addParameterInt("Start #", 1, 0, 99999, false, false);
    tool.addParameterInt("Add", 1, -10000, 10000, false, false);
    tool.addParameterSeparator('');
    tool.addParameterString("Append Head", "", true);
    tool.addParameterString("Append Tail", "", true);
    tool.addParameterBool("Replace Existing Name", 0,0,1,true,true);
    tool.addParameterSeparator('');
    tool.addParameterBool("Selected only",1,0,1,true,true);
    tool.addParameterSeparator('');
    tool.addParameterSeparator('Section below meaningless');
    tool.addParameterSeparator('if \"Selected only\" is OFF');
    tool.addParameterBool("Recursion",1,0,1,true,true);
    tool.addParameterInt("Recursion Level Max.", 10, 1, 50, false, false);
    tool.addParameterBool("Include Selected Parent",1,0,1,true,true);
    tool.addParameterSeparator('----------------------');
    
    tool.addParameterSeparator('Note: If \'Selected only\'');
    tool.addParameterSeparator('is OFF, action will');
    tool.addParameterSeparator('be attempted on all names.');
    tool.addParameterSeparator('(Supports undo)');
    tool.addParameterButton("Names", "change", "topLevelFunc");
    tool.addParameterSeparator('');
    
}

function topLevelFunc(tool) {
    var doc = tool.document();
	var root = doc.root();
	var startNum = tool.getParameter("Start #");
	var addNum = tool.getParameter("Add");
	var appendHeadTxt = tool.getParameter("Append Head");
	var appendTailTxt = tool.getParameter("Append Tail");
	var selOnly = tool.getParameter("Selected only");
	var recurs = tool.getParameter("Recursion");
	var totalRename = tool.getParameter("Replace Existing Name");
	var recursMax = tool.getParameter("Recursion Level Max.")+1;
	var includeSelParent = tool.getParameter("Include Selected Parent");
	x = startNum - addNum;
	
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
	        includeSelParent = false;
	        recurs = true;
	    }
	    cc=root.childCount();
	    var parentCount = 1;
	    makeChange( root , startNum , addNum, appendHeadTxt, appendTailTxt, recurs, totalRename, recursMax, 1, parentCount, includeSelParent) ;
	}
}

function makeChange( obj, startNum , addNum, appendHeadTxt, appendTailTxt, recurs, totalRename, recursMax, recursCount, parentCount, includeSelParent ) {
	obj.recordParametersForUndo();
	var cc = obj.childCount();
	
	if (includeSelParent) {
	    doRename(obj , startNum , addNum, appendHeadTxt, appendTailTxt, totalRename);
	} else {
	    // if include selected parent is OFF, we only do this if parentCount is greater than default
	    if (parentCount > 1) {doRename(obj , startNum , addNum, appendHeadTxt, appendTailTxt, totalRename);}
	}
	parentCount = (parentCount + 1);
	
	if (recurs) {
		recursCount++;
		
		for (var i = 0;i < cc;i++) {
		    if (recursCount <= recursMax) {
		        var c = obj.childAtIndex( i );
		        makeChange( c, startNum , addNum, appendHeadTxt, appendTailTxt, recurs, totalRename, recursMax, recursCount, parentCount, includeSelParent );
			}
		}
	}
}

function doRename( thisObj , startNum , addNum, headAdd, tailAdd, totalRename) {
    var newTxt = "";
    x = (x + addNum);
    if (thisObj.getParameter("name") != "") {
        obNa = thisObj.getParameter("name").toString();
    }else{
        newTxt = thisObj.getParameter("name");
    }
    if (totalRename) {obNa = "";}
    thisObj.setParameter( "name", (headAdd + obNa + tailAdd + x.toString() ) );
}