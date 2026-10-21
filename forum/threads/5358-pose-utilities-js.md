# Pose Utilities.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5358/
- Subforum: script-downloads
- Started by **podperson** on 2010-02-14; last post 2023-09-15; 21 posts

## #1 — podperson — 2010-02-14
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-38956>

Pose Utilities.js

Update

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
			
		
		
	

	
		
	

Improved function names, and added new flip command (that flips entire pose, vs. old flip with swapped right and left). I hope it's not too confusing, but "mirror" and "flip" were somewhat misleading (either could mean either, right?).

Also added a naming convention (simply L or R, vs. L- or R-) since that's how my weasel is named.

[[QUOTE:  One of the things you will do a LOT when animating characters is flip poses (e.g. you can do a walk cycle by creating two or three poses and then flipping each of them). Mirror Copy kind of works for]]

http://loewald.com/c3dstuff/

Attachments: [Screen shot 2010-02-14 at 2.13.11 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/9688/), [Screen shot 2010-02-14 at 2.13.19 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/9689/)

Links: http://loewald.com/c3dstuff/

## #2 — tg_jp — 2010-02-14
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-38961>

hi,

nice script. :icon_thumbup:  thank you for sharing. 

regards.

tg_jp, Hiroto.

## #3 — fused — 2010-02-16
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-39035>

Goin' to give this a bash tonight. Thanks for sharing. Any extra animation stuff can only be a bonus.
 
Andrew:smile:

## #4 — fused — 2010-02-16
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-39064>

Only real problem so far was caused by me trying to paste a pose which I hadn't copied.

Attachments: [Screen shot 2010-02-16 at 21.14.06.png](https://www.cheetah3d.com/forum/index.php?attachments/9701/)

## #5 — podperson — 2010-02-17
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-39081>

Darn, I thought I'd prevented those from occurring 

I posted a quick fix which should prevent that error from occurring (you still get an error message)

## #6 — fused — 2010-02-17
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-39087>

Thanks PP I'll give it a whirl later. :icon_thumbup: 

Andrew:smile:

## #7 — podperson — 2010-05-11
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-42270>

Updated, see top post.

## #8 — fused — 2010-05-11
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-42277>

Sweet update, thanks for sharing.

## #9 — podperson — 2010-10-25
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-49539>

I've had a private msg with a bunch of questions on this. Anyone else having problems?

A few clarifications:

Swap Right & Left turns the current pose into a mirror reflection of that pose (so what the left hand is doing becomes what the right hand is doing and vice versa).

The Copy Right-to-Left and Left-to-Right pose create symmetric poses based on the right, and left sides of the pose respectively.

Flip will produce odd results if used on the entire hierarchy because it will flip every bone in the selected hierarchy (including bones that aren't "left" or "right" bones). Because this includes the spine it will tend to turn the model inside out. It can be useful for modifying sub-hierarchies, such as the knee or elbow, but you usually want swap.

Copy, Paste, and Paste swapped should be clear based on the above.

## #10 — Rateke — 2012-10-20
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-74220>

can't use the tool

I can't use the script.
I'm trying in every way I've already though about but with no luck, and I can find what I'm doing wrong, since I believe I'm making every step as told.
I just want to make my character walk and run using this script that promises to be awesome. Does anybody may post a video tutorial or try to explain again how to work it out right?
Thank you for the attention.

## #11 — Springy — 2013-02-16
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-77070>

Pose Utilities Help - Newbie

Hi All - I can't get the script to work. I can FLIP but nothing else. Tried changing naming convention. I've only been playing around with C3D for a week and only used Strata 3D briefly back in college 1997!

I've managed to model a character, rig (not quite right, think this the problem) and heat map etc. I'm just starting to try and POSE and add morphs.

However, I have managed to get cartoon eyes by using BULGE modifiers and PARENT CONSTRAINT while allowing eyes to follow a target. I'll post a separate file with these in cartoon eyes thread shortly. http://www.cheetah3d.com/forum/showthread.php?p=77071#post77071

I've learnt so much from the Forum, especially podperson, filip c to name a few! Thank you all, I'm really enjoying C3D but got a huge learning curve ahead still. I've also bought Tonio Loewald's book too.

Attachments: [duck 026-Skelaton Ani.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/19279/), [duck.png](https://www.cheetah3d.com/forum/index.php?attachments/19289/)

Links: http://www.cheetah3d.com/forum/showthread.php?p=77071#post77071

## #12 — frank beckmann — 2013-02-18
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-77100>

Hi.
I´m not quite sure what you expect. Can you be more specific?

Cheers
Frank

## #13 — Springy — 2013-02-18
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-77101>

Hi Frank

I was trying to do a WALK take/animation by setting each left pose for (contact, down, pass, up), recording in timeline and then wished to mirror the pose so I could have the right side of the walk (and save each of these as a pose). The script didn't do anything.

I'm having real problems understanding IK and linking. Tried picking apart the 'blockman' and 'rigs' Filip C has done. I've tried 'orient joint' also in character tools. Any help appreciated. Thanks.

## #14 — podperson — 2013-02-18
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-77102>

There's always the possibility Pose Utilities is buggy 

Pose utilities doesn't do anything to the actual C3D "poses". (I should probably rename it "Character Animation Utilities".) It simply operates on your bones. In particular it walks down the hierarchy and operates on things labeled left or right (in different ways) and mirrors or mirrors and switches their rotations and positions (i.e. if either makes a pose symmetrical, based on a specified side, or mirrors the pose). If I recall correctly it either ignores central bones or it flips them in flip case (e.g. if a character's back is leaning left, it leans it right).

## #15 — podperson — 2013-05-31
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-79377>

I've updated pose utilities — I think that the way it flipped rotations was incompatible with changes under C3D's hood. It seems to be working for me now, but I've left the old version up for users of older versions of C3D and people for whom it was still working.

## #16 — DarthSidious05 — 2013-08-22
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-81280>

[[QUOTE:  podperson said: I've updated pose utilities — I think that the way it flipped rotations was incompatible with changes under C3D's hood. It seems to be working for me now, but I've left the old versio]]

Thanks for updating it. I'll give it a try with future animation poses. Poses being invaluable to long animations. :icon_thumbup:

## #17 — uncle808us — 2016-11-09
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-103978>

Can't get this do work only the zero pose works for me. What am I doing wrong?

Attachments: [PoseUtilities.jpg](https://www.cheetah3d.com/forum/index.php?attachments/29840/)

## #18 — uncle808us — 2019-02-10
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-115286>

Pod Wanted to thank you for this Script it works for me transferring copy-paste poses. So Thank you.

## #19 — filip c — 2023-09-14
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-127346>

Hi all, this script saved me a ton of time in the past, but lost it, anybody can help me find it back?

Thanks in advance!

## #20 — frank beckmann — 2023-09-15
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-127350>

Hope it´s the right one:

Attachments: [Pose Utilities.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/39489/)

## #21 — son of the light — 2023-09-15
<https://www.cheetah3d.com/forum/index.php?threads/5358/post-127351>

[[QUOTE:  frank beckmann said: Hope it´s the right one: Click to expand... ]]
tanks  a lot
