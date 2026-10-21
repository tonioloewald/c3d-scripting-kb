# Document Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Document.html_

none

## Constructor
none

## Methods

### `Object activeCamera ()`
Returns the active camera.

### `Take addTake (String takename)`
Adds a take with name takename to the document. If there is already a take with that name in the document this function will return the already existing take and doesn't create a new one with the same name.

### `Number animationEnd ()`
Returns the time point where the animation ends.

### `Number animPosition ()`
Returns the current time point of the animation.

### `Material addMaterial (String type, String name)`
Adds a new material to the scene. The type can be every available shader type like Material, Marble, Wood, etc. You also have to pass in an initial name of the material which can be changed later.

### `Object addObject (Number type)`
Adds an object of the scene. The parameter type must be any of the various object type constants.

### `Base currentRenderer ()`
Returns the currently selected renderer.

### `Take currentTake ()`
Returns the currentty selected (playing) Take.

### `Number editMode ()`
Returns the current edit mode (POINT_MODE, EDGE_MODE, POLY_MODE or OBJECT_MODE)

### `String fileName ()`
Returns the file name of the current document. If the documents doesn't have a file name yet, it return null.

### `Material materialAtIndex (Number index)`
Returns the material at index .

### `Number materialCount ()`
Returns the number of materials in the scene.

### `void releaseRedrawLock ()`
Releases the redraw lock. Only use this function if you called retainRedrawLock () before. Otherwise the UI of Cheetah3D will stay locked.

### `void render () void render (String filename)`
Renders the current scene. If a filename is also passed to this function the rendered image will be saved to that file.

### `void redrawAll ()`
Redraws the hole UI.

### `void removeMaterial ( Material mat)`
Removes the Material mat from the document.

### `void removeTake (String takename)`
Removes the Take takename from the document. This also removes all TakeNodes with name takename from all Parameters .

### `void renameTake (String takename,String newname)`
Renames the Take takename to newname . This function also renames all TakeNodes with the name takename to newname. So if you want to rename a Take never rename the TakeNodes manually but always rename them with this function.

### `Base rendererAtIndex (Number index)`
Returns the renderer as index .

### `Number rendererCount ()`
Returns the number of renderers in this scene.

### `void retainRedrawLock ()`
Many Javascript functions cause a redraw of the UI. To avoid wasting time by unnecessary UI redraws you can lock the automatic UI redraw. But don't forget to call releaseRedrawLock () at the end of the script. Otherwise the UI will stay locked.

### `Object root ()`
Returns the root object of the scene graph.

### `void saveToFile (String filename, String type)`
Saves the scene to the filename.

### `void selectObject (Object obj,Boolean extendSelection)`
Selects Object obj .

### `Object selectedObject ()`
Returns the selected object.

### `Object[] selectedObjects (Boolean flat)`
Returns and array of all selected and sub-selected objects.

### `void setAnimPosition (Number time)`
Sets the animation position to time .

### `void setCurrentRenderer (Number index)`
Sets the renderer at index as the current renderer.

### `void setCurrentTake (String takename)`
Sets the current (playing) Take to the Take with name takename .

### `void setWindowFrame (Number originX, Number originY, Number width, Number height)`
Sets the document windows position and size.

### `Take takeAtIndex (Number index)`
Returns the take at index .

### `Take takeWithName (String takename)`
Returns the take with Name takename .

### `Number takeCount ()`
Returns the number of takes.
