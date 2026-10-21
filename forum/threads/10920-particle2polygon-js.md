# Particle2Polygon.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10920/
- Subforum: script-downloads
- Started by **tg_jp** on 2014-12-11; last post 2024-04-10; 11 posts

## #1 — tg_jp — 2014-12-11
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-92247>

Particle2Polygon.js

Hello,

It's a tool script to convert particle object to 1 polygon object with materials.

there are some limitation to use, but please try it.

* max material count is under 16.
* particle instance must be polygon or creator object. ( not folder will be ignored. )

download: http://www.tres-graficos.jp/blog/files/article.php?id=112

Best

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=112

## #2 — Shift Studio — 2024-04-02
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128036>

Hi Hiroto,

This script isn't working for me in C3Dv8.0

I'm trying to get a particle array (that has been dropped for a hardbody simulation) to polygons with materials.
I get this error >>

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
			
		
		
	

	
		
	

Is there any chance you can update it?
Can anyone confirm please?
Also does anyone know another way to get a particle array to polygons with materials.

Thanks in advance!
-- Shift Studio.

Edit: Apparently I've been had this problem in the past (2014). The solution is in this thread >> https://www.cheetah3d.com/forum/index.php?threads/10917/
Still, if the script were fixed that would be even better!

Links: https://www.cheetah3d.com/forum/index.php?threads/10917/

## #3 — ZooHead — 2024-04-04
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128050>

I think you need one Particle Array per material. 

You don't need a script to convert Particles to Polygons, 
just use the command under the Tools menu. 

Then switch the Material from the Array to the converted Polygons.

## #4 — Shift Studio — 2024-04-04
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128053>

[[QUOTE:  ZooHead said: I think you need one Particle Array per material. You don't need a script to convert Particles to Polygons, just use the command under the Tools menu. Then switch the Material from the ]]

Thanks ZooHead, yes, I was thinking that could be a solution. It's a little more work and ensuring good randomness would be more difficult too.
I used the method described by @Rene66 here >> https://www.cheetah3d.com/forum/index.php?threads/10917/post-92225
That does use the Particle -> Polygon tool. A (working) script could achieve this with less effort though.

-- Shift Studio.

Links: https://www.cheetah3d.com/forum/index.php?threads/10917/post-92225

## #5 — frank beckmann — 2024-04-04
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128054>

If you drag the material to the Particle->Polygon object Cheetah3D will maintain the Shade selections.
How do you generate the Particles in first place?

## #6 — Shift Studio — 2024-04-09
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128064>

[[QUOTE:  frank beckmann said: If you drag the material to the Particle->Polygon object Cheetah3D will maintain the Shade selections. How do you generate the Particles in first place? Click to expand... ]]
Hi Frank, thanks for your response!

The particles are simple sphere-like meshes. They were placed as children in a particle array. Then dropped using Rigid Body dynamics.
I had assigned the materials without specifying a 'shade selection' slot likely by dragging and dropping in Object Mode. When done like that, result of 'Particle->Polygon' no longer has multiple materials.

When materials were (later) assigned a shade selection using polygon selection slots, the result of 'Particle->Polygon' tool still has the slots available to re-assign the material.

Now I now, but will probably forget before the next time I need to do this.

-- Shift Studio.

## #7 — frank beckmann — 2024-04-09
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128065>

Do the "sphere-like" object has UVs per default? I ask because the Polyhedra objects don't have. Not sure if that's somehow involved.

## #8 — Shift Studio — 2024-04-09
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128066>

[[QUOTE:  frank beckmann said: Do the "sphere-like" object has UVs per default? I ask because the Polyhedra objects don't have. Not sure if that's somehow involved. Click to expand... ]]
I'll re-create it and attach here in a bit. The UVs are unwrapped.
-- Shift Studio.

## #9 — Shift Studio — 2024-04-10
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128067>

@Frank.
I've attached a .jas file for review.
You'll see there is a 3x3x3 array that I made 'editable'. It has 3 child particles, each with it's own material.

		
	

When you call Particle->Polygon, there are no materials assigned and no shade selections available either.
Can you confirm that?

This can be fixed by using Shade Selection slots when assigning materials. <- This is what I didn't remember to do.

Thanks, Shift Studio.

Attachments: [Particle to Polygon.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/39870/)

## #10 — frank beckmann — 2024-04-10
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128068>

It´s not working, because you have 3 different materials assigned to Shade Selection: 0 each.
The way it will work: Select first object in the Particle stack and explicit choose Shade Selection no 1 - then select every polygon and drag the material No1 to it - make object invisible. Select second object - choose Shade Selection no 2 - select every polygon and drag material 2 onto it - make invisible - etc - when done turn visibility back on - Call Tools->Particle->Particle->Polygon - turn Particle stack invisible.
Drag first material to Particle Array in Object browser - click on Material tag and choose Shade Selection: 1
Drag second material to Particle Array in Object browser - click on Material tag and choose Shade Selection: 2
Drag third material to Particle Array in Object browser - click on Material tag and choose Shade Selection: 3 - done.

Attachments: [Particle to Polygon4U.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/39872/)

## #11 — Shift Studio — 2024-04-10
<https://www.cheetah3d.com/forum/index.php?threads/10920/post-128069>

[[QUOTE:  frank beckmann said: It´s not working, because you have 3 different materials assigned to Shade Selection: 0 each. The way it will work: Select first object in the Particle stack and explicit choose ]]

Thank you Frank. That's very close to what I did end up doing. It's great that you took the time for this in-depth post so it's easier for the next person or if I ever forget!

-- Shift Studio.
