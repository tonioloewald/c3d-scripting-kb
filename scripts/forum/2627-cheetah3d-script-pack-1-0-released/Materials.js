// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	materials.js
//
// Todd Rogers
// Usage: Place this into scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//
//
//	12/ 2/06  V1 : alpha release
//            V2 : texture files are now checked to see if they point to files, if not ask about them
//               : added super saver, which saves all the image texture files in the same place
//                 


function buildUI(tool){
    
    tool.addParameterSeparator("materials.js");
    tool.addParameterButton("Locate and Import","mtl","loadMTL");
    tool.addParameterSeparator("Cheetah3D Materials");
    tool.addParameterButton("","Save","saveIt");
    tool.addParameterButton("","Load","loadIt");
    tool.addParameterSeparator("Super Material Saver");
    tool.addParameterButton("","Super Save","superSaveIt");
}

//	Ka r g b
//	defines the ambient color of the material to be (r,g,b). The default is (0.2,0.2,0.2);
//	Kd r g b
//	defines the diffuse color of the material to be (r,g,b). The default is (0.8,0.8,0.8);
//	Ks r g b
//	defines the specular color of the material to be (r,g,b). This color shows up in highlights. The default is (1.0,1.0,1.0);
//	d alpha
//	defines the transparency of the material to be alpha. The default is 1.0 (not transparent at all) Some formats use Tr instead of d;
//	Tr alpha
//	defines the transparency of the material to be alpha. The default is 1.0 (not transparent at all). Some formats use d instead of Tr;
//	Ns s
//	defines the shininess of the material to be s. The default is 0.0;
//	illum n
//	denotes the illumination model used by the material. illum = 1 indicates a flat material with no specular highlights, so the value of Ks is not used. illum = 2 denotes the presence of specular highlights, and so a specification for Ks is required.
//	map_Ka filename
//	names a file containing a texture map, which should just be an ASCII dump of RGB values;

function loadMTL(tool){
    var doc=tool.document();
	var p = OS.runOpenPanel("mtl");
	if( p == null)
		return;
	var file = new File(p);
	file.open(READ_MODE);
	var mat;
	var s = " ";
	var prop,val;
	var clr = new Vec4D();
	var r,g,b;
	while(file.getpos() < file.size()) {
		s = file.readln();
		if(s[0] == "#")
			continue;
		if(s == "")
			continue;
		var a = s.split(" ");
		if(s.indexOf("newmtl") > -1) {
			mat = doc.addMaterial("Material",a[1]);
			// have a new material now, set up all the defaults
			//	defines the ambient color of the material to be (r,g,b). The default is (0.2,0.2,0.2);
			clr.set(.2,.2,.2,1);
			mat.setParameter("emissionColor",clr); 
			//	defines the diffuse color of the material to be (r,g,b). The default is (0.8,0.8,0.8);
			// what parameter does this mean??
			clr.set(.8,.8,.8,1);
			mat.setParameter("colorColor",clr); 

			//	defines the specular color of the material to be (r,g,b). The default is (1.0,1.0,1.0);
			clr.set(1,1,1,1);
			mat.setParameter("specularColor",clr); 
			
		} else {
			if(a[0].indexOf("Ka") > -1) {
				r = 1 * a[1];
				b = 1 * a[2];
				g = 1 * a[3];
				clr.set(r,b,g,1);
				mat.setParameter("emissionColor",clr); 
			} else if(a[0].indexOf("Kd") > -1) {
				r = 1 * a[1];
				b = 1 * a[2];
				g = 1 * a[3];
				clr.set(r,b,g,1);
				mat.setParameter("colorColor",clr); 
			} else if(a[0].indexOf("Ks") > -1) {
				r = 1 * a[1];
				b = 1 * a[2];
				g = 1 * a[3];
				clr.set(r,b,g,1);
				mat.setParameter("specularColor",clr); 
			} else if(a[0].indexOf("d") > -1 || a[0].indexOf("Tr")) {
				r = 1 * a[1];
				mat.setParameter("transIntensity",r); 
			} else if(a[0].indexOf("Ns") > -1) {
				r = 1 * a[1];
				mat.setParameter("reflIntensity",r); 
			} else if(a[0].indexOf("illum") > -1) {
				r = 1 * a[1];
				mat.setParameter("specMix",r - 1); 
			} else if(a[0].indexOf("map_Ka") > -1) {
				// will work on this one soon
			} 
		}
	}
	file.close();
}


function saveIt(tool){
    var doc=tool.document();
	var n = doc.materialCount();
	if( n > 0) {
		// save it here... no need to save if there are no materials
		var p = OS.runSavePanel("C3DMAT");
		if(p == null)
			return;
		var file = new File(p);
		var i,j;
		file.open(WRITE_MODE);
		for(j=0;j<n;j++) {
			var m = doc.materialAtIndex(j);
			var s = m.rib();
			var a = parseIt(s);
			file.writeln("C3DMAT");
			for(i=0;i<a.length;i = i + 2)
				file.writeln( a[i] +"="+ a[i+1]);
		}
		file.writeln("END");
		file.close();
	}
}

