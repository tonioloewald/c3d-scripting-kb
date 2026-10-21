# Pivot Helper.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10363/
- Subforum: script-downloads
- Started by **tg_jp** on 2014-04-17; last post 2014-10-29; 5 posts

## #1 — tg_jp — 2014-04-17
<https://www.cheetah3d.com/forum/index.php?threads/10363/post-86970>

Pivot Helper.js

hello

It's a tool script to set pivot value for selected object / and all children of selected object / all objects in scene. each functions are almost same as 'Burn Transform'.

download: http://www.tres-graficos.jp/blog/files/article.php?id=104

Best

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=104

## #2 — wyattbiker — 2014-10-27
<https://www.cheetah3d.com/forum/index.php?threads/10363/post-91109>

Does not do anything when I run Pivot Helper

I copied the js file in the folder. I then create a cube and move away the pivot point. While pivot still selected, I select the Pivot Helper from tools menu but nothing happens.

Any idea?

## #3 — frank beckmann — 2014-10-28
<https://www.cheetah3d.com/forum/index.php?threads/10363/post-91120>

Which folder exactly you put it in?

Cheers
Frank

## #4 — wyattbiker — 2014-10-29
<https://www.cheetah3d.com/forum/index.php?threads/10363/post-91121>

~/Library/Application Support/Cheetah3D/Scripts/Tool

It shows up on the scripts menu.

## #5 — Rene66 — 2014-10-29
<https://www.cheetah3d.com/forum/index.php?threads/10363/post-91124>

[[QUOTE:  wyattbiker said: I then create a cube and move away the pivot point ...I select the Pivot Helper from tools menu but nothing happens. Any idea? Click to expand... ]]

You have to move the pivot BEFORE calling the script - then you can hit "freeze" and your new pivot point will be established

EDIT: I did more testing - I may not know what I'm talking about - not sure what "freeze" does - but "reset" & "center" work great for restoring the pivot
