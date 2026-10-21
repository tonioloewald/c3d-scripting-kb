// Source: https://www.cheetah3d.com/forum/index.php?threads/1072/post-6729
// Author: Martin (Cheetah3D forum), posted 2006-11-22
// Thread: "scripts using standard objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// (c) 2006 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Shows how to create objets via Javascript
// Usage:
//	Copy this script in the ~/Library/Application Support/Cheetah3D/scripts/Macro/ folder. After restarting 
//	Cheetah3D the script will appear in the Tools->Scripts->Macro menu


function main(doc){
    var	    i;
    
    for(i=0;i<10;i++){
	var obj=doc.addObject(CONE);
	
	obj.setParameter("position",new Vec3D(2*Math.sin(i*0.1*2*Math.PI),0,2*Math.cos(i*0.1*2*Math.PI)));
	obj.setParameter("scale",new Vec3D(1-i*0.05,1-i*0.05,1-i*0.05));
	}
}
