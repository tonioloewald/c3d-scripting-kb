# Automating split via script?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12521/
- Subforum: scripting-general
- Started by **joocoo** on 2017-07-09; last post 2017-07-10; 4 posts

## #1 — joocoo — 2017-07-09
<https://www.cheetah3d.com/forum/index.php?threads/12521/post-108160>

Automating split via script?

Hello,

I have a sphere object that is made up of many triangles.

I need to select each triangle and split it out as it's own object.

I then take that triangle and flip the normal. Then I UV unwrap with ABF.

Then I select the next triangle and repeat.

This is extremely tedious.

Is there a way to do this via script?

I have tried to find basic tutorials to create a script but having issues finding any.

Does something like this already exist? At least the splitting part would help.

A guess a wishlist item would be to select all triangles and split them all instead of one by one would be very helpful.

Thanks!

Joe

## #2 — frank beckmann — 2017-07-09
<https://www.cheetah3d.com/forum/index.php?threads/12521/post-108161>

Hi Joe.
Maybe this will help in the meantime.
Generate a stam-looped Icosahedron which will produce a spherical object made from triangles only - flip normals if necessary.
Get Hiroto´s polygon "Explosion.js" script and drag the Icosahedron onto it in the object browser.
Hit "Update"-button and make "editable" - it will disconnect all triangles.
Select every triangle and call "UV Unwrap with ABF/LCSM" in UV editor.
Call the Tool-script: "Polygon UV Editor.js":
Enter at U and V Tiles: 1
Hit  "OK"-button at "Apply Tile". All triangles will move to the upper right corner of the UV template.
This of course don´t help with split polygons to separate objects.

Cheers
Frank

Attachments: [AlignedUVs.png](https://www.cheetah3d.com/forum/index.php?attachments/31276/)

## #3 — joocoo — 2017-07-10
<https://www.cheetah3d.com/forum/index.php?threads/12521/post-108185>

Awesome! Thank you

## #4 — frank beckmann — 2017-07-10
<https://www.cheetah3d.com/forum/index.php?threads/12521/post-108186>

Just a reminder: the aspect ratio of the UV triangle is different from the ones the mesh is built from.  

Cheers
Frank
