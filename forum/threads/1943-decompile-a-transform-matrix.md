# "Decompile" a transform matrix?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1943/
- Subforum: scripting-general
- Started by **capnchunky** on 2007-07-15; last post 2007-07-28; 9 posts

## #1 — capnchunky — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13397>

"Decompile" a transform matrix?

Hey all,

Can anyone help me understand how to break down a transform matrix into separate rotation and scale Vec3Ds?

I ask this as I'm trying to write a script that will parse LDraw Lego model files.  One feature of this format is the ability to nest references to previously defined piece/geometry files inside of other files.  Such a reference line looks something like this:

	
	


```
type color x y z a b c d e f g h i filename
```


where these letters define the following transform matrix:

	
	


```
a d g 0
b e h 0
c f i 0
x y z 1
```


Now, for each nested piece, I'd like to (if possible) create a folder with those transform values, rather than transforming actual vertices.  Getting the position is simple, but the values for rotation and scaling seem hopelessly intertwined.

Any advice would be greatly appreciated.

## #2 — ToddWR — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13413>

capnchunky,

here is a link that describes what you wanted to know. it describes directX but it works the same for cheetah.
http://www.allgames.com/blog.asp?blog=codeandpolys&col=62

if you want some help, just drop me a note
Todd

Links: http://www.allgames.com/blog.asp?blog=codeandpolys&col=62

## #3 — capnchunky — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13420>

Hi Todd,

Thank you, but I'm not sure that's exactly what I was hunting for (unless I'm just missing it).  I'm hoping to find a way to take an already combined matrix and break it down into its original, separate rotation angles and scale values.  But I don't know if that's possible, since the values of the 3 rotation axes and scale values overlap in the matrix that's saved in the LDraw file.

I've been searching for a while, and I'm starting to think I should just give up and apply the matrix I've been given directly on the vertices.

## #4 — podperson — 2007-07-17
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13449>

You can't just "read it off". Consider the analogous question that "I have a number X which is the sum of Y and Z, if I give you X, how do I determine Y and Z?"

Rotating 90 degrees around the Y axis and then scaling on the X axis should produce the same transformation matrix as scaling on the Z axis and then performing the rotation.

A rotation (by other than a multiple of 90 degrees) followed by a non-uniform scale will always produce a shear. Remember that a transformation matrix can represent an arbitrary sequence of translations, scales, and rotations -- so it's not guaranteed that it can be represented as a scale, a translation, and a rotation. (In any complex case it will be impossible.)

Your closest approximation would be to apply the transformation to reference points representing the corners of (say) a unit cube and see what happens to it. (You could probably get away with three points.)

But in the end, the process of converting individual transforms to a 3D space into a single transformation matrix is lossy, and there's no easy way to recover the inputs from the result. (I wouldn't be surprised if it's theoretically impossible.)

Edit: actually your word "decompile" says it all. From a piece of binary object code you can disassemble (return to assembler) but not decompile (return to the high level language). Compilation is a lossy process.

## #5 — capnchunky — 2007-07-17
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13454>

[[QUOTE:  podperson said: Your closest approximation would be to apply the transformation to reference points representing the corners of (say) a unit cube and see what happens to it. (You could probably get a]]

That's a really good thought, thank you.  I'll work on that approach.

I should have been more clear; I'm only interested in the final, resultant changes and not the individual steps leading to it.  The LDraw software takes that matrix and divines the rotation values in degrees in the editor, and I was going in the wrong direction trying to figure out the process.

Thanks all!

## #6 — Martin — 2007-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13478>

Hi,
a transformation matrix can be decomposed to a translation, scale, shear and rotation component. Without that it would be impossible to implement many tools. The only problem is that that operation isn't unique. 

How to do it is described in many books about 3D garphics. Just search under "Matrix decomposition".

Bye,
Martin

## #7 — Martin — 2007-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13479>

Hi,
this link might help.

http://www.acm.org/pubs/tog/GraphicsGems/gemsii/unmatrix.c

Bye,
Martin

Links: http://www.acm.org/pubs/tog/GraphicsGems/gemsii/unmatrix.c

## #8 — capnchunky — 2007-07-22
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13646>

Thank you, Martin!  I'd been looking for something similar, but most of what I'd found was either registered-user-only articles or huge essays about matrix trigonometry, and I was feeling in over my head.

I've only just now had a chance to sit down and pour over that code, and I'm working on adapting it to Javascript.  I'm still not totally sure how it works, but if it works at all, I'll be happy. 

Edit: I have a question, now that I'm looking at it in depth.  There's one function in the above C file, V3Combine() (first used in line 104), that's got me stumped.  I can't tell what it's supposed to return based on its arguments, and I couldn't find it defined anywhere in the include files.  Do you have any idea what it does?

## #9 — capnchunky — 2007-07-28
<https://www.cheetah3d.com/forum/index.php?threads/1943/post-13754>

Ah ha, think I found it here: http://arcib.dowling.edu/~JainP/Research1/Delaunay/OList/3dgeom.c.old

Back to work...

Links: http://arcib.dowling.edu/~JainP/Research1/Delaunay/OList/3dgeom.c.old
