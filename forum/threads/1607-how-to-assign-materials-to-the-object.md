# How to assign materials to the object?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1607/
- Subforum: scripting-general
- Started by **F.Junichi** on 2007-04-19; last post 2015-03-16; 7 posts

## #1 — F.Junichi — 2007-04-19
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-10362>

How to assign materials to the object?

Hi,

I have a question.
Is there any way to asign material to the object from the script?

I've done so far:

- adding objects to the scene;
- adding all materials to the document;
- adding material tag to my object by using addTagOfType(SHADERTAG);
- How do I tell this TAG to which material to use?

I checked this SHADERTAG's parameterInfo(), but it seems it does not have a parameter like materialIndex...

## #2 — ToddWR — 2007-04-19
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-10390>

check out this script, it might help you

http://www.cheetah3d.de/forum/showthread.php?t=1210

Todd

Links: http://www.cheetah3d.de/forum/showthread.php?t=1210

## #3 — F.Junichi — 2007-04-20
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-10422>

[[QUOTE:  ToddWR said: check out this script, it might help you http://www.cheetah3d.de/forum/showthread.php?t=1210 Todd Click to expand... ]]

Hi,

Thanks Todd, unfortunately I couldn't find the answer from your script.  In your script, I needed to add material a.mov and b.mov to that plane from a script. I guess I'll put my problem to wishlist.

By the way, great script! I put that to my script folder for later use.
Thanks! :icon_thumbup:

## #4 — Martin — 2007-04-25
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-10627>

Hi,
yes that would be indeed something for the wish list. It isn't implemented yet. Sorry.

bye,
Martin

## #5 — aaronparr — 2015-03-11
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-93930>

Is it possible to create materials via script and then assign them via script to an object?

I was looking into this tonight and couldn't get anything to work. Any help would be appreciated. [edit] To clarify: I can make materials just fine via script. Its adding them to an object that is the trick. Materials seem to be their own thing and I can not find a function to add them to an object. I've messed with addchildatindex and the like, but that has not worked for me either because the material is the wrong kind of object.

## #6 — tg_jp — 2015-03-16
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-94078>

hi,

please check this script for accessing material system.

http://www.cheetah3d.com/forum/showthread.php?t=10855

Best

tg_jp, Hiroto.

Links: http://www.cheetah3d.com/forum/showthread.php?t=10855

## #7 — aaronparr — 2015-03-16
<https://www.cheetah3d.com/forum/index.php?threads/1607/post-94087>

thank you. thats a nice script.

I also got this from Martin.

Links: http://www.cheetah3d.com/forum/showpost.php?p=94045&postcount=6
