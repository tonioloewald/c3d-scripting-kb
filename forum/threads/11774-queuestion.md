# Queuestion

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11774/
- Subforum: scripting-general
- Started by **Joel** on 2016-04-09; last post 2016-05-20; 7 posts

## #1 — Joel — 2016-04-09
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-100319>

Queuestion

Re:
Is there a way to "Que" renders...? - 14.04.2008
http://www.cheetah3d.com/forum/showthread.php?t=2941

Sequential Batch Render - 05.04.2016
http://www.cheetah3d.com/forum/showthread.php?t=11767

It would be great to be able to automate the rendering of a queue of Cheetah 3D files, one after another. It seems like such a simple thing to do, but forum posts going back at least eight years say otherwise. I would like to understand why this is so. Aside from some cut-and-paste html/Javascript experiments a long time ago, I have no experience with, or talent for, scripting, so I know this question is naive, but anyway .... 

If I understand the situation correctly, it has not been possible to use Automator, Applescript, Javascript, or any more technical languages to make a script or application that would take the place of waiting for a signal to push a button — the same signal, the same button, over and over. Ding! Click ... Ding! Click ... Ding! Click ....

The constraint seems to be the absence of any feedback indicating the completion of a render, triggering the process with the next file. I am pretty sure it is not hard to make a script to open a specific file for a single render. The completed render then goes into the Users/Library/Application Support/Cheetah 3D/Render History folder. Would it be possible to add a function to such a script that detects when this folder has been changed? Or maybe a similar change in the total hard drive memory used/left? Even if it required quitting and restarting Cheetah 3D for every render or putting each .jas file in a separate numbered folder, whatever — any work-around that serves to restart the next file.

Writing code is a complete mystery to me, and what Dr. Martin Wengenmayer does is beyond my comprehension. Hiroto and others have contributed valuable scripts for most anything users have requested. Is it really impossible to make something that tells Cheetah 3D to do what it always does, but just more than once?

PS: Version 7 beta testers, is this included?

Links: http://www.cheetah3d.com/forum/showthread.php?t=11767, http://www.cheetah3d.com/forum/showthread.php?t=2941

## #2 — tg_jp — 2016-04-13
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-100364>

Hi Joel

If you are using OSX 10.10 ( Yosemite ) or above, I can write some macro script for batch rendering with JXA system.

It's available to control system event with Javascript.

Best

tg_jp, Hiroto

## #3 — Joel — 2016-04-15
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-100428>

Yosemite queue

Hi Hiroto,

First of all, many thanks for all the incredible features you have added to C3D. All users benefit from your unique ability to make great scripts.

I do have Yosemite and if you would make a render queue that waits for the current render to finish before starting the next one it would be my #1 script. I tried to make something using Automator but I could not design it to always wait.

http://www.cheetah3d.com/forum/showthread.php?p=100378#post100378

Thanks,
Joel

Links: http://www.cheetah3d.com/forum/showthread.php?p=100378#post100378

## #4 — tg_jp — 2016-04-23
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-100499>

Hi

I attached the first version of script files for Batch Rendering.

It contains 2 files: JXA script file ( it can be opened with Script Editor.app, edit or export as Application ), helper macro script for Cheetah3D.

Steps

1. Place Batch Render Helper.js file into ~/Library/Application Support/Cheetah3D/Scripts/Macro folder. Relaunch Cheetah3D and assign hot key for this script at Environment Settings of Cheetah3D ( see attached pic ). default hot key is "[ + shift + option", you can modify it at JXA script file.

2. Open .script file with Script Editor.app, and click "Play" button. ( or after exporting it as application, you can double click exported app file to execute batch rendering. )

3. At first, choose a folder contains .jas file for batch renderings, at second choose a folder for output. then, after selecting output format, automatically .jas file will be opened and started rendering.

after rendering each file, script will emulate user actions to close document / cancel save dialog. it takes 3 seconds or more, so don't change active window in that time.

