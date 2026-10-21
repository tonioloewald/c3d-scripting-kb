# Funny workaround for lost "makeEditable" function

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12277/
- Subforum: scripting-general
- Started by **Oval** on 2017-01-31; last post 2017-01-31; 1 posts

## #1 — Oval — 2017-01-31
<https://www.cheetah3d.com/forum/index.php?threads/12277/post-105742>

Funny workaround for lost "makeEditable" function

Run Automator app and type this simple Javascript:

	
	


```
var se = Application('System Events');
var c3d = Application('Cheetah3D.app'); //mine is 'Cheetah3D 7-20.app'
c3d.activate();
delay(0.2)
se.keystroke('c', { using: [ 'option down', 'command down' ] });
```


save it to /somwhere/makeeditable.app. Mine is in /Users/oval/Library/Application Support/Cheetah3D/Scripts/Tool/makeeditable.app

then after all (recommend at the end of your script):

	
	


```
doc.selectObject(your_modifer_object, false);
OS.system("open /Users/oval/Library/[B]'[/B]Application Support[B]'[/B]/Cheetah3D/Scripts/Tool/makeeditable.app");
```
