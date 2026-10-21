# Moving textures: the actual release

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1210/
- Subforum: script-downloads
- Started by **ToddWR** on 2007-01-11; last post 2016-05-30; 42 posts

## #1 — ToddWR — 2007-01-11
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7665>

Moving textures: the actual release

Hello all,

Everyone has had a chance to see my MatMovie script in the general section. Perhaps some have even wondered why I didn't post it in the scripts section. Wonder no more, here it is now!
thre is more to it now too!
you know you need to define materials with a .mov extention

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}
			
		
		
	

	
		
	
and then add this material to an object. By adding a matMovie object it scans the file for any objects having a .mov material ** this is different from the first one **.
As you may have noticed there is now a Tag script you can add to the object containing the .mov material. This will give you options on which textures to use the material with.

		
	
the All Frames makes the movie step one image at a time, ignoring the frame parameter.
all images reset at frame 0.
objects can have more than one .mov material.

the MatMovie object has this now:

		
	
time has been changed to frame because this is what image is shown.
scan for new materials: look through the objects for any new materials
scan for tags: scan the objects with .mov materials for the MatTag scripts

rescan for materials: does a clean scan looking for both materials and tags

now objects can have one movie for the color and another for its bump map etc.

have fun!
Todd

Attachments: [MatScripts.zip](https://www.cheetah3d.com/forum/index.php?attachments/1585/)

## #2 — fused — 2007-01-12
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7672>

Very nice work Todd, this is an excellent addition to C3D.

Andrew

## #3 — peer — 2007-01-12
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7673>

Hi Todd, thanks for the update. But I'm not getting it to work with a color and transparency material. The color alone works great. For the transparency, do I need to put the transparency map in the colorchannel or the transparency channel? Could you show a screenshot to show where to put the materials/tags/matmovie polygonobj?

Thanks a lot!!!

Regards,

Peter

## #4 — ToddWR — 2007-01-12
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7685>

peer,
the proper way to set this up is:
define all models
create .mov materials
add .mov to models
add MatTag script to object containing .mov materials
select where you want the textures to be used
add the MatMovie obj to the file - select the files needed for each .mov
like so:
		
	
make sure if you are using transparency to set the intensity higher than zero

		
	
as for what textures do in the transparency, I have no idea... but you can put a movie in any of the textures. 

Does this help?
Todd

## #5 — squareitround — 2007-01-13
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7719>

Nice work. :icon_thumbup:

## #6 — ToddWR — 2007-01-14
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7744>

while helping Peer with his problem I notice something not working just right. it happens when a material is set to use 'all frames' and the time goes from 0 to whatever. as long as the time was less than 1 but higher than zero the first image would not change. the updated file fixes this. you can find it in the first post.

hopefully peer won't mind if I show what is possible here
a small test file
just need to make sure each image as an alpha mask and check 'use alpha' in the material. works like a charm

Todd

Links: http://www.geocities.com/todd_w_r/mov/mark2.mov

## #7 — peer — 2007-01-14
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-7752>

Hi Todd! Nice movie indeed! Of course I don't mind you showing it. It shows how great your script is  BTW I did get your mail, but not the applescript. Maybe you could send it? Thanks in advance!

Regards,

Peter

## #8 — hairball600 — 2007-05-22
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-11647>

Hi

Hi, I have no idea how this works, I've done the steps mentioned by todd, and it wont let me open a .mov file for the texture.

## #9 — podperson — 2007-05-23
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-11711>

The idea is:

1) Convert movie to sequence of images.
2) Use first image as the source for the texture.
3) Script swaps in the sequence of images.

