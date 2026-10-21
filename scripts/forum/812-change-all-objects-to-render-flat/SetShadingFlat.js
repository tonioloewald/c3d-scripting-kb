// Source: https://www.cheetah3d.com/forum/index.php?threads/812/post-5169
// Author: Martin (Cheetah3D forum), posted 2006-07-31
// Thread: "Change all objects to render 'flat'"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Sets the shading type of all objects in the scene to flat
//


function main(doc){
    
    //go recursively through the hole scenegraph
    setObject(doc.root()); 
}


function setObject(obj){

    //set normalType to flat if obj is a polygon object
    if(obj.family()==NGONFAMILY){
	obj.setParameter("normalType",0);
	}
    
    
    //save child objects if obj is not a creator object
    for(var i=0;i<obj.childCount();i++){
	var  zwi=obj.childAtIndex(i);
	    
	setObject(zwi);
	}
}




