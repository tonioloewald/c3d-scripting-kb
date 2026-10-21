# Removing Keyframes with a Script.

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5713/
- Subforum: scripting-general
- Started by **ChrisGarrett** on 2010-05-06; last post 2019-05-07; 7 posts

## #1 — ChrisGarrett — 2010-05-06
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-42108>

Removing Keyframes with a Script.

Hi Everyone,

Now I'm not a scripting person but I would like to know if it is possible to write a script that would remove all keyframes from all objects in the scene that have a particular tag.  It is easy enough to add a custom tag to each object that I want to remove keyframes from, I could use Martin's Physics.JS example for that, but could someone tell me if it is possible to write a script that would remove the keyframes?

Regards

Chris

## #2 — Martin — 2010-05-07
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-42132>

Hi,
f-curves and therefore keys can't be accesses via script yet. But that is on my todo list.

Kind regards,
Martin

## #3 — ChrisGarrett — 2010-05-07
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-42135>

Thanks Martin,

I think I've solved my issue now.  I thought I needed to use Joints (Bones) to use the inverse kinematics tag, but after experimenting this morning I've again learned something new that the IK tag will work on all objects in a parent hierarchy so I no longer need to use bones.

Chris

## #4 — Somian — 2019-04-05
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-115794>

Sometimes when I get a file from someone everything has a lot of keyframes and I can't edit anything because re-opening the file will reset everything to whatever value the first keyframe was at. Is there a way to remove all keyframes?

EDIT:

this seems to work

https://www.cheetah3d.com/forum/index.php?threads/3356/

Links: https://www.cheetah3d.com/forum/index.php?threads/3356/

## #5 — tg_jp — 2019-05-07
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-116118>

Hello, maybe too late.

I updated 'F-Curve Utility.js' with adding 'remove keyframe' function. I hope it will help.

http://tres-graficos.jp/blog/files/article.php?id=84

Best

tg_jp, Hiroto

Links: http://tres-graficos.jp/blog/files/article.php?id=84

## #6 — ZooHead — 2019-05-07
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-116120>

Many thanks, this is a great addition.

## #7 — frank beckmann — 2019-05-07
<https://www.cheetah3d.com/forum/index.php?threads/5713/post-116127>

Thanks for the enhanced script Hiroto. Works great! 

Cheers
Frank
