# Script Development

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8822/
- Subforum: scripting-general
- Started by **simonwittber** on 2012-09-21; last post 2012-10-03; 5 posts

## #1 — simonwittber — 2012-09-21
<https://www.cheetah3d.com/forum/index.php?threads/8822/post-73283>

Script Development

Greetings Fellow Cheetah3D people!

I've been using Cheetah for some years (since V4) and have just joined the forum. I'd like to get into extending Cheetah with some of my own scripts, and am wondering what is the usual way that scripts are developed and debugged?

Is there a javascript console or output window? Are scripts just edited in place? Do I have to restart Cheetah whenever I change a script? Any other helpful advice?

Thanks!

-Sw.

## #2 — simonwittber — 2012-09-21
<https://www.cheetah3d.com/forum/index.php?threads/8822/post-73290>

I found the answers to some of my questions.

The console window is found by right clicking a tab panel and choosing console. 

Tool scripts can be reloaded by selecting a different tool, then selecting the script again. Is there a more efficient way to do this?

## #3 — Swizl — 2012-09-21
<https://www.cheetah3d.com/forum/index.php?threads/8822/post-73301>

Hi and welcome to the forums! 

Yeah, you just have to have the script placed in the proper folder before starting C3d. Once you do though you can edit the script and then reload it from the menu and not have to restart C3d. Some of the script writers here temporarily assign a hot key to the script they are working on, that way they can quickly load it after making changes to the script. 

You've probably seen some of tg_jp's stuff. He's probably one of the most prolific script writers here. Here's his blog: http://www.tres-graficos.jp/blog/category.php?k=Cheetah3D

You can probably find some references to what you need to get started there. I created a pdf version of the help file. That way you can put it on a tablet if you have one, or do like I did and print out just the pages for scripting to refer to the API. I'm a very beginning scripter, so I can't help much in that regard. I've just started by mimicking what I find in other scripts that have been posted. If you have a specific problem with a script you're writing, I'm sure someone will chime in to help.

Good luck!

Links: http://www.cheetah3d.com/forum/showthread.php?t=8327&highlight=pdf, http://www.tres-graficos.jp/blog/category.php?k=Cheetah3D

## #4 — StarCmd — 2012-10-02
<https://www.cheetah3d.com/forum/index.php?threads/8822/post-73640>

I have perhaps not understood. It does not really reload the script but rather create a new object.
Mine is a polygon script. I did not find a way to "update" the model in my scene after editing the code, except closing / opening the file.
Changing tools, parameters, even moving the object does not "refresh" the code.
Did I missed something ?

## #5 — tg_jp — 2012-10-03
<https://www.cheetah3d.com/forum/index.php?threads/8822/post-73656>

hi

from my experience, every time it's called by menu bar or opened from file, script objects will be made from current script data. but script objects ( polygon/spline/tag/particle ) are placed to scene, already added object is not updated if script file is edited.

tool script with history backward/forward command also is not refreshed.

I usually assign hot-key temporarily for fast development of scripts.  

btw, to update script menu of menu bar, restarting Cheetah3D is required. I think.

regards.

tg_jp, Hiroto
