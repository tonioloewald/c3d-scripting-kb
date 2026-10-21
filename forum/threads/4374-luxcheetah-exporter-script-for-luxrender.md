# LuxCheetah - exporter script for LuxRender

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4374/
- Subforum: script-downloads
- Started by **tg_jp** on 2009-07-11; last post 2015-01-15; 29 posts

## #1 — tg_jp — 2009-07-11
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-30638>

LuxCheetah - exporter script for LuxRender

Hello.

it's tool script to export .lxs file for luxrender.

download: http://www.tres-graficos.jp/blog/files/article.php?id=50

for Cheetah3D 5.5 ( limitation about material exporting )
download: http://www.tres-graficos.jp/blog/files/article.php?id=59

test movie:
http://www.youtube.com/watch?v=NIeNQ2uhU-Y

luxrender:
http://www.luxrender.net/

regards.

tg_jp, Hiroto.

Links: http://www.luxrender.net/, http://www.tres-graficos.jp/blog/files/article.php?id=50, http://www.tres-graficos.jp/blog/files/article.php?id=59, http://www.youtube.com/watch?v=NIeNQ2uhU-Y

## #2 — SurfingAlien — 2009-07-11
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-30641>

fantastic Hiroto!

i don't plan to use Lux very often (due to his biblic render time...) but this is definitely a "must have" in my toolset... thank you!

I'm going to do some test and let you know if I find any problem

Cheers,
Alessandro

## #3 — SurfingAlien — 2009-07-17
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-30768>

Hi Hiroto!

i've tried exporting some .jas scene to Lux and worked fine... but when i tried the "RenderTestFile" used to test cpu speed in another thread i got this js error:

"line: 932 
Object.getParameter() couldn't find parameter called axis"

hope it helps...

great work so far on this exporter :icon_thumbup: 

Cheers,
Alessandro

## #4 — tg_jp — 2009-07-20
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-30824>

hello, thank you for testing.

the scene of rendertestfile.jas has old light object ( 2 Pointlights ), it causes that error. so, I will fix that problem in future release. thank you for your helps.

these are latest renders.

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

## #5 — SurfingAlien — 2009-07-20
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-30826>

Little test using a nice bathroom scene posted by someone (Luke?) some times ago...

no changes have been made in the C3D scene - no property tweak in Lux (only opened the scene + exported to .lxs + hit "render" and... wait!)

shots: LuxRender after 10min (1) 100 min (2) and 150min (3)
         Cheetah after 10min (4)

rendered on MBP unibody core2duo@2.4GHz/4Gb (1200x600)

next step: try playing around with light and render properties

the thanks are all up to you, Hiroto... YOU did the hard work:wink: 

Cheers,
Alessandro

Attachments: [Bathroom@10min.jpg](https://www.cheetah3d.com/forum/index.php?attachments/7273/), [Bathroom@100min.jpg](https://www.cheetah3d.com/forum/index.php?attachments/7274/), [Bathroom@150min.jpg](https://www.cheetah3d.com/forum/index.php?attachments/7275/), [C3Dbathroom.jpg](https://www.cheetah3d.com/forum/index.php?attachments/7276/)

## #6 — tg_jp — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-47796>

hello

I have just update this script  for Cheetah3D 5.5 and LuxRender 0.7.
please check first post.

regards.

tg_jp, Hiroto.

## #7 — archie — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-47800>

whoa this is great news !

thanks much hiroto !

(once i have time to do some testing i might come back with some questions regarding materials)

- archie

## #8 — SurfingAlien — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-47816>

[[QUOTE:  tg_jp said: hello I have just update this script for Cheetah3D 5.5 and LuxRender 0.7. please check first post. regards. tg_jp, Hiroto. Click to expand... ]]

this is very cool Hiroto,
thank you so much!

please keep an eye on SLG->Lux0.8

cheers,
Alessandro

## #9 — level-A — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51666>

well,...stupid question, but...how can I edit my lxs. file to get materials after exporting?

## #10 — SurfingAlien — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51667>

[[QUOTE:  level-A said: well,...stupid question, but...how can I edit my lxs. file to get materials after exporting? Click to expand... ]]

any text editor can edit .lxs, but it will be a nightmare if you don't exactly know the meaning and value range for any property and/or if you got too many materials...
I'd try to export the obj+mtl from Cheetah, load it into Blender and use the complete and up-to-date LexBlend interface instead (I'm not criticizing Hiroto's great script, simply there are too many things that are not accessible via Cheetah+LuxCheetah)

cheers,
Alessandro

## #11 — level-A — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51669>

[[QUOTE:  SurfingAlien said: any text editor can edit .lxs, but it will be a nightmare if you don't exactly know the meaning and value range for any property and/or if you got too many materials... I'd try to ]]

ok...thanx ;-)

## #12 — Andreu — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51671>

A more robust LuxCheetah workflow via plugin would be soooo cool! I'm really getting into LuxRender these days. IMO, unbiased rendering is underrated due to the slowness, but the results are !!!AWESOME!!!

## #13 — level-A — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51672>

