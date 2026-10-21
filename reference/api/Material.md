# Material:Base Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Material.html_

Materials can't be created with a constructor. To create a material use the addMaterial() function of the Document object.
none

## Constructor
none

## Methods

### `Boolean addConnection (Number fromID, String fromPara, Number toID, String toPara)`
Connects to nodes. Return true if successfull.

### `Node addNodeOfType (String type)`
Adds a node of type to the material. The function returns the newly create node.

### `Vec4D color ()`
Returns the base color of the material.

### `String colorMap ()`
Returns the path of the color texture map.

### `Vec4D emission ()`
Returns the emissive color of the material.

### `Node nodeAtIndex (Number index)`
Returns the node at index .

### `Number nodeCount ()`
Returns the number of nodes in this material.

### `Node nodeWithID (Number id)`
Returns the node with base ID id .

### `Vec4D reflection ()`
Returns the reflection color of the material.

### `Boolean removeConnection (Number nodeID, String nodePara)`
Removes a connection from an imput parameter. Returns true of successfull.

### `String rib ()`
Returns a string which contains all the material properties.

### `Node rootNode ()`
Returns the root (shader) node of the material.

### `Number shininess ()`
Returns the shininess of the material. This number is between [0,128].

### `Vec4D specular ()`
Returns the specular color of the material.

### `Vec4D transmission ()`
Returns the transmission color of the material.
