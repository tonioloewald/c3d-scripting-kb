# Script & Animation

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3534/
- Subforum: scripting-general
- Started by **MikeE** on 2008-09-28; last post 2009-10-18; 3 posts

## #1 — MikeE — 2008-09-28
<https://www.cheetah3d.com/forum/index.php?threads/3534/post-24964>

Script & Animation

Hey There,

Just wondering if it is still not possible to access and manipulate key frames/animation through script? I found a post from a couple years ago that indicated there was no way to directly access key frames, etc.

There is of course the animationEnd() and setAnimPosition() functions of the Document object. However I would like to actually manipulate the key frames of objects (in this case programmatically delete or move key frames). Is there any way to do this?

Thanks,
-Mike

(Update)

So my issue is that I have some mocap data that I am converting to .fbx and importing into Cheetah3D. It is sampled at a hefty 120 frames per second, which is well over the accuracy and number of frames I need. In fact to clean up some of the animation I need to reduce the number of key frames by 1/4th (leaving every 4th frame, and deleting the rest). This takes it to the number of keys that would be there for a 30 frame per second animation. Right now my only solution is to delete 3/4th of the key frames by hand, and for the whole biped/armeture that's lot of work per animation (so I was trying to automate the deletion through script).

I decided to download the AutoDesk FBX SDK to see if I could program a utility to load the motion capture .fbx, remove the frames, and then export a new file with a reduced frame count. I was successfully able to do this, but when I import the .fbx into Cheetah3D there is a key frame again on every frame of the timeline for every object. To test this I further created a cube in Cheetah3D, and inserted just two key frames, one at time 0, the other 10 or so frames out, I then exported it to .fbx. When I reimport the file there is a key frame created for every frame in the timeline for the take.

Why is Cheetah3D creating these unnecessary key frames instead of only creating key frames from the data in the .fbx file? I suppose this could be a problem with the FBX SDK (assuming Cheetah3D is using that for its .fbx import and export), but this may be worth looking into.

So far I am left with no real option but to clean up thousands of key frames by hand, when I should be able to do this through programming and automation and save myself a lot of time and trouble.

Does anyone have any thoughts on some possible work arounds?

Thanks!

## #2 — DarthSidious05 — 2009-10-07
<https://www.cheetah3d.com/forum/index.php?threads/3534/post-33309>

No idea how to resolve the issue you mention, as I'm unfamiliar with how to script in general. Sounds complex, which might be one reason why this thread hasn't received a response yet.

## #3 — geowar — 2009-10-18
<https://www.cheetah3d.com/forum/index.php?threads/3534/post-34029>

see: <http://www.cheetah3d.de/forum/showthread.php?t=1946> for some info about the Document objects AnimationEnd() and setAnimPosition() functions.
