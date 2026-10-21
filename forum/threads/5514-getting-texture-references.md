# Getting Texture References

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5514/
- Subforum: scripting-general
- Started by **PurpleLizzard** on 2010-03-15; last post 2010-03-18; 2 posts

## #1 — PurpleLizzard — 2010-03-15
<https://www.cheetah3d.com/forum/index.php?threads/5514/post-40304>

Getting Texture References

Hi,

I am trying to make a script that prints out to the console all of the image files referenced by the materials in that scene. I have a script that just prints out the colorMap() property of each material (if it has one), but I would eventually like to make it so it looked at all of the nodes in the shader and printed out all of the image nodes. This is impossible right now, correct?

Thanks

Attachments: [Print Texture References.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/10071/)

## #2 — tg_jp — 2010-03-18
<https://www.cheetah3d.com/forum/index.php?threads/5514/post-40492>

hello

[[QUOTE:  This is impossible right now, correct? Click to expand... ]]

yes. unfortunately, after changing material system for 5.0 update, script system can't access material paramters. we have to wait sciript update for accessing material stuff.

regards.

tg_jp, Hiroto.
