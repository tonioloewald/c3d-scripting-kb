# Script request: PowerLoft

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6388/
- Subforum: scripting-general
- Started by **sebastian** on 2010-10-20; last post 2013-06-10; 15 posts

## #1 — sebastian — 2010-10-20
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49178>

Script request: PowerLoft

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
			
		
		
	

	
		
	

Hello, fellow Cheets, :wink:
 
I was wondering, if any of you talented scripting wizards could help me out, or tell me if this would be a scriptable solution:

We all know and love Todds Loft.js (1) – you can even add more control to the surface by adding more splines and making irregular shapes (2) – you can even subD the script folder, since it's an poly-script to add smoothing (3) – So my question is this: Is it possible, to modify the Loft.js script so that you can achieve, what was done in (3) with one or more spline controls(4a)? 
I know, Hiroto has written a taper-sweep.js to do something similar, but that gives not quite the result i was expecting (well.. it's a sweep, not a loft, neither a patch – d'oh)

In a nutshell: I was wondering, if anyone would tackle this or at least tell if it's possible to achieve something like (5). If so – Cheetah would have another powerful feature – Patch modeling :tongue:

## #2 — frank beckmann — 2010-10-20
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49192>

Guess what you´re looking for is called "Gordon surfacing".
I think maintaining a quad poly flow is the tricky part without having NURBS here. But I´m curious too if this is possible via scripting.  

Cheers
Frank

Links: http://www.cs.mtu.edu/~shene/PUBLICATIONS/2004/ia.pdf

## #3 — sebastian — 2010-10-20
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49202>

I think yo're right, Frank – It could be tricky to remain quad. I assume Martin already had something like this in mind, when he added the Polyplane creator. But the geometry output is just unusable for subD

## #4 — tg_jp — 2010-10-21
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49262>

hello

[[QUOTE:  sebastian said: We all know and love Hirotos Loft.js (1) – you can even add more control to the surface by adding more splines and making irregular shapes (2) – you can even subD the script folder, s]]

actually, Loft.js is written by Todd. Not me. He has many contribution for Cheetah3D's scripting. 

I think it's available via scripting.

regards.

tg_jp, Hiroto.

## #5 — sebastian — 2010-10-21
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49268>

Sorry for mistaking the credits, Hiroto... You contributed so many useful scripts – It could as well be yours... 

So you think, it could be done?

## #6 — ToddWR — 2010-10-21
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49272>

looking into it....   hang on

## #7 — frank beckmann — 2010-10-21
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49274>

[[QUOTE:  ToddWR said: looking into it.... hang on Click to expand... ]]

Heya Todd - long time no speak.   Great to have you around. :icon_thumbup: 
I´m just too curious what you´ll come up with.

Cheers
Frank

## #8 — sebastian — 2010-10-21
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49275>

[[QUOTE:  ToddWR said: looking into it.... hang on Click to expand... ]]

Really cool, Todd! Thanks!   :icon_thumbup::icon_thumbup::icon_thumbup:

Btw. thanks for the Loft script in the first place – it's been really useful!

## #9 — ToddWR — 2010-10-23
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49437>

how do you see yourself using this kind of script?  in researching this question it appears to be used as a patching function. I would like to know how this would best suit the users of the script

Todd

## #10 — frank beckmann — 2010-10-23
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49438>

[[QUOTE:  ToddWR said: how do you see yourself using this kind of script? in researching this question it appears to be used as a patching function. I would like to know how this would best suit the users of t]]
Well - whatever it takes.   Do you mean how to use it as script? In a NURBS modeler you start the tool and it asks for the first to splines - then click "ok"
 - before it asks for the other two splines accordingly. Hit "ok" again and the magic takes place. But maybe I´m not understanding your question.

Cheers
Frank

## #11 — SurfingAlien — 2010-10-23
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49440>

[[QUOTE:  frank beckmann said: Well - whatever it takes. Do you mean how to use it as script? In a NURBS modeler you start the tool and it asks for the first to splines - then click "ok" - before it asks for t]]

yes, sometimes you have to select 2 to 4 previously drawn curves and then call the tool... but it's almost the same thing Frank pointed out.
but I guess this is not the real question... maybe Todd mean which way the curves/splines are used to create the surface?

## #12 — sebastian — 2010-10-23
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-49452>

[[QUOTE:  ToddWR said: how do you see yourself using this kind of script? in researching this question it appears to be used as a patching function. I would like to know how this would best suit the users of t]]

If i got your question right, you ask how this would be implemented most user-friendly?

...well there are two options that come in to my mind for the actual usage:

first - you'd just add the script as polygonobj. an then throw any number of splines (usually 4 - intersecting at ends) in it to let the script construct the surface. 

second - you'd just make a regular loft an just add splines as children to the loft splines, that define the curvature on the other axis.

was this helpful, todd?

## #13 — ltwhite — 2011-11-24
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-65316>

Powerloft?

Did anything ever eventuate out of this "powerloft" idea? I too would like a script to do this if it exists.

## #14 — rekh — 2013-06-09
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-79640>

What happened with this?

## #15 — podperson — 2013-06-10
<https://www.cheetah3d.com/forum/index.php?threads/6388/post-79645>

Looks like it never went anywhere. Implementing NURBS is no small thing. If you want them you should probably look at a dedicated tool such as Rhino or MoI (both written by the same guy, originally). MoI is dead simple to use and dirt cheap for what it does.
