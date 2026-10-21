# How to cut a tube?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5088/
- Subforum: scripting-general
- Started by **2357matrix** on 2009-12-14; last post 2009-12-16; 7 posts

## #1 — 2357matrix — 2009-12-14
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36497>

How to cut a tube?

Sorry for asking such a simple question! I'm beginner...

Is it possible to cut a polygon object at ANY point? I need a clear and straight cut which does'nt affect the rest of the tube.

Thanks a lot for any hint. 
2357matrix

## #2 — 2357matrix — 2009-12-15
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36525>

I wanted to say: I need a tube to be cut not straight but inclined.

## #3 — archie — 2009-12-15
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36527>

i dunno what's the best way,
you could use the boolean creator and cut out a piece, only then you get a triangled mesh.
using  rincut + delete will likely make a straight cut, but you could use the shear modifier type *in cage* to incline the cut afterwards.

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

Attachments: [Screen shot 2009-12-15 at 3.03.07 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/8907/)

## #4 — frank beckmann — 2009-12-15
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36529>

Hi.
I hope you´re not after a scripted solution because you asked in the Cheetah3d Scripting section.  
Otherwise you can try this one:

Cheers
Frank

Attachments: [inclinedCut.gif](https://www.cheetah3d.com/forum/index.php?attachments/8908/)

## #5 — 2357matrix — 2009-12-16
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36562>

Thanks a lot for your precise answers!! I begin to understand the power of Cheetah 3D... It's really fun!

## #6 — podperson — 2009-12-16
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36567>

The obvious solution would be to use a boolean -- which will work a LOT better when Martin implements improved booleans (which I believe is slated for a 5.x release along with better n-gon support -- e.g. n-gons with holes in faces).

Images 1..4 depict doing this in C3D with booleans, with image 4 showing the final mesh (ick!). The boolean is set to intersect.

Silo does a particularly good job of this kind of thing -- you can just draw a line across a mesh and it will cut it, and the resulting mesh is very clean. But that's only of interest if you already have Silo... I wouldn't buy it until they fix the Snow Leopard bugs.

Blender will at least not triangulate the preserved faces (so new faces do end up triangulated).

Image 5 shows Blender's final mesh. (Not quite so ick.)

Attachments: [Screen shot 2009-12-16 at 10.17.12 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/8913/), [Screen shot 2009-12-16 at 10.17.02 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/8914/), [Screen shot 2009-12-16 at 10.16.59 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/8915/), [Screen shot 2009-12-16 at 10.17.23 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/8916/), [Screen shot 2009-12-16 at 10.13.10 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/8917/)

## #7 — Andreu — 2009-12-16
<https://www.cheetah3d.com/forum/index.php?threads/5088/post-36575>

The other program that does a superb job at this boolean thing is modo. It gets you n-gons all cleaned-up and sub-d ready. However, C3D v5.1 makes things easier by allowing for edge removal. Paint-select the edges you wanna see as a combined polygon, and get rid of them. Not so bad.
