# Assign materialTagIndex to Polygon

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2695/
- Subforum: scripting-general
- Started by **Herb** on 2008-02-17; last post 2008-02-19; 7 posts

## #1 — Herb — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18539>

Assign materialTagIndex to Polygon

Hi folks,
using C3D for physics visualization I would like to make a master polygonobject and then create copies of this object, varying some of its properties (angle for example, to create a mechanical wave).
Now, adapting tg_jp's "point-array" script, I was able to create such a wave. However, I cannot color the master and produce equally colored copies - I did not find any method to set the materialTagIndex of a polygon - it seems to be readonly.
Yes, I could strictly assign the first color to polygon selection 1, second to selection 2 and so on and then use "setActivePolygonSelection"
 and "setPolygonSelection", as shown again by tg-jp in "Random Array".
But in my case that's not handy - I can't create selection groups, just when needed - I have to really plan everything.
Any idea, any point I missed?

## #2 — ToddWR — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18547>

Herb,

might you want to share in more detail what it is you are doing. I wonder if there could be a better way of doing things. speaking as one who is trying to get more physics into cheetah, I could possibly lend a hand with what your trying to achieve.

Todd

## #3 — Herb — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18550>

Examples of today

Hy Todd,
here you see what I was working on today.
If I want to color the rods for better visibility, I have to use a strict numbering of the colors and the selections. As you see, it works. However Function "SetmaterialTagIndex" would be handy. Probably that's not possible due to the way how selection and materials are now implemented.
Maybe I am wrong.

Herb

Attachments: [WKetteAltTotSmall.jpg](https://www.cheetah3d.com/forum/index.php?attachments/4028/)

## #4 — tg_jp — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18556>

hi, thanks for using the script. nice model. 

actually, you have to set manually parameters for copy polygon selection. 

it should be like..

	
	


```
// for copy core.
copyCore.setActivePolygonSelection(index); // change selection index.
for (...) { // set certain polygon selected.
    copyCore.setPolygonSelection(pIndex, true);
}
// for material tag.
materialTag.setParameter("shadeSelection",(index+1)); // set shadeSelection parameter, index starts 0 for all, 1 for 0....
```


as you know, my *some* Array don't work. next update I will add 'material selection' option.

regards.

tg_jp, Hiroto

## #5 — Herb — 2008-02-18
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18568>

High Hiroto,
you describe more or less, what I did - except that I read the materialTagIndex of every polygon copied and put the new polygon into the selectiongroup with the same number as the index. So materialTagIndex and the selection, to which the materials are assigned, need to be identical.

Since somebody might be interested in this extension of your work, I attach my script.

regards, Herbert

Attachments: [WavyRods.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/4034/)

## #6 — tg_jp — 2008-02-18
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18581>

nice script!!

'polyCore.materialTagIndex()' returns document's material index value. this will be used for 'document.materialAtIndex(index)'.

so I added codes for copying simply polyselection setting to 'core' from 'masterCore'. please check it. (sorry, I can't explain with my english skill  )

regards.

tg_jp, Hiroto

Attachments: [WavyRods.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/4058/)

## #7 — Herb — 2008-02-19
<https://www.cheetah3d.com/forum/index.php?threads/2695/post-18593>

Hi Hiroto,
you made me work another hour on the script: In order for non-experts to understand it, I changed the names of some variables, possible ranges and produced a script header that tells, how to use the script.
I just could not leave it in a "quick and dirty" state, after you called it "nice".

Herbert

Attachments: [TorsionalWave.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/4059/), [ConeWave.jpg](https://www.cheetah3d.com/forum/index.php?attachments/4060/)
