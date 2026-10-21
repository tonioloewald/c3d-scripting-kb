// Source: https://www.cheetah3d.com/forum/index.php?threads/9041/post-74914
// Author: tg_jp (Cheetah3D forum), posted 2012-11-25
// Thread: "Position of object in animation frame"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// simple one.

function main( doc ) {
  var time = 1.0; // it's not a frame number, just second of timeline position to get.

  var obj = doc.selectedObject();
  var time_bk = doc.animPosition( time ); // store current time.

  doc.setAnimPosition( time );
  
  var position = obj.getParameter("position");
  
  doc.setAnimPosition( time_bk );

  print( position.x.toFixed(4) + ', ' + position.y.toFixed(4) + ', ' + position.z.toFixed(4) );
}