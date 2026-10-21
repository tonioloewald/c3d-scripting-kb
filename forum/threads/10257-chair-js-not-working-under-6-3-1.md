# cHair.js not working under 6.3.1

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10257/
- Subforum: scripting-general
- Started by **kingc8** on 2014-03-13; last post 2014-03-13; 9 posts

## #1 — kingc8 — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86125>

cHair.js not working under 6.3.1

The cHair version in cHair.js_20120913.zip

from http://www.tres-graficos.jp/blog/files/article.php?id=63

Doesn't seem to work anymore under Cheetah3D 6.3.1

-------------

Javascript Error

line: 298 
error: Object.setParameter() couldn't find parameter called normalType

--------------

Is there a newer implementation of it?

-I'm just getting back into Cheetah3D again and getting familiarised with it.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=63

## #2 — frank beckmann — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86126>

Strange. Still working for me: http://www.cheetah3d.com/forum/showpost.php?p=85890&postcount=3

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showpost.php?p=85890&postcount=3

## #3 — kingc8 — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86129>

ok..

Well, ok, lets see, it's been a while so I'm a bit rusty.

Make a Plane.

Sections Width 10
Sections Depth 10 (all not probably necessary as cHair is vertex independent?)

Double-click on Plane in Object Browser to make Editable.

Selection -> Area Select

Drag mouse and highlight the entire Plane.

Go to Tools->Script->Particle Script->cHair.js

Drag Plane onto Hair in Object Browser... bam.. Javascript Error. :-(

## #4 — frank beckmann — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86130>

Sorry - not so here. You don´t have to make the plane editable BTW.
Where is the script located and what is its creation/modified date? Mine is from 13th September 2012.

Cheers
Frank

## #5 — kingc8 — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86132>

Hmm,

Mine too, 13th September 2012..

Did it again without making editable, still same error.. rats..

I'm going to restart my system and see if it's something odd about Cheetah in this state..

I'm on a Retina Macbook with Mavericks.

## #6 — frank beckmann — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86133>

Where´s the script located on your machine?

Cheers
Frank

## #7 — kingc8 — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86134>

Library/Application Support/Cheetah3D/Scripts/Particle/

..attached image.

Attachments: [chairlocation.png](https://www.cheetah3d.com/forum/index.php?attachments/22645/)

## #8 — frank beckmann — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86135>

Wrong folder! It goes here: Scripts->Polygonobj

Cheers
Frank

## #9 — kingc8 — 2014-03-13
<https://www.cheetah3d.com/forum/index.php?threads/10257/post-86145>

Genius!

Thanks Frank!
:icon_thumbup:
