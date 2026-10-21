# Texture Object

_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/Texture.html_

Texture objects can't be created with a constructor but textures can be accessed with the getParameter() function of the Base object.
```js

              var texturePath=obj.getParameter("texturePara");	//returns just the textures path as a String object
              var texture=obj.getParameter("texturePara.tex");	//returns the texture object itself
              
```

## Properties
Number width Number height String filename

## Constructor
none

## Methods

### `Vec4D pixel (Number x, Number y)`
Returns the color of pixel (x,y).

### `Vec4D sample (Number s, Number t)`
Samples the texture at the texture coordinate (s,t) and returns a color.
