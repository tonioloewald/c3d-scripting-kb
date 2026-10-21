# Ellipse Spline

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6607/
- Subforum: script-downloads
- Started by **Herb** on 2010-12-02; last post 2011-01-02; 9 posts

## #1 — Herb — 2010-12-02
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-52376>

Ellipse Spline

Somebody
complained about a missing ellipse tool, where part of an ellipse is approximated by bezier splines with few control points.
As I was already on the road I wrote this tool.
Start and end angle can be chosen between -360 and 360 degrees. So, if you start with -360° and end with 360° or reverse, you go around twice!

Don't get dizzy!

Herbert

Rev 1: Dez. 20. 2010: Corrected a rounding problem in Javascript

Rev 2: Added parameter "Orientation" to select from "X","Y", "Z"

Attachments: [Ellipse-Spline.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13075/), [Bezier_Ellipse_0_2.zip](https://www.cheetah3d.com/forum/index.php?attachments/13499/)

## #2 — frank beckmann — 2010-12-19
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53233>

[[QUOTE:  Herb said: Somebody complained about a missing ellipse tool, where part of an ellipse is approximated by bezier splines with few control points. As I was already on the road I wrote this tool. Start ]]

Thanks Herbert.
Very useful script and it works within the the creator hierarchy. :icon_thumbup: 
When you go around the whole ratio as you mentioned you´ll get a tiny error like shown in the image. No big deal.  

Cheers
Frank

Attachments: [EllipseSpline.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13362/)

## #3 — Herb — 2010-12-20
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53272>

thank's Frank for the positive comment -
I was however not able to reproduce your result.

As you probably know, the spline methods, accessible through javascript, are very limited. However, Martin improved the handling of splines considerably for this version of C3D and so I am in good hope that he will also expose more spline methods to allow more sophisticated spline-scripting.

Greetings

Herbert

## #4 — frank beckmann — 2010-12-20
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53274>

[[QUOTE:  Herb said: thank's Frank for the positive comment - I was however not able to reproduce your result. Click to expand... ]]
Hi Herbert.
As I said: no big deal.

I attached a file that will show up what I was talking about. If it´s not - it´s most likely my crap-Mac. :redface: 

Cheers
Frank

Attachments: [EllipseBezier.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/13372/)

## #5 — Herb — 2010-12-20
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53286>

Hi Frank,
it was a rounding problem in the "modulo calculation" of javascript, not your Mac! (exchanged the zip in my original post)

By the way, I got a 2 x 2.4 GHz Quad-Core MacPro this summer and it is really a joy to watch C3D using all available power for rendering a scene!

Herbert

## #6 — frank beckmann — 2010-12-20
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53288>

[[QUOTE:  Herb said: Hi Frank, it was a rounding problem in the "modulo calculation" of javascript, not your Mac! (exchanged the zip in my original post) By the way, I got a 2 x 2.4 GHz Quad-Core MacPro this s]]
Thanks Herbert. :icon_thumbup: 
Works like a charme.

Cheers
Frank

PS:(Apple Macs: I´m on it for 20 years now and still have some of the older G3s. I can turn them on and they are "running" is ever - indestructible. But my latest iMac is a whole other story - and 600 bucks for a new graphic/logic board is a questionable bad joke - as Apple will replace it without any guarantee.)

## #7 — novolume — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53320>

I've wanted something like this for a while so thanks for creating it Herb. Looking forward to trying it out!

## #8 — frank beckmann — 2011-01-02
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53808>

Thanks Herbert.
Happy New Year to you.

Cheers
Frank

## #9 — Herb — 2011-01-02
<https://www.cheetah3d.com/forum/index.php?threads/6607/post-53810>

Same to you, Frank!
(needed some quantifiable distraction after restudying Quantum Mechanics:smile.

Herbert
