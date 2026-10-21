# How to texture extrusions?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9264/
- Subforum: scripting-general
- Started by **Transini** on 2013-01-22; last post 2013-01-23; 4 posts

## #1 — Transini — 2013-01-22
<https://www.cheetah3d.com/forum/index.php?threads/9264/post-76481>

How to texture extrusions?

I take a 128x128 polygon ball, cut out 1/4 of the top surface polygons, do a shell extrude on it to get "solidity", and apply a texture. This works, but I get an undesirable pattern on the cutaway portion. Is there some way to make the cutaway portion textured somewhat more like the surface? I realize that Cheetah is doing the "right" thing (texturing the actual topology of the extrusion), but it's not the desired effect...

Attachments: [Screen shot 2013-01-21 at Jan 21 - 8.50.59 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/19058/)

## #2 — frank beckmann — 2013-01-22
<https://www.cheetah3d.com/forum/index.php?threads/9264/post-76490>

Let´s see if this will help you out:
I pull the inner UV islands apart so you can see which on goes where.
I used a low poly sphere with creased edges + Subdivision-modifier.

Cheers
Frank

Attachments: [HelloEarth.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/19066/), [Hello Earth.png](https://www.cheetah3d.com/forum/index.php?attachments/19067/)

## #3 — Transini — 2013-01-23
<https://www.cheetah3d.com/forum/index.php?threads/9264/post-76539>

Wow, I don't know how you did that  , but yeah, that's what I was looking for!
Thanks!

## #4 — frank beckmann — 2013-01-23
<https://www.cheetah3d.com/forum/index.php?threads/9264/post-76544>

Select the polygons from the "cut-away" and call for unwrap in the UV-editor - scale&arrange - done.

Cheers
Frank
