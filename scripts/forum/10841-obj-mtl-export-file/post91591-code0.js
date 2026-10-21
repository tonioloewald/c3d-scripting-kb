// Source: https://www.cheetah3d.com/forum/index.php?threads/10841/post-91591
// Author: tg_jp (Cheetah3D forum), posted 2014-11-18
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

    // comment out 'usemtl default'
    var objfile = new File(objpath);
    var objfile_mod = new File(objpath.replace(/\.obj$/, ".obj_bk"));
    objfile.open(READ_MODE);
    objfile_mod.open(WRITE_MODE);
    var line = objfile.readln();
    while( line != -1) {
        if (line.match("usemtl default")) {
            line = line.replace("usemtl default", "#usemtl default");
        }
        objfile_mod.writeln(line);
        line = objfile.readln();
    }
    objfile.close();
    objfile_mod.close();
    OS.system("rm \""+objpath+"\"");
    OS.system("mv \""+objpath.replace(/\.obj$/, ".obj_bk")+"\" \""+objpath+"\"");
}