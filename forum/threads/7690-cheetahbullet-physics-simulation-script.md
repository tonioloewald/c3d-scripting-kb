# CheetahBullet - physics simulation script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7690/
- Subforum: script-downloads
- Started by **tg_jp** on 2011-09-10; last post 2011-10-18; 16 posts

## #1 — tg_jp — 2011-09-10
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63568>

CheetahBullet - physics simulation script

Hello

It's script set to execute physics simulation with Cheetah3D, it's using bullet physics library.

http://www.tres-graficos.jp/blog/files/article.php?id=74

sorry for lack of documents, please check some movies at youtube I uploaded.

http://youtu.be/LvqnU24IqlA

demo movies.

http://www.youtube.com/playlist?list=PL6871FC7B9BA0479C

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=74, http://www.youtube.com/playlist?list=PL6871FC7B9BA0479C, http://youtu.be/LvqnU24IqlA

## #2 — Martin — 2011-09-10
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63582>

Hi Hiroto,
thank you very much for creating that script. Absolutely impressive work. :icon_thumbup: I've already downloaded it.:smile: 

Kind regards
Martin

## #3 — mykyl66 — 2011-09-10
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63586>

Thanks for the script but I have no clue on how to use it. I open any of the sample files and nothing happens.
Ignore me. I will have a look another day when I can concentrate on the video listed. At the moment it makes no sense to me.

Cheers

Mike R

## #4 — tg_jp — 2011-09-11
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63613>

Hi, thank you for messages. 

[[QUOTE:  mykyl66 said: Thanks for the script but I have no clue on how to use it. I open any of the sample files and nothing happens. Ignore me. I will have a look another day when I can concentrate on the vi]]

to play with demo files, It requires 2 steps after installing scripts files.

1. click create button at "create sim. file" of Sim Tag to create simulation result file. this tag is attached to a folder of simulated objects.

2. click set button at "set sim. file" to set simulation result file for all "rep" objects ( depends on demo files ). for this steps, you can use clicking set button of "set file/target to all" at Helper section of Sim Tag, that is attached to folder of simulated objects.

then, click play to check simulation. 

regards.

tg_jp, Hiroto.

## #5 — mykyl66 — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63621>

Thank you.

Simple when you know how. 

Mike

## #6 — Novus — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63624>

Thank you for this script

First of all, a big THANK YOU Hiroto for this script. Really impressive. 
I played with the attached .jas-files and was very impressed. Great!:icon_thumbup:

Then I tried a simulation for myself (like the cloth simulation in the sim2.jas file) but something I must have overlooked. The "cloth" just get through the object. Can someone please show me what I have overlooked?

- Novus

Attachments: [Test.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/15644/)

## #7 — tg_jp — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63625>

Hi, thank you for trying.

I looked into your file. and please change some points.

1. delete all animation keys (position/rotation/scale) of Polygon Rep object, and set animation key for only 'frame' parameter as 0 to 120.

2. set 'mesh type' to 'static mesh' for Zylinder object.

then re-create or update simulation result file.

regards.

tg_jp, Hiroto.

Attachments: [Test_modByTgJp.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/15645/)

## #8 — Novus — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63626>

[[QUOTE:  tg_jp said: Hi, thank you for trying. I looked into your file. and please change some points. 1. delete all animation keys (position/rotation/scale) of Polygon Rep object, and set animation key for o]]

Thank you for your quick answer. I changed to "static mesh" and I deleted the animation keys. But I don´t understand how you set the animation key. Your modified file works very fine. When I delete your key from "Polygon Rep object" in the modified file and set new ones it doesn´t work anymore. (recreate und update of the simulation was done). I'm stuck there.... :-( 

- Novus

## #9 — mykyl66 — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63627>

Same here. I cannot get any tests other than the supplied ones to work.

Mike

## #10 — frank beckmann — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63628>

Didn´t you check the "how to use" vid on U-Tube?

Cheers
Frank

## #11 — Novus — 2011-09-12
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-63633>

Yes

[[QUOTE:  frank beckmann said: Didn´t you check the "how to use" vid on U-Tube? Cheers Frank Click to expand... ]]

I must confess that I have the video missed. Shame on me. First I downloaded the script and saw the two demo videos on Hirotos website. And I thought the two were shortcuts for these two demos .. Ohh, ohhh 
Thank you Frank for the hint. And Thank you Hiroto for the Video. Now it works!!! 

- Novus

## #12 — Ephesian — 2011-10-13
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-64484>

Odd behaviour with a sphere

Hi

Been having a play and think finally getting my head around this awesome script

I added a cone to Ozzys SIMPLE instructions for fun, and have both ball and cone falling, but I have a strange result. The cone does not hit the plane ( floats above it ). and the Ball 'bursts' above the point of the cone ( but looks really cool in animation ). I ve tried to move the objects 'centre' to the bottom, but doesn't work. 

I am assuming that Ive missed something or the collision detection is the problem.

Sry if this been answered before.

Attachments: [Screen Shot 2011-10-13 at 11.44.49.png](https://www.cheetah3d.com/forum/index.php?attachments/15856/)

## #13 — tg_jp — 2011-10-15
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-64526>

hi, thank you for reporting.

it's a bug for Cone primitive object.

try to not use Cone primitive, but raw polygon ( do 'Make Editable' for Cone ).

I will fix this problem for next update.

regards.

tg_jp, Hiroto.

## #14 — Ephesian — 2011-10-17
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-64546>

Silly question about copying

Hi

Hope this is not a silly question, but I want to copy one frame from the animation into another project.  

I've managed to get the effect I want, cloth draped over a odd box shape, and now I just want to pick the frame and copy it across.  I've tried copy paste on the rep object ( this is the one that gets selected when I click on the object) and nothing is showing up in the new document.

Thanks

Graham

## #15 — tg_jp — 2011-10-17
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-64548>

hi,

ok, you have to execute 'make editable' before copy command for other document with just only 1 frame polygon shape. but if you do this for Rep object, you can't call other frame or edit simulation anymore, so I recommend that copy Rep object at the same document, then 'make editable' for copied object, select and copy to another document.

regards.

tg_jp, Hiroto.

## #16 — Ephesian — 2011-10-18
<https://www.cheetah3d.com/forum/index.php?threads/7690/post-64560>

Silly question answered

Cheers Hiroto

Knew it would be simple. Thanks matey, as always you rock.

Graham
