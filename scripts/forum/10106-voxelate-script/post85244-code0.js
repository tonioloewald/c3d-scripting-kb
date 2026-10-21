// Source: https://www.cheetah3d.com/forum/index.php?threads/10106/post-85244
// Author: tg_jp (Cheetah3D forum), posted 2014-02-08
// Thread: "Voxelate Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj) {
  ...
  obj.addParameterLink("Voxel Base", true);
  ...
}

function buildObject(obj) {
  ...
  
  // L.56 - 73  
  var child = obj.getParameter("Voxel Base");
  if (!child) return;
  ...
}