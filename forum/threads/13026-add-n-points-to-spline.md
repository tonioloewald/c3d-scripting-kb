# Add n-points to spline

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13026/
- Subforum: scripting-general
- Started by **jdmac** on 2018-09-12; last post 2018-09-12; 8 posts

## #1 — jdmac — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113297>

Add n-points to spline

Is there an existing script (or C3D tool) to add n-points to a spline?
Or another way to ask -- is there a way to segment a spline n-times?
(I've looked, but not found)

If not, is this something that is possible to script?
I haven't scripted anything yet, and am wondering if even possible before heading down that road 

Thanks.

--
UPDATE:
I didn't look hard enough. 
This is what I was looking for: https://www.cheetah3d.com/forum/showthread.php?t=8024

Links: https://www.cheetah3d.com/forum/showthread.php?t=8024

## #2 — frank beckmann — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113304>

Not sure what you had in mind at the beginning - but you can insert points in editable splines wherever you want.

Cheers
Frank

## #3 — jdmac — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113305>

[[QUOTE:  frank beckmann said: Not sure what you had in mind at the beginning - but you can insert points in editable splines wherever you want. Click to expand... ]]
Thanks, Frank. I was looking for a way to insert x-number of points equidistant along a spline. 
The 'Edge N Splitter' script does exactly what I need.

Links: https://www.cheetah3d.com/forum/showthread.php?t=8024

## #4 — frank beckmann — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113306>

I know the script but it´s for polygons - so I was curious about your need to have more points in splines - as I´m always after to have as less as possible.  

Cheers
Frank

## #5 — jdmac — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113307>

[[QUOTE:  frank beckmann said: I know the script but it´s for polygons Click to expand... ]]
You are correct. I should have written "edge" instead of "spline".
And the the script "splits the edge" into specified number; whereas I called it "adding points" -- the distinction being, if 4 is entered, the edge will be divided into 4 sections; it is not adding 4 points.

My reason for using script is that I needed to split some existing faces of an object into specific number of pieces.
Example attached. (Maybe there is a better way of accomplishing the same thing).

Attachments: [A_select_edges.jpg](https://www.cheetah3d.com/forum/index.php?attachments/33235/), [B_apply_edge-n-splitter.jpg](https://www.cheetah3d.com/forum/index.php?attachments/33238/), [C_connect_points_with_scalpel.jpg](https://www.cheetah3d.com/forum/index.php?attachments/33239/)

## #6 — frank beckmann — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113308>

[[QUOTE:  jdmac said: (Maybe there is a better way of accomplishing the same thing). Click to expand... ]]
Sure there are always more ways to skin a cat:
For instance:
Take a plane
Adjust 4 sections for Depth:
Add Taper modifier 
Set Strength and Curvature to 0,0
Make editable - call optimise tool to weld top points.
Depends on kind of triangle of course. 

Cheers
Frank

## #7 — jdmac — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113309>

[[QUOTE:  frank beckmann said: Depends on kind of triangle of course. Click to expand... ]]
In my situation, the triangle is a face of an existing object.

## #8 — frank beckmann — 2018-09-12
<https://www.cheetah3d.com/forum/index.php?threads/13026/post-113310>

I was expecting this and thanks to Hiroto for his great script. :icon_thumbup: 

Cheers
Frank
