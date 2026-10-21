# Cheetah have facility for slicing an object into arbitrary complexity?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4394/
- Subforum: scripting-general
- Started by **ByDesign Games** on 2009-07-20; last post 2009-07-21; 3 posts

## #1 — ByDesign Games — 2009-07-20
<https://www.cheetah3d.com/forum/index.php?threads/4394/post-30825>

Cheetah have facility for slicing an object into arbitrary complexity?

Find that a feature / workflow missing from many 3D packages (when using for realtime work) is the ability to smoothly slice objects into chunks of arbitrary complexity. Preferably non-destructively, but can duplicate around such limitations.

For example, I have a series of houses & streets that share the same material, and would like to combine them all, then split them into set chunks of about 2k polys each to maximize realtime performance.

Does cheetah and / or cheetah + scripting provide a facility for this?

## #2 — tg_jp — 2009-07-21
<https://www.cheetah3d.com/forum/index.php?threads/4394/post-30844>

hello

here is my simple implementation by Tool script. please check it.

1. select folder or polygon object that you want split.
2. choose 'Object Chunker.js' from menu.
3. set 'target poly count' as you want.
4. click 'make' button.

This script simply divides it by object order at object browser and polygon order in each objects, it may cause bad results. so, it better to make it manually in some case. 

regards.

tg_jp, Hiroto.

Attachments: [Object Chunker.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/7277/)

## #3 — ByDesign Games — 2009-07-21
<https://www.cheetah3d.com/forum/index.php?threads/4394/post-30845>

Ah excellent, will give it a go (need to grab a new Cheetah demo)

re: object order & "bad results"
Ok, noted. If I manage to make any useful changes in this regard, will post back here!

Thanks for sharing!
