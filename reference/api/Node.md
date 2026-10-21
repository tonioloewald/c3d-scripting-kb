# Node:Base Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Node.html_

Nodes can't be created with a constructor. To create a node use the addNodeOfType() function of the Material object.
none

## Constructor
none

## Methods

### `Vec4D frame ()`
Returns the frame rect (position.x, position.y, width, height) of the node.

### `Parameter inputAtIndex (Number index)`
Returns the input parameter at index .

### `Number inputCount ()`
Returns the number of input parameters.

### `Parameter inputWithName (String name)`
Returns the input parameter with name .

### `String nodeType ()`
Returns the node type of this node.

### `Parameter outputAtIndex (Number index)`
Returns the output parameter at index .

### `Number outputCount ()`
Returns the number of output parameters.

### `Parameter outputWithName (String name)`
Returns the output parameter with name .

### `void setFrame ( Vec4f frame)`
Sets the frame rect (position.x, position.y, width, height) of the node.

### `void update ()`
Updates the node and the material preview.
