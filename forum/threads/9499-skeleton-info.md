# Skeleton Info

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9499/
- Subforum: script-downloads
- Started by **Edward** on 2013-04-20; last post 2013-04-21; 3 posts

## #1 — Edward — 2013-04-20
<https://www.cheetah3d.com/forum/index.php?threads/9499/post-78360>

Skeleton Info

Skeleton Info

Description
----------------
This displays information about a skeleton tag attached to the selected object including the position, rotation, scale, weights, and indices of each joint. Feel free to modify this script as you need until skeleton tag access is added to Cheetah 3D.

Getting Started
---------------------
Place the following files into the Scripts/Tool folder:
- Skeleton Info.js
- Skeleton Helper.py

Open the sample file, select Mesh, and run Tools>Script>Tool Script>Skeleton Info.js. Set the tag index to 2 and run the script. Results are displayed in the console tab.

~ Greg ~

Attachments: [Skeleton Info.zip](https://www.cheetah3d.com/forum/index.php?attachments/19679/)

## #2 — Francois — 2013-04-20
<https://www.cheetah3d.com/forum/index.php?threads/9499/post-78362>

Hi Greg,

[[QUOTE:  Edward said: ... Open the sample file, select Mesh, and run Tools>Script>Tool Script>Skeleton Info.js. Set the tag index to 2 and run the script. Results are displayed in the console tab. Click to ex]]

Something is not working as expected with this script

Attachments: [Capture dâÃ©cran 2013-04-20 Ã  23.12.00.png](https://www.cheetah3d.com/forum/index.php?attachments/19680/)

## #3 — Edward — 2013-04-21
<https://www.cheetah3d.com/forum/index.php?threads/9499/post-78366>

I think that the python script failed to extract information from the JAS file, and never saved the JSON file. I didn't mention this above, but you also need to ensure your JAS files are being saved in a text format.

- Go to Cheetah3D > Preferences > Files > .jas
- Uncheck 'binary'

This should work, and if not I hard-coded paths into the scripts that may or may not be the same on your computer.
