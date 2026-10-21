# TakeNode Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/TakeNode.html_

TakeNodes group the FCurve s of a certain take together. The number of FCurve s in a TakeNode are determined by the dimension of the parameter. For example a Float parameter only has one FCurve while a 3-dimensional Vec3D parameter has 3 FCurve s. TakeNodes are child objects of Parameter objects.

## Properties
none

## Constructor
none

## Methods

### `FCurve fCurveAtIndex(Number index)`
Returns the FCurve at index .

### `Number fCurveCount()`
Returns the number of FCurve s in the TakeNode. This number is identical to the dimension of the parameter.

### `String name()`
Retunrs the name of the TakeNode.

### `Number totalKeyCount()`
Tells you if there were any keys recorded in that TakeNode.
