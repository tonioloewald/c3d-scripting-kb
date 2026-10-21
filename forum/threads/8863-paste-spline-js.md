# Paste Spline.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8863/
- Subforum: script-downloads
- Started by **tg_jp** on 2012-10-02; last post 2013-07-13; 19 posts

## #1 — tg_jp — 2012-10-02
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73628>

Paste Spline.js

Hi

it's a tool script to paste points of spline as a kind of ray. it's not a magic tool, but I think it help a lot for modeling.

download: http://www.tres-graficos.jp/blog/files/article.php?id=88

update: I have changed this script name to Spline Cut.js, please check it. http://www.cheetah3d.com/forum/showthread.php?t=8878

regards

tg_jp, Hiroto.

Attachments: [ch_20121002_pastespline.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18066/), [PasteSpline_chart.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18067/)

Links: http://www.cheetah3d.com/forum/showthread.php?t=8878, http://www.tres-graficos.jp/blog/files/article.php?id=88

## #2 — frank beckmann — 2012-10-02
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73637>

Great script.

Wow - this opens a bunch of possibilities. :icon_thumbup: 
I might add you can reduce the amount of points on rounded splines by increasing the approximation angle of the spline first.

Thank you for sharing - this will come in handy for sure.

Cheers
Frank

## #3 — Dr. Porkchop — 2012-10-04
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73677>

Seriously Hiroto - are you psychic or what, mate? I was just sitting here with a nice cup of tea, wondering how I could easily make an arched window in a curved castle turret wall, when I discover you have just uploaded a script which does  exactly what I need!

Thankyou very much.

.....actually I find I'm having a slight problem: I can project the spline onto the object as you have in your example, but I cannot seem to connect the points with the scalpel tool??? (using v.6.01 under OS X Lion 10.7.4).

thanks again!

## #4 — frank beckmann — 2012-10-04
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73680>

