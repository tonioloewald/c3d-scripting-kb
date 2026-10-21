# Transparent Material Not Rendering Transparent

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12958/
- Subforum: scripting-general
- Started by **John B** on 2018-06-27; last post 2018-06-27; 5 posts

## #1 — John B — 2018-06-27
<https://www.cheetah3d.com/forum/index.php?threads/12958/post-112568>

Transparent Material Not Rendering Transparent

I have a transparent material that looks fine in the modeling view, but does not render correctly (see attached image). The texture has an alpha channel and the material is set to use the alpha channel as transparency.  It looks correct in the modeling view (right), but when it renders, the edges of the materials that should be invisible show up as dark areas (left). Maybe it's shadows cast by the edges, I can't really tell. I've tried rendering with a variety of different options, it make no difference. Neither does lighting.  Any suggestions on how to get the edges of the material to render transparently?

Attachments: [Transparent-Render.jpg](https://www.cheetah3d.com/forum/index.php?attachments/32899/)

## #2 — John B — 2018-06-27
<https://www.cheetah3d.com/forum/index.php?threads/12958/post-112569>

Here's another one of my low-poly trees, you can see what's going on better.

Attachments: [Transparent-Render-2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/32900/)

## #3 — frank beckmann — 2018-06-27
<https://www.cheetah3d.com/forum/index.php?threads/12958/post-112570>

Can you first check the "Index of Refraction" setting of your material; should set to 1,0. Let´s see if it this already.

Cheers
Frank

## #4 — John B — 2018-06-27
<https://www.cheetah3d.com/forum/index.php?threads/12958/post-112571>

[[QUOTE:  frank beckmann said: Can you first check the "Index of Refraction" setting of your material; should set to 1,0. Let´s see if it this already. Cheers Frank Click to expand... ]]

Thanks. That did the trick, it was set at 1.5.

Any suggestions on how to generate a mask?  Separating these trees from the background is not easy in Photoshop.

## #5 — frank beckmann — 2018-06-27
<https://www.cheetah3d.com/forum/index.php?threads/12958/post-112572>

Set camera background color opacity to 0% and you´re all set. Save rendering to PNG or TIF.

Cheers
Frank
