# Parameter Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Parameter.html_

The parameter objects hold the properties information and TakeNodes of Objects, Tag or Materials.
none

## Constructor
none

## Methods

### `TakeNode addTakeNode (String takename)`
Adds a TakeNode with name takename to the Parameter. If there is already a TakeNode with that name Cheetah3D return that TakeNode .

### `Boolean isAnimateable ()`
Returns if that Parameter can be animated.

### `Boolean connected ()`
Returns true of this parameter is connected to another object.

### `Number connectedWithID ()`
Returns ID of the object/node to which the parameter is connected.

### `String connectedWithParameter ()`
Returns the parameter name to which the parameter is connected.

### `String name ()`
Returns the name of the parameter

### `TakeNode takeNodeAtIndex (Number index)`
Returns the TakeNode at index .

### `Number takeNodeCount ()`
Returns the number of TakeNodes attached to this parameter.

### `TakeNode takeNodeWithName (String takename)`
Returns the TakeNode with name takename . If no such TakeNode exists it return null.

### `Number type ()`
Returns the paramater type. The parameter type can have one of these constant values: INT_PARAMETER FLOAT_PARAMETER BOOL_PARAMETER STRING_PARAMETER VEC2D_PARAMETER VEC3D_PARAMETER VEC4D_PARAMETER TEXTURE_PARAMETER LINK_PARAMETER GRADIENT_PARAMETER FLOAT_ARRAY_PARAMETER
