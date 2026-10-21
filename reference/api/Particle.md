# Particle Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Particle.html_

The Particle object hold the state of a particle. Particle objects can be created by a constructor. They can be only created and deleted by the PolyCore object.

## Properties
none

## Constructor
none

## Methods

### `Number getBirth ()`
Returns the time of birth of the particle.

### `Vec4D getColor ()`
Returns the color of the particle.

### `Number getDeath ()`
Returns the time of death of the particle.

### `Number getIndex ()`
Returns the index of the particle. The index property is used the detemine which child of the particle object will be used to instance the particle.

### `Vec3D getPosition ()`
Returns the position of the particle in the local coordinate system of the particle object.

### `Vec3D getPositionSpeed ()`
Returns the velocity of the particle in the local coordinate system of the particle object.

### `Vec3D getRotation ()`
Returns the rotation of the particle in the local coordinate system of the particle object. The rotation is set via XYZ-Euler angles.

### `Vec3D getRotationSpeed ()`
Returns the rotation speed of the particle in the local coordinate system of the particle object. The value is set via XYZ-Euler angles.

### `Vec3D getScale ()`
Returns the scale of the particle in the local coordinate system of the particle object.

### `Vec3D getScaleSpeed ()`
Returns the scale speed of the particle in the local coordinate system of the particle object.

### `Vec3D getRand ()`
Returns a vector of 3 uniformly distributed random numbers. These random numbers are initalized at the birth of the particle.

### `Vec3D getUVW ()`
Returns the UVW coordinate of the particle.

### `Number getWeight ()`
Returns the weight of the particle.

### `Boolean getVisible ()`
Returns the visibility of the particle.

### `void setBirth (Number birth)`
Sets the birth property of the particle.

### `void setColor ( Vec4D rgba) void setColor (Number red,Number green,Number blue,Number alpha)`
Sets particle color.

### `void getDeath (Number death)`
Sets particle death time.

### `void setIndex (Number index)`
Sets particle index.

### `void setPosition ( Vec3D vec) void setPosition (Number x, Number y, Number z)`
Sets the position of the particle in the local coordinate system of the particle object.

### `void setPositionSpeed ( Vec3D vec) void setPositionSpeed (Number x, Number y, Number z)`
Sets the velocity of the particle in the local coordinate system of the particle object.

### `void setRotation ( Vec3D vec) void setRotation (Number x, Number y, Number z)`
Sets the rotation of the particle in the local coordinate system of the particle object. The rotation is set via XYZ-Euler angles.

### `void setRotationSpeed ( Vec3D vec) void setRotationSpeed (Number x, Number y, Number z)`
Sets the rotation speed of the particle in the local coordinate system of the particle object. The rotation is set via XYZ-Euler angles.

### `void setScale ( Vec3D vec) void setScale (Number x, Number y, Number z)`
Sets the position of the scale in the local coordinate system of the particle object.

### `void setScaleSpeed ( Vec3D vec) void setScaleSpeed (Number x, Number y, Number z)`
Sets the scale speed of the particle in the local coordinate system of the particle object.

### `void setRand ( Vec3D vec) void setRand (Number x, Number y, Number z)`
Sets the Rand property of the particle. This property shouldn't be altered.

### `void setUVW ( Vec3D vec) void setUVW (Number u, Number v, Number z)`
Sets the UVW value of the particle.

### `void setWeight (Number weight)`
Sets the particle weight.

### `Number setVisible (Boolean visible)`
Sets the particles visibility property.
