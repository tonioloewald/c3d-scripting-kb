// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Prints the names and types of all parameters to the Javascript console
//


function main(doc){
    //get selected object
    var obj=doc.selectedObject();
    
    //test if there is a object
    if(obj==null){
	OS.beep();
	OS.messageBox("Error","Please select a object before calling that script.");
	return;
	}
    
    //get the parameter info array of the object
    var objinfo=obj.parameterInfo();
    
    print("*************************");
    print("**** Parameter Info ****");
    print("*************************");
    
    //print out the parameter info
    for(var i=0;i<objinfo.length;i++){
	print(objinfo[i][0] + "   [" + objinfo[i][1] + "]");
	}
    
    print("\n\n");
}
