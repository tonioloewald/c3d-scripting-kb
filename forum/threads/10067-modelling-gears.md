# Modelling Gears

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10067/
- Subforum: scripting-general
- Started by **ml1986** on 2014-01-04; last post 2014-01-16; 11 posts

## #1 — ml1986 — 2014-01-04
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84195>

Modelling Gears

Hi guys, 

I was wondering if anyone could advise me in this. I am looking to create a set of gears and I am struggling as to how to go about it. The teeth need to be the same dimensions on both gears for the interlocking and rotating to be accurate. 

Is it best to create a tube and then attach the teeth seperately, or alternatively is there a way of using the array or ring feature on one teeth and produce a full circle of teeth. (I've played around with the ring and array feature but couldn't find a way to align the teeth properly around a circle). 

Any help would be great.

## #2 — frank beckmann — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84196>

Hi and Welcome!
There´s a parametric "Cog" spline object which will fit fine into an extrude creator. Easy to animate and adjust in the f-Curve editor.
Let´s see if the attached file gets you started:

Cheers
Frank

PS: I guess we´re in the scripting forum accidentally.

Attachments: [GearsOfWar.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/21832/), [GearsOfWar.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/21833/)

## #3 — ZooHead — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84197>

I agree with Frank, the cog spline is a great way to start.
If you are doing high precision gears Illustrator may be needed, and a lot of math! Gear ratio calculations are painful.

I made this with the Cog Spline and Extrude:
​

Attachments: [Gears.jpg](https://www.cheetah3d.com/forum/index.php?attachments/21836/)

## #4 — ml1986 — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84215>

Hi guys,

Thanks for the quick responses it seems I have my questions answered. I am just curious though whether it is in fact possible in Cheetah to create one tooth and then multiplying it by the amount of teeth you need and it and then aligning them around a circle. 

Thanks

PS Sorry I didn't realise I was in the wrong forum section. :frown:

## #5 — frank beckmann — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84217>

[[QUOTE:  ml1986 said: I am just curious though whether it is in fact possible in Cheetah to create one tooth and then multiplying it by the amount of teeth you need and it and then aligning them around a circ]]
The easiest way is the Ring-modifier then:

Cheers
Frank

Attachments: [GearTeethManually.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/21841/)

## #6 — ZooHead — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84223>

I've continued this thread over in the General area.​

Links: http://www.cheetah3d.com/forum/showthread.php?t=10072

## #7 — frank beckmann — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84226>

[[QUOTE:  ZooHead said: If you are doing high precision gears Illustrator may be needed, and a lot of math! Gear ratio calculations are painful. Click to expand... ]]
I think the "Cog" spline objects offers plenty of options right out of the box already - not talking of combining with circle splines/boolean creators and fun-modifiers etc:

Cheers
Frank

Attachments: [Gears Of War.jpg](https://www.cheetah3d.com/forum/index.php?attachments/21846/)

## #8 — ZooHead — 2014-01-05
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84230>

That's why I like Cheetah so much, lots of choices, and each one brings more to the imagination.
​

## #9 — ml1986 — 2014-01-16
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84529>

Hi Guys,

Thanks for the great help it was truly amazing what you can do with this software. I've come up against another stumbling block though when it comes to modelling a gear with a certain amount of teeth. Once you have calculated the dimensions of a tooth, is there a way draw the lines with a set length or angle etc?

## #10 — frank beckmann — 2014-01-16
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84530>

Not sure - I´d think there are all parameters included - otherwise add the cog-spline to an extrude creator and make good use of the "ruler-tool":

Cheers
Frank

Attachments: [CogTeethAngle.png](https://www.cheetah3d.com/forum/index.php?attachments/21967/)

## #11 — ml1986 — 2014-01-16
<https://www.cheetah3d.com/forum/index.php?threads/10067/post-84532>

Hi Frank,

Thanks for the quick reply. I've actually decided to create a triangle and protrude it to make the tooth and then attach the object on a tube to create the gear. This way would make the gear more ideal compared to the cog feature since it doesn't leave any gaps between the teeth. Hopefully I can successfully create a gear but I doubt whether it would be accurate.

I use the ruler tool a lot but I wanted to know how to amend the dimensions accurately once you have drawn a polygon.
