// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//

// notice that this extends the functionality of the class array
// !ANY! new Array will be able to use this function
if( !Array.indexOf) {
	Array.prototype.indexOf = function(str) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == str)
				return i;
		}
		return -1;
	}
	Array.prototype.indexOfUsing = function(str,func) {
		for(var i = 0; i < this.length; i++) {
			var f = func(this[i],str);
			if(f)
				return i;
		}
		return -1;
	}
}

// note that is is an object...
// save the material and the location of the images files
function Images(obj,material,name) {
	this.object = obj;
	this.tag = null;
	this.material = material;
	this.locationOfFiles = "";
	this.my_Files = new Array();
	this.current_Image = 0;
	this.name = "";
	if( name != undefined)
		this.name = name;
	var jName = this.name.split(".")[0];
	this.nextImage = function(){
		this.current_Image++;
		if( this.current_Image >= this.my_Files.length)
			this.current_Image = 0;
		this.material.setParameter("colorTex",this.my_Files[index],false);
	};
	this.updateTag = function() {
		var obj = this.object;
		var n = obj.tagCount();
		this.tag = null;
		for( var i = 0; i < n; i++) {
			var t = obj.tagAtIndex(i);
			if( t.getParameter("scriptName") == "MatTag.js") {
				this.tag = t;
				break;
			}
		}
	}
	this.updateTag();
	this.imageAt = function(index) {
		if(this.tag == null) {
			index = Math.floor(index);
			index %= this.my_Files.length;
			this.current_Image = index;
			this.material.setParameter("colorTex",this.my_Files[index],false);
		} else {
			if(this.tag.getParameter(jName + " All Frames") && index > 0) {
				this.current_Image = (this.current_Image + 1) % this.my_Files.length;
				index = this.current_Image;
			} else {
				index = Math.floor(index);
				index %= this.my_Files.length;
				this.current_Image = index;
			}
			if(this.tag.getParameter(jName + " Color"))
				this.material.setParameter("colorTex",this.my_Files[index],false);
			else
				this.material.setParameter("colorTex","none",false);
			if(this.tag.getParameter(jName + " Specular"))
				this.material.setParameter("specTex",this.my_Files[index],false);
			else
				this.material.setParameter("specTex","none",false);
			if(this.tag.getParameter(jName + " Bump Map"))
				this.material.setParameter("bumpTex",this.my_Files[index],false);
			else
				this.material.setParameter("bumpTex","none",false);
			if(this.tag.getParameter(jName + " Reflective"))
				this.material.setParameter("reflTex",this.my_Files[index],false);
			else
				this.material.setParameter("reflTex","none",false);
			if(this.tag.getParameter(jName + " Transparent"))
				this.material.setParameter("transTex",this.my_Files[index],false);
			else
				this.material.setParameter("transTex","none",false);
		}
	}
	// load images is misnamed... all it does is scan the given directory
	// to find a series of file names and stores them in an array
	this.loadImages = function(path) {
		var f = new File(path);
		var name = f.lastPathComponent();
		var dir = f.directory();
		this.my_Files[0] = path; // the first one is easy
		// file names are expected to have the following format
		// name of file ####.format
		// just need to parse the file name
		var n = name.split(".");
		var format = n[1]; // get the extention
		n = n[0]; // focus on the name and ####
		var count = "";
		name = "";
		var flag = true;
		for(var i= n.length-1;i>=0;i--) {
			var c = n[i];
			if(flag && c >= "0" && c <= "9")
				count = c + count;
			else {
				name = c + name;
				flag = false;
			}
		}
		var len = count.length; // we need the length to add leading zeros
		count = 1 * count;
	//	print( "name = \""+name + "\"  count starts at ="+count + "  with ext="+format);
		flag = true;
		count++; // already did this one
		while(flag) {
			var n1 = ""+count;
			while( n1.length < len)
				n1 = "0" + n1;
			n1 = dir + "/" + name + n1 + "." + format;
			f = new File(n1);
			if( f.exist()) {
				this.my_Files[this.my_Files.length] = n1;
				count++;
			} else
				flag = false;
		}
	}
}

var the_Files = null; // the list of file names
var new_Files = null;
var the_Object = null;

