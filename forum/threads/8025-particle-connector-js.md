# Particle Connector.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8025/
- Subforum: script-downloads
- Started by **tg_jp** on 2012-01-18; last post 2019-01-07; 32 posts

## #1 — tg_jp — 2012-01-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-66630>

Particle Connector.js

Hello

It's a spline script to create spline as connect all target particles.
Place it into ~/Library/Application Support/Cheetah3D/scripts/Splineobj folder to use.

[download] http://www.tres-graficos.jp/blog/files/article.php?id=81

[update] 20120119: fixed curve bug, improved distance calculation.
[update] 20120121: improved distance calculation.
[update] 20120125: change angle setting code, curve center parameter added.

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
			
		
		
	

	
		
	

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=81

## #2 — filip c — 2012-01-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-66642>

Amazing script Hiroto!

Thanks :smile:

## #3 — frank beckmann — 2012-01-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-66682>

Awesome script! Thanks again: http://www.screencast.com/t/K98gOENPrry3

Cheers
Frank

Links: http://www.screencast.com/t/K98gOENPrry3

## #4 — tg_jp — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-66703>

thank you for your comments.

[[QUOTE:  frank beckmann said: Awesome script! Thanks again: http://www.screencast.com/t/K98gOENPrry3 Cheers Frank Click to expand... ]]

nice movie. thanks.

I fixed some bugs, please replace it.

regards.

tg_jp, Hiroto.

## #5 — gregvoth — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-66707>

Reply to posts

This has me stumped...

## #6 — Martin — 2012-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-66746>

Wow, very nice effect. Excellent work.:icon_thumbup: 

Bye
Martin

## #7 — AndyThirtover — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91581>

Pointers, Instructions or Tutorial

Good Morning Dear Forum

I've downloaded the script, put it in splineObj and dragged a Particle Array into the 'target particle' drop box.

For the 'curve center' I've dropped a sphere which was the child particle of the Particle Array.

Nothing has happened, so I'm not so sure about what to next.

Could someone give me a nudge in the right direction please?

Regards

Andy

Attachments: [NetworkBalls.zip](https://www.cheetah3d.com/forum/index.php?attachments/25100/)

## #8 — tg_jp — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91582>

Hi,

* input higher value for 'distance threshold'.
* set another object for 'curve center'.

script makes spline as lines to each particles.

if you move object set to 'curve center', curve direction of lines changes.

Best

tg_jp, Hiroto.

Attachments: [ch_20141118_particleCon_ss.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25101/)

## #9 — AndyThirtover — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91583>

Got It!  Now for making the splines into tubes!

Hiroto

Extra Double thanks .. Here's where I got to:

I've been having play at trying to get the splines to be paths for tubes, but without success.  I guess that these need to be children of the 'Particle Connector' ?

Thanks Andy

Attachments: [NetworkBalls.zip](https://www.cheetah3d.com/forum/index.php?attachments/25102/)

## #10 — tg_jp — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91584>

hi,

no, Sweep creator object requires 2 children, profile and path.

please check attached image.

Best

tg_jp, Hiroto.

Attachments: [ch_20141118_aprticleCon_ss1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25103/)

## #11 — frank beckmann — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91585>

You need a second spline to get the sweep-creator to work:

Cheers
Frank

Attachments: [ParticleConnector.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/25104/)

## #12 — frank beckmann — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91587>

@ Hiroto.
Can you help here? http://www.cheetah3d.com/forum/showthread.php?t=10841
I don´t understand the script output by reading the OBJ+mtlExport-macro-script. :redface: 

Thanks for all your great scripts.

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showthread.php?t=10841

## #13 — AndyThirtover — 2014-11-18
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-91588>

Triple thanks --- working a treat

Hiroto --  Here's what I got:

Thanks ...  Andy

Attachments: [ThanksHiroto.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25105/)

## #14 — robsil — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114758>

Hello Hiroto, Is there a way to animate Particle Connector?
Thank's in advance for the answer.

Regards.

## #15 — robsil — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114759>

To be more clear.
I would like to animate the particles and that the connectors follow.

## #16 — uncle808us — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114760>

I'm missing something here (no splines)

Attachments: [Particle connector.zip](https://www.cheetah3d.com/forum/index.php?attachments/33786/)

## #17 — frank beckmann — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114761>

I´m not sure I understand. Do you want the particles A) kind oF slide along the splines or just B)splines be generated between new particles?
A) Not possible afaik
B) will work with higher value at the "distance threshold" property

Cheers
Frank

## #18 — frank beckmann — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114762>

Hi Robert.

[[QUOTE:  uncle808us said: I'm missing something here (no splines) Click to expand... ]]
Increase the "distance threshold" to at least 12 in your case please.

Cheers
Frank

## #19 — uncle808us — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114763>

B splines between the cylinders. But I see no splines (distance threshold now at 20.

## #20 — frank beckmann — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114764>

Can you check your file here?

Attachments: [Particle connector4U.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/33789/)

## #21 — uncle808us — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114765>

Thanks Frank I'm a"F"ing idiot! I had splines turned off in my display choices.... Sorry everyone. Sorry Frank. Happy New Year! Maybe I should start drinking again. ( Had to stop due to a bad heart. Weed too! )

## #22 — frank beckmann — 2018-12-31
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114766>

Haha - The best comes last! Happy New Year to you and your family to!

Cheers
Frank

## #23 — robsil — 2019-01-02
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114779>

I would like to move the particles and the connections follow movement. I did a frame-by-frame example animation. It is very long to do.
https://we.tl/t-aXdBlefwft

Links: https://we.tl/t-aXdBlefwft

## #24 — robsil — 2019-01-02
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114780>

And also a very good year to all C3D users

## #25 — frank beckmann — 2019-01-02
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114781>

Ah I see. I think the script is either not updating the transforming of the base mesh or can´t read out the changing data. I believe it´s scriptable - unfortunately not by me.
This has a polygon mesh with a keyframed modifier as a base and just needs 3 or 4 keyframes - you need  3 or 4 manually updates for the Particle Connector before a keyframe is recorded - but the animation looks smooth so far:

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
			
		
		
	

	
		
	
Not sure if this helps in your case though.

		
	
Cheers
Frank

## #26 — robsil — 2019-01-03
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114783>

Thank you very much for the example.
It's look great.
But I'm sorry I don't understand the process.
Is it possible to have a file?

## #27 — robsil — 2019-01-04
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114787>

What do you mean by keyframed modifier.
I try to understand your method but I never manage to get results.

## #28 — frank beckmann — 2019-01-04
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114788>

Can you upload what you have so far - so I can check if it´s a compatible setup?

Cheers
Frank

## #29 — robsil — 2019-01-07
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114798>

Thank you for your answer.
I have a test with just a cube but I do not understand that I have to animate and what keyframes I must record.

Attachments: [Nodes_Test.zip](https://www.cheetah3d.com/forum/index.php?attachments/33806/)

## #30 — frank beckmann — 2019-01-07
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114799>

I´m really having difficulties to synchronise your set-up In my example is´t:
1. Go frame 0: Select "Particle Connector" choose target particle again doubleclick record button to keyframe all available parameters
2. Scrub in time say 10 frames - keep "Particle Connector" selected and choose target particle again to update the script - record and so on.
There will be a slightly out-of-sync between dots and sweep while interpolation of keyframes.
Got that so far?

Cheers
Frank

## #31 — robsil — 2019-01-07
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114807>

Yes it works !! It took a long time to understand what I had to record.
I still have to solve the "out-of-sync".
Thank you very much Frank

## #32 — frank beckmann — 2019-01-07
<https://www.cheetah3d.com/forum/index.php?threads/8025/post-114811>

It´d be much easier if the script can read out the changes caused by the particle mesh animation. Not sure if this kind of hierarchical data structure can be accessed via the script language. Maybe Hiroto has an idea.
"out-of-sync": the shorter the interval of keyframes the better it should stay in sync. If it´s crucial better plan more of your time for the animation part.

Cheers
Frank
