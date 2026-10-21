# Make Visible Solo/All.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7106/
- Subforum: script-downloads
- Started by **tg_jp** on 2011-03-30; last post 2013-01-19; 10 posts

## #1 — tg_jp — 2011-03-30
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-58098>

Make Visible Solo/All.js

hello

this is macro script to make only selected object "visible in editor" on, and make all objects "visible in editor" on. place its into ~/Application Support/Cheetah3D/scripts/Macro folder.

I wrote this for my purpose, so these have some limitation. these 2 scripts will reset 'visible in render' info of all objects to On/Off. So, all settings about 'visible in render' of all objects that you changed before execution, will be lost. 

http://www.tres-graficos.jp/blog/files/article.php?id=66

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=66

## #2 — podperson — 2011-03-30
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-58110>

How hard would it be to provide a similar function which would make everything but the current selection "wireframe" or "bounds"?

## #3 — tg_jp — 2011-03-30
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-58123>

hi

yes, I attached customizable version of these macros. please check comment in script file.

regards.

edit: I added 'recursive' flag, for some parameters don't effect hierarchically as not like 'editorVisible'.

tg_jp, Hiroto.

Attachments: [Make Change_set.20110331b.zip](https://www.cheetah3d.com/forum/index.php?attachments/14348/)

## #4 — podperson — 2011-03-31
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-58146>

Thank you!

## #5 — lowpolymatt — 2013-01-15
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-76226>

Hi Hiroto, 

Would it be possible to make this only affect objects in a group?

Also, would it be possible to make all items in a group invisible except one, then toggle which one is visible?

Also, could the visibility be keyed automatically? 

Thanks
Matt

## #6 — tg_jp — 2013-01-16
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-76254>

hi,

try this script.

http://www.tres-graficos.jp/blog/files/article.php?id=55

[[QUOTE:  lowpolymatt said: Hi Hiroto, Also, could the visibility be keyed automatically? Thanks Matt Click to expand... ]]

you meant hot key? or f-curve key?, if it's hot key, you can write custom macro script for your scene.  

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=55

## #7 — lowpolymatt — 2013-01-16
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-76260>

Hey,

What I mean is, I want to be able to keyframe the visibility of the objects.

## #8 — tg_jp — 2013-01-17
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-76275>

Hi,

[[QUOTE:  lowpolymatt said: Hey, What I mean is, I want to be able to keyframe the visibility of the objects. Click to expand... ]]

you can add key for visible in render / visible in editor of mode tag.
please check attached file.

regards.

tg_jp, Hiroto.

Attachments: [modeTag_keyframing.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/18941/)

## #9 — tg_jp — 2013-01-17
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-76287>

hi,

OK. I misunderstood what you meant.

It's available to switch exclusively visibility of object(s) in a group while animation via script. but I think it's also available to separate a object(s) and others by folder, then add f-curve key for these visibility manually. It will be more simple than script approach.  

regards.

tg_jp, Hiroto.

## #10 — tg_jp — 2013-01-19
<https://www.cheetah3d.com/forum/index.php?threads/7106/post-76371>

Hi,

[[QUOTE:  lowpolymatt said: Hey, What I mean is, I want to be able to keyframe the visibility of the objects. Click to expand... ]]

I wrote a script. please check it.

http://www.cheetah3d.com/forum/showthread.php?t=9250

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.com/forum/showthread.php?t=9250
