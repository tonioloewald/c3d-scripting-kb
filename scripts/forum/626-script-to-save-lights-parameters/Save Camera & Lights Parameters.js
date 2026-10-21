// Source: https://www.cheetah3d.com/forum/index.php?threads/626/post-19797
// Author: Francois (Cheetah3D forum), posted 2008-03-26
// Thread: "Script to save lights parameters"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Save Camera & Lights Parameters.js
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose : This script can be used with Cheetah3D to save, in a text file, all the parameters of the active camera as well as all the lights parameters of a given scene.
// In addition, the camera tags (HDRI, Radiosity, etc ... ) are also saved.
//	
// To use it, place it into your "scripts/Macro" folder and select it from the Tools->Script->Macro Script menu.
//
// Only tested with Cheetah3D version 4.5.1



//	Camera parameters to be saved (objinfo[k][0])
	CamParameters = new Array (7,2,3,10,11,12,13,14,15,16,17,19,20,21,22,23,24);
	
//	Camera tags parameters to be saved (taginfo[k][0])
	Caustic = new Array(5,7,9,8);
	Fog = new Array(5,11,7,10,8);
	Hdri = new Array(5,7,9,10,11,8,12);
	Rad = new Array(5,12,7,11,15,8,13,14);
	
//	light parameters to be saved (objinfo[k][0])
	Ambient = new Array (2,3,11,12);
	Area = new Array (2,3,9,11,12,13,14,15,16,17,23,22,10,26,24);
	Distant = new Array (2,3,9,11,12,16,17,23,22,26,24);
	Point = new Array (2,3,11,12,13,14,15,18,23,22,10,26,24);
	Spot = new Array (2,3,9,11,12,13,14,15,23,22,21,19,20,26,24);
	SkyLight = new Array (2,3,8,9,10,11,13,14,15,17,16,12);

//	Strings to replace actual camera parameters values
	projectionMode = new Array("perspective","panorama","orthographic");
	shadowsMode = new Array("Off" , "On");
	antialiasingarray = new Array("color" , "edge");
	minsamplesarray = new Array("1/4 x 1/4" , "1/2 x 1/2" , "1 x 1" , "2 x 2" , "4 x 4" , "8 x 8" , "16 x 16" );
	maxsamplesarray = new Array("1 x 1" , "2 x 2" , "4 x 4" , "8 x 8" , "16 x 16" );

//	Strings to replace actual tag parameters values
	hdrimode = new Array("probe","cross","panorama");
	radmode = new Array("Ambient occlusion","Radiosity");
	fogarray = new Array("linear","exp","exp^2");	

