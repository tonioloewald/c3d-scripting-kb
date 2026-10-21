// Source: https://www.cheetah3d.com/forum/index.php?threads/2262/post-15853
// Author: tg_jp (Cheetah3D forum), posted 2007-10-18
// Thread: "Scripting Issues"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildObject(obj) {
    //adding a quite tiny polygon to be rendered.
    var core = obj.core();
    var faceSize = 0.00001;
    core.addPolygon(3,false,[new Vec3D(faceSize,faceSize,faceSize), new Vec3D(0,faceSize,faceSize), new Vec3D(0,0,0)]);
}