# Finally , MatMovie updated

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9730/
- Subforum: script-downloads
- Started by **ToddWR** on 2013-07-14; last post 2021-07-25; 41 posts

## #1 — ToddWR — 2013-07-14
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80500>

Finally , MatMovie updated

first of all sorry for taking so long, real life plays havoc with online.

how to use:
prep the movie by saving it as an image sequence
--
put this script into the Polygonobj folder
--
make a new material
make sure it has a .mov extension "new material.mov"
then place at least one texture image node in it
select mat movie.js from the polygon menu
then put the object as a child of the object
then click find materials
--
set a begining key for the "frame" value
set an ending key for the "frame" value

select play and watch your movie play

Attachments: [MatMovie.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/20523/)

## #2 — frank beckmann — 2013-07-14
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80502>

You did it again - cool

Ingenious!
I love you Todd.   Many many Thanks!

Cheers
Frank

## #3 — Francois — 2013-07-14
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80505>

Matmovie script updated

Don't be sorry, Todd and Thank you very much for sharing your efforts with us. This will very surely please a lot of Cheetah3D users !

## #4 — filip c — 2013-07-15
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80540>

Indeed, very pleased  

Thanks Todd!

## #5 — ZooHead — 2013-07-15
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80541>

Sweet!:icon_thumbup: You will be remembered for generations to come.

​

## #6 — uncle808us — 2013-07-16
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80551>

Thanks for all the effort.:icon_thumbup:  Awesome!.

## #7 — WhiskeyHotel — 2013-07-16
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80553>

Sweet, sweet! Thanks.

## #8 — tg_jp — 2013-07-18
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80605>

hi,

nice script!! :icon_thumbup: 

tg_jp, Hiroto.

## #9 — Martin — 2013-07-19
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80628>

Hi Todd,
thanks for updating the script.:smile: 

Bye
Martin

## #10 — frank beckmann — 2013-07-30
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80883>

Todd - is it true the script don´t recognize any paths after reopen a saved file including mat-movie materials?

Cheers
Frank

## #11 — lowpolymatt — 2013-07-31
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80897>

I get a script error:

Javascript Error
line: 121 
error: 'undefined' is not a function (evaluating 'mat.nodeCount()')

Any help appreciated

## #12 — Martin — 2013-07-31
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80898>

Hi,
did you use Cheetah3D 6.2.1? Since that scripting function was introduced in Cheetah3D 6.2.1 and isn't available in older versions of Cheetah3D.

Bye
Martin

## #13 — lowpolymatt — 2013-07-31
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-80900>

Thanks Martin, working now! 

*blushes*

## #14 — jimAult — 2013-08-12
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-81098>

Possible bug + work-around procedure

[[QUOTE:  frank beckmann said: Todd - is it true the script don´t recognize any paths after reopen a saved file including mat-movie materials? Cheers Frank Click to expand... ]]

C3D v6.2.1  OSX 10.6.8 Snow Leopard
One more gotcha to report:
Define all parts & run the timeline correctly.
The timeline cursor is now set at something other than 0
Save the file; close; reopen; go to the child object and click 'Materials' to rescan

Result is that the timeline cursor is at 0, the 'frame' field reads 0.0, but the animation starts at the old (ghost) frame number at the time of saving (eg. 32).

To reset this, delete the MatMovie child, 
'Remove' the image from the material, then re-Load the material
run the MatMovie macro, slide the obj to the child position, 
then click 'Materials' to do another scan, set the keyframes
and now the animation plays as originally keyframe set.

Just deleting and resetting the child obj does not clear the ghost.
Remove-Load steps only work if the child obj has been deleted.

I only tested for a single take and a single MatMovie object, and two material.nodes only one of which had a CustomMaterial.mov assigned as '1' side of a cube.

This feature is so good, that this reinstall-work-around is fine for me.

## #15 — DarthSidious05 — 2013-08-22
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-81278>

[[QUOTE:  ToddWR said: first of all sorry for taking so long, real life plays havoc with online. how to use: prep the movie by saving it as an image sequence -- put this script into the Polygonobj folder -- ma]]

Thanks ToddWR! 
I'll give this a try. How long would you say it took to script for you? I can imagine it was complex. 
If this works like I'm hoping, it has been on my wishlist (and many others) for quite a while. Many thanks. 

