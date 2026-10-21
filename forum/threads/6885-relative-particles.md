# relative particles

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6885/
- Subforum: scripting-general
- Started by **filip c** on 2011-02-09; last post 2014-02-13; 7 posts

## #1 — filip c — 2011-02-09
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-55767>

relative particles

Hi,

I hope I'm not too unrealistic here (probably I am). 
I'm having some idea's for a new particle script, but since I have no mentionable scripting skills so I hope to find some help here ;-)

I've allways been fascinated by mathematical patterns in nature (http://www.youtube.com/watch?v=kkGeOWYOFoA). 
Many of them can already be recreated with the particle system and modifiers.

One very interesting addition in my opinion is a kind of relative particle array, which would (if I tought things through) allow users to create realy interesting arrays of particles... (spirals, curls, ...)

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
			
		
		
	

	
		
	

		
	

		
	

		
	

		
	

		
	

How this might work:
The user defines a position, scale and rotation (x,y,z) A and B of an object.

Now the script creates a (user defined) number of particles like so:
 a first particle C that has the same relative relation to B as B has to A
 next a particle D that has the same relative relation to C as C has to B
and so on... (see image)
In this case the relation is linear (factor 1).
To realy have the best effect, we could allow the user to multiply the relative position, scale and rotation (x,y,z) by a factor (0,618 for golden ratio (evt.default)) ...

I know I'm a poor communicator, but I hope this makes sence :redface:

Thanks in advance,
Filip

Attachments: [relativeparticles.zip](https://www.cheetah3d.com/forum/index.php?attachments/13849/), [Schermafbeelding 2011-02-09 om 14.48.27.png](https://www.cheetah3d.com/forum/index.php?attachments/13850/)

Links: http://www.youtube.com/watch?v=kkGeOWYOFoA

## #2 — filip c — 2011-02-09
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-55777>

Another tought regarding my former post (presumably even more unrealistic )

Say A is expanded with B1, B2 , B3... 
and each B (1,2,3,...) gets the same number of C's (relatively positioned scaled and rotated (times user-defined factor))
and so on...

this script could even create tree-like structures...

like here:
http://www.youtube.com/watch?v=7HeqoBoF-vQ&feature=related

		
	

Just some crazy ideas :tongue:

Cheers,
Filip

Links: http://www.youtube.com/watch?v=7HeqoBoF-vQ&feature=related

## #3 — tg_jp — 2011-02-10
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-55792>

hi

I think you meant that you want an object made by fractal calculation. I wil try it with custom Particle Script in near future for some patterns. very interested in.

actually we have another cool app for it, so please check it.

http://structuresynth.sourceforge.net/

* you can define how calculation for recursive child object ( particle ).
* GPL
* have build-in renderer with DOF / AO. 
* can export as OBJ file.

regards.

tg_jp, Hiroto.

Links: http://structuresynth.sourceforge.net/

## #4 — filip c — 2011-02-10
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-55793>

[[QUOTE:  tg_jp said: hi I think you meant that you want an object made by fractal calculation. I wil try it with custom Particle Script in near future for some patterns. very interested in. actually we have a]]

Hi Hiroto,

Thank you very much!
I'll look into this 

Filip

## #5 — filip c — 2011-02-15
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-55994>

Here is a first test script...
http://www.cheetah3d.com/forum/showthread.php?t=6905

Filip

Links: http://www.cheetah3d.com/forum/showthread.php?t=6905

## #6 — WowzaWorks — 2014-02-13
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-85364>

L-systems

You might look into "The Algorithmic Beauty of Plants" , I have used and still have many obj's from two programs for the pc built on the l-systems "language". 

I have been able to get about a third of the scripts to work, and this one looks like it has some real usefulness and fun potential, hopefully....
 Thank you.

## #7 — WowzaWorks — 2014-02-13
<https://www.cheetah3d.com/forum/index.php?threads/6885/post-85365>

L-systems more

http://en.wikipedia.org/wiki/L-system

http://algorithmicbotany.org/papers/abop/abop-ch1.pdf

Links: http://algorithmicbotany.org/papers/abop/abop-ch1.pdf, http://en.wikipedia.org/wiki/L-system
