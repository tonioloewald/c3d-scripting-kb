# wich Camera is active?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14045/
- Subforum: scripting-general
- Started by **3DSimulant** on 2021-08-28; last post 2021-12-29; 14 posts

## #1 — 3DSimulant — 2021-08-28
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123812>

Hi, I've several Cameras in a Scene, but how can I find the Cam wich is active yet?
Is there any icon for that? (if not, I want one please!)

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

## #2 — 3DSimulant — 2021-08-28
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123813>



## #3 — 3DSimulant — 2021-08-28
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123814>

Sorry, just seen by myself!
The Box in the Cam Logo!

## #4 — frank beckmann — 2021-08-28
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123815>

Hit!

## #5 — 3DSimulant — 2021-08-28
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123816>

And wrong section too (scripts...). 

I need more coffeee!!!

## #6 — frank beckmann — 2021-08-28
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123817>

Junkie.

## #7 — Helmut — 2021-08-29
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-123827>

Alternative: 
Result:

## #8 — cadet — 2021-12-14
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124337>

I'm working with dark mode. Is it possible to change the colour of the box in camera logo?

## #9 — frank beckmann — 2021-12-14
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124338>

I don´t think so. I mean the "active Camera" is that one within a square (whatever color it has).

## #10 — Helmut — 2021-12-15
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124342>

*    The icon is MWMCameraicon.tiff in the resources folder of the application.

		
	
*    There is a C3D user on the German forum, @Ca Rei, who has extensively modified the icons in the drop-down menues to suit his/her personal preferences.  He/she may be able to advice you on suitable trickery and tools to edit the Tiff image.

## #11 — frank beckmann — 2021-12-15
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124343>

I doubt this will work as I´m pretty sure the active camera isn´t a second icon but gets a highlight hard coded.

## #12 — Helmut — 2021-12-15
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124344>

*    I guess you are right.  However, it is possible that an icon which does not fill most of the square frame would show a more visible contrast compared to the "passive" camera(s).

## #13 — frank beckmann — 2021-12-15
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124345>

Sure - but from the screenshot above just the active camera is within the square no matter the color of the icon. If the camera icon itself is hard to read one can try to make a better one by following the specs of size+resolution/s+layered tiff - loading depends on used hardware I believe as there are always 2 versions stacked in a tiff: 32x32x72dpi+64x64x144. Good luck.

Attachments: [MWMCameraicon.tiff.zip](https://www.cheetah3d.com/forum/index.php?attachments/37976/)

## #14 — Ca Rei — 2021-12-29
<https://www.cheetah3d.com/forum/index.php?threads/14045/post-124423>

[[QUOTE:  Helmut said: * The icon is MWMCameraicon.tiff in the resources folder of the application. View attachment 37975 * There is a C3D user on the German forum, @Ca Rei, who has extensively modified the ic]]
Reading it today, i cant promise anything but i will take a look at it, even the marker square behind the camera-icon is a resource. I will drop a message if i find something helpful.
