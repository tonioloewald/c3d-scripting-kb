# BetterSVGImport.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12598/
- Subforum: scripting-general
- Started by **Oval** on 2017-08-31; last post 2017-10-08; 6 posts

## #1 — Oval — 2017-08-31
<https://www.cheetah3d.com/forum/index.php?threads/12598/post-108895>

BetterSVGImport.js

This script has 2 main advantages:
1. More pristine scaler
2. Support additional sag path tags (i.e. arcs)

Regular import:

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
			
		
		
	

	

BetterSVGImport:

Attachments: [Screenshot 2017-08-31 20.50.04.png](https://www.cheetah3d.com/forum/index.php?attachments/31540/), [Screenshot 2017-08-31 20.50.35.png](https://www.cheetah3d.com/forum/index.php?attachments/31539/), [Archive2.zip](https://www.cheetah3d.com/forum/index.php?attachments/31538/)

## #2 — frank beckmann — 2017-08-31
<https://www.cheetah3d.com/forum/index.php?threads/12598/post-108898>

Which SVG editor you´re usually using?
The example SVG is quite experimental to my taste.
The tool script don´t seems to provide an UI element - is that correct?

Cheers
Frank

## #3 — Martin — 2017-10-08
<https://www.cheetah3d.com/forum/index.php?threads/12598/post-109474>

Hi Oval,
that is a pretty impressive script. I'm always surprised what's possible with some Javascript magic. Getting the same functionality in ObjectiveC took me considerably more lines of code.:redface: 
 
The attached SVG file is pretty evil. Where did you find it and do you know which application created it. It almost looks like a worst case formatting.

Especially the second path in the SVG file caused me quite some headaches. I didn't know that it's allowed to compress the path string that badly.:shock: :shock: But I will add support for that. 

Bye
Martin

@Frank: That's a Macro script and no tool script.

## #4 — Oval — 2017-10-08
<https://www.cheetah3d.com/forum/index.php?threads/12598/post-109475>

Well it's from Illustrator with some path compose and export settings.
Thank you for your attention to this, Martin!

## #5 — Martin — 2017-10-08
<https://www.cheetah3d.com/forum/index.php?threads/12598/post-109476>

[[QUOTE:  Oval said: Well it's from Illustrator with some path compose and export settings. Thank you for your attention to this, Martin! Click to expand... ]]

Thanks for the fast response. So since Illustrator creates such files I would say it was well invested time to look into that problem.:smile: 

Bye
Martin

## #6 — frank beckmann — 2017-10-08
<https://www.cheetah3d.com/forum/index.php?threads/12598/post-109484>

[[QUOTE:  Martin said: @Frank: That's a Macro script and no tool script. Click to expand... ]]
Thanks for the hint - that obviously didn´t occur to me. :mrgreen: 

Cheers
Frank