function buildUI(obj){
	switch( justMe(obj) ) {
	// this would be included, but somehow 'try' and 'catch' blocks don't work
	//case -1: return; // this is needed because on starting cheetah with this script obj.document() errors out
	case 0:
		the_Object = obj;
		obj.setParameter("name","MatMovie");
		obj.addParameterFloat("frame",0,0,200000,true,true); // 
		obj.addParameterButton("Scan for new materials","Materials","findNewMaterials"); // 
		obj.addParameterButton("Scan for tags","Tags","findTags"); // 
		obj.addParameterSeparator("----------------");
		obj.addParameterButton("Rescan for materials","Materials","findMaterials"); // 
		//obj.addParameterButton("Help","Help","displayHelp"); // 
		findMaterials();
		break;
	default:
		obj.setParameter("name","delete me");
		obj.addParameterSeparator("----------------");
		obj.addParameterSeparator("this object is");
		obj.addParameterSeparator("disabled because");
		obj.addParameterSeparator("there is already");
		obj.addParameterSeparator("a MatMovie object");
		obj.addParameterSeparator("in this file.");
	} 
}
function displayHelp() {
	// another new idea?  show the help that is needed
	// each time help is called help the user thru each step
	// need to work on this
	while(true) {
		if(OS.messageBox("Help page 1","") == 0)
			break;
		if(OS.messageBox("Help page 2","") == 0)
			break;
		if(OS.messageBox("Help page 3","") == 0)
			break;
	}
}
function compNames(obj,str) {
	//print("comparing "+str +" and "+obj.name);
	if(obj.name == str)
		return true;
	return false;
}

function materialTree(obj) {
	var	i,j = 0;
    var doc = the_Object.document();
	var n = obj.tagCount();
	for(i = 0;i <n;i++) {
		var t = obj.tagAtIndex(i);
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
				// if the material is already scanned, skip it
				if( the_Files.indexOfUsing(name,compNames) != -1)
					continue;
				var aa = name.split(".");
				if( aa.length > 1 && aa[1] == "mov") {
					the_Files[the_Files.length] = new Images(obj,m,name);
					new_Files[new_Files.length] = the_Files.length - 1;
				}
			}
		}
	}
	for(i=0;i<obj.childCount();i++){
		var  curr=obj.childAtIndex(i);
		materialTree(curr);
	}
}

function findTags() {
	if( the_Files.length > 0) {
		for(i=0;i<the_Files.length;i++) {
			the_Files[i].updateTag();
		}
	}
}

function findNewMaterials() {
    var doc = the_Object.document();
	var n = doc.materialCount();
	new_Files = new Array();
	if( n > 0) { // no need to scan if there are no materials
		var root = doc.root();
		var done = new Array();
		// find only the materials attached to objects
		materialTree(root);
		if( the_Files.length > 0 )
			for(var j=0;j<new_Files.length;j++) {
				var i = new_Files[j];
				str = "Please loacte the first file of the image sequence for material named "+the_Files[i].name;
				if(done.indexOf(the_Files[i].name) == -1 && OS.messageBox("Information Needed",str)==1) {
					// if we have already asked for a certain file, skip it next time
					var p = OS.runOpenPanel("jpg","bmp","png","tif"); // add other file types here
					if(p==null)
						continue;
					the_Files[i].loadImages(p);
					done[done.length] = the_Files[i].name;
					//print( "added "+the_Files[i].name);
				}
			}
	}
}

function findMaterials() {
	the_Files = new Array();
	findNewMaterials();
}

function buildObject(obj){
	var p = obj.parameterInfo();
	// if this is disabled then there is no frame parameter
	if( p.indexOf("frame,Float") == -1)
		return;
	if( the_Files == null)
		return;
	var t = obj.getParameter("frame");
	if( the_Files.length > 0) {
		for(i=0;i<the_Files.length;i++) {
			the_Files[i].imageAt(t);
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

// make sure there is only one object that is a MatMovie
function justMe(obj) {
	var  doc=obj.document();
	var  root=doc.root();
	return iterateTree(root);
}

function iterateTree(obj){
	var	i,j = 0;
	var s = obj.getParameter("scriptName");
	if( s == "MatMovie.js") 
		j++;
	for(i=0;i<obj.childCount();i++){
		var  curr=obj.childAtIndex(i);
		j += iterateTree(curr);
	}
	return j;
}
