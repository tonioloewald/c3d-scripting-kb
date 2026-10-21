# Tiles Object Chunker

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4991/
- Subforum: script-downloads
- Started by **Physt** on 2009-11-23; last post 2009-11-23; 1 posts

## #1 — Physt — 2009-11-23
<https://www.cheetah3d.com/forum/index.php?threads/4991/post-35691>

Tiles Object Chunker

I modifier the object chunker script a bit.  

Normally the chucker takes an input object and creates new objects of a certain poly limit.  For example, it could take a mesh of 1000 polys and it would create 5 meshes with 2000 polys each.

The problem I had with the original script was that the new objects could contain polys from anywhere on the original object.  My modification takes a tile size instead of a poly limit.  So for example, if you use the script on a terrain about of 1000 objects and give it a grid size of 2 (meaning 2 x 2 grid), you'll get 4 objects.  Each object is a tile in the grid which contains the polys from the original object that were contained in that tile.

I hope my description wasn't too confusing and that someone finds this script helpful.

Thanks,
Ken

Attachments: [Tiled Object Chunker.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/8665/)
