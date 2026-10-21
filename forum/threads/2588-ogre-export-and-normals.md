# Ogre Export and normals

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2588/
- Subforum: scripting-general
- Started by **sweetjimmy** on 2008-01-19; last post 2008-01-19; 2 posts

## #1 — sweetjimmy — 2008-01-19
<https://www.cheetah3d.com/forum/index.php?threads/2588/post-17890>

Ogre Export and normals

Hey everyone, I'm contemplating buying cheetah but while I'm on my demo I want to export some models to Ogre and see how they work for me.  I've started with the Simple ASCII Export example and gotten faces, materials and vertices exporting correctly but I also need to export the normals associated with each vertex.  Is this possible from the scripting api?

Thanks,

Dave

## #2 — tg_jp — 2008-01-19
<https://www.cheetah3d.com/forum/index.php?threads/2588/post-17895>

hi,

yes. you can get a normals of each polygons (faces), and a normals of each vertices that makes face.

here is a sample.

	
	


```
var selectedObj = doc.selectedObj(); // you have to have document object as var 'doc' before.
var core = selectedObj.core();
var pCount = core.polygonCount();

for (var i = 0;i < pCount;i++) {
  var faceNormal = core.normal(i); -> face normal of polygon index.
  var pSize = core.polygonSize(i);
  for (var j =0;j < pSize;j++) {
    var vertexNormal = core.normal(i,j); -> vertex normal of corner index of polgyon index.
  }
}
```


I used this value for Hair.js or several Exporter script. please check it.

regards.

tg_jp, Hiroto.
