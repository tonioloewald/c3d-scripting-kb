// Source: https://www.cheetah3d.com/forum/index.php?threads/1210/post-7665
// Author: ToddWR (Cheetah3D forum), posted 2007-01-11
// Thread: "Moving textures: the actual release"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// these are used internally
//colorTex=none
//specTex=none
//bumpTex=none
//reflTex=none
//transTex=none
if( !Array.indexOf) {
	Array.prototype.indexOf = function(str) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == str)
				return i;
		}
		return -1;
	}
	//print("Array extended");
}



var the_Files = new Array();
function buildUI(tag){
	findMaterials(tag);
	if( the_Files.length > 0) {
		tag.addParameterSeparator("Material Movie options");
		for(var i = 0;i<the_Files.length;i++) {
			tag.addParameterSeparator(the_Files[i]+" options");
			tag.addParameterBool(the_Files[i]+" Color",1,0,1,true,false);
			tag.addParameterBool(the_Files[i]+" Specular",0,0,1,true,false);
			tag.addParameterBool(the_Files[i]+" Bump Map",0,0,1,true,false);
			tag.addParameterBool(the_Files[i]+" Reflective",0,0,1,true,false);
			tag.addParameterBool(the_Files[i]+" Transparent",0,0,1,true,false);
			tag.addParameterBool(the_Files[i]+" All Frames",0,0,1,true,false);
		}
	} else {
		tag.addParameterSeparator("------------------------");
		tag.addParameterSeparator("There are no Movie");
		tag.addParameterSeparator("materials in this object.");
		tag.addParameterSeparator("Delete this tag, then add");
		tag.addParameterSeparator("movie textures to this");
		tag.addParameterSeparator("object, then add this tag");
		tag.addParameterSeparator("to this object again.");
	}
}

function findTags(a,tag) {
	var obj = tag.owner();
	
}



function findMaterials(tag) {
	var the_Object = tag.owner();
    var doc = the_Object.document();
	var n = the_Object.tagCount();
	for(var i = 0;i <n;i++) {
		var t = the_Object.tagAtIndex(i);
		var mn = t.linkedToMaterial();
		if( mn != -1) {
			var m = doc.materialAtIndex(mn);
			var a = parseIt(m.rib());
			var j = a.indexOf("Surface");
			if(j == -1)
				continue;
			if(a[j+1] == "Material") {
				j = a.indexOf("name");
				if(j == -1)
					continue;
				var name = a[j+1];
				var aa = name.split(".");
				if( aa.length > 1 && aa[1] == "mov")
					the_Files[the_Files.length] = aa[0];
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
