# Request: Dotted Line / Arrow with Dotted Line

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11665/
- Subforum: scripting-general
- Started by **Swizl** on 2016-01-29; last post 2016-03-10; 6 posts

## #1 — Swizl — 2016-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11665/post-99320>

Request: Dotted Line / Arrow with Dotted Line

I'm not sure if / how this can be done. There is a script written quit a while ago that can create a modifiable cylinder with arrow head(s). I'm just wondering if anyone that's good at scripting may be able to either created a new one or modify the original Arrow.js to have an option for dotted lines like in my render? I've just taken the original arrow, collapsed the mesh, deleted every other division and then filled the holes. 

Thanks for looking!

link to original script:
http://www.cheetah3d.com/forum/showthread.php?t=1456

Attachments: [Arrow vs Dotted Arrow.jpg](https://www.cheetah3d.com/forum/index.php?attachments/28252/)

Links: http://www.cheetah3d.com/forum/showthread.php?t=1456

## #2 — frank beckmann — 2016-03-09
<https://www.cheetah3d.com/forum/index.php?threads/11665/post-99968>

Maybe just a procedural stripe material connected to the transparency channel will do it:

Cheers
Frank

Attachments: [Dashed Line With Arrows.png](https://www.cheetah3d.com/forum/index.php?attachments/28518/)

## #3 — Swizl — 2016-03-09
<https://www.cheetah3d.com/forum/index.php?threads/11665/post-99970>

[[QUOTE:  frank beckmann said: Maybe just a procedural stripe material connected to the transparency channel will do it: Cheers Frank Click to expand... ]]

Yes, I think that could do the trick. Thanks, I'll give it a try!

## #4 — Jeanny — 2016-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11665/post-99982>

Here is a good laugh for all you Brawny Brains 
(I mean Brawny Brains as a compliment)

[[QUOTE:  Maybe just a procedural stripe material connected to the transparency channel will do it: Click to expand... ]]
Please help.  I think I'm missing something here.
Hey - at least I'm good for a good laugh. 
Please see attached file and screen shot

My Best
Jeanny

Attachments: [Helix Arrow.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/28532/), [Helix Arrow.png](https://www.cheetah3d.com/forum/index.php?attachments/28533/)

## #5 — frank beckmann — 2016-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11665/post-99983>

This isn´t going to work as you need proper UVs you get for free with the Arrow-scripts (and yes - also with the sweep and other creators, But not in combination with other tools which will add UVs on top of it, you might wanna check the UV editor)
Best guess maybe is to wrap (bend-modifier might work to) the scripted Arrow object - I find it quite hard not to destroy the arrow heads with the stripe material.
Solution depends on your goal of course.

You might get the idea from this set-up screenshot:

Cheers
Frank

Attachments: [HelixDashedArrow.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/28535/)

## #6 — Jeanny — 2016-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11665/post-99984>

Thanks Herb & Frank!

My Best
Jeanny
