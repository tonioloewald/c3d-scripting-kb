# Array of all objects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10376/
- Subforum: scripting-general
- Started by **McShaman** on 2014-04-21; last post 2014-04-21; 2 posts

## #1 — McShaman — 2014-04-21
<https://www.cheetah3d.com/forum/index.php?threads/10376/post-87097>

Array of all objects

How do I get an array of all objects in the scene?

## #2 — McShaman — 2014-04-21
<https://www.cheetah3d.com/forum/index.php?threads/10376/post-87098>

I've worked something out... For anybody else looking see code below:

	
	


```js
function getChildObjects( root, nest ) {
	
	// Set nest default
	if( typeof nest === 'undefined' ) {
		nest = true;
	}
	
	var objects = []; // Array of child objects
	
	var count = root.childCount();
	
	for( var i = 0; i < count; i++ ) {
		
		var object = root.childAtIndex( i );
		
		objects.push( object );
		
		// Process all nested child objects
		if( object.childCount && nest ) {
			
			objects = objects.concat( getChildObjects( object ) );
			
		}
		
	}
	
	return( objects );
	
}

function main( doc ) {

	var root = doc.root();
	
	var allObjects = getChildObjects( root );
	
}
```
