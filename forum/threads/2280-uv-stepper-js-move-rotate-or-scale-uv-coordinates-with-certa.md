# UV Stepper.js - move, rotate, or scale UV coordinates with certain values

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2280/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-10-23; last post 2020-01-04; 37 posts

## #1 — tg_jp — 2007-10-23
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-15951>

UV Stepper.js - move, rotate, or scale UV coordinates with certain values

this script is a Tool script for moving, rotating, or scaling UV coordinates of selected polygons with certain value. and you can move selected UV map to left/center/right position in UV field.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=32

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
			
		
		
	

	
		
	

Updated: fixed alignment (center/middle) bug and now work Point and Edge mode. 20080217
Updated: fixed bug when using with version 4.6.  20080528
Updated: support uv1/uv2 copy and swap. now support uv of uv2 set correctly. (only 4.6 later)  20080716
Updated: 'weld', 'invert' added 20081216
Updated: object uv copy added. a behavior of collection for current selection changed. (when nothing is selected, script affects all uv info of object.)
Updated: 'select UVPIN in selection' / 'align circle' / 'move to' for set absolute position functions. update recommended.   20090619 
Updated: fix bug with cheetah3d 5.2  20100125 
Updated: add getAngle / getFitScale  20110411 

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=32

## #2 — egg — 2008-02-15
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18487>

Thank you for this script. I am very new to Cheetah but this script has already become indispensible.
Egg

## #3 — tg_jp — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18532>

thanks for comment. 

I just updated the script. now it work with Point and Edge mode and fixed alignment bug. please update it.

download: http://www.tres-graficos.jp/blog/files/article.php?id=32

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=32

## #4 — egg — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18536>

Great, I will do 
Thank you again
Egg

One question, the only way i can access it is to put it in the appropriate app level folder and run through the Tools>Script>Tool Script menu to get it. As I said I'm very new to Cheetah, but is there a way I can add it to the interface as a button or assign a key shortcut to invoke it?
Cheers.

## #5 — ToddWR — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18549>

egg
check out this: http://cheetah3d.de/forum/showthread.php?t=2594
it will answer your question

Todd

Links: http://cheetah3d.de/forum/showthread.php?t=2594

## #6 — tg_jp — 2008-02-17
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18557>

hi,

I want script hot-key assignment, too. now I am using [tool history backward] and [tool history forward] assignment. it works for tool scripts.

regards.

tg_jp, Hiroto

## #7 — egg — 2008-02-18
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18563>

Great, thank you both. I'l try the OsX thing and look out for cheetah specific ones too.
Egg

## #8 — tg_jp — 2008-02-18
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18583>

hi,

I checked 'Application Keyboard Shortcuts', as that thread said, it works perfect!

please forget my last post.  

tg_jp, Hiroto

## #9 — egg — 2008-02-19
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-18619>

[[QUOTE:  tg_jp said: hi, I checked 'Application Keyboard Shortcuts', as that thread said, it works perfect! please forget my last post. tg_jp, Hiroto Click to expand... ]]

Worked for me too, thanks very much 
Egg

## #10 — tg_jp — 2008-05-29
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-22428>

hello, all

I update this script for bug fix when you're using with version 4.6.
please update it if you're using. 

regards.

tg_jp, Hiroto.

## #11 — Django — 2008-06-14
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-22820>

[[QUOTE:  tg_jp said: hello, all I update this script for bug fix when you're using with version 4.6. please update it if you're using. regards. tg_jp, Hiroto. Click to expand... ]]

Thank you!!! :icon_thumbup: 

Django

## #12 — egg — 2008-06-22
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-22993>

[[QUOTE:  tg_jp said: hello, all I update this script for bug fix when you're using with version 4.6. please update it if you're using. regards. tg_jp, Hiroto. Click to expand... ]]

Thanks 
Egg

## #13 — Targos — 2008-07-13
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23499>

Hi Tg_jp. Is it possible to make a script that switches UVsets around? I have an imported model where UVs have appeared in Set 2 and Nothing has appeared in set 1-I can also see other uses related to baking textures where it could be good to switch.

Ill attatch the file in question-Hopefully you can help!

Thank you so much if so...

AaronC

Attachments: [UVSet_Mess.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/5234/)

## #14 — tg_jp — 2008-07-14
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23506>

hi,

