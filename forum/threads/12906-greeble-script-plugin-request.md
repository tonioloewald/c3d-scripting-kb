# GREEBLE Script Plugin Request

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12906/
- Subforum: script-downloads
- Started by **seegson** on 2018-05-23; last post 2025-06-25; 9 posts

## #1 — seegson — 2018-05-23
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-112069>

GREEBLE Script Plugin Request

original forum post in General

I was writing an Email to Martin asking him if there is a possibility to implement an OpenSource Greeble code into Cheetah but of the OpenSource License restrictions he can't implement it into closed source (I have no idea about these things).

He mentioned that Cheetah has an extensive Javascript API (another "a what ?" thing) but I'm not a programmer, so I ask you hardcore programmers to make this work not for me alone but that everyone here could benefit from it as a free plugin if I can call it that.

it's from another program I had been looking into but it doesn't serve my needs and only for the greeble plugin... no...

On my website there are a few greeble renders with that plugin for you to look at to get some idea what this is all about.

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
			
		
		
	

	
		
	

looking forward to this becoming reality
don't be shy, I know you guys can do this :smile:

Links: https://www.cheetah3d.com/forum/showthread.php?t=12905

## #2 — seegson — 2018-05-23
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-112073>

The source code is OpenSource and can be downloaded here

read more here

Links: https://www.inivis.com/supercoldmilk/ac3dplug/dist/greeble_src.zip, https://www.inivis.com/supercoldmilk/ac3dplug/greeble.html

## #3 — frank beckmann — 2018-05-23
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-112085>

Before requesting you might want to check out existing scripts like PolygonArray.js or Cheetah3d´s instancing system (Particle mesh e.g.) for example.
I know it´s not the same like having a few sliders to play with ("Uh is it good looking? No wait I can slide a bit more and Uggh - too far and again and so forth")- but I guess it´s just a toy and interesting for just a limited time.
But I´m not holding anyone back of course. 

		
	
Cheers
Frank

## #4 — seegson — 2018-05-23
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-112086>

[[QUOTE:  frank beckmann said: Before requesting you might want to check out existing scripts like PolygonArray.js or Cheetah3d´s instancing system (Particle mesh e.g.) for example. I know it´s not the same li]]

you mean kit-bashing with particles ?
can you upload that scene to have a look ?
does it support multiple home-brew greebles to use ?

could be a solution

## #5 — seegson — 2018-05-23
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-112092>

[[QUOTE:  frank beckmann said: Before requesting you might want to check out existing scripts like PolygonArray.js or Cheetah3d´s instancing system (Particle mesh e.g.) for example. I know it´s not the same li]]

not sure why I get this error (in fact most scripts don't work)

		
	

so, that's a problem for me

you see without nitpicking I demo Cheetah to make a purchase decision not to troll you

:smile:

## #6 — frank beckmann — 2018-05-23
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-112095>

[[QUOTE:  seegson said: not sure why I get this error (in fact most scripts don't work) Click to expand... ]]
I doubt that seriously.

I sure wouldn´t have recommend this script if it doesn´t work anymore. Where did you put it in?

## #7 — 3DSimulant — 2025-06-21
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-129109>

…but the idea of this greebles thing is nice for Sci-fi scenes…
If I ever learn to script in Cheetah (finally), I would try to create things like this!

## #8 — Helmut — 2025-06-25
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-129123>

*    I agree with Frank Beckmann.  The instancing tools available in C3D seem adequate for the topologies you have included in your post #7.
*    I have added two of my own samples which use particle meshes and simple clusters (rings & arrays) of substructures extensively.  The "Borg Cube" is just a 4^3 box which is populated with smaller elements.  In C3D this gives the advantage that I can "construct" (and deconstruct) bits of a space ship whilst moving at Warp 9.
*    Note that I have no idea about greebles / nurnies.

## #9 — Helmut — 2025-06-25
<https://www.cheetah3d.com/forum/index.php?threads/12906/post-129124>

*    A simple example:
*    In this medieval townscape I use plain boxes (plus roofs) which are filled with elements of fenestration and timber framing.  Each box is just the basis of two particle meshes, ground floor vs upper floors.  
*    Of course, these are salient - and not re-entrant - corners, as you use in your sample #7.  The deployment of particle meshes / instances remains identical.
