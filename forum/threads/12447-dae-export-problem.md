# DAE export problem

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12447/
- Subforum: scripting-general
- Started by **alex_ping** on 2017-05-11; last post 2017-05-18; 8 posts

## #1 — alex_ping — 2017-05-11
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107453>

DAE export problem

Hey guys. I'm having a frustrating issue here... I made this model in Cheetah and it looks well and dandy but when I export it, it seems to be adding some extra polygon in the exported Collada file? Anyone know what might be going on? Spent hours trying to resolve it and even made a new one from scratch and it's doing the same...

Cheetah:
http://i.imgur.com/4UAv1zP.png

DAE model (notice diagonal polygon from top left to bottom right):
http://i.imgur.com/ZmjMAsU.png

Links: http://i.imgur.com/4UAv1zP.png, http://i.imgur.com/ZmjMAsU.png

## #2 — ZooHead — 2017-05-11
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107454>

Welcome to the forum.

Can you upload the file, zip it up and post it. 

I think I know why, but I can't be sure unless I can see it. 
​

## #3 — alex_ping — 2017-05-11
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107455>

[[QUOTE:  ZooHead said: Welcome to the forum. Can you upload the file, zip it up and post it. I think I know why, but I can't be sure unless I can see it. ​ Click to expand... ]]

Hey, attached is the ZIP file which contains the Collada export and the original JAS file.

Thank you.

Attachments: [Archive.zip](https://www.cheetah3d.com/forum/index.php?attachments/31040/)

## #4 — frank beckmann — 2017-05-11
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107456>

I don´t think Collada supports nGons (polygons with more than 4 edges).
When you triangulate the mesh first and export then all is fine and dandy:

Cheers
Frank

Attachments: [Wall4U.dae.zip](https://www.cheetah3d.com/forum/index.php?attachments/31041/)

## #5 — alex_ping — 2017-05-11
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107457>

[[QUOTE:  frank beckmann said: I don´t think Collada supports nGons (polygons with more than 4 edges). When you triangulate the mesh first and export then all is fine and dandy: Cheers Frank Click to expand...]]

LIFE. SAVER. 

Seriously, thank you so much.

## #6 — Martin — 2017-05-14
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107520>

Hi,
Collada actually supports NGons and Cheetah3D exports NGons by default. But since some Collada importers in other apps don't handle NGons properly I've added an "Only triangles" option to the Collada exporter in Cheetah3D (Preferences->Files->.dae). With that turned ON Cheetah3D triangulates meshes automatically.

Bye
Martin

## #7 — frank beckmann — 2017-05-14
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107521>

[[QUOTE:  Martin said: Hi, Collada actually supports NGons ... Click to expand... ]]
Ah ok - I wasn´t 100% sure because I only checked with Preview.app which don´t display complex nGons - at least here:
And I missed the exporter option obviously.  

Cheers
Frank

Attachments: [PreviewNgon.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/31060/)

## #8 — Martin — 2017-05-18
<https://www.cheetah3d.com/forum/index.php?threads/12447/post-107582>

[[QUOTE:  frank beckmann said: Ah ok - I wasn´t 100% sure because I only checked with Preview.app which don´t display complex nGons - at least here: And I missed the exporter option obviously. Click to expand.]]

Hi Frank,
even Sierra has problems with properly triangulating NGons. That's very strange.

Bye
Martin
