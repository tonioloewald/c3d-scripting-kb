# CheetahToAE.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7904/
- Subforum: script-downloads
- Started by **tg_jp** on 2011-11-22; last post 2014-04-03; 6 posts

## #1 — tg_jp — 2011-11-22
<https://www.cheetah3d.com/forum/index.php?threads/7904/post-65272>

CheetahToAE.js

hello

It's a tool script to make .jsx for creating new composite of AfterEffects from Cheetah3D's scene with animation.

http://www.tres-graficos.jp/blog/files/article.php?id=78

here is a demo movie.

http://www.youtube.com/watch?v=Oyzr4xOa43w

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=78, http://www.youtube.com/watch?v=Oyzr4xOa43w

## #2 — Martin — 2011-11-24
<https://www.cheetah3d.com/forum/index.php?threads/7904/post-65317>

Hi Hiroto,
wow, that is really cool. I was often ask about AfterEffects integration but I never really knew how to do it. And now you've written a script for it. Very very nice.:smile: :smile: 

Thank you very much.:smile: 

Kind regards
Martin

## #3 — ozzymandiaas — 2011-12-10
<https://www.cheetah3d.com/forum/index.php?threads/7904/post-65661>

tg_jp:

Thank you for yet another stellar script! I was literally on the verge of what was going to be a cheetah to after effects motion tracking nightmare and I just tested this script and it looks like you may have given me a lot of my life back.

Thanks!

## #4 — crgreen — 2014-03-30
<https://www.cheetah3d.com/forum/index.php?threads/7904/post-86450>

Hi Hiroto.

Have you ever worked on doing a script that goes in the other direction (AEtoCheetah)? I realize this means working with a scripted export from AE, but that is pretty trivial (and in fact has been done a number of times by myself and others, most notably Paul Tuersley).

I personally would love to be able to animate a camera (in fact, I am only interested in a camera) in AE and bring it into Cheetah.

-cg

[[QUOTE:  tg_jp said: hello It's a tool script to make .jsx for creating new composite of AfterEffects from Cheetah3D's scene with animation. [ ... ] tg_jp, Hiroto. Click to expand... ]]

## #5 — tg_jp — 2014-04-02
<https://www.cheetah3d.com/forum/index.php?threads/7904/post-86490>

hi

I've just written new script for import AfterEffect scene. please check attached file. it's a tool script, that can import .ms file ( 3dsMax script ) to Cheetah3D.
you can create .ms file from AfterEffect with AE3D_Export.jsx.

http://aenhancers.com/viewtopic.php?f=3&t=991&start=60

p.s. my web site is currently down ( tres-graficos.jp ), I missed domain renewal. please don't access for a short while.   It's back again.  

regards.

tg_jp, Hiroto

Attachments: [MS_Importer.js_20140402.zip](https://www.cheetah3d.com/forum/index.php?attachments/22794/)

Links: http://aenhancers.com/viewtopic.php?f=3&t=991&start=60

## #6 — crgreen — 2014-04-03
<https://www.cheetah3d.com/forum/index.php?threads/7904/post-86525>

Huh! Well that's a good solution! Thanks, Hiroto. I'll try it out soon.

-cg

edit - update:

My first test with the script was a big failure, but now I have to go to work and don't have time to work out the problems. That AE->ms script is very old; it has some basic ExtendScript problems (old commands that no longer work), but those are minor compared to whatever is causing the problems I saw, which include rotation values that are completely off (looks like "gimble lock" issues to me), [[edit] there are no framerate problems]. I'll have time to look closely at this within the next few days. I hope I can help. It may have to wait until this weekend. I appreciate you submitting a version 1! I'll determine whether or not the ms export is to blame, in which case I might write a different export that may be easier to work with. It seems to me that since you have the routines for export to AE, a reverse routine could work with a simpler set of values exported from AE.
Thanks again
-cg

[[QUOTE:  tg_jp said: hi I've just written new script for import AfterEffect scene. please check attached file. it's a tool script, that can import .ms file ( 3dsMax script ) to Cheetah3D. you can create .ms f]]
