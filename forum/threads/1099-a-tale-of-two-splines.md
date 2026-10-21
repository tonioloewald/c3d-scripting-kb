# a tale of two splines

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1099/
- Subforum: script-downloads
- Started by **ToddWR** on 2006-11-29; last post 2006-12-15; 22 posts

## #1 — ToddWR — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6863>

a tale of two splines

from browsing the various forums, I see a user "plant" asking a question and I see a need to fill. Now I submit to the forum the answer to plant's question.

Between Splines.js
http://www.geocities.com/todd_w_r/mov/bs.zip

place it in the tools folder and restart cheetah
create two splines
select "between splines.js" from the tools menu
click on the first spline, click select
click on the second spline, click ok
 a new polygon object is created to fill the space between the splines

ps. added a link and also included the file here so there should be no trouble getting it

pps. look at my message later

?? a bug??  
martin was a spline is moved the lines are drawn to the originals even though I am calling modCore on the spline object. A work around is to move the splines where they need to be and then burn transform them both before using this script.

Todd

Links: http://www.geocities.com/todd_w_r/mov/bs.zip

## #2 — Martin — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6866>

Hi,
great script. I'm sure many will love this.:smile: 

But you forgot to handle the object transformations. The points in  a spline core are always given according to its object coordinate system. But in your case you are intrested in world coordinates to build the mesh.

To get the object to world transformation matrix of a object use the "obj2WorldMatrix()" function. Then you just have to multiply the controll points by the obj2world matrix. That will solve your problem.

Bye,
Martin

## #3 — ToddWR — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6870>

Opps...

installed and corrected

here is the new one

Todd

p.s.  made one last minute mod... the newly created object's center is now between the two splines center's.  makes for easier moving and rotation

