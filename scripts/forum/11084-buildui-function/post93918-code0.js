// Source: https://www.cheetah3d.com/forum/index.php?threads/11084/post-93918
// Author: aaronparr (Cheetah3D forum), posted 2015-03-10
// Thread: "buildUI() function"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(node_current)
{
  alert("buildUI()");
  node_current.addParameterString("Classification", mdl_classification);
  node_current.addParameterString("Supermodel", mdl_supermodel);
  node_current.addParameterFloat("Animation Scale", mdl_animationscale);
  node_current.addParameterString("File Dependancy", mdl_filedependancy);
}