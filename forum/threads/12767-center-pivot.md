# Center Pivot

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12767/
- Subforum: script-downloads
- Started by **KurtF** on 2018-01-28; last post 2018-02-02; 8 posts

## #1 — KurtF — 2018-01-28
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110696>

Center Pivot

This is my first attempt at writing javascript for Cheetah 3D, and is heavily adapted from the work of others, including Tonio Loewald, Martin Wengenmayer, and Todd WR. It is a simple Macro script that repositions the pivot of an object at the center of it's bounding box. You could of course position the pivot manually, but it's just a simple click to have the computer calculate and position it automatically.

View attachment center_pivot.js.zip

Attachments: [center_pivot.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/32154/)

## #2 — Jeanny — 2018-01-29
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110703>

:smile:  Thanks KurtF for sharing your script with us.
I'll have to give it a go.

My Best
Jeanny

## #3 — KurtF — 2018-01-30
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110707>

Thank you Jeanny. It's really only useful if the pivot got moved away from the center due to some modeling operation. Some one else on the forum wanted a "Put on Floor" script, and this would be easy to modify to do that, so something else to try.

## #4 — uncle808us — 2018-01-30
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110709>

Doesn't Menu Bar Tools> Coord System>center pivot point already do this or am I missing something?

Attachments: [CenterPoint.gif](https://www.cheetah3d.com/forum/index.php?attachments/32155/)

## #5 — KurtF — 2018-01-31
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110711>

Looks like it indeed does. I hadn't noticed that one before. Good catch.

It also looks like geometry holds an "internal" property of where the pivot was located originally, and can be returned to that point with Tools>Coord System>Reset Pivot; which is actually different from Center Pivot under that same menu. With a Cone primitive, Center Pivot moves it up, and Reset Pivot puts it back to the Bottom Center where it was when the Cone was first created. Burn Pivot sets the current pivot position to this "internal" position, as moving the pivot and then Resetting puts the pivot back to the position where it was "burned".

So lot's more for me to learn.

## #6 — uncle808us — 2018-01-31
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110715>

Thanks. I thought maybe I was missing something. 
  But the drop to floor script is still needed. 
Thanks again and keep scripting, :icon_thumbup:

## #7 — bobziila — 2018-02-02
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110721>

I think something similar to "drop to floor" would be good for animation, too. Like a constraint (or something) that keeps a foot from going through a surface. So feet will be planted on a surface (ground) and even if the surface moves, the foot does not pass through it.

Bob

## #8 — KurtF — 2018-02-02
<https://www.cheetah3d.com/forum/index.php?threads/12767/post-110724>

I'll keep investigating. I have a basic version working, but - it only works with basic objects. If the object has been scaled or rotated off of vertical, it doesn't work. If the object is in a hierarchy, only the selected object is moved. What the other's do depends on where they are at in the hierarchy.

So more to investigate.
