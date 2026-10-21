# Brick Node

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12433/
- Subforum: scripting-general
- Started by **podperson** on 2017-05-08; last post 2017-05-08; 3 posts

## #1 — podperson — 2017-05-08
<https://www.cheetah3d.com/forum/index.php?threads/12433/post-107356>

Brick Node

The brick node has two annoying attributes.

1) There's no control over the black-white transition, which means that bricks always look implausibly sharp.

1a) A corner radius would be great too.

2) By default the values are brick black, mortar white, which is upside-down for bump maps, meaning that if you want to use on brick node to drive both color and bump, you need to process the value to get a reasonable result.

Fixing (2) would involve breaking existing materials based on the brick node, so I'd like a checkbox toggle to have the brick go white and the mortar black.

tl;dr

Please provide a transition width
and perhaps a corner radius
Please reverse the values of the brick node

## #2 — misoversaturated — 2017-05-08
<https://www.cheetah3d.com/forum/index.php?threads/12433/post-107359>

I agree on the smoothing issue, fixing that would be very helpful.

With the brick node, same as with the wireframe node, first thing I do is swapping the colors and then using the color instead of the value output.
Also with the turbulence node, I nearly always want the ridges protruding instead of indenting.
Even the relief object needs to be turned upside down to show nicely ridged mountains instead of looking like a pile of mush :smile: 
(And reversed the 3dview renders it all black, so you can't find your place without making it editable...)

## #3 — podperson — 2017-05-08
<https://www.cheetah3d.com/forum/index.php?threads/12433/post-107370>

I'm with you on all that. I worry that the extra node, as well as complicating a lot of materials unnecessarily, is a performance hit. (I don't know how expensive each node is in the greater scheme of things.)

Sheesh, how did I put this in the scripting forum. I meant it for the wish list
