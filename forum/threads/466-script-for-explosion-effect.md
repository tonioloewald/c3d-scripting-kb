# script for Explosion effect

- Thread: https://www.cheetah3d.com/forum/index.php?threads/466/
- Subforum: script-downloads
- Started by **tg_jp** on 2006-02-08; last post 2019-11-09; 35 posts

## #1 — tg_jp — 2006-02-08
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3108>

script for Explosion effect

Explosion effect script, required version 2.6.1

you can explode each polygon of polygon object, and animate it.

download:
http://www.tres-graficos.jp/blog/files/article.php?id=6

download link for updated version (uv error fixed on v.4.6.1):(2008-08-01)
http://www.tres-graficos.jp/blog/files/article.php?id=31

sample movie (H.264 855kb):
http://www.tres-graficos.jp/blog/resources/ch_20060202_expTorus.mov 

another sample (H.264 916kb);
http://www.tres-graficos.jp/blog/resources/ch_20060201_expl_s.mov

tg_jp

Links: http://www.tres-graficos.jp/blog/files/article.php?id=31, http://www.tres-graficos.jp/blog/files/article.php?id=6, http://www.tres-graficos.jp/blog/resources/ch_20060201_expl_s.mov, http://www.tres-graficos.jp/blog/resources/ch_20060202_expTorus.mov

## #2 — tg_jp — 2006-03-23
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3552>

Another sample movie.

I post another sample.

Another movie sample(H.264 512kb)

tg_jp

