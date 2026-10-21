# Script REQUEST - one particle per subpath

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10211/
- Subforum: scripting-general
- Started by **Shift Studio** on 2014-02-25; last post 2014-03-06; 6 posts

## #1 — Shift Studio — 2014-02-25
<https://www.cheetah3d.com/forum/index.php?threads/10211/post-85720>

Script REQUEST - one particle per subpath

Hi everyone.

I need to hang a singe 'leaf' at the end of each 'branch' of a 'tree' (its actually not that, but that explains it easily)

I made my branches using splines and sweep creator. The spline that guides the sweep is actually made of many disconnected subpaths.

I thought I was going to use 'particle spline' to hang one 'leaf' at the end of each branch. But particle spline doesn't seem to work that way :frown: 
In fact the particle spline controls seem to really not function in a logical way (anyone care to explain the logic?)

Instead I've been looking for a script solution can't find one that meets all my requirements. If anyone knows one, please direct me.

Requirements:
- one (or more) object (not a single mesh, but one with modifiers possibly children) per spline subpath, and the ability to put it at the end. If the object(s) could be smart folders, that would be even better.

- ability to add a particle tag to control randomness/variation of each object or similar functionality

- ideally nothing needs to be collapsed - because I need to make several different 'trees' by adjusting the 'guide' spline 

If anyone would be so kind, I think it could be a valuable script to many people, and I certainly would appreciate it.

thanks in advance!!
--shift studio

Attachments: [particle-spline.jpg](https://www.cheetah3d.com/forum/index.php?attachments/22469/)

## #2 — tg_jp — 2014-02-25
<https://www.cheetah3d.com/forum/index.php?threads/10211/post-85722>

hi,

I wrote simple one, please check it.

http://www.tres-graficos.jp/blog/files/article.php?id=101

regards.

tg_jp, Hiroto.

Attachments: [ch_20140224_splienTip.jpg](https://www.cheetah3d.com/forum/index.php?attachments/22470/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=101

## #3 — Shift Studio — 2014-02-25
<https://www.cheetah3d.com/forum/index.php?threads/10211/post-85723>

Oh yeah!!!
you just saved my bacon :smile: I mean saved me a lot of painful positioning.

On quick testing it does just what I need.

I'm very pleased - thank you! 
(sent you a donation)

--shift studio.

## #4 — uncle808us — 2014-02-25
<https://www.cheetah3d.com/forum/index.php?threads/10211/post-85729>

@TG_JP   Brilliant Thanks.

Attachments: [SplineTipParticles.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/22477/)

## #5 — ZooHead — 2014-02-25
<https://www.cheetah3d.com/forum/index.php?threads/10211/post-85736>

Very Cool, thanks Hiroto! 
​

## #6 — Pat88 — 2014-03-06
<https://www.cheetah3d.com/forum/index.php?threads/10211/post-85965>

I would say that TG could stand for 'Total Genius' as well as 'Tres Graficos' - will give it a go here, cheers Hiroto :icon_thumbup:
