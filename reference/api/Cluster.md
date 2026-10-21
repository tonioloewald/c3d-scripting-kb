# Cluster Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Cluster.html_

Clusters can't be created with a constructor. To create a cluster use the addCluster() function of the Tag object.
Object link The joint object to which this cluster is linked.
Boolean linkBound The value of this property is true if the cluster is properly bound to a joint.
Boolean linkSelection The value of this property is true if the cluster is selected in the properties editor.
Vec3D bindPosePosition The value of the joints position property during binding.
Vec3D bindPoseRotation The value of the joints rotation property during binding.
Vec3D bindPoseScale The value of the joints scale property during binding.
Mat4D transformMatrix Reference transformation in which the transformLinkMatrix is given.
Mat4D transformLinkMatrix The transformation matrix of the joint object during binding.

## Constructor
none

## Methods

### `Number controlPointCount ()`
Returns the number of control points in this cluster.

### `Number[] controlPointIndexArray ()`
Returns the index array of the cluster.

### `Number[] controlPointWeightArray ()`
Returns the weights array of the cluster.

### `void setControlPoints (Number[] indices,Number[] weights)`
Sets the index and weights array of the cluster. Both arrays have to have the same number of entries.
