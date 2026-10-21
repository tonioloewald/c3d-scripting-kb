# Quad UV Map: Perhaps the simplest useful script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9816/
- Subforum: script-downloads
- Started by **podperson** on 2013-08-26; last post 2013-08-26; 1 posts

## #1 — podperson — 2013-08-26
<https://www.cheetah3d.com/forum/index.php?threads/9816/post-81359>

Quad UV Map: Perhaps the simplest useful script

I wrote these macro scripts today, and thought I'd share them:

	
	


```js
function main(doc){
    //get selected object
    var obj = doc.selectedObject();
    
	obj = obj.core();
    for( var i = 0; i < obj.polygonCount(); i++ ){
    	if( obj.polygonSelection( i ) && obj.polygonSize( i ) === 4 ){
    		obj.setUVCoord( i, 0, new Vec2D( 0, 0 ) );
    		obj.setUVCoord( i, 1, new Vec2D( 1, 0 ) );
    		obj.setUVCoord( i, 2, new Vec2D( 1, 1 ) );
    		obj.setUVCoord( i, 3, new Vec2D( 0, 1 ) );
    	}
    }
    
    doc.redrawAll();
}
```


What this script does is look at each polygon in the currently selected object, and if it's both selected and a quad it maps it to the whole UV plane (0,0)-(1,0)-(1,1)-(0,1).

This is useful if you want to do this or, more likely, want to force a whole bunch of quads to coincide perfectly so you can place them together somewhere else.

This is a family of four related scripts designed to be hooked up to keyboard shortcuts.

Links: http://loewald.com/c3dbook/Scripts/Quad-UV-Map/
