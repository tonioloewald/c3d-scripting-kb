# SplineCore Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/SplineCore.html_

The SplineCore object hold all the data of a Spline object. It contains all the information about paths, control points, and so on. A SplineCore object can't be created manually. It is just possible to retrieve SplineCore objects from Spline objects with the core() or modCore() function calls.

## Properties
none

## Constructor
none

## Methods

### `Vec3D [] cache (Number pindex)`
Cheetah3D tessellates all spline data. This data will be cached. This function return and array of 3D vectors which describes the tessellated paths at index pindex .

### `void close ()`
Closes the current path with a line segment.

### `Vec3D currentPoint ()`
Returns the current point.

### `void curve ( Vec3D cp1, Vec3D cp2, Vec3D to)`
Draws a Beziere curve with the control points cp1 and cp2 from the current point to to .

### `void line ( Vec3D to)`
Draws a line from the current point to to .

### `void move ( Vec3D to)`
Moves the pen to to . This function also initializes the current point. So this function should be always called before you continue with drawing a spline. Calling this function also starts a new path.

### `Number pathCount ()`
Number of paths.
