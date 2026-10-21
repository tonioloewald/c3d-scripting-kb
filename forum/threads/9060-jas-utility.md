# Jas Utility

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9060/
- Subforum: script-downloads
- Started by **Edward** on 2012-12-01; last post 2012-12-02; 3 posts

## #1 — Edward — 2012-12-01
<https://www.cheetah3d.com/forum/index.php?threads/9060/post-75066>

Jas Utility

Jas Utility

Description
-------------
Extracts data from jas files that is not accessible through javascript. Currently this only extracts weights within the scene's skeleton tags. Feel free to modify this script to fit your needs.

Getting Started
-----------------
Place "Jas Utility.py" and "Jas Utility Demo.js" into the Macro scripts folder. Please modify Preferences->Files->.jas so that 'binary' is unchecked.

Attachments: [Jas Utility.zip](https://www.cheetah3d.com/forum/index.php?attachments/18618/)

## #2 — KurtF — 2012-12-01
<https://www.cheetah3d.com/forum/index.php?threads/9060/post-75077>

Hello Edward.

Thanks for your two scripts, the python and the javascript. I'm not at a point where I can use them, but I plan on studying both carefully. I especially like the way you've commented your code. Excellent.

I took a little bit of python scripting for Maya in University and want to dive into Javascript for Cheetah 3D.

Thanks again.

## #3 — Edward — 2012-12-02
<https://www.cheetah3d.com/forum/index.php?threads/9060/post-75098>

You're welcome - I'm glad to hear that you find them useful!

For future reference, the getObjects function uses a slightly advanced topic called a 'tree traversal'. The function just collects all of the objects and their children into a flat list. I like to use a stack, but you can also use recursion which is when a function calls itself repeatedly, and is what the scripts use that ship with Cheetah3D.
