# Curls (splines)

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8033/
- Subforum: script-downloads
- Started by **filip c** on 2012-01-19; last post 2012-01-20; 10 posts

## #1 — filip c — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66722>

Curls (splines)

Hi everybody,

I made an attempt to create a script which generates curly splines and more... (branches,...)

In my opinion, the script looks at its best, when used in combination with the sweep creator (scale set to zero). I hope you guys have fun with it and don't hesitate to make modifications/improvements to the script. 

I still need to do some tweaking, be sure not to exaggerate, when setting parameters.

Since my programming knowledge is extremely poor, I had to rely a lot on Hirotos kindness, wherefore I would like to thank him!

I'll try to post some examples soon... (I would be nice if you share yours)

Place the script into:.../Library/Application Support/Cheetah 3D/Scripts/Splineobj 

Have fun!
Filip

EDDIT: I added offset parameters...

Attachments: [Schermafbeelding 2012-01-19 om 17.58.24.png](https://www.cheetah3d.com/forum/index.php?attachments/16373/), [Curls.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/16375/)

## #2 — frank beckmann — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66756>

Hi Filip.
That is a funny one! Thanks for sharing. :icon_thumbup: :icon_thumbup: 

Cheers
Frank

## #3 — filip c — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66758>

You're welcome :smile:

## #4 — frank beckmann — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66760>

I noticed some strange behavior: when switching between Safari and Cheetah3d back+forth the output of the script alters slightly in 3d view without changing any values. Just by clicking the open Cheetah3d window to make it active. Anyone else?

Cheers
Frank

## #5 — filip c — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66762>

[[QUOTE:  frank beckmann said: I noticed some strange behavior: when switching between Safari and Cheetah3d back+forth the output of the script alters slightly in 3d view without changing any values. Just by c]]
Thanks Frank, I didn't notice that.

Programming is very new for me and I use a lot of trial and error, most of the time I don't even know what I'm doing, so I can't help you there... :redface:

What I'm planning to do is to make the randomizing parameters less sensitive, maybe that fixes some issues...

I will also try to include more horizontal bending options...

Kind regards,
Filip

## #6 — frank beckmann — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66763>

[[QUOTE:  filip c said: Thanks Frank, I didn't notice that. Programming is very new for me and I use a lot of trial and error, most of the time I don't even know what I'm doing, so I can't help you there... :r]]

I´m not sure if it´s the script or a driver- or redraw-bug or what. Every time I return to the Cheetah3d screen with an open scene with your script the shape randomizes - but all values don´t. I´m just confused about that behavior not about your script.  

Cheers
Frank

## #7 — Francois — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66764>

[[QUOTE:  frank beckmann said: I noticed some strange behavior: when switching between Safari and Cheetah3d back+forth the output of the script alters slightly in 3d view without changing any values. Just by c]]

I have not seen the problem so far. Will keep trying a little more after lunch.

Oups : Just saw it too with several branches. Back to 1 branch and still have it. So, I guess it must be some other parameters.

## #8 — frank beckmann — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66766>

[[QUOTE:  Francois said: Oups : Just saw it too with several branches. Back to 1 branch and still have it. So, I guess it must be some other parameters. Click to expand... ]]
Did you check with 5.8 ?

## #9 — filip c — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66767>

I didn't manage to replicate the problem, but does it still occur when all random parameters (randomize length, randomize bend origin and randomize bend end) are set to 0?

## #10 — Francois — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8033/post-66769>

[[QUOTE:  frank beckmann said: Did you check with 5.8 ? Click to expand... ]]

That was with 6.x as 5.8 was the after lunch desert ... and I don't seem to be able to reproduce it. Looks like something for Martin.
