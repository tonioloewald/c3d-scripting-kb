# Material Helper.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9707/
- Subforum: script-downloads
- Started by **tg_jp** on 2013-07-05; last post 2021-11-19; 19 posts

## #1 — tg_jp — 2013-07-05
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-80287>

Material Helper.js

It's a tool script to manipulate material system. 

it has just one function yet. I will update for more functions.

download: http://www.tres-graficos.jp/blog/files/article.php?id=99

----

Texture Helper

gather all textures : all textures in scene will be copied certain folder by clicking "copy" button.
tex. folder : if you want to copy all textures into arbitrary sub folder, set folder name for this parameter. if it's blank, sub folder won't be created. default value is 'Textures'.

regards

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=99

## #2 — robsil — 2013-07-05
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-80289>

Great job Hiroto.
All textures are gathered.
I sent the entire file to a friend and I'll let you know if it works.

## #3 — Martin — 2013-07-06
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-80320>

Excellent script Hiroto. Many thanks 

Kind regards
Martin

## #4 — tg_jp — 2013-07-08
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-80352>

thank you for your comments.  

if you have any request for materials, let me know it. 

regards.

tg_jp, Hiroto.

## #5 — uncle808us — 2015-03-24
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-94302>

[[QUOTE:  tg_jp said: thank you for your comments. if you have any request for materials, let me know it. regards. tg_jp, Hiroto. Click to expand... ]]

I can not get this tool to work. Could you explain? Thanks I hit copy but don't find a folder with my textures gathered into it.

## #6 — pegot — 2016-10-09
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-103649>

I can't get this script to work either.  Is it still functioning with v7?

## #7 — uncle808us — 2016-10-09
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-103652>

Still works but I can only get it to save the textures to the desktop.Don'r know why. I haven't seen tg_jp or Frank lately.

## #8 — pegot — 2016-10-09
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-103653>

Yes it did work for me but it must have taken a while because I only noticed the textures in the folder sometime after I closed Cheetah and moved on to something else.  There is no progress indicator and I did not see the files being copied one by one so maybe it holds everything in memory and only shows the end result after all files have been processed?????

## #9 — uncle808us — 2019-04-07
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-115804>

Nope never showed up in the selected folder but when saved to the desktop they show up instantly. ?????

## #10 — uncle808us — 2021-11-11
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124209>

Material Helper Script: 
I use this script all the time on C3D Ver.7.5.1 
The only problem I have is it will only save to the desktop. If I try to save any where else the files are not saved. Is this by design?

## #11 — frank beckmann — 2021-11-15
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124222>

I was able to save to "Documents". It creates a folder named "Textures" in which the images are stored (copied&pasted) like written in the script.

## #12 — BTT1024 — 2021-11-15
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124223>

[[QUOTE:  uncle808us said: Material Helper Script: I use this script all the time on C3D Ver.7.5.1 The only problem I have is it will only save to the desktop. If I try to save any where else the files are not]]
uncle808us,
 I ran into the same issue you did, when testing on my laptop...

 The problem you are encountering  occurs  when your Target Directory Path (selected from the pop-up file browser) contains spaces in any of the Folder names in the Path...

 I did a google search to find the best method for wrapping file paths that contain spaces, when creating directories on the Mac OS X command line (the java script calls the OS file system to create the directory) -  Looking at the "Material Helper.js" java script, the line "OS.system( "mkdir " + dir );" needs to be changed to "OS.system( "mkdir " + "'" + dir + "'");"... 

 I made the change to the script on my laptop and it now works fine with any target directory that has spaces in any of the folder names in the path.

 (the other way would be to use the replace function to prefix spaces in the path with a "\" character - the wrapping with single quotes is the easiest method)

I'm not sure on @tg_jp  (Hiroto's) policy on modifying his scripts, but I guess making a temporary edit is fine until he updates the script...

 I've copied (@tg_jp) Hiroto on this post so that he can update the master script and post the update for all. I'm not sure of another method to inform Hiroto of the issue and the fix - If someone has his email address, they can email him.

Brian T.

## #13 — frank beckmann — 2021-11-15
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124224>

Good catch - thanks for the hint. Of course I hadn´t tested on path-with-spaces.

## #14 — uncle808us — 2021-11-16
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124229>

I'm unclear as how to see whether my path has spaces? I just click on open and choose a location but it does not show up there. How is the path different from saving to desktop? Where do I see/find the spaces?

## #15 — frank beckmann — 2021-11-16
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124230>

Maybe this makes it clearer:

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
			
		
		
	

	
		
	
Changing the script with TextEdit.app like Brian shows will eliminate the limitation.

## #16 — BTT1024 — 2021-11-16
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124231>

To add to Frank's notes....

To see if the folder path where you plan to have the textures copied to, contains spaces in the folder names....

 - In Finder, You can turn on the "Show Path Bar" option in Finder and then navigate to the target folder location....

		
	

... Where you will see the full path in the Path Bar - If you can't tell if any of your Folder Names have a Space in the Name, you can Right-Click the Target Folder name in the Path Bar, then click "Copy 'xxxxxxxxx' as Pathname" and then run Text Edit and paste the copied PathName as text and then increase font size (or Zoom) and then look at the path for folders with spaces.

## #17 — BTT1024 — 2021-11-16
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124232>

As Frank noted, you can use the TextEdit App to edit the Java Script to change the line I noted.... Make a backup the "Material Helper" java script and then Right-Click the "Material Helper.js" file in the "/Users/YourUserName/Library/Application Support/Cheetah3D/Scripts/Tool" directory, choose "Open With" and choose "TextEdit.app" from the menu - Replace the line I noted with the new line and then save.

## #18 — uncle808us — 2021-11-17
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124233>

Thanks Guys. I appreciate you time and enlightenment.
I replaced the line in the script and it is working fine. 
May Yahweh bless coders.
Thanks again.
BTT1024, frank beckmann,and of course>tg_jp​

## #19 — BTT1024 — 2021-11-19
<https://www.cheetah3d.com/forum/index.php?threads/9707/post-124238>

[[QUOTE:  uncle808us said: Thanks Guys. I appreciate you time and enlightenment. I replaced the line in the script and it is working fine. May Yahweh bless coders. Thanks again. BTT1024, frank beckmann,and of ]]
unclebus808us,
  You are welcome...

I wasn't aware of the "Material Helper" script, until I stumbled upon your recent post... In the past year or so, at times, I've wanted to gather up all of the textures used in my project, from a source texture folder I have and put them in a folder in the active project. This script helps with that.

So, I will now make use of it...

One thing though and I'm not sure if others would feel the same way, is that it would be good if the script re-assigned the new textured path, where the textures were copied to, back to the texture image path for each material in the project...

I'll have to do some research and testing to see if that is possible, looks like it should be, So at some point, I may update my copy of the script to write the new path to the texture path properties for each material in the active project...

Learning more about the object properties in Cheetah3D, reading and writing to them via javaScript is on my list of things to learn (but a low priority). I write .NET applications for Windows servers for my job and have fiddled around with some javascript code before, but I need to learn more.

Brian T.
