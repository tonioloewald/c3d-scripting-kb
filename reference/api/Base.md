# Base Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Base.html_

The Base object builds the foundation of all tools, objects, tags, loaders, etc. It holds all the parameters and some other very basic informations. Many other objects are inherited from the Base object.
none

## Constructor
none

## Methods

### `void addParameterBool (String paraname, Boolean initvalue, Boolean paramin, Boolean paramax, Boolean animate, Boolean build)`
Adds a parameter of type Boolean with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterButton (String paraname, String buttonname, String functionname)`
Adds a button property with name paraname to the object. The button title will be buttonname . If the button will be clicked the Javascript function functionname( Base obj) will be called. Please call this function only in the buildUI() function.

### `void addParameterColor (String paraname, Vec4D initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Vec4D with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterFloat (String paraname, Number initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Float with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterInt (String paraname, Number initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Int with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterLink (String paraname, Boolean build)`
Adds a parameter of type Object with name paraname to the object. build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterSelector (String paraname, Array options, Boolean animate, Boolean build)`
Adds a parameter of type selector with name paraname to the object. options = an array of strings which lists the menu items of the pull down button animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterString (String paraname, String initvalue, Boolean build)`
Adds a parameter of type String with name paraname to the object. initvalue = initial value of parameter build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterSeparator (String paraname)`
Adds a separator line to the UI. The title of the separator line is paraname.

### `void addParameterTexture (String paraname, String initvalue, Boolean build)`
Adds a parameter of type Texture with name paraname to the object. initvalue = initial value of parameter build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterVec2D (String paraname, Vec2D initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Vec2D with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `void addParameterVec3D (String paraname, Vec3D initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Vec3D with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

### `Document document ()`
Returns the document which owns the object.

### `Number family ()`
Returns the family type of the object.

### `void getParameter (String paraname) void getParameter (String paraname, Number time)`
Returns the current parameter value of the parameter paraname. The value returned depends on the parameter type. If the parameter paraname is a float parameter a Number will be returned. If it is a Vec3D a three dimensional vector will be returned. Using the time parameter you can access the parameter at the given time point if the object was animated.

### `Number modifiedHint ()`
Returns the modified hint of this object.

### `Number modifiedHint2Root ()`
Returns the cumulative modified hint of this object and all it's parent objects.

### `Base owner ()`
Returns the owner of the object. In case of an Object the owner is the parent object. In case of a Tag the owner is the object the tag is attached to.

### `Number parameterCount ()`
Returns the number of parameters of this object.

### `Parameter parameterAtIndex (Number index)`
Returns the parameter at index.

### `String[][] parameterInfo ()`
Returns a two dimensional array of strings which contains the name and the type of all parameters attached to the object.

### `Parameter parameterWithName (String name)`
Returns the parameter name "name".

### `void recordGeometryForUndo ()`
This function pushes the geometry of the object on the Undo-Stack. In case of a polygon object the polygon mesh or in case of a spline object the path data. Once that function was called changes to the object geometry can be undone. Please call this function only in tool scripts!

### `void recordParametersForUndo ()`
This function pushes all parameter values of the object on the Undo-Stack. Once that function was called changes to the object parameter can be undone. Please call this function only in tool scripts!

### `Number selection ()`
Return the selection value of the object.

### `String script ()`
Some objects are created by Javascripts. If an object has a Javascript attached this function returns the name of the script.

### `String scriptPath ()`
Some objects are created by Javascripts. If an object has a Javascript attached this function returns the file system path of the script.

### `void setParameter (String paraname, void value) void setParameter (String paraname, void value, Boolean update)`
Sets the current parameter value of the parameter called paraname to value. The value should be of the type as the parameter. Else an error will be posted. By defalte the scene graph will be updated if you change the value of one parameter. Calling the setParameter() function with the additional parameter update=false won't update the scene graph.

### `Number type ()`
Returns the object or tag type of the object.

### `void updateModifiedHint (Number hint)`
Updates the modified hint property of the object.
