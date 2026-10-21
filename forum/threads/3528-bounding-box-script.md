# bounding box script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3528/
- Subforum: script-downloads
- Started by **bugaboo** on 2008-09-26; last post 2008-09-29; 5 posts

## #1 — bugaboo — 2008-09-26
<https://www.cheetah3d.com/forum/index.php?threads/3528/post-24941>

bounding box script

Made my first Cheetah3D script today.

The script will find the bounding box of the selected object. Script lives in the Tools directory. Might be useful for games etc. Collision boxes.

Attachments: [bounding_box.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/5678/)

## #2 — bugaboo — 2008-09-28
<https://www.cheetah3d.com/forum/index.php?threads/3528/post-24982>

Updated the script to make sure the newly created bounding box object is centered on the selected object.

Did some other cleanup.

Think there is a Cheetah bug. If I run my script once, it makes the bounding box object and centers correctly. If I move the selected object somehwere else then it appears the transformatrix the script gets is not updated. So, when you run it again after moving the selected object, Cheetah puts the bounding box in the old place! But for most cases this problably is not a problem.

## #3 — tg_jp — 2008-09-29
<https://www.cheetah3d.com/forum/index.php?threads/3528/post-24988>

hi,

[[QUOTE:  Think there is a Cheetah bug. If I run my script once, it makes the bounding box object and centers correctly. If I move the selected object somehwere else then it appears the transformatrix the scri]]

at line. 186

	
	


```
myobject_core.vertex(i).add(offset);
```


above code just do nothing to myobject_core's vertices. if you want to change vetex's position, ...

	
	


```
var offset = new Vec3D(mtrx.m03, mtrx.m13, mtrx.m23);

myobject_core.setVertex(i, myobject_core.vertex(i).add(offset));
```


In case the selected object is rotated or scaled, generated bounding box is not correct?

regards.

tg_jp, Hiroto.

## #4 — bugaboo — 2008-09-29
<https://www.cheetah3d.com/forum/index.php?threads/3528/post-25011>

I updated the script to transform the new object into the local coordinate system.

Funny, sometimes if you do not optimize then the bounding box will be bigger than expected.

## #5 — bugaboo — 2008-09-29
<https://www.cheetah3d.com/forum/index.php?threads/3528/post-25012>

Hmm, I think to get the transform it has to be in object mode. The other modes will align with the world's axis. Position, scale, rotation  in Polygonobject properties. I was expecting these were set while editing in polygon mode but that is not true.
