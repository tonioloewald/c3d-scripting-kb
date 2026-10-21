# Material question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5667/
- Subforum: script-downloads
- Started by **georgiano** on 2010-04-22; last post 2010-04-26; 6 posts

## #1 — georgiano — 2010-04-22
<https://www.cheetah3d.com/forum/index.php?threads/5667/post-41691>

Material question

Hi everyone. I have been scripting for a few days and came to the point where I wanted to manipulate the materials from within my script and I couldn't do that. After searching this forum about this problem it turned out that something about the material system has changed with version 5.0 and support for modifying materials outside Cheetah has beed dropped. I was wondering if this is still the case or there is a way now which is not described in the documentation.

I would ask the admin to move my thread in the general category. I am sorry for the inconvenience.

## #2 — frank beckmann — 2010-04-22
<https://www.cheetah3d.com/forum/index.php?threads/5667/post-41692>

As far as I can tell the Node-System is no accessible via scripting yet.

Cheers
Frank

## #3 — SurfingAlien — 2010-04-23
<https://www.cheetah3d.com/forum/index.php?threads/5667/post-41717>

it would be nice if cheetah materials were accessible via script again, there are some excellent and very useful scripts waiting to be fixed (and some new that may be developed...)

as a side note, is it possible to export cheetah's procedural shaders along with the model by making corresponding diffuse/refl/alpha/bump maps (a sort of baking on the go)? if not, this would be extremely useful for "pipeline" workflow...

cheers,
Alessandro

## #4 — podperson — 2010-04-26
<https://www.cheetah3d.com/forum/index.php?threads/5667/post-41785>

By their nature, procedural textures can't be baked.

## #5 — frank beckmann — 2010-04-26
<https://www.cheetah3d.com/forum/index.php?threads/5667/post-41788>

So then it seems I missed a thing.:mrgreen: 

Cheers
Frank

Attachments: [BakedProcedurals.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/10583/)

## #6 — SurfingAlien — 2010-04-26
<https://www.cheetah3d.com/forum/index.php?threads/5667/post-41789>

dear Frank and podperson,

what I meant was an option to automatically creating corresponding bitmap textures at a given resolution (better if chosen by user via export settings) when exporting a scene from Cheetah (i.e. for external rendering purpose).

not that high on my personal wish list anyway, since it seems it can be done manually as Frank has showed.

cheers,
Alessandro
