# Center of Gravity

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4810/
- Subforum: script-downloads
- Started by **podperson** on 2009-10-23; last post 2019-11-10; 8 posts

## #1 — podperson — 2009-10-23
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-34335>

Center of Gravity

This script finds the area of a selected set of faces and sets the pivot to their "center of gravity" (where area is treated as mass)

This is a Tool script and it requires C3D 5.0 or later.

Update

Now works regardless of rotation and scale of the polygon object.

If nothing else, it's very good for setting the pivot of a mesh to the center of a face (e.g. if you want a door to rotate around one side).

Attachments: [Screen shot 2009-10-23 at 2.20.31 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/8197/), [center of gravity.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/8213/)

## #2 — alvordr — 2009-10-26
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-34516>

Very cool.  I was wondering how best to handle something like that.  Thanks, Pod!

## #3 — Micmac — 2009-10-26
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-34520>

This is great PodPerson, just what I asked for.

Thanks a lot!

Now, could you also give the volume of the object?

Mic

## #4 — podperson — 2009-10-26
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-34549>

Volume seems to be a lot harder. The center of mass of a tetrahedron is easy (average of the vertices  ) -- as is the volume -- but figuring out how to decompose an object into tetradhedra is hard (a lot of modeling programs aren't exactly sure where the interior of objects are, or if they're in fact solids -- just try playing with C3D's booleans for a bit and see for yourself).

My script takes advantage of C3D's internal triangulation -- so it will fail when C3D's triangulation fails (e.g. on some non-convex n-gons). Figuring out the area of an n-gon is non-trivial when the ngon itself is not very rigorously defined. So -- short answer -- no

## #5 — Micmac — 2009-10-26
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-34560>

[[QUOTE:  podperson said: Volume seems to be a lot harder. The center of mass of a tetrahedron is easy (average of the vertices ) -- as is the volume -- but figuring out how to decompose an object into tetradh]]

OK

But thanks anyway. This is great!

Mic

## #6 — podperson — 2013-08-15
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-81154>

I've updated the center of gravity script to calculate the center of volume correctly, and posted it on my site.

http://loewald.com/c3dbook/Scripts/Center-of-Gravity/

(This is because the 3d weasel I printed out tips over all the time, and I want the next version to stand stably on its own feet  )

Links: http://loewald.com/c3dbook/Scripts/Center-of-Gravity/

## #7 — DarthSidious05 — 2013-08-22
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-81279>

Thanks PodPerson for the Center of Gravity Script. :icon_thumbup:

How long would you say it took to script?

## #8 — crgreen — 2019-11-10
<https://www.cheetah3d.com/forum/index.php?threads/4810/post-118346>

[[QUOTE:  podperson said: I've updated the center of gravity script to calculate the center of volume correctly, and posted it on my site. http://loewald.com/c3dbook/Scripts/Center-of-Gravity/ (This is because]]

I love this script - and incorporated it into my own to do a multiple of objects at once. However, it freaks out - that is, it is unreliable - when used on 2 dimensional objects (like a single poly). This is probably not surprising, but it would be nice to have something in the code to account for this.
If you want to see what happens, just make a flat object, launch the script and hit the "Set Center of Gravity" button over and over again. You'll see it jump to seemingly random points just outside of (not actually on) the object.
