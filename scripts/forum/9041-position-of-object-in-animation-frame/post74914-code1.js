// Source: https://www.cheetah3d.com/forum/index.php?threads/9041/post-74914
// Author: tg_jp (Cheetah3D forum), posted 2012-11-25
// Thread: "Position of object in animation frame"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// from f-curve object.

function main( doc ) {
  var time = 1.0; // it's not a frame number, just second of timeline position to get.

  var obj = doc.selectedObject();
  var parameter = obj.parameterWithName("position");
  var currentTake = doc.currentTake();
  
  var takeNode = parameter.takeNodeWithName( currentTake.name );
  if (takeNode) {
    var posXCurve = takeNode.fCurveAtIndex(0);
    var posYCurve = takeNode.fCurveAtIndex(1);
    var posZCurve = takeNode.fCurveAtIndex(2);
    
    var position = new Vec3D( posXCurve.valueAtTime( time, 0 ),
                                         posYCurve.valueAtTime( time, 0 ),
                                         posZCurve.valueAtTime( time, 0 ) );
  } else {
    // no f-curve set for object
    var position = obj.getParameter("position");
  }
  
  print( position.x.toFixed(4) + ', ' + position.y.toFixed(4) + ', ' + position.z.toFixed(4) );

}