// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-106009
// Author: crgreen (Cheetah3D forum), posted 2017-02-20
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI( tool ) { 
    tool.addParameterSeparator('Export OBJ Sequence');   
    tool.addParameterInt("fps", 30, 1, 1200, false, false);
    tool.addParameterInt("first frame", 0, 0, 100000, false, false);
    tool.addParameterInt("last frame", 1, 0, 100000, false, false);
    tool.addParameterString("*basename", "3DFrame_", true);
    tool.addParameterSeparator('');
    tool.addParameterSeparator('Relies on *basename (not dialog)!');
    tool.addParameterSeparator('');
  //  tool.addParameterSeparator('Dialog\'s directory path is used,');
  //  tool.addParameterSeparator('dialog\'s file name is NOT!');
  //  tool.addParameterSeparator('(So you can enter anything)');
    tool.addParameterButton("          OBJ Sequence", "Export ...", "exportObjSeq");

}
function exportObjSeq( tool ) {
   doc = tool.document();
   var basenm = tool.getParameter("*basename");
   //I admit this is kludgey - the path is used, the filename totally ignored; ui's basename is used
   svReturned=OS.runSavePanel("obj");
   if (svReturned != null) {
    var f=new File(svReturned);
    var dirPath = f.directory() + "/";
    var fps = tool.getParameter("fps");
    var thisFr = tool.getParameter("first frame");
    var lastFr = tool.getParameter("last frame");
   
    for ( var i = thisFr; i <= lastFr; i++ )
     {    
       doc.setAnimPosition(1/fps*(i));
       var svfile = dirPath + basenm + i.toString() + ".obj";
       doc.saveToFile(svfile, 'obj');
       0;
     }

    OS.messageBox('', "Done saving frames " + thisFr.toString() + " to " + lastFr.toString() + ".");
   }