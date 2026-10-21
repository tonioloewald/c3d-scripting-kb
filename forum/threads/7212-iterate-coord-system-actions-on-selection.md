# Iterate Coord System actions on selection

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7212/
- Subforum: scripting-general
- Started by **ByDesign Games** on 2011-04-27; last post 2011-04-28; 4 posts

## #1 — ByDesign Games — 2011-04-27
<https://www.cheetah3d.com/forum/index.php?threads/7212/post-59074>

Iterate Coord System actions on selection

Hi all!

Bought some ready-made assets online for a quick turn-around. Noticed all the objects are orientated differently than I prefer.

Such, wish to Burn Transform and Center & Burn Pivot Point on all objects. Seems the Coord System tool only applies to the last selected object? 

Are the Burn Transform & Center Pivot / Burn Pivot actions available via scripting? If so, please advise, as I have a recursive script here just waiting for me to fill out the Coord System methods

## #2 — tg_jp — 2011-04-28
<https://www.cheetah3d.com/forum/index.php?threads/7212/post-59089>

hello

here is a script.

please feel free to customize as you want. 

regards.

tg_jp, Hiroto.

Attachments: [Burn Transform+.js_20110428.zip](https://www.cheetah3d.com/forum/index.php?attachments/14596/)

## #3 — ByDesign Games — 2011-04-28
<https://www.cheetah3d.com/forum/index.php?threads/7212/post-59090>

@tj_gp
Thanks for this; it's definitely useful.

The main functionality seems to be missing however; centering the pivot then burning the pivot. 

Is this accessible via scripting? I don't mind writing one myself, just don't know the API and searching for pivot in the help didn't return any scripting results.

## #4 — tg_jp — 2011-04-28
<https://www.cheetah3d.com/forum/index.php?threads/7212/post-59091>

hi

you can manipulate pivot paramter with function Obj::setParameter for "pivot" paramter's name.
of course you have to calculate object's center point or reset point manually, and 'position' value after moving pivot, though.  

	
	


```
obj.setParameter("pivot", new Vec3D(x, y, z));
```


regards.

tg_jp, Hiroto.
