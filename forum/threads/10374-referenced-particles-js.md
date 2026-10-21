# Referenced Particles.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10374/
- Subforum: script-downloads
- Started by **tg_jp** on 2014-04-20; last post 2016-06-17; 13 posts

## #1 — tg_jp — 2014-04-20
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-87088>

Referenced Particles.js

Hello

it's a particle script to create particle(s) with specified position / rotation / scale of object(s).

update: 20160217 - rotation bug fixed.

update: 20170723 - add some options.

http://www.tres-graficos.jp/blog/files/article.php?id=105

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
			
		
		
	

	
		
	

Best

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=105

## #2 — Martin — 2014-04-28
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-87238>

Hi Hiroto,
Wow, that is a pretty cool script for placing particles individually. Thanks for creating it.:smile: :smile:

Bye
Martin

## #3 — Shift Studio — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95187>

Hi Hiroto

Nice script, thanks for creating and sharing!

I'm wondering if it may be possible to add a parameter that allows you to rotate the individual referenced particles by rotating the 'reference object'?

Does that make sense?

Thanks in advance.
--Shift Studio.

## #4 — frank beckmann — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95188>

I think it´s already possible - but you have click the update button when changing anything - no?

Cheers
Frank

## #5 — Shift Studio — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95189>

[[QUOTE:  frank beckmann said: I think it´s already possible - but you have click the update button when changing anything - no? Cheers Frank Click to expand... ]]

You are right - Thanks Frank!

Now, I wonder if a 'live' update would be possible to save guesswork?

-- Shift Studio.

## #6 — frank beckmann — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95190>

[[QUOTE:  Shift Studio said: Now, I wonder if a 'live' update would be possible to save guesswork? -- Shift Studio. Click to expand... ]]

Or try more explicit referencing objects:

		
	
Cheers
Frank

## #7 — Shift Studio — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95192>

pyramids vs spheres - right? so you can see what is going to point where.
Maybe a little x,y,z set of arrows would be even better.

I will try that.

--shift studio.

## #8 — frank beckmann — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95193>

[[QUOTE:  Shift Studio said: Maybe a little x,y,z set of arrows would be even better. I will try that. --shift studio. Click to expand... ]]
Yes.
There´s an 2d-arrow script for making spline arrows:

		
	
Cheers
Frank

## #9 — Shift Studio — 2015-05-19
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-95194>

thanks Frank!

I will do that. 

Still, a 'live' update would be nice - I suppose there are reasons that I didn't consider why it is done with a manual update though.

--shift studio.

## #10 — podperson — 2015-08-24
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-97456>

That's brilliant. (I do wish C3D would let us create instances natively though — hint Martin.)

## #11 — Shift Studio — 2016-06-17
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-101749>

lights don't travel with the referenced objects

There is an issue for me that when you reference an object which contains a light, the particles don't have the light with them.

Easier to see in my screen shots, and attached file.

This was tested using Cheetah3d v7.0b14.

Hopefully there a fix can be made at some point.
--shift studio.

Attachments: [orig-box-and-light.jpg](https://www.cheetah3d.com/forum/index.php?attachments/29175/), [referenced-box-and-light.jpg](https://www.cheetah3d.com/forum/index.php?attachments/29176/), [RefParticles light issue.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/29178/)

## #12 — frank beckmann — 2016-06-17
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-101750>

I thought lights&particles never worked together and might never will. Proof: put a light source into a Particle Array.

Cheers
Frank

## #13 — Shift Studio — 2016-06-17
<https://www.cheetah3d.com/forum/index.php?threads/10374/post-101751>

[[QUOTE:  frank beckmann said: I thought lights&particles never worked together and might never will. Proof: put a light source into a Particle Array. Cheers Frank Click to expand... ]]

Yes, I suppose I knew that, but forgot. 
I spent a lot of time trying to figure this one out. It didn't help that my referenced object was in another file and being accessed by a smart folder.
And that there was glass involved...

Anyways, seems geometry lights with emissive materials work as expected.

Thanks for clearing it up.
--shift studio.
