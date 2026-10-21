# Boids.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9461/
- Subforum: script-downloads
- Started by **tg_jp** on 2013-04-05; last post 2014-04-04; 14 posts

## #1 — tg_jp — 2013-04-05
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78086>

Boids.js

hello.

It's a particle script to create boid objects. please check attached .jas file after installing script file.

download: http://www.tres-graficos.jp/blog/files/article.php?id=96

demo movie: http://www.youtube.com/watch?v=z7d8dJXBTf4

regards.

tg_jp, Hiroto.

Attachments: [boid_1.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/19598/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=96, http://www.youtube.com/watch?v=z7d8dJXBTf4

## #2 — bemdesign — 2013-04-05
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78087>

Wow! Just watched the demo movie - this is great!

## #3 — Jeanny — 2013-04-05
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78088>

:smile: Hi Hiroto  

Is this only for rigid body particles or will it work on soft body particles also.

I have a problem of the Hair, Leaf and Cob particles penetrating each other.  

I’ve tried numerous combinations of all the rigid and soft body properties of the hair, leaves and cob and still no solution.  

I don’t know if I’m explaining myself correctly so I’ve attached a jas file to try to demonstrate the problem.  

(Please excuse my messy dysfunctional Corn Cob Man.  With the help of the Forum I am in the process of giving him a total remodeling)

My Best Regards
Jeanny

Attachments: [CCM.jas.png](https://www.cheetah3d.com/forum/index.php?attachments/19599/), [CCM.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/19600/)

## #4 — tg_jp — 2013-04-06
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78101>

Hi

[[QUOTE:  Jeanny said: Is this only for rigid body particles or will it work on soft body particles also. Click to expand... ]]

this script works for any type of particle object. please try it, just for making boids scene though  .

[[QUOTE:  Jeanny said: I have a problem of the Hair, Leaf and Cob particles penetrating each other. I’ve tried numerous combinations of all the rigid and soft body properties of the hair, leaves and cob and st]]

nice model! Chain Creator and Particle Array object copy each objects ( Leaves and Hair ) after calculating physics effect. so you have to find another way to express this scene without Chain and Particle Array. 

regards.

tg_jp, Hiroto

## #5 — Jeanny — 2013-04-06
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78106>

Thanks Hiroto
I appreciate that you took time to examine my model and offer advise. 

 I’m so lost as where to go from here.  Do you have any further advise?  Thought I’d post this as a separate thread and see what advise is offered.

Thanks again Hiroto.  

My Very Best Regards
Jeanny

## #6 — filip c — 2013-04-14
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78266>

Hi Hiroto,

Thanks for this great script, i'll try this as soon as I'm home. 
( unfortunately, I'm not a lot at home this last half year )

## #7 — filip c — 2013-05-03
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-78639>

Hi Hiroto,

I finally managed to create some time to play with this incredible script!
Really superb :icon_thumbup::icon_thumbup::icon_thumbup:

I'm sure this will help me (and others) a lot to make nice animations

## #8 — Rene66 — 2014-04-02
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86507>

The potential of this script seems quite fun - But I can't seem to understand HOW to set it up - my objects just sit there -  - does anyone have a basic setup or .jas file that works so I can more clearly see how to start experimenting? That would be so helpful - cheers

## #9 — frank beckmann — 2014-04-02
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86508>

Hiroto provided an example file in the opening thread. Do you have the script installed as particle script already?

Cheers
Frank

## #10 — Rene66 — 2014-04-02
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86510>

omg - I feel stupid - I did not see the sample file - downloaded and tried to run - I got this error:

line: 75 
error: 'undefined' is not a function (evaluating 'doc.animPosition()')

I tried rebuilding the file from scratch using the sample as a model - and the same error occurs specifically when I drag/drop the Particle array onto the "Base Particle" section of the script properties.

## #11 — tg_jp — 2014-04-03
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86511>

Hi,

thank you for testing this script. I think you are using Cheetah3D 5.8, and this script is not work for that version unfortunately.  

regards.

tg_jp, Hiroto.

## #12 — Pat88 — 2014-04-03
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86528>

Hi Hiroto your sample file runs fine, (Cheeteh 6.3.1) so I tried setting up my own but no success :-(

I copied everything (except the Boids) from my file into your file, all good.

I copied just your Boids into my file, added my bits, all good.

In the file attached (working) the Hiroto Boids runs fine, but if you delete and try to run my version, no good, although I think I set it up OK????

Attachments: [Boids Trial.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/22821/)

## #13 — tg_jp — 2014-04-04
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86533>

Hi, thank you.

'timer' parameter must be recorded to update at each frame for animation. 
please check your version. it will work after recording 'timer' parameter.

regards.

tg_jp, Hiroto.

## #14 — Pat88 — 2014-04-04
<https://www.cheetah3d.com/forum/index.php?threads/9461/post-86541>

Thank you Hiroto, I knew I'd missed a step but could not figure it out, all works OK now. 

Thanks again, Pat
