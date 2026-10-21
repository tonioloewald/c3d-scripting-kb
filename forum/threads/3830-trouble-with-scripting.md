# trouble with scripting

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3830/
- Subforum: scripting-general
- Started by **kevinr** on 2009-01-18; last post 2009-01-18; 3 posts

## #1 — kevinr — 2009-01-18
<https://www.cheetah3d.com/forum/index.php?threads/3830/post-26747>

trouble with scripting

I'm a little confused on how to use some of the scripts. I was trying to use the polygon reduction script. It creates an object, but how to do actually execute it. When I click apply, it creates another reduction object.. but it's as if it's reducing the 'reduction script' object that was created when I clicked the script.

I've tried adding the one object to the other, still couldn't get it to work.

I assume this is one of the standard ways of executing scripts... just can't seem to figure it out, or find any related documentation.

## #2 — tg_jp — 2009-01-18
<https://www.cheetah3d.com/forum/index.php?threads/3830/post-26749>

hi,

please check where you did place the script file in ~/Application Support/Cheetah3D/scripts folder. it depends on script type, for example, Polygon Reducction.js is a Tool script, so you have to put it into Tool folder.

Polygon script  -> Polygonobj folder
Spline script -> Splineobj folder
Tool script -> Tool folder... and so on

regards.

tg_jp, Hroto.

## #3 — kevinr — 2009-01-18
<https://www.cheetah3d.com/forum/index.php?threads/3830/post-26756>

thank you so much. yea, I had it in the polygon folder. I didn't think it mattered, thought it was just for organization.
