# What are prerot / postrot?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9046/
- Subforum: scripting-general
- Started by **Edward** on 2012-11-25; last post 2012-11-28; 3 posts

## #1 — Edward — 2012-11-25
<https://www.cheetah3d.com/forum/index.php?threads/9046/post-74937>

What are prerot / postrot?

I noticed that when you use the orient tool on joints, the rotation gets baked into the prerot and postrot parameters. How is this information used? I assume that it would fit into the calculations something like this -

posMatrix * prerotMatrix * rotMatrix * postrotMatrix * scaleMatrix = localMatrix

Alternately, is it correct to just add the three rotation vectors to get the zeroed rotation?

Thanks

## #2 — Edward — 2012-11-25
<https://www.cheetah3d.com/forum/index.php?threads/9046/post-74939>

Oh- I just noticed that you can access the local matrix from the object, so I don't really need to mess with prerot and postrot values. I only need to decompose the position, rotation, and scaling from the matrix.

## #3 — Martin — 2012-11-28
<https://www.cheetah3d.com/forum/index.php?threads/9046/post-75001>

I noticed that when you use the orient tool on joints, the rotation gets baked into the prerot and postrot parameters. How is this information used? I assume that it would fit into the calculations something like this -

posMatrix * prerotMatrix * rotMatrix * postrotMatrix * scaleMatrix = localMatrix
[/QUOTE]

The object transformation is computed like:

posMat * pivotMat * prerotMat * rotMat * postrotMat * shearMat * scaleMat * pivotMat_inv;

[[QUOTE:  Edward said: Alternately, is it correct to just add the three rotation vectors to get the zeroed rotation? Click to expand... ]]

No, that doesn't work generally. You have to multiply the matrices and decompose the matrix thereafter.

Bye
Martin
