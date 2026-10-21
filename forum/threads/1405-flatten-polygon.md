# Flatten Polygon

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1405/
- Subforum: script-downloads
- Started by **kraus** on 2007-03-06; last post 2014-03-31; 10 posts

## #1 — kraus — 2007-03-06
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-8879>

Flatten Polygon

I've created a small script that flattens a polygon. It will make sure that all the vertices are on the same plane. Put in into your macro folder and enjoy!

Flatten.js

Cheeers
marco

Links: http://www.olaf.ch/scratch/Flatten.js

## #2 — xbob — 2007-03-06
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-8888>

wow

what a great idea! i've thought about a script like this many times...well done and thank you

## #3 — tg_jp — 2007-03-07
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-8895>

Hi, so nice!

so, multi-selection version by adding some codes might be better. 

regards.

tg_jp, Hiroto.

## #4 — kraus — 2007-03-07
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-8898>

Thank you for the replies. tg_jb modified the script to support the selection of more than one poly. You can find it here:

Flatten.js

There's a caveat with this version, though: If the selected polygons share edges or points, updating one polygon might affect already flattened polys. One would need to isolate these points and constrain their movement. I'll have a look at this problem when I find the time. ATM, I'm learning for my exams, so there's not much time left for coding and other fun stuff 

Cheers

Links: http://www.olaf.ch/scratch/Flatten.js

## #5 — Martin — 2007-03-07
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-8909>

Hi,
very nice script. It's great to see another scripter. The more script writers the better. :smile: 

Bye,
Martin

P.S. Good luck for your exams.:icon_thumbup:

## #6 — frank beckmann — 2010-04-03
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-41070>

I tried to get this to run again and finally it works 
If you have a load of polygons and the feeling it´s not really plane call the script a second time.
Put it in the Macro Scripts folder.

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
			
		
		
	

	
		
	

		
	
Happy flat Easter Egg Holidays.

Cheers
Frank

PS: Aunt Edith says you can scale a bunch of geometry now along it´s normals or any direction with the gadget mode: second image.

Attachments: [flattened4U.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/10329/)

## #7 — SurfingAlien — 2010-04-03
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-41076>

very cool, thank you Frank!

Happy Easter you too
A

## #8 — Targos — 2014-03-31
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-86451>

Picking up an error here:

line: 63 
error: Can't find variable: printVec3D

C3D Version 5.8 

Thanks
AaronC

## #9 — frank beckmann — 2014-03-31
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-86452>

So you haven´t try the modified script from my reply N°6 - which still works.

Cheers
Frank

## #10 — Targos — 2014-03-31
<https://www.cheetah3d.com/forum/index.php?threads/1405/post-86453>

Ah thanks, I missed that. Cheers!
