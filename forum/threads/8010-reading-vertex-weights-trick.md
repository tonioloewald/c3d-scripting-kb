# Reading vertex weights trick

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8010/
- Subforum: scripting-general
- Started by **Edward** on 2012-01-13; last post 2012-01-13; 1 posts

## #1 — Edward — 2012-01-13
<https://www.cheetah3d.com/forum/index.php?threads/8010/post-66524>

Reading vertex weights trick

Hello,

I just purchased cheetah3D today and was bummed to see that I couldn't access vertex weights from a script. I thought of a neat way to read weight values from a weighted mesh. The algorithm goes like this if anyone else is interested.

A - From joint, find first mesh parent
B - Store all parent vertices in world space
C - Move joint 1 unit in the x axis and apply
D - Find weights by subtracting old vertices from new positions
E - Move joint back 1 unit in the x axis and apply

Of course this probably won't work with IK active but seems sufficient so far. Also it assumes the joints are parented to the mesh being deformed and no meshes are parented within the joint structure.

Greg
