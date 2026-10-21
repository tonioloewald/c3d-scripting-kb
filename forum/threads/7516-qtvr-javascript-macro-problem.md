# QTVR JavaScript Macro Problem

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7516/
- Subforum: scripting-general
- Started by **Swizl** on 2011-07-22; last post 2011-07-25; 4 posts

## #1 — Swizl — 2011-07-22
<https://www.cheetah3d.com/forum/index.php?threads/7516/post-61962>

QTVR JavaScript Macro Problem

I decided to test making a QTVR file and used the JavaScript that comes with C3d. It's throwing an error code though (Wrong number or type of arguments). Any ideas on what the problem is? I just made a sphere to figure out how to use this function.

Thanks!

Attachments: [QTVR Script Problem.jpg](https://www.cheetah3d.com/forum/index.php?attachments/15229/)

## #2 — Francois — 2011-07-24
<https://www.cheetah3d.com/forum/index.php?threads/7516/post-62019>

[[QUOTE:  Swizl said: I decided to test making a QTVR file and used the JavaScript that comes with C3d. It's throwing an error code though (Wrong number or type of arguments). Any ideas on what the problem is?]]

Hi,

Please see these posts here and here

Links: http://www.cheetah3d.com/forum/showthread.php?p=62017, http://www.cheetah3d.com/forum/showthread.php?p=62018

## #3 — Francois — 2011-07-24
<https://www.cheetah3d.com/forum/index.php?threads/7516/post-62020>

[[QUOTE:  Swizl said: ... It's throwing an error code though (Wrong number or type of arguments). Any ideas on what the problem is? Click to expand... ]]

You need to edit the line 28 to be like this ( in red what has to be added ): 
    var path=OS.runSavePanel("");

See also here as a possible alternative

Links: http://www.cheetah3d.com/forum/showpost.php?p=230&postcount=1

## #4 — Swizl — 2011-07-25
<https://www.cheetah3d.com/forum/index.php?threads/7516/post-62048>

Thanks Francoise! I'll check it out later when I have some time.
