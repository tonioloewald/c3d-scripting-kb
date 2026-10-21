// Source: https://www.cheetah3d.com/forum/index.php?threads/14381/post-127850
// Author: MarkusR (Cheetah3D forum), posted 2024-02-18
// Thread: "2 splines below addObject(SWEEP)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj) {
    obj.setParameter("name", "Window Frame");
    obj.addParameterFloat("WindowWidth", windowwidth, 0.3, 4, true, true);
    obj.addParameterFloat("WindowHeight", windowheight, 0.3, 4, true, true);
    obj.addParameterFloat("Frame", frame, 0.05, 0.25, true, true);
    obj.addParameterFloat("Depth", depth, 0.05, 0.25, true, true);
}
/** create */
function buildObject(obj) {
    // create once
    if (obj.childCount() == 0) {
        var doc = obj.document();
        sweep = doc.addObject(SWEEP); // darunter ein rectangle und ein kleines rechtangle
        glassbox = doc.addObject(BOX); // fuer die Glas Scheibe
        obj.addChildAtIndex(sweep, 0);
        obj.addChildAtIndex(glassbox, 1);
    }
    // read UI input
    windowwidth = obj.getParameter("WindowWidth");
    windowheight = obj.getParameter("WindowHeight");
    frame = obj.getParameter("Frame");
    depth = obj.getParameter("Depth");
    var left = -windowwidth / 2.0;
    var right = windowwidth / 2.0;
    var top = windowheight;
    var bottom = 0;
    // ------------------------------- the window frame sweep
    var core = sweep.core();
    print(core.pathCount());
  
    // SplineCore
    // small Rectangle Z
    // frame Rectangle Z
    var spline = core; // modCore
    spline.move(new Vec3D(left,top,0));
    spline.line(new Vec3D(right,top,0));
    spline.line(new Vec3D(right,bottom,0));
    spline.line(new Vec3D(left,bottom,0));
    spline.close();
    // ------------------------------- the window box
    glassbox.setParameter("position", new Vec3D(0,windowheight / 2.0, 0));
    glassbox.setParameter("sizeX", windowwidth-frame*2.0);
    glassbox.setParameter("sizeY", windowheight-frame*2.0);
    glassbox.setParameter("sizeZ", depth);
    glassbox.setParameter("name", "Glass");
    glassbox.update();
  
    // -------------------------------
}