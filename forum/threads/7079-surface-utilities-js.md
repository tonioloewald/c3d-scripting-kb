# Surface Utilities.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7079/
- Subforum: script-downloads
- Started by **podperson** on 2011-03-23; last post 2012-11-23; 6 posts

## #1 — podperson — 2011-03-23
<https://www.cheetah3d.com/forum/index.php?threads/7079/post-57851>

Surface Utilities.js

Here's a new tool script based on my old Global Iterator, but vastly improved thanks to this thread:

http://www.cheetah3d.com/forum/showthread.php?p=57839#post57839

The iterator framework now provides simple support for iterating through hierarchies and the entire scene, but defaults to acting on the selected object (there's no scripting support for multiple selection yet) and its children.

I've added new normal utilities for:
a) flipping all normals
b) "unifying" normals (which should make all normals in a continuous mesh consistent).
c) quickly "correcting" normals to face outwards from the object's origin (which should work nicely for simple, convex objects.

Attachments: [Screen shot 2011-03-22 at 10.35.35 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/14277/), [Surface Utilities.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/16213/)

Links: http://www.cheetah3d.com/forum/showthread.php?p=57839#post57839

## #2 — SurfingAlien — 2011-03-23
<https://www.cheetah3d.com/forum/index.php?threads/7079/post-57858>

thanks, it will come in handy fur sure!

## #3 — podperson — 2011-03-23
<https://www.cheetah3d.com/forum/index.php?threads/7079/post-57879>

I should note that the unify normals command can be quite slow, so don't panic if it seems to lock up (there's no way for a script to show a progress bar in c3d).

It will be faster at dealing with a bunch of small meshes than one big mesh because it will execute in O( M x N^2 ) where M is the number of meshes and N is the number of polygons in them.

The way I'd test it was to create a default Torus which has a pretty high polycount, and then use the different options on it (face outwards messes up a torus). Unify would run quite slowly.

There's an obvious way to speed up unify by a factor of 2 assuming the surface is "well formed" (in this case, if you assume that once you've found a polygon that shares an edge you can stop looking, and hence look at roughly half as many edges), but I left it out because some surfaces may not be well-formed.

## #4 — filip c — 2011-03-29
<https://www.cheetah3d.com/forum/index.php?threads/7079/post-58073>

another great script!
Thanks Podperson

## #5 — podperson — 2011-12-29
<https://www.cheetah3d.com/forum/index.php?threads/7079/post-66109>

Updated the script to fix bugs and attempt to improve performance of the Unify operation. Added a randomize function to facilitate testing.

Made a further fix that would cause errors in mesh strips.

## #6 — uncle808us — 2012-11-23
<https://www.cheetah3d.com/forum/index.php?threads/7079/post-74873>

Selection only? is this polygon selection? or object selection in the object browser?
