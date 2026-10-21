# Run script from OSX command line?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12876/
- Subforum: scripting-general
- Started by **jeffcase** on 2018-04-25; last post 2018-05-27; 6 posts

## #1 — jeffcase — 2018-04-25
<https://www.cheetah3d.com/forum/index.php?threads/12876/post-111706>

Run script from OSX command line?

I would like to run a Cheetah JS script from the command line. Is it possible to run Cheetah from the command line with arguments?

TIA
Jeff

## #2 — Martin — 2018-04-26
<https://www.cheetah3d.com/forum/index.php?threads/12876/post-111714>

No, that's not possible. Sorry.

## #3 — jeffcase — 2018-04-26
<https://www.cheetah3d.com/forum/index.php?threads/12876/post-111746>

Thank you for your reply. I was afraid of that however. I'm trying to do some work with DEM data and developing a workaround for linking node output to a displacement modifier using a frame-by-frame animation script. Any help on this would be appreciated.

Jeff

## #4 — misoversaturated — 2018-04-27
<https://www.cheetah3d.com/forum/index.php?threads/12876/post-111755>

[[QUOTE:  jeffcase said: a workaround for linking node output to a displacement modifier Click to expand... ]]

Dunno if this helps but C3D accepts movie clips as image input for the displacement modifier.
But there is no "bake animation" command.
If you could manage to render your node output with a solid shader or diffuse ambient to a plane with an orthographic camera, but fractured according to the UV texture mapping, you might get somewhere...

Attachments: [displm.gif](https://www.cheetah3d.com/forum/index.php?attachments/32605/)

## #5 — podperson — 2018-05-17
<https://www.cheetah3d.com/forum/index.php?threads/12876/post-112007>

Actually you can do it but it's pretty gnarly.

Apple has added the ability to script ANY Cocoa app via AppleScript if Accessibility settings permit it.

So, you need to set up your Accessibility settings and then you'll need to write (ugh) AppleScript:

e.g.

	
	


```
on listScripts(type)
	set menu_name to type & " Script"
	tell application "System Events"
		tell process "Cheetah3D"
			name of every menu item of menu of menu item menu_name of menu of menu item "Script" of menu "Tools" of menu bar 1
		end tell
	end tell
end listScripts

on runScriptByName(type, name)
	tell application "Cheetah3D"
		activate
	end tell
	set menu_name to type & " Script"
	tell application "System Events"
		tell process "Cheetah3D"
			click menu item name of menu of menu item menu_name of menu of menu item "Script" of menu "Tools" of menu bar 1
		end tell
	end tell
end runScriptByName

runScriptByName("Macro", "Parameter Info.js")
listScripts("Polygon")
```


Edit: I've refactored the code above to be more readable and reusable. listScripts() will spit out all the scripts of a given type, while runScriptByName() does what it says on the lid.

So you can so something like the following:

do all this crazy stuff
write data into a javascript macro file inside the Cheetah 3D scripts folder.
call the applescript from the command line which causes C3D to execute the script by name.

Links: https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/AutomatetheUserInterface.html

## #6 — jeffcase — 2018-05-27
<https://www.cheetah3d.com/forum/index.php?threads/12876/post-112162>

Thank you for your response. That is the workaround I have been using. I would like to do this without the overhead of AS by calling a Cheetah macro from the command line using a JS file as an argument. But gnarly as it is, the above method gets at the 'workaround for linking node output to a displacement modifier' issue very effectively. By writing some JS dynamically, this method allows for some intermediate work on-the-fly. Using this method I'm creating dynamic changes to the input texture images of displacement modifier(s), while scripting the animation process.
