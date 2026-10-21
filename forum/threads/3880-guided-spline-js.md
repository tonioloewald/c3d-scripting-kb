# Guided Spline.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3880/
- Subforum: script-downloads
- Started by **tg_jp** on 2009-02-01; last post 2010-03-02; 19 posts

## #1 — tg_jp — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-27095>

Guided Spline.js

hello.

this is a spline script to make a path with start/end point parameter of base spline (first child object). to make 3d graph or something.

DOWNLOAD:
http://www.tres-graficos.jp/blog/files/article.php?id=45

DEMO:
http://www.youtube.com/watch?v=ssbsWj_tzZw

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=45, http://www.youtube.com/watch?v=ssbsWj_tzZw

## #2 — Francois — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-27099>

[[QUOTE:  tg_jp said: hello. this is a spline script to make a path with start/end point parameter of base spline (first child object). to make 3d graph or something. DOWNLOAD: http://www.tres-graficos.jp/blog]]

Hi Hiroto,

Excellent ! Another one of your great script ! Will test it right now 
Thank you very much for sharing.

## #3 — frank beckmann — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-27102>

Hi Hiroto.
Just another brillant script of yours - thank you.

With kindest regards
Frank

## #4 — Targos — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-27114>

Please could you post a screenshot of how this is to be setup? 

Thanks very much!

AaronC

## #5 — tg_jp — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-27117>

hello, sorry for lack of docs. 

here are sample .jas file that used for demo movie.
please check it. ( to open thiese sample, its requires installation of Guided Spline.js. )

enjoy. 

tg_jp, Hiroto

Attachments: [Guided Spline_demo files.zip](https://www.cheetah3d.com/forum/index.php?attachments/6255/)

## #6 — Targos — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-27118>

Thank you so much, this is great!

AaronC

## #7 — noocell — 2010-02-16
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39057>

[[QUOTE:  tg_jp said: hello, sorry for lack of docs. here are sample .jas file that used for demo movie. please check it. ( to open thiese sample, its requires installation of Guided Spline.js. ) enjoy. tg_jp,]]

Could someone plz confirm that this method of deformation is not supported in Unity? In other words: is there a way to import the demo's animation in Unity?

Thanks

## #8 — podperson — 2010-02-16
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39059>

To do something like this in Unity the simplest thing would be to implement something like the script itself in Unity.

Building meshes on-the-fly in Unity is dead simple.

## #9 — noocell — 2010-02-16
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39062>

[[QUOTE:  podperson said: To do something like this in Unity the simplest thing would be to implement something like the script itself in Unity. Building meshes on-the-fly in Unity is dead simple. Click to exp]]

I am asking this because Unity only supports bones deformation (not vertex) and I suspect this script implements a kind of  mesh modifiers for the bending of the objects along the splines. Please correct me if this is not the case.

## #10 — Raumplan — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39691>

I can't use the script

If I open demo files "graph-a" and "graph-spline" (or if I try to use the script) I have this messages

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
			
		
		
	

	
		
	

		
	

then Cheetah crash 

Any solutions?

## #11 — podperson — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39700>

[[QUOTE:  noocell said: I am asking this because Unity only supports bones deformation (not vertex) and I suspect this script implements a kind of mesh modifiers for the bending of the objects along the spline]]

No, it's just building the geometry over time.

But, actually, running bones along a spline is a fine idea.

## #12 — Raumplan — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39707>

another error message

## #13 — frank beckmann — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39709>

I think Hiroto  has to look into this, as it´s no longer compatible with V5.3 I guess.

Cheers
Frank

## #14 — Raumplan — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39710>

thank you Frank,
Yes, I have make a try with no-64bit version
and it work.

I hope Hiroto can correct this (...please)

## #15 — frank beckmann — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39712>

[[QUOTE:  Raumplan said: Yes, I have make a try with no-64bit version and it work. Click to expand... ]]

Oops - now I have a problem as I´m on Leopard/CoreDuo and it is not working.:redface: 

Cheers
Frank

## #16 — tg_jp — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39727>

hi,

thank yor for trying my script.

I fixed that problem, so please replace it for latest version.

http://www.tres-graficos.jp/blog/files/article.php?id=45

some of my scripts won't work on Cheetah3D 5.3, if you find that kind of bug, please let me know. 

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=45

## #17 — frank beckmann — 2010-03-01
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39728>

Great!

Thank you very much, Hiroto.

Cheers
Frank

## #18 — SurfingAlien — 2010-03-02
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39749>

many thanks Hiroto! :icon_thumbup:

## #19 — Raumplan — 2010-03-02
<https://www.cheetah3d.com/forum/index.php?threads/3880/post-39751>

You are a FLASH hero!:icon_thumbup: 

Thank you very much, Hiroto!!!
