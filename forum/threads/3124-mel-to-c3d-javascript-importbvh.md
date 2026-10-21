# Mel to C3D Javascript? ImportBvh

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3124/
- Subforum: scripting-general
- Started by **Targos** on 2008-05-20; last post 2008-05-21; 2 posts

## #1 — Targos — 2008-05-20
<https://www.cheetah3d.com/forum/index.php?threads/3124/post-21980>

Mel to C3D Javascript? ImportBvh

Hi all,
In the search for a way to use bvh motioncapture in my cheetah pipeline, I did wonder if it was possible to convert existing melscript data from Maya to custom Cheetah type scripts? Has anyone done this? Or are mel scripts dependent on internal Maya libraries and the transition like starting from scratch? Theres a bvh import script at highend3d.com and its not very long. What does the forum think?

AaronC

## #2 — Martin — 2008-05-21
<https://www.cheetah3d.com/forum/index.php?threads/3124/post-22045>

Hi,
MEL is a differnt language and has a different API. So there is no direct why to transform MEL scripts to Cheetah3D.

The problem of writing a BVH loader at the moment is the lack of F-Curve access via Javascript. 

Bye,
Martin
