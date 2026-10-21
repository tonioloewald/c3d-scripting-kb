# sleep question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6556/
- Subforum: scripting-general
- Started by **murcielago** on 2010-11-21; last post 2010-11-28; 5 posts

## #1 — murcielago — 2010-11-21
<https://www.cheetah3d.com/forum/index.php?threads/6556/post-51753>

sleep question

Is it ok to use sleep in a script in Cheetah?

I want to work on other models while a render script is running.

Sound possible?

## #2 — Martin — 2010-11-22
<https://www.cheetah3d.com/forum/index.php?threads/6556/post-51819>

Which sleep function do you mean?

Bye
Martin

## #3 — tg_jp — 2010-11-25
<https://www.cheetah3d.com/forum/index.php?threads/6556/post-52043>

[[QUOTE:  murcielago said: Is it ok to use sleep in a script in Cheetah? I want to work on other models while a render script is running. Sound possible? Click to expand... ]]

hi, you can use OS.system(); function to call 'sleep [seconds]'. 

	
	


```
OS.system('sleep 10'); // sleep 10 seconds.
```


but Cheetah3D's javascript doesn't work asynchronously, this script blocks other process. I am guessing you have to find another way to do what you do want.

regards.

tg_jp, Hiroto.

## #4 — Martin — 2010-11-25
<https://www.cheetah3d.com/forum/index.php?threads/6556/post-52058>

Calling sleep via OS.system doesn't multi-thread the thread execution of course. And Cheetah3D will probably never allow to run scripts in its own thread. That is extremely complicated.

Bye
Martin

## #5 — pekupk — 2010-11-28
<https://www.cheetah3d.com/forum/index.php?threads/6556/post-52184>

What about unix nice mode?:icon_thumbup: 

Best,
PK