//	Strings to replace actual light parameters values
	lights = new Array("Ambient","Area","Distant","Point","Spot");
	spottypes = new Array("round","rect");
	attenuations = new Array("none", "1/r" , "1/(r^2)");
	shadowtypes = new Array("none" , "raytrace" , "raytrace+trans");
	axesarray = new Array("-X" , "-Y" , "-Z");
	noyesarray = new Array("No" , "Yes");


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
    
 	//get the camera parameters  
    var cam=doc.activeCamera();
    var objinfo=cam.parameterInfo();
						
	for(var j=0;j<CamParameters.length;j++){
	k = CamParameters[j]
    var objval=cam.getParameter(objinfo[k][0])
        			
        if(objinfo[k][0]=="position"){
        file.writeln(objinfo[k][0] + " :   X= " + objval.x.toFixed(3) + "  Y= " + objval.y.toFixed(3) + "  Z= " + objval.z.toFixed(3));
        }
        else if(objinfo[k][0]=="rotation"){
        file.writeln(objinfo[k][0] + " :   H= " + objval.h.toFixed(3) + "  P= " + objval.p.toFixed(3) + "  B= " + objval.b.toFixed(3));
        }
        else if(objinfo[k][0]=="backgroundColor"){
        file.writeln(objinfo[k][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
		}
		else if(objinfo[k][0]=="activeCamera"){
		active = shadowsMode[curr.getParameter(objinfo[k][0])];		//using the same Off/On string as shadows to make it easier
        file.writeln(objinfo[k][0] + " :  " + active);
		}
		else if(objinfo[k][0]=="clipNear" || objinfo[k][0]=="clipFar" || objinfo[k][0]=="antialiasingTolerance" || objinfo[k][0]=="fieldOfView"){ 
		file.writeln(objinfo[k][0] + " :   " + objval.toFixed(3));
		}
        else if(objinfo[k][0]=="projection"){
		projection = projectionMode[cam.getParameter(objinfo[k][0])];
		file.writeln(objinfo[k][0] + " : " + projection);
        }
        else if(objinfo[k][0]=="shadowsOnOff" || objinfo[k][0]=="cameraLightOnOff"){
		shadow = shadowsMode[cam.getParameter(objinfo[k][0])];
		file.writeln(objinfo[k][0] + " : " + shadow);
        }
        else if(objinfo[k][0]=="antialiasingMode"){
		antialiasing = antialiasingarray[cam.getParameter(objinfo[k][0])];
		file.writeln(objinfo[k][0] + " : " + antialiasing);
        }
        else if(objinfo[k][0]=="antialiasingMinSamples"){
		minsamples = minsamplesarray[cam.getParameter(objinfo[k][0])];
		file.writeln(objinfo[k][0] + " : " + minsamples);
        }
        else if(objinfo[k][0]=="antialiasingMaxSamples"){
		maxsamples = maxsamplesarray[cam.getParameter(objinfo[k][0])];
		file.writeln(objinfo[k][0] + " : " + maxsamples);
        }
		else file.writeln(objinfo[k][0] + " :   " + objval);
	}    
    file.writeln("\n");
    
    
 	//get the camera tags parameters   
	var tagcount = cam.tagCount();
        
    for(var j=1;j<tagcount;j++){
    	tgi = cam.tagAtIndex(j);
    	tagtype = tgi.type();
    	
    	if(tagtype == 108 ){
    	tag = "Rad";
    	string = "*** Radiosity Tag ***";}
    	
    	else if(tagtype == 109 ){
    	tag = "Hdri";
    	string = "*** HDRI Tag ***";}
    	
    	else if(tagtype == 107 ){
    	tag = "Fog";
    	string = "*** Fog Tag ***";}

    	else if(tagtype == 116 ){
    	tag = "Caustic";
    	string = "*** Caustics Tag ***";}

		file.writeln(string);
    	   	
       	var taginfo = tgi.parameterInfo();
		
		for(var i=0;i<eval(tag).length;i++){
		k = eval(tag)[i];
			
			if(taginfo[k][0]=="tagOn" || taginfo[k][0]=="hdriPrimBackground"){
				noyes = noyesarray[tgi.getParameter(taginfo[k][0])];
				file.writeln(taginfo[k][0] + " : " + noyes);
        		}
			else if(taginfo[k][0]=="hdriMapping"){
				hdriMapping = hdrimode[tgi.getParameter(taginfo[k][0])];
				file.writeln(taginfo[k][0] + " : " + hdriMapping);
        		}
			else if(taginfo[k][0]=="type"){
				radiosity = radmode[tgi.getParameter(taginfo[k][0])];
				file.writeln(taginfo[k][0] + " : " + radiosity);
        		}
			else if(taginfo[k][0]=="fogType"){
				fog = fogarray[tgi.getParameter(taginfo[k][0])];
				file.writeln(taginfo[k][0] + " : " + fog);
        		}
			else if(taginfo[k][0]=="surfaceStrength" || taginfo[k][0]=="surfaceBlur" || taginfo[k][0]=="fogDensity" || taginfo[k][0]=="fogFrom" || taginfo[k][0]=="hdriRotate" || taginfo[k][0]=="hdriPower" || taginfo[k][0]=="hdriClamp" || taginfo[k][0]=="strength" || taginfo[k][0]=="error" || taginfo[k][0]=="minDist" || taginfo[k][0]=="maxDist" || taginfo[k][0]=="maxRayLength"){
				file.writeln(taginfo[k][0] + " : " + tgi.getParameter(taginfo[k][0]).toFixed(3));
        		}
        	else if(taginfo[k][0]=="fogColor"){
        		file.writeln(taginfo[k][0] + " :   R= " + Math.round(255*tgi.getParameter(taginfo[k][0]).r) + "  G= " + Math.round(255*tgi.getParameter(taginfo[k][0]).g) + "  B= " + Math.round(255*tgi.getParameter(taginfo[k][0]).b) + "  A= " + Math.round(100*tgi.getParameter(taginfo[k][0]).a));
				}
			else file.writeln(taginfo[k][0]  + " : " + tgi.getParameter(taginfo[k][0]));	


		}		
		file.write("\n");
	}    
    
    iterateTree(root);


function iterateTree(obj){

    var	i;
    
	for(i=0;i<obj.childCount();i++){
	
		var  curr=obj.childAtIndex(i);
		var  objtype=curr.type();
	
		if(objtype == 5 || objtype == 55 ){

			var objinfo=curr.parameterInfo();
			var name = curr.getParameter(objinfo[7][0]);			
			var lighttype=lights[curr.getParameter(objinfo[8][0])];
			
			if(objtype == 55){
				lighttype = "SkyLight";}
				
			file.writeln("*** Name : " + name + " --- Type : " + lighttype + " ***");
			
				for(var j=0;j<eval(lighttype).length;j++){
				var k = eval(lighttype)[j];
				var objval=curr.getParameter(objinfo[k][0])
        			
        			if(objinfo[k][0]=="position" || objinfo[k][0]=="rotation"){
        				file.writeln(objinfo[k][0] + " :   X= " + objval.x.toPrecision(4) + "  Y= " + objval.y.toPrecision(4) + "  Z= " + objval.z.toPrecision(4));
        				}
         			else if(objinfo[k][0]=="rotation"){
        				file.writeln(objinfo[k][0] + " :   H= " + objval.h.toPrecision(4) + "  P= " + objval.p.toPrecision(4) + "  B= " + objval.b.toPrecision(4));
        				}
        			else if(objinfo[k][0]=="color" || objinfo[k][0]=="shadowColor" || objinfo[k][0]=="backgroundColor"){
        				file.writeln(objinfo[k][0] + " :   R= " + Math.round(255*objval.r) + "  G= " + Math.round(255*objval.g) + "  B= " + Math.round(255*objval.b) + "  A= " + Math.round(100*objval.a));
						}
					else if(objinfo[k][0]=="intensity" || objinfo[k][0]=="cutOffAngle" || objinfo[k][0]=="cutOffAttenuation" || objinfo[k][0]=="shadowBias" || objinfo[k][0]=="ambient" || objinfo[k][0]=="width" || objinfo[k][0]=="height"){ 
						file.writeln(objinfo[k][0] + " :   " + objval.toPrecision(4));
						}
					else if(objinfo[k][0]=="samples" || objinfo[k][0]=="causticPhotons" || objinfo[k][0]=="date"){
						file.writeln(objinfo[k][0] + " : " + objval.toFixed(0));
        				}
					else if(objinfo[k][0]=="latitude" || objinfo[k][0]=="longitude" || objinfo[k][0]=="radius" || objinfo[k][0]=="turbidity"){
						file.writeln(objinfo[k][0] + " : " + objval.toFixed(3));
        				}
					else if(objinfo[k][0]=="lightType"){
        				file.writeln(objinfo[k][0] + " :  " + lighttype);
						}
        			else if(objinfo[k][0]=="cutOffType"){
						spottype = spottypes[curr.getParameter(objinfo[k][0])];
						file.writeln(objinfo[k][0] + " : " + spottype);
        				}
        			else if(objinfo[k][0]=="attenuation"){
						attenuation = attenuations[curr.getParameter(objinfo[k][0])];
						file.writeln(objinfo[k][0] + " : " + attenuation);
        				}
					else if(objinfo[k][0]=="shadowType"){
						shadowtype = shadowtypes[curr.getParameter(objinfo[k][0])];
						file.writeln(objinfo[k][0] + " : " + shadowtype);
        				}
					else if(objinfo[k][0]=="axis"){
						axes = axesarray[curr.getParameter(objinfo[k][0])];
						file.writeln(objinfo[k][0] + " : " + axes);
        				}					
					else if(objinfo[k][0]=="cap" || objinfo[k][0]=="geometry" || objinfo[k][0]=="photonLight"){
						noyes = noyesarray[curr.getParameter(objinfo[k][0])];
						file.writeln(objinfo[k][0] + " : " + noyes);
        				}
					else file.writeln(objinfo[k][0] + " :   " + objval);
				}
    
	   			file.writeln("\n");
	}
		
	iterateTree(curr);
    
}

}

//close file
file.close();

//message to console
print("Parameters saved");
}
