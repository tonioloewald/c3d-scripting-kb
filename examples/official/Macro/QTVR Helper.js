//
// QTVR Helper.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Macro script which renders the six views which are needed
//      for creating a QTVR. 
//	    Existing images will be overwritten.
//
// Usage:
//      1. Set up the scene you want to render
//      2. Position the camera at the center of the planed QTVR.
//      3. Call the "QTVR Helper.js" script.
//      4. Cheetah3D now renders the six necessary images for a QTVR.

function main(doc){
    var cam=doc.activeCamera();
    
    if(cam==null) return; 
    
    var oldROT=cam.getParameter("rotation");
    var oldFOV=cam.getParameter("fieldOfView");
    
    //get filename
    var path=OS.runSavePanel();
    if(path==null){
	return;
	}
        
    var file=new File(path);
    var lastpathcomp=file.lastPathComponent();
    var dir=file.directory()+"/";
    var comps= lastpathcomp.split(/\./);
    var filename=comps[0];
    
    //set camera field of view
    cam.setParameter("fieldOfView",90);
	
    //first image dir (front) -Z
    cam.setParameter("rotation",new Vec3D(0,0,0));
    doc.render(dir+filename+"1.tiff");
    
    //first image dir (right) +X
    cam.setParameter("rotation",new Vec3D(-90,0,0));
    doc.render(dir+filename+"2.tiff");
    
    //first image dir (back) +Z
    cam.setParameter("rotation",new Vec3D(-180,0,0));
    doc.render(dir+filename+"3.tiff");
    
    //first image dir (left) -X
    cam.setParameter("rotation",new Vec3D(-270,0,0));
    doc.render(dir+filename+"4.tiff");
    
    //first image dir (top) +Y
    cam.setParameter("rotation",new Vec3D(0,90,0));
    doc.render(dir+filename+"5.tiff");

    //first image dir (bottom) -Y
    cam.setParameter("rotation",new Vec3D(0,-90,0));
    doc.render(dir+filename+"6.tiff");
    
    //restore camera state
    cam.setParameter("rotation",oldROT);
    cam.setParameter("fieldOfView",oldFOV);
}



