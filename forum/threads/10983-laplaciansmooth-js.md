# LaplacianSmooth.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10983/
- Subforum: script-downloads
- Started by **hiro-ichi** on 2015-01-10; last post 2019-09-24; 15 posts

## #1 — hiro-ichi — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92926>

LaplacianSmooth.js

Hello, all. I'm new here.

I made a tool script "LaplacianSmooth.js" which produces smoothing of selected polygons. A typical usage is that:

Select vertices, edges, faces or a polygon object,
Run this script,
Press OK button.
Have a fun!

Best regards.

Note:
I'm sorry that I may not give enough support for the script because of my poor English skill.

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
			
		
		
	

	
View attachment LaplacianSmooth.zip

Attachments: [LaplacianSmoothSample.png](https://www.cheetah3d.com/forum/index.php?attachments/25685/), [LaplacianSmooth.zip](https://www.cheetah3d.com/forum/index.php?attachments/25684/)

## #2 — frank beckmann — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92927>

Hi and Welcome!
This is absolutely amazing - what a great addition. I´ll definitely have to find a hotkey (and a part in my brain) for this. :icon_thumbup: :icon_thumbup: 
What a great first posting.
Thanks for sharing.

Cheers
Frank

## #3 — Jeanny — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92928>

Oh this is nice hiro-ichi!  
There are a lot of times I would like only part of an object to be smoothed.
Thank you so much!

My Best
Jeanny

BTW  Your English is better than 80% of Americans and I include myself in that 80%
        Wish I could learn another language than English.  I have tried German, French and Spanish.  
        It is very difficult for me. What makes it even more difficult is being isolated from other people speaking those languages.
        There is no way to practice and continue to use it to keep it in ones mind.

## #4 — frank beckmann — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92929>

This one seems for you Jeanny! Works great on your bear.  

Cheers
Frank

## #5 — Jeanny — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92930>

I will certainly give it a try.

My Best
Jeanny

## #6 — uncle808us — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92931>

@hiro-ichi: Thank you very much for this useful addition to Cheetah 3D. Welcome to the forum.

## #7 — Shift Studio — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92934>

That looks great! I've wished for such a tool many, many times.

--Shift Studio.

## #8 — ZooHead — 2015-01-10
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92936>

Thank you for this great script, and welcome to the forum.
​

## #9 — tg_jp — 2015-01-11
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92942>

nice script!. thank you for sharing!

Best

tg_jp, Hiroto

## #10 — hiro-ichi — 2015-01-11
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92960>

Thanks for comments!

Thanks for comments. I wish that it will help your works in Cheetah 3D!

Additional information about option parameters: 

The script has two algorithms; "uniform weight" and "1/(edge length) weight". They can produce slightly different smoothing results.

As shown blue lines, smoothing result with the "1/(edge length) weight" remains original edge length more than the "uniform weight". On the other hand, a shape of the "uniform weight" gets much more natural smoothing. (see green lines.)

"lambda" and "kPB" are a calculation step size and a volume preservation parameter, respectively. They should not be changed while the script works correctly. But if something strange result appears, please try to decrease them.

Regards

Attachments: [LaplacianSmoothWeightType.png](https://www.cheetah3d.com/forum/index.php?attachments/25692/)

## #11 — frank beckmann — 2015-01-11
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92963>

Thanks again.
The ability to reconstruct crumbled meshes is stunning:

Cheers
Frank

Attachments: [LaplacianSmooth.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/25694/)

## #12 — hiro-ichi — 2015-01-12
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-92966>

Thanks for your comment and testing the tool, Frank.

I'm relieved that it worked fine.

regards

## #13 — uncle808us — 2015-01-16
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-93063>

@hiro-ichi: This script is so very useful! What a great script! :icon_thumbup: :icon_thumbup: :icon_thumbup: :icon_thumbup: :icon_thumbup:

## #14 — jdmac — 2017-05-08
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-107363>

@hiro-ichi, would it be possible to implement an option to isolate smooth on a selected plane ...  XZ, XY, ZY ?

Thanks for a great script.

## #15 — perpetualrevision — 2019-09-24
<https://www.cheetah3d.com/forum/index.php?threads/10983/post-117722>

The range of things I can model expanded considerably once I started using this script! For me, it was the "missing link" in being able to modify a mesh without needing to further subdivide in order to smooth out all the edges my tweaking left behind! (The "Smooth" modifier always smooths my meshes out to nothing, even w/ only 1 iteration, and the Smooth Brush isn't precise or uniform enough). THANK YOU so much for the script!!
