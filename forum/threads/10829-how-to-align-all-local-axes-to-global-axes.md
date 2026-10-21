# How to align all local axes to global axes?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10829/
- Subforum: scripting-general
- Started by **artgolf** on 2014-11-14; last post 2014-11-18; 5 posts

## #1 — artgolf — 2014-11-14
<https://www.cheetah3d.com/forum/index.php?threads/10829/post-91455>

How to align all local axis to global axis?

I have some models skinned in Maya LT 2015, now I use Cheetah3D.

I want to use the great Pose Utility script to speedup my workflow, but the local orientations of the bones is of Maya style, so I need to correct all joints in pivot mode, or I have to drop the old skeleton and generate complete new skeleton in Cheetah3D then do skinning again.

So my question is: Is it possible to align all local axis to global axis by Javascript?

## #2 — frank beckmann — 2014-11-16
<https://www.cheetah3d.com/forum/index.php?threads/10829/post-91514>

I guess you´re using FBX for the transit. Have you checked Cheetah3d´s FBX import preferences regarding pre(post-rotation) already?
Otherwise a small example file might help here.

Cheers
Frank

## #3 — artgolf — 2014-11-16
<https://www.cheetah3d.com/forum/index.php?threads/10829/post-91515>

Find two solutions:

1. Orient all joints with:
YXZ +X

2. Orient all joints with:
ZXY +X

The script of 'Pose Utility' works fine now.

## #4 — artgolf — 2014-11-17
<https://www.cheetah3d.com/forum/index.php?threads/10829/post-91547>

Hello,

I have modified the Pose Utility script, added two features:

1. Reset Axis
Let you clear all rotations while keeping all positions.

Maya style bind pose usually has many pre-rotations and post-rotations, even if you checked that of FBX import setting, the loaded joint merged them to its rotations, the independent pre-rotation and post-rotation are actually lost in the joint, so if you reset all the rotations in Pose Utility script, the pose looks very strange, but you may use this new function to clear all the rotations while keeping all positions in bind pose, so it becomes the new bind pose.

Then you can orient all joints with your desired axis, I use the default (Orientation: XYZ, Second Axis: +Z) mode, and skin your model with the new bind pose again in Cheetah3D.

The new skeleton can use the script to mirror poses and swapped poses between left and right correctly now.

2. Second Axis
If the second axis of the joints is not the default +X axis of the Pose Utility script, such as +Z, +Y, etc. it can not work correctly, so I added this option, you may select that axis if you are using a different second axis.

Note: The new functions may not work in all cases, but it really helped me a lot.:smile:

Attachments: [Reset Axis.zip](https://www.cheetah3d.com/forum/index.php?attachments/25099/)

## #5 — artgolf — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/10829/post-91578>

Please download the script again, for I have just fixed two bugs:
1. Forget to clear prefrot, postrot, prerot.
2. Duplicated symbol of 'L,R' in the original 'Pose Utility.js', this is an old bug.
You can really align the local axis to the global axis now.
