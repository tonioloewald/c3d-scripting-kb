# console output

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8359/
- Subforum: scripting-general
- Started by **Shoyuken** on 2012-04-21; last post 2012-04-24; 7 posts

## #1 — Shoyuken — 2012-04-21
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69624>

console output

I am new to cheetah 3d so bare with me. I have two questions.

1) Does cheetah 3d has something like a verbose console output where it shows every executed command?
For example; I click on extrude and I will get the extrude command in the console.
I want to write my own scripts but I do not know the syntax, so if I get the verbose output I will know the command or function that I have to use.

2) Is there a script like "drop to floor". Where I can align my object exactly to the floor.

Thanks in advance.

## #2 — tg_jp — 2012-04-22
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69649>

Hi

[[QUOTE:  Shoyuken said: 1) Does cheetah 3d has something like a verbose console output where it shows every executed command? For example; I click on extrude and I will get the extrude command in the console.]]

Cheetah3D has console view, that shows print() output in script, so you can use for debugging. but build-in conmmand like extrude, etc. doesn't has output for console view, though.

[[QUOTE:  Shoyuken said: 2) Is there a script like "drop to floor". Where I can align my object exactly to the floor. Click to expand... ]]

there is some almost same as 'drop to floor', I think. please search it.
and Cheetah3D 6.0 has a physics feature, dropping object onto floor is not difficult with it now.

regards.

tg_jp, Hiroto.

## #3 — Shoyuken — 2012-04-22
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69652>

Thanks for replying.
Please see the two videos. I cannot explain it in words.

Console Output -> http://www.youtube.com/watch?v=D3F5UluUNNY

Drop to Floor -> http://www.youtube.com/watch?v=eJ5L9alv47E

You said that there is no built-in command such as extrude. Can you tell me how do I call such commands in javascript or any other command such as point mode, edge mode, etc.
I bought the ebook "Learn 3D with Cheetah 3D 6 by Tonio Loewald" and there is very little info on scripting. Also I read the manual and there is not much info either. Do you know where can I find the API? I know how to code in javascript and also know how to work with the tools. What I do not know is the obscure world of cheetah 3d scripting API.

Thanks for the help.

Links: http://www.youtube.com/watch?v=D3F5UluUNNY, http://www.youtube.com/watch?v=eJ5L9alv47E

## #4 — Dranix — 2012-04-22
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69674>

Simple - You can't. It's not possible to access the normal functions from the scripting-api.

## #5 — tg_jp — 2012-04-22
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69686>

hi

No api to call command (extrude, inner extrude, etc.) from script, yet. and, you cannot get any info when command is called at console view. but you can check edit mode with "print( doc.editMode() )".

please check script section of Help file for script api. and please check  another scripts you can find at forum as sample code.

about "drop to floor". this tool script has almost same feature. please check it.

http://www.cheetah3d.com/forum/showthread.php?t=3342

1. select floor object at object browser, then click select of "Select first object".
2. select dropped object at object browser, then click click "Bottoms".

regards.

tg_jp, Hiroto

[[QUOTE:  Shoyuken said: Thanks for replying. Please see the two videos. I cannot explain it in words. Console Output -> http://www.youtube.com/watch?v=D3F5UluUNNY Drop to Floor -> http://www.youtube.com/watch]]

Links: http://www.cheetah3d.com/forum/showthread.php?t=3342

## #6 — Shoyuken — 2012-04-24
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69743>

Thanks for all the help. I really appreciate it.

I have been reading other peoples code and is pretty straight forward. I have no problem in that area.
I am trying to customize cheetah 3d to silo 3d workflow. That is why I am so obsessed with all this API, especially the UI.

Ok, here is something simple that I am trying to do.
Assign a script(MyPointMode.js) to the "A key"
The script should change the edit mode to "PointMode" and the selection to "Area Select".

Another script(MyEdgeMode.js) to the "S key"
The script should change to "EdgeMode" and the selection to "Select"

I hope that this is clear. If this is not possible than I will just have to live with the way Cheetah 3d works.

Thanks again for the help.

## #7 — tg_jp — 2012-04-24
<https://www.cheetah3d.com/forum/index.php?threads/8359/post-69750>

hi

It's NOT available to call built-in tool ( like Select, change to Point mode/Edge mode, etc ) from script yet. so you just assign hot-key for each commands.   

regards.

tg_jp, Hiroto.
