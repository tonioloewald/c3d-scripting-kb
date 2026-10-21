# Any Hints for the addParameterVec3D method?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14300/
- Subforum: scripting-general
- Started by **MonkeyT** on 2023-05-20; last post 2023-05-20; 1 posts

## #1 — MonkeyT — 2023-05-20
<https://www.cheetah3d.com/forum/index.php?threads/14300/post-127123>

I'm just starting to get comfortable scripting and am working with rotating Particles. 

I've noticed that in the default interface fields for Rotation values of the Particle Script interface, the popup hint values are H, P, and B.  When I use addParameterVec3D() to make my own rotation fields, the popup hints are X, Y, and Z.  I thought that changing the rotation order to ROT_HPB by using convertEuler() on the Vec3D object might update the popup hints, but I was either wrong or not doing it correctly.

Does anyone have some guidance to offer?

Also, what is the Vec3d.convertEuler() manual entry describing when it mentions a "tip"?

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

Attachments: [MultiRep_scrnsht.png](https://www.cheetah3d.com/forum/index.php?attachments/39356/)
