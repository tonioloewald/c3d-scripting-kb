# Script Request: Copy Object

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8015/
- Subforum: scripting-general
- Started by **Edward** on 2012-01-16; last post 2012-01-16; 2 posts

## #1 — Edward — 2012-01-16
<https://www.cheetah3d.com/forum/index.php?threads/8015/post-66594>

Script Request: Copy Object

Hello,

I'm just wondering if someone has code to copy objects of type POLYGONOBJ.  It would save me a lot of time and hope to be able to share my script when I finish.

Thanks,

Greg

Edit: For future reference, this script is to be used inside other scripts and not on it's own.

## #2 — Edward — 2012-01-16
<https://www.cheetah3d.com/forum/index.php?threads/8015/post-66604>

I believe I figured it out looking through forum posts.  It only copies geometry and materials but can be easily extended.  I use this command frequently and will leave it here for future searches.

	
	


```js
function copyObject (document, object) {
	var copy = document.addObject(object.type());
	
	// Copy Parameters
	var name     = object.getParameter("name");
	var position = object.getParameter("position");
	var rotation = object.getParameter("rotation");
	var scale    = object.getParameter("scale");
	copy.setParameter("name",name);
	copy.setParameter("position",position);
	copy.setParameter("rotation",rotation);
	copy.setParameter("scale",scale);
	
	// Copy Materials
	var array = object.materialTags();
	var count = array.length;
	for (var index = 0; index < count; index++) {
		var ID  = array[index].linkedToMaterial();
		var mat = document.materialAtIndex(ID);
		var tag = copy.addTagOfType(SHADERTAG);
		tag.setParameter("material",mat);
	}
	
	// Copy Geometry
	if (object.type() == POLYGONOBJ) {
		var count = object.core().vertexCount();
		for (var index = 0; index < count; index++) {
			var vertex = object.core().vertex(index);
			copy.core().addVertex(false, vertex);
		}
		var count = object.core().polygonCount();
		for (var index = 0; index < count; index++) {
			var verts = [];
			var uvs   = [];
			var size  = object.core().polygonSize(index);
			for (var corner = 0; corner < size; corner++) {
				var vertex = object.core().vertexIndex(index,corner);
				var uv     = object.core().uvCoord(index,corner);
				verts[corner] = vertex;
				uvs[corner]   = new Vec2D(uv.x,uv.y);
			}
			copy.core().addIndexPolygon(size,verts,uvs);
		}
	}
	return copy;
}
```
