# Render Problems

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11258/
- Subforum: scripting-general
- Started by **Crossmedialist** on 2015-06-22; last post 2015-06-22; 2 posts

## #1 — Crossmedialist — 2015-06-22
<https://www.cheetah3d.com/forum/index.php?threads/11258/post-95900>

Render Problems

Hi all,

i have some problems with rendering animations. Sometimes there are some spots rendered „from nothing“. I have tried several settings in the camera settings and the radiosity tag – but they still appear – even when the object is not moving … Rendered file is here: https://www.dropbox.com/s/7kbjogml1hnyb3h/Innenteil-Drehen.mov?dl=0
Here you can see the spots above the rotating elements 

Any idea? Thanks in advance for any suggestion …

Detlef

Links: https://www.dropbox.com/s/7kbjogml1hnyb3h/Innenteil-Drehen.mov?dl=0

## #2 — frank beckmann — 2015-06-22
<https://www.cheetah3d.com/forum/index.php?threads/11258/post-95902>

Hi and Welcome!
I don´t think you´re expecting a scripting solution as we´re in the scripting area of this forum.  

These are artifacts caused by the irradiance cache of the radiosity tag.
1. Try to to decrease the value for the Rmin setting
2. Take a lower Error value which will increase render time - don´t go under 0,05 as it will disable the I-cache and brut force path tracing takes place.
3. Enable Detail detection

Let´s see if this helps already - as I guess your´s model is small.

Cheers
Frank
