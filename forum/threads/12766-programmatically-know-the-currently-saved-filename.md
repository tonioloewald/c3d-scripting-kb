# Programmatically know the currently-saved filename?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12766/
- Subforum: scripting-general
- Started by **galactikore** on 2018-01-27; last post 2018-02-04; 2 posts

## #1 — galactikore — 2018-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12766/post-110695>

Programmatically know the currently-saved filename?

Hello,

Is there a way I can obtain the currently-saved file's name and path, through the scripting interface? I have been poring over the docs for OS and File (and others!), but haven't seen anything there.

I'm essentially trying to skip a step and save my RSI-prone wrist a few moves-and-clicks, and auto-export the current geometry to a BabylonJS file in the filesystem at the current file's path, using the current file's name as a basis (e.g. saving MyScene, with my intended functionality, would give me MyScene.max.babylon and MyScene.babylon, for which I'm building an auto-loader to pump these graphics to the browser on file-change).

I can certainly prompt myself with the Save As dialog, and I've even gotten the system to auto-export by using something like OS.system('echo ${json} > /path/to/export/file`), but neither of these allows me to really get what I want.

Any help would be appreciated!

Thanks,
- Peter

## #2 — Martin — 2018-02-04
<https://www.cheetah3d.com/forum/index.php?threads/12766/post-110752>

Hi Peter,
and welcome to the forum. I've added a function call to Cheetah3D v7.2 Beta 3 which returns the file name/path of the document. It's available in the Document class.

Document::fileName()

Nevertheless I would recommend you to use the Save dialog box if you decide to share your exporter script. Maybe users prefer to change the name of the exported file.

Bye
Martin

Links: https://www.cheetah3d.com/forum/showthread.php?t=12773
