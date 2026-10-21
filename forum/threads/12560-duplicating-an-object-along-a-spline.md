# Duplicating an object along a spline

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12560/
- Subforum: scripting-general
- Started by **Joel Ruiz** on 2017-08-06; last post 2017-08-08; 14 posts

## #1 — Joel Ruiz — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108540>

Duplicating an object along a spline

Is there a way to duplicate an object along a spline, or along the surface of another object?

what I want to do is duplicate the yellow spheres along the cylinder surface:

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

## #2 — ZooHead — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108542>

Welcome to the forum. 

The Particle Spline will do what you want. 
​

Attachments: [Particle Spline.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31400/)

## #3 — frank beckmann — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108544>

Another efficient option is to use the ring-modifier:
Or the Chain-creator which has tons of options - not so relevant for balls but chains as you might guess.

Cheers
Frank

Attachments: [RingOfBalls.png](https://www.cheetah3d.com/forum/index.php?attachments/31402/)

## #4 — Joel Ruiz — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108547>

Thanks so much for you replies and welcoming me : )

I ended up using the Ring tool. Question, is it possible to then animate each ball separately? they are supposed to be lights, so I want to animate a glow or something.

## #5 — Joel Ruiz — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108548>

A long time ago I used to use Electric Image Animation System (anyone heard of that?) and I have to say Cheetah is really awesome. I really enjoyed EIAS back then (last version I used was EIAS 7), so I decided to give it a go with Cheetah. I still don't try to animate anything with it, this is the first thing I do, and I find it super easy so far. And since for the moment all I want to do is animate logos, I'm very happy.

## #6 — Joel Ruiz — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108549>

Besides asking if it's possible to animate each ball of a ring individually, I have another question. Is it possible to use a spline to cut thru an object? what I want to do is cut the gray bars that you see behind the MANGO letters so they fit exactly in the round shape of the cylinder.

This is because I want to animate the bars flying and falling into their position, but I find it cheesy if they have to go thru the cylinder, so I want them to fit perfectly.

English is not my first language, I hope it makes sense.

## #7 — frank beckmann — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108550>

If you want holes for the bars you can double them - merge them and use a Boolean subtraction to make holes in the red ring - if that´s what you´re asking for.
You can compress the file (zipped) and upload it in the forum so we can be more precise if you want.

Cheers
Frank

## #8 — Joel Ruiz — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108551>

Thanks for the reply, I don't want to cut the red tube, I want to cut the bars so they fit in the tube.

## #9 — frank beckmann — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108554>

Boolean operation as well:

Cheers
FRank

Attachments: [CutBars.png](https://www.cheetah3d.com/forum/index.php?attachments/31406/)

## #10 — Joel Ruiz — 2017-08-06
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108555>

Thanks! : )

## #11 — Joel Ruiz — 2017-08-07
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108574>

Thanks to everyone, I still have a question about the ring, is it possible to animate each sphere separately? how do I break the ring into the separate objects?

I just realized I opened this thread in the scripting part of the forum, I apologize for that, is there a way to move this thread to the proper section?

Latest render:

## #12 — frank beckmann — 2017-08-07
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108577>

[[QUOTE:  Joel Ruiz said: I just realized I opened this thread in the scripting part of the forum, I apologize for that, is there a way to move this thread to the proper section? Click to expand... ]]
No problem - we find questions wherever they arise.  

[[QUOTE:  Joel Ruiz said: Thanks to everyone, I still have a question about the ring, is it possible to animate each sphere separately? how do I break the ring into the separate objects? Click to expand... ]]
If you want separate objects you need to make the hierarchy "editable" in first place. Then you have to group select one sphere (while in polygon mode) and go for the split command to make it an individual mesh. Then go for the next sphere.
What kind of animation do you have in mind? Maybe you don´t need separate objects.

Cheers
Frank

## #13 — Jeanny — 2017-08-08
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108597>

Hey Joel

Would it be possible to somehow incorporate the technique used to animate the particles 
in the “Particle Marty “ sample document into animating the object you want to animate in your project? 

“Particle Marty can be found in the Help > Cheetah 3D samples > Particle > Particle Marty.  
Please see attachment 1

Looks like changes in the Particle Tag’s Position, Rotation and Scale parameter variations were recorded.  
Please see attachment 2 & 3

You can get a larger view of the Particle Tag Parameters  by viewing them in the sample document.  
I had to reduce the pictures of the attachments to stay within the upload limitations.

My Best
Jeanny

Attachments: [1.png](https://www.cheetah3d.com/forum/index.php?attachments/31413/), [2.png](https://www.cheetah3d.com/forum/index.php?attachments/31414/), [3.png](https://www.cheetah3d.com/forum/index.php?attachments/31415/)

## #14 — Joel Ruiz — 2017-08-08
<https://www.cheetah3d.com/forum/index.php?threads/12560/post-108604>

Thank you, I'm going to check out that file!
