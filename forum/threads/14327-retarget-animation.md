# Retarget animation

- Thread: https://www.cheetah3d.com/forum/index.php?threads/14327/
- Subforum: script-downloads
- Started by **filip c** on 2023-09-17; last post 2023-09-19; 10 posts

## #1 — filip c — 2023-09-17
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127358>

Hi all, I made a Tool script to retarget animation between skeletons (or any objects).
It copies the rotations from a target object and applies an orientconstrainttag to the selected object.
For identical hierarchies, you can retarget the whole hierarchy all at once.
Often it's usefull to also link the position of the roort object, so I made that option too with a pointconstrainttag.
It is possible to retarget partial animations or combine parts of different animations.
You can keyframe whatever you want in your new animation and finetune…

The intention is to make it more easy to work with animations in Cheetah3D.
Through other software or motion capture data via FBX import and retargeting.

I’m thinking of mixamo, Cascadeur, mogen, tdpt,…

I hope you enjoy it!

(Edit: newer version in later post)

Attachments: [retarget.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/39493/)

## #2 — Lydia — 2023-09-18
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127362>

I would like to try it, but when I select the script, Cheetah crashes (in version 7.3.3 and 7.5.2). I put it in the folder ...>Scripts>Tool. I have no idea about programming. Is there anything else to consider?

## #3 — filip c — 2023-09-18
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127367>

[[QUOTE:  Lydia said: I would like to try it, but when I select the script, Cheetah crashes (in version 7.3.3 and 7.5.2). I put it in the folder ...>Scripts>Tool. I have no idea about programming. Is there any]]
I’m very sorry to hear that, I’ll look into it, but I can’t promise anything. I frankensteined this code together with some help of ChatGPT 
It works in my old version of cheetah (I’m at work now, have to check later which version I’m using)

## #4 — filip c — 2023-09-18
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127368>

I'm using it in 7.5.1 without problems, but it crashes in 8.0 B3.

## #5 — filip c — 2023-09-18
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127369>

It seems like a checkbox gave some problems, so I modified it to a normal button. 
If you could please try the attached version, it will be very much appreciated!

Attachments: [retarget 2.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/39495/)

## #6 — Lydia — 2023-09-19
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127370>

Thanks, now it works in both versions!
I did a quick test. It doesn't look quite perfect because they are two slightly different rigs, and then of course you have to do a bit of tweaking (I linked the controllers, not the bones), but basically it works very well and easily! 
And with a whole hierarchy it's much faster than doing everything manually, of course.
I still need to test it, but I think it could also save a lot of time in creating the controllers, especially with the fingers. 
Thanks a lot for sharing!

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
			
		
		
	

	
		
	

[[QUOTE:  filip c said: It is possible to retarget partial animations or combine parts of different animations. You can keyframe whatever you want in your new animation and finetune… Click to expand... ]]

I must confess, though, that I'm not exactly sure how you mean this. Combining by multiple tags with different targets? And what exactly is keyframed in the new animation when it follows the targets of the first one? Especially with an FBX where every frame is keyframed. Well, I guess I need to think about it some more and test it.

## #7 — son of the light — 2023-09-19
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127371>

[[QUOTE:  Lydia said: Thanks, now it works in both versions! I did a quick test. It doesn't look quite perfect because they are two slightly different rigs, and then of course you have to do a bit of tweaking ]]
how to use that?

## #8 — filip c — 2023-09-19
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127372>

[[QUOTE:  son of the light said: how to use that? Click to expand... ]]
Hi,

If you have a rigged character and you import an animated character (import via FBX for example), you can copy the animation by running this script.
It copies the animation from a chosen part in the script UI to the selected part. 

I’ll try to make an elaborate example later…

## #9 — Lydia — 2023-09-19
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127373>

Ahh, I think I understand now what you mean by "combine"! Not combining different parts of an overall animation, but combining different rig parts of different animations in one rig, so for example the facial animation of one character (if created with bones, of course) and the body animation of another. Or just the hand... 
I see - forget about my question.

## #10 — filip c — 2023-09-19
<https://www.cheetah3d.com/forum/index.php?threads/14327/post-127374>

[[QUOTE:  Lydia said: Ahh, I think I understand now what you mean by "combine"! Not combining different parts of an overall animation, but combining different rig parts of different animations in one rig, so f]]
Apologies, I didn’t find time yet to make a tutorial, but yes, that was what I intended
