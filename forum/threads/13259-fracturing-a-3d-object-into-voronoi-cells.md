# Fracturing a 3D object into Voronoi cells

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13259/
- Subforum: scripting-general
- Started by **Joel** on 2019-03-10; last post 2019-03-10; 2 posts

## #1 — Joel — 2019-03-10
<https://www.cheetah3d.com/forum/index.php?threads/13259/post-115531>

Four years ago in the Wish List thread I requested true 2D and 3D Voronoi Creator Tools. 

https://www.cheetah3d.com/forum/index.php?threads/10926/

Hiroto’s Voronoi Plane Javascript cuts up a square or rectangle into a Voronoi-type pattern. While useful and fun to design with, it makes a pre-set pattern, kind of like the Voronoi material node. It doesn’t actually calculate true Voronoi cells generated from specified points within a plane or volume. Likewise the Cracker script makes pre-set cuts, mostly from side to side, many passing through one central point.

Today, most 3D CG apps have a script or plug-in that fractures a 3D object into Voronoi parts, typically for animated crumbling or exploding. We need a similar C3D script that splits a plane or 3D object into true Voronoi fragments or cells, with polygon “walls” generated about halfway between points set by the user.

I don’t know Javascript but I looked at some C3D scripts to see how they are constructed. They apparently combine math functions and computer graphics functions. I assume they are drawn from a library of standard functions that are open source, but that complex scripts may be proprietary.

Voronoi structures are typical of organic systems, from cells to bubbles. They grow naturally, as the most efficient containers of space, but they are extremely time-consuming to draw precisely with a pencil and paper. Now we have cheap, powerful computers, so designers and architects can incorporate beautiful and functional Voronois into a wide range of products and buildings. C3D could be more useful for people doing 3D printing as well as for graphic designers and scientists doing Data Visualization.

Two questions:

Is it possible to find an open source “true” Voronoi Javascipt and adapt it for C3D?

Is it more practical to use Blender, SketchUp, Unity or whatever just for this purpose?

C3D is such a great program, it’s hard to think of a new feature that would justify Martin’s time, but maybe a Forum reader can suggest a way to do this. 

Here is an open source SimpleFracture Javascript for Unity. Something like this might work. Any ideas?

https://pastebin.com/CkT4Sfp6

Here is a short YouTube video that demonstrates how Voronoi cells expand to an overall equilibrium. It explains the concept using physical materials.

	
		
	

Some recent C3D threads about Voronoi modeling:

https://www.cheetah3d.com/forum/index.php?threads/12651/
https://www.cheetah3d.com/forum/index.php?threads/13225/#post-115254
https://www.cheetah3d.com/forum/index.php?threads/12774/

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

Attachments: [cg_vor.jpg](https://www.cheetah3d.com/forum/index.php?attachments/34023/), [real_vor.jpg](https://www.cheetah3d.com/forum/index.php?attachments/34024/)

Links: https://pastebin.com/CkT4Sfp6, https://www.cheetah3d.com/forum/index.php?threads/10926/, https://www.cheetah3d.com/forum/index.php?threads/12651/, https://www.cheetah3d.com/forum/index.php?threads/12774/, https://www.cheetah3d.com/forum/index.php?threads/13225/#post-115254

## #2 — ZooHead — 2019-03-10
<https://www.cheetah3d.com/forum/index.php?threads/13259/post-115537>

Thanks for the links, the video was quite interesting.
