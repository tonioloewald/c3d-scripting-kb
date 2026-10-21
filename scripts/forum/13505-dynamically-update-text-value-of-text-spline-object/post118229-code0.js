// Source: https://www.cheetah3d.com/forum/index.php?threads/13505/post-118229
// Author: jdmac (Cheetah3D forum), posted 2019-10-28
// Thread: "Dynamically update text value of Text Spline Object"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
* Time of Day.js
*
* Created by Jerry McCreary at 10/28/19
*/

function buildUI( tag ) {
    tag.addParameterLink("Skylight", true);
}

function applyParameters(tag){
    var owner=tag.owner();
    var doc=tag.document();
    var sun=tag.getParameter("Skylight");
    var txt = sun.getParameter('Date');
    owner.setParameter("Text",txt.toString(),false);
}