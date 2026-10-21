# Path Array script help

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14136/
- Subforum: scripting-general
- Started by **dcast79** on 2022-02-25; last post 2022-02-25; 5 posts

## #1 — dcast79 — 2022-02-25
<https://www.cheetah3d.com/forum/index.php?threads/14136/post-124805>

Hello,
I'm having no luck figuring out the path array script. I'm on v7.5
Can anyone please help with order to place the script. I've tried a few different ways but haven't had luck.
Thanks!

David

## #2 — frank beckmann — 2022-02-25
<https://www.cheetah3d.com/forum/index.php?threads/14136/post-124806>

Hi David.
Here´s a simple set-up for you to reverse engineering:
Hope that it´s let you get started.
 
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

Attachments: [PathArray.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/38256/)

## #3 — dcast79 — 2022-02-25
<https://www.cheetah3d.com/forum/index.php?threads/14136/post-124807>

Thanks Frank!
Turns out I was doing correctly but it has quite a lag, especially when I make adjustments. Around 45 seconds  , so I kept changing the order around as it was trying to process, lol
It's a really cool script though. Not sure how I can animate it with such a lag though. The demo is so great.

## #4 — frank beckmann — 2022-02-25
<https://www.cheetah3d.com/forum/index.php?threads/14136/post-124808>

Mmmh - lag you say? How complex are the child objects then? I mean not all parameters are auto-updating and must be triggered with the "Update" button.

## #5 — frank beckmann — 2022-02-25
<https://www.cheetah3d.com/forum/index.php?threads/14136/post-124809>

I'm not sure what you have in mind - perhaps the built-in instancing (particle-system) feature is more optimal.
