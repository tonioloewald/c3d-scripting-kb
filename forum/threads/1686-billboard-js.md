# Billboard.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1686/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-05-08; last post 2009-11-20; 6 posts

## #1 — tg_jp — 2007-05-08
<https://www.cheetah3d.com/forum/index.php?threads/1686/post-11041>

Billboard.js

hello.

this is Polygon script ( into ../scripts/Polygonobj folder), for making simple Billboard object.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=27

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
			
		
		
	

	
		
	

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=27

## #2 — Blake_shadows — 2007-07-27
<https://www.cheetah3d.com/forum/index.php?threads/1686/post-13726>

hey sorry to be a bother but i was wondering how to make a tree, if you could show me  that would be great but you don't have to, its just that im a bit of a noob.
cheers,

## #3 — squareitround — 2007-07-27
<https://www.cheetah3d.com/forum/index.php?threads/1686/post-13731>

Try a forum search for "tree" There are a few threads on tress and specialist tree generating software/sites.

## #4 — Blake_shadows — 2007-07-27
<https://www.cheetah3d.com/forum/index.php?threads/1686/post-13747>

thanks very much:smile:

## #5 — tg_jp — 2007-07-29
<https://www.cheetah3d.com/forum/index.php?threads/1686/post-13771>

hi,

if you want a real tree, you'd better to use with another software or scripts for making a tree object. but it needs more polygon counts, more memory, etc..

I used Transparency map for clipping Tree shape. (same as Hair scene that you asked.  )

regards.

tg_jp, Hiroto.

Attachments: [wood1_trans.jpg](https://www.cheetah3d.com/forum/index.php?attachments/2846/), [wood1_dif.jpg](https://www.cheetah3d.com/forum/index.php?attachments/2847/), [ch_20070605_woods.jpg](https://www.cheetah3d.com/forum/index.php?attachments/2848/)

## #6 — DarthSidious05 — 2009-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1686/post-35526>

Thanks for the script. 

Without using this script, when I tried making billboard trees with alpha channels/transparencies, I add 20 or more trees one behind the other, and upon rendering, black borders begin to show up around my trees, as if the transparent parts are turning black and no longer transparent. Seems as if there's a limit to how many transparencies can be stacked behind each other in rendering, but not in OpenGL, which maintains the transparency. When the trees are reduced to say maybe 10, the black border squares are gone around the tree planes, and regular transparencies return.

EDIT: Resolved by increasing maximum Ray Depth to 24 (from 6) in the Render Preferences.
