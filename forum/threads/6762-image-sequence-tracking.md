# Image Sequence Tracking

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6762/
- Subforum: scripting-general
- Started by **timesplice** on 2011-01-07; last post 2011-01-08; 11 posts

## #1 — timesplice — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54206>

Image Sequence Tracking

Hey everyone!

I have been using Blender for a solution.
However, I still have trouble getting my head around it!
I am new to Cheetah3D and was wondering if I may be able to create a solution  in Cheetah rather than Blender.

The best way to describe it is to show you.
Essentially, I have a camera array that captures a full 360 degree frozen moment.
From these cameras I create 1080 frames as an image sequence with alpha channel.
Why? To produce a smooth temporal ramp.
A scene is created and as the camera changes position, it looks at a new frame in the image sequence.
Have a look here:
http://www.timesplice.com.au/360-degree.html
There are also many other examples on the website.

Thanks n advance to anyone who can help:smile:

Links: http://www.timesplice.com.au/360-degree.html

## #2 — frank beckmann — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54210>

Hi and welcome.
Maybe I´m not getting it - but wouldn´t a highres HDRI background, an animated character and a very high frame-rate not just doing that?

Cheers
Frank

## #3 — timesplice — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54213>

Real world 3D

Thanks all for your responses!

In Blender, the background is a 360 panoramic image wrapped on to a cylinder with a floor plane.

I should point out that I am using real world images here.

Thanks for the script to orbit a target.

The solution I am after, is:
- how do you (if possible) import an image sequence into a material,
- how do you 'update' the material to display the next image as the camera moves around.

So, the default is 1080 frames over a timeline of 1080 frames.
If I temporally ramp the camera to a new position, the material has to display the correct frame of the image sequence.

This was done with scripting in Blender, and I have to thank Beorn in setting up the template.

Does this help explain it all?

Ruffy

## #4 — frank beckmann — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54215>

Hi.
Mapping an image sequence as a material is no longer possible due an update to a node based material system. 
But - I´m not getting why you need an image sequence over one single panorama/probe or cross image.

Cheers
Frank

## #5 — timesplice — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54216>

More!

My immediate application for C3D was to create some cg models of props in my 3D lenticular photography and printing. Example here:
http://www.timesplice.com.au/other/pinups/chloepinup.html

My capture technique allows me to have 'depth over subject' of real people - quite unique!

My next project is another 'pin up' style shot that has a model (person) riding a 'bomb' or other prop.  Here is a series of still shots I m using for inspiration:
http://www.timesplice.com.au/other/mm/pinup2.html

So, I have ben able to successfully create the 'bomb' in C3D.
What I need now is to load the image sequence of the person over the bomb and track the bomb to the different view points of the model.
This is a guide only and I do the comp in AE, but I do need to rotate the bomb the correct amount by key framing the first and last frames.

BTW - I am noticing that C3D does not seem to interpret the alpha channel as expected and does not premultiply it - you get a black halo around the image.

Links: http://www.timesplice.com.au/other/mm/pinup2.html, http://www.timesplice.com.au/other/pinups/chloepinup.html

## #6 — timesplice — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54217>

[[QUOTE:  frank beckmann said: Hi. Mapping an image sequence as a material is no longer possible due an update to a node based material system. But - I´m not getting why you need an image sequence over one sin]]

Frank,

I think the BG is pretty easy, rather it was getting the main subject (target) sequence into the material.
It seems that you have answered that.
Thanks.

## #7 — SurfingAlien — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54219>

[[QUOTE:  timesplice said: BTW - I am noticing that C3D does not seem to interpret the alpha channel as expected and does not premultiply it - you get a black halo around the image. Click to expand... ]]

any chance you forgot to set IoR to 1.0 (default is 1.5) in the material properties...?

## #8 — timesplice — 2011-01-07
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54220>

Thanks again Frank.

I tried the new IoR of 1.0 ,but got the same result.

Attached is a slice from a render with IoR set at 1.0

Attachments: [test.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13550/)

## #9 — SurfingAlien — 2011-01-08
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54221>

[[QUOTE:  timesplice said: Thanks again Frank. I tried the new IoR of 1.0 ,but got the same result. Attached is a slice from a render with IoR set at 1.0 Click to expand... ]]

the image is quite small to tell... are you sure your alpha channel has clean borders? (I know it's a stupid question for a photographer, sorry  )

the only thing that comes to mind is setting specular=black (sometimes gives some "noise" but this doesn't seem the case)

you got just one plane with this RGBA image, right?

cheers,
Alessandro

## #10 — timesplice — 2011-01-08
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54222>

Alessandro
Here is an example of the (clean) key:
http://www.timesplice.com.au/other/pinups/amypinup.html

I did notice the noise, however, since I cannot input an image sequence into C3D there is no longer any real point.

Ruffy

Links: http://www.timesplice.com.au/other/pinups/amypinup.html

## #11 — SurfingAlien — 2011-01-08
<https://www.cheetah3d.com/forum/index.php?threads/6762/post-54226>

[[QUOTE:  timesplice said: Alessandro Here is an example of the (clean) key: http://www.timesplice.com.au/other/pinups/amypinup.html I did notice the noise, however, since I cannot input an image sequence into]]

dear Ruffy,
I see you'll probably go another way this time but I think some of us would be glad to look a bit deeper into this, if you don't mind zipping and posting a simple example file (just the plane+(alpha)mat and your light/rendering settings)
There are some other tricks you can do with the render tag if you're using radiosity, but it's hard to tell without looking into the file...

as for loading image sequence into a material, you should add your voice to this wish list thread: the more will ask, the sooner Martin will look for a solution. It was possible in pre 5.x releases AFAIK, but the new material system has completely changed the way Cheeath handles materials so I don't know if there's something that prevent this addition or it is simply waiting to be added (actually there are houndreds of users with dozens of wishes each... and only one developer :smile: )

the effect is *very* nice, we have to find a way...

cheers,
A

Links: http://www.cheetah3d.com/forum/showthread.php?t=5692
