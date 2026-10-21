// Source: https://www.cheetah3d.com/forum/index.php?threads/1946/post-70614
// Author: tg_jp (Cheetah3D forum), posted 2012-05-19
// Thread: "How to add animation keyframes?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI( tool ) {
  tool.addParameterButton( "add scale f-curve", "add", "addFCurveForScale");
}

function addFCurveForScale( tool ) {
  var doc = tool.document();
  var obj = doc.selectedObject();
  
  if (!obj) return;
  
  var currentTake = doc.currentTake();
  
  var scaleParam = obj.parameterWithName('scale');
  var scaleNode = scaleParam.takeNodeWithName( currentTake.name );
  if (!scaleNode) {
    // if no takeNode exists for a parameter, add takeNode
    scaleNode = scaleParam.addTakeNode( currentTake.name );
  }
  
  // array of setting values, or you can make this array from file with File class.
  var times = [0, 1, 2, 3, 4.5, 5]; // time ( NOT frame number )
  var values = [1, 0.1, 0.2, 0.3, 3, 1]; // scale value
  
  if (scaleNode) {
    var curve = scaleNode.fCurveAtIndex( 1 ); // scale parameter is Vec3D, so index 0 -> x, 1 -> y, 2 -> z. now I am getting y curve.
    curve.removeAllKeys(); // remove existing f-curve keys
    
    var len = times.length;
    for (var i = 0;i < len;i++) {
      var time = times[i];
      var value = values[i];
      
      var newKey = new FCurveKey();
      
      newKey.selected = false; // or true
      newKey.left_type = SPLINE_INTERPOL; // or LINER_INTERPOL ... check Help file.
      newKey.left_time = -0.1; // relative value!
      newKey.left_value = 0; // relat ive value!
      newKey.right_type = SPLINE_INTERPOL; // or LINER_INTERPOL ... check Help file.
      newKey.right_time = 0.1; // rlative value!
      newKey.right_value = 0; // relative value!
      
      newKey.time = time;
      newKey.value = value;
      
      curve.addKey( newKey );
    }
    
    curve.update();
  }
}