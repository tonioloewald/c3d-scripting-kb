//
// CustomCamera.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Exports a selected spline object to a ASCII file.
// Usage:   
//      1. Select a spline object in the object browser.
//      2. Execute the script.
//


function main(doc){
    //get selected object
    var splineobj=doc.selectedObject();
    
    //test if the object is a spline
    if(splineobj==null || splineobj.family()!=SPLINEFAMILY){
	OS.beep();
	OS.messageBox("Error","Please select a spline before calling that script.");
	return;
	}
    
    //get destination path
    var path=OS.runSavePanel();
    if(path==null){
	return;
	}
    
    //open file located at path
    var file=new File(path);
    file.open(WRITE_MODE);
    if(file.isOpen()==false){
	return;
	}
    
    //export
    var obj2world=splineobj.obj2WorldMatrix();
    var spline=splineobj.core();
    for(var i=0;i<spline.pathCount();i++){
	var data=spline.cache(i);
	
	if(data!=null){
	    file.writeln("pathelements " + data.length);
	    for(var j=0;j<data.length;j++){
		var vec=obj2world.multiply(data[j]);
		file.writeln(vec.x.toPrecision(5) + " " + vec.y.toPrecision(5) + " " + vec.z.toPrecision(5));
		}
	    file.writeln("");
	    }
	}
    
    file.close();
}