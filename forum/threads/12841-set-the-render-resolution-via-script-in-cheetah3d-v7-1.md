# Set the render resolution via script in Cheetah3D v7.1

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12841/
- Subforum: script-downloads
- Started by **jeffcase** on 2018-04-01; last post 2018-04-04; 3 posts

## #1 — jeffcase — 2018-04-01
<https://www.cheetah3d.com/forum/index.php?threads/12841/post-111384>

Set the render resolution via script in Cheetah3D v7.1

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

## #2 — Swizl — 2018-04-03
<https://www.cheetah3d.com/forum/index.php?threads/12841/post-111391>

I had the same issue a few years ago updating my camera script for the new v7 render engines. Martin and podperson helped me sort it out.

The forum thread here that may help:
https://www.cheetah3d.com/forum/showthread.php?t=10025&page=3&highlight=camera

Links: https://www.cheetah3d.com/forum/showthread.php?t=10025&page=3&highlight=camera

## #3 — jeffcase — 2018-04-04
<https://www.cheetah3d.com/forum/index.php?threads/12841/post-111394>

Thanks Swizl. The snippets from that post were most useful.
