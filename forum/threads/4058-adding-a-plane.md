# Adding a Plane

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4058/
- Subforum: script-downloads
- Started by **alvordr** on 2009-04-02; last post 2009-04-03; 3 posts

## #1 — alvordr — 2009-04-02
<https://www.cheetah3d.com/forum/index.php?threads/4058/post-28252>

Adding a Plane

I'm trying to create a script to add a plane to the scene.  I can set the name and the basic width and height for the UI.  However, I can't get the object created on the scene.  Can anyone assist?  

I'm barely understanding the scripting engine.  I can tell that I need to buildObject() and put in that function some kind of addVertex or Vec2D and determine the two dimensions necessary.

Thanks.

## #2 — tg_jp — 2009-04-02
<https://www.cheetah3d.com/forum/index.php?threads/4058/post-28262>

hello

what type of script do you want to make? Macro, Tool, or Polygon?
only Polygon script type requires buildObj() function.

	
	


```js
//Macro
function main (doc) { // automatically called with document object.
}
//Tool
function buildUI(tool) { // called with tool object itself when tool is selected.
}
//Polygon
function buildUI(obj) { // called automatically when added to scene
}
funciton buildObject(obj) { // called automatically when object is updated
}
```


please check another scripts and modify it, and you can see how it works.  

about creation code for plane,
if you want to make parametric 'Plane' object.

	
	


```
var doc; // you have document object already.
var plane = doc.addObject(PLANE);
```


if you want it as raw polygon object.

	
	


```
var doc; // you have document object already.
var obj = doc.addObject(POLYGONOBJ); // polygon object
var width_half = 20;
var depth_half = 20;
var core = obj.core();
core.addPolygon(4, false, [new Vec3D( width_half, 0,  depth_half),
                                    new Vec3D(-width_half, 0,  depth_half), 
                                    new Vec3D(-width_half, 0, -depth_half), 
                                    new Vec3D( width_half, 0, -depth_half)]);
```


if you want it as polygon script, a code will be.

	
	


```js
function buildUI(obj) {
	obj.setParameter("name", "Plane");
	
	obj.addParameterSelector("axis",["x","y","z"],true,true);
	obj.addParameterFloat("width",0.5,0,1000,true,true);
	obj.addParameterFloat("depth",0.5,0,1000,true,true);
}
function buildObject(obj) {
	var width = obj.getParameter("width");
	var depth = obj.getParameter("depth");
	var axis = obj.getParameter("axis");
	
	var getVec;
	switch (parseInt(axis)) {
		case 0:
			getVec = function(w, d) { return new Vec3D(0, w, d); };
			break;
		case 1:
			getVec = function(w, d) { return new Vec3D(w, 0, d); };
			break;
		case 2:
		default:
			getVec = function(w, d) { return new Vec3D(w, d, 0); };
			break;
	}
	
	// make polygon
	var core = obj.core();
	var v = new Array;
	
	v[0] = core.addVertex(false, getVec( width /  2, depth /  2) );
	v[1] = core.addVertex(false, getVec( width / -2, depth /  2) );
	v[2] = core.addVertex(false, getVec( width / -2, depth / -2) );
	v[3] = core.addVertex(false, getVec( width /  2, depth / -2) );
	
	var pi = core.addIndexPolygon(4, v);
	
	// if you want UV coord.
	var u = new Array;
	
	u[0] = new Vec4D( 1,  1, 0, 0); // UV1.u, UV1.v, UV2.u, UV2.v
	u[1] = new Vec4D( 0,  1, 0, 0);
	u[2] = new Vec4D( 0,  0, 0, 0);
	u[3] = new Vec4D( 1,  0, 0, 0);
	
	for (var i = 0;i < u.length; i++) {
		core.setUVCoord(pi, i, u[i]);
	}
}
```


regards.

tg_jp, Hiroto

## #3 — alvordr — 2009-04-03
<https://www.cheetah3d.com/forum/index.php?threads/4058/post-28264>

Thank you very much for your help.  I'll have to take a look at this.  It still seems a bit over my head, at the moment, but I'm sure I'll pick it up at some point.  My big concern, right now, is to get a simple plane on the viewport.  I looked at the code in the help file and saw Plain (not sure why it's spelled that way), but having used it in the code, the compiler stated it wasn't a recognized term.
