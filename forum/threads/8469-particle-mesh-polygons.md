# Particle Mesh -> Polygons

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8469/
- Subforum: script-downloads
- Started by **mixa** on 2012-05-14; last post 2013-08-05; 4 posts

## #1 — mixa — 2012-05-14
<https://www.cheetah3d.com/forum/index.php?threads/8469/post-70473>

Particle Mesh -> Polygons

This script takes a particle mesh as a parameter and converts it into a set of independent editable meshes. To use it unpack the archive and copy the script into ~/Library/Application\ Support/Cheetah3D/Scripts/Tool/

Your particle mesh should have at least one child.

Edit: the script was updated with the latest tg_jp's edit: now it does not produce additional nested folders.

Attachments: [Particle Mesh -> Polygons.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/17196/)

## #2 — filip c — 2012-05-14
<https://www.cheetah3d.com/forum/index.php?threads/8469/post-70476>

Thanks for sharing

Edit: see also here

Links: http://www.cheetah3d.com/forum/showpost.php?p=70538&postcount=14

## #3 — Dynamatt — 2013-07-24
<https://www.cheetah3d.com/forum/index.php?threads/8469/post-80732>

Extract Parent and Child from Particle Mesh

Hi Mixa
I'm trying to create hair.
I found the script 'Particle Mesh -> Polygons_modB.js' and it does separate out the objects but only the parents.
I am a Java Script moron so trying to amend the script myself is a futile excercise but I was wondering if there was a way to export the parents AND child objects from the mesh together.
At the moment all it is taking out is the parent object (Sweep) as shown below. 

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
			
		
		
	

	
		
	
What I really need it to do is extract

>Sweep
   - Circle
   - Line

And keep all the tag properties such as anchor/rope etc.

Is this possible. Any help is greatly appreciated.
Thanks

## #4 — FritsLyn — 2013-08-05
<https://www.cheetah3d.com/forum/index.php?threads/8469/post-80964>

mixa, Thank you 

This is awesome!

When working with games in Unity, it can sometimes be very nice to place a series of individual (not rendered) "path points" or similar "trigger boxes" along for example a road etc.

There's still a lot of steps to take, but with this script, it's possible to include these "path points" in the whole setup of a maze, saving a ton of time, and giving a ton of options.

Imagine having to draw all the dots in a PacMan game by hand, after making the maze itself - this is a solution to that kind of scenarios (and more complex ones with the same challenge).

Thank you very much
