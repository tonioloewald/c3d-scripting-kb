# Particle Emitter

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7983/
- Subforum: scripting-general
- Started by **Daveroony** on 2011-12-31; last post 2015-02-01; 8 posts

## #1 — Daveroony — 2011-12-31
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-66140>

Particle Emitter

Hi

Does anybody know if the particle emitter works with Hiroto's Bullets script?

I can get particle array to drop objects and bounce off a plane, but not the emitter.

Regards
D

## #2 — tg_jp — 2012-01-01
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-66159>

hello

unfortunately, particle emitter object cannot be used for CheetahBullet yet.
maybe next update.

regards.

tg_jp, Hiroto.

## #3 — Daveroony — 2012-01-01
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-66164>

Ok, thanks for letting me know.

Regards

## #4 — AndyThirtover — 2015-01-31
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-93334>

Is this still the case

I can get objects to bounce, but not when they are used with an emitter.

The emitter does respond to gravity and wing though.

Cheers

Andy

## #5 — frank beckmann — 2015-02-01
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-93358>

I don´t think you can mix Particle/Instancing system and Bullet Dynamics.
How many particles you´re trying to implement into your scene?
http://www.screencast.com/t/f1LXza6A9TN4

Cheers
Frank

Links: http://www.screencast.com/t/f1LXza6A9TN4

## #6 — AndyThirtover — 2015-02-01
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-93359>

Just a bit of ongoing learning really

Frank

I'm working on animations that illustrate how malware gets past some protection and is blocked by others.

It was an idea I was kicking around this w/e that didn't really work, so I went to a single particle and it was fine.

I liked the idea of particles bouncing off relief and looking organic as they go in different directions.

Regards

Andy

Attachments: [Landscape.zip](https://www.cheetah3d.com/forum/index.php?attachments/25871/)

## #7 — frank beckmann — 2015-02-01
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-93360>

Hi Andy.
Just a quick hack: Landscape needs to be "concave" at the rigid body tag. I used separate objects at different placements (no overlapping) with initial velocity and different releasing in time.
Check out the reviewed file.

Cheers
Frank

Attachments: [Landscape Reviewed.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/25872/)

## #8 — AndyThirtover — 2015-02-01
<https://www.cheetah3d.com/forum/index.php?threads/7983/post-93361>

That's pretty much what I was thinking -- Thanks

Frank

  I'll have a play with that and use it for learning ..  

Double Thanks

Andy
