# Script to change materials and colours

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14116/
- Subforum: scripting-general
- Started by **classic12** on 2022-01-21; last post 2022-01-29; 2 posts

## #1 — classic12 — 2022-01-21
<https://www.cheetah3d.com/forum/index.php?threads/14116/post-124588>

Hi
Where can I find scripting docs.
Is it possible to do the following in script.
Select an object
Change the material
Change colours
Move to next frame 
Repeat

I then need to render out each frame.
Any help appreciated.

## #2 — frank beckmann — 2022-01-29
<https://www.cheetah3d.com/forum/index.php?threads/14116/post-124642>

Something similar can be done with nodes: State=Time - filtered by gradient or stepped colors:

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