(You don't use the MOV except in step 1)

That said, this kind of thing is really best done in a compositing program (such as Final Cut Express/Pro, After Effects, or Shake) and not C3D (note how the guy's foot slides a bit in the test movie, and imagine how hard fixing a problem like this would be).

In a pinch you could do this in QuickTime Pro.

FYI:

"Compositing" in this context means "assembling layers of video using transparency and other blending effects to create a single, seamless video" (in much the same way as Photoshop lets you composite individual frames). There are dedicated tools for doing this kind of thing... doing it in C3D is unnecessarily painful.

## #10 — Switch — 2008-05-01
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-21274>

Jurf

Ok so I got the concept behind this and can see the image sequence change if I do it manully in the frame properties of the matmovie script, but when I play the animation nothing happens it just stays on the first frame.  Am I missing something here.

## #11 — ToddWR — 2008-05-01
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-21275>

Switch,

you need to animate the frame parameter for it to change

## #12 — peer — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-23424>

Hi Todd, I was trying your script on a new sample from got3d.com . Is it possible to setup two image sequences per material (one for color and one for transparency). I know this has come up in earlier posts but there's not a real solution besides the already mentioned adding of an alpha channel per image. This is quite time consuming. I tried to change something in your script, but I'm getting lost ;-) . Adding two materials on one object (the a.mov and b.mov in your example) only renders the last added material and not the first (sounds logical Cheetah wise). It would be nice if you could help me out with this.

Thanks in advance!!

Regards,

Peter

## #13 — ToddWR — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-23443>

Peer,

after you add both materials to the object, add a mat tag to the object... then you can select where the materials are applied. if you were to add another matmov texture, you would need to delete the mat tag and re add it to the object

hope this helps

Todd

## #14 — peer — 2008-07-10
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-23453>

Hi Todd,

I'm still not getting it to work. I'll add the scenefile for you and some images of the sequence (courtesy of got3d.com).

If you could help me, that would be great! I'm working with 4.6.1 by the way.

Regards,

Peter

Attachments: [Matmovtest.zip](https://www.cheetah3d.com/forum/index.php?attachments/5216/)

## #15 — ToddWR — 2008-07-10
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-23467>

Peer,

Let me work on it and I'll see what I can do to get it to work like you want

Todd

## #16 — peer — 2008-07-11
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-23477>

Thanks Todd, but don't let it take all of your time! Maybe Martin has built in support for animated textures in version 5... 

Regards,

Peter

## #17 — brecht — 2008-08-09
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-23992>

Is there a limit to the imagesequence for this script? I'm trying to render a movie with a movietexture of 4mins 18secs. 

I'm also having trouble with the 'all frames' checkbox. It does not seem to override the frame settings and stays on the 1st frame...?

## #18 — Adam Scoffield — 2009-05-08
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-29213>

animating frames property

hi,

sorry for being thick, but how can I keyframe the Frame property in the MovieMat object. It does not appear as a keyframable property in the KeyEditor. I also can't get the movie "to play" in C3D, ie the frames to update.

the script is great, will save me hours of four point tracking and endless hours of fixing.

Dont worry just figured it out somehow. Not quite sure what I did actually but control clicking the record button and selecting record frame did the trick. lovely!
adam

## #19 — Targos — 2009-06-23
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-30309>

Hi, if anyone has got this to work, please could you post an example JAS file? Its potentially really cool but a little too "command-line" think for me.

And if it is working can you see the results in the editor or only when rendering? Thanks

AaronC

## #20 — frank beckmann — 2009-06-23
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-30317>

[[QUOTE:  Targos said: And if it is working can you see the results in the editor or only when rendering? Click to expand... ]]

You will see in right in the 3d editor window.
I attached a zipped folder containing one image sequence and the jas file.
But for some kind of reason it´s not "saveable" - maybe Todd can look into this.
So it´s pretty straight forward:
Open the MatMovie.jas file.
Get the MatMovie script from the tool menu etc. A box will prompt wanting you to find the first pic of the image sequence.
Now with the selected script key frame No 1 (RMB click; record frame.)
Scroll to end of the timeline; go into properties of the script and type in 25 (at "frame") for the end of the image sequence and animation take length.
Again: RMB click; record frame.
Done.
Hit play button.

Cheers
Frank

Attachments: [MovingTextureTut.zip](https://www.cheetah3d.com/forum/index.php?attachments/7107/)

## #21 — Targos — 2009-06-25
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-30353>

Thanks Frank it worked great. But in your scene there was no MatTag.js script on the cube- did you delete it?

Cheers
Aaron

## #22 — frank beckmann — 2009-06-25
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-30355>

[[QUOTE:  Targos said: But in your scene there was no MatTag.js script on the cube- did you delete it? Click to expand... ]]
No - I simply didn´t used it.  

Cheers
Frank

## #23 — bartelsmedia — 2009-11-27
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-35824>

Sorry to dig this out. 

I tried to open the MatMov.js via Tools but it immediately throws a Javascript Error "m.rib is not a function":

http://screencast.com/t/MjJkZDIxYmYt

I am using Cheetah v5.0.3. Any help?

Links: http://screencast.com/t/MjJkZDIxYmYt

## #24 — luke Bocchinelli — 2009-11-27
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-35831>

Yep I got the same problem

Regards

Luke

## #25 — uncle808us — 2009-11-27
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-35835>

Question? bartelsmedia" I am using Cheetah v5.0.3." I have 5.0.1 am I missing some updates?

## #26 — SurfingAlien — 2009-11-27
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-35836>

[[QUOTE:  uncle808us said: Question? bartelsmedia" I am using Cheetah v5.0.3." I have 5.0.1 am I missing some updates? Click to expand... ]]

Hi Uncle... yes, I think so: link

cheers,
A

Links: http://www.cheetah3d.com/download.php

## #27 — domeboy — 2009-11-28
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-35842>

Any chance of an update to this script for Cheetah 5.0 and later? Thanks!

## #28 — Junopsis — 2009-12-03
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-36126>

Hey, I'd also be very grateful if you got a version of this for 5.whatever.  It's very useful~

## #29 — Junopsis — 2009-12-04
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-36170>

Sorry for the double post--
I just got back into 4.6.3 to make an animation using this script; for some reason it always crashes when I try to render and tends to require replacing the script and tags when I open Cheetah.  I've been following the directions and it seems to work until I go render an animation.  Is there something I'm missing?

## #30 — vavido — 2009-12-06
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-36259>

Oh, please! An update for this script would be perfect

## #31 — DarthSidious05 — 2009-12-27
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-36900>

This script may be useful for some special effects animations; I'd like to see it updated for 5.1+ if possible considering the difficulties others have mentioned.

## #32 — korey123 — 2010-08-24
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-46793>

what version cheetah is this script for?

what version cheetah is this script for?

## #33 — frank beckmann — 2010-08-24
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-46795>

[[QUOTE:  korey123 said: what version cheetah is this script for? Click to expand... ]]

Pre 5.0. It´s no longer working with the node based material system.

Cheers
Frank

## #34 — Sebastião — 2010-12-31
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-53719>

Can some people explain all of about this script? 
Thank´s for help...
Bye

## #35 — frank beckmann — 2010-12-31
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-53721>

Do you have an older version of Cheetah3d? Otherwise it won´t work since the node system is integrated.
What it does was playing an image sequence as a texture - like having a TV show on a polygon - so to say.

Cheers
Frank

## #36 — Sebastião — 2010-12-31
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-53722>

Thank´s for response Frank, but i only have 5.5 and 5.6:redface: 
Maybe in version 4.7 i can use the script...
Bye

## #37 — GardenSpider — 2011-02-07
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-55658>

Yes this script does not work with 5.0 or higher.

Please come out with a new update for 5.0 !! 

-- GS

## #38 — DarthSidious05 — 2011-02-10
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-55814>

This would be a great script for animations. I assume the scripting is very complex, with lots of bugs encountered, otherwise we'd probably have it as a feature by now...

## #39 — frank beckmann — 2011-02-10
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-55815>

[[QUOTE:  DarthSidious05 said: This would be a great script for animations. I assume the scripting is very complex, with lots of bugs encountered, otherwise we'd probably have it as a feature by now... Click t]]
No - we don´t have it because the material system introduced with v5 is not accessible via the scripting engine.

Cheers
Frank

## #40 — GardenSpider — 2011-02-10
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-55816>

[[QUOTE:  frank beckmann said: No - we don´t have it because the material system introduced with v5 is not accessible via the scripting engine. Cheers Frank Click to expand... ]]

Darn it I threw my precious .dmg version of 4.1 away. 

-- GS

## #41 — frank beckmann — 2013-07-16
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-80548>

Todd did it again: http://www.cheetah3d.com/forum/showthread.php?p=80541#post80541
Jump over and give some hugs.  

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showthread.php?p=80541#post80541

## #42 — frank beckmann — 2016-05-30
<https://www.cheetah3d.com/forum/index.php?threads/1210/post-101421>

Cheetah3dv7 supports now movie-textures natively: mov, .mp4, .mpg, .h264 on all texture channels.

Cheers
Frank
