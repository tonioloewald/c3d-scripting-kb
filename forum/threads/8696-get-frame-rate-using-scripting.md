# get frame rate using scripting

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8696/
- Subforum: scripting-general
- Started by **chris g** on 2012-07-27; last post 2012-07-28; 3 posts

## #1 — chris g — 2012-07-27
<https://www.cheetah3d.com/forum/index.php?threads/8696/post-72244>

get frame rate using scripting

I been searching and having no luck. Is there a way to get the animation frames per second using scripting? And what is the code to do it?

thanks.
-chris

## #2 — podperson — 2012-07-28
<https://www.cheetah3d.com/forum/index.php?threads/8696/post-72263>

I don't see any obvious properties / methods for doing this. It ought to be a document property (or, if Martin plans to allow different takes to have different frame rates in future, a take property).

I modified the good old "document the selected object" script to spit out documentation for the Doc and Doc.currentTake() objects and this is what I got:

Doc Info
editMode(...)
saveToFile(...)
addTake(...)
animPosition(...)
addObject(...)
setCurrentTake(...)
renameTake(...)
root(...)
takeAtIndex(...)
currentTake(...)
activeCamera(...)
takeCount(...)
redrawAll(...)
materialAtIndex(...)
removeTake(...)
render(...)
selectedObject(...)
retainRedrawLock(...)
animationEnd(...)
materialCount(...)
releaseRedrawLock(...)
takeWithName(...)
setAnimPosition(...)
addMaterial(...)
Take Info
previewFrom: 0
name: Take 0
previewTo: 4
length: 10

(I think I'll write a version of this tool that will generate minimalist "documentation" from Cheetah 3d directly for inclusion in the next edition of my book, so you can quickly see what the actual methods and properties of the different objects in C3D are, rather than write a script every time.)

Now, the bad news is that animPosition and animationEnd are both in seconds. The good news is you can set animPosition to anything you like (e.g. I tried setting time to 0.25 in a 6fps animation and it worked perfectly), so a script doesn't really care what the frame rate actually is.

## #3 — chris g — 2012-07-28
<https://www.cheetah3d.com/forum/index.php?threads/8696/post-72269>

Thanks for your response.

I was afraid that there might not be a way to get the fps automatically. I wasn't able to find a property of method, and thought maybe I should ask in case I was looking in the wrong place. 

The script I'm working on needs the frames per second to step through each frame of an animation, since as you pointed out the animPosition method is in seconds. Not a big deal really, just now the script requires a little user input.

And yes, the "document the selected object" script helped immensely.

-chris
