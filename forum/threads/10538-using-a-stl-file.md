# Using a STL file.

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10538/
- Subforum: scripting-general
- Started by **classic12** on 2014-07-03; last post 2014-07-03; 2 posts

## #1 — classic12 — 2014-07-03
<https://www.cheetah3d.com/forum/index.php?threads/10538/post-88590>

Using a STL file.

Hi guy;s,

I have just download this model in stl format :

http://grabcad.com/library/dell-precision

I comes into cheetah ok but it is one big object (ie the screen case mouse etc is one object).

Is there a way to edit the file so I can then apply materials to different sections ?

Cheers

SteveW

Links: http://grabcad.com/library/dell-precision

## #2 — frank beckmann — 2014-07-03
<https://www.cheetah3d.com/forum/index.php?threads/10538/post-88592>

I think that´s the nature of stl-files.
When the polygons are connected (if not call "optimize tool") you can select one from a mesh and call "select group" and then use "split" to make it a new object - and so on.

UV-layout will be lot´s of work I guess because you can´t select edge-loops - so try your best with UV-mapper on selections.

Cheers
Frank

PS: hopefully you don´t expect a scripted workflow as we´re in the scripting general section of the forum.
