// Source: https://www.cheetah3d.com/forum/index.php?threads/7187/post-58804
// Author: tg_jp (Cheetah3D forum), posted 2011-04-21
// Thread: "Getting the transparency color"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc) {
   var obj = doc.selectedObject();
   
   print('---- Object Info ---'); //
   
   if ( obj ) {
       print('-- object type:'+obj.type());
       var info = obj.parameterInfo();
       for(var j=0;j<info.length;j++) {
           print(info[j][0] +" [" + info[j][1] + "]:"+obj.getParameter(info[j][0]));
       }
       var tcount = obj.tagCount();
       for (var i = 0;i < tcount;++i) {
           var tag = obj.tagAtIndex(i);
           info = tag.parameterInfo();
           print('-- tag '+i+' type:'+tag.type());
           for(var j=0;j<info.length;j++){
           		if (info[j][1] != "Link") {
               print(info[j][0] + " [" + info[j][1] + "]:"+tag.getParameter(info[j][0]));
           		} else {
               print(info[j][0] + " [" + info[j][1] + "]:");
           		}
           }
           if (tag.type() == 102) { // material tag.
               var material = doc.materialAtIndex(tag.linkedToMaterial());
               print('-- linked Material --');
               info = material.parameterInfo();
               for(var j=0;j<info.length;j++){
                   print(info[j][0] + " [" + info[j][1] + "]:"+material.getParameter(info[j][0]));
               }
           }
       }
   }
}