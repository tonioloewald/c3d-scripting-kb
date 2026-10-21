# Mirror PolygonObjects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6604/
- Subforum: script-downloads
- Started by **Herb** on 2010-12-01; last post 2016-08-09; 6 posts

## #1 — Herb — 2010-12-01
<https://www.cheetah3d.com/forum/index.php?threads/6604/post-52345>

Mirror PolygonObjects

Hi all,
maybe you can profit from this script that mirrors the polygon childs attached to it.
Maybe I missed some feature of standard C3D but to my knowledge, there is no tool to mirror objects at a freely chosen plane. As I found this to be useful, I wrote a polygon script to perform the task.
-Three things to add:
1. I did not manage to transfer the materials to the mirrored objects. Maybe somebody knows how to do it.
2. It looks like the function Vec3D.dot does not work as described (costed me a lot of time): The function - as I experienced it - does not return a number as described in the help but a vector with all components equal?:evil:
3. A question that came up: Is there or why isn't there a possiblitity to fill a Math4D matrix in a "for loop"? As far as I understood you have to address all the elements (m00 ... ) explicitly in your code or write a special function -  it is not an array but an object with 16 numbers declared as properties?:?:

Herbert

Attachments: [mirror.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13062/), [Mirror_Poly.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/13063/)

## #2 — frank beckmann — 2010-12-01
<https://www.cheetah3d.com/forum/index.php?threads/6604/post-52348>

Hi Herbert.
Is there a main difference between your script and the one Hiroto published here?
http://www.cheetah3d.com/forum/showthread.php?t=1448
There is also the material missing at the mirrored objects.

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showthread.php?t=1448

## #3 — tg_jp — 2010-12-01
<https://www.cheetah3d.com/forum/index.php?threads/6604/post-52355>

Hi, 

nice script. It's a sysmetry creator for multi polygon objects. :smile: 

[[QUOTE:  Herb said: Hi all, maybe you can profit from this script that mirrors the polygon childs attached to it. Maybe I missed some feature of standard C3D but to my knowledge, there is no tool to mirror ob]]

1> Asigning materials APIs still are missing. we have to wait for implimentation. 

2> I think so. please check it. 

3> you can use [] syntax to access object's properties. so below code will work.

	
	


```js
var mat = new Mat4d();

for ( var i in mat ) {
  if (typeof( mat[i] ) != "function" ) mat[i] = 0.1; // all properties set to 0.1;
}
```


BTW, I am guessing you looked my old script, now I think it's better that setSmooth's code will be contained in first part of buildObject(), so you can delete 'set smooth button', same work as build-in polygon object.  please check my recent polygon script like cHair.js.

regards.

tg_jp, Hiroto.

## #4 — Herb — 2010-12-02
<https://www.cheetah3d.com/forum/index.php?threads/6604/post-52363>

Hi Frank, hi Hiroto,
it is, as Hiroto discribes:
Instead of using 10 symmetry creators with same coordinates/orientation, there is only one. If, during the design process, I want an additional object to be mirrored, I just drop it. Then, tweaking the location/orientation of the symmetry plane has to be done only once for all objects.

To my question 3)
I considered the matrix to be a matrix and tried " mat [j] " - and failed:frown:.

and last: Yes, it is yours (Hiroto) and Todd's scripts that I always use as references (suggested modification implemented).

Herbert

Attachments: [Mirror_Poly.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/13066/)

## #5 — frank beckmann — 2010-12-02
<https://www.cheetah3d.com/forum/index.php?threads/6604/post-52365>

[[QUOTE:  Herb said: it is, as Hiroto discribes: Instead of using 10 symmetry creators with same coordinates/orientation, there is only one. If, during the design process, I want an additional object to be mir]]
Clever! :icon_thumbup: 
Thank you.

Cheers
Frank

## #6 — uncle808us — 2016-08-09
<https://www.cheetah3d.com/forum/index.php?threads/6604/post-102561>

[[QUOTE:  Herb said: Hi all, maybe you can profit from this script that mirrors the polygon childs attached to it. Maybe I missed some feature of standard C3D but to my knowledge, there is no tool to mirror ob]]

IS this a tool script?
