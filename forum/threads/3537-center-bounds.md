# Center Bounds

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3537/
- Subforum: script-downloads
- Started by **podperson** on 2008-09-28; last post 2009-08-02; 10 posts

## #1 — podperson — 2008-09-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-24976>

Center Bounds

Todd's center.js has some limitations which I don't like, a bug (which can easily be fixed), and doesn't do what you might think, so I've heavily modified it. Todd -- you should probably add a line to your script to prevent it from messing with objects that have no vertices (like creators) ...

	
	


```
	var size = core.vertexCount();
	// if the object has no points, we bail out
	if( size == 0 )
		return;
```


My script differs from Todd's in two key ways:

My script calculates the new center based on the selected object's bounding box, rather than by averaging out all its vertices (as Todd's does). The two approaches will have the same effect on symmetrical objects, but markedly different effects on objects with more detail on one side, and subtly different effects on almost any typical mesh. Personally, I think centering to the bounding box is what most users would want and expect.
It provides three parameters (X, Y, and Z) that control where in the bounding box the center ends up. 0 -> the minimum value, 1 -> the maximum value, and 0.5 (the default) the center value. So, for example, if you set Y to 0, and leave X and Z alone, it will move the pivot to the center of the object's base.

Known Problems

Don't use this script (or Todd's) on objects with arbitrary coordinate systems. In particular the mesh's coordinate system should not be rotated relative to the global coordinate system.

Thank you (again) Todd for writing center.js and providing such helpful and extensive comments.

Attachments: [center_bounds.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/5664/), [Picture 2.png](https://www.cheetah3d.com/forum/index.php?attachments/5665/)

Links: http://www.cheetah3d.de/forum/showthread.php?t=2565

## #2 — bugaboo — 2008-09-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-24978>

Averaging verts is an incorrect approach. Those verts might not be uniformly distributed in space. You might have a sphere with 100 verts in one place but a big box in another place that has 8 verts. If you averaged it all it would skew the center heavily to the sphere.

Its not like a density / center of mass type calculation one would find in chemistry or physics with some uniformly dense substance.

Bounding box approach is better.

## #3 — bugaboo — 2008-09-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-24979>

I see :

var minLoc = core.vertex(0); // will hold the minimum x, y, and z
var maxLoc = core.vertex(0); // will hold the maximum x, y, and z

I suppose this is all set to zero initially. But lets say I have a box in the positive octant in space. And none of its corners are equal or less than 0. Should minLoc be set initially to some max number? Otherwise the if might not work in the loop initially?

## #4 — bugaboo — 2008-09-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-24980>

My bad. I see you are setting it to the first vertex. So, no problem.

## #5 — podperson — 2008-10-01
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-25065>

Hi -- sorry I missed your posts, but looks like you figured out the answers yourself.

Yes -- I initialize minLoc and maxLoc to the first vertex, so there should never be a problem.

And yes -- I think averaging verts is simply wrong, but I was trying to be diplomatic

## #6 — bartelsmedia — 2009-05-25
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-29722>

Thanks for the great script. Allowing to center to a base of an object was the missing feature of Todd's original script.

BUT: Your new script throws a Javascript error if I try to center the coord of a folder containing a simple extrusion:

		
	

And if I try to center the coord of the extrusion directly, it just shifts the object around.

Any help?

Attachments: [2009-05-25_1436.png](https://www.cheetah3d.com/forum/index.php?attachments/6945/)

## #7 — Targos — 2009-05-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-29803>

Well I think it only works on polygonal geometry
you could try substituting your folder for a "polygonobject" that has no real data.

good luck

AaronC

## #8 — bartelsmedia — 2009-05-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-29806>

What do you mean with polygon with no real data, please?

Actually, I do not want to center the coords for any object just for the sake of it but a folder that contains polygons. ;-)

Would it be possible to fix the script in this regard? I would love to do it but if looking at my programming skills I see nothing but left thumbs: :icon_thumbup: :icon_thumbup:

## #9 — Targos — 2009-05-28
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-29807>

Go Objects>Polygons>Polygon Object.

Notice its icon is different than a folder? Im not suggesting anything to do with co-ords..

put that where your folder is and again try what you are trying to do- Bear in mind this script is built for working with singular objects but give it a try. You could maybe combine your objects (See Import Children in Help and via forum search) then apply the script

try that and report back, let us know how it goes.
AC

## #10 — podperson — 2009-08-02
<https://www.cheetah3d.com/forum/index.php?threads/3537/post-31145>

There's no messing with folders, AFAIK. I guess what you want to do is move a folder and then move its contents to compensate...