[[QUOTE:  Martin said: Hi, did you use Cheetah3D 6.2.1? Since that scripting function was introduced in Cheetah3D 6.2.1 and isn't available in older versions of Cheetah3D. Bye Martin Click to expand... ]]

Okay, thanks Martin for the info. :icon_thumbup:

[[QUOTE:  jimAult said: C3D v6.2.1 OSX 10.6.8 Snow Leopard One more gotcha to report: Define all parts & run the timeline correctly. The timeline cursor is now set at something other than 0 Save the file; clos]]

Thanks for the heads up Jim. Will keep this in mind.

## #16 — teamdallas — 2013-08-23
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-81326>

Movie script

How do I add a material with a .mov extension, I understood everything else and script is ready to use but dont get that one part of the steps.

## #17 — ToddWR — 2013-08-24
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-81327>

[[QUOTE:  teamdallas said: How do I add a material with a .mov extension, I understood everything else and script is ready to use but dont get that one part of the steps. Click to expand... ]]

just rename the material from "material" to "material.mov"

## #18 — frank beckmann — 2019-05-07
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-116126>

Just info in case someone missed the native movie texture support on all image channels since Cheetah3dv7. 

Cheers
Frank

## #19 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119493>

I apologise upfront for my ignorance here! ... but is this the technique to apply a sequential image map to a poly object?

## #20 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119494>

Not really - it´s about mapping a movie (.mov/mp4/etc) as a material onto polygon selections:

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
			
		
		
	

	
		
	

Cheers
Frank

## #21 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119495>

I think that's what I need to do Frank. I want to animate very simple (stick figure) facial expressions onto a sphere. I would make a movie in AE, export the sequential frames, the use those as a material. Is that correct?

## #22 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119496>

Cheetah3d expects a video container - not an image sequence. No big deal though.

Cheers
Frank

## #23 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119497>

I just saw ToddWR's instructions to make an image sequence from a movie, and thought - image sequence. I'm confused (of course!).

## #24 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119498>

...your sample is want I need though Frank. BTW, 
Where would one find the Polygon object folder?

## #25 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119499>

Todd´s script as ingenious it is is outdated, because Cheetah3d supports movie material natively in the meantime.
Just select a mov file from your stock and add it to a channel you like.

Cheers
Frank

## #26 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119501>

Frank, I really appreciate you helping me on this, I know it must get tiresome! I'm sure it is easy, but I'm not getting how it's done. This is what I tried and it didn't work.... add Material, Image Texture and choose a .mov and apply that to the object. What is the correct process?

## #27 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119502>

That´s correct: did you hit the play button at the timeline?

Cheers
Frank

## #28 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119503>

I did, I'll try a diferent movie...

## #29 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119504>

That was it, it did not like the first one! Thank you so much Frank, I appreciate you so much!

## #30 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119505>

I believe every codec QuickTime supports should work. So I wonder what kind of mov file didn´t work in first place.
If you know how to handle further mov files all is good I guess. 

Cheers
Frank

## #31 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119506>

I think it was the Animation codec that it didn't recognise.

## #32 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119507>

Hmmm, I'll try it again for future reference.

## #33 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119508>

[[QUOTE:  andyatkins said: I think it was the Animation codec that it didn't recognise. Click to expand... ]]
No idea what kind of codec this might be.
If there´ s anything else let us know.

Cheers
Frank

## #34 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119509>

I will Frank! (It comes from Apple and is a Quicktime based codec).

## #35 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119510>

Maybe Martin has a clue. I will see if I have an app in my portfolio which is able to generate such codec movies.

Cheers
Frank

## #36 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119511>

I generated it from AfterEffects. It's the default setting.

## #37 — frank beckmann — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119512>

Ok - here´s to an (old) Apple discussion which might be give some insights: https://discussions.apple.com/thread/2774818

Good night Andy.

Cheers
Frank

Links: https://discussions.apple.com/thread/2774818

## #38 — andyatkins — 2020-03-06
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119513>

Thanks Frank, you too!

## #39 — andyatkins — 2020-03-07
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-119514>

info- I use it alot because it supports an alpha.

## #40 — misterdna — 2021-07-25
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-123615>

[[QUOTE:  frank beckmann said: Just info in case someone missed the native movie texture support on all image channels since Cheetah3dv7. Cheers Frank Click to expand... ]]
OMG, I didn't realize this, just stumbled upon this thread in a search. So great!

## #41 — frank beckmann — 2021-07-25
<https://www.cheetah3d.com/forum/index.php?threads/9730/post-123616>

You´re welcome!
