// Source: https://www.cheetah3d.com/forum/index.php?threads/1055/post-6587
// Author: holdeg2 (Cheetah3D forum), posted 2006-11-16
// Thread: "Material Change...Save"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc) {
     //get path for file
   var path=OS.runSavePanel("jas");
   if (path==null) {
      return;
   }

   // find the "CommandColor"
   for(mat_indx=0;mat_indx < doc.materialCount(); ++mat_indx) {
      var mat=doc.materialAtIndex(mat_indx);
      if (mat.getParameter("name") == "CommandColor") {
         break;
      }
   }

   // i assume red, green, blue
   var colors = Array(Vec4D(255,0,0,0), Vec4D(0,255,0,0), Vec4D(0,0,255,0));
	
   for (color_indx= 0; color_indx < 3; ++color_indx) {
      mat.setParameter("color", colors[color_indx], false);
		
      doc.saveToFile(path,"file" + color_indx + ".jas");
   }
}