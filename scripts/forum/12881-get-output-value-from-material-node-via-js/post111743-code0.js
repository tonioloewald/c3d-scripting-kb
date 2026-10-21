// Source: https://www.cheetah3d.com/forum/index.php?threads/12881/post-111743
// Author: jeffcase (Cheetah3D forum), posted 2018-04-26
// Thread: "Get output value from Material Node via JS"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc){
	var mat2Get = doc.materialAtIndex(0);
	var numNode = mat2Get.nodeAtIndex(1);
	var numOut = numNode.outputAtIndex(0);

	print(""+numNode.nodeType()+" * "+numNode.outputCount()+" * "+numOut);

}