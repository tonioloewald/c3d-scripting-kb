// Source: https://www.cheetah3d.com/forum/index.php?threads/3377/post-24039
// Author: tg_jp (Cheetah3D forum), posted 2008-08-12
// Thread: "parametric modelling via script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj) {
    obj.setParameterButton('run loop','run','runMain');
}

function runMain(obj) {
    var doc = obj.document();
    
    .... almost same to Spline_server.js code
    
    //if (point_cache is updated) obj.update()
}

function buildObject(obj) {

    //drawSpline with point_cache.

}