Best.

tg_jp, Hiroto

Attachments: [Batch_Render_for_Cheetah3D_v20160423.zip](https://www.cheetah3d.com/forum/index.php?attachments/28706/), [????????? 2016-04-23 17.23.18.png](https://www.cheetah3d.com/forum/index.php?attachments/28707/)

## #5 — Joel — 2016-04-26
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-100543>

Initial test results

Hi Hiroto,

Thank you for working out the first version of the two-part Batch Render Helper (Applescript and javascript). Out of curiosity I looked at both scripts, in Script Editor and TextEdit, but having no real experience with coding I only recognized the most obvious parts. It's definitely complex.

I am running OS X 10.10.2. I followed your directions for getting started, making the keyboard shortcut for the javascript file placed in C3D's Macro folder. and ran the Applescript repeatedly with a queue of nine .jas files. Each file depicts a simple ball with a wireframe material, and each takes nine seconds to render. As directed, I indicated the queue folder and output folder, and chose Tiff file format.

Once the script begins, I do not move or click the mouse or press any key until the script is done and stops.

In general, the script tries to open each file in alphanumeric order, regardless of how they were sorted in the queue folder, although if I had 10 files it would follow the sequence of 1-10-2-3-4-5-6-7-8-9. As I will note in detail, the sequence skips around and doesn't render all the files. The attached pictures show files 1 through 9 in the queue, in order of "Name," and the files that got rendered: 1, 3, 5, 7, and 9, in order of "Date Created." The second picture shows the order that C3D opened them: 2, 1, 4, 3, 6, 5, 8, 7, and 9.

I ran the script repeatedly, and the sequence of actions was consistent. This is how it appeared on screen:

1 opens; Render Manager comes to front, but even though the rendering seemed to be happening (time passes while a beach ball spins) there is no apparent activity in the Render Manager. A message appears: "Rendering has finished: 1.jas; 1/9." Prompt appears: Save Changes? File 1 remains on screen.

3 opens; Render Manager comes to front, ca. 10 second pause during render (not apparent in Render Manager, but render #1 is now visible). A message appears: "Rendering has finished: 2.jas; 2/9." A second message appears right after: "Rendering has finished: 3.jas; 3/9." Prompt appears: Save Changes? File 3 remains on screen.

This pattern repeats:

5 opens, renders, "Finished 4 4/9" "Finished 5 5/9"
7 opens, renders, "Finished 6 6/9" "Finished 7 7/9"
9 opens, renders, "Finished 8 8/9" "Finished 9 9/9"

After the script is done, all nine files remain open, stacked in the following order, from top to bottom: 9, 7, 8, 5, 6, 3, 4, 1, 2. Note that the order is the same as listed in File — Open Recent in the second picture.

Here is another possible clue: When asked to choose a file format to start the script (jpeg, png, tiff) if you hit the Cancel button the script opens every file in order from 1 to 9 but doesn't render. Instead it displays the message "File format is undefined" as each file opens, nine times. So it seems to be able to open the queue in the right order, but the render process or timing gets it out of synch.  

If you are still willing to refine this script, maybe my notes will help you to identify where the bug is.

Thanks again,

Joel

PS: One more detail: the renders were rectangular but the flle icons were square, scaling the image inward.

Attachments: [sequences.jpg](https://www.cheetah3d.com/forum/index.php?attachments/28727/), [open_sequence.jpg](https://www.cheetah3d.com/forum/index.php?attachments/28728/)

## #6 — tg_jp — 2016-05-20
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-101203>

Hello, thank you for testing it.

I will think about more accurate method for batch renderings. current method ( JXA of OSX and macro helper ) depends on some environment...

Best

tg_jp, Hiroto

## #7 — podperson — 2016-05-20
<https://www.cheetah3d.com/forum/index.php?threads/11774/post-101213>

I think we discussed this in a different thread. The simplest method is to look at processes to see how much cpu cheetah is using.
