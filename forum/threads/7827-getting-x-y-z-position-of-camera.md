# Getting x,y,z position of Camera

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7827/
- Subforum: scripting-general
- Started by **Ephesian** on 2011-10-28; last post 2011-10-29; 2 posts

## #1 — Ephesian — 2011-10-28
<https://www.cheetah3d.com/forum/index.php?threads/7827/post-64716>

Getting x,y,z position of Camera

Hi

Having a play with some scripting and got stuck with trying to understand how I get the coordinates of the camera.

I am trying 

var selectedObj = doc.activeCamera();
var core = selectedObj.core();

var camX = core.vertex (0); or core.vertex(x)
var camY = core.vertex (?.y);
car camZ = core.vertex (?.z);

but I get -> error: 'undefined' is not an object (evaluating 'core.vertex')

does anybody know what parameters I can get from core, I'd also like the 
scale and other parameters.

Graham

## #2 — tg_jp — 2011-10-29
<https://www.cheetah3d.com/forum/index.php?threads/7827/post-64745>

hi

try this for getting active camera position.

	
	


```
var cam = doc.activeCamera();

var pos = cam.getParameter("position");

print( 'camera position:' + pos.x.toFixed(3) + ',' + pos.y.toFixed(3) +  ',' + pos.z.toFixed(3) );
```


if you want to manipulate polygon/spline/particle objects, you have to get 'core' object by core() function from these objects.

but, you just want getting object's position/rotation/scale or other paramters, you can access those parameters by getParameter("[parameter name you want to access]") / setParameter("[parameter name you want to access").

regards.

tg_jp, Hiroto.
