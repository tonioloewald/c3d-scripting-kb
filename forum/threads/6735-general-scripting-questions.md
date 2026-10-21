# General scripting questions

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6735/
- Subforum: scripting-general
- Started by **Edward** on 2011-01-01; last post 2011-01-02; 3 posts

## #1 — Edward — 2011-01-01
<https://www.cheetah3d.com/forum/index.php?threads/6735/post-53742>

General scripting questions

First of all, Hello Cheetah3D community!

I have some questions about this nifty program.  I have given the manual a fairly thorough look-though and feel a little lost in the scripting department. (I'm using the demo at the moment)

Does each script folder run the scripts differently, or are they only for organization?​
I saw what appear to be special functions like buildUI(). Is there a list of these functions somewhere?​
Can I access object and joint animation data and export values for every frame or export keys?​
Can I add custom properties or tags to objects?​
Thanks,

Edward

## #2 — Martin — 2011-01-02
<https://www.cheetah3d.com/forum/index.php?threads/6735/post-53785>

Hello and welcome to the forum

[[QUOTE:  Edward said: Does each script folder run the scripts differently, or are they only for organization?​ Click to expand... ]]

The scripts are run differently. For example a polygon script creates a parametric polygon object while a tool script creates a tool.

[[QUOTE:  Edward said: I saw what appear to be special functions like buildUI(). Is there a list of these functions somewhere?​ Click to expand... ]]

Outch, you are right. The scripting handles are not documented yet. But the example scripts will help you there. Just use them as a starting point.

[[QUOTE:  Edward said: Can I access object and joint animation data and export values for every frame or export keys?​ Click to expand... ]]

Not yet. But that is on my todo list.

[[QUOTE:  Edward said: Can I add custom properties or tags to objects?​ Click to expand... ]]

Yes, you can write a custom tag script. See the physics.js example tag script.

Bye
Martin

## #3 — Edward — 2011-01-02
<https://www.cheetah3d.com/forum/index.php?threads/6735/post-53786>

Ok- I'll look into the script examples provided.  Thanks for the response
