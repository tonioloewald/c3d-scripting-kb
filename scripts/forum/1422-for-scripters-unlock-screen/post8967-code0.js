// Source: https://www.cheetah3d.com/forum/index.php?threads/1422/post-8967
// Author: capnchunky (Cheetah3D forum), posted 2007-03-12
// Thread: "For scripters: Unlock Screen"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc){
	doc.releaseRedrawLock();
	doc.redrawAll();
}