// Source: https://www.cheetah3d.com/forum/index.php?threads/1577/post-10174
// Author: tg_jp (Cheetah3D forum), posted 2007-04-13
// Thread: "How to lern JS/Programming for Cheetah - easy way :)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// simple Hello World.js for Cheetah3D : macro script.
function main(doc) {
    var string = 'Hello World of Cheetah3D!!'; 
    var textSpline = doc.addObject(TEXT);
    textSpline.setParameter("text",string); 
}