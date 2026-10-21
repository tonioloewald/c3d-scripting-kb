# Copy Object Along to.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7762/
- Subforum: script-downloads
- Started by **tg_jp** on 2011-10-05; last post 2011-11-10; 6 posts

## #1 — tg_jp — 2011-10-05
<https://www.cheetah3d.com/forum/index.php?threads/7762/post-64209>

Copy Object Along to.js

Hello.

it's a tool script to copy selected object along to spline path set at property view of this tool.

http://www.tres-graficos.jp/blog/files/article.php?id=75

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=75

## #2 — frank beckmann — 2011-10-05
<https://www.cheetah3d.com/forum/index.php?threads/7762/post-64219>

Hi Hiroto.
Not sure if I understand this script; I got some unexpected results - I guess.
It seems to ignore scale+rotation of objects. With closed splines we get objects at start and stop point - but this is a limitation by the API as far as I can tell.

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
			
		
		
	

	
		
	
Cheers
Frank

## #3 — tg_jp — 2011-10-05
<https://www.cheetah3d.com/forum/index.php?threads/7762/post-64220>

[[QUOTE:  frank beckmann said: Hi Hiroto. Not sure if I understand this script; I got some unexpected results - I guess. It seems to ignore scale+rotation of objects. With closed splines we get objects at star]]

hi, thank you for testing. as you wrote, scale and rotation are ignored ( nor other parameters ). and polygon object is not copied properly. actually, I wrote this for copying simple bone objects, so I will fixed this problem soon.

regards.

tg_jp, Hiroto.

## #4 — frank beckmann — 2011-10-07
<https://www.cheetah3d.com/forum/index.php?threads/7762/post-64305>

[[QUOTE:  tg_jp said: hi, thank you for testing. as you wrote, scale and rotation are ignored ( nor other parameters ). and polygon object is not copied properly. actually, I wrote this for copying simple bone]]

I guess this has some real great potential like putting lights driven along splines like here it was asked for: http://www.cheetah3d.com/forum/showthread.php?p=64304#post64304

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showthread.php?p=64304#post64304

## #5 — tg_jp — 2011-11-10
<https://www.cheetah3d.com/forum/index.php?threads/7762/post-65052>

hi

I have added new option for Object Array.js for alignment objects along to spline.

http://www.cheetah3d.com/forum/showthread.php?p=16805

please check it.

tg_jp, Hiroto

Links: http://www.cheetah3d.com/forum/showthread.php?p=16805

## #6 — SurfingAlien — 2011-11-10
<https://www.cheetah3d.com/forum/index.php?threads/7762/post-65053>

thanks Hiroto!
