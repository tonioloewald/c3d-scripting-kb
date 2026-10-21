# Copying objects again

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1381/
- Subforum: scripting-general
- Started by **GuyBrown** on 2007-02-28; last post 2007-02-28; 3 posts

## #1 — GuyBrown — 2007-02-28
<https://www.cheetah3d.com/forum/index.php?threads/1381/post-8751>

Copying objects again

Hi,

I want to script something similar to Chain in C3D that allows objects to be placed along a spline path, but with the option of scaling each copy (so for example, the objects get progressively smaller along the path). 

I've got this working for preset objects (e.g. a ball) but would like to be able to copy any polygon object. How can I do this? I understand that there is no simple way of copying an object in a script, but I can't see an easy way of copying all of the polygons in an object, or the polycore, either. I'm not bothered about copying the material information, just the shape.

Thanks

Guy

## #2 — uncle808us — 2007-02-28
<https://www.cheetah3d.com/forum/index.php?threads/1381/post-8753>

Great idea.

[[QUOTE:  GuyBrown said: Hi, I want to script something similar to Chain in C3D that allows objects to be placed along a spline path, but with the option of scaling each copy (so for example, the objects get p]]

Sorry I can't give you any kind of answer I don't know anything about scripting but this sound like a good way to instance objects along a spline, hope you find your answer.:icon_thumbup:

## #3 — tg_jp — 2007-02-28
<https://www.cheetah3d.com/forum/index.php?threads/1381/post-8757>

Hello

nice idea!.

I think, copyCoreToVertex() function in Point Array.js may be help for this. please check it.

http://www.cheetah3d.de/forum/showthread.php?t=970

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.de/forum/showthread.php?t=970
