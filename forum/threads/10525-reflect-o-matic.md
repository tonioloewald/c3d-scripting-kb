# Reflect-O-Matic

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10525/
- Subforum: script-downloads
- Started by **podperson** on 2014-06-30; last post 2014-07-01; 7 posts

## #1 — podperson — 2014-06-30
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88472>

Reflect-O-Matic

This script allows you to automatically create lights or geometry that will reflect onto the currently selected polygons (if more than one is selected, the "first" polygon will be picked). It was inspired by this thread.

The math is fairly straightforward: it figures out where the camera is, where the polygon is, and using that information sticks a light in the scene twice as far away from the position of the polygon as the camera is along the vector of incidence.

The images show a polygon selection, the rendered result, the rendered result with the polygon selection overlaid.

Reflect-o-matic web page.

Attachments: [Reflect-o-matic Tool.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/23616/), [poly-selection.jpg](https://www.cheetah3d.com/forum/index.php?attachments/23617/), [render.png](https://www.cheetah3d.com/forum/index.php?attachments/23618/), [overlay.jpg](https://www.cheetah3d.com/forum/index.php?attachments/23619/)

Links: http://loewald.com/c3dbook/Scripts/Reflect%E2%80%93o%E2%80%93matic/, http://www.cheetah3d.com/forum/showthread.php?p=88458

## #2 — podperson — 2014-06-30
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88476>

It looks like the script only works for objects positioned at the origin (in part because the lights get placed as children of the selection). I'll see if I can make it a bit more robust.

## #3 — ZooHead — 2014-07-01
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88477>

Sounds like it could be quite useful, thanks in advance for your efforts. :smile:
​

## #4 — podperson — 2014-07-01
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88480>

I've added some fixes/changes:

Creates one light for each selected face (rather than just the first face)
Handles meshes not at origin / zero rotation

## #5 — podperson — 2014-07-01
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88487>

It's now a tool.

It creates area lights or geometry (planes), and it adds a Target tag to point them at the object (not the exact polygon, unfortunately). 

(I tried manually setting the Euler rotations but I screwed up my math somewhere, gave up, and picked the easy option ;-) — it's probably more useful this way.)

## #6 — podperson — 2014-07-01
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88489>

I tracked down some more bugs (exposed when I rotated the subject mesh, and moved the scene away from the origin). I've also added polygon targets for each reflection source, making the reflections ridiculously accurate (as the new pictures demonstrate).

I hope this is useful for someone

## #7 — podperson — 2014-07-01
<https://www.cheetah3d.com/forum/index.php?threads/10525/post-88501>

One more note: I tried using the tool to render hero shots of rigged figures — it doesn't work unless you collapse the skeleton tag because the polygon positions and normals are not reported correctly to the script (they're the pre-deformation values).

So in a worst case scenario — imagine C3D finally supports motion blur and you want a hero render with motion blur — you'd need to duplicate and collapse the mesh in question, use it to generate reflection sources, then delete the duplicate and render the original mesh.
