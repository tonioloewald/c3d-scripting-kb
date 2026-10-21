# Object Array.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2413/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-12-04; last post 2017-12-02; 17 posts

## #1 — tg_jp — 2007-12-04
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-16805>

Object Array.js

this is a Polygon script. actually it doesn't make any polygons, but it makes target property ( must be folder object contains any object that has 'position' property) aligned by certain types ( line, grid, ring, and spline ). it works as like Array or Ring Modifier for lights or cameras.

I tested with v.4.3.1, but I think it also works for 3.6.x.

[updated] spline option added. use target property (must be folder object) instead of child objects.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=33

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
			
		
		
	

	
		
	

tg_jp, Hiroto

Attachments: [ch_20111110_objectarray_properties.png](https://www.cheetah3d.com/forum/index.php?attachments/15984/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=33

## #2 — peer — 2007-12-05
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-16825>

That's such a great script!!! Thanks Hiroto! Now it will be much easier to place lights!

Regards,

Peter

## #3 — hairball600 — 2007-12-05
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-16828>

Very Nice. Thank you very much.

## #4 — temhawk — 2011-02-13
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-55926>

Thank you, I need to make some lights with this. I couldn't use the Array modifier or Particle Array objects which I think doesn't make sense, but luckily there is another great script from you!

:icon_thumbup: :icon_thumbup:

## #5 — Paul P — 2011-10-29
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-64730>

Hi everyone,

I tried downloading this in the last few days, but cannot get it to download properly. I've tried Camino and Firefox.

Can anyone lese confirm if this works properly. 

Thanks.

## #6 — SurfingAlien — 2011-10-29
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-64733>

[[QUOTE:  Paul P said: Hi everyone, I tried downloading this in the last few days, but cannot get it to download properly. I've tried Camino and Firefox. Can anyone lese confirm if this works properly. Thanks.]]

worked fine here in Safari 5.1

## #7 — Paul P — 2011-10-29
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-64734>

Alessandro,

thanks for your reply. 

You are correct. Safari works perfectly. I have sent an email to Hiroto because Camino and Firefox do not download this correctly. 

Thanks again.

## #8 — FritsLyn — 2013-08-04
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-80947>

This great script does not work on Cheetah 3D 6.2

Hiroto, I'd love to have access to use this script - but it fails under Cheetah 3D 6.2 - would you consider updating it?

Thank you.

Attachments: [SkÃ¦rmbillede 2013-08-04 kl. 15.50.09.png](https://www.cheetah3d.com/forum/index.php?attachments/20679/)

## #9 — frank beckmann — 2013-08-04
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-80950>

Sorry to say - but it still works as it is. 
And there´s still particle-spline which may do also for what you want.

		
	
Cheers
Frank

## #10 — FritsLyn — 2013-08-05
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-80965>

[[QUOTE:  frank beckmann said: Sorry to say - but it still works as it is. Click to expand... ]]

Well, no one should be sorry for that  I cannot produce anything but the shown error. But ... good news: There's this one:

http://www.cheetah3d.com/forum/showthread.php?t=8469

It works wonders!

Tags for Google / the next one in my situation:
multiple mesh split unity cheetah 3D

Links: http://www.cheetah3d.com/forum/showthread.php?t=8469

## #11 — tg_jp — 2013-08-06
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-80979>

hi, thank you for trying my script. 

It works as expected on my mac. so, Please check installed folder for that script again ( it's polygon script, so ~/Library/Application Support/Cheetah3D/Scripts/Polygonobj is a right folder).

anyway, your problem was solved with another script, wasn't it? 

regards.

tg_jp, Hiroto.

## #12 — FritsLyn — 2013-08-06
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-80988>

Yes, I solved the challenge with another script.

But thank you anyway - very much. Your contributions and help are very valuable, and very appreciated. 

Thank you

## #13 — Shift Studio — 2017-12-01
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-110024>

This script still seems to work! C3D v7.x
But I've had a couple of issues - crashing, and seemingly disabling lights in the scene?????? I don't know - I'm trying to figure out if its user error.

I'm curious if I want hundreds (1000s?) of lights wrapping in a spiral, am I needing a group with hundreds/thousands of lights in it? Is there a better way?

Thanks, 
--Shift Studio.

## #14 — Shift Studio — 2017-12-01
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-110025>

confirmed..!??!?
Adding this script using a folder full of strong lights as target and a spline to position them, turns off a distant light also in the scene.
Weird.

I've also tried using emissive objects, and it seems to distribute them... in fact a regular old particle spline will do that. BUT having issues getting the emissive objects to be as strong as I want.

-- shift studio.

## #15 — frank beckmann — 2017-12-01
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-110026>

There´s a "Copy Objects Along To.js" (on Hiroto´s site) which seem perfectly fine for this. It´s a bit outdated and has some trouble with the new lights of v7 - but you can select all 1000 lights and adjust them in one go:

		
	
Cheers
Frank

## #16 — Shift Studio — 2017-12-01
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-110027>

[[QUOTE:  frank beckmann said: There´s a "Copy Objects Along To.js" (on Hiroto´s site) which seem perfectly fine for this. It´s a bit outdated and has some trouble with the new lights of v7 - but you can selec]]

Thanks Frank! I will definitely check it out.
Btw, I'm now experimenting further with my particle spline and emissive objects - I had to crank the intensity up extremely high (Its set at 1,000,000 right now, but I think it stopped making any difference around .... maybe 200,000)

Will probably be back for more, but thanks so far.
--Shift Studio.

## #17 — Shift Studio — 2017-12-02
<https://www.cheetah3d.com/forum/index.php?threads/2413/post-110029>

[[QUOTE:  Shift Studio said: ... particle spline and emissive objects - I had to crank the intensity up extremely high (Its set at 1,000,000 right now, but I think it stopped making any difference around .... ]]

ugh - I had 'clamp sample' on my render setting turned down to 1 (from 10)

This caused the problem noted above.
--shift studio.
