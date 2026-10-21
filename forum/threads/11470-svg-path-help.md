# SVG Path Help

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11470/
- Subforum: scripting-general
- Started by **Xephyer** on 2015-09-10; last post 2015-09-10; 3 posts

## #1 — Xephyer — 2015-09-10
<https://www.cheetah3d.com/forum/index.php?threads/11470/post-97735>

SVG Path Help

I've been around Cheetah3D for a while - but have not developed my skills very well.

I have a small project - and can't seem to figure it out. Im sure there is a solution - but it is beyond me.

I have a logo that I bring into C3D as an SVG. When I do, it drops it in a SVG Paths folder - with 500+ individuals splines. I wanted to extrude the logo - bt I can't seem to find a method to do this - without making 500+ individual extrude objects and individually dropping each spline into a new Extrude.

Is there another way to do this?

Thanks for any help!

## #2 — podperson — 2015-09-10
<https://www.cheetah3d.com/forum/index.php?threads/11470/post-97736>

If you take 499 of them and make them children of one and then "import children" you'll get a combined spline. Throw away the children and now you have all 500 in one object. (Just like polymeshes, kind of.)

BTW: why is this under scripting?

## #3 — frank beckmann — 2015-09-10
<https://www.cheetah3d.com/forum/index.php?threads/11470/post-97738>

Use PDF instead of SVG.

Cheers
Frank
