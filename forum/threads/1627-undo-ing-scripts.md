# Undo-ing scripts

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1627/
- Subforum: scripting-general
- Started by **ToddWR** on 2007-04-22; last post 2007-07-15; 5 posts

## #1 — ToddWR — 2007-04-22
<https://www.cheetah3d.com/forum/index.php?threads/1627/post-10518>

Undo-ing scripts

Martin,

while working on several scripts in-progress, I noticed that there is no undo for the scripts. undo takes the object back one step before the script was run. For example: make a box, section it off in 3X3 , enter point mode, select a few points, select Stepper.js, move points in any direction. when you do an undo at this point instead of going back to a cube, just the points are deselected. 
just as a side note, using the multi-weld script on several points and then undoing it causes cheetah to crash.

Todd

## #2 — Martin — 2007-04-25
<https://www.cheetah3d.com/forum/index.php?threads/1627/post-10626>

Hi Todd,
yes there is no undo at the moment for scripts. It is indeed quite tricky to enable undo for scripts since scripts can do so many various things that it is difficult to determine resource efficiently what data has to sent to the undo manager.:frown:  That's something I will worry later.

Bye,
Martin

## #3 — DaVinci — 2007-07-07
<https://www.cheetah3d.com/forum/index.php?threads/1627/post-13115>

A possible simple solution would be to cache the current state of the document before executing a script.
When the user then uses 'undo' C3D simply loads the cached document settings from before the script's execution.

## #4 — Martin — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1627/post-13388>

Hi,
that is theoretically possible but also very slow. Just imagine a save of a 100 MByte scene before every script execution. So that is nothing I plan to implement.

Bye,
Martin

## #5 — DaVinci — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1627/post-13391>

[[QUOTE:  Martin said: Hi, that is theoretically possible but also very slow. Just imagine a save of a 100 MByte scene before every script execution. So that is nothing I plan to implement. Bye, Martin Click t]]
Okay, never mind.
