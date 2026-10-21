# Script request: SVG paths to Scalpel cuts

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12805/
- Subforum: scripting-general
- Started by **Joel** on 2018-03-02; last post 2018-03-02; 1 posts

## #1 — Joel — 2018-03-02
<https://www.cheetah3d.com/forum/index.php?threads/12805/post-110980>

Script request: SVG paths to Scalpel cuts

I recently posted a question/request for help in the general forum (How to convert coplanar splines to coplanar polygons?) and concluded a script could do the job.

https://www.cheetah3d.com/forum/showthread.php?t=12788 

Could a script convert the paths in an imported SVG file to polygons on a plane?

Conceptually, it seems simple — import an SVG file depicting a pattern of connected straight lines, then convert the lines to scalpel cuts on a collapsed plane.

Attempted work-arounds that failed:

I used the imported SVG combined/composite path as a child of an Extrusion Creator tool, then used the extrusion with a Boolean Creator or Boolean Modifier to cut the plane. The problem is that the paths only go from point to point, and C3D needs closed splines to make polygons. The Extrusion Creator can work with an imported SVG, but the extruded paths lack usable in-facing and out-facing normals so it's not possible to do ordinary functions like Loop select, Fill hole, or Inner extrude.

I used the Boolean Cut.js tool script, and got closer. I first added a Shell to the plane to make it a thin box, then drew a single spline to cut it into two halves. A closed spline like a rectangle or star punched out the shape from the plane/box. But the script couldn't cut the more complex SVG paths. The script seems to make two parts, no more.

Can the Boolean Cut script be enhanced to make multiple Scalpel cuts following SVG paths? This would automate and make more precise the process of using the Scalpel tool to cut all the polygons.

Attachments: [svg_to-c3d.jpg](https://www.cheetah3d.com/forum/index.php?attachments/32249/)

Links: https://www.cheetah3d.com/forum/showthread.php?t=12788
