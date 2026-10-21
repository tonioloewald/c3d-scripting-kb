# Cheetah 3D to SVG output

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13612/
- Subforum: scripting-general
- Started by **llamapixel** on 2020-01-30; last post 2020-08-25; 10 posts

## #1 — llamapixel — 2020-01-30
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119099>

I am looking for a plugin that can export SVG.
Does this sort of plugin exist for Cheetah3D?

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
			
		
		
	

	
		
	
Attached is a very simple looking isometric tile of a city

Attachments: [Cheetah_to_SVG_TestScene.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/35519/)

## #2 — frank beckmann — 2020-01-30
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119101>

Unfortunately there´s no SVG exporter script available.
What I tried in the past is to use the exported UV to PDF functionality:

		
	
Of course there are no "hidden" lines - all wires/edges are there.

Cheers
Frank

Attachments: [Cheetah_to_SVG_TestScene.pdf](https://www.cheetah3d.com/forum/index.php?attachments/35532/)

## #3 — llamapixel — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119140>

thanks Frank! Checking it out now.

## #4 — llamapixel — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119141>

Frank,

Success with the Shapes! 
The vector shapes were retained in the pdf and were selectable as objects in ( Affinity Designer ) OSX

No Visible Texture or Flat Shading Colour retention

The colour information is lost so I painted the red in to see how hard it would be to go in by hand afterwards.
If only it could keep the colour information and texture information...

Thanks Frank, that helps a lot.

sample image provided

## #5 — llamapixel — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119142>

Can you write some finer points on how you got to that stage.
My export is flat like uv flat lol.

## #6 — frank beckmann — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119143>

1. at first you need to "Merge" your objects into one mesh.
2. with it selected go in UV-Layout
3. call UV-Mapper and set "Mapping type: Frontal"
4. check the tiny representation of the mesh in UVs window
5. while in camera mode have a good play with view angle and Field Of View (alt+/shift+alt+scrollwheel in 3d view - checking UVs
6. you can Write UV coords now and then to check out UVs more clearly.
7. Once you´re satisfied with the angle "Write UV coords" a last time.
8. To get rid of hidden lines/edges you can use Paint select with the Selection tool and "Visible" checked to select only polygons facing you´re/camera view.
9. Invert selection and delete.
10. In UVs window Save UV´s to PDF (make 1 UNDO to get back deleted polygons of your mesh before saving the file)
11. Open in Affinity Designer or other SVG editor and adjust color fill, line thickness, Z-order etc.:

		
	

Cheers
Frank

## #7 — MonkeyT — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119146>

THIS IS FANTASTIC.

I've been working out carpentry dimensions in Cheetah3D for my Dad for a couple of years now and never found a way to get ortho drawings from 3D into Affinity Designer where I could label the dimensions.  This is a wonderful solution at the perfect time!

Thanks, Frank

## #8 — frank beckmann — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119148>

Glad you find this useful.
This is what I usually do: #2
 ->export to Collada - load into SketchUp and insert my dimensions over there with its Ruler-tool - which works super nicely when you take 1 unit in Cheetah3d as 1m:

		
	

Cheers
Frank

Links: https://www.cheetah3d.com/forum/index.php?threads/8762/post-72690

## #9 — llamapixel — 2020-02-02
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-119153>

Thanks Frank! Many beers are in my fridge with your name on them. Will follow up later.
Ran out of time yesterday,

## #10 — MonkeyT — 2020-08-25
<https://www.cheetah3d.com/forum/index.php?threads/13612/post-121209>

Here's the final design for my Dad.  My sister replaced her microwave/oven installation with a double oven and bought a small countertop microwave to replace the one she lost.  She also had a finished piece of countertop left over from the original builder which matches her kitchen, so I incorporated that into a small table design to hold the microwave in the top shelf, with a pullout tray.

		
	

I used sketchup to send him plans.  We're buying wood in a week or two.
