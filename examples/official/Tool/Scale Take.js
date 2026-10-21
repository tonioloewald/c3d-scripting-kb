//
// Sample script to show how to work with takes and FCurves  (toolscript)
//

function buildUI(tool) {
    tool.addParameterSeparator("Scale Animation");
    tool.addParameterFloat("factor",0.5,0.0,10.0,false,false);
    tool.addParameterButton("apply","OK","apply");
}


function apply(tool) {
    var doc = tool.document();
    var root = doc.root();
    var factor= tool.getParameter("factor");
    
    //get current take
    var take = doc.currentTake();
    
    //scale the FCurves of all objects recursively
    if(take!=null){
	recursive(root,take.name,factor);
	}
}


function recursive(obj,takename,factor) {
    
    //go through all parameters
    for(var i=0;i<obj.parameterCount();i++){
	var para=obj.parameterAtIndex(i);
	
	//get the takenode with the name takename
	var takenode=para.takeNodeWithName(takename);
	
	//if such a takenode was found scale its fcurves
	if(takenode!=null){
	    for(var j=0;j<takenode.fCurveCount();j++){
		var	fcurve=takenode.fCurveAtIndex(j);
		
		//finally process the keys in the fcurve
		for(var k=0;k<fcurve.keyCount();k++){
		    //get key
		    var  key=fcurve.keyAtIndex(k);
		    
		    //scale the time
		    key.left_time*=factor;
		    key.right_time*=factor;
		    key.time*=factor;
		    
		    //set back the key
		    fcurve.setKeyAtIndex(key,k);
		    }
		    
		//always update the fcurve after editing it
		fcurve.update();
		}
	    }
	}
    
    
    //go down the tree recursively
    for (var i=0;i<obj.childCount();i++) {
	recursive(obj.childAtIndex(i),takename,factor);
        }
}
