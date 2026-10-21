# PathSelect.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11014/
- Subforum: script-downloads
- Started by **hiro-ichi** on 2015-01-29; last post 2016-11-09; 8 posts

## #1 — hiro-ichi — 2015-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-93285>

PathSelect.js

Hi.

This macro script selects the shortest path between 2 selected components.

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
			
		
		
	

	

Installation

Place the file into ~/Library/Application Support/Cheetah3D/Scripts/Macro/
and restart Cheetah 3D.

Usage

Select just 2 components (points, edges or polygons),
Run the script.

Enjoy!

Regards

View attachment PathSelect_1.0.0.zip

Attachments: [Sample.png](https://www.cheetah3d.com/forum/index.php?attachments/25836/), [PathSelect_1.0.0.zip](https://www.cheetah3d.com/forum/index.php?attachments/25835/)

## #2 — frank beckmann — 2015-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-93286>

Thanks for the useful script. :icon_thumbup: 

Just in the case you didn´t discovered yet: Ring- and Loop-selection tools are working with paint selection: click&drag in the direction you want to select - hold shift-key down to add a new partial/complete loop or ring selection or cmd-key to subtract from a selection.

With kindest regards
Frank

Attachments: [PathSelectScript.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/25837/)

## #3 — hiro-ichi — 2015-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-93298>

Thanks for your comment, Frank.

Unfortunately, the script can't work as the native commands like "Ring Select" or "Loop Select" since Cheetah 3D's Javascript cannot recognize additional selection interactively. And there is no Javascript API to detect modifier keys such as "shift" and "command" key.
Although it is not so user-friendly, I think it is useful to select a partial edge loop when making UV seams, for example.

Regards

## #4 — frank beckmann — 2015-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-93299>

I didn´t say it´s not useful.   Selecting stuff in UV editor is crucial sometimes so your macro-script is a big help there and C3d´s own loop/ring-selection tools don´t work here unfortunately. :icon_thumbup: But you know you can´t select outer rims of course.
My question was if you tried selecting partial loops with Cheetah3d´s native tools?

Cheers
Frank

## #5 — ZooHead — 2015-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-93301>

Thanks for the script hiro-ichi, and thank you Frank 
for expanding my understanding of these tools.
I was totally unaware of this behavior. :icon_thumbup::icon_thumbup: 
​

## #6 — uncle808us — 2015-01-29
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-93302>

@hiro-ichi: Thank you this will be handy for UV seam selecting. :icon_thumbup:

Attachments: [PathSelect.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25844/)

## #7 — Shift Studio — 2015-04-14
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-94563>

Used it today. Thanks Hiro-ichi!

--Shift Studio.

## #8 — uncle808us — 2016-11-09
<https://www.cheetah3d.com/forum/index.php?threads/11014/post-103976>

[[QUOTE:  hiro-ichi said: Thanks for your comment, Frank. Unfortunately, the script can't work as the native commands like "Ring Select" or "Loop Select" since Cheetah 3D's Javascript cannot recognize addition]]

Very Very Useful for seams! I have been meaning to write and say how this tool is so useful to me when creating seams. Thank you very much.
