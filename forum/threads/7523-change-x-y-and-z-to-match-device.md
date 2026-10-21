# Change X, Y, and Z to Match Device

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7523/
- Subforum: scripting-general
- Started by **bittondb** on 2011-07-25; last post 2011-07-27; 5 posts

## #1 — bittondb — 2011-07-25
<https://www.cheetah3d.com/forum/index.php?threads/7523/post-62038>

Change X, Y, and Z to Match Device

I'm having trouble with syncing xyz in Cheetah to xyz on my device. I've created a sphere, and I'm exporting it to a header file. I load that sphere using OpenGL ES 2.0. No problems there.

If you look at the docs from Apple, they depict XYZ as it applies to the device. How do I change xyz for my sphere inside Cheetah so it's the same. The problem that I run into, is when I apply a rotation quaternion, the sphere rotates on the wrong axis. Any help is appreciated. Thanks!

Links: http://tro.pe/nNi4W2

## #2 — podperson — 2011-07-25
<https://www.cheetah3d.com/forum/index.php?threads/7523/post-62042>

A quick experiment in C3D will reveal that the axes in C3D match the diagram in Apple's docs exactly. (Apple colors the X axis green for some reason, which is against convention. It's possible this is a typo, i.e. that the green axis is mislabeled and should be Y, but it would be against all conventions for Y to be the horizontal axis.)

My guess is you've inverted something somewhere, and it's nothing to do with C3D. In any event, converting between systems of axes is simple once you figure out what the problem is (it's just a matter of treating the input coordinates differently -- the usual issues are Z being inverted or Z and Y being interchanged (almost everyone agrees UP and RIGHT are positive: the disagreements tend to be whethere FORWARD is positive or negative, and where UP is Y and FORWARD is Z or UP is Z and FORWARD is Y).

I used to joke that when writing 3d code you had six choices of axis layouts, eight choices of axis direction, and eight choices of axis rotation direction and you'd usually end up coding all the different combinations during debugging. Indeed, the problem you're having could simply be a rotation convention.

(As a side node: coding for the accelerometer is really confusing, at least in Unity.)

## #3 — bittondb — 2011-07-25
<https://www.cheetah3d.com/forum/index.php?threads/7523/post-62049>

The docs state that Z is vertical and X points off into the distance. Am I to assume that where I place my camera in C3D, is where OpenGL will place it as well (assuming no translation)? In C3D, I out my camera a 2 on the Z access, however in order to even see my sphere on the device, I have to translate -2 in the Z direction. If I lie the ipad flat, I can look at the top of the sphere, however when I lift the device toward me from flat, and on the long edge (think landscape right), the sphere rotates toward the left, and not backwards (along what the docs show as the red Y axis).

## #4 — Martin — 2011-07-26
<https://www.cheetah3d.com/forum/index.php?threads/7523/post-62061>

Hi,
the coordinate system Cheetah3D uses is a right hand coordinate system like in OpenGL or OpenGL ES. So the coordinate system should be fine.

Bye
Martin

## #5 — bittondb — 2011-07-27
<https://www.cheetah3d.com/forum/index.php?threads/7523/post-62091>

OK, so if the coord system in Cheetah is the same as in OpenGL ES, for a down and dirty test, where do I put the camera and how do I orientate it? I'll leave the sphere alone.
