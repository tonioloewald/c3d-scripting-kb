# List/display edge lengths

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13162/
- Subforum: scripting-general
- Started by **filip c** on 2018-12-03; last post 2018-12-13; 17 posts

## #1 — filip c — 2018-12-03
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114504>

Hi guys,

Maybe a weird question, but first of all, I'm looking for a way to generate a list to export (paste into...excel) with all the lengths of all the edges of an object...

...and secondary, if possible, display the lengths next to the corresponding edge (particle mesh?)

Any help would be very much appreciated!

Kindest regards,
Filip

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

## #2 — frank beckmann — 2018-12-03
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114516>

I have no clue. 

Cheers
Frank

## #3 — filip c — 2018-12-03
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114517>

[[QUOTE:  frank beckmann said: I have no clue. Cheers Frank Click to expand... ]]
Thanks Frank! 

I keep hoping some of the other heroes here can help... 

Kindest regards!!!

## #4 — frank beckmann — 2018-12-03
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114519>

[[QUOTE:  filip c said: I keep hoping Click to expand... ]]
I´m curious too - because I want to know what it´s for. 

Cheers
Frank

## #5 — Swizl — 2018-12-04
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114558>

I'm curious also! Is that a screen shot from Blender?

My guess is that Script Masters Tonio or Hiroto would be the best people to ask for something like that. I don't think there is a way to display that sort of info in the viewport, but it could probably be listed in a script window or at least the console tab. 

There is a built in info panel in Modo that displays this, but I don't see any way to export it. I know you probably are working in millimeters, but I just left my settings at inches for ease.

## #6 — filip c — 2018-12-05
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114560>

Thanks so much Swizl!

The image is indeed from blender...
I’ll look into Modo!

I’m working on a technology (other than 3D printing) to physically recreate (huge) 3D models (can’t tell too much of it yet) out of recycled plastic...

The plan was to have a smartphone app specificly built for designing with my product, but for personal and financial reasons it’s on hold... for now, cheetah could help while I continue working on production machines and manufacture prototypes ...so I can try to attract investors and hire a good programmer to get things finally rolling...

## #7 — Swizl — 2018-12-05
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114561>

That’s really cool! Good luck with the project. I understand that you can’t divulge more.

The Modo shot was just to show the info. I’m sure someone skilled enough in math and coding could come up with something that would read, calculate length and then output the data from C3d.

I’ve tried learning scripting / programming. I have a rough understanding of how it works, but it just never fully clicks with me.

Let us know if you come up with a solution for this problem.

## #8 — filip c — 2018-12-05
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114565>

I think I found somebody trying to do a similar thing in blender... 

I really need to learn some decent programming skills  makes no sense to me, but maybe somebody else knows how to do this with my beloved cheetah...

https://blender.stackexchange.com/q...e-length-of-edges-to-a-text-file-from-blender

Links: https://blender.stackexchange.com/questions/76987/export-the-length-of-edges-to-a-text-file-from-blender

## #9 — Swizl — 2018-12-05
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114566>

You could possibly contact Hiroto and see if this is something he would be willing to code. Maybe even with a payment / donation?

If you haven't checked out Codecademy. You should. It's pretty good and the best part is that it's interactive. 
They have a lot of different languages, but the two best to start with are probably JavaScript (C3d) and Python (Blender, etc.) 
They also just added a C++ course, which is the language a large amount of software is made with. Sorry if you already knew all of this.
https://www.codecademy.com/

I've gone through a few round of courses and read different books. But I just don't have a lot of time to devote to learning it since I'm extremely slow to understand the finer points.

Links: https://www.codecademy.com/

## #10 — filip c — 2018-12-07
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114589>

Thanks so much Swizl!

Hope to find time for codecademy, looks awesome!

And off course, within my currently very limited power (I'm sparing you the long depressing story), I'm more than willing to compensate for somebody elses hard work, seems more than natural to me! 

I actually think the entire forum is filled with so much goodwill, so much time people invest to help others. I wished I could compensate everybody... I'll make sure to at least try to give something back to this warm helpfull community...

## #11 — filip c — 2018-12-07
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114592>

Seems like Oldmicah was able to write the scale of an object to the console, so if I can manage to do that with the edge lengths, I'm more than happy...
...there must be a way... anybody???

https://www.cheetah3d.com/forum/index.php?threads/12987/

Links: https://www.cheetah3d.com/forum/index.php?threads/12987/

## #12 — Swizl — 2018-12-07
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114593>

Yeah, I've only made one script, and I had a lot of help from other people when I made it. Programmatically it wasn't anything that would be hard for someone with experience that knew C3d Javascript. My camera aspect ratio script is just basically a bunch of switches attached to a pull down list. 

Something like this would take somebody with programming and match knowledge.

Have you tried contacting podperson (Tonio) or tg_jp (Hiroto) directly? They may not check the forums much now.

I wish I could help more, but I don't have the skills for this.

## #13 — Swizl — 2018-12-07
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114594>

There's also this "Object Info" script from Tonio that may be modified in some way to do what you want. 
http://loewald.com/c3dbook/Scripts/Object-Info/

Links: http://loewald.com/c3dbook/Scripts/Object-Info/

## #14 — filip c — 2018-12-10
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114600>

Thanks Swizl!

Looking into it!

## #15 — tg_jp — 2018-12-13
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114620>

Hi 

After clicking measure button, you can check edge length at Console view. or with checking export csv, csv file will be created.

http://tres-graficos.jp/blog/resources/Edge_Measure.js_20181212.zip

Best

Hiroto

Links: http://tres-graficos.jp/blog/resources/Edge_Measure.js_20181212.zip

## #16 — filip c — 2018-12-13
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114621>

Hiroto, You're awesome!
Thanks so much!

## #17 — Swizl — 2018-12-13
<https://www.cheetah3d.com/forum/index.php?threads/13162/post-114625>

Yeah seriously, you are super cool Hiroto! This script isn't even for me, and I still think it's awesome that you can make these.
