# Scale scene

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10567/
- Subforum: scripting-general
- Started by **Somian** on 2014-07-19; last post 2014-07-19; 2 posts

## #1 — Somian — 2014-07-19
<https://www.cheetah3d.com/forum/index.php?threads/10567/post-88817>

Scale scene

Hi,

i'm trying to scale my scene because shapeways.com only takes models in millimetres but i modelled in centimetres.

So far, so good…

I have an .obj (where my object is about 1cm in length), and wan to scale it. I click my mesh, set the scale to 10, save as obj and when i open it again, the mesh is 1cm only. It seems like cheetah 3d is discarding the model scale (set in the polygon object settings)?

How can I really scale the whole scene by a certain factor?

## #2 — frank beckmann — 2014-07-19
<https://www.cheetah3d.com/forum/index.php?threads/10567/post-88818>

Via scripting?
If not go Cheetah3d->Preferences-> Files and adjust the "Scale factor" for Export (and "Import" accordingly).
