# multiple splines for a wall with window?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14376/
- Subforum: scripting-general
- Started by **MarkusR** on 2024-02-16; last post 2024-02-17; 13 posts

## #1 — MarkusR — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127828>

hello, is it possible to create multiple splines for one extrude.
I try to create a script that produce a wall with window.
if the window have different size sometimes the surface front and back is wrong at extrude.
somehow in need a rectangle with a hole rectangle spline.

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

## #2 — Helmut — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127829>

1    generate 2 individual splines
2    select and merge
3    extrude
*    the result, generally, is a window in a wall

## #3 — MarkusR — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127830>

hello Helmut,
that is good to know and works well in the 3d editor but i not found this merge tool in script syntax.

i need to start from function buildObject(obj)
it create a spline in real time if parameters are changed.

i look for something like this
var outer = new Spline()
var inner = new Spline()
var inner = new Spline()
var result = Spline.merge([outer,inner,inner])

## #4 — Helmut — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127831>

Sorry Markus, I have no idea how to simulate that in Java script.
    Servus aus Wien

PS:   If you need to animate the control points of the merged splines (be it the frame or the window), you can achieve that without scripting via Record Points.

## #5 — frank beckmann — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127833>

Actually, this usually works, although it creates double geometry, so I would not prefer this method.
However, we may also encounter an error in the way Cheetah3D handles combined paths - see the examples on the left:

		
	
Fill rule "nonzero" in the SVG world:

Attachments: [CompoundPathIssue.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/39730/)

## #6 — MarkusR — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127834>

@Helmut DE: Grüße aus Oederquart und danke für den Tipp, das Skript soll mir nur helfen für ein Gebäude.

## #7 — MarkusR — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127835>

if merge does not exists in scripting i think i will create this wall by boxes.
merge (by script) would be so powerfull for multiple window frames in the wall.

## #8 — Helmut — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127836>

*    Minor confusion:  The en:Wikipedia states:
*    
		
	
 Who is Tobias, the local GodKing?

## #9 — ZooHead — 2024-02-16
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127837>

[[QUOTE:  MarkusR said: if merge does not exists in scripting i think i will create this wall by boxes. merge (by script) would be so powerfull for multiple window frames in the wall. Click to expand... ]]
I don't know java scripting but maybe you can use the Create Spline command. 

If I call up a Rectangular Spline, make it editable and select it. 
Then click on New Spline in the Create Spline Panel. 
This automatically "merges" the new spline with the selected spline. 
Four clicks to make a square, but to finish and close the new spline,
you need to click Close Spline in the same panel.

## #10 — frank beckmann — 2024-02-17
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127838>

I may have encountered a bug. In 7.5.3 we could still distribute spline objects via the particle system, which does not work in 8.x at the moment. This doesn't help with scripting, but a facade with window openings is created in no time.

## #11 — MarkusR — 2024-02-17
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127839>

@frank beckmann very useful hint

currently i recreate my script with boxes and reuse them if parameters are changed, i will post this soon.

## #12 — MarkusR — 2024-02-17
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127842>

made with boxes
it works expect UVs and make edible result in nothing ..

## #13 — MarkusR — 2024-02-17
<https://www.cheetah3d.com/forum/index.php?threads/14376/post-127844>

the trick with splines is as Helmut mentioned,
you need path for the border, and a path for each window.
a new path is started by .move(pos); then extrude works fine.
downside with spline and extrude there is no window object inside.
advantage multiple window holes.

		
	
i think i will create a extra script for window frame and glass.
