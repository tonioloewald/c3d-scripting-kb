# Bevel.js - test version

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2575/
- Subforum: script-downloads
- Started by **tg_jp** on 2008-01-17; last post 2012-07-11; 13 posts

## #1 — tg_jp — 2008-01-17
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17803>

Bevel.js - test version

hi,

still test version. it has many problems (speed for big mesh, rounded corners, etc..), but in some case it may be useful.
it's a polygon script, so please place it into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=35

please test it, and let me know some problem or suggestions. I'll fix it.

[edit]
if selected edge is CREASE, bevel's round is flipped. see attached image.
[/edit]

update 20120711: bug fixed for Cheetah3D 6.0.

regards.

tg_jp, Hiroto

Attachments: [Cheetah3DScreenSnapz005.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3829/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=35

## #2 — podperson — 2008-01-17
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17837>

Works nicely on single edges ... not so well on corners with detailed bevels (but I'm sure you knew that). Very promising

Attachments: [Picture 2.png](https://www.cheetah3d.com/forum/index.php?attachments/3845/), [Picture 3.png](https://www.cheetah3d.com/forum/index.php?attachments/3846/)

## #3 — ToddWR — 2008-01-17
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17854>

good script so far. I thought I had posted a round box script a while ago. I seems like I didn't, so here it is now
http://cheetah3d.de/forum/showthread.php?t=2581
maybe it will useful maybe not

Todd

Links: http://cheetah3d.de/forum/showthread.php?t=2581

## #4 — tg_jp — 2008-01-18
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17865>

> podperson

thank you for your comment and report. I am trying to fix detailed edge problems. I have some ideas, but I am not sure if it work or not... 

> Todd

thanks. your code is very helpful anytime. I already checked Round Box.js when I wrote prototype. 

toDo list (or not implemented yet list)

 fixing polygon break problem with some selected edge pattern.
 smooth rounded N-gon corner when detail > 1
 UV retaining
 optimization for speed

regards.

tg_jp, Hiroto

## #5 — Meshman — 2008-01-19
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17889>

Fantastic Hiroto, thanks a lot!

Not perfect yet but still very useful as is.  Any chance you can avoid non-quads?

## #6 — tg_jp — 2008-01-19
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17897>

thanks. 

[[QUOTE:  Not perfect yet but still very useful as is. Any chance you can avoid non-quads? Click to expand... ]]

what did you mean 'avoid non-quads?' all generated polygons by Bevel.js will be triangles? or quads? not N-gon? Umm, it depends on original mesh.

regards.

tg_jp, Hiroto

## #7 — Meshman — 2008-01-20
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-17918>

[[QUOTE:  tg_jp said: thanks. what did you mean 'avoid non-quads?' all generated polygons by Bevel.js will be triangles? or quads? not N-gon? Umm, it depends on original mesh. regards. tg_jp, Hiroto Click to e]]

Hi Hiroto, I should have said quads only i.e. is it possible to avoid triangle?  I hate triangles

## #8 — FLGB — 2008-01-30
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-18169>

Great work! Can't wait to have it directly buit in in next cheetah's release!

## #9 — Shift Studio — 2012-07-10
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-71918>

Is there a working version of this script for C3D v6.0?

As it stands now I get these errors (see below)

Thanks, Shift Studio.

Attachments: [c3d-error-message1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/17588/), [c3d-error-message2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/17589/)

## #10 — frank beckmann — 2012-07-10
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-71919>

For what reason you need this script? We have now a decent bevel tool.

Cheers
Frank

## #11 — Shift Studio — 2012-07-10
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-71921>

[[QUOTE:  frank beckmann said: For what reason you need this script? We have now a decent bevel tool. Cheers Frank Click to expand... ]]

Hi Frank, please see a new thread regarding my bevel troubles.
http://www.cheetah3d.com/forum/showthread.php?t=8654

Thanks, 
--Shift Studio

Links: http://www.cheetah3d.com/forum/showthread.php?t=8654

## #12 — tg_jp — 2012-07-11
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-71930>

hi, thank you for trying my script.

I have fixed that problem. so please download again, and try it.

regards.

tg_jp, Hiroto.

## #13 — Shift Studio — 2012-07-11
<https://www.cheetah3d.com/forum/index.php?threads/2575/post-71931>

[[QUOTE:  tg_jp said: hi, thank you for trying my script. I have fixed that problem. so please download again, and try it. regards. tg_jp, Hiroto. Click to expand... ]]

Hey, that works for me!
(it took me a bit of experimenting to get it to do what I wanted)
Thanks for the update.

--Shift Studio.
