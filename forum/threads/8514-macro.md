# Macro?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8514/
- Subforum: scripting-general
- Started by **Nichod** on 2012-05-27; last post 2021-11-08; 5 posts

## #1 — Nichod — 2012-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8514/post-70814>

Macro?

Is there a way to execute some of C3D's built in tools in sequence? 
ie. 1. Insert sphere 2. change sphere settings 3. add a bulge and adjust settings 4. make mesh editable

## #2 — Martin — 2012-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8514/post-70821>

Hi,
yes, with a macro script. Only point 4. is not possible yet since there doesn't exists a Javascript function yet to perform the "Make editable" command. But the first 3 points can be done with a macro script.

Bye
Martin

## #3 — Martin — 2012-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8514/post-70826>

Hi,
here is a small example script which shows how to create objects and set parameters.

Bye
Martin

Attachments: [CreateObjects.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/17265/)

## #4 — Nichod — 2012-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8514/post-70827>

Thank you Martin! I'll take a look at that. It looks pretty simple. I noticed that Cheetah has a console. What is the intended purpose of that? Would be great to see a read out of operations as they are done. Blender has a "info" window that displays the operators that are executed by the user when using the tools within the program. (ie. inserting a mesh would show bpy.ops.object.add(array) in the info window) Would be nice if javascript equivalents could be displayed in a similar way within Cheetah. I think it would be useful for those learning scripting.

## #5 — crgreen — 2021-11-08
<https://www.cheetah3d.com/forum/index.php?threads/8514/post-124200>

[[QUOTE:  Martin said: Hi, yes, with a macro script. Only point 4. is not possible yet since there doesn't exists a Javascript function yet to perform the "Make editable" command. But the first 3 points can be]]

Was a "make editable" command ever implemented?
