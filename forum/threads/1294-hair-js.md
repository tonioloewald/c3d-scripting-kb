# Hair.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1294/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-01-31; last post 2022-01-21; 125 posts

## #1 — tg_jp — 2007-01-31
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8136>

Hair.js

hello, 

there is still lack of some functions and it is slow, but please try it  

updated - 20100125.
cHair.js added - 20120913. 20150411 updated.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=44
download for 5.2 -> http://www.tres-graficos.jp/blog/files/article.php?id=52

alter version cHair.js -> http://www.tres-graficos.jp/blog/files/article.php?id=63

to use, please place the script file into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder, and relaunch Cheetah3D.app or "Update Scripts Menu" for 5.x.

another samples with color and tranparency textures. 

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
			
		
		
	

	
		
	

		
	

playing demo movie.
http://es.youtube.com/watch?v=Szz7Dd_ypVw

regards.

tg_jp, Hiroto.

Attachments: [ch_20070131_beeHair.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1653/)

Links: http://es.youtube.com/watch?v=Szz7Dd_ypVw, http://www.tres-graficos.jp/blog/files/article.php?id=22, http://www.tres-graficos.jp/blog/files/article.php?id=52, http://www.tres-graficos.jp/blog/files/article.php?id=63

## #2 — DaVinci — 2007-01-31
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8138>

Looks great!

## #3 — squareitround — 2007-01-31
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8152>

Looks very promising. :icon_thumbup:

## #4 — uncle808us — 2007-01-31
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8155>

Great work !

Hair is great thanks so much. You and Todd are brilliant.:icon_thumbup:

## #5 — Martin — 2007-01-31
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8162>

Hi,
it looks fantastic. I looks a little bit like a character form "Viva Pinata". :smile: 

Bye,
Martin

## #6 — tg_jp — 2007-02-01
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8169>

hello, thanks for comments.  

this sript may be too slow to use, it needs long calculation time (rainbow cursor) for natural hair or grass. 
green 'C3D' scene has 660000 polys, and it seems to need more ray depth. 

> hello, Martin

this script is not saved properly. after re-opening the scene, script object has been disappeared. am I missing something?

regards.

tg_jp, Hiroto.

## #7 — uncle808us — 2007-02-01
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8170>

Yea it's slow but....

It may be slow but it works for hair, it takes me time to grow hair too. Thanks again.:smile:

## #8 — Martin — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8181>

[[QUOTE:  tg_jp said: this script is not saved properly. after re-opening the scene, script object has been disappeared. am I missing something? Click to expand... ]]

Ups, the "type" parameter name collides with an already available non public parameter. Just rename your "type" parameter to "hair type" or something else and it will work.

Bye,
Martin

P.S. Cool new stuff :smile:

## #9 — tg_jp — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8186>

Hi, thanks.

[[QUOTE:  Ups, the "type" parameter name collides with an already available non public parameter. Just rename your "type" parameter to "hair type" or something else and it will work. Click to expand... ]]

I fixed that problem.  

regards.

tg_jp, Hiroto.

## #10 — fused — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8188>

Hi Hiroto,
Over at Jpatch they are working on the same problem.
http://forum.jpatch.com/viewtopic.php?t=788

Andrew

Links: http://forum.jpatch.com/viewtopic.php?t=788

## #11 — peer — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8189>

Here's my first test with grass. I must work on a better texture, but the start is here. I really like your plugin Hiroto, thanks!!

Regards,

Peter

Attachments: [GrassTest.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1663/)

## #12 — tg_jp — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8190>

Hello,

please check latest update (20070202c.zip). It may improve speed a bit.

> hi, Andrew

I have checked that thread, and it is interesting!! thanks. I want to add these effect (gravity or friction) to this script in the future. I know it is too difficult for me anyway.  

> hi, Peter

thanks for testing this. nice. 

and I post another sample,  using color, specular, and transparent textures.
and render tag (uncheck 'visible in radiosity') for hair object.

regards.

tg_jp, Hiroto.

Attachments: [ch_20070202_redMonsterTexture.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1664/), [ch_20070202_beeDosRedHair.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1665/)

## #13 — Martin — 2007-02-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8198>

