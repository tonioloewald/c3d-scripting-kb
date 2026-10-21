# MDD Exporter.js / MDD Baker.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6367/
- Subforum: script-downloads
- Started by **tg_jp** on 2010-10-16; last post 2014-01-21; 41 posts

## #1 — tg_jp — 2010-10-16
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48901>

MDD Exporter.js / MDD Baker.js

hello

it's scripts for using MDD file with Cheetah3D 5.5.

[download] -> http://www.tres-graficos.jp/blog/files/article.php?id=60

update_20101017: bug fixed. zup/yup option added. 
update_20101018: flip normal bug fixed.
update_20120828: crash bug fixed.

actually I couldn't test so much, anyone send me sample mdd files? 
anyway, please let me know if you have any problem to use it.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=60

## #2 — BazC — 2010-10-16
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48905>

Amazing, thanks so much for this! I only have the CHeetah3d demo so I can't export but everything else seems to be working perfectly!

## #3 — fused — 2010-10-16
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48907>

[[QUOTE:  BazC said: Amazing, thanks so much for this! I only have the CHeetah3d demo so I can't export but everything else seems to be working perfectly! Click to expand... ]]

If you need to test with a licensed copy of C3D 5.5, post a file and I'll give it a try.

## #4 — BazC — 2010-10-16
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48914>

Thanks for the offer!

## #5 — nervouschimp — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48945>

Nice work, Hiroto, thanks.

The animation is working correctly in modo, but the point order is not right.

The animation appears to be rotated -90 on the zed, and -90 on the Y, while, of course the mesh in modo is not. This results in an unrecognizable spikey blob doing a sideways walk cycle. 

Tested using Alien walk.jas, and imported into modo 401.

I am not a programmer, but it appears there is a point order bug... but what do I know? 

It sounds like a lightwave or blender MDD would be useful to you. Can anyone provide Hiroto with that?

Nice progress so far... very cool!

-NC

## #6 — tg_jp — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48954>

hi

[[QUOTE:  nervouschimp said: Nice work, Hiroto, thanks. Tested using Alien walk.jas, and imported into modo 401. I am not a programmer, but it appears there is a point order bug... but what do I know? It sound]]

thank you for testing. I've just updated the script. some bug fixed and zup/yup option added (that help -90 degree problem. ) please download and replace it.

regards.

tg_jp, Hiroto.

## #7 — nervouschimp — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48955>

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
			
		
		
	

	
		
	

		
	

Hi, still some unexpected results, but the mesh is no longer all jacked-up.

We're getting there! Please see attached images... we've still got some orientation problems.

Nice progress, so far!

Thanks,

-NC

## #8 — fused — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48960>

running the updated bake script crashes C3D 5.5 every time Hiroto, however the old version does not crash C3D 5.5.

## #9 — BazC — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48964>

Here's a simple .mdd exported from Lightwave, hope it helps.

Tank.mdd

Links: http://www.mediafire.com/?4may84y7m4bk0t5

## #10 — BazC — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48965>

Yup Baker crashes Cheetah3d but the Exporter loads OK.

## #11 — fused — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48966>

[[QUOTE:  BazC said: Here's a simple .mdd exported from Lightwave, hope it helps. Tank.mdd Click to expand... ]]

could we have an .obj or .fbx of the tank base mesh to import the .mdd into?

Edit: Scrub that comment you included a .obj, thanks.

## #12 — fused — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48972>

Well, the export script works well with C4D (no issues at all) unsure why modo flips normals. I don't own modo so can't test.

## #13 — BazC — 2010-10-17
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48974>

The tank.mdd I posted works with Modo, maybe that will show what the difference is?

## #14 — tg_jp — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-48999>

hello

thank you so much for testing and sample .mdd data.

I have just updated the script, please check it. flip problem is solved with my test file.

about crashing MDD Baker.js, I couldn't reproduce it in my test ( including tank.mdd ). if this will occur with the latest script, please let me know about it with mdd file ( if it available ).

regards.

tg_jp, Hiroto.

## #15 — nervouschimp — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49003>

Excellent work, Hiroto!

Just did a quick test with the new MDD exporter, and the model is now oriented correctly, and animating correctly, and with correct normals!

This is very cool... I don't have have a lot of time right now to do much more testing, but when I get a chance, I will try and do some more thorough testing...

Thanks,

-NC

## #16 — BazC — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49006>

Fantastic! Great to see the exporter is working well. I'm still getting the crash with the Baker plug though, no mdd involved the plug never launches, just select it in the menu and crash.

I've tried it with my imported tank mesh and with primitives created in C3d.

Here's a crash report if it will help

MDD crash report

Links: http://www.mediafire.com/?oze44mveuut9p9u

## #17 — tg_jp — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49007>

Hello

ok, MDD Baker.js is a polygon script, not a tool script. so it must be placed into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder, not same as MDD Exporter.js. please make sure about it.

currently Cheetah3D's script system doesn't have any api to access morph tag data, so I choosed polygon script to play vertices animation stored in MDD file.

regards.

tg_jp, Hiroto.

## #18 — fused — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49009>

Ahhh, I put it in the wrong folder. Do'h!

## #19 — BazC — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49013>

Ah! So did I!

## #20 — fused — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49014>

[[QUOTE:  BazC said: Ah! So did I! Click to expand... ]]
Oops! Is it working now (I'm away from my Mac all day today):frown:

## #21 — BazC — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49015>

It seems to be working now but when I open my tank object it doesn't appear in the object browser so I can't drag it into the Baker window. Is this a limitation of the demo or have I misunderstood something about c3d.

When I create geometry in C3d it does appear in the Object browser.

## #22 — fused — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49016>

[[QUOTE:  BazC said: It seems to be working now but when I open my tank object it doesn't appear in the object browser so I can't drag it into the Baker window. Is this a limitation of the demo or have I misun]]
 
Open a new document in C3D and go file-> open, then select the tank.obj and it drops straight into your document. The only limitation of the demo is save disabled, nothing else.

## #23 — BazC — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49019>

Thanks, I've got the object in and applied the .mdd to it. If I cycle through the frames in the plugin properties window the tank moves but if I press play or render the animation it stays put. 

It's obviously users error, I need to study C3d a bit more! The plug appears to be working very nicely, thanks very much!

## #24 — fused — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49020>

[[QUOTE:  BazC said: Thanks, I've got the object in and applied the .mdd to it. If I cycle through the frames in the plugin properties window the tank moves but if I press play or render the animation it stays]]
 
Ummm, doesn't sound like user error. I'd expect the frames to be written to the timeline. Maybe Hiroto expects you to advance the frames in the plugin and record new keys in the timeline?

## #25 — tg_jp — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49022>

hi,

[[QUOTE:  fused said: Ummm, doesn't sound like user error. I'd expect the frames to be written to the timeline. Maybe Hiroto expects you to advance the frames in the plugin and record new keys in the timeline?]]

Cheetah3D's script system has not some API to access animation keying yet. 

a parameter 'frame' is recordable. so, you have to record 'frame' parameter manually. you can animate 'frame' parameter as you like ( play/rewind/fast/slow.. ).

regards.

tg_jp, Hiroto

## #26 — fused — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49024>

[[QUOTE:  tg_jp said: hi, Cheetah3D's script system has not some API to access animation keying yet. a parameter 'frame' is recordable. so, you have to record 'frame' parameter manually. you can animate 'frame]]
Not a problem, thanks for the script Hiroto.

## #27 — BazC — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49025>

Ah OK that makes sense, thanks for the info and for the speedy production of the scripts!

## #28 — fused — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49028>

[[QUOTE:  BazC said: Ah OK that makes sense, thanks for the info and for the speedy production of the scripts! Click to expand... ]]
I'm interested Barry, what's your workflow going to be? I see you're an established Modo user and an illustrator. Where does C3D fit into the scheme of things for you?

Links: http://www.luxology.com/community/profiles/barry_croucher/

## #29 — SurfingAlien — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49030>

[[QUOTE:  fused said: ...I see you're an established Modo user and an illustrator... Click to expand... ]]

H.S., those are some great models/illustrations! :icon_thumbup:

## #30 — BazC — 2010-10-18
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-49032>

Cheers guys, I'm looking to expand my horizons. Some of my clients are getting into ebook publishing with the possibility of simple animated illustrations plus I've recently made contact with a local 3d company that specialise in technical illustration and animation.

Modo's animation abilities are limited at the moment and it has almost zero CA capability. C3d could fill that gap in my toolset nicely! I actually have Lightwave but I find the rigging and animation workflow in LW frustrating and unintuitive. C3d looks a lot easier!

## #31 — bbordeau — 2012-02-22
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-67871>

Script in 5.8 not working

Hi Hiroto,
   I'm trying to use your export to mdd script but it keeps crashing Cheetah, is this compatible with 5.8? Error report is below. Thanks for making this and all of your other scripts, they are very helpful.

Thanks
Brian

Attachments: [Error report MDD Export.pdf](https://www.cheetah3d.com/forum/index.php?attachments/16662/)

## #32 — tg_jp — 2012-02-23
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-67898>

hi

Unfortunately, I couldn't make sure what happened when it crashed from that error report, but please check some for fixing it.

* script file is installed ~/---/scripts/Tool folder?
* how big object's mesh in your scene to be exported?
* how long your scene to be exported?

could you post your scene file, causes crash when exporting?

v6.0 will have new api for animation, so I will update for MDD Baker.js.

regards.

tg_jp, Hiroto.

## #33 — bbordeau — 2012-02-23
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-67906>

[[QUOTE:  tg_jp said: hi Unfortunately, I couldn't make sure what happened when it crashed from that error report, but please check some for fixing it. * script file is installed ~/---/scripts/Tool folder? * h]]

Hi,
     I do have the file in the correct folder. The Object's mesh, I'm not sure on how to check that specifically but the polygon count is about 49,500. The scene is 450 frames. I tried to post the file but even when zipped, it exceeds the 500 MB filter on the site. I'll try to get it on here but I'm wondering if I'm using the script properly. Also I have the 5.8 from the App store so I don't know if that makes any difference either. This was just an experiment on my end to see if I could find a faster renderer so I may need to try something else.

Thanks
Brian

## #34 — Dr. Porkchop — 2012-08-27
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-72743>

[[QUOTE:  tg_jp said: hi Unfortunately, I couldn't make sure what happened when it crashed from that error report, but please check some for fixing it. * script file is installed ~/---/scripts/Tool folder? * h]]

Hi Hiroto

It seems the MDD exporter script immediately crashes Cheetah (v6.01) on selecting it from the Tool Script menu. This is even with a completely empty file...

## #35 — tg_jp — 2012-08-28
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-72767>

hi,

thank you for reporting, I've just updated script files.
please replace it.

regards.

tg_jp, Hiroto.

## #36 — Dr. Porkchop — 2012-08-28
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-72768>

Thanks Hiroto. The exporter and import scripts load fine now into Cheetah. However there is a problem exporting one of my test meshes. I've attached 2 simple model files below to illustrate.

The spring model is a continuous single mesh - and stays that way during the deformation by the modifier for the whole animation (which I set to 2.0 seconds in the MMD tool parameters). The MDD Exporter script seems to have no problem with this, and I can successfully re-apply the exported mdd file to the the generated obj, using the MDD Baker script to recover the original animation. Fantastic! 

However the iso model (initially) consists of three disjoint meshes, which during the course of the animation (again 2.0 seconds) join together at various times to become 2 disjoint meshes. MDD Exporter hangs after a short time with an "out of range" error. I'm wondering if it's because the mesh is disconnected - i.e. it consists of several disjoint sub meshes?

Attachments: [spring.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/17810/), [iso.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/17811/)

## #37 — tg_jp — 2012-08-28
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-72771>

hi, thank you for using this.

about ISO-Surface, it's not available to export ISO-Surface object with MDD format. Because MDD file format requires same vertices count, but ISO-Surface will take different vertices count at each animation frame.

if you want to export ISO-Surface animation, you have to take other approach ( sequential object file ? ).

regards.

tg_jp, Hiroto

## #38 — Dr. Porkchop — 2012-08-28
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-72772>

Ah yes, OK I see. Thanks for the explanation Hiroto.

The exporter will be very useful getting vertex animations into Unity.

## #39 — Dr. Porkchop — 2012-11-08
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-74548>

[[QUOTE:  tg_jp said: hi, thank you for using this. about ISO-Surface, it's not available to export ISO-Surface object with MDD format. Because MDD file format requires same vertices count, but ISO-Surface wil]]

Hi Hiroto

Would it be possible to extend your MDD Exporter script to bake morph animations as well? This would be tremendously useful in getting morph animations into Unity. (Ideally, Unity would be able to directly import Cheetah morph targets, which it cannot, but at least if we can do the morph animations in Cheetah and then export the baked animations via MDD that would help...)

Cheers!

## #40 — pegot — 2014-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-84623>

Can someone explain to me what MDD Baker is and how to set up and use it?

I have successfully used MDD Exporter to send morph or transformation animations to Blender so that works for me.  But I haven't a clue how to use the Baker script, or what that is supposed to do.

Thanks!

## #41 — pegot — 2014-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6367/post-84645>

Ok - I more or less figured this out - Baker.js is used to IMPORT the MDD file.  Not completely performing as expected though in that the original morphs re-imported into Cheetah do not perform the same animation.

For instance:  A ball that is morphed over time to have a few spikes coming out of it (done with Magnet tool and a Morph tag).

This animation exports perfectly to Blender using MDD Exporter.js.

But if I use that same exported MDD file back on the ball in Cheetah (attaching an empty morph tag to "catch" the imported morphs) then what happens is that the ball scales instead of having the spikes come out of it (or it will scale while the spikes shoot out of it).
