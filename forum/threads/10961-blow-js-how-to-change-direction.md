# Blow.js -- how to change direction?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10961/
- Subforum: scripting-general
- Started by **AndyThirtover** on 2014-12-24; last post 2014-12-30; 4 posts

## #1 — AndyThirtover — 2014-12-24
<https://www.cheetah3d.com/forum/index.php?threads/10961/post-92600>

Blow.js -- how to change direction?

Dearest Forum.

I've got Blow.js to work quite successfully.   However I've found that the starting point for the explosion expansion seems to be set by the object on which the script is working.

I'd like to change the position of the epicentre.  So far it seems that the epicentre is the first instance of the origin of the original object.  If I shift the origin around then the epicentre stays in the same place.

I've had a look at the code, and as far as I can see, the epicentre is set by pos var x,y,z -- However changing these seems to change the amplitude of force in that direction.  I've attached some screenie to show these being changed and the effect.

Would appreciate any pointers, will continue to investigate on this nice quiet morning.

Cheers  Andy

(PS I made a donation for the scripts

Attachments: [Screen Shot 2014-12-24 at 09.42.45.png](https://www.cheetah3d.com/forum/index.php?attachments/25519/), [Screen Shot 2014-12-24 at 09.43.13.png](https://www.cheetah3d.com/forum/index.php?attachments/25520/), [Screen Shot 2014-12-24 at 09.45.55.png](https://www.cheetah3d.com/forum/index.php?attachments/25521/)

## #2 — frank beckmann — 2014-12-24
<https://www.cheetah3d.com/forum/index.php?threads/10961/post-92603>

I think it depends on the origin (pivot) point of the text-object:

Cheers
Frank

Attachments: [BlowFromCenter.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/25522/)

## #3 — AndyThirtover — 2014-12-24
<https://www.cheetah3d.com/forum/index.php?threads/10961/post-92604>

Thanks --- Got It

Thanks Frank ..

 ... I was moving the Extrude not the Text.

  So +1 on the Test and -1 on the Blow and the epicentre is moved.

  Time for a round of mince pies for a festive elevensive!

Thanks

Andy

Attachments: [Screen Shot 2014-12-24 at 10.56.22.png](https://www.cheetah3d.com/forum/index.php?attachments/25523/)

## #4 — tg_jp — 2014-12-30
<https://www.cheetah3d.com/forum/index.php?threads/10961/post-92711>

hi,

sorry for lack of document.

you can set any other object as "blow core" parameter, not blowed object. please check attached file, so you can control blow center.

Best

tg_jp, Hiroto.

Attachments: [ch_blowSample.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/25572/), [sc_006.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25573/)
