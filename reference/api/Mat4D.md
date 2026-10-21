# Mat4D Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Mat4D.html_

The Mat4D objects represents a 4x4 matrix. It's normally used for vertex transformations in 3D space.
Number m00, m01, m02, m03 Number m10, m11, m12, m13 Number m20, m21, m22, m23 Number m30, m31, m32, m33

## Constructor

### `Mat4D () Mat4D (Number type, Number x, Number y, Number z)`
Creates a 4x4 matrix. If you pass no parameters a identity matrix will be created. For creating translation, scale or rotation matrices use for type on of the following constants {TRANSLATE, SCALE, ROTATE, ROTATE_HPB}

## Methods

### `Mat4D adjoint ()`
Returns the adjoint matrix.

### `void concat ( Mat4D mat)`
Multiplys the matrix mat from the right hand side onto the current matrix.

### `Mat4D copy ()`
Creates a copy of the matrix.

### `Number determinant ()`
Returns the determinant of the matrix.

### `Mat4D inverse ()`
Returns the inverse of the matrix.

### `Vec3D multiply ( Vec3D vec) Vec4D multiply ( Vec4D vec) Mat4D multiply ( Mat4D mat)`
Performs a multiplication of a vector or an matrix. In case of the 3D vector the forth vector component is assumed to be 1.

### `Mat4D transpose ()`
Returns the transpose matrix.
