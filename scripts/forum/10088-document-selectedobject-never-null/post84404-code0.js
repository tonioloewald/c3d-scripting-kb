// Source: https://www.cheetah3d.com/forum/index.php?threads/10088/post-84404
// Author: Edward (Cheetah3D forum), posted 2014-01-11
// Thread: "document.selectedObject never null"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc){
    //get selected object
    var obj=doc.selectedObject();
    
    //test if there is a object
    if(obj.owner()==null){
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