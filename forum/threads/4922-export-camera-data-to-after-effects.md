# Export Camera Data to After Effects?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4922/
- Subforum: scripting-general
- Started by **Captain** on 2009-11-10; last post 2009-11-28; 5 posts

## #1 — Captain — 2009-11-10
<https://www.cheetah3d.com/forum/index.php?threads/4922/post-35144>

Export Camera Data to After Effects?

I posted in the Cheetah3d general forum and was told scripting was the way to do this...

Does anyone know of a way to export camera data to a format that After Effects could read?  To my knowledge the only camera data it can import is contained in RLA or RPF file formats...

## #2 — podperson — 2009-11-23
<https://www.cheetah3d.com/forum/index.php?threads/4922/post-35669>

I took a quick look around and couldn't find any information on what one of these files is supposed to look like. Assuming a decent file specification it would be (I think) pretty easy.

## #3 — Captain — 2009-11-23
<https://www.cheetah3d.com/forum/index.php?threads/4922/post-35670>

I honestly don't know myself as I've never used it... I just know that without AE integration my uses for Cheetah would be limited.

## #4 — podperson — 2009-11-28
<https://www.cheetah3d.com/forum/index.php?threads/4922/post-35849>

The most useful thing I can find on the subject is that the 3DS Max SDK contains a sample file -- RPF.cpp -- that shows how to import/export RPF data. If Martin becomes interested in adding native support this could be useful (one could also infer the file spec from the code).

The sensible thing would be for AE to support more common 3D formats such as FBX and DAE.

## #5 — Captain — 2009-11-28
<https://www.cheetah3d.com/forum/index.php?threads/4922/post-35850>

[[QUOTE:  podperson said: The sensible thing would be for AE to support more common 3D formats such as FBX and DAE. Click to expand... ]]

Agreed. However, realistically, the behemoth that is Adobe will do whatever they want and it will be upto the smaller developers to "fall in line".
