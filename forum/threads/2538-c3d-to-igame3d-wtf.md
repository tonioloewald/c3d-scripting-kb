# C3D to iGame3D WTF

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2538/
- Subforum: scripting-general
- Started by **MrBill** on 2008-01-10; last post 2008-01-11; 6 posts

## #1 — MrBill — 2008-01-10
<https://www.cheetah3d.com/forum/index.php?threads/2538/post-17601>

C3D to iGame3D WTF

Purchased C3D finally last night, overcame my fear and loathing for Javascript and without break a blood vessel I've got  1 C3D object & 1 material exporting to iGame3D WTF format.

Now I have some questions.

1. Where is the "Javascript console" mentioned in Macro/Parameter Info.js. 
   No data printed into Console.app as I expected.

[edit --  found this after reading 80 forum posts and trying my right mouse button]

[edit -- just thinking is there a command to add to that .js file to force the console to show?]

2. Is it possible to have terminal, keyboard, applescript,
   and/or button access to script execution?
I must have made a trip down this menu a million times.
I've got a million more to go.

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}
			
		
		
	

	
		
	

I had the actual C3D file window shoved out of the way for hours,
going back and forth between my script, the top menu, all the way down the menu,
back to Finder, open my exported file, check cheetah docs, check igame3d docs, read javascript webpages.

Speeding up that journey that would be a boon.

3. Theoretically I should be able to end my macro with OS.system(<Open my exported text file>)?

4. Is there an example of scripting a complete scene dump? 
I need to capture groupings, tags, materials, joint values, etc
and I haven't seen where to get all of those. 

Here's the WTF file spec

If anybody knows offhand some of the cheetah speak that will give me any data I need.

Ok thanks.

MrBill

Links: http://www.igame3d.com/wordpress/?page_id=16

## #2 — tg_jp — 2008-01-11
<https://www.cheetah3d.com/forum/index.php?threads/2538/post-17609>

hi,

[[QUOTE:  Purchased C3D finally last night, overcame my fear and loathing for Javascript and without break a blood vessel I've got 1 C3D object & 1 material exporting to iGame3D WTF format. Click to expand... ]]

very interesting. 

> 1

how about 'print()' function.

> 2

it's better to use 'Tool Script' type for it. (actually, still pull down is required to reload after editing script. )

> 3

please check 0S.sytem() sample script I wrote. Cheetah3D's script can access external command or program that can be executed by Terminal.app.

http://cheetah3d.de/forum/showthread.php?t=1936

> 4

I wrote several Exporter scripts. so please check it. ( actually, I cannot explain in my poor english.  )

http://cheetah3d.de/forum/showthread.php?t=1279
http://cheetah3d.de/forum/showthread.php?t=1240

regards.

tg_jp, Hiroto

Links: http://cheetah3d.de/forum/showthread.php?t=1240, http://cheetah3d.de/forum/showthread.php?t=1279, http://cheetah3d.de/forum/showthread.php?t=1936

## #3 — MrBill — 2008-01-11
<https://www.cheetah3d.com/forum/index.php?threads/2538/post-17610>

Thanks I downloaded all the scripts in the forum just a few hours ago, 
getting a keen idea that tool scripts are very interesting items.

Finally have them all the scripts organized and installed, and now 
I will look at those specific scripts you mention above.

print() puts text to the console but how to tell the interface "Show the Console"?

 Thanks for the hints and scripts.

## #4 — tg_jp — 2008-01-11
<https://www.cheetah3d.com/forum/index.php?threads/2538/post-17612>

hi,

[[QUOTE:  print() puts text to the console but how to tell the interface "Show the Console"? Click to expand... ]]

you meant 'Console' view? I don't know a command or key for it directly. but, I am using 'Custom Layout' for debugging script.

or 'Console.app'? Umm.. you can do it with using some external C-program or AppleScript (simply output parameter to STDOUT ) and OS.system call, I think. :?:

[EDIT:] oh, maybe I misunderstood. there is no function for changing Cheetha3D's interface directly from script. but, if you want inform some parameters to script's executer,  how about 'OS.messageBox()' function?

regards.

tg_jp, Hiroto

## #5 — Francois — 2008-01-11
<https://www.cheetah3d.com/forum/index.php?threads/2538/post-17615>

[[QUOTE:  MrBill said: print() puts text to the console but how to tell the interface "Show the Console"? Click to expand... ]]

Hi and welcome here,
You didn't say if you could see the console. Maybe this is what you're looking for :
- You can select a custom layout and save it
- Any window can be splitted and set to display the console (or replaced by the console). Use the right-click near the window name.
- See image 5 below : the material window was splitted to display the console
- I am not sure but I don't think this can be done with a script

François

Attachments: [Image 3.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3766/)

## #6 — MrBill — 2008-01-11
<https://www.cheetah3d.com/forum/index.php?threads/2538/post-17616>

Yes just discovered that and made layout with the console handy.
nifty stuff.
