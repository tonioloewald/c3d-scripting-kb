# request: waving flag with bones

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5699/
- Subforum: scripting-general
- Started by **broozar** on 2010-05-03; last post 2010-05-03; 3 posts

## #1 — broozar — 2010-05-03
<https://www.cheetah3d.com/forum/index.php?threads/5699/post-42008>

request: waving flag with bones

hi everyone,

i need a script for the following setup:

 click to enlarge

the flag should wave quite naturally and the animation should be loopable. this is for a game engine which does not support morphs, only bone animation, so i cannot use the one script that has been posted before.

if you could script me that one or point me in the right direction, i would be very happy. thanks in advance.

Links: http://somepic.someserver.de/pics/big/654bc49a611378c94b588c550820624c.png

## #2 — Francois — 2010-05-03
<https://www.cheetah3d.com/forum/index.php?threads/5699/post-42015>

[[QUOTE:  broozar said: hi everyone, i need a script for the following setup: click to enlarge the flag should wave quite naturally and the animation should be loopable. this is for a game engine which does no]]

Hi,
You could do it by adding an IK tag (with a target) to the last bone. Then move the target and record various positions. Add a start and an end pose to be able to loop easily. You might have to move manually some bones for a smooth effect.

Attachments: [Image 1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/10625/)

## #3 — broozar — 2010-05-03
<https://www.cheetah3d.com/forum/index.php?threads/5699/post-42020>

thanks, this looks good indeed, but is not perfect, as the bones further back in the chain mostly stay in line and need manual tuning. plus it's unreal to apply a force at the tip of the flag, when the wind comes from the other side.