[[QUOTE:  Dr. Porkchop said: ....actually I find I'm having a slight problem: I can project the spline onto the object as you have in your example, but I cannot seem to connect the points with the scalpel tool]]
Actually it´s all written down in the attached image: as the projected points won´t connect you´ll have to use the scalpel to introduce as many points as projected ones (skip these that are already on an edge) - then use weld-to-first-point by clicking a projected point then the cut one near by. As Hiroto describes in his paper.  

Cheers
Frank

## #5 — Dr. Porkchop — 2012-10-04
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73682>

[[QUOTE:  frank beckmann said: Actually it´s all written down in the attached image: as the projected points won´t connect you´ll have to use the scalpel to introduce as many points as projected ones (skip the]]

Ahh, that wasn't quite clear, thanks. I've done that now and can see how it works, but in that case it's slightly less magical than I'd hoped.  

Ideally (a question for Hiroto really), having done the difficult bit of figuring out the surface projection, could the tool also perform the next logical step of adding the projected points to the object and connecting them automatically? 

I don't really want to have to manually insert the same number of points as say, the flower spline (30 by default) or even less the cog spline (120 points for the default 20 teeth one)!

## #6 — frank beckmann — 2012-10-04
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73683>

[[QUOTE:  Dr. Porkchop said: Ahh, that wasn't quite clear, thanks. I've done that now and can see how it works, but in that case it's slightly less magical than I'd hoped. Click to expand... ]]
C´mon.
Read closely. Hiroto said: "it's not a magic tool, ..."
And I wrote: ".. to reduce the amount of points increase the approximation angle of the spline first!"

The next logical step would be a complete "Boolean operation" on an open heart. Don´t think that´s possible yet.

Cheers
Frank

## #7 — Dr. Porkchop — 2012-10-04
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73684>

yes - I did read both remarks, but I respectfully maintain it would be even more magic (than it already is) if it could add and connect the points as well!

cheers

## #8 — tg_jp — 2012-10-05
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73720>

hi, thank you for using it.

actually, I know that problem. so, I updated and renamed it. still not magic tool, but it's better. I hope.  

regards.

tg_jp, Hiroto.

## #9 — Dr. Porkchop — 2012-10-05
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73722>

[[QUOTE:  tg_jp said: hi, thank you for using it. actually, I know that problem. so, I updated and renamed it. still not magic tool, but it's better. I hope. regards. tg_jp, Hiroto. Click to expand... ]]

Hi Hiroto - thanks for this update: at least some of the points are now added to the original polygon object when the appropriate box is checked - but some are not, it seems. (I presume the cutting with the scalpel tool is still supposed to be done manually). Using a square spline, I cannot make cuts from or to the corner points. Using a circle spline, I cannot make cuts between any points. I've attached a screenshot.

Thanks again for this great tool.

Attachments: [Screen Shot 2012-10-05 at 10.08.59 AM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18082/)

## #10 — tg_jp — 2012-10-05
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73723>

hi, thank you for testing.

you can not use scalpel tool for added point on polygon surface by 'point detection' ( currently script cannot calculate how polygon should be seprated by added points/edges ). so you have to add new point, and align those points position with weld tool ( first point ).

regards.

tg_jp, Hiroto.

## #11 — Dr. Porkchop — 2012-10-05
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73724>

OK understood - and that's fine for splines with low curvature (eg the square) since cutting across an object's edge in a straight line won't lose much information from the projection, and adding and welding a few corner points manually where a projected point lands between edges isn't so bad. 

But for more curved splines, there could be many projected points which fall between two edges, and which will not be co-linear on the surface polygon in general, and so it could require quite a bit of manual point insertion/welding to accurately capture the original projection.

Alternatively, if I want to keep the manual point insertion to a minimum, I could increase the geometry to ensure there are more edges for the projection to fall on, but that may not be desirable. In the (admittedly contrived) example below I made tubes with 8, 32 (default) and 100 faces to illustrate. In the 8-sided one I basically just get two projected points added to one edge - so in order to make cuts on the surface I would need to add & weld all the others manually. Even with 32 faces I still only get 4 points added on two edges, so I can only draw two lines without any further manual adding/welding. With 100 faces, I can make several cuts and get a fair approximation to the projection without adding/welding the other points, but still miss some subtle detail around the corners.

Still an excellent tool though - I guess I'll just keep to square windows for now!

Thanks again

Attachments: [8-tube.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18083/), [32-tube.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18084/), [100-tube.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18085/)

## #12 — tg_jp — 2012-10-05
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-73725>

hi, thank you for your reporting.

I will consider that problem. :smile: 

BTW, I have just update Spline Cut.js, first version had a bug. please update it.

regards.

tg_jp, Hiroto.

## #13 — Shift Studio — 2013-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80447>

First tg_jp, thanks for another useful script! I've been using it successfully on occasion for a while.

Today I'm getting an error that I can't figure out. (see attached)
It happens with a custom spline, but not with a parametric spline.
I've attached the file for examination
Whats the problem with my spline in regards to using the script?

Thanks, Shift Studio.

Edit: created a new spline with a 'Rect' spline to start and the script worked. The other spline came from a 'Text' spline that was modified.

Attachments: [Spline-Cut-error-message.jpg](https://www.cheetah3d.com/forum/index.php?attachments/20502/), [Spline Cut issue.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/20503/)

## #14 — frank beckmann — 2013-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80449>

Your spline is indeed "different". Check the info of yours and mine.

Cheers
Frank

Attachments: [Spline Cut Resolved.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/20504/), [SplineCutIssue.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/20505/)

## #15 — Shift Studio — 2013-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80450>

hmm, so the spline I created using a text spline of the character 'D' and deleting a portion is seen by Cheetah as 2 paths for some reason. It makes sense that the script wouldn't work then. 
But how it became 2 splines is a surprising to me.
Is your 'SplineNew' a fixed version of mine, or a newly created spline?

Thanks, Shift Studio.

P.S. No rush on this because I created a new spline via a rectangle, and that worked for me.

## #16 — frank beckmann — 2013-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80451>

[[QUOTE:  Shift Studio said: But how it became 2 splines is a surprising to me. Click to expand... ]]
This seems to be a glitch I reported. Lets see if the Doctor can fix it.

[[QUOTE:  Shift Studio said: Is your 'SplineNew' a fixed version of mine, or a newly created spline? Click to expand... ]]
I draw it from scratch inside Cheetah3d.

Cheers
Frank

## #17 — tg_jp — 2013-07-13
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80453>

Hi, thank you for reporting.

I updated the script by fixing a bug of that error. please update it.

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3DScreenSnapz001.png](https://www.cheetah3d.com/forum/index.php?attachments/20506/)

## #18 — frank beckmann — 2013-07-13
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80456>

Great workaround. Thank you very much for the update. :icon_thumbup: 

Cheers
Frank

## #19 — uncle808us — 2013-07-13
<https://www.cheetah3d.com/forum/index.php?threads/8863/post-80478>

I can get a square spline hole but no luck with a circle. I'll attempt more tries.
On my second attempt I had success after an optimize and a center ring cut after the optimize. I adjusted the points along a guide circle spline. This circle spline was only used as a guide.
Sorry for the huge images it's that damn rentina display. I still don't understand it.

Attachments: [SqHole.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/20513/), [Hole1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/20516/)
