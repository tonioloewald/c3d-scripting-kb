# Aligned Particle Spline.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7347/
- Subforum: script-downloads
- Started by **tg_jp** on 2011-06-03; last post 2020-03-21; 9 posts

## #1 — tg_jp — 2011-06-03
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-60383>

Aligned Particle Spline.js

Hello

it's a particle script, place it into ~/Library/Application Support/Cheetah3D/scripts/Particle folder.

each particle rotated along to spline path with absolute distance. you can make something like domino-effect objects easily with this script.

download: http://www.tres-graficos.jp/blog/files/article.php?id=70

update 20140329: 'offset' parameter added.

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
			
		
		
	

	
		
	

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=70

## #2 — SurfingAlien — 2011-06-03
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-60384>

thanks Hiroto, very useful! :icon_thumbup:

## #3 — crgreen — 2014-03-28
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-86423>

How to loop objects through path with offset

Hiroto, this script is great. I added just a few things to add an offset, so that I can animate the objects along the path. The question I have is, what's the best way to have each object cycle back to the front of the path when it gets to the end? If you run my version of the script, you'll see that the objects fly off the last path point into space. I'd like it to return to the beginning.
Any help is greatly appreciated.
Thanks for the script and in advance.

Here's my partially useful offset version:

	
	


```
[removed by crg because Hiroto came to the rescue as usual]
```


[[QUOTE:  tg_jp said: Hello it's a particle script, ... tg_jp, Hiroto. Click to expand... ]]

## #4 — tg_jp — 2014-03-29
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-86442>

hi, thank you for your request.

[[QUOTE:  crgreen said: The question I have is, what's the best way to have each object cycle back to the front of the path when it gets to the end? If you run my version of the script, you'll see that the obj]]

I have just updated it with 'offset' parameter. I hope you like it. please update it.

http://www.tres-graficos.jp/blog/files/article.php?id=70

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=70

## #5 — crgreen — 2014-03-29
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-86443>

You do rock, in fact, Hiroto :smile:

## #6 — misoversaturated — 2017-04-20
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-107076>

report

Hi Hiroto,

In CHeetah3D v7beta22 I get a javascript error message when using the aligned spline particles script.

The screenshot is of the 2011 version but the 2014 version shows the same error (line 78 ).

Correction: My fault, used wrong folder!

Attachments: [screenshot.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30874/)

## #7 — frank beckmann — 2017-04-20
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-107077>

Still works here:

		
	
Cheers
Frank

## #8 — misoversaturated — 2017-04-20
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-107078>

Frank, thanks for your feedback.
I tested further and found that I had misplaced the script in the spline folder instead of the particle folter :redface: 

So everything is ok :smile:

## #9 — joel ruiz c — 2020-03-21
<https://www.cheetah3d.com/forum/index.php?threads/7347/post-119685>

I just want to thank @tg_jp Hiroto for this useful script!
