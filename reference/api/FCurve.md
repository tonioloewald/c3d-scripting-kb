# FCurve Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/FCurve.html_

The FCurve objects represents parameter F-Curves. They are usually grouped together in a TakeNode . FCurves itself are a collection of animation keys ( FCurveKeys ) and can be evaluated at any time t.

## Properties
none

## Constructor
none

## Methods

### `void addKey ( FCurveKey key)`
Appends a key to the end of the F-Curve.

### `void insertKeyAtIndex ( FCurveKey key, Number index)`
Inserts a key into the F-Curve at index .

### `FCurveKey keyAtIndex (Number index)`
Returns the key at index .

### `Number keyCount ()`
Returns the number of keys in the F-Curve

### `void removeAllKeys ()`
Removes all keys from the F-Curve.

### `void removeKeyAtIndex (Number index)`
Removes a key from the F-Curve at index .

### `void setKeyAtIndex ( FCurveKey key, Number index)`
Sets the values of a F-Curve at index .

### `void update ()`
Please always call this function after editing the F-Curve. It will performs some clean up tasks and calculate the tangents if you've choosen smooth spline interpolation.

### `Number valueAtTime (Number time)`
Evaluates the F-Curve at time .
