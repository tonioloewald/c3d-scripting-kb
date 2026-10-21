# PolyCore Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/PolyCore.html_

The PolyCore object hold all the data of a Polygon object. It contains all the information about vertices, polygons UV coords, polygon selections, creases, seams, etc. A PolyCore object can't be created manually. It is just possible to retrive PolyCore objects from Polygon objects with the core() or modCore() function calls.

## Properties
none

## Constructor
none

## Methods

### `Number addIndexPolygon (Number size]) Number addIndexPolygon (Number size, Number vindex[]) Number addIndexPolygon (Number size, Number vindex[], Vec2D uv[]) Number addIndexPolygon (Number size, Number vindex[], Vec4D uv[])`
Adds a new polygon with size corners to the object. You can either create an empty polygon or you can already initialize it with an array of vertex indices and optionally with an array of uvcoords. Please consider that the vertices referenced in the vertex index array vindex[] have to exist. Otherwise you could cause a crash.

### `Number addPolygon (Number size) Number addPolygon (Number size, bool meshed, Vec3D p[]) Number addPolygon (Number size, bool meshed, Vec3D p[], Vec2D uv[])`
Adds a new polygon with size corners to the object. You can either create an empty polygon or you can already initialize it the an array of vertices and optionally with an array of uvcoords. If meshed=true Cheetah3D tries to reuse vertices which results in a connected mesh. So in most cases meshed=true is recommended.

### `Number addVertex (Boolean meshed, Vec3D vert)`
Adds the vertex vert to the object. If meshed=true Cheetah3D first searches for a vertex with the same coordiantes if it findes one it returns the index of the existing vertex. If it doesn't find a vertex with the same coordinates it adds a new vertex to the vertex array and returns the index of the new vertex. If meshed=false Cheetah3D Cheetah3D adds the vertex without the test.

### `void buildVertexBSP ( Vec3D bmin, Vec3D bmax)`
Creates an internal BSP tree within the box spanned up from bmin to bmax . If a BSP tree is created the addVertex() and addPolygon() functions offer an much increased performance. When you are done with the creation of the mesh always call destroyVertexBSP() to free up the memory of the BSP tree.

### `void deletePolygon (Number pindex)`
Deletes the polygon at pindex.

### `void deleteVertex (Number vindex)`
Deletes the vertex at vindex.

### `void destroyVertexBSP ()`
Destroys the BSP tree and frees up it's memory.

### `Number cornerCount ()`
Return the number of corners in the object. Each ngon as n corners.

### `Boolean edgeSelection (Number pindex, Number eindex, Number mask)`
SELECT returns the selection of the edge
UVPOINT returns the selection of the corner in the UV editor
UVEDGE returns the selection of the edge in the UV editor
UVPINNED returns if the corner is pinned
SEAM returns if the edge is a seam
CREASE returns if the edge is a crease

### `void flipWinding (Number pindex)`
Changes the winding of polygon pindex .

### `Number materialTagIndex (Number pindex )`
Returns the index of the material tag which the polygon at pindex uses. Use the materialTags() function call of the Object class to retrieve all available materials tags. If the return of this function is greater or equal to the number of material tags no material is assigned to that polygon.

### `void mergeVertices (Number tolerance)`
Merges vertices which are close to each other. You can use this function to connect the polygons of a mesh.

### `Vec3D normal (Number pindex) Vec3D normal (Number pindex, Number cindex)`
Returns the normal perpendicular to polygon pindex if you only pass in the polygon index . If you also hand over the index of the corner cindex the returned normal will be the smoothed normal.

### `Number polygonCount ()`
Return the number of polygons in the object.

### `Boolean polygonSelection (Number pindex)`
Returns true if the polygon at pindex is selected.

### `Number polygonSize (Number pindex)`
Returns the size or better the number of corners of the polygon at pindex .

### `void setActivePolygonSelection (Number polysel)`
Changes the active polygon selection. Cheetah3D has 25 independet polygon selections. So you can pass in values form [0,24].

### `void setEdgeSelection (Number pindex, Number eindex, Number mask, Boolean val)`
Sets verious edge and corner properties of the edge with index eindex of polygon pindex. Check out the function edgeSelection() to get the list of the various masks.

### `void setPolygonSelection (Number pindex,Boolean val)`
Sets the polygon selection of polygon pindex to val. This call only effects th active polygonselection.

### `void setUVCoord (Number pindex, Number cindex, Vec2D uv) void setUVCoord (Number pindex, Number cindex, Vec4D uv)`
Sets the uvcoord of corner cindex of polygon pindex.

### `void setVertex (iNumbernt vindex, Vec3D vert)`
Sets the vertex at vindex to vert.

### `void setVertexSelection (Number vindex, Boolean val)`
Sets the vertex selection of vertex vindex .

### `Number[3] triangle (Number pindex, Number tindex)`
Cheetah3D automatically tesselates all polygons into triangles. These triangles can be accessed with the triangle() call. Just pass in the polygon index and the triangles index. The triangles indices of each polygon go from zero to polygonSize-2. The function returns an array of 3 integers. These integers reference the corner indexes of the polygon.

### `Number triangleCount ()`
Return the number of triangles in the object. This number is normally not equal to the number of polygons since every ngon consist out of (n-2) triangles.

### `Vec4D uvCoord (Number pindex, Number cindex)`
Return the uvcoord of corner cindex of polygon pindex .

### `Number vertexCount ()`
Return the number of vertices in the object.

### `Vec3D vertex (Number vindex)`
Returns the vertex at vindex.

### `Number vertexIndex (Number pindex, Number cindex)`
Return the vertex index of corner cindex of polygon pindex .

### `Boolean vertexSelection (Number vindex)`
Returns true if the vertex at vindex is selected.
