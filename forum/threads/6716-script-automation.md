# Script Automation

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6716/
- Subforum: scripting-general
- Started by **kryngle** on 2010-12-27; last post 2010-12-28; 4 posts

## #1 — kryngle — 2010-12-27
<https://www.cheetah3d.com/forum/index.php?threads/6716/post-53492>

Script Automation

Does anyone know if it is possible to invoke a script ( particularly a macro script ) from the terminal or through an applescript?  I have a script that takes results from a physics simulation and renders animations.  It would be fantastic if the rendering of the results could be somehow started once the simulations finish.

Thank you in advance,
Kryngle

## #2 — Martin — 2010-12-27
<https://www.cheetah3d.com/forum/index.php?threads/6716/post-53509>

Sorry but that isn't possible yet.

Bye
Martin

## #3 — kryngle — 2010-12-27
<https://www.cheetah3d.com/forum/index.php?threads/6716/post-53516>

Thank you Martin,

Is there any chance of a feature of this sort in the future?

## #4 — tg_jp — 2010-12-28
<https://www.cheetah3d.com/forum/index.php?threads/6716/post-53559>

hi

[[QUOTE:  Does anyone know if it is possible to invoke a script ( particularly a macro script ) from the terminal or through an applescript? I have a script that takes results from a physics simulation and ren]]

via AppleScript with Keyboard Shortcut for script menu, it works. please check below code.

	
	


```
-- you have to assign [control + a] short cut key for script menu that you want invoke,
--         at System Preferences... -> Keyboard -> Keyboard Shortcut.

tell application "System Events"
	tell process "Cheetah3D"
		set frontmost to true
		keystroke "a" using {control down} -- in case that your assignment is Control + a.
	end tell
end tell
```


also, AppleScript can emulate Mouse click for Menu command ( it requires setting at Universal Access ). I think you can do what you want via AppleScript. 
 
regards.

tg_jp, Hiroto.
