# Reset local axis in hierarchy script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10843/
- Subforum: script-downloads
- Started by **artgolf** on 2014-11-18; last post 2016-02-16; 9 posts

## #1 — artgolf — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-91579>

Reset local axis while remain positions in hierarchy script

Hello,

I have modified the Pose Utility script, added two features:

1. Reset Axis
Let you clear all rotations while keeping all positions.

Maya style bind pose usually has many pre-rotations and post-rotations, even if you checked that of FBX import setting, the loaded joint merged them to its rotations, the independent pre-rotation and post-rotation are actually lost in the joint, so if you reset all the rotations in Pose Utility script, the pose looks very strange, but you may use this new function to clear all the rotations while keeping all positions in bind pose, so it becomes the new bind pose.

Then you can orient all joints with your desired axis, I'd like the default (Orientation: XYZ, Second Axis: +Z) mode, and skin your model with the new bind pose again in Cheetah3D.

The new skeleton can use the script to mirror poses and swapped poses between left and right correctly now.

2. Second Axis
If the second axis of the joints is not the default +X axis in the original Pose Utility script, such as +Z, +Y, etc. it can not work correctly, so I added this option, you may select that axis if you are using a different second axis.

Note: The new functions may not work in all cases, but it really helped me a lot.:smile:

I have converted all my Maya style skeletons to C3D successfully with this improved script.

Attachments: [Reset Axis.zip](https://www.cheetah3d.com/forum/index.php?attachments/25254/)

## #2 — JoeStrout — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99619>

Sorry for having to ask a stupid question, but I'm stumped.  How do I use this?

I have it installed (as Pose Utilities.js) in the Application Support/Cheetah3D/Scripts/Tool folder.  In C3D, it appears in the expected menu.

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
			
		
		
	

	
		
	

But when I select it, nothing happens.  No errors, no new UI, nothing in the Console.  I've tried it with various parts of the model selected first (mesh, joints, etc.), with the same result.

Where should the UI from this script appear?  Or have I installed it incorrectly somehow?

## #3 — frank beckmann — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99620>

It should appear in the tool tab:

Cheers
Frank

Attachments: [PoseUtilities.png](https://www.cheetah3d.com/forum/index.php?attachments/28345/)

## #4 — JoeStrout — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99625>

Ah, I begin to see.  I was in a layout that doesn't have a Tool tab.  So, it appeared that the script wasn't working.

I wonder if it's possible for a script to check for this condition and do something about it?  But then it's not just a script issue... I was trying to follow a rigging tutorial, and couldn't figure out why my Joint menu command was apparently not working either.  This whole right-click-and-add-the-panel-you-somehow-know-you-need thing is very hidden, and makes Cheetah3D much more confusing than it ought to be.

But enough grousing.  Once again, you have bailed me out, Frank!  Thank you very much.

## #5 — frank beckmann — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99626>

Yeah - there a lots of tools well hidden if you´re not aware but the tool-tab is  in every layout by default.  
(Is that character you´re working on one of yours?)

Cheers
Frank

## #6 — JoeStrout — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99631>

[[QUOTE:  frank beckmann said: Yeah - there a lots of tools well hidden if you´re not aware but the tool-tab is in every layout by default. (Is that character you´re working on one of yours?) Cheers Frank Clic]]

Tool tab does not appear to be in the "Animation" layout for me, which is how I missed it before.

And no, this is a model I purchased from the Unity Asset Store.  It's great and works well, but I just want to add a couple more bones (e.g. to wiggle the ears).  And, two hours later, I'm still struggling to do that... I think mostly because I can't get the darn thing back into the default pose.

## #7 — frank beckmann — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99633>

Having no tools in animation layout makes no sense to me - I doubt it´s a default layout.

For the character: adding joints need a new skeleton binding. When there´s no default/T-pose recorded ("Show bind pose:") you have to make one by yourself.

Cheers
Frank

## #8 — JoeStrout — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99636>

[[QUOTE:  frank beckmann said: For the character: adding joints need a new skeleton binding. When there´s no default/T-pose recorded ("Show bind pose:") you have to make one by yourself. Click to expand... ]]

OK.  I can manually rotate all the bones to a T-pose position; I've already done that (and lost it) once today.  What's the next step?  How do I save that as the default/T pose?

EDIT: Or better yet, how to simply get rid of all the poses in the file?  I'm even willing to hack the XML in the .jas file if it gets the job done!

Thanks,
- Joe

## #9 — frank beckmann — 2016-02-16
<https://www.cheetah3d.com/forum/index.php?threads/10843/post-99643>

The binding pose is the default pose and will kept so you can return to it at any time.
I´m not sure about the second question - either delete the pose-tag if there´s any or the skeleton-tag and add a fresh one.

Cheers
Frank
