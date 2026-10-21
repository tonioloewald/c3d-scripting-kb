# Another polycore question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1386/
- Subforum: scripting-general
- Started by **capnchunky** on 2007-03-01; last post 2007-03-01; 3 posts

## #1 — capnchunky — 2007-03-01
<https://www.cheetah3d.com/forum/index.php?threads/1386/post-8765>

Another polycore question

For my numeric transform script I want to be able manipulate selected edges. Is there a way to find the vertex indexes of the points of an edge, like vertexIndex() but for edges instead of polys?

## #2 — ToddWR — 2007-03-01
<https://www.cheetah3d.com/forum/index.php?threads/1386/post-8767>

capnchunky,

Check out the following function:

	
	


```
Boolean edgeSelection(Number pindex, Number eindex, Number mask)
SELECT	returns the selection of the edge
UVPOINT	returns the selection of the corner in the UV editor
UVEDGE	returns the selection of the edge in the UV editor
UVPINNED	returns if the corner is pinned
SEAM	returns if the edge is a seam
CREASE	returns if the edge is a crease
```


hope this helps
Todd

## #3 — capnchunky — 2007-03-01
<https://www.cheetah3d.com/forum/index.php?threads/1386/post-8781>

Hi Todd,

I saw that function, but it didn't seem to be quite what I was looking for -- no way of returning which actual vertex indices belong to the edge, and I didn't know in what order they're be listed or connected.

But now I've done what I should have done in the first place, which is look at scripts you more experienced scripters have written.   Now I gather from Edge2Spline that for a polygon, edge #N is made of vertex indices N and N+1 (wrapping around to index 0).

Thanks!

Links: http://www.cheetah3d.de/forum/showthread.php?t=1021
