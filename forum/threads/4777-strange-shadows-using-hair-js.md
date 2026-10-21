# Strange shadows using hair.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4777/
- Subforum: scripting-general
- Started by **SurfingAlien** on 2009-10-18; last post 2009-10-18; 3 posts

## #1 — SurfingAlien — 2009-10-18
<https://www.cheetah3d.com/forum/index.php?threads/4777/post-34007>

Strange shadows using hair.js

Hi!
i made these two copies of a tennis ball, one with a simple procedural material and one using the wonderful Hair.js from Hiroto. i can't get rid of those dark shadows between the "hair" in the second one, i've tried adding a render tag (to the hair creator) and uncheck cast/receive shadows, or filter texture (not sure what this does actually...). hair material is a simple yellow velvet...

any idea why? is it the back faces of Hair polys?  

attached a render, here the .jas (2.5 megs!)

regards,
Alessandro

Attachments: [TennisBalls.jpg](https://www.cheetah3d.com/forum/index.php?attachments/8105/)

Links: http://dl.getdropbox.com/u/2029627/TennisBalls.jas.zip

## #2 — tg_jp — 2009-10-18
<https://www.cheetah3d.com/forum/index.php?threads/4777/post-34014>

hi,

thank you for using the script. nice ball 

please check off 'visible in radiosity' option at Render tag for radiosity rendering with hair object. 

and about file size, you can use modifier for child object of Hair.js object. please use it for lower file size. 

regards.

tg_jp, Hiroto.

Attachments: [tennisBall.jpg](https://www.cheetah3d.com/forum/index.php?attachments/8107/), [Cheetah3D_sz_006.jpg](https://www.cheetah3d.com/forum/index.php?attachments/8108/)

## #3 — SurfingAlien — 2009-10-18
<https://www.cheetah3d.com/forum/index.php?threads/4777/post-34019>

thank you so much for all the hints, very helpful!

and thank you for creating all these wonderful scripts and help us out about using them, btw :smile: 

regards,
A
