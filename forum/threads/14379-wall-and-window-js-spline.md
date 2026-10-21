# Wall and Window.js Spline

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14379/
- Subforum: script-downloads
- Started by **MarkusR** on 2024-02-17; last post 2024-02-19; 6 posts

## #1 — MarkusR — 2024-02-17
<https://www.cheetah3d.com/forum/index.php?threads/14379/post-127845>

Google Drive Share

this Script create a Wall with Window holes by Parameter Input in Cheetah 3D 8.x UI.

Drop this Spline below a Creator Extrude.

new script

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
			
		
		
	

	
		
	

old script

Attachments: [Bildschirmfoto 2024-02-17 um 20.13.01.png](https://www.cheetah3d.com/forum/index.php?attachments/39742/)

Links: https://drive.google.com/file/d/1rMXGrL2tqd7g7pNO8vTpbedEVsZ6Kx5T/view?usp=share_link

## #2 — Helmut — 2024-02-18
<https://www.cheetah3d.com/forum/index.php?threads/14379/post-127847>

*    Hi Markus!
*    Thanks for the upload of the Java script.
    Also useful for haunted houses...

## #3 — Helmut — 2024-02-18
<https://www.cheetah3d.com/forum/index.php?threads/14379/post-127852>

*    Minor nitpick:
*    I suggest adding a parameter to the horizontal distribution of the windows.  Fenestral axes in a facade generally have an equal horizontal distance.  However, this grid is not maintained on the perimeters.  There should be an additional  parameter to define the lateral offset of the grid for the openings.

## #4 — MarkusR — 2024-02-18
<https://www.cheetah3d.com/forum/index.php?threads/14379/post-127857>

[[QUOTE:  Helmut said: * Minor nitpick: * I suggest adding a parameter to the horizontal distribution of the windows. Fenestral axes in a facade generally have an equal horizontal distance. However, this grid ]]
it was lack of my maths, can’t solve it with different window sizes and count.

i have a new math plan to solve it ...

## #5 — MarkusR — 2024-02-19
<https://www.cheetah3d.com/forum/index.php?threads/14379/post-127862>

I updated the script.
the gap between windows is (wallwidth - windowwidth*windows) / (windows+1)

## #6 — Helmut — 2024-02-19
<https://www.cheetah3d.com/forum/index.php?threads/14379/post-127863>

Thank you, Markus!  I think that is a useful improvement to the script.
