# relax and be Centered

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2565/
- Subforum: script-downloads
- Started by **ToddWR** on 2008-01-15; last post 2008-12-05; 17 posts

## #1 — ToddWR — 2008-01-15
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-17752>

relax and be Centered

Use this script to move the objects center point to the middle of the object.
place this script in the tools folder. startup cheetah.  select script from the tools menu. click on an object, click the center button. rinse and repeat...

the code is commented if you desire to see how a script works.

Todd

removed the error that was causing the problems

Attachments: [center.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/6028/)

## #2 — tg_jp — 2008-01-16
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-17759>

nice script and cool code!!  

tg_jp, Hiroto

## #3 — podperson — 2008-01-16
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-17790>

Nice comments -- you might turn me into a c3d scripter yet ;-)

## #4 — spiff — 2008-02-09
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18372>

Recentering an object

Hi Todd

I am a professor of computer science at the University of Illinois at Chicago's Electronic Visualization Lab. I have been using Cheetah 3D to create diagrams for proposals and papers. Pardon me if these have been solved already on the forum, I have looked but haven't found a satisfactory solution:

I have used tools from AC3D to Maya, and two things I find I need the most is a way to change the center of a group or an object (without having to physically move the object to the origin). The second is a way to select the highest level group when selecting one of its subobjects. With several dozen objects in hierarchies it quickly becomes impossible to find the object's parents when you need to move them.

I have looked through your center.js script and it seems to make sense. But since I don't know enough about scripting for Cheetah, would you be so kind as to generalize your script so that it can also "recenter" a group based on the subobjects, and not just the vertices of the object?

I also found a reference to some javascript call called owner() but again I cannot find enough information about scripting to be able to take advantage of this.

Anyway help would be greatly appreciated.

Sincerely,

Prof. Jason Leigh

is there a chance you could generalize this script so that it will work to recenter a group based on the bounding box formed from all its children?

Thanks
Jason

## #5 — Francois — 2008-02-09
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18373>

[[QUOTE:  spiff said: ... I need the most is a way to change the center of a group or an object (without having to physically move the object to the origin)... Click to expand... ]]

Jason,
Welcome on this forum.
This may not be exactly what you want but the end result is the same. And that's something you can do with the current version :
- in any scene you want, add a new folder
- move the folder to the new required center of the group or the new required center of the object
- hold the shift key while selecting/droping the group or the object within the folder.
- you can now move/rotate the folder (your group or your object) per your required center

Also, adding folders/sub-folders to your scene is one way to keep things organized. And you can rename/fold/unfold them as needed to keep things clean and still easily accessible.
I think if you play a couple of minutes with a box, a folder and the shift key (try all combinations of move/drop/key), you will quickly see how you can take advantage of this feature.

Edit : oups, I had forgotten.
I just did a quick test and you want to use the shift key when you want the object to follow the folder transformation. I hope this is clear enough.

## #6 — spiff — 2008-02-09
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18377>

Ah I see, I didn't realize there was a Folder as well as a Group. What is the difference between a Folder and a Group? They appear to be the same except you can only create groups by selecting a group of objects and right-clicking from the browser, and you can only create groups from the Scene submenu.

I was perhaps hoping that the formation of a group would result in the automatic centering of the group about the bounding box formed from all its children, whereas folders would default to the origin.

Thanks
Jason

## #7 — ken — 2008-02-09
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18379>

I was under the impression that a group is just a folder named "group" - they're the same.

I don't understand how the shift key works with groups Francois, can you clarify that for me?

## #8 — Francois — 2008-02-10
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18382>

[[QUOTE:  spiff said: ... and you can only create groups from the Scene submenu. Click to expand... ]]

I'm sure you mean ... create Folders from the ...

## #9 — Francois — 2008-02-10
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18383>

[[QUOTE:  ken said: I don't understand how the shift key works with groups Francois, can you clarify that for me? Click to expand... ]]

[[QUOTE:  Francois said: ... I think if you play a couple of minutes with a box, a folder and the shift key (try all combinations of move/drop/key), you will quickly see how you can take advantage of this feat]]

I'm not sure what else I can add ... other than a step by step ...
- new file, add folder, add box, move box to x=-2
- drop box into folder, drop box out of the folder, notice the way the box react in the preview window => no changes
- do the same as above but hold shift key while dropping in/out => no changes

- start over with a new file, do the same as above except move the folder instead of the box, leave the box at 0,0,0
- do all combinations of dropping the box in/out of the folder while the shift key is pressed or not and notice how the box react. 

Now if you do the same things with a group instead of the box, it's the same

## #10 — ken — 2008-02-10
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18384>

Ah, I see how it works now, thanks. Interesting behavior.

## #11 — Rock d'Funk — 2008-02-26
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18868>

[[QUOTE:  ToddWR said: Use this script to move the objects center point to the middle of the object. place this script in the tools folder. startup cheetah. select script from the tools menu. click on an objec]]

I seem to be missing something. I select the script, then a polyscript object gets created, then click and/or shift click on an object, I click the center button but nothing happens. What am I not doing right?

## #12 — ToddWR — 2008-02-26
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18871>

make sure the script is in the 'tools' folder. I am working on an update to this script. look for it in the next few days.

Todd

## #13 — Rock d'Funk — 2008-02-26
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18873>

[[QUOTE:  ToddWR said: make sure the script is in the 'tools' folder. I am working on an update to this script. look for it in the next few days. Todd Click to expand... ]]

now the object moves to the point of origin instead the origin moving to the center of the object. Is this normal?

## #14 — Rock d'Funk — 2008-02-26
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-18874>

it would also help if the script was undoable. Better save cause you can't undo it!

## #15 — Targos — 2008-09-19
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-24790>

This script seems to be quite unreliable, as the previous poster said, It moves objects to the origin, and has no undo. :frown: 

Looking forward to the Cheetah5 toolset.  :icon_thumbup: 

AC

## #16 — Brady — 2008-12-04
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-26175>

Yes, I'm working on a HUGE (in terms of coordinate space extents) model with tiny pieces, and relocating the objects to the origin would be Very Bad as the origin is a LONG ways away from where the objects are originally.

It would be perfect if, instead of moving the geometry to match the center point, it could move the center point to where the geometry is.

## #17 — podperson — 2008-12-05
<https://www.cheetah3d.com/forum/index.php?threads/2565/post-26188>

It's not perfect, but I think my script (based on this) works better:

http://www.cheetah3d.de/forum/showthread.php?t=3537

Links: http://www.cheetah3d.de/forum/showthread.php?t=3537
