// Source: https://www.cheetah3d.com/forum/index.php?threads/4856/post-34661
// Author: tg_jp (Cheetah3D forum), posted 2009-10-28
// Thread: "Change active camera"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function makeActiveCamera( cam ) {
	var doc = cam.document();
	var active_cam = doc.activeCamera();
	
	if ( cam.type() == CAMERA && active_cam != cam ) {
		active_cam.setParameter("activeCamera", 0);
		cam.setParameter("activeCamera", 1);
		
		cam.update();
		active_cam.update();
	}
}