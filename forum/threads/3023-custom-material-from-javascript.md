# Custom material from javascript ?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3023/
- Subforum: scripting-general
- Started by **Max_B** on 2008-04-29; last post 2008-05-04; 2 posts

## #1 — Max_B — 2008-04-29
<https://www.cheetah3d.com/forum/index.php?threads/3023/post-21183>

Custom material from javascript ?

I was pretty sure I saw somewhere that custom material can be added trough javascript.
Now that i'm looking at this , I don't find it anymore.
I found an old thread regarding material plug is and API not released.
Is there something, somewhere on this subject?

## #2 — Martin — 2008-05-04
<https://www.cheetah3d.com/forum/index.php?threads/3023/post-21400>

Hi,
you can add materials with the "addMaterial" function of the Document class. Unluckily you can't assign materials to objects with scripting yet. That functionality is still missing.

Bye,
Martin
