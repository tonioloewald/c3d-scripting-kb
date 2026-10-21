# Combine objects with same material

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3376/
- Subforum: scripting-general
- Started by **peer** on 2008-08-04; last post 2011-01-28; 14 posts

## #1 — peer — 2008-08-04
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-23908>

Combine objects with same material

Hello,

I have a problem that when I import a .3ds file I get lots of objects with the same material. Is it possible to create a script that will look for object with the same material and use the import children command  to combine these.

If someone could help it would be great.

Regards,

Peter

## #2 — tg_jp — 2008-08-06
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-23933>

hi,

could you send me a sample file (.3ds or .jas)? I want to know which type of the object a scene has; one object has one material, or several meterials? I think, it is available by tool script.

regards.

tg_jp, Hiroto

## #3 — peer — 2008-08-06
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-23935>

I've send you a file. It would be great if you could help me out!! If you need any help let me know!

Regards,

Peter

## #4 — tg_jp — 2008-08-07
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-23953>

hi,

here is a Tool script (place into scripts/Tool folder) for creating new polygon objects from some objects has same material.

after selecting 'Combiner.js' from script menu, select 'range', and click 'combine' button. new polygon objects will be created. actually, you have to attach material to those object manually. ( it seems there is no API for attaching material to object. :?: ) new object name indicates material index and name, it's helping to attach a material.

> peer
only I had tested this with your file. please let me know if you have some problem with more big or complicated one. 

tg_jp, Hiroto.

Attachments: [Cheetah3D_sz_001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5347/), [Combiner.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/5348/)

## #5 — Francois — 2008-08-07
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-23956>

Hi Hiroto,

Thank you very much for this script. That will be very handy in certain situations.

[[QUOTE:  tg_jp said: ...( it seems there is no API for attaching material to object. :?: ) Click to expand... ]]

That's right ...  ... See here

Links: http://cheetah3d.de/forum/showthread.php?t=3023

## #6 — peer — 2008-08-07
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-23957>

Your script works great!!! This is such a timesaver. Thank you very much! I tried it with more complex objects with succes. Maybe this could be in CHeetah 5.0 Martin ?

Regards,

Peter

## #7 — Targos — 2008-10-08
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-25211>

Hi,

I am having an issue where the script seems to be assigning groups of materials to meshes(judging by the names in the Object Browser after running it-see pic), which would be fine, but I then have to reassign the material, which will take some figuring out and quite some time if theres 3 materials per mesh. Is there a trick to keeping these seperate ie 1 material per mesh?

The Origional model exported from sketchup had 39 textures. 

Thanks.
AaronC

PS if anyone needs to see the file, its 1.2mb without textures, so I'd have to email it.

PPS Cant upload pic sorry, I think my browsers a bit stuffed.

## #8 — Francois — 2008-10-08
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-25213>

[[QUOTE:  Targos said: I am having an issue where the script seems to be assigning groups of materials to meshes(judging by the names in the Object Browser after running it-see pic), which would be fine, but I]]

Aaron,
Without seeing the files, it seems to me that it's related to the way your SU model is setup or to the SU export file options that you use. If you use the .3ds format, then export with the "by material" option. You should then, in Cheetah3D, have 1 object / 1 mesh / 1 material. You can then run the combine script; and with your file, you should obtain 39 new objects (1-name of Texture1, 2-name of Texture2, .... 39-name of Texture39). It's then easy to just drop each texture to the appropriate object.
Also, FWIW, there used to be a SU script to group materials before export. But I have to dig it and try it as it's been some time I have not used it.

[[QUOTE:  Targos said: PS if anyone needs to see the file, its 1.2mb without textures, so I'd have to email it. Click to expand... ]]
You can send me your SU files if you want. See your PM

## #9 — Targos — 2010-10-02
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-48186>

Hi Hiroto,

Is this script compatible with Cheetah still? Thanks
Aaron.

Attachments: [Screen shot 2010-10-03 at 1.11.30 AM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/12127/)

## #10 — Targos — 2011-01-27
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-55122>

Am I correct in understanding that this script has been depreciated?

Thanks
AaronC

## #11 — SurfingAlien — 2011-01-27
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-55124>

Hi
Hiroto probably missed your question, Aaron.
AFAIK the material system is no more accessible via scripting since 5.0 so any script related to it is kind of broken (some still work but just can't assign materials, some others don't even work).
This may change in the future of course...

cheers,
A

## #12 — Targos — 2011-01-27
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-55128>

Hmmm thats not good..Hopefully such a system can be re-invented.

Thanks
AaronC

## #13 — tg_jp — 2011-01-28
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-55160>

hi

it's a updated version, that has a limitation. this version distinguish each materials by its name. ( old one did it by unique id in document, though )
so you have to assign unique name for each material in document.

also manual assignment is required after excution.

please check it.

regrards.

tg_jp, Hiroto.

Attachments: [Combiner.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/13724/)

## #14 — Targos — 2011-01-28
<https://www.cheetah3d.com/forum/index.php?threads/3376/post-55161>

Thank you Hiroto it appears to be working very well.

Tip for users- If a single mesh has multiple materials, go through the polygon assignment groups and seperate each assigned set of polygons using the split tool so that each mesh has only one material, and then use the combiner.

In the example picture that needed to be done to the terrain.

Thanks again Hiroto for your valuable contributions!

AaronC

Attachments: [Screen shot 2011-01-28 at 1.40.28 PM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13725/)
