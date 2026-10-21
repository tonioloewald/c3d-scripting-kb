# Tag:Base Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Tag.html_

Tag objects can be created with a constructor. To create and attach a tag to an object you have to call the addTagOfType() function of the Object object.

## Properties
none

## Constructor
none

## Methods

### `Cluster addCluster ()`
Adds an empty cluster to a skeleton tag. If the tag is no skeleton tag nothing happens.

### `Cluster clusterAtIndex (Number index)`
Returns the cluster at index .

### `Number clusterCount ()`
Returns the number of clusters which are connected to this tag.

### `Number linkedToMaterial ()`
If the tag is a material tag this function call returns the material index to which the tag is linked to. For all other tags this function just returns -1.

### `void removeClusterAtIndex (Number index)`
Removes cluster at index .

### `Mat4D tag2WorldMatrix ()`
Return the transformation matrix from the tags local coordinate system to the world coordinate system.

### `void update ()`
Updates the scene graph starting from the tag.
