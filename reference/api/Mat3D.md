# Mat3D Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Mat3D.html_

The Mat3D objects represents a 3x3 matrix. It's normally used for uv coords transformations.

## Properties
Number m00, m01, m02 Number m10, m11, m12 Number m20, m21, m22

## Constructor

### `Mat3D () Mat3D (Number type, Number x, Number y)`
Creates a 3x3 matrix. If you pass no parameters a identity matrix will be created. For creating translation, scale or rotation matrices use for type on of the following constants {TRANSLATE, SCALE, ROTATE}

## Methods

### `Mat3D adjoint ()`
Returns an adjoint matrix.

### `void concat ( Mat3D mat)`
Multiplys the matrix mat from the right hand side onto the current matrix.

### `Mat3D copy ()`
Creates a copy of the matrix.

### `Number determinant ()`
Returns the determinant of the matrix.

### `Mat3D inverse ()`
Returns the inverse of the matrix.

### `Vec2D multiply ( Vec2D vec) Vec3D multiply ( Vec3D vec) Mat3D multiply ( Mat3D mat)`
Performs a multiplication of a vector or an matrix. In case of the 2D vector the third vector component is assumed to be 1.

### `Mat3D transpose ()`
Returns the transpose matrix.
