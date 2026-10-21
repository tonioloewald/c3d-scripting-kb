# Vec3D Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Vec3D.html_

The Vec3D objects represents a three dimensional vector. It can be used either for vertices or control points.
Number x,y,z

## Constructor

### `Vec3D (Number x, Number y, Number z)`
Creates a three dimensional vector.

## Methods

### `Vec3D add ( Vec3D a)`
Adds the vector a .

### `Vec3D cross ( Vec3D a)`
Returns the cross product of this x a .

### `Vec3D convertEuler (Number current_order, Number new_order) Vec3D convertEuler (Number current_order, Number new_order, Vec3D tip)`
Converts a Euler rotation vector from the current rotation oder to the new rotation order. Please use the following constants for the rotation order: ROT_XYZ, ROT_XZY, ROT_YZX, ROT_YXZ, ROT_ZXY, ROT_ZYX or ROT_HPB. If you also offer a tip for the new euler ration vector Cheetah3D tries to keep the jump in the rotation values as small as possible.

### `Number dot ( Vec3D a)`
Returns the dot product of < this, a> .

### `BOOL isEqual ( Vec3D a)`
Returns true if this vector and vector a are equal.

### `Vec3D inverse ()`
Returns the inverse of this vector.

### `Vec3D multiply (Number a) Vec3D multiply ( Vec3D a)`
Multiplys the vector with a .

### `Number norm ()`
Returns the vector norm of the x,y and z components.

### `Vec3D copy ()`
Creates a copy of the vector.

### `void set (Number x, Number y, Number z)`
Sets the values of the vector all at once.

### `Vec3D sub ( Vec3D )`
Substracts the vector a .
