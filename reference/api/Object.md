# Object:Base

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Object.html_

Objects are all elements within the scene graph like polygon objects, splines, light sources, cameras and so on. Objects can't be created directly. To create a object you have to call the addObject () function of the Document class.

## Properties
none

## Constructor
none

## Methods

### `Tag addTagOfType (Number type)`
Adds a tag of type type to the object. The function call returns the newly created tag.

### `Tag addChildAtIndex ( Object child, Number index)`
Attaches the object child to this object. Calling this function automatically detaches the child object from it's parent or owner.

### `Object childAtIndex (Number index)`
Return child (sub object) at index .

### `Number childCount ()`
Return the number of children (sub objects).

### `PolyCore core () SplineCore core ()`
Return the geometry data attached to an object. In case of an polygon object it return a PolyCore . In case of a spline object it returns a SplineCore . Otherwithe null.

### `Boolean isCreatorObj ()`
Return if the object is a creator object . Creator objects update automatically if one of it's childs changes. Like the Lathe or the Extrude object.

### `Tag [] materialTags ()`
Returns an array of all the material tags attached to the object.

### `PolyCore modCore () SplineCore modCore ()`
Return the geometry data after the modifiers have been applied. In case of an polygon object it return a PolyCore . In case of a spline object it returns a SplineCore . Otherwithe null.

### `Mat4D obj2WorldMatrix ()`
The transformation matrix from the local to the global coordinate system.

### `Mat4D objMatrix ()`
The transformation matrix from the local to the parents objects coordinate system.

### `void setCreatorObj (Boolean val)`
Sets a object to a creator object .

### `void removeChild ( Object obj)`
Removes child object obj .

### `void removeTag ( Tag tag)`
Removes tag from object.

### `Tag tagAtIndex (Number index)`
Returns the tag at index .

### `Number tagCount ()`
Return the number of tags attached to the object.

### `Tag tagOfType (Number type)`
Returns the first tag of type .

### `void update ()`
Rebuilds all caches. You always have to call this function once you've modified some geometry of parameters.
