# Script for swapping textures

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8978/
- Subforum: scripting-general
- Started by **lowpolymatt** on 2012-11-07; last post 2012-11-07; 3 posts

## #1 — lowpolymatt — 2012-11-07
<https://www.cheetah3d.com/forum/index.php?threads/8978/post-74537>

Script for swapping textures

Hi Guys,

Does anyone know of a method/ or script that can switch the texture on a model (keyed in the animation)?

It can be done right now by tagging the material on/off with 'key all other parameters' turned on. But it's a slow process. and requires more than one material and a lot of keying on/off of the toggle.

Ideally, I need to be able to switch between multiple textures in an animation and have the switch recorded in the animation keys. 

*for example* sphere model with red texture, then switch to yellow texture, then switch to green texture, then back to red.

Any help greatly appreciated!

Thanks
Matt

## #2 — tg_jp — 2012-11-07
<https://www.cheetah3d.com/forum/index.php?threads/8978/post-74542>

hi

script API for accessing material system is still missing, so it's not available to set texture ( or other material info ) via script.

btw, you can use Mix node for switching texture node. please check attached file.

regards.

tg_jp, Hiroto

Attachments: [switchingTexture.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/18370/)

## #3 — lowpolymatt — 2012-11-07
<https://www.cheetah3d.com/forum/index.php?threads/8978/post-74543>

Swapping textures/materials

Hi  Hiroto,

I tried this with a couple of png textures, but found the weren't visible in the viewport, only in render. Node based would begreat, but it feels like youd need some kind of 'if' command (If I put this texture/material to 1 , then switch all the others to 0)

Ideally, I'd like to be able to swap textures and have this a)visible in the viewport and b) as an exportable attribute that is keyable.

I've been thinking of it similar to the pose tool, but instead of swapping poses, it swaps textures/materials.

Thanks for the heads up though 

Matt
