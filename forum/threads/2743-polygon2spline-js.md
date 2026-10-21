# Polygon2Spline.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2743/
- Subforum: script-downloads
- Started by **tg_jp** on 2008-02-26; last post 2008-02-26; 1 posts

## #1 — tg_jp — 2008-02-26
<https://www.cheetah3d.com/forum/index.php?threads/2743/post-18885>

Polygon2Spline.js

hi.

this is Spline script for making spline from child polygon object.

it is combined version with Poly2Spline.js and Edge2Spline.js, I fixed invert normal bug, and added new parameter 'margin'.
you can choose 3 types for creation [all edge]/[selected edge]/[polygon selection].
for using, place it into ~/Library/Application Support/Cheetah3D/scripts/Splineobj folder.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=36

positive margin value: making shorter spline than original points. right ball.
negative margin value: making longer spline than original points. left ball.

updated 20090215: added new option.
updated 20101117: fixed error with Cheetah3D 5.5+.
updated 20110202: fixed normalize func error with Cheetah3D 5.5+.

updated 20140804: added 'connect' potion for connecting edges that share same points.

updated 20140806: 'connect' bug fixed. 'use modified child' option added.

regards.

tg_jp, Hiroto.

Attachments: [ch_20080226_p2s.jpg](https://www.cheetah3d.com/forum/index.php?attachments/4120/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=36
