# Is the Camera's background color accessible?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9278/
- Subforum: scripting-general
- Started by **feloneouscat** on 2013-01-26; last post 2013-01-27; 2 posts

## #1 — feloneouscat — 2013-01-26
<https://www.cheetah3d.com/forum/index.php?threads/9278/post-76643>

Is the Camera's background color accessible?

I tried the "save camera and lights" script and the r:g:b:a components are undefined even though the color is black.

Is this no longer accessible through Javascript?

## #2 — feloneouscat — 2013-01-27
<https://www.cheetah3d.com/forum/index.php?threads/9278/post-76662>

Never mind, I figured it out (using property in object).

Basically you have the property w, x, y, z where:

w = alpha
x = red
y = green
z = blue

All values are from 0.0 to 1.0.
