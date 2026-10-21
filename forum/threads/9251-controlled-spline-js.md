# Controlled Spline.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9251/
- Subforum: script-downloads
- Started by **tg_jp** on 2013-01-19; last post 2018-04-09; 24 posts

## #1 — tg_jp — 2013-01-19
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-76372>

Controlled Spline.js

Hello.

It's a spline script to make spline from child objects position as control points.

http://www.tres-graficos.jp/blog/files/article.php?id=95

EDIT: sample scene file added.

UPDATE: 'manual curve mode' added. demo: https://www.youtube.com/watch?v=833Z5lVZYNc

regards.

tg_jp, Hiroto

Attachments: [ch3d_20130118_controlledspline_ss.jpg](https://www.cheetah3d.com/forum/index.php?attachments/19000/), [controlledSpline_sample.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/20912/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=95, https://www.youtube.com/watch?v=833Z5lVZYNc

## #2 — Francois — 2013-01-19
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-76385>

[[QUOTE:  tg_jp said: It's a spline script to make spline from child objects position as control points. http://www.tres-graficos.jp/blog/files/article.php?id=95 Click to expand... ]]

Hi tg_jp, Hiroto

Great script as usual. Thanks again. Even if it doesn't solve fully tek.nishi problem's I am sure this will be very handy. More on this where you know.

## #3 — frank beckmann — 2017-07-08
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108150>

Phun with Physics

Hiroto made a new video on how to use this script and having some fun with it in combination with physics: https://www.youtube.com/watch?v=C8AGQircAs4
Thanks for sharing Hiroto.

Cheers
Frank

Links: https://www.youtube.com/watch?v=C8AGQircAs4

## #4 — ZooHead — 2017-07-08
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108151>

Thanks for sharing Frank, that's amazing. 

And thank you Hiroto, you've pried open my imagination once again. 
​

## #5 — Shift Studio — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108552>

visible/renderable child objects?

Hi Hiroto.

Do you think it would be possible to add a feature so that the Controlled Spline script's child objects/control points are visible in editor and renderable?

I have a project with lots of hydraulic hoses (using Sweep Creator). At each end of the hose is a connection fitting, and along the hoses runs are mounted hose guides/clamps.

I think the Controlled Spline script could be useful for moving parts and having the hoses follow along.

Thanks in advance, or thanks for reading 
--Shift Studio.

edit: Here is a pic that shows some of the fittings and hose guides

Attachments: [Hoses-and-Fittings.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31404/)

## #6 — bobziila — 2017-08-07
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108556>

In a pinch, I suppose you can parent your objects to the controlled spline objects and put them outside the controlled spline hierarchy so they will render.

Bob

## #7 — uncle808us — 2017-08-07
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108557>

[[QUOTE:  Shift Studio said: Hi Hiroto. Do you think it would be possible to add a feature so that the Controlled Spline script's child objects/control points are visible in editor and renderable? I have a pro]]

That is an incredible model Shift.

## #8 — Shift Studio — 2017-08-07
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108559>

Thanks Bobs!

@Bobzilla.  I'm unsure of exactly what your idea is, but yah, there definitely would be a way to hack something together. I'm looking for an elegant and versatile solution. The script (modified as described) seems promising to deliver both. 

@ uncle808us. Thanks, I appreciate hearing that! It's been a lot of work, and the above render only shows about 1/4 or so of the model. 

-- shift studio.

## #9 — Shift Studio — 2017-08-17
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108800>

New request

I'm working on a solution that makes use a parent constraint tags. 

Thanks very much to Rene66 and his post here! >> https://www.cheetah3d.com/forum/showpost.php?p=91125&postcount=7

It seems like the script always makes tangents of equal length. If there were a way to control that, it would be EVEN BETTER.

My request is to add an 'Approximation angle' parameter to the script to create smoother splines.

Are either of these possible?

Thanks, Shift Studio.

Links: https://www.cheetah3d.com/forum/showpost.php?p=91125&postcount=7

## #10 — frank beckmann — 2017-08-17
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108803>

Have you checked the Controlled-spline-tag script in addition to adjust single spline nodes? Shown in Hiroto´s video at 1:45min?

Cheers
Frank

## #11 — Shift Studio — 2017-08-17
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108804>

[[QUOTE:  frank beckmann said: Have you checked the Controlled-spline-tag script in addition to adjust single spline nodes? Shown in Hiroto´s video at 1:45min? Cheers Frank Click to expand... ]]

Hi Frank,
Thanks, yes, I'm making use of that tag.

What I'm trying to do is move my Hydraulic Crimp Fittings and have the hose in between enter/exit the fitting in a natural way, without tweaking the end points. Then I can adjust the midpoints as necessary.

If you take a look at the attached file, you can give it a try.
Its close, but still requires manual finessing.
Maybe you can think of a better way?
Goal is make it plug-n-play.:wink: 

Also if you make the script 'editable', you can see that if points 3 and 5's tangents were horizontal, there would be no problem, and I'd be able to get rid of points 2 and 6.

Thanks for your insights as always.
--Shift Studio.

Attachments: [hose-master.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31496/), [Hoses-Master.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/31497/)

## #12 — frank beckmann — 2017-08-17
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108808>

Here are two threads where François probably helped with:
https://www.cheetah3d.com/forum/showthread.php?p=76384
https://www.cheetah3d.com/forum/showpost.php?p=91096&postcount=2
Cheers
Frank

Links: https://www.cheetah3d.com/forum/showpost.php?p=91096&postcount=2, https://www.cheetah3d.com/forum/showthread.php?p=76384

## #13 — Shift Studio — 2017-08-17
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108809>

[[QUOTE:  frank beckmann said: Here are two threads where François probably helped with: https://www.cheetah3d.com/forum/showthread.php?p=76384 https://www.cheetah3d.com/forum/showpost.php?p=91096&postcount=2 ]]

Thanks Frank!
They're interesting and close to what I'm after. 

The cords/ropes in the linked-to threads don't really stay in a fixed-ish position where they attach to the plugs etc.
These hoses are somewhat stiff, so they're going to come of the crimp fittings along the same axis as the fitting itself. Also they're stiff enough that gravity doesn't force them to fall down - that is, I don't want them to fall down.

Here is what they look like, done the manual way, they don't bend (or fall down) where they enter/exit the crimp fitting.

What I've done is very close, and I can just make some tweaks to point 3 and point 5's parent constraint to tweak... for now at least. Its definitely better than the full manual approach.

Thanks,
--shift studio.

Attachments: [hose-and-fittings2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31499/)

## #14 — tg_jp — 2017-08-18
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108813>

hello

thank you for using this script. and I will add some option for controlling manually bezier spline control points.

I will post asap.

Best

tg_jp, Hiroto

## #15 — Shift Studio — 2017-08-18
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108817>

[[QUOTE:  tg_jp said: hello thank you for using this script. and I will add some option for controlling manually bezier spline control points. I will post asap. Best tg_jp, Hiroto Click to expand... ]]

Wow - great - thanks Hiroto - I can't wait to see it.
--shift studio.

## #16 — tg_jp — 2017-08-21
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108836>

Hello,

I added 'manual curve mode' to this script. please check demo mov.

http://tres-graficos.jp/blog/files/article.php?id=95

demo: https://www.youtube.com/watch?v=833Z5lVZYNc

Best

tg_jp, Hiroto

Links: http://tres-graficos.jp/blog/files/article.php?id=95, https://www.youtube.com/watch?v=833Z5lVZYNc

## #17 — Shift Studio — 2017-08-21
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108837>

This looks very, very good - for me - Thanks Hiroto!

I haven't tried yet, but in manual mode, how does the script know what is a 'point' on the spline and what is a 'control point' or handle?
Do you have to name it 'cp#' like in the video?

Thanks, Shift Studio.

## #18 — tg_jp — 2017-08-21
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108838>

Hello

[[QUOTE:  Shift Studio said: This looks very, very good - for me - Thanks Hiroto! I haven't tried yet, but in manual mode, how does the script know what is a 'point' on the spline and what is a 'control point']]

no, it's just order. object's name is not related ( any name will be ok ).

#1 child -> anchor point 1
#2 child -> handle (out) of anchor point 1
#3 child -> handle (in) of anchor point 2
#4 child -> anchor point 2
#5 child -> handle (out) of anchor point 2
...

Best

tg_jp, Hiroto

## #19 — Shift Studio — 2017-08-21
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-108842>

[[QUOTE:  tg_jp said: Hello no, it's just order. object's name is not related ( any name will be ok ). #1 child -> anchor point 1 #2 child -> handle (out) of anchor point 1 #3 child -> handle (in) of anchor po]]

Best

Of course! That makes perfect sense. :redface: 
Will give it a try.

Thanks, Shift Studio.

## #20 — Tomas — 2017-10-03
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-109365>

[[QUOTE:  tg_jp said: Hello, I added 'manual curve mode' to this script. please check demo mov. http://tres-graficos.jp/blog/files/article.php?id=95 demo: https://www.youtube.com/watch?v=833Z5lVZYNc Best tg_jp]]

Hi Hiroto, I would like to use your script, but can't find the "Controlled Spline Tag.js" anywhere to download

## #21 — tg_jp — 2017-10-05
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-109405>

Hi,

thank you for your comment.

at last update, I forgot packing Controlled Spline Tag.js file into zip file. I fixed that problem. please download again.

Best.

tg_jp, Hiroto

## #22 — Tomas — 2017-10-06
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-109415>

[[QUOTE:  tg_jp said: Hi, thank you for your comment. at last update, I forgot packing Controlled Spline Tag.js file into zip file. I fixed that problem. please download again. Best. tg_jp, Hiroto Click to exp]]

Thank you so much! Your scripts are amazing

## #23 — Shift Studio — 2018-04-04
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-111397>

Control Point (child) objects with Parent Constraint tag

This script was integral for a project I worked on last fall - thanks Hiroto!

There is one aspect that could use some attention. The script's child objects are used as control points in the spline. If you apply the Parent Constraint tag to parent the objects to another object, then animate, the child do not follow as expected. Rather, you must refresh their positions by turning the tag 'off', then 'on' again.

See the video I linked to >> https://www.dropbox.com/s/0llq3gupahodiqj/Hose-PistonSample.mp4?dl=0

I have the control points constrained to the hydraulic fittings, and those fittings are parented to the pistons' position. In theory it should all work but as seen in the video the hoses don't follow.

Is this a problem with the script, or a problem with the Parent Constrain tag, or the way I've set it up? I've included a sample file if anyone wants to give a try >> https://www.dropbox.com/s/my6o549ytbrewex/Hose-PistonSample.jas.zip?dl=0

Thanks for looking into it.
--shift studio

Links: https://www.dropbox.com/s/0llq3gupahodiqj/Hose-PistonSample.mp4?dl=0, https://www.dropbox.com/s/my6o549ytbrewex/Hose-PistonSample.jas.zip?dl=0

## #24 — Joel — 2018-04-09
<https://www.cheetah3d.com/forum/index.php?threads/9251/post-111442>

Link to Controlled Spline.js tutorial

I noticed this script was of current interest and figured it might be helpful to add a link to a tutorial I made a while ago. It is intended to explain how to use the related Tag script to easily make complex models.   

Thanks again Hiroto. 

https://www.cheetah3d.com/forum/showthread.php?t=12113

Links: https://www.cheetah3d.com/forum/showthread.php?t=12113
