//
// Scale light intensity.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Goes down the hole scene graph and multiplies the 
//	intensity of every light by a certain factor which
//	has to be specified via the UI.
//


function buildUI(tool){
    tool.addParameterSeparator("Scale light intensity.js");
    tool.addParameterFloat("factor",1.1,0.0,10.0,true,true);
    tool.addParameterButton("apply","OK","apply");
}


function apply(tool){ 
    var  doc=tool.document();
    var  root=doc.root();
    
    var factor=tool.getParameter("factor");

    iterateTree(root,factor);
}


function iterateTree(obj,factor){
    var	i;
    
    for(i=0;i<obj.childCount();i++){
	var  curr=obj.childAtIndex(i);
	var  objtype=curr.type();
	
	if(objtype==LIGHT){
	    var	intensity=curr.getParameter("intensity");
	    
	    curr.setParameter("intensity",intensity*factor);
	    }
	
	iterateTree(curr,factor);
	}
    }

