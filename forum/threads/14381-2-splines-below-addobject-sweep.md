# 2 splines below addObject(SWEEP)

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14381/
- Subforum: scripting-general
- Started by **MarkusR** on 2024-02-18; last post 2024-02-19; 2 posts

## #1 — MarkusR — 2024-02-18
<https://www.cheetah3d.com/forum/index.php?threads/14381/post-127850>

hello,
how can I add two splines below a sweep object in script?
I need to create a frame with small and bigger rectangle.

i can not get the SplineCore context.

I try to create a window frame with parameter input, sweep with two rectangles and a box for the window glass.
I stuck at sweep because I not get the core() and I also missing a method to clear all path in the spline because new parameter will recreate it.

// default values
var windowwidth = 1.2;
var windowheight = 1.5;
var frame = 0.05;
var depth = 0.1;
var sweep = null;
var glassbox = null;

/** UI */
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

## #2 — MarkusR — 2024-02-19
<https://www.cheetah3d.com/forum/index.php?threads/14381/post-127865>

seems I not saw the object type rect and spline ..

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}
