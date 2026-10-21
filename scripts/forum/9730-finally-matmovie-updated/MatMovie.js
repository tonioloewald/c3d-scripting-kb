// Source: https://www.cheetah3d.com/forum/index.php?threads/9730/post-80500
// Author: ToddWR (Cheetah3D forum), posted 2013-07-14
// Thread: "Finally , MatMovie updated"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//

// note that is is an object...
// save the material and the location of the images files
function Images(obj,node,name)
{
    // obj : is psssed in to get the frame number
    // node : is there the file name is changed
    this.object = obj;
    this.aNode = node;
    this.fileList = [];
    this.currentFrame = 0;
    this.isGood = true; // assume the best
    // file name is in the format of name ###.jpg
    var path = node.getParameter("texture");
    if(path == "none") {
        var str = "Please loacte the first file of the image sequence for material named "+name;
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
    //print( "name = \""+name + "\"  count starts at ="+count + "  with ext="+format);
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
        index = Math.floor(index);
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
    obj.setParameter("name","MatMovie");
    obj.addParameterFloat("frame",0,0,200000,true,true); // 
    obj.addParameterButton("Scan for materials","Materials","findMaterials"); // 
}

function findMaterials(obj)
{
    var parent = obj.owner();
    var n = parent.getParameter("name");
    if( n=="") {
        var str = "Please place this object as a child of another object that contains at least one material with an extendtion of .mov.  Make sure that material has at least one image texture node in it.";
        OS.messageBox("Wrong Use of MatMovie",str);
        return;
    }
	if( the_Files.length > 0) {
		for(i=0;i<the_Files.length;i++) {
			the_Files[i].imageAt(0);
		}
        the_Files = [];
	}
    var num = parent.tagCount();
    for(var j=0;j<num;j++) {
        var t = parent.tagAtIndex(j);
        var lm = t.linkedToMaterial();
        if(lm > -1) {
            var doc = obj.document();
            var mat = doc.materialAtIndex( lm );
            // get the name and only do those with .mov
            var fname = mat.getParameter("name");
            var ext = fname.split(".")[1];
            if(ext != "mov") continue;
            var nc = mat.nodeCount();
            for(var i =0;i<nc;i++ ){
                var node = mat.nodeAtIndex(i);
                if(node.nodeType() == "image") {
                    //var f = node.getParameter("texture");
                    var thing = new Images(obj,node,fname);
                    if(thing.isGood)
                        the_Files[the_Files.length] = thing;
                }
            }
        }
    }
}

function buildObject(obj){
	if( the_Files == null)
		return;
	var t = obj.getParameter("frame");
	if( the_Files.length > 0) {
		for(i=0;i<the_Files.length;i++) {
			the_Files[i].imageAt(t);
		}
	}
}