[[QUOTE:  peer said: Here's my first test with grass. I must work on a better texture, but the start is here. I really like your plugin Hiroto, thanks!! Click to expand... ]]

Hi Peter,
the script is for hair and not for grass. :wink: But how cares if the result looks nice.:smile: 

Bye,
Martin

## #14 — Martin — 2007-02-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8199>

Hi Hiroto,
your hairy monster looks really nice. It's the first of his kind in Cheetah3D. Very cool.:smile: I didn't expect something like that in the near future.

Bye,
Martin

P.S. How did you orient the hair. Did you use UV coords?

## #15 — tg_jp — 2007-02-10
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8293>

hello,

I post sample screen shot image for using Hair.js. I hoep it will help.

How to use.

It is polygonscript. Unarchive downloaded .zip file, and place it into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder.
Relaunch Cheetah3D application, open a scene that you want add Hair object. Select Hair.js from Tool->Scripts->Polygon script.
Add some polygon object to Hair script object as child object.
Change parameters. have fun.:smile: 

regards.

tg_jp, Hiroto.

Attachments: [ch_20070210_hairUsage.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1685/)

## #16 — Martin — 2007-02-10
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8297>

Hi Hiroto,
very nice. :smile: I've also seen the monster on your blog. It looks so cool. Excellent job.:icon_thumbup: 

Bye,
Martin

## #17 — peer — 2007-02-11
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8311>

Hi Hiroto, again thanks for the script! I found what I believe is a bug. When I use the face camera option, the polygons are distorted. See screenshot. Is this correct?

Regards,

Peter

Attachments: [Hair-Grass.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1688/)

## #18 — tg_jp — 2007-02-11
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8312>

hi, Peter

thank you for your reporting. it is a bug. I will fix it for next update. 

regards.

tg_jp, Hiroto.

## #19 — Meshman — 2007-02-11
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8313>

more hairy stuff

Hi Hiroto, just wanted to say thanks for the great script!  I've attached a picture of some hairy fruits I created :smile: 

Thanks again!

Attachments: [hairfruit.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1690/)

## #20 — Eureka! — 2007-02-11
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8314>

WOW! Meshman that looks fantastic:icon_thumbup:! DOF and everything. Great use of textures. I'm also trying to make grass. Would Peter and Meshman post there settings?
Wonderfull script. One of your best for sure:icon_thumbup:.

Thanks,
Greg

## #21 — tg_jp — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8353>

Hello,

> Peter

I fixed distorted bug. please check the latest zip file. but, 'face to cam' option only works for simple x-z plane by current limitation.  

> Meshman

wow, nice render. dof so effective. thanks for using this scirpt. I am wondering how long you need time for rendering this.:? 

regards.

tg_jp, Hiroto.

## #22 — Meshman — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8370>

Glad you like the render Hiroto.  This one took about 40 minutes (800x600 res) on my 1.66GHz Intel Core Duo Mac Mini.  The dof slows it down quite a bit and I also upped the antialiasing to make sure the hairs didn't have any jagged edges.  I usually do mini renders to check out how it looks and then put the main render on while I go and have a cup of tea :smile: 

[[QUOTE:  tg_jp said: Hello, > Meshman wow, nice render. dof so effective. thanks for using this scirpt. I am wondering how long you need time for rendering this.:? regards. tg_jp, Hiroto. Click to expand... ]]

## #23 — Meshman — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8371>

Greg, I didn't keep the file unfortunately (well I did for the final scene but the script info was lost when I made the meshes editable) but I'll knock up another similar hairy object and post it here in a few days.

[[QUOTE:  Eureka! said: WOW! Meshman that looks fantastic:icon_thumbup:! DOF and everything. Great use of textures. I'm also trying to make grass. Would Peter and Meshman post there settings? Wonder full scrip]]

## #24 — Eureka! — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8375>

Thank you

Thanks that would be great:smile:.

## #25 — Meshman — 2007-02-15
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8419>

[[QUOTE:  Eureka! said: Thanks that would be great:smile:. Click to expand... ]]

Here you go...

Attachments: [furball.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1710/)

## #26 — Eureka! — 2007-02-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8421>

Hi,
Thanks a lot for explaining. You didn't have to go to all that trouble. I'll try to mimic your plant.

Thanks a lot,
Greg

## #27 — Meshman — 2007-02-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8427>

[[QUOTE:  Eureka! said: Hi, Thanks a lot for explaining. You didn't have to go to all that trouble. I'll try to mimic your plant. Thanks a lot, Greg Click to expand... ]]

No trouble at all.  Have fun and be sure to post some pics :smile:

## #28 — Cymbal monkey — 2007-02-22
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8612>

ATch I cant make it work!

## #29 — tg_jp — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8633>

hello,

thanks you for trying. please check 'update' button after placing base object as Hair object's child.

regards.

tg_jp, Hiroto.

## #30 — Cymbal monkey — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8636>

When I click on the script to get it out, I get as many error mesages as a pc.

## #31 — frank beckmann — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8644>

Hi.
Did you ever tried a script in Cheetah3d before?

Frank

## #32 — Cymbal monkey — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8645>

I've use afew.

## #33 — frank beckmann — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8646>

Ok.
So, can we see a screenshot of what you get by using the script?

Frank

## #34 — Cymbal monkey — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8648>



## #35 — tg_jp — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8650>

Hello,

sorry, I think you use version 2.6.1 or 3.4, this script works for 3.5 above unfortunately.  

regards.

tg_jp, Hiroto.

## #36 — Cymbal monkey — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8651>

I'm using 3.4, I can upgrade to 3.6 for free right?

## #37 — Cymbal monkey — 2007-02-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8652>

its working now.

## #38 — sszyszka — 2007-02-28
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8748>

Total NOOB question: Which script folder does this go in?

## #39 — DaVinci — 2007-02-28
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8750>

[[QUOTE:  sszyszka said: Total NOOB question: Which script folder does this go in? Click to expand... ]]

It would be nice if you (the scripters) could add a comment to the beginning of your scripts for making clear where to put the files.:icon_thumbup:

## #40 — tg_jp — 2007-02-28
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8756>

Hello,

sorry, this is polygon script. please place it into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder, and relaunch Cheetah3D.app.

Tool -> tool script
Splineobj -> spline script
Polygonobj -> polygon script
Tag -> tag script
Macro -> macro script

regards.

tg_jp

--------

## #41 — sszyszka — 2007-03-01
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8774>

Thanks tg_jp, I had no idea it was a polygon script. I think including a quick readme in the zip files would help a low. All it would need is what you wrote above plus what kind of script the file is.

BTW, are you working on this anymore? Is random distribution a a feature that might be added? What about increasing the hair count independently of face and vertex count? Basically, I'm used to the particles in Blender and I'm curious if it will ever be similar in functionality.

Thanks!

## #42 — tg_jp — 2007-03-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8810>

hi,

thanks for suggestion. 

I am goin to add a doc and some options to script for next update. 

regards.

tg_jp, Hiroto.

## #43 — sszyszka — 2007-03-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-8815>

Thanks tg_jp! The doc will be appreciated by everyone, I'm sure.

And I'm glad to see you're continuing work on the script, it's really a great addition to already great software.

## #44 — Blake_shadows — 2007-07-27
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-13725>

hey i was just wondering if you could show me how to get hair like the one in the middle on page one 

cheers,

## #45 — tg_jp — 2007-07-29
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-13769>

hi, thank you for trying this script.

I made that sample with Transparency texture for Hair polygons. it was almost same texture as Red Monster's one.

if you use Transparency texture for clipping hair shape, you can create several hair line with one polygon plane.

regards.

tg_jp, Hiroto.

## #46 — Blake_shadows — 2007-07-29
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-13770>

Thanks for that it's a real help

## #47 — tg_jp — 2007-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17052>

Script updated.

hi,

I updated the script.

actually, old version had bugs... I fixed it.
but, it's still beta, slow, and optimization required. 

download -> http://www.tres-graficos.jp/blog/files/article.php?id=34

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
			
		
		
	

	
		
	

tg_jp, Hirto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=34

## #48 — frank beckmann — 2007-12-15
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17057>

Hi Hiroto.
Thank you for this outstanding script.

With kindest regards
Frank

Attachments: [Greenpinky.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/3628/)

## #49 — tg_jp — 2007-12-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17061>

> hi, Frank

wow, really amazing. 

I just updated the script again by adding some new parameters and optimizing a bit. please check it.

		
	

regards.

tg_jp, Hiroto.

## #50 — ROI — 2007-12-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17065>

Ho-Ho-Ho, Frank...

Attachments: [HoHoHo.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3634/)

## #51 — Martin — 2007-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17138>

Hi,
very very cool fur stuff. I almost can't believe that that is possible with Cheetah3D.:smile: 

Bye,
Martin

P.S. Frank, maybe you should update your Avatar image :wink:

## #52 — tg_jp — 2007-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17144>

hi, thank you for comments.

I updated the script by adding new option 'spline hair path', and optimizing for speed. please check it. 

actually, Todd's Loft.js script helped me a lot for adding 'spline path' code. Many thanks. 
if second child object is Spline, the script uses it for hair path ignoring 'hair length' parameter. sorry for lack of docs. 

download -> http://www.tres-graficos.jp/blog/files/article.php?id=34

		
	

		
	

regards.

tg_jp, Hiroto.

Attachments: [ch_20071219_hairSS.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3658/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=34

## #53 — tg_jp — 2007-12-20
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17189>

and another samples.

almost 12000 hairs.

		
	

each 4800 hairs with transparent texture with different 'implant angle' and 'curly' paramters. 

		
	

regards.

tg_jp, Hiroto.

## #54 — ROI — 2007-12-20
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17192>

Maybe Hairball600 should also consider updating his Avatar...

## #55 — Meshman — 2007-12-20
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17197>

That looks great Hiroto!  Thanks for writing all these scripts, they're brilliant.

## #56 — squareitround — 2007-12-20
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17199>

Awesome script Hiroto! :icon_thumbup::icon_thumbup::icon_thumbup:

## #57 — tg_jp — 2007-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17209>

hi, thank you for comments. please try.  

another sample. this has almost 125,500 hairs, 

		
	

tg_jp, Hiroto

## #58 — Martin — 2007-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17220>

Hi Hiroto,
that looks really cool. Looks a little bit like a Leopard mouse. Maybe if the spots would be a little bit rounder. :smile: 

Bye,
Martin

## #59 — robmkeith — 2008-01-06
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17444>

I've been trying to learn your hair script, but all of my results are very crude.  Could you make a hairy mouse tutorial.  Thank you for your skill.

Robert

## #60 — tg_jp — 2008-01-06
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17452>

thank you for trying.

I attach a sample file, please check it. After opening attached .jas file, turn 'On' 'modified child' option of Hair object. ( long calculation time is required, maybe 1 min or more you have to wait with rainbow cursor.  ) 

there are 2 types to create animal hair with this script.
the left one is a polygon with transparent material, you can create soft fur with low polygon count.
the right one is simply creating hair polygon, also you can choose 'base object' for 'uv type' option as each hair polygons take different color of material's texture. (like as upper mouse image)
please check how different setting with attached file.

regards.

tg_jp, Hiroto

Attachments: [Koala_sample_s.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3736/), [hair_sample_file.zip](https://www.cheetah3d.com/forum/index.php?attachments/3737/)

## #61 — robmkeith — 2008-01-06
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17455>

Thank you very much! I will take a look.

## #62 — tg_jp — 2008-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17463>

thank you for comment. 

here is colored version. I used blue-red gradient image for hair material, set uv to base object, and changed hair setting (thinner) and iteration (4) of base object's subdiv for the RIGHT one.

have fun.

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

## #63 — robmkeith — 2008-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17464>

Hiroto,

I am understanding more, thank you for your help.  How do I get hair on the back of the koala's head?

## #64 — tg_jp — 2008-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17467>

Hi,

sorry for lack of docs.  just turn 'Off' to 'only polygon selection' option of Hair object. With this option, you can set at which polygon of base object a hair polygon will be made by selecting base object's polygon with 'polygon selection' number of Hair object. I used this for avoiding hair creation at back side of base object (this area is not shown from camera) to save calculation and rendering time.

about all other options ( implant angle, curly...etc) , please check how difference it make with simple base object (like a Plane 3 x 3 sections with Subdiv modifier).

I attached another sample ( with spline hair control ). please check it.

regards.

tg_jp, Hiroto

Attachments: [another_hair_sample.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/3742/)

## #65 — robmkeith — 2008-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17471>

Hiroto,

When I can get results like this in a 36 second render, you must be doing something very good.

Attachments: [fuzzy koala.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3743/)

## #66 — Zack — 2008-01-12
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17641>

Hum, I downloaded the file of Koala and, I dont have the curly fur like in the screen...

## #67 — tg_jp — 2008-01-12
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-17643>

hi, thank you for trying.

please check 'modified child' option of Hair Object. 

if  this option is 'On' (checked), Hair object will implant a hair polygon at each face of modified first child object (base object). if base object has Subdiv modifier, much more hair polygons are made at  each divided faces of base object. so, I recommend you make this option 'On' just before rendering, because more polygon count causes more slowness while scene editing.

actually, I didn't implement 'hair count' option. I had to do some 'face divided calculation' for it. I tried. but, Subdiv modifier can do it faster and smarter than my script. so, I gave up.   if you want more hair count, please use Subdiv modifier for base object.

regards.

tg_jp, Hiroto

## #68 — brecht — 2008-04-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-20074>

Hello! 

I think I need some help with this script: It doesn't seem to show up in the scripts menu... (it's in the right location and I've restarted cheetah).
Are there any additional steps to undertake? I'm currently running the latest version of cheetah (4.5.1)

rgds. Brecht.

---UPDATE--- 
It works after now. Two things I did were: add another script in the library, and restart Cheetah again.

## #69 — tg_jp — 2008-05-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-21807>

how to fix an error on 4.6

hello, all

when 'uv type' is 'base object', an error occurs. 

if you use 'base object' uv type, please edit script file manually like below...

	
	


```
// find this line (near line.370)
    var uv = guideCore.uvCoord(i,j);
// add to
    var uv = guideCore.uvCoord(i,j);
    uv = new Vec2D(uv.u, uv.v); // <- add this line

// find this line (near line.398)
    var uv = guideCore.uvCoord(i,0);
// add to
    var uv = guideCore.uvCoord(i,0);
    uv = new Vec2D(uv.u, uv.v); // <- add this line

// and find this and replace it  (near line.403)
    uv = uv.add(guideCore.uvCoord(i,j)); // <- delete this
// replace to
    var add_uv = guideCore.uvCoord(i,j);
    uv = uv.add(new Vec2D(add_uv.u, add_uv.v));
```


regards.

tg_jp, Hiroto

## #70 — mr. mumbo jumbo — 2008-10-09
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-25249>

First of all, this is my first post in any forum and I think that Cheetah 3D is great. Compared to other modeling applications, it is amazingly simple and easy to use.

I'm having a problem with this script. It works fine if the implant type is points, but I get an error message if it is faces or points and faces.

If there is something I can do to fix this, please help me.

Attachments: [Picture 2.png](https://www.cheetah3d.com/forum/index.php?attachments/5763/), [Picture 1.png](https://www.cheetah3d.com/forum/index.php?attachments/5764/)

## #71 — tg_jp — 2008-10-09
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-25251>

hi,

please download the latest version. I have fixed that UV setting error at this version.  .

http://www.tres-graficos.jp/blog/files/article.php?id=44

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=44

## #72 — mr. mumbo jumbo — 2008-10-09
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-25252>

ohhh...
Should have thought of that. 
Thanks!

## #73 — Innerdreamrecords — 2008-10-22
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-25540>

[[QUOTE:  peer said: Here's my first test with grass. I must work on a better texture, but the start is here. I really like your plugin Hiroto, thanks!! Regards, Peter Click to expand... ]]

That's looking good Peer! How did you get so much grass? I made a small patch but I don't know how to get a whole lawn?

## #74 — kesl — 2008-12-01
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26112>

[[QUOTE:  tg_jp said: hi, please download the latest version. I have fixed that UV setting error at this version. . http://www.tres-graficos.jp/blog/files/article.php?id=34 regards. tg_jp, Hiroto. Click to exp]]

HI :smile: 

New user and im trying to figure out how to make realistiv lookin' hair and grass.. 

I have tried using your Hair.script to produce a logo with grass on it, and would also like to be able to implement hair on it, however, i cant seem to figure out the diff values...

I've tried to copy some of the values from meshmann's post, but it seem's that it was with a older version of the script.

if u dont mind, could you poste your values for one of your hairy monster?!  

ty in advance

lsek/

## #75 — peer — 2008-12-01
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26117>

[[QUOTE:  Innerdreamrecords said: That's looking good Peer! How did you get so much grass? I made a small patch but I don't know how to get a whole lawn? Click to expand... ]]

Hi, I made a small patch, made it editable and used the array modifiers to create more grass. Quite simple actually. I don't know the settings anymore, sorry. I'll try to find the project in our archive here at the office.

Regards,

Peter

## #76 — tg_jp — 2008-12-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26131>

> kesl

hi,
please check a sample file from this link. left one uses transparent material for fur, it's almost same as the Red Monster.

http://www.cheetah3d.de/forum/showpost.php?p=17452&postcount=60

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.de/forum/showpost.php?p=17452&postcount=60

## #77 — kesl — 2008-12-02
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26144>

@ peer - tg_jp

TY for responses, although i managed to figure it out(good thing being stubborn) :tongue:

## #78 — mrbubonic — 2009-01-06
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26504>

Where do I even begin with this? When I bring the script out, I just the get the transform tool in the middle? What do I have to do to apply hair the the head of one of my characters?

## #79 — tg_jp — 2009-01-06
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26509>

hi,

please check attache sample file at some posts in this thread, and this demo movie.

http://es.youtube.com/watch?v=Szz7Dd_ypVw

added: HD version.
http://es.youtube.com/watch?v=gcr5HcpEBbI&fmt=22

regards.

tg_jp, Hiroto.

Links: http://es.youtube.com/watch?v=Szz7Dd_ypVw, http://es.youtube.com/watch?v=gcr5HcpEBbI&fmt=22

## #80 — mrbubonic — 2009-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26517>

[[QUOTE:  tg_jp said: hi, please check attache sample file at some posts in this thread, and this demo movie. http://es.youtube.com/watch?v=Szz7Dd_ypVw regards. tg_jp, Hiroto. Click to expand... ]]

okay i think i get it
i still get a massive amounts of errors.
after downloading the current version even.

## #81 — tg_jp — 2009-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26519>

hi,

please check your Cheetah3D.app (4.3+) version, and script folder that you place it ( ~/Library/Application Support/Cheetah3D/scripts/Polygonobj ).

could you drop me error messages?

regards.

tg_jp, Hiroto.

I added HD version of captured movie. 
http://es.youtube.com/watch?v=gcr5HcpEBbI&fmt=22

Links: http://es.youtube.com/watch?v=gcr5HcpEBbI&fmt=22

## #82 — mrbubonic — 2009-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26520>

im running version 4.6
its in the right folder

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
			
		
		
	

	
		
	

I really wish I could get this to work

## #83 — tg_jp — 2009-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26521>

hi,

as that error message, your script file seems not be the latest one. :?:

actually, I updated it last night ( tiny bug fixed ). please get the latest one from link below, and try it again.

http://www.tres-graficos.jp/blog/files/article.php?id=44

regards.

tg_jp

Links: http://www.tres-graficos.jp/blog/files/article.php?id=44

## #84 — mrbubonic — 2009-01-07
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-26523>

thats wierd because I downloaded it last night. haha i downloaded it again and am going to give it another try.

YAY it worked. thank you.

## #85 — DarthSidious05 — 2009-10-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-33193>

The Hair script is great, thanks! Got it to work and getting some nice effects.

Any chance a cartoon ink outline script will appear in the future? (black outlines around the surfaces).

## #86 — SurfingAlien — 2009-10-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-33197>

[[QUOTE:  DarthSidious05 said: The Hair script is great, thanks! Got it to work and getting some nice effects. Any chance a cartoon ink outline script will appear in the future? (black outlines around the surf]]

not exactly what you asked for but maybe this can help...

have fun
A.

Links: http://www.cheetah3d.de/forum/showthread.php?t=1825

## #87 — DarthSidious05 — 2009-10-06
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-33275>

[[QUOTE:  SurfingAlien said: not exactly what you asked for but maybe this can help... have fun A. Click to expand... ]]

Thanks, yes, that was helpful regarding the ink outlines. When I try the new toon shaders in 5.0, I will see if the ink outlines are necessary visually. I've used the ink edges in Blender and it looks nice, but trying to work in Blender 2.49 for the sake of ink outlines is a serious challenge compared to the ease of Cheetah.

## #88 — tg_jp — 2010-01-24
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-38024>

hello

I have just updated Hair.js script for 5.2 User. old one won't work, so please replace it for Cheetah3D 5.2.

http://www.tres-graficos.jp/blog/files/article.php?id=52

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=52

## #89 — archie — 2010-01-24
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-38029>

great news !

thanks hiroto !

maybe once i have migrated to the i7 i can render grass !

:icon_thumbup:

## #90 — SurfingAlien — 2010-01-24
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-38033>

[[QUOTE:  tg_jp said: hello I have just updated Hair.js script for 5.2 User. old one won't work, so please replace it for Cheetah3D 5.2. http://www.tres-graficos.jp/blog/files/article.php?id=52 regards. tg_jp,]]

Cheers Hiroto,

very good news, this is my fav script. BTW not only you're a script wizard but now you can also read in user minds: I've been playing with hair.js all day long... (test render attached). I did't see any issue in 5.2 though, it's working quite fine excepts for material textures (I only got good results with solid colors materials).
Is there any default UVmapping set for the hair objects?

thank you so much for doing all this work for us
Alessandro

Attachments: [FluffyC.jpg](https://www.cheetah3d.com/forum/index.php?attachments/9419/)

## #91 — tg_jp — 2010-01-25
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-38036>

hi

thanks you for comments.  

[[QUOTE:  very good news, this is my fav script. BTW not only you're a script wizard but now you can also read in user minds: I've been playing with hair.js all day long... (test render attached). I did't see ]]

Hair.js's object has base object UV1 data as its UV1 and self UV data as UV2.

regards.

tg_jp, Hiroto.

Attachments: [rainbow fur.c3dmat.zip](https://www.cheetah3d.com/forum/index.php?attachments/9420/), [ch_20100125_rainbowPig.jpg](https://www.cheetah3d.com/forum/index.php?attachments/9421/)

## #92 — tg_jp — 2010-09-23
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-47733>

Another Sample

here is another sample.

		
	

regards.

tg_jp, Hiroto.

Attachments: [hair_2types.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/12009/)

## #93 — novolume — 2010-11-09
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-50834>

Have tried this script a few times with little success but finally starting to make some progress. It doesn't exactly look real but with a bit of tweaking I think I could get there.

EDIT: I got a bit better, awesome script!

Attachments: [daves-salon.jpg](https://www.cheetah3d.com/forum/index.php?attachments/12691/)

## #94 — tg_jp — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51403>

cHair.js

hello all

I added cHair.js, alter version of Hair.js. it has 'hair count' paramter. so you can control hair count in this version. please try it.

http://www.tres-graficos.jp/blog/files/article.php?id=63

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=63

## #95 — frank beckmann — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51414>

[[QUOTE:  tg_jp said: hello all I added cHair.js, alter version of Hair.js. it has 'hair count' paramter. so you can control hair count in this version. please try it. http://www.tres-graficos.jp/blog/files/ar]]

Brilliant! Great addition.
Thank you very much.

Cheers
Frank

## #96 — novolume — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51415>

Hi Hiroto, are you planning on keeping both scripts or just using the new one? I'm planning on recording a tutorial on the hair script shortly and want to use the correct script

Thanks!

## #97 — tg_jp — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51428>

hi, thank you for comments.

[[QUOTE:  Hi Hiroto, are you planning on keeping both scripts or just using the new one? I'm planning on recording a tutorial on the hair script shortly and want to use the correct script Click to expand... ]]

actually, both are using same engine. but some parameters were added and deleted. so, I splitted new script from old one for my old scene file with Hair.js. I will maintain both scripts for any enhancement of hair quality and creation speed-up. so, please use whichever you like. but I recommend new one, because I will use new one from now perhaps. 

regards.

tg_jp, Hiroto.

## #98 — SurfingAlien — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51430>

Thank you Hiroto!

I have a question I wanted to ask for a long time... in fact, there are chances I already asked or somebody already talked about it, if so I apologize but obviously I either haven't noticed or understood :redface: 

how do you make multicolor fur/hairs, like your "leopard mouse" in cheetah's home page for example? I presume it's controlled by the base mesh material but I'm not able to reproduce it... if you could make a "for dummy" tut I'd be forever grateful :smile: 

thanks in advance,
Alessandro

## #99 — tg_jp — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51431>

hi,

unfortunately, I couldn't explain in my poor english,  

Hair.js and cHair.js makes hair polygon with uv1 assigned coordinate of created point of polygon's uv1 of base mesh, and uv2 assigned hair polygon self.

for example, if you want a fur-like-hair colored by base mesh, diffuse color use uv1 for base mesh color, but hair-transparent map use uv2 for express very light fur. 

I have already upload mat file. please check it.

http://www.cheetah3d.com/forum/showpost.php?p=38036&postcount=91

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.com/forum/showpost.php?p=38036&postcount=91

## #100 — SurfingAlien — 2010-11-16
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51485>

got it (at last...)
thanks again my friend

cheers,
Alessandro

## #101 — uncle808us — 2010-11-17
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-51540>

Thank you for the new script must try it out.:icon_thumbup:

## #102 — Jeanny — 2012-04-11
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-69236>

I have trouble Morphing polygon with cHair script

:icon_thumbup:    This script is great!  There is so much one can do to make various hair and fur styles.    I  am new to Cheetah and 3D animation and I can't figure out how to morph an eye lid that I have applied the hair script to.  The hair will not stay with the polygon that I have assigned it to.   The polygon object eyelid raises and lowers but the hair remains stationary.  What do I need to do so that the hair rises with the polygon lid?  I've attached two files to show how it looks so as to hopefully explain more what I'm trying to explain.
Thanks
Jeanny

## #103 — tg_jp — 2012-09-13
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-73150>

hi, thank you for your comment.

now I am re-writing this script for easy to use and some controls for animating it.  please wait for update in next week ( I hope   ). 

regards.

tg_jp, Hiroto

## #104 — Jeanny — 2012-09-13
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-73151>

:-D  Oh Boy Oh Boy!  Thank you so much for offering to rewrite the script with some controls for animating it.   I am excitedly waiting for your masterpiece.
All my best
Jeanny

## #105 — Jeanny — 2013-04-21
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-78372>

:smile: Hi tg-jp

Were you able to redo the hair script with animation controls?  I was just wondering if I missed it.  

My Best Regards
Jeanny

## #106 — tg_jp — 2013-04-22
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-78382>

hi, thank you for asking..

unfortunately, not yet finished. I am considering it will be useful for your cone head model.   I will post after writing and testing it.

regards.

tg_jp, Hiroto

## #107 — Jeanny — 2013-04-22
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-78384>

:-D Hi Hiroto

I am very excited to get your reply.  I have much respect for you.
I do get confused and wasn’t sure if maybe you posted your script under a different post that I somehow overlooked.  I am like a child anxiously waiting for Christmas to come.  Unlike a child I am not trying to rush you.  Please know that I realize it takes a lot of time to develop some scripts and I am so very grateful that you share these wonderful aids with us. 

Many Blessings to You
Jeanny

## #108 — teamdallas — 2013-09-08
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-81669>

Hi Hiroto, I am trying to get this script to work but I get line error 242.  I am using a Mac version 6.2.1 and so I am wondering if there is a compatibility issue.

## #109 — teamdallas — 2013-09-08
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-81670>

scratch that....I got the chair.js script to work...yaaay!

## #110 — Giant — 2013-12-26
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-83800>

Hi Hiroto,

I have a couple of questions:

1. The implant x angle sets my hair going up.( as if upside down ) I can curve the hair down but then i get the back of the polygon. What am i doing wrong here?

2. I've played around with the 'only polygon selection' feature but i can't work out how it works. What are the steps to use this feature?

Do i select the polygons first > then the selection number? 
Do I do this with the box ticked?
Can you change the length independently with each polygon selection?

I've tried it different ways but i can't seem to control it properly.

Thank you in advance.

ps  I'm using the cHair.js script.

## #111 — Shift Studio — 2014-12-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-92099>

implant position

Hi Hiroto and all,

Is there away to have the hair implanted at a random place within the polygon (like the way a particle mesh works with the particle tag)

Is there a way to get more than 1 hair in a polygon?

I've played with the 'implant type' property, but that seems to just place more than one hair coming from the centre of the polygon.

see my screenshot. I want the hairs to not be positioned uniformly.
I also want more hairs, but ideally I don't want to subdivide.

Thanks in advance!
--Shift Studio.

Attachments: [hair-question.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25312/)

## #112 — frank beckmann — 2014-12-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-92101>

You can have MoHair at once as a particle over the "Surface" and add variations by the particle-tag:

Cheers
Frank

Attachments: [MoHair.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25313/)

## #113 — Shift Studio — 2014-12-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-92102>

[[QUOTE:  frank beckmann said: You can have MoHair at once as a particle over the "Surface" and add variations by the particle-tag: Cheers Frank Click to expand... ]]

Hi Frank.

That is what I've moved on to - main downside is not being able to vary some of the parameters that the hair script has.

I will continue on with a particle mesh, but still Hiroto, if you ever feel like adding another feature to the script, it would be welcome by me 

Thanks, 
--Shift Studio.

## #114 — tg_jp — 2014-12-03
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-92105>

Hi,

thank you for trying my script.

please check the latest one, cHair.js

http://www.tres-graficos.jp/blog/files/article.php?id=63

some options still are missing, but you can make more hair per a polygon without subdiv.

Best

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=63

## #115 — Shift Studio — 2014-12-04
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-92106>

[[QUOTE:  tg_jp said: Hi, thank you for trying my script. please check the latest one, cHair.js http://www.tres-graficos.jp/blog/files/article.php?id=63 some options still are missing, but you can make more ha]]

Thanks Hiroto! I was using the Hair.js script, not cHair.js script

This is working for me. I may still have some more questions though:wink: 

--shift studio.

## #116 — Shift Studio — 2014-12-05
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-92149>

Hair Polygons coloured by base object

Hi Hiroto,

I've read the thread, and see a few examples where the hair polygons are coloured using the base mesh's colour.

I tried to understand how to do it, but ????? :redface: 
I also notice the Property 'uv type: (base object)' doesn't seem to be available in Hair.js or in cHair.js
Did I miss it?

Is it possible to explain again (or video - larger than the 'Hair.js playing demo movie')?

Thanks for the great scripts!
--Shift Studio.

Edit: in post 79 there is a link to an HD version of the demo :redface: but still I don't see the 'uv type' property.

Edit 2: I see on your blog site, that UV type is set automatically for hair.js ... still I can't figure it out.

## #117 — zounds — 2015-03-27
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94369>

cHair.js won't show up on Yosemite

Hello everybody, I wonder if anyone has more problems with cHair.js script in Yosemite is that the script does not appear in the Scripts menu. is located in the scripts / Polygonobj .thanks in advance, Zounds

## #118 — frank beckmann — 2015-03-27
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94370>

Hi and Welcome!
cHair.js is still where it belongs. I think you might check the path again.

Cheers
Frank

Attachments: [cHair.png](https://www.cheetah3d.com/forum/index.php?attachments/26287/)

## #119 — zounds — 2015-03-28
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94384>

[[QUOTE:  frank beckmann said: Hi and Welcome! cHair.js is still where it belongs. I think you might check the path again. Cheers Frank Click to expand... ]]

Hi Frank, found this and help me http://www.cheetah3d.com/forum/showthread.php?t=7922

hidden library folder 

thank you

Links: http://www.cheetah3d.com/forum/showthread.php?t=7922

## #120 — frank beckmann — 2015-03-28
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94385>

Yeah - go Home-folder and make it visible with cmd+J: Show Library

Cheers
Frank

## #121 — Shift Studio — 2015-04-10
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94531>

cHair results different after save>close>open

I recently noticed if you create hair with cHair.js script, then close and save the file, then re-open, the results are different each time.

Maybe including a Random Seed number in the script could solve this?

Thanks, Shift Studio.

## #122 — tg_jp — 2015-04-10
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94537>

Hi

I updated cHair.js script, adding random seed parameter. you can save random values now.

http://www.tres-graficos.jp/blog/files/article.php?id=63

Best

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=63

## #123 — Shift Studio — 2015-04-12
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-94551>

Thanks Hiroto!

## #124 — classic12 — 2022-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-124589>

Is there a way to reduce the effect on an area ?

IE on a face have no hair around the eyes. Less hair on hands etc.
Cheers

## #125 — frank beckmann — 2022-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1294/post-124590>

There´s a setting called: "only polygon selection" for that purpose. I used that for the Monideer model: https://www.cheetah3d.com

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

Links: https://www.cheetah3d.com/
