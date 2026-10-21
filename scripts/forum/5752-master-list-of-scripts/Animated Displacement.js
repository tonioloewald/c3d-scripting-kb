// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-98992
// Author: crgreen (Cheetah3D forum), posted 2016-01-01
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Script -> Polygon Script
// This is meant to be the child of a Displacement Map Modification that has been renamed to have ".mov" at the end.
function Images(obj,node,name)
{
    // obj : is psssed in to get the frame number
    // node : there the file name is changed
    this.object = obj;
    this.aNode = node;
    this.fileList = [];
    this.currentFrame = 0;
    this.isGood = true; // assume the best
    // file name is in the format of name ###.jpg
    var path = node.getParameter("texture");
    if(path == "none") {
        var str = "Please locate the first file of the image sequence for material named "+name;
        if(OS.messageBox("Information Needed",str)==1) {
            var p = OS.runOpenPanel("jpg","bmp","png","tif"); // add other file types here
            if(p==null) {
                this.isGood = false;
                return;
            }
            path = p;
            node.setParameter("texture",path);
        }
    }
    var f = new File(path);
    var name = f.lastPathComponent();
    var dir = f.directory();
    
    this.fileList[0] = path; // the first one is easy
    // file names are expected to have the following format
    // name of file ####.format
    // just need to parse the file name
    var n = name.split(".");
    var format = n[1]; // get the extension
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
    flag = true;
    count++; // already did this one
    while(flag) {
        var n1 = ""+count;
        while( n1.length < len)
            n1 = "0" + n1;
        n1 = dir + "/" + name + n1 + "." + format;
        f = new File(n1);
        
        if( f.exist()) {
            this.fileList[this.fileList.length] = n1;
            count++;
        } else
        flag = false;
    }
    if(this.fileList.length == 1) {
        this.isGood = false;
    }
    this.imageAt = function(index) {
        index = Math.round(index);
        index %= this.fileList.length;
        this.currentFrame = index;
        this.aNode.setParameter("texture",this.fileList[index],false);
    }
}

var the_Files = []; // the list of file names
var new_Files = [];
var the_Object = null;

function buildUI(obj){
    print("building UI");
    the_Object = obj;
    obj.setParameter("name","Animated Displacement");
    obj.addParameterSeparator('');
    obj.addParameterSeparator('The \'Frame\' parameter');
    obj.addParameterSeparator('must be keyframed, …');
    obj.addParameterFloat("Frame",0,0,200000,true,true);
    obj.addParameterSeparator('… then you can \'Activate\':');
    obj.addParameterButton("Scan for sequence &","Activate","findMaterials");
}

function findMaterials(obj)
{
    var parent = obj.owner();
    var n = parent.getParameter("name");
    //MY STUFF:
    
    if ( parent.type() == DISPLACEMENTMOD ) {
        
        var ext = n.split(".")[1];
        if(ext == "mov") {
            var node = parent;
            var thing = new Images(obj,node,n);
            if(thing.isGood) {
                the_Files[the_Files.length] = thing;
            }
        }else{
            parent.setParameter("name", (n + ".mov"));
            OS.messageBox("Name Error", "Please try again. I've renamed the Displacment Mod for you to end with '.mov'." );
        }
        
    }else{
        OS.messageBox("Parent Object Error", "This Instance of Animated Displacement must be the child of a Displacement Mod." );
    }
}

function buildObject(obj){
	if( the_Files == null)
		return;
	var t = obj.getParameter("Frame");
	if( the_Files.length > 0) {
		for(i=0;i<the_Files.length;i++) {
			the_Files[i].imageAt(t);
		}
	}
}