[[QUOTE:  Andreu said: IMO, unbiased rendering is underrated due to the slowness, but the results are !!!AWESOME!!! Click to expand... ]]

that is excactly why I wanna try luxrender ;-)

...another problem, which goes to a different side: I can not open obj. in blender 2.55 beta...?

## #14 — frank beckmann — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51674>

[[QUOTE:  level-A said: ...another problem, which goes to a different side: I can not open obj. in blender 2.55 beta...? Click to expand... ]]

Why is this? Wrong Python version installed or what?

Cheers
Frank

## #15 — SurfingAlien — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51675>

[[QUOTE:  level-A said: ...another problem, which goes to a different side: I can not open obj. in blender 2.55 beta...? Click to expand... ]]

seems fine here, I just tried with an obj created with Cheetah's OBJ+MTL export script. Or maybe you tried with File/Export ?

## #16 — level-A — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51681>

[[QUOTE:  frank beckmann said: Why is this? Wrong Python version installed or what? Cheers Frank Click to expand... ]]

don't really know...I thought a newer python version should be installed automatically...am I wrong?
3ds works by the way...

## #17 — frank beckmann — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51682>

Don´t know what is with your Blender version.
I thought the Blender->Luxrender pipeline is limited to Blender 2.49 anyway - no?

Cheers
Frank

## #18 — SurfingAlien — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-51695>

[[QUOTE:  frank beckmann said: I thought the Blender->Luxrender pipeline is limited to Blender 2.49 anyway - no? Cheers Frank Click to expand... ]]

actually no. I didn't follow the very last development but there was an exporter for 2.54 for both Luxrender 0.71 and SLG. Probably there's also something newer in the development builds towards 0.8 (when the SLG project -GPU acceleration- will merge into the main branch).
the problem that any Blender exporter is facing these days is the API constantly being changed/updated (and that's the first reason why I'm not following Lux on a daily basis... just waiting for the things to consolidate a bit)

@Level-A: the Luxrender forum is the best place to discuss this thing and get the help you need, of course

cheers,
Alessandro

## #19 — crgreen — 2012-02-21
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-67806>

cannot run script

Hi. I wanted to try a test with LuxCheetah, so I used the lux camera tag, and lux material tag, and when I try to run the LuxCheetah script, it just reports:

		
	
It seems all these functions return similar errors. Does this script need to be updated?
Thanks
--crgreen

## #20 — tg_jp — 2012-02-21
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-67810>

thank you for trying.

please use a version for Cheetah3D 5.5 for avoiding that errors. material informations are not exported, so you have to edit it manually after export it with text editor application, though.

but I have an idea to getting material info without using javascript api, so I will update if you liked it in my spare time.

regards.

tg_jp, Hiroto.

## #21 — crgreen — 2012-02-22
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-67859>

yes, had wrong version, but ...

Hello Hiroto! Thank you for making me realize that I had the wrong version (not sure how that happened). Script is now working!
Now, how do the motion blur 'shutter open' and ''shutter close' parameters work? That is, what is the scale of these parameters?

thanks again

crg

(I am asking because I'm not seeing any motion blur in Lux ... yet ... )

## #22 — tg_jp — 2012-02-23
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-67899>

hi

actually I am not sure about that. these values will be written at camera block.

according to below page, for getting motion blur, you have to add additional lines to  files manually to let LuxRenderer know camera/object movement.

http://www.luxrender.net/wiki/Motion_Blur

so, automatic motion blur is NOT available with this script now. I will update. 

regards.

tg_jp, Hiroto.

Links: http://www.luxrender.net/wiki/Motion_Blur

## #23 — crgreen — 2012-02-25
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-67965>

Ah, I'm not crazy, then 

Thank you very much for your attention to this, and for the wonderful work.

-c

## #24 — Paul P — 2014-09-30
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-90527>

Hi all,

just bumping this old thread.

Is there any chance that we could get a proper, working exporter / plugin for Cheetah and LuxRender ? I would be happy to pay for this. 

Thanks

## #25 — tg_jp — 2014-10-01
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-90563>

Hi,

I plan to update this script for the latest version of LuxRender. Please let me know your request or problem.

Best

tg_jp, Hiroto

## #26 — Paul P — 2014-10-01
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-90564>

Hi Hiroto,

thank you for your reply. 

I was hoping you would be able to update it so that it can import all materials, colors, lights etc. to render in LuxRender with minimal or no tweaking, Is this possible ?

Thank you.

## #27 — tg_jp — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-90678>

Hi

thank you for your comment.

I will update it near future. ...

Best

tg_jp, Hiroto

## #28 — Paul P — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-90679>

[[QUOTE:  tg_jp said: Hi thank you for your comment. I will update it near future. ... Best tg_jp, Hiroto Click to expand... ]]

Thank you Hiroto. I am sure that many users, not just me, are looking forward to this. 

Thanks again.

## #29 — fabio — 2015-01-15
<https://www.cheetah3d.com/forum/index.php?threads/4374/post-93037>

But a tutorial for use luxtag?
