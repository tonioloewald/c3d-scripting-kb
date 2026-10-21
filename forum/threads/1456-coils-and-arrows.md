# Coils and Arrows

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1456/
- Subforum: script-downloads
- Started by **Herb** on 2007-03-25; last post 2016-03-11; 21 posts

## #1 — Herb — 2007-03-25
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-9193>

Coils and Arrows

I hope, somebody finds these scripts useful.

Herb

Attachments: [Herbs_Scripts.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1828/), [To appropriate Folder.zip](https://www.cheetah3d.com/forum/index.php?attachments/1829/)

## #2 — uncle808us — 2007-03-25
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-9197>

Yes these will be useful thanks

Thanks for the scripts. are they tool scripts or spline or polygon ect?:smile:

## #3 — Herb — 2007-03-25
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-9199>

Scripts are zipped within correct folders

Hello uncle808us,
there are two polygon and three spline scripts.
The zip file has two folders, "Polygonobj" with the polygon scripts and "Splineobj" with the spline scripts.
I use the coil spline scripts with a small circle in C3D-sweep and the 2D-arrow with C3D-polyplane.

## #4 — uncle808us — 2007-03-25
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-9202>

Thank again.

[[QUOTE:  Herb said: Hello uncle808us, there are two polygon and three spline scripts. The zip file has two folders, "Polygonobj" with the polygon scripts and "Splineobj" with the spline scripts. I use the coi]]

I'll be using these thanks.

## #5 — OTB Designworks — 2007-03-26
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-9206>

Thanks, I'll find these very useful.

Cheers, Chuck

## #6 — Herb — 2012-07-24
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-72163>

arrows with uv-settings

Hi all,
up to now I only needed singly colored arrows. However recently I wanted some fancier coloring and found out that when I was writing these scripts I did not know about uv-coordinates.
I thus reworked the scripts such that the arrows have a reasonable uv-setting. I also tried to improve the quality of the code: it should be easy to read as well as easy to revise.

Hope somebody finds this useful.

Herb

Attachments: [arrows.jpg](https://www.cheetah3d.com/forum/index.php?attachments/17665/), [Arrows.zip](https://www.cheetah3d.com/forum/index.php?attachments/17666/)

## #7 — frank beckmann — 2012-07-24
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-72164>

[[QUOTE:  Herb said: Hope somebody finds this useful. Herb Click to expand... ]]

For sure. Thanks a lot.

Cheers
Frank

## #8 — alcarazr — 2013-03-01
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-77293>

Arc arrow and Cheetah3D 6.2

Hi,

first of all thank you for this very useful scripts. I have been using them for a while and I recently encountered a problem when using arc arrows with Cheetah3D 6.2.

I am attaching an image where I have used several "normal" arrows and one arc arrow that is supposed to have head on one side only (the right side as shown in the image). However, I get this strange behavior. This only happens when reducing the angle below 180 degrees.

Is anyone else getting this behavior?

Thank you very much,

Rodrigo

Attachments: [arc_arrow_error.jpg](https://www.cheetah3d.com/forum/index.php?attachments/19353/)

## #9 — frank beckmann — 2013-03-01
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-77294>

[[QUOTE:  alcarazr said: Is anyone else getting this behavior? Click to expand... ]]
Yes - but from what I can tell it never really worked.
So maybe Herb can have a look into it.

Cheers
Frank

## #10 — tonbut — 2013-09-13
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-81767>

Fix for Arc_Arrow.js

Thank you for these great scripts. I was pulling hair out trying to find a way to create arrows in a manageable way. Downloaded the scripts and got them to work. However Arc_Arrow contains a but which causes one of the tips to go to the wrong place when the angle isn't set to 180 degrees.

Here is the fix:
edit Arc_Arrow.js and replace line 62 with:

var EndTip                = new Vec3D(ArcRadius*Math.cos(Angle), 0, -ArcRadius*Math.sin(Angle));

Cheers, Tony

## #11 — frank beckmann — 2013-09-13
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-81768>

Hi Tony and Welcome!
Thanks for the fix. :icon_thumbup: 

Cheers
Frank

## #12 — alcarazr — 2013-09-13
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-81776>

Thank you for the fix Tony!

Cheers, Rodri

## #13 — Jeanny — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99987>

Question about editing a script

Thanks for the script Herb and thanks for the fix Tony.

I don't know anything about scripts thus I'm not sure how to edit a script.
In order to edit the script do I double click on it in the finder?
(When I do that it takes me to the script on-line)

When you say:

[[QUOTE:  edit Arc_Arrow.js and replace line 62 with: var EndTip = new Vec3D(ArcRadius*Math.cos(Angle), 0, -ArcRadius*Math.sin(Angle)); Click to expand... ]]
I take it that I should only count the lines that have text in them - is that correct?
I attached a screen shot of the first part of the script and I have the number 62 in red inserted by the line I believe I am to change. 
Is that correct?

Do I just delete that line, then type the new code in?

My Best 
Jeanny

Attachments: [Arc Arrow.png](https://www.cheetah3d.com/forum/index.php?attachments/28537/)

## #14 — uncle808us — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99988>

I second the question.. Thanks

## #15 — frank beckmann — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99989>

@ Jeanny. This isn´t line 62 - please use something like TextWrangler which can show line numbers.
@ Jeanny and Bob. Isn´t the polygon script working for you anymore?

Cheers
Frank

Attachments: [line62.jpg](https://www.cheetah3d.com/forum/index.php?attachments/28538/)

## #16 — uncle808us — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99990>

I was trying the polygon script Arrow_D crashes Cheetah every time.

Attachments: [Arrow_D.zip](https://www.cheetah3d.com/forum/index.php?attachments/28539/)

## #17 — frank beckmann — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99991>

This will crash here as well - but have you tried these already? http://www.cheetah3d.com/forum/showpost.php?p=72163&postcount=6

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showpost.php?p=72163&postcount=6

## #18 — Jeanny — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99995>

Hi Frank

[[QUOTE:  @ Jeanny and Bob. Isn´t the polygon script working for you anymore? Click to expand... ]]
Well . . . I read this:

[[QUOTE:  Thank you for these great scripts. I was pulling hair out trying to find a way to create arrows in a manageable way. Downloaded the scripts and got them to work. However Arc_Arrow contains a but whic]]
so I figured I getter fix it before I use it.

So now I tried it without the fix and it seems to work fine for me.
It looks like one controls the degree of Arc_Arrow's curve with the radius and dial_of_shaft  . . . 
thus we don't need to change the angle.

I get a Javascript Error with Arrow 2D

Thanks for the tip to get TextWrangler.
I've got it bookmarked for the future after I finish some of my projects. 
I have to finish my Winter scene before the frost melts. 

My Best
Jeanny

## #19 — uncle808us — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99996>

[[QUOTE:  frank beckmann said: This will crash here as well - but have you tried these already? http://www.cheetah3d.com/forum/showpost.php?p=72163&postcount=6 Cheers Frank Click to expand... ]]

Yes working fine Guess I'll ditch Arrow_D.

## #20 — frank beckmann — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99997>

[[QUOTE:  Jeanny said: Hi Frank I get a Javascript Error with Arrow 2D Click to expand... ]]
This is a Spline script. Did you put it in the right place?

Cheers
Frank

## #21 — Jeanny — 2016-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1456/post-99999>

[[QUOTE:  This is a Spline script. Did you put it in the right place Click to expand... ]]
Oh!  Ha Ha  Nope.  I had it filed under polygon scripts instead of spline scripts.
Thanks again Frank.  What would we do without you?

Some time ago I found the material I used for the arrow on the forum.  I would like to recognize the person who made it but can't find the thread it was in again.  I now try hard to keep track of "who's-who" in the material world but missed some.  If anyone knows I'd love to know.

My Best
Jeanny

Attachments: [Arrow Spline Script.png](https://www.cheetah3d.com/forum/index.php?attachments/28540/)
