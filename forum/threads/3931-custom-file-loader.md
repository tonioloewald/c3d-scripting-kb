# Custom file loader

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3931/
- Subforum: scripting-general
- Started by **fgmurphy** on 2009-02-18; last post 2009-02-19; 4 posts

## #1 — fgmurphy — 2009-02-18
<https://www.cheetah3d.com/forum/index.php?threads/3931/post-27391>

Custom file loader

I need to import some pdb data to visualize some simple molecules in ball and stick format with CPK colors. Can I get a start if this is doable? f.

## #2 — tg_jp — 2009-02-18
<https://www.cheetah3d.com/forum/index.php?threads/3931/post-27407>

hello

sounds very interesting.

it's doable with javascript except material's assignment. you can find several importer/exporter scripts at this forum for your starting point. 

or, if you can post some sample file ( with file format description: ascii or binary...etc ), I could write a script for you.

regards.

tg_jp, Hiroto.

## #3 — fgmurphy — 2009-02-19
<https://www.cheetah3d.com/forum/index.php?threads/3931/post-27409>

Color

Thanks for the kind offer. Although I don't absolutely need to script textures, I will need to script object color. If that property isn't scriptable yet, I'll stick to small molecules whose atoms I can recolor manually. Maybe in 5.0? f

## #4 — tg_jp — 2009-02-19
<https://www.cheetah3d.com/forum/index.php?threads/3931/post-27413>

hello

most properties of any objects, materials are scriptable already. so, you can create a new material, and set or change a color, textures of it via script, but there is no API for assignment it to object,  so you have to assign a material to object manually at object browser or 3D view after executing script.

here is my latest importer script. this creates new material from (metasequoia) MQO file.

http://www.tres-graficos.jp/blog/files/article.php?id=42

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=42
