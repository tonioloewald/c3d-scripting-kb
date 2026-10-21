# Stepper.js for move/rotate/scale selected points with input value.

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1145/
- Subforum: script-downloads
- Started by **tg_jp** on 2006-12-12; last post 2012-05-17; 7 posts

## #1 — tg_jp — 2006-12-12
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-7148>

Stepper.js for move/rotate/scale selected points with input value.

Hello.

I try to make new Tool script for move/rotate/scale selected points/edges/polygon with input value.

download:http://www.tres-graficos.jp/blog/files/article.php?id=19
download latest version:http://www.tres-graficos.jp/blog/files/article.php?id=85

functions:
use to move/scale/rotate selection ( polygons/edges/points ) with input step value. to scale/rotate, you can select center point (selection, selection normal, object, world, input point) for these operations.

and you can set absolute value for selection.

----

I modified it for not only point mode but also edge/polygon mode.
20120517: set value function, normal coordinate mode added. now undoable for v6.0+.

regards.

Hiroto, tg_jp

Attachments: [Cheetah3D_sz_002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18247/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=19, http://www.tres-graficos.jp/blog/files/article.php?id=85

## #2 — peer — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-7165>

Thanks Hiroto! That will come in handy.
I will try it out during lunchbreak.

Regards,

Peter

## #3 — tg_jp — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-7168>

hello, Peter.

thank you for trying this. hope it wiil be useful.

> Martin

I have little question about script. I use selector in this script, and add this code.

	
	


```
    tool.addParameterSelector("selection",["point","edge","polygon"],true,true);
```


but Tool view shows 'Points', 'Edges', 'Polygons', seems to be automatically translated with Localizable.strings. this means all key strings in script parameter will be converted? or just in selector function?

regards.

Hiroto, tg_jp

## #4 — squareitround — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-7176>

This looks a very useful script. I put it in the Tools folder, but it doesn't appear in the menu? Am I doing something wrong?

## #5 — Francois — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-7177>

[[QUOTE:  squareitround said: but it doesn't appear in the menu? Am I doing something wrong? Click to expand... ]]

Normaly, new scripts will appear in the menu after relaunching C3D. Hopefully this should resolve your issue.

## #6 — squareitround — 2006-12-13
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-7180>

I'm an idiot! I put it in the Tools folder of an earlier version of Cheetah that's still on my hard drive. :redface:

## #7 — tg_jp — 2012-05-17
<https://www.cheetah3d.com/forum/index.php?threads/1145/post-70584>

hello.

I update this script. if you are using it, please update it.

tg_jp, Hiroto.
