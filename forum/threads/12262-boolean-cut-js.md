# Boolean Cut.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12262/
- Subforum: script-downloads
- Started by **tg_jp** on 2017-01-26; last post 2017-01-27; 9 posts

## #1 — tg_jp — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105573>

Boolean Cut.js

Hello

It's a tool script to cut polygon object with spline path. Only v7+.
Internally this uses Boolean modifier to cut.

download: http://tres-graficos.jp/blog/files/article.php?id=116

updated 20170127: fixed closed spline cut bug with b20.

Best.

tg_jp, Hiroto

Links: http://tres-graficos.jp/blog/files/article.php?id=116

## #2 — ZooHead — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105578>

Three scripts released at once, wow. 
Thanks.
​

## #3 — frank beckmann — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105581>

Another great one. :icon_thumbup: 
Unfortunately I can´t get this to run: I got either to "untouched" meshes in the xyz_cut-folder or it is empty. I watched the demo video quite carefully.
1. Place polygon object
2. Place spline in front (Y-axis)
3. Select polygon object
4. call Boolean_cut tool script
5. drag spline to entry field in script
6. hit "apply" button
7. result is an empty folder or two identical uncut base mesh objects.

Anything I´m doing wrong here?

Cheers
Frank

## #4 — uncle808us — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105590>

It worked for me I had to drag them from the old object.
update did not work with the star spline.

Attachments: [Drag apart.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30368/), [Star.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30369/)

## #5 — frank beckmann — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105591>

This simple case works here too.
But if I take a sphere and a flower spline I receive an empty "Ball_cut"-folder.

Cheers
Frank

## #6 — tg_jp — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105621>

Hi

thank you for testing it.  

cut path should be z axis of spline object, not x nor y. please send me the file to look into it.

tg@tres-graficos.jp

Best

tg_jp, Hiroto

Attachments: [booleanCut_ss170127.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30378/)

Links: mailto:tg@tres-graficos.jp

## #7 — frank beckmann — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105622>

Sorry for the confusion; X-axis was a typing error. I used Z-Axis all the time.
Here´s a super simple file which generates just an empty folder. (I had a much more complex set-up in mind).
Thanks for your time.

Cheers
Frank

Attachments: [BooleanCutTry.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/30379/), [BooleanCutTry.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/30380/)

## #8 — tg_jp — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105628>

Hi frank,

thank you for your file. I found a bug that occur with b20 ( actually I tested it with b19). I have fixed it, please replace it the latest file.

http://tres-graficos.jp/blog/files/article.php?id=116

Best

tg_jp, Hiroto

Links: http://tres-graficos.jp/blog/files/article.php?id=116

## #9 — frank beckmann — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12262/post-105631>

Hi Hiroto.
Thanks for the fix. It works now.
I found another error-prone one when cutting a thickened relief object. I´ve sent you an example file via email because it´s too large for an upload.
Thanks again for your awesome scripts.

Cheers
Frank

Attachments: [CutRelief.png](https://www.cheetah3d.com/forum/index.php?attachments/30384/)
