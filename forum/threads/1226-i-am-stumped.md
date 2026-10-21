# I am stumped

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1226/
- Subforum: scripting-general
- Started by **Viking Dan** on 2007-01-14; last post 2007-01-16; 9 posts

## #1 — Viking Dan — 2007-01-14
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7759>

I am stumped

I was trying to write a script to merge all selected vertices. It doesn't work.

What I am trying is this:

Loop through all the vertices.
Find the first one that is selected and get its index.

Then...

Loop through all the polygons.
Loop through all the triangles in each polygon.
Loop through each vertice in each triangle.
If the vertice is selected, I reset its index to be the same as the first selected vertice I found.

It does not work at all.

Do I misunderstand how triangle() works?

HELP!!!

## #2 — ToddWR — 2007-01-14
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7762>

Dan,

triangle only returns information. you need to use the info in the setVertex(iNumbernt vindex, Vec3D vert) call. Once you find the first selected vertex save its point, keep scanning and then set the remaining vertices to the saved point.  

hope this helps
Todd

## #3 — tg_jp — 2007-01-15
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7763>

Hello, Dan.

And, if you meant that 'merge' is making several vertices that have same position to one vertex, you can use 'Mirror' tool for this purpose. 'Mirror' tool optimize all vertices that have same position.

regards.

tg_jp, Hiroto.

## #4 — Viking Dan — 2007-01-15
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7768>

No. What I mean is to remove redundant points. Optimize only removes free vertices and weld only does two at a time which share a common edge.

What I want is something that will merge all selected vertices into only one vertice.

## #5 — tg_jp — 2007-01-15
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7769>

Hello.

I think there are two ways to do what you want.

1. as Todd said, move all selected vertices to position of first selected vertex with setVertex() function. and do 'Mirror' twice manually. do 'Optimize' for deleting free points that 'Mirror' makes.

2. detect index of first selected vertex, delete polygons has another selected vertices, and remake polygon including index of first selected with addIndexPolygon() function.

regards.

I was wrong, only no.2 works for your purpose. still some vertices remain with no.1.

tg_jp, Hiroto.

## #6 — tg_jp — 2007-01-15
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7782>

hello, Dan.

Here is a sample tool script. please check attached zip file. enjoy scripting.  

regards.

tg_jp, Hiroto.

Attachments: [Multi Weld.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/1591/)

## #7 — Viking Dan — 2007-01-15
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7806>

Thanks for trying, but your script doesn't work. It creates an empty second object, but does not merge the selected vertices.

## #8 — ToddWR — 2007-01-16
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7811>

Dan,
did you make sure to put the script into the tools folder? its working here

Todd

## #9 — Viking Dan — 2007-01-16
<https://www.cheetah3d.com/forum/index.php?threads/1226/post-7814>

Pretend for a moment I'm not retarded...and thank you very much. :icon_thumbup:
