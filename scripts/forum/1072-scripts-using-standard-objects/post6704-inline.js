// Source: https://www.cheetah3d.com/forum/index.php?threads/1072/post-6704
// Author: Herb (Cheetah3D forum), posted 2006-11-21
// Thread: "scripts using standard objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj){
    obj.setParameter("name","Cone");
}

function buildObject(obj){
    var cone1=obj.document();
         cone1.addObject(CONE);
         cone1.setParameter("position",new Vec3D(1,2,3));
}