function superSaveIt(tool){
    var doc=tool.document();
	var n = doc.materialCount();
	var names = new Array();
	if( n > 0) {
		// save it here... no need to save if there are no materials
		var p = OS.runSavePanel("C3DMAT");
		if(p == null)
			return;
		var file = new File(p);
		var i,j;
		file.open(WRITE_MODE);
		for(j=0;j<n;j++) {
			var m = doc.materialAtIndex(j);
			var s = m.rib();
			var a = parseIt(s);
			file.writeln("C3DMAT");
			for(i=0;i<a.length;i = i + 2) {
				file.writeln( a[i] +"="+ a[i+1]);
				if( a[i].indexOf("Tex") > -1 && a[i+1] != "none")
					names[names.length] = a[i+1];
			}
		}
		file.writeln("END");
		file.close();
		// figure out the sub dir and make it
		var fold = file.lastPathComponent();
		fold = fold.split(".");
		fold = fold[0]; // grab the name only
		fold = file.directory() + "/" + fold + " materials";
		var fol = new File(fold);
		fol.mkdir();
		// this is the super part.
		// gather all the external files into one place
		if(names.length > 0) {
			for(i=0;i<names.length;i++) {
				var f = new File(names[i]);
				var d = fold + "/" + f.lastPathComponent();
				print("Copying "+names[i] +" to "+ d);
				f.copyTo(d);
			}
		}
	}
}

function loadIt(tool){
    var doc=tool.document();
	var p = OS.runOpenPanel("C3DMAT");
	if( p == null)
		return;
	// maybe an improvement, if there is a folder with the name of the file such as
	// test.C3DMAT => test textures 
	// any textures in test will be checked first in the folder, if not there ask user
	var materials = new Array();
	var names = new Array();
	var properties = new Array();
	var file = new File(p);
	
	// check here to see if there is a materials folder with the same name as the file
	var folder = false; // assume bad
	var fold = file.lastPathComponent();
	fold = fold.split(".");
	fold = fold[0]; // grab the name only
	var foldName = file.directory() + "/" + fold + " materials";
	fold = new File(foldName);
	if( fold.exist() && fold.isDir())
		folder = true;
	
	file.open(READ_MODE);
	var mat;
	var s = " ";
	var prop,val;
	while(s != "") {
		s = file.readln();
		if(s == "END")
			break;
		if(s == "C3DMAT") {
			var t = file.readln();
			var n = file.readln();
			t = t.split("=");
			n = n.split("=");
			t = t[1];
			n = n[1];
			mat = doc.addMaterial(t,n);
		} else {
			prop = s.split("=");
			val = prop[1];
			prop = prop[0];
			if(prop.indexOf("Tex") > -1) {
				// working on textures next
				if(val == "none")
					continue;
				var f = new File(val);
				if( f.exist() ) {
					// make sure the file is there
					mat.setParameter(prop,val);
				} else {
					// check to see if the file is in the folder, if so point to it there
					if(folder) {
						// grab the path and name of the file
						var ff = foldName + "/" + f.lastPathComponent();
						var ffile = new File(ff);
						// if it is there (and it should be) set the material to point to it
						if( ffile.exist()) 
							mat.setParameter(prop,ff);
						else {
							var ind = materials.length;
							// file is not there, save it and ask later
							materials[ind] = mat;
							names[ind] = val;
							properties[ind] = prop;
						}
					} else {
						var ind = materials.length;
						// file is not there, save it and ask later
						materials[ind] = mat;
						names[ind] = val;
						properties[ind] = prop;
					}
				}
				continue;
			} else if(prop.indexOf("Color") > -1 || prop.indexOf("Sheen") > -1) {
				val = val.split(" ");
				// in order to convert from string to a number multiply by 1
				var r = 1 * val[0];
				var g = 1 * val[1];
				var b = 1 * val[2];
				var a = 1 * val[3];
				val = new Vec4D();
				val.set(r,g,b,a);
			} else
				val = 1 * val;
			mat.setParameter(prop,val);
		}
	}
	file.close();
	if( names.length > 0) {
		var s = "";
		if (names.length > 1)
			s = "There are "+names.length+" texture files which are missing or invalid. Click OK to search for the missing files";
		else
			s = "There is a texture file which is missing or invalid.  Click OK to search for the missing file.";
		if(OS.messageBox("Alert",s) == 1) {
			var i;
			for(i = 0;i<names.length;i++) {
				s = new File(names[i]);
				s = s.lastPathComponent();
				if(OS.messageBox("Question","Please select a replacement file for " + s +". Click Cancel to quit this procudure.") == 1) {
					var f = OS.runOpenPanel();
					if( f == null)
						cuntinue;
					materials[i].setParameter(properties[i],f);
				} else
					break;
			}
		}
	}
}

function parseIt(str) {
	// given a string of material properties
	// break it into a list of names and values
	var a = new Array();
	
	var i,s = "";
	for( i =0;i<str.length;i++) {
		if(str[i] == " ") {
			a[a.length] = s;
			s = "";
			continue
		}
		if(str[i] == "\"") {
			i++;
			while(str[i] != "\"")
				s = s + str[i++];
			continue;
		}
		if( str[i] == "[") {
			i++;
			while(str[i] != "]")
				s = s + str[i++];
			continue;
		}
		s = s + str[i];
	}
	return a;
}

function find(str,tar) {
	var result = false;
	
	return result;
}








