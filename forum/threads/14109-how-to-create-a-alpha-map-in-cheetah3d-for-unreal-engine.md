# How to create a Alpha Map in Cheetah3D for Unreal Engine?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14109/
- Subforum: scripting-general
- Started by **Julius Kuno** on 2022-01-08; last post 2022-01-18; 13 posts

## #1 — Julius Kuno — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124492>

Dear Everyone

I wish to make an normal map from a 3D model in Cheetah3D. (To use for a decal inside unreal engine). Basically what this person is doing in this video with ZBrush but I would like to do it with Cheetah3d : 
	
		
	

Thanks in advance

## #2 — Julius Kuno — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124493>

Dear Everyone

If there is a direct way I am still interested, if someone has the same problem and no solution here is what I found out so far.

You can download "substance player" for free.
Export your mesh as a obj from cheetah 3d
drag and drop it in to the 3d viewer of "substance player
then you can display it as a normal map
materials -> default -> mesh info -> normal
and export the normal map like that:
camera -> save render
this map will be usable in Unreal Engine

## #3 — frank beckmann — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124494>

You can do exactly this in Cheetah3D -  not with the fidelity and variance on brush sets like ZBrush but this works pretty much out of the box:

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

## #4 — frank beckmann — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124495>

Here´s to an old thread: https://www.cheetah3d.com/forum/index.php?threads/5778/
Damn - we´re in the scripting section of this forum. Hopefully unintentional or do you seek for a scripted solution?

Links: https://www.cheetah3d.com/forum/index.php?threads/5778/

## #5 — Julius Kuno — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124496>

Thank you very much for your reply. I am actually unintentionally in the scripting section, I am sorry for that mistake.

## #6 — frank beckmann — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124497>

No prob from my side.

## #7 — Julius Kuno — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124498>

I am currently trying to replicate your instructions, but from the old threat you referred me to I think I should apply a directional shader but how do I do that.

Attachments: [1641640729262.png](https://www.cheetah3d.com/forum/index.php?attachments/38049/)

## #8 — frank beckmann — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124499>

Drag it from the repository onto the plane or the object in the Layers panel. A"+" sign will appear at the cursor when successfully applied.

## #9 — Julius Kuno — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124500>

i am not really sure why my Normal-Map alway turns out green...

## #10 — frank beckmann — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124501>

You must ensure to align the plane to the Z-axis to render Z-depth. Just in case you want to simply rotate it 90° you must reset the value by using the Coord-System->Burn Transform.

## #11 — Julius Kuno — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124502>

Nice now it works perfectly fine. Thank you, you helped me a great deal.

## #12 — frank beckmann — 2022-01-08
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124503>

You're welcome.

## #13 — jdmac — 2022-01-18
<https://www.cheetah3d.com/forum/index.php?threads/14109/post-124579>

[[QUOTE:  frank beckmann said: You can do exactly this in Cheetah3D - not with the fidelity and variance on brush sets like ZBrush but this works pretty much out of the box: Click to expand... ]]
Thanks for screenshots. I learned something new today.