I cannot find an API to manipulate UV2 set via javascript of Cheetah3D, so I have no idea to swap UV1 to UV2... umm.  

regards.

tg_jp, Hiroto.

## #15 — Targos — 2008-07-14
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23520>

Ok thanks for taking a look. Martin said to me in an email he'd "exposed" the uv sets but Im not to sure what that means without documentation and I dont think thats much use to me...I appreciate you having a look though, thanks

AaronC

## #16 — Martin — 2008-07-16
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23564>

Hi,
the 

	
	


```
Vec4D uvCoord(Number pindex, Number cindex)
```


return a four dimensional vector. The first two elements of this vector are uv1 and the last two elemts are uv2

Bye,
Martin

## #17 — tg_jp — 2008-07-16
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23567>

hi

[[QUOTE:  
```
Vec4D uvCoord(Number pindex, Number cindex)
```
 return a four dimensional vector. The first two elements of this vector are uv1 and the last two elemts are uv2 Click to expand... ]]

ah.. I just understand why you did change the return type of uvCoord func!!  I can add a function to swap UV1 to UV2 now! 

EDIT: it updated. now support uv2 set and copy/swap uv1-uv2 set.
please check it. 

http://www.tres-graficos.jp/blog/files/article.php?id=32

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=32

## #18 — Targos — 2008-07-16
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23571>

Hi Tg_jp,

Im having trouble downloading this- I get a "UV" file, but its not javascript? Can you check (Someone?)

Cheers
AaronC

## #19 — frank beckmann — 2008-07-16
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23582>

Thanks Hiroto.

Hi Aaron.
What did you do? The script works just like Hiroto promised.

Frank

## #20 — Targos — 2008-07-16
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-23584>

Ahh Thanks Frank, Id downloaded it on windows and it wasnt working. Works fine on mac.

Thanks Hiroto, its absolutely just what I needed.:icon_thumbup: :icon_thumbup: :icon_thumbup: 

AaronC

## #21 — tg_jp — 2008-12-16
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-26270>

hello,

I added new functions to this script. please download the latest version if you use this. 

* invert: invert uv coord.
* weld: if selected uv points share same vertices, combine these uv coord. (pelase check youtube demo.)

regards.

http://www.youtube.com/watch?v=jlfVwks56yw

tg_jp, Hiroto.

Links: http://www.youtube.com/watch?v=jlfVwks56yw

## #22 — Targos — 2010-01-24
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-37972>

Hello 

Could it be possible that switching UV's using the "Swap UV1,UV2" is now broken in 5.2? I have a couple of errors.

Thanks Hiroto, its a great script.

Aaron

Attachments: [Screen shot 2010-01-25 at 12.29.32 AM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/9397/), [Screen shot 2010-01-25 at 12.33.11 AM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/9398/)

## #23 — uncle808us — 2010-01-24
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-37992>

Same here I get the first error.

## #24 — tg_jp — 2010-01-24
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-38021>

hi, thank you for reporting.

some of my scripts won't work with same errors. 
I just updated UV Stepper.js. please replace it. 

http://www.tres-graficos.jp/blog/files/article.php?id=32

tg_jp. Hiroto Tsubaki

Links: http://www.tres-graficos.jp/blog/files/article.php?id=32

## #25 — Targos — 2010-01-28
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-38235>

Great Thanks Hiroto, that appears to be working fine :icon_thumbup::icon_thumbup:

Aaron

## #26 — Targos — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-43861>

Hi Hiroto it looks like your script may have broken with Cheetah 5.5?

If you had a chance to take a look that would be great.
Thanks
Aaron

## #27 — frank beckmann — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-43862>

Mmmh - can´t confirm. Seems to work as usually. Any error messages available?

Cheers
Frank

## #28 — Targos — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-43863>

Sure:

looks like Martin intends holding on to the Cheetah Copyright for the next 20,000 years or so..

if I add the bake tag, I get the error in the smaller pic.

Thanks
Aaron

Attachments: [Screen shot 2010-06-20 at 11.58.35 PM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11066/), [Screen shot 2010-06-21 at 12.01.25 AM.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11067/)

## #29 — frank beckmann — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-43864>

I did the baking and swap UV2 to UV1 with the script without any errors.
My script version is from 24.January2010. And yours?

Cheers
Frank

## #30 — Targos — 2010-06-20
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-43865>

