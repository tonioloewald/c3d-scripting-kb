# Custom exporter for use with OpenGL - uvw texture mapping problem

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9764/
- Subforum: scripting-general
- Started by **andy77** on 2013-07-28; last post 2013-07-29; 3 posts

## #1 — andy77 — 2013-07-28
<https://www.cheetah3d.com/forum/index.php?threads/9764/post-80818>

Custom exporter for use with OpenGL - uvw texture mapping problem

Hello all,

I wrote an costum exporter based on the simple ASCI exporter.
I want to use the data with my OpenGL application.

No problems with the vertices and indices.

The problem is, that the texture mapping coordinates
are uvw coordinates.

I there are JavaScript function, which output the coordinates
in uv-coordinates (like in the OpenGL .h exporter)?

The OpenGL exporter, is not an option for me, because the exported
meshes are to big.

Thanks in advance

andreas

## #2 — Martin — 2013-07-29
<https://www.cheetah3d.com/forum/index.php?threads/9764/post-80841>

Hi,
the PolyCore class has functions to access the UV coords like

Vec2D uvCoord(Number pindex, Number cindex)

that should do the job for writing a exporter. Cheetah3D doesn't use UVW coordinates since UVW coords are only used for 3D textures which are pretty rare.

Bye
Martin

## #3 — podperson — 2013-07-29
<https://www.cheetah3d.com/forum/index.php?threads/9764/post-80843>

Why not just export to OBJ?

It contains vertices, uv coordinates, material assignments. There's almost no cruft in it. It's an industry standard. It works.

If you were trying to store animation data in some kind of horrific and obsolete format like MD2 that would be one thing, but why reinvent the wheel?
