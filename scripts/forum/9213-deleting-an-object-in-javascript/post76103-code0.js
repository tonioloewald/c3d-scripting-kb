// Source: https://www.cheetah3d.com/forum/index.php?threads/9213/post-76103
// Author: podperson (Cheetah3D forum), posted 2013-01-10
// Thread: "Deleting an object in Javascript?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function findObjectByName( name, parent ){
  for( var i = 0; i < parent.childCount(); i++ ){
    var obj = parent.childAtIndex(i);
    if( obj.getParameter("name") === name ){
      return obj;
    }
  }
  return false;
}