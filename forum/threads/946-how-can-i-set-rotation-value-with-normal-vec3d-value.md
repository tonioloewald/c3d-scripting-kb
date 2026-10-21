# How can I set rotation value with normal Vec3D value?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/946/
- Subforum: scripting-general
- Started by **tg_jp** on 2006-10-06; last post 2006-10-12; 7 posts

## #1 — tg_jp — 2006-10-06
<https://www.cheetah3d.com/forum/index.php?threads/946/post-5950>

How can I set rotation value with normal Vec3D value?

Hello.

I am working with my new script, and I have problem unsolved with my skill. 

I want to create polygon with rotation aligned to normal of other polygon.
I have already these values.

* normal Vec3D value of other polygon.
* each polygon info.

I tried to thise code...

	
	


```
// already getting normal for each polygon with normal();
var rot = new Vec3D(Math.atan2(normal.x,normal.z)*180/Math.PI,
                              Math.atan2(normal.y,normal.z)*180/Math.PI,
                              Math.atan2(normal.z,normal.x)*180/Math.PI);
var rot = new Mat4D(ROTATE,rot.x,rot.y,rot.z);
// and creating each polygon using rot.multiply([each vertices]) and addVertex();
```


so, how can I culculate these rotation values with normal Vec3D value?
I am so confusing with matrix and rotation culculation.

please, any advice.

Hiroto, tg_jp

Attachments: [pa_qsample.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1177/)

## #2 — tg_jp — 2006-10-06
<https://www.cheetah3d.com/forum/index.php?threads/946/post-5964>

still unsolved.

hi,

I had mistake before, totally. 
this is new one, but it still does not work.

	
	


```
guideCore :-> from profile object
gVert :-> is center point of polygon i

var norm = guideCore.normal(i);

var nTrans = new Mat4D(TRANSLATE,gVert.x,gVert.y,gVert.z);
var nVert = nTrans.multiply(gVert);
                    
var rx = Math.atan2(nVert.y,nVert.x);
var ry = Math.atan2(nVert.z,nVert.x);
var rz = Math.atan2(nVert.x,nVert.z);
                    
rx = rx*180/Math.PI;
ry = ry*180/Math.PI;
rz = rz*180/Math.PI;
                    
gRot = new Vec3D(rx,ry,rz);
// then I move each vertices by Mat4D(ROTATE, ...)
```


Hiroto, tg_jp

Attachments: [Cheetah3DScreenSnapz002.png](https://www.cheetah3d.com/forum/index.php?attachments/1181/)

## #3 — Martin — 2006-10-08
<https://www.cheetah3d.com/forum/index.php?threads/946/post-5980>

Hi Hiroto,
I haven't tired it but something like that should work:

	
	


```
var theta=Math.acos(nVert.y)*180/Math.PI;
var phi=atan2(nVert.z,nVert.x)*180/Math.PI;

var rot = new Mat4D(ROTATE, phi, theta,0);
```


Bye,
Martin

## #4 — tg_jp — 2006-10-11
<https://www.cheetah3d.com/forum/index.php?threads/946/post-6035>

test code.

Hello, Martin.

thanks for your hints, so kind.

but, I am still missing.

I try to post latest code for someone checking and testing code. actually, still not work correctly and not optimized yet.

test script:http://www.tres-graficos.jp/c3d/Polygon_Array.js.zip

regards.

Hiroto, tg_jp

Attachments: [Cheetah3DScreenSnapz005.png](https://www.cheetah3d.com/forum/index.php?attachments/1200/), [ch_20061011_fsb_cap.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1201/)

Links: http://www.tres-graficos.jp/c3d/Polygon_Array.js.zip

## #5 — Eureka! — 2006-10-11
<https://www.cheetah3d.com/forum/index.php?threads/946/post-6036>

Cool

Hi, 
Very nice script. Cool rabbit, how long did it take to render?
What are your computer specs? That many polygons would really slow it down.

Greg

## #6 — tg_jp — 2006-10-11
<https://www.cheetah3d.com/forum/index.php?threads/946/post-6037>

hi, Greg

render time : MacMini (CoreDuo 1.66 + 2GB memory)
with Ambient Occulusion + HDRI : 6373.33 secs
without Ambient Occulusion : 32.73 secs

that scene is too heavy to manupulate objects in 3d view. but rendering time is not so slow. 

scene info.
polygons: 1521392
triangles: 3042784

regards.

Hiroto, tg_jp

## #7 — Martin — 2006-10-12
<https://www.cheetah3d.com/forum/index.php?threads/946/post-6046>

Hi,
your rabit looks gorgeous.  I will have a look into your script within the next days. Currently I'm a little bit out of time. But it looks like you are quite close to the solution. 

Bye,
Martin