Ahh that was it. I downloaded the current one and its working, thanks Frank

No problems Hiroto!:icon_thumbup: Sorry for the false alarm.

Aaron

## #31 — McShaman — 2014-04-19
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-87052>

Hey TG,

Fantastic script! Just a couple of things that I think could be bugs:

I am having trouble assigning a key command to the script. I get the error shown bellow.
When I click the get angle button, then select all the polygons I want to straighten, and then select UV stepper again, the rotation field has gone back to zero.

Attachments: [Screenshot 2014-04-19 11.13.41.png](https://www.cheetah3d.com/forum/index.php?attachments/23058/)

## #32 — tg_jp — 2014-04-19
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-87054>

Hi, thank you for reporting.

[[QUOTE:  McShaman said: I am having trouble assigning a key command to the script. I get the error shown bellow. Click to expand... ]]

I have no idea, why that error message is shown. There is no message like that in this script. Please check hot-key assigned this script, re-assign, or restart Cheetah3D...

[[QUOTE:  McShaman said: Hey TG, When I click the get angle button, then select all the polygons I want to straighten, and then select UV stepper again, the rotation field has gone back to zero. Click to expan]]

All script's parameters are reset after invoking from menu command, so I recommend to use 'tool history backward / forward' hot-key for this case.

Or clicking factory icon at right side of title-bar on the tool property view, all parameter's changes are saved permanently.

Best

tg_jp, Hiroto

Attachments: [sc_007.jpg](https://www.cheetah3d.com/forum/index.php?attachments/23059/)

## #33 — McShaman — 2014-04-19
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-87056>

Restarting Cheetah seemed to fix it.

And great tip on the tool history. There's heaps of options (like this) in Cheetah that are not that easy to find. I can't find it anywhere in the menus.

## #34 — perpetualrevision — 2019-12-21
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-118720>

I only started using this script a few months ago, and I can't believe it took me this long to discover it! It's incredibly helpful with various UV mapping tasks, esp. scaling and positioning as well as inverting. The weld function is pretty nifty too, though I'm still getting the hang of it. THANK YOU so much for sharing this incredibly useful script!

## #35 — uncle808us — 2019-12-21
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-118721>

@perpetualrevision: Yea great script.
I haven't gotten to deeply into it as of yet.
I use it mainly for inverting my UV's.
 I can see you will be an asset to the forums so I welcome you.
I am a fellow Poser user,  in conjunction with C3D. and Anime Studio.
Any enlightenment into using UV stepper would be useful.
Thanks.

## #36 — perpetualrevision — 2020-01-04
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-118812>

[[QUOTE:  uncle808us said: I can see you will be an asset to the forums so I welcome you. I am a fellow Poser user, in conjunction with C3D. and Anime Studio. Any enlightenment into using UV stepper would be u]]

Thanks for the "welcome," uncle808us! I've been here since 2014, but I don't post that often (so I guess that's why it still says "New member" under my username?)

I use UV Stepper most often to scale and center UVs on the "stage" (as the script calls it), but I also make frequent use of invert u and invert v as well as point alignment h and v (which automatically scales all selected points to a horizontal or vertical line, faster and more precisely than doing it with the gadget tool).

I find it pretty easy to UV map props in Cheetah, but I'm still trying to figure out the best way to map clothing items, and in the process I've experimented with UV Stepper's Weld UV option. What it does is let you "rejoin" vertices that might've gotten separated in the process of unwrapping the mesh, esp. if you used seams. The verts are single items on the mesh, but in the UV space they can end up in two locations, which you've probably seen if you've ever selected a vertex on a mesh and noticed that two vertices seem to be selected on the UV space. It's an inevitable result of unwrapping a mesh, but sometimes you want to "reunite" a set of verts in order to make texturing easier, like the top or edge seams on a shirt. So I use the Weld UV option to "reunite" those verts and then pin them before doing any further unwrapping.

I haven't yet explored the other options in UV Stepper, but I'm sure I will eventually! If there's a specific issue you're trying to figure out, let me know, and if it's something I've figured out, I'll share what I learned!

## #37 — uncle808us — 2020-01-04
<https://www.cheetah3d.com/forum/index.php?threads/2280/post-118815>

Thanks I will. I still wish for some kind of relax function, maybe before I can't use C3D anymore due to the age of my computer.
