//
// RotateObject.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Renders a sequence of images of a rotating object.
// Usage:   
//      1. Select a object in the object browser.
//      2. Execute the script.
//      3. Now 18 images will be rendered .The selected object will be rotated by 10 degree around the Y axis every frame.
//  Parameters:
var stepsize=10;    //in degree
var steps=36;       //number of images

function main(doc){
    //get selected object
    var obj=doc.selectedObject();
    
    //test if there is a object
    if(obj==null){
	OS.beep();
	OS.messageBox("Error","Please select a object before calling that script.");
	return;
	}
    
    //get initial rotation
    var startrot=obj.getParameter("rotation");
    
    for(var i=0;i<steps;i++){
	//create the new rotation vector
	var newrot=new Vec3D(startrot.h+i*stepsize, startrot.p, startrot.b);
	
	//set the new rotation value
	obj.setParameter("rotation",newrot);
	
	//render the frame
	doc.render();
	}
    
    //set back old rotation
    obj.setParameter("rotation",startrot);
}