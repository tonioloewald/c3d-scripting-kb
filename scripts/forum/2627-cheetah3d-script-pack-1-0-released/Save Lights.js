// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Save lights macro.js
// Rev 1.0 : code added at the end to handle the new lights introduced with 3.2
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
//	Purpose : This script can be used with Cheetah3D to save, in a text file, all the parameters of ALL the lights of a given scene.
//  This script has only been tested with Cheetah3D version 3.1
//	
//  To use it, place it into your "scripts/Macro" folder and select it from the Tools->Script->Macro Script menu.




function main(doc){

	var  root=doc.root()
    
    //get path for file
    var path=OS.runSavePanel("txt");
   if(path==null){
	return;
	}
    
    //open file
    var file = new File(path);
    file.open(WRITE_MODE);
    
    //write some comments at the beginning
    file.writeln("# File created by Cheetah3D");
    file.write("\n\n");
    
    iterateTree(root);



    
function iterateTree(obj){

    var	i;
    
	for(i=0;i<obj.childCount();i++){
	
		var  curr=obj.childAtIndex(i);
		var  objtype=curr.type();
	
		if(objtype==POINTLIGHT || objtype==SPOTLIGHT || objtype==AREALIGHT || objtype==DISTANTLIGHT || objtype==LIGHT){
	    
	    	if (objtype==POINTLIGHT) {
				var	lighttype="POINTLIGHT"
				file.writeln(lighttype);

				var objinfo=curr.parameterInfo();
			
				for(var j=1;j<objinfo.length;j++){
        			var objval=curr.getParameter(objinfo[j][0])
        			
        			if(objinfo[j][0]=="position" || objinfo[j][0]=="scale"){
        				file.writeln(objinfo[j][0] + " :   X= " + objval.x.toPrecision(4) + "  Y= " + objval.y.toPrecision(4) + "  Z= " + objval.z.toPrecision(4));
        				}
         			else if(objinfo[j][0]=="rotation"){
        				file.writeln(objinfo[j][0] + " :   H= " + objval.h.toPrecision(4) + "  P= " + objval.p.toPrecision(4) + "  B= " + objval.b.toPrecision(4));
        				}
        			else if(objinfo[j][0]=="color" || objinfo[j][0]=="shadowColor"){
        				file.writeln(objinfo[j][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
						}
					else if(objinfo[j][0]=="intensity" || objinfo[j][0]=="cutOffAngle" || objinfo[j][0]=="cutOffAtt" || objinfo[j][0]=="shadowBias" || objinfo[j][0]=="ambient" || objinfo[j][0]=="width" || objinfo[j][0]=="height" ){ 
						file.writeln(objinfo[j][0] + " :   " + objval.toPrecision(4));
						}
					else file.writeln(objinfo[j][0] + " :   " + objval);
				}
    
    			file.writeln("\n");
			}
		
		else if(objtype==SPOTLIGHT) {
				var	lighttype="SPOTLIGHT"
				file.writeln(lighttype);

				var objinfo=curr.parameterInfo();
			
				for(var j=1;j<objinfo.length;j++){
        			var objval=curr.getParameter(objinfo[j][0])
        			
        			if(objinfo[j][0]=="position" || objinfo[j][0]=="scale"){
        				file.writeln(objinfo[j][0] + " :   X= " + objval.x.toPrecision(4) + "  Y= " + objval.y.toPrecision(4) + "  Z= " + objval.z.toPrecision(4));
        				}
         			else if(objinfo[j][0]=="rotation"){
        				file.writeln(objinfo[j][0] + " :   H= " + objval.h.toPrecision(4) + "  P= " + objval.p.toPrecision(4) + "  B= " + objval.b.toPrecision(4));
        				}
        			else if(objinfo[j][0]=="color" || objinfo[j][0]=="shadowColor"){
        				file.writeln(objinfo[j][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
						}
					else if(objinfo[j][0]=="intensity" || objinfo[j][0]=="cutOffAngle" || objinfo[j][0]=="cutOffAtt" || objinfo[j][0]=="shadowBias" || objinfo[j][0]=="ambient" || objinfo[j][0]=="width" || objinfo[j][0]=="height" ){ 
						file.writeln(objinfo[j][0] + " :   " + objval.toPrecision(4));
						}
					else file.writeln(objinfo[j][0] + " :   " + objval);
				}
    
    			file.writeln("\n");
			}
		
		else if(objtype==AREALIGHT) {
				var	lighttype="AREALIGHT"
				file.writeln(lighttype);

				var objinfo=curr.parameterInfo();
			
				for(var j=1;j<objinfo.length;j++){
        			var objval=curr.getParameter(objinfo[j][0])
        			
        			if(objinfo[j][0]=="position" || objinfo[j][0]=="scale"){
        				file.writeln(objinfo[j][0] + " :   X= " + objval.x.toPrecision(4) + "  Y= " + objval.y.toPrecision(4) + "  Z= " + objval.z.toPrecision(4));
        				}
         			else if(objinfo[j][0]=="rotation"){
        				file.writeln(objinfo[j][0] + " :   H= " + objval.h.toPrecision(4) + "  P= " + objval.p.toPrecision(4) + "  B= " + objval.b.toPrecision(4));
        				}
        			else if(objinfo[j][0]=="color" || objinfo[j][0]=="shadowColor"){
        				file.writeln(objinfo[j][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
						}
					else if(objinfo[j][0]=="intensity" || objinfo[j][0]=="cutOffAngle" || objinfo[j][0]=="cutOffAtt" || objinfo[j][0]=="shadowBias" || objinfo[j][0]=="ambient" || objinfo[j][0]=="width" || objinfo[j][0]=="height" ){ 
						file.writeln(objinfo[j][0] + " :   " + objval.toPrecision(4));
						}
					else file.writeln(objinfo[j][0] + " :   " + objval);
				}
    
    			file.writeln("\n");
			}
		
		else if(objtype==DISTANTLIGHT) {
				var	lighttype="DISTANTLIGHT";
				file.writeln(lighttype);
			
				var objinfo=curr.parameterInfo();
			
				for(var j=1;j<objinfo.length;j++){
        			var objval=curr.getParameter(objinfo[j][0])
        			
        			if(objinfo[j][0]=="position" || objinfo[j][0]=="scale"){
        				file.writeln(objinfo[j][0] + " :   X= " + objval.x.toPrecision(4) + "  Y= " + objval.y.toPrecision(4) + "  Z= " + objval.z.toPrecision(4));
        				}
         			else if(objinfo[j][0]=="rotation"){
        				file.writeln(objinfo[j][0] + " :   H= " + objval.h.toPrecision(4) + "  P= " + objval.p.toPrecision(4) + "  B= " + objval.b.toPrecision(4));
        				}
        			else if(objinfo[j][0]=="color" || objinfo[j][0]=="shadowColor"){
        				file.writeln(objinfo[j][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
						}
					else if(objinfo[j][0]=="intensity" || objinfo[j][0]=="cutOffAngle" || objinfo[j][0]=="cutOffAtt" || objinfo[j][0]=="shadowBias" || objinfo[j][0]=="ambient" || objinfo[j][0]=="width" || objinfo[j][0]=="height" ){ 
						file.writeln(objinfo[j][0] + " :   " + objval.toPrecision(4));
						}
					else file.writeln(objinfo[j][0] + " :   " + objval);
				}
    
    			file.writeln("\n");
			}
	    
		// This section does handle the new lights introduced in C3D version 3.2
		else if(objtype==LIGHT) {

				Lights = new Array("AMBIENT", "AREA", "DISTANT", "POINT", "SPOT");
				
				var objinfo=curr.parameterInfo();
				var lightVal=Lights[curr.getParameter(objinfo[5][0])];
				
				file.writeln(lightVal+ " LIGHT (v3.2)");
						
				for(var j=1;j<objinfo.length;j++){
        			var objval=curr.getParameter(objinfo[j][0])
        			
        			if(objinfo[j][0]=="position" || objinfo[j][0]=="scale"){
        				file.writeln(objinfo[j][0] + " :   X= " + objval.x.toPrecision(4) + "  Y= " + objval.y.toPrecision(4) + "  Z= " + objval.z.toPrecision(4));
        				}
         			else if(objinfo[j][0]=="rotation"){
        				file.writeln(objinfo[j][0] + " :   H= " + objval.h.toPrecision(4) + "  P= " + objval.p.toPrecision(4) + "  B= " + objval.b.toPrecision(4));
        				}
        			else if(objinfo[j][0]=="color" || objinfo[j][0]=="shadowColor"){
        				file.writeln(objinfo[j][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
						}
					else if(objinfo[j][0]=="intensity" || objinfo[j][0]=="cutOffAngle" || objinfo[j][0]=="cutOffAtt" || objinfo[j][0]=="shadowBias" || objinfo[j][0]=="ambient" || objinfo[j][0]=="width" || objinfo[j][0]=="height" ){ 
						file.writeln(objinfo[j][0] + " :   " + objval.toPrecision(4));
						}
					else file.writeln(objinfo[j][0] + " :   " + objval);
				}
    
    			file.writeln("\n");
			}
	    
	    
	    }
	iterateTree(curr);
    
	}
}

//close file
file.close();

print("Lights parameters saved");
}