Attachments: [ch_20060323_explosion3.jpg](https://www.cheetah3d.com/forum/index.php?attachments/620/)

Links: http://www.tres-graficos.jp/blog/resources/ch_20060323_ces2.mov

## #3 — Francois — 2006-03-23
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3559>

[[QUOTE:  tg_jp said: I post another sample. Another movie sample(H.264 512kb) tg_jp Click to expand... ]]

tg_jp,
Your scripts and your movies are just Superbe !
Tornadoes and fireworks shouln't be too difficult now.
Thanks a lot for sharing all this.

François

## #4 — toddarbini — 2006-03-24
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3565>

Awesome!

I really like that effect. In fact, that is what I wanted to do to the logo I am working on:
http://cheetah3d.de/forum/showthread.php?t=539

Could you tell me how in the world you acheived that effect? If possible post the settings used with your script. Great work! 

Thanks, Todd

Links: http://cheetah3d.de/forum/showthread.php?t=539

## #5 — tg_jp — 2006-03-24
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3566>

thanks for comments.

> hi, Todd.
Cheetah3D has very powerful script future. you can make your own scene like Tornadoes or Fireowork ( as François wrote  ) with script, you can control each polygon by script as you want.

here is a jas file (without HDRI image) for logo explosion scene. you can change text spline or other value. please try it. 

it needs Explosion.js script file in ~/Library/Application Support/Cheetah3D/scripts/Polygonobj/ for 3.1 user, or /Application/Cheetah3D/scripts/Polygonobj for 2.6.1 user.

tg_jp

Attachments: [charExplosion.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/625/)

## #6 — toddarbini — 2006-03-24
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3567>

Thanks tg_jp

I appreciate your help. I wil try and acheive the reverse explosion as in your example. Thanks again.

Todd

## #7 — Martin — 2006-03-26
<https://www.cheetah3d.com/forum/index.php?threads/466/post-3591>

tg_jp,
that is a excellent animation. It looks fantastic.   

By,
Martin

## #8 — vegeto9092 — 2006-05-31
<https://www.cheetah3d.com/forum/index.php?threads/466/post-4451>

i dont know if im doing something wrong but i did a try out of this, its 3 seconds long with small camera movement and so for its been rendering for 14 hours!!! on the camera its at 1x and ox for the second so just why it it taking so long?

## #9 — peer — 2006-05-31
<https://www.cheetah3d.com/forum/index.php?threads/466/post-4452>

Could you give some more information? What kind of materials, how many lights, what kind of light, rendering resolution, radiosity settings etc.?
We'll be able to help you out!!

Regards,

Peter

## #10 — tg_jp — 2006-05-31
<https://www.cheetah3d.com/forum/index.php?threads/466/post-4453>

Hi, vegeto9092

thanks for trying to use this script.

How many polygon is there in your scene? Many polygons of object that you exploded, needs more rendering time, for calculation of each polygon's position and rotation.

please try to reduce polygon count of exploded object ( actually depends on machine speeds ). for example, the exploded 'Cheetah3D' has 1813 polygons.

or, How long only single frame of your scene? 9 minutes?

regards.

tg_jp

## #11 — vegeto9092 — 2006-06-01
<https://www.cheetah3d.com/forum/index.php?threads/466/post-4456>

here is the file im working on please take a look and see why its taking so long its still rendering so far its took about 2 or 3 hours to render ONE frame

Attachments: [happy pro explosion.zip](https://www.cheetah3d.com/forum/index.php?attachments/826/)

## #12 — tg_jp — 2006-06-01
<https://www.cheetah3d.com/forum/index.php?threads/466/post-4466>

Hi,

I checked your file.
your scene file has 34,591 polygons with reflective material, HDRI and radiosity ( ambient occlusion ) tag. you can check polygon count with select menu Tools -> Object Info / Scene Info or click 'i' icon at Toolbar.

if you need rush movie for just checking, please try these step to reduce rendering time.

to reduce polygon count. ( to reduce calculation time of script. )
* changing approximaiton angle of Text spline object. ( more than 10.0. )
* changing sections of Extrude object. ( less than 5. )

to reduce rendering time.
* turn off some tags (HDRI, Radiosity. )
* turn off reflection at menu Render -> Render Prefereces.
* reduce rendering size. ( 640 * 480 -> 320 * 240. )
* reduce frame rate ( less than 30. )

after your checking rush movie, you change some values back for getting good quality. 
movie rendering needs more time than still rendering. 

regards.

tg_jp

## #13 — hairball600 — 2007-09-27
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15250>

Could you make the explosion more randomized? Don't know if it's possible,but just wondering.

All the best,

Lincoln Green

## #14 — tg_jp — 2007-09-27
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15268>

hi,

what part do you want to make more randomized? movements or rotations?

if you want random division, it will be difficult for script. but you can make it with some tools (scalpel or something) manually before exploding it.

sample:

http://www.treemo.com/users/tg_jp/channel/item/166267

regards.

tg_jp, Hiroto

Links: http://www.treemo.com/users/tg_jp/channel/item/166267

## #15 — hairball600 — 2007-09-27
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15271>

When you explode a ball, for instance, all the peices move outward the same distance and the same rotation, which is pretty annoying. I did find somewhat of a workaround by triangulating it, but a randomizer would be nice. Hope this makes sense.

## #16 — tg_jp — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15285>

hi,

I will add random movements for each polygons for next update. but I think, this has random rotations already. doesn't it work? please try to use rotation min:360 - rotation max: 1440.

and, about random division is cost a lot for speed and difficult to implement for me. 

regards.

tg_jp, Hiroto.

## #17 — hairball600 — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15288>

Oh, never tried the Min/Max properties. Thanks a lot for the script.

## #18 — tg_jp — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15312>

hi,

I updated this. please check it.

download:http://www.tres-graficos.jp/blog/files/article.php?id=31

sample movie:http://www.treemo.com/users/tg_jp/channel/item/166266

regards.

tg_jp, Hiroto.

Links: http://www.treemo.com/users/tg_jp/channel/item/166266, http://www.tres-graficos.jp/blog/files/article.php?id=31

## #19 — hairball600 — 2007-09-28
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15315>

Ah, Thank you very much.

A VERY BIG THANK YOU,

Lincoln Green

## #20 — Gray Scale — 2007-10-23
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15988>

I can get the 'explosion' to work properly, but for some reason the original object stays in place.  The attached image should explain all.  I have also attached a zip of the jas file.

Any ideas where I am going wrong?

Attachments: [explode.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3351/), [explode.zip](https://www.cheetah3d.com/forum/index.php?attachments/3352/)

## #21 — tg_jp — 2007-10-23
<https://www.cheetah3d.com/forum/index.php?threads/466/post-15990>

Hi

this script doesn't change original mesh since it doesn't work like a Creator object. so you have to manually turn off manually 'visible in editor' and 'visible in renderer' of mode tag.

regards.

tg_jp, Hiroto.

## #22 — prana — 2008-05-14
<https://www.cheetah3d.com/forum/index.php?threads/466/post-21757>

Hello all,
This looks like it could be a great script but i am running into a problem on the latest version of cheetah 4.6.
I add the explosion set up the params hit update. add my polygon, a sphere in this case. I then get a javascript error

Line: 149
Wrong elemet in uv array

Then nothing happens. It could be with the new update not sure.

Thanks

## #23 — tg_jp — 2008-05-15
<https://www.cheetah3d.com/forum/index.php?threads/466/post-21781>

hi, thanks for trying this script.

in 4.6, polycore.uvCoord() returns a value as Vec4D object, but polycore.addIndexPolygon() accept only Vec2D value (in older version, uvCoord() used to return). so that error occurs with 4.6.

please edit the script file manually, 

	
	


```
//delete this Line 149.
     core.addIndexPolygon(basePolySize, IndexPolygon, UVs);

//and add these lines after deleted line.
     var uv_list = new Array;
     var uv_len = UVs.length;
     for (var i_uv = 0;i_uv < uv_len;i_uv++) {
         uv_list[i_uv] = new Vec2D(UVs[i_uv].u, UVs[i_uv].v);
     }
     core.addIndexPolygon(basePolySize, IndexPolygon, uv_list);
```


regards.

tg_jp, Hiroto

## #24 — prana — 2008-05-15
<https://www.cheetah3d.com/forum/index.php?threads/466/post-21805>

Excellent that works great, very nice script.
It also looks like the hair script has a problem on line 242 same uv problem

## #25 — tg_jp — 2008-05-16
<https://www.cheetah3d.com/forum/index.php?threads/466/post-21806>

Ah, it is same problem. thanks for letting know it. 

I will post at Hair.js thread about it. actually, some of my polygon scripts have same problem. 

btw, hair.js that you use may be older version ( I guess that error line number, or you customize it? ),  please check newer one. 

regards.

tg_jp, Hiroto.

## #26 — Switch — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/466/post-24055>

I seem to be having somewhat of the same problem Gray Scale had with having the orginal text not explode.  But mine is more of a texture issue,  I put some texture on each letter and when I hide it, it is just gray.  Little help here figuring this one out.  Here is a screen grab

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

## #27 — tg_jp — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/466/post-24057>

hi, thank you for checking this script.

I updated the script for keeping polygon selection of base object (exploded object). please download newer version.

http://www.tres-graficos.jp/blog/files/article.php?id=31

and I saw your screen shot, I think, you have to assign those materials to Explosion object with same polysel number as base object, and hide base object with turn off visible settings at mode tag. please check attached sample file.

regards.

tg_jp, Hiroto.

Attachments: [explosion_test.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/5381/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=31

## #28 — Switch — 2008-08-12
<https://www.cheetah3d.com/forum/index.php?threads/466/post-24058>

Thanks for the update your scripts are very handy and very good.

 I almost get it, can you select the polygons of the explosion object and assign them that way. or is it something else thanks for the example, I'm so close.

## #29 — Krassimir — 2012-03-08
<https://www.cheetah3d.com/forum/index.php?threads/466/post-68379>

A Beginner's Question

Hi, I am a beginner with Cheetah and I just discovered the explosion script. It looks fantastic, but I can't manage to explode even a simple box object. Should I use the key recording or is there a different way to make a scripted animation? Any help will be highly appreciated!

Best Regards,

Krassimir

## #30 — frank beckmann — 2012-03-08
<https://www.cheetah3d.com/forum/index.php?threads/466/post-68380>

Activate "P" at the the timeline for "key all Parameters" and make a double click at frame N°0, scroll to another "point" in the timeline and make adjustments in the scripts properties - click update - when satisfied - record another keyframe. Hit play.

Cheers
Frank

## #31 — Britt007 — 2012-10-12
<https://www.cheetah3d.com/forum/index.php?threads/466/post-73973>

Hi,

I was looking for ways to explode objects and export them with the exploding animation, I've just used Explode.js for the first time to destroy a sentry gun and it works great, but when I export it, the Take of the explosion don't play, I've tried baking the simulation through the Dynamics property panel but it still don't play when exported, is there something I'm missing or can it not be exported?

Thanks.

## #32 — tg_jp — 2012-10-12
<https://www.cheetah3d.com/forum/index.php?threads/466/post-74000>

hi

I am not sure which format and apps you want to use, polygon script's animation is not exported for other file format ( fbx, collada, etc. )

[EDIT]
or MDD Exporter.js is workable for animation of polygon script's object. if your project can import MDD file format, please try it.

regards.

tg_jp, Hiroto.

## #33 — crgreen — 2019-10-18
<https://www.cheetah3d.com/forum/index.php?threads/466/post-118113>

Hi Hiroto.
Do you have something like this but actually splits an object into all of its polygons? In other words, I have an object made up of 320 polygons, and I'd like to recreate it as 320 separate objects of 1 poly each. I don't need to animate it in Cheetah (so I realize it's very different in that regard).
Thanks for considering
-Chris G

[[QUOTE:  tg_jp said: script for Explosion effect tg_jp Click to expand... ]]

## #34 — crgreen — 2019-11-08
<https://www.cheetah3d.com/forum/index.php?threads/466/post-118331>

[[QUOTE:  crgreen said: Hi Hiroto. Do you have something like this but actually splits an object into all of its polygons? In other words, I have an object made up of 320 polygons, and I'd like to recreate it ]]

I sure would love something like this. It would take me 10 times as long to hack your script then it would take for you could put it together, probably.

## #35 — crgreen — 2019-11-09
<https://www.cheetah3d.com/forum/index.php?threads/466/post-118334>

[[QUOTE:  crgreen said: I sure would love something like this. It would take me 10 times as long to hack your script then it would take for you could put it together, probably. Click to expand... ]]

A fine workaround for this (in case anyone wants to separate out [split] all polygons in an object) is to save as STL from Cheetah, import the STL into Blender (v2.8 - method/terminology is different from previous versions), select the object in Edit Mode, Select Mesh in the upper left, do Mesh>Separate>By Loose Parts and export that as OBJ, FBX or DAE (not STL) and bring that into C3D. It's nice to have Blender to fall back on in a pinch.

[Addendum]

It turns out that if you do what I suggest, but you want each newly separated poly to have its pivot point at its own local center, you can select everything in Blender, go into Object mode and do Object>Set Origin>Center of Mass (Surface), and then you must export as DAE. When you bring that into Cheetah, the pivot points are respected. Pretty cool! (in lieu of a nice automated C3D solution)
