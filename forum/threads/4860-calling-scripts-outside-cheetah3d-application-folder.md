# Calling scripts outside Cheetah3D application folder

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4860/
- Subforum: scripting-general
- Started by **kiriko** on 2009-10-28; last post 2010-03-18; 5 posts

## #1 — kiriko — 2009-10-28
<https://www.cheetah3d.com/forum/index.php?threads/4860/post-34671>

Calling scripts outside Cheetah3D application folder

How can I call macro scripts outside the Cheetah3D application folder (e.g. C3D scripts in a Xcode project, which is under subversion control)?

## #2 — tg_jp — 2009-10-28
<https://www.cheetah3d.com/forum/index.php?threads/4860/post-34691>

hi,

you can place your custom scripts into ~/Library/Application Support/Cheetah3D/scripts/... folder, and I can use subversion at this folder with no problem. 

tg_jp, Hiroto

Attachments: [ch_20091029_cap.jpg](https://www.cheetah3d.com/forum/index.php?attachments/8306/)

## #3 — kiriko — 2009-10-29
<https://www.cheetah3d.com/forum/index.php?threads/4860/post-34703>

[[QUOTE:  tg_jp said: you can place your custom scripts into ~/Library/Application Support/Cheetah3D/scripts/... folder, and I can use subversion at this folder with no problem. Click to expand... ]]

Well, but I'd like to keep project related scripts in my project folder 

In Adobe Fireworks for example you can simply run a script from any location. I don't see any reason why it shouldn't be possible in Cheetah3D as well.

## #4 — tg_jp — 2009-10-29
<https://www.cheetah3d.com/forum/index.php?threads/4860/post-34707>

hi,

it seems to work fine a symbolic link file ( command line: ln -s ) in scripts folder. but it may not good for your project management. 

Cheetah3D decides script's kind from installed directly ( Polygonobj -> polygon script object, Tool -> tool script, etc. ) so, we may have to wait new script system for that purpose. 

regards.

tg_jp, Hiroto.

## #5 — James — 2010-03-18
<https://www.cheetah3d.com/forum/index.php?threads/4860/post-40497>

Interesting post dude....Forums are always helpful in one way or the other. Thanks for giving out information. It’s really nice and mean full.
