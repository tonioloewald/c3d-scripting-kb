# Vertex Positions

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12770/
- Subforum: scripting-general
- Started by **KurtF** on 2018-02-01; last post 2018-02-04; 3 posts

## #1 — KurtF — 2018-02-01
<https://www.cheetah3d.com/forum/index.php?threads/12770/post-110718>

Vertex Positions

Does anyone know the method to get the actual positions of an object's vertices, even when it has been Scaled or Rotated? The positions seem to be reported pre-scaling and pre-rotation. I'd like to be able to put an object on the floor (X/Z plane) regardless of transformations.

Thanks.

## #2 — Martin — 2018-02-04
<https://www.cheetah3d.com/forum/index.php?threads/12770/post-110754>

You need the obj2WorldMatrix() from the object (Object class). You can then multiply the vertices with the with the object to world matrix to transform the vertices from the polygon objects local coordinate space to the world/global coordinate space.

The "Macro/Simple ASCII Export.js"  script contains some sample code.

Bye
Martin

## #3 — KurtF — 2018-02-04
<https://www.cheetah3d.com/forum/index.php?threads/12770/post-110755>

Outstanding. Thank you Martin.

I just ordered a used copy of "3D Math Primer for Graphics and Games Development." So I will read up on transform matrices and will also look at the "Macro/Simple ASCII Export" Script.
