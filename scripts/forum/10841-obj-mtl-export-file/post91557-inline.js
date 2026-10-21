// Source: https://www.cheetah3d.com/forum/index.php?threads/10841/post-91557
// Author: dragonhh (Cheetah3D forum), posted 2014-11-17
// Thread: "OBJ + MTL export File"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc){
    var path=OS.runSavePanel("obj");
    if(path==null){
	return;
	}
        
    var file=new File(path);
    var lastpathcomp=file.lastPathComponent();
    var dir=file.directory();
    var comps= lastpathcomp.split(/\./);
    var objpath=dir+"/"+comps[0]+".obj";
    var mtlpath=dir+"/"+comps[0]+".mtl";
	
    doc.saveToFile(objpath,"obj");
    doc.saveToFile(mtlpath,"mtl");
}