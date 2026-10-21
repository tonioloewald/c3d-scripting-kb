# Unify normals by script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7077/
- Subforum: scripting-general
- Started by **ByDesign Games** on 2011-03-21; last post 2011-03-28; 12 posts

## #1 — ByDesign Games — 2011-03-21
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57803>

Unify normals by script

Am considering a script for unifying normals.

Have some older models that are made up of multiple objects and find that Boolean Union munges the normals on a large number of polys.

Would love to be able unify all the normals "outward" from bounding center, and imagine this is possible in script?

Can someone confirm this? Or point to a resource if someone has already addressed this issue?

Cheetah3D FTW!

## #2 — podperson — 2011-03-21
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57810>

[[QUOTE:  Would love to be able unify all the normals "outward" from bounding center, and imagine this is possible in script? Click to expand... ]]

In what sense is this a normal?

A normal is a unit vector perpendicular to a plane/polygon. C3D tends to mangle polygons when it does booleans, but the normals should be fine. If not, it's a bug and not something you should need to script around.

It could also be a simple matter of adjusting "Smooth" settings (e.g. the constraints may be off). Typically, you may import an object with "nice" normals and then after performing a boolean you'll end up with C3D's default settings ("Constraint" and "45°") which tend to work really badly with certain kinds of models (notably hard edged models from NURBS modelers). My confusingly named "Global Iterator" script was written specifically to fix the normals for complex models imported from hard-edged NURBS modelers such as MoI and Rhino.

If you're hoping to preserve the normals from the source objects, that's another question.

## #3 — ByDesign Games — 2011-03-22
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57811>

[[QUOTE:  ByDesign Games said: Would love to be able unify all the normals "outward" from bounding center, and imagine this is possible in script? Click to expand... ]]

[[QUOTE:  podperson said: In what sense is this a normal? Click to expand... ]]
Outward in the sense that whatever the perpendicular is away from the objects bounding center (which is why "outward" was in quotes). 

The reason is, have more than a few faces whose normals are flipped & most often we want them all the same way so the object doesn't appear to have 'holes'. Smoothing is another issue.

So am trying to achieve a group change within Cheetah, as flipping them back individually (using Flip Normal) would take a long time and is tedious.

Unifying Normals is a command common to many 3D modeling packages, and typically works to achieve what I desire here. Can it be done through scripting?

## #4 — tg_jp — 2011-03-22
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57812>

hi

the answer is yes. 

1. calculate certain normal vector from some parameters ( bouding box center, target polygon position, etc. as you need. ).
2. if this normal is inverted/different from target polygon's normal, you apply flip normal with Polycore::flipWinding ( script function for applying "flip normal" tool ) function.

Cheetah3D don't hold normal value of each polygons, edges, nor points. It's calculated automatically from smooth type/angle value and other settings. you can change only polygon's winding about its normal.

ragards

tg_jp, Hiroto.

## #5 — podperson — 2011-03-22
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57833>

OK that makes more sense.

Is C3D's boolean function generating flipped normals? If so, that's a bug.

So you want a script that given a point P (e.g. bounding box center or pivot, say) flips the winding of a polygon if its current normal N with center C (average of its vertices) has a positive value for N • ( P – C ).

This would be easy to add to the global iterator.

Note that the behavior of this script would be OK for convex objects but is guaranteed not to work for objects with inward facing surfaces, such as pipes.

"Unifying" normals would be a lot more powerful but harder to implement. The idea here is that you start with a polygon in a mesh and and mark it "correct", and then you pick a polygon adjacent to a polygon marked "correct" and flip it if its winding doesn't match (if the first polygon is A B C ... and the second polygon is ... D B A, i.e. the shared edge is wound in the opposite order, then the windings "match", otherwise you flip it).

Edit: actually, the above algorithm won't resolve for "islands", so you need to randomly pick a polygon and mark it "correct" if you stop finding polygons not yet marked "correct" that aren't adjacent to a "correct" polygon.

The unifying algorithm is only guaranteed to work for the surfaces of well-defined objects. A moebius strip, for example, cannot be correctly unified (although the algorithm given above will terminate and produce some kind of result).

## #6 — podperson — 2011-03-22
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57839>

Here's a modified version of the Global Iterator Tool script -- renamed Surface Utilities -- that will set normals to face "outward" from the object's local origin. (It won't produce nice effects on, say, a torus.)

It's a brutal algorithm -- I just use the object's first vertex (rather than calculating the centroid).

A better option would actually "unify" normals per the algorithm outlined above, but that's a fair bit more complex to implement.

Some interesting notes from doing this:
C3D caches normals and doesn't recalculate them unless forced (in my script I set the object's "normalAngle" to force the recalculation).

A little more strangely, C3D returns dot products as a vector with x, y, z set to the scalar result (this contradicts the documentation, so I'd call it a bug).

In other words: var foo = bar.dot(baz) where bar and baz are Vec3Ds will cause foo to be a Vec3D -- had me stumped for quite a while.

Edit: I've implemented the unify normals algorithm described above, and given the resulting script its own thread.

Links: http://www.cheetah3d.com/forum/showthread.php?p=57851

## #7 — ByDesign Games — 2011-03-23
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57882>

Thanks for this; managed to get around the flipped normals by combining the objects in a different order. 

It then became apparent was that boolean operations in C3D sometimes deletes whole faces! Could not find a sequence that eliminated this.

Ended up using my old copy of Maya & Combine Mesh to avoid either issue, so just went with that.

Looking forward to the day that C3D replaces our need for other tools entirely!

## #8 — podperson — 2011-03-25
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57947>

Yeah I'm not a big fan of C3D's booleans, and if I really must use a boolean I tend to do it in Silo.

Writing the unify normals script was pretty interesting though, so I hope it will prove useful one day

## #9 — ByDesign Games — 2011-03-25
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57954>

[[QUOTE:  podperson said: Yeah I'm not a big fan of C3D's booleans, and if I really must use a boolean I tend to do it in Silo. Writing the unify normals script was pretty interesting though, so I hope it will]]
Took a look at the script's code, and it is interesting! Esp. the bit about the dot product vector :|

This is honestly the first look I've made at C3D's scripting interface and it looks _mostly_ well laid out 

And definitely this script is useful already; believing features like this should be built-in to C3D! (hint hint)

## #10 — podperson — 2011-03-25
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-57959>

Another interesting aspect of the script is that it recursively "walks" polygons by looking for adjacent polygons. This means that, among other things, a very similar script could probably "merge" adjacent coplanar faces (within some level of tolerance), thus cleaning up the mess that C3D's booleans tend to leave behind (for example).

## #11 — filip c — 2011-03-28
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-58027>

[[QUOTE:  podperson said: Another interesting aspect of the script is that it recursively "walks" polygons by looking for adjacent polygons. This means that, among other things, a very similar script could pro]]

I'm sure such a script would be appreciated very much :smile:

## #12 — podperson — 2011-03-28
<https://www.cheetah3d.com/forum/index.php?threads/7077/post-58031>

Yeah I'd like it for starters, so you'll probably see a new version soonish
