# Taper Sweep.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4029/
- Subforum: script-downloads
- Started by **tg_jp** on 2009-03-25; last post 2010-01-30; 7 posts

## #1 — tg_jp — 2009-03-25
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-28038>

Taper Sweep.js

hello

after reading this thread.
http://www.cheetah3d.de/forum/showthread.php?t=4025

I made this script. it's polygon script, so please place it into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder.

download-> http://www.tres-graficos.jp/blog/files/article.php?id=46

it's almost same as Sweep Creator, but ..
if this object has 3rd child spline object, it uses it as a x/y scale parameter of profile spline.
if this object has also 4th child spline object, it uses the 3rd as y scale parameter, and the 4th as a x scale parameter of profile spline.

and check attached sample scene file, ( install script first, before open sample jas file. ) 

updated_20090326: UV coord added, fixed a flip bug with closed path spline.
updated_20090326b: fixed a flip bug with closed path spline, and still has a flip problem.  
updated_20090330c: oscillation option added. some bugs fixed.  
updated_20090407: fixed bug when it's used with subdiv mod.
updated_20100130: fixed bug for 5.2+.

demo movie (YOUTUBE): -> http://www.youtube.com/watch?v=-53_Y27qIQs

regards.

tg_jp, Hiroto

Attachments: [ch_20090325_taperSweep_ss.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6440/), [TaperSweep_sample.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/6441/)

Links: http://www.cheetah3d.de/forum/showthread.php?t=4025, http://www.tres-graficos.jp/blog/files/article.php?id=46, http://www.youtube.com/watch?v=-53_Y27qIQs

## #2 — luke Bocchinelli — 2009-03-30
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-28199>

You are a real asset

Dear tg_jp 

I just wanted to say that I for one really appriciate all the great scripting you do for this program. On a few occasions I have been tasked with odd problems, your scripts have really got me out of a hole.

So, I guess I speak for most of the forum here. You are a real star and your efforts do not go unoticed. 

I would recommend that you have a paypal donate button on your site for every download, I would certainly donate.

People like you are very rare

Best regards

Luke

## #3 — tg_jp — 2009-03-31
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-28202>

Hello, Luke

thank you for your comment, words so nice. 

I like Cheetah3D scripting system so much. it's very powerful, easy to learn, and very fun to use.

just, I want to say thanks so much to Martin. 
I have learned a lot of about 3D graphics with your software, and now I am still learning.

regards.

tg_jp, Hiroto

## #4 — gaz954 — 2009-04-01
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-28233>

Thanks so much !  really appreciate your work!

## #5 — SurfingAlien — 2010-01-30
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-38332>

Hi!
I tried to use this today but I'm afraid it's broken in 5.x? (tried both with 5.2 and 5.3b1)

thank you,
Alessandro

## #6 — tg_jp — 2010-01-30
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-38335>

hi, thanks you for reporting. as you wrote, it's common bug fro 5.2+. 

I just updated it, please download it again adn replace it.

http://www.tres-graficos.jp/blog/files/article.php?id=46

thanks.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=46

## #7 — SurfingAlien — 2010-01-30
<https://www.cheetah3d.com/forum/index.php?threads/4029/post-38337>

hey hiroto,
at the speed of light :icon_thumbup: 

works as expected now, thank you!

cheers,
Alessandro
