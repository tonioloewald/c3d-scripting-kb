# Target multiple selections

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10548/
- Subforum: scripting-general
- Started by **McShaman** on 2014-07-11; last post 2014-07-14; 3 posts

## #1 — McShaman — 2014-07-11
<https://www.cheetah3d.com/forum/index.php?threads/10548/post-88679>

Target multiple selections

In C3D you can select multiple objects in the object browser by shift or command clicking on them. In the 3D view this seems to be reflected by all the objects being highlighted orange except for last selected object which is coloured red.

The Document.selectedObject() method only appears to return the last selected object. Is there a way to get all the other selected objects?

## #2 — podperson — 2014-07-11
<https://www.cheetah3d.com/forum/index.php?threads/10548/post-88688>

Not as far as I can tell. Probably worth a wishlist request!

If it were anywhere it would be in the Object or Base classes (of which document.root() is an instance) since selections can be at any level of the hierarchy (and in different parts of the hierarchy) and materials can be selected.

I think this exposes an underlying problem which is that multiple selection doesn't really work as it should in C3D (there's the actual selected object and the other not-quite-selected objects).

## #3 — McShaman — 2014-07-14
<https://www.cheetah3d.com/forum/index.php?threads/10548/post-88717>

I thought that was the case. Maybe something to come in the next version of Cheetah 3D. Thanks Podperson.
