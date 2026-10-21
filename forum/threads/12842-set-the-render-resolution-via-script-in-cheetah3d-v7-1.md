# Set the render resolution via script in Cheetah3D v7.1?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12842/
- Subforum: scripting-general
- Started by **jeffcase** on 2018-04-03; last post 2018-04-10; 2 posts

## #1 — jeffcase — 2018-04-03
<https://www.cheetah3d.com/forum/index.php?threads/12842/post-111389>

Set the render resolution via script in Cheetah3D v7.1?

(this is a duplicate from Script Downloads)

Is there a way to set the render resolution via script in Cheetah3D v7.1?

In previous versions of Cheetah I was using:

var camera = doc.activeCamera();
camera.setParameter("resolutionX", 1920);
camera.setParameter("resolutionY", 1080);

but this no longer seems to change the 'render' resolution.

The markdown info for the active camera returned from "Object Info.js", shows the resolution as set to 1920x1080 after the above is run. But the Renderer properties do not reflect the change. And indeed a render is done as shown in the Renderer properties and not the scripted change.

In previous versions, the render resolution was hooked to the specific camera. In v7 it seems to be independent of the camera and now and hooked to the document??? But I have not found a way to script this on-the-fly as I could in the past. 

Any help would be much appreciated.

TIA,
Jeff

## #2 — Martin — 2018-04-10
<https://www.cheetah3d.com/forum/index.php?threads/12842/post-111455>

The following code does the trick.

	
	


```
doc.currentRenderer().setParameter("resolution", new Vec2D(1920,1080));
```
