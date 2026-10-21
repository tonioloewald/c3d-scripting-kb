# Newbie in need of help!

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9095/
- Subforum: scripting-general
- Started by **Corrose** on 2012-12-12; last post 2012-12-12; 8 posts

## #1 — Corrose — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75325>

Newbie in need of help!

I'm not sure if anyone can help me or not but it's worth a try. I have never had any formal training in 3D. I started off a few years back when someone gave me a copy of Strata, I kinda self taught the basics, and just picked up bits along the way. A lot of the technical bits of 3D I get, and others I'm still trying to learn.

Over the last year or so I have successfully modeled some miniatures in strata and cheetah and have had some great success with having them printed.

If this makes sense, I would essentially build up shapes to create my objects. I never had a concern about using booleans, combining my polygons or anything, I just built the files and submitted .dae files to shapeways and they came back perfect.

I have been exploring 3D printers lately, and I sent one of these same files off to have them do a test print, to see if one of these printers could print the level of detail Im needing. The text print came back with a lot of collapsed parts, and they told me it was basically because "the separate components were not bonded". They explained that this printer basically needed a hollow shape, no pieces inside.

I opened my model in cheetah and started removing facets on the outer walls and sure enough, there are random bits inside the model, as a result of shapes not being joined/welded or whichever the term is.

This is probably a dumb question, but is there a technique or tool that basically does something like a surface weld, where it gets rid of all of the overlapping pieces on the inside.

Again pardon my likely incorrect terminology, I'm learning as I go.

Here is a screenshot of part of the outer wall removed, revealing pieces that I do not need and are supposedly causing the errors on the 3D print.

This issue is new to me, because this exact model prints fine at shapeways.

The red outline is the section I removed to show what I am talking about.

Additional image.

I hid all of the rest of the model to help illustrate the issue.

This attached image is basically framework of the design, it's essentially 2 horseshoe type shapes butted up against one another.
The circled areas are where you can see they overlap. Where those overlaps are, is what is creating the shapes inside. Basically Im trying to find out how I can just combine all of the shapes at once dumping off that intersecting data.

Links: http://imageshack.us/photo/my-images/525/screenshot20121212at122.jpg/, http://imageshack.us/photo/my-images/713/screenshot20121212at114.jpg/

## #2 — frank beckmann — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75326>

[[QUOTE:  Corrose said: ...but is there a technique or tool that basically does something like a surface weld...? Click to expand... ]]
When you can "group select" these inner waste polygons you could group-select the outer shell - inverse the selection and delete to remove the waste.
If they´re somewhere connected to to main mesh you have to think about a different approach in terms of modeling.
So let´s first see if my suggestion work here before upset the apple cart.  

Cheers
Frank

PS: regarding your second additional image: select all those points in that certain area and hit backspace to delete - then use "bridge tool" to close the gaps.
PPS: there are better ways to model this without any Boolean operation!

## #3 — Corrose — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75327>

So basically select each facet or piece with the selection tool thats on the visible outside and then do an inverse and delete?

## #4 — frank beckmann — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75328>

[[QUOTE:  Corrose said: So basically select each facet or piece with the selection tool thats on the visible outside and then do an inverse and delete? Click to expand... ]]
Basically select one polygon from the hull then call for "Select Group" to select all welded polygons at once - then inverse selection and delete.

Cheers
Frank

Attachments: [SelectGroup.png](https://www.cheetah3d.com/forum/index.php?attachments/18698/)

## #5 — Corrose — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75331>

Wow, that helps a lot, thanks!
One more question if I may, on my second image, you see how the long wall on my image is not one face like yours, it's several, how can I combine them into one solid shape?

Like in this example, I want to combine these 2 faces (I hope Im using the correct word)

Links: http://imageshack.us/photo/my-images/41/screenshot20121212at226.jpg/

## #6 — frank beckmann — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75333>

Is there any other view available? At least right now I can´t read it properly.

Cheers
Frank

## #7 — Corrose — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75334>

Thanks for the help thus far Frank.
I hope this image helps

Basically this plane I have circled in green is made up of dozens and dozens of facets, it's just a plain flat surface and I'd like to be able to simplify it and merge all of those tiny pieces into one singular piece:

Links: http://imageshack.us/photo/my-images/829/screenshot20121212at333.jpg/

## #8 — frank beckmann — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9095/post-75337>

Still not sure if I read it correctly.
Might the animgif will help you out.
Let me know how it´s working.  

Cheers
Frank

Attachments: [FrameWork.gif](https://www.cheetah3d.com/forum/index.php?attachments/18702/)
