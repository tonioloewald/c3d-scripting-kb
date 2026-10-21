# Cheetah3d exporter

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10280/
- Subforum: scripting-general
- Started by **Tuxic** on 2014-03-21; last post 2014-03-23; 3 posts

## #1 — Tuxic — 2014-03-21
<https://www.cheetah3d.com/forum/index.php?threads/10280/post-86311>

Cheetah3d exporter

Hi all!
 
I've been working on a Cheetah3D scene exporter for babylon.js the last days, and it's available on my github for you to have fun with it : https://github.com/Calebsem/Cheetah2Babylon
 
What's supported right now :

mesh export with functional transform, naming and parenting
multicamera export (only perspective, no support for orthogonal right now)
light export with all babylon type managed :
Cheetah3D spot light is a babylon spot (duh)
Cheetah3D distant light is a babylon directional light
Cheetah3D ambiant light is a babylon hemispheric light
every other type is a babylon point light
supports diffuse and specular color
rotations must be on the -Y axis

materials export:
supports diffuse, emissive and specular color (plus specular power as "shininess")
supports only diffuse textures, Cheetah3D api is realy sparse on that

It still is a bit sketchy but has proven very useful for simple to very complex scenes. So if you currently use this software and wish to try exporting some static scenes to babylon, you're welcome to do so and send me some feedbacks! Also feel free to check my blog, as I will update it in case of major changes or new features!
 
Have a nice day!
Tuxic

Links: http://babylonjs.com/, http://cubeslam.net/, https://github.com/Calebsem/Cheetah2Babylon

## #2 — KurtF — 2014-03-21
<https://www.cheetah3d.com/forum/index.php?threads/10280/post-86328>

Very nice. Thank you for this. I've been collecting export scripts as a learning exercise. I hope to write an export script for Thea Render at some point.

## #3 — tg_jp — 2014-03-23
<https://www.cheetah3d.com/forum/index.php?threads/10280/post-86338>

hello, 

nice script :icon_thumbup: .

[[QUOTE:  Tuxic said: materials export: supports diffuse, emissive and specular color (plus specular power as "shininess") supports only diffuse textures, Cheetah3D api is realy sparse on that Click to expand.]]

you can use new API for material system of Cheetah3D for more material information. it's available to access all node parameters with it. 

it's a sample script for getting texture path for all material nodes, please check it.

http://www.cheetah3d.com/forum/showthread.php?t=9707

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.com/forum/showthread.php?t=9707