Attachments: [bs.zip](https://www.cheetah3d.com/forum/index.php?attachments/1419/)

## #4 — frank beckmann — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6871>

That´s truly fantastic, Todd.

Hi Todd.
Thank you very much! I love it. And now for the power junkies; do  you think there could be more than two splines for such a tool script? Gimme more.
Thanx again.
Franx

## #5 — plant — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6872>

Thanks to Todd and Frank this works beautifully, so useful.  Adding even more splines would be really good but I wouldnt want to be greedy.
Thanks again

## #6 — fused — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6875>

Excellent script Todd thanks for sharing it. 

Andrew

P.S. Thanks to everyone that contributes scripts they are all helpful.

## #7 — tg_jp — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6878>

wow, great script!! :smile: 

tg_jp, Hiroto.

## #8 — uncle808us — 2006-11-29
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6879>

Thanks Todd

I love the way you did that, this is a great tool. Thank you again. And I agree thanks to all who make scripts.

## #9 — ToddWR — 2006-11-30
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6886>

After pondering a bit... 
set up a spline, then add other splines as children to the first spline

	
	


```
spline1
   spline2
   spline3
   spline4
```


select between splines+ from the menu
make sure that spline1 is selected
click OK

if the object that is created is inside out... click Flip and then OK

have fun
Todd

ps 
   martin
 by any chance is there a way to assign a hot ket to scripts?  this would be a very cool feature

Attachments: [bs+.zip](https://www.cheetah3d.com/forum/index.php?attachments/1422/)

## #10 — frank beckmann — 2006-11-30
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6888>

Brilliant, Todd!

Hi Todd.

Thank you very much. Hopefully the vehiclemakers of you will improve their body sheets now.

But now for the limitations with using complex splines: fortunately  the script ignore the count of path elements and lines a spline contains. This is a great improvement, for all you were trying patching splines. Some apps will just cover splines with exact the same count of nodes - so forget about this.

The other thing goes to closed splines. In most of the 2d svg editors you can´t tell a complex path (generated with star tools for example) where the start or end is. But for patching the start/end points have to be in the most same direction;  north, south etc. Otherwise you will get a winding with your mesh. Drawing such splines  within Cheetah3d can be managed, so be aware to begin your splines at the same direction.

With kindest regards
Frank

Dropforged bit:

Attachments: [SpaxBit.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1423/)

## #11 — ToddWR — 2006-11-30
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6896>

frank and anyone interested,

how should I handle sub paths of splines? maybe treat them as children... so one spline then could create the object?  it wouldn't take much to make it so. I'll wait till I hear more about it.

Todd

## #12 — frank beckmann — 2006-11-30
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6899>

Hi Todd.
I´m quiet happy with your script. I have no idea to patch splines including subpaths (combined paths). Patching from "A" to "O" won´t work so far, but I´m not sure about it´s possibility or usefullness. So let us hear more comments.
Thanks again for all your effort on this.

Frank

## #13 — Eureka! — 2006-11-30
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6902>

Thank you

Hi,
Thank you very very much:icon_thumbup:! It is great to have another script to download. This is one of the best Cheetah scripts there are (I liked the ripple script you made better). All of your scripts are very high quality and extremely usefull. How do you guy's write scripts? Is there a bulit-in script writer in Cheetah were you can type in commands or do you use xCode? 
You and Hiroto add a lot to the fourm with your wonderfull scripts:icon_thumbup:.

Thank you,
Greg

## #14 — luke Bocchinelli — 2006-12-01
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-6903>

wow...

[[QUOTE:  ToddWR said: frank and anyone interested, how should I handle sub paths of splines? maybe treat them as children... so one spline then could create the object? it wouldn't take much to make it so. I']]

Dear Todd

What a beakthrough...man you are a bit of a wizzkid...I have to say that your script is a great addition to  making C3D a leader in it's field

You are (underscore) a star.

many many thanks

Luke

## #15 — t0m_smyk0wski — 2006-12-12
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7157>

Hi All,

after playing a bit with c3d I am trying to use those awesome scripts that some of you wrote.

BUT... I might be to stupid to do so as m y C3D app crashes if I  try to use this promising script "between splines+".
 with C3D 3.5 i create a circle and a rect spline... than I go into tools/scripts/between splines+ 
 If I now select the parent spline, how can I click "okay" for the script? If I select the spline I have the splines properties in the right hand bar... 
 if I select the script, and press okay C3D will crash...

be patient, I'm new to scripts and dont know exactly how to use them... sry

-t0m

Attachments: [Bild 1.png](https://www.cheetah3d.com/forum/index.php?attachments/1462/)

## #16 — ToddWR — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7163>

t0m,

move the between splines script from the polygon folder to the tools folder and then select it from the tools menu.   select the parent spline and then you will be able to click ok and create a new object.

Todd

## #17 — t0m_smyk0wski — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7174>

todd,

thanks! that was easier than expected 

cheers,
-t0m

## #18 — t0m_smyk0wski — 2006-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7201>

Todd, Frank,
 
I really like this script but one qestion remains - for me at least:
how do I (how did you, Frank) make your model "solid"?
I do get just a surface, e.g. the rect-to-circle-object is a tube instead of a solid cylinder.
Another thing that I realized is that the resulting object gets a twist... I have to rotate one of splines in order to get a resulting object that looks like it was extruded straightly - hard to explain, I might post images later.
 
Again: thanks for the grat script and the help!
 
-t0m

## #19 — ToddWR — 2006-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7209>

t0m,

use fill hole to close off the tube. in order to have no twists in the new object the starting point of each of the splines needs to be aligned, as you found out. since I have no control how the splines are created, it is up to you to make sure all the starting points are where they should be.

Todd

## #20 — DaVinci — 2006-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7210>

[[QUOTE:  ToddWR said: t0m, use fill hole to close off the tube. in order to have no twists in the new object the starting point of each of the splines needs to be aligned, as you found out. since I have no co]]
Does anybody know how to change the starting point of an already existing spline in Adobe Illustrator or let's say Intaglio?

## #21 — frank beckmann — 2006-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7211>

Edit: Ok. I tested it with Intaglio and it´s easier than expected: Two clicks. First with the scissor tool at your new starting point and one for closing the path. That´s it. I know it´s brilliant but good night.
Frank

## #22 — DaVinci — 2006-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1099/post-7212>

[[QUOTE:  frank beckmann said: Edit: Ok. I tested it with Intaglio and it´s easier than expected: Two clicks. First with the scissor tool at your new starting point and one for closing the path. That´s it. I k]]
Ah, okay. I'll try that, thanks!
