# Scripts not showing in Menu

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11539/
- Subforum: scripting-general
- Started by **cheezorg** on 2015-11-03; last post 2015-11-03; 3 posts

## #1 — cheezorg — 2015-11-03
<https://www.cheetah3d.com/forum/index.php?threads/11539/post-98357>

Scripts not showing in Menu

Searched around, haven't found an answer for this. 

When I go to Menu Bar > Tools > Script I see a list of script categories (Particle Script, Polygon Script, Spline Script, etc).

Each category has a little arrow next to it, but nothing shows when I highlight any of the script categories (no grey box, nothing happens).

If I dig into the Application package and find the Plugins folder, I can see the Scripts folder is full of scripts, they just don't show up in the Cheetah Script menu.

Any ideas?

Running Cheetah 6.3.2 on Yosemite 10.10.5

## #2 — frank beckmann — 2015-11-03
<https://www.cheetah3d.com/forum/index.php?threads/11539/post-98358>

Look up here: Mac/HD/USER/Library/Application Support/Cheetah3d/Scripts
That´s the place Cheetah3d is checking for the Scripts.

Cheers
Frank

## #3 — cheezorg — 2015-11-03
<https://www.cheetah3d.com/forum/index.php?threads/11539/post-98359>

Ah yes, that makes sense. Those folders are empty! Thanks Frank.
