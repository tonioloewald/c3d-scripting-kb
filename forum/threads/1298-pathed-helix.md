# Pathed helix

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1298/
- Subforum: script-downloads
- Started by **ToddWR** on 2007-02-01; last post 2019-09-26; 31 posts

## #1 — ToddWR — 2007-02-01
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-8180>

Pathed helix

all,
here is the first release of the pathed helix script. now with a number of strands and the ability to flip the rotation of the helix. play and have fun

just add one spline to the object and set the parameters

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
			
		
		
	

	
		
	

		
	

detail: the higher the detail the finer the lines are... because of the way splines are handled a value of 2 is about right
radius: how far from the central spline to draw the helix
loops: how dense the loops are
strands: how many splines are twirled around the central spline
flip: if the helix is clockwise, flip will make it go counter clockwise
close: will make the helix a closed path

Todd

Attachments: [PathedHelix.zip](https://www.cheetah3d.com/forum/index.php?attachments/1662/)

## #2 — Martin — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-8182>

Hi Todd,
it would be nice if you could add a small screenshot of what your skript does. Just as an additional explanation.

Bye,
Martin

P.S. Very nice and helpful script by the way.:smile:

## #3 — squareitround — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-8191>

Wow, thanks again Todd!  Just in time to use it on my model and submit it. I owe you one.

## #4 — uncle808us — 2007-02-02
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-8192>

Thanks Todd

It just keeps getting better....:icon_thumbup:

## #5 — Martin — 2007-02-03
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-8200>

Hi Todd,
very nice rope.:icon_thumbup:

Bye,
Martin

## #6 — mike62 — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-23441>

Help! Rotation of sweep object changes

Hello,
I just discovered this script and thought it would be exactly what I needed to create a double-helix, just like a DNA strand. When I sweep my rectangle spline, the rotation of it gradually changes as it goes along the helix spline, ruining the effect of the "parallel" dna strands. They need to stay "facing" each other, so that the bars between each strand can have something to attach to. Is there anything that can be done about this? Is there a better way to create a double-helix?

Look at the attached image to see how the sweep is being twisted as it moves along the helix. I've also included the working .jas file.

Thanks for the help!
-Mike

Attachments: [double-helix.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5205/), [double-helix.zip](https://www.cheetah3d.com/forum/index.php?attachments/5206/)

## #7 — frank beckmann — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-23442>

Hi Mike.
We had exact this case long ago - can´t find it anymore.
If you don´t mind I´d like to show you an alternative approach:

With kindest regards
Frank

Edit. The original thread: http://www.cheetah3d.de/forum/showthread.php?t=844

Attachments: [DoubleHelix.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/5207/)

Links: http://www.cheetah3d.de/forum/showthread.php?t=844

## #8 — mike62 — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-23445>

Adding the pegs to the double-helix

Wow, thanks for the quick response! It was exactly what I needed. I'm looking at the best way to do the "pegs" for the double-helix now, and am surprised that the "Array" modifier doesn't let you set a rotation for your offset objects. Has anyone scripted something like this? I did a search for it but couldn't find anything. I'd love to have one core object that is instantiated, rather than copy-pasting the object (in case the pegs need to be changed later.

I tried applying a "Twist" modifier to the array of cylinders, but the cylinders themselves get quite distorted too.

Any ideas?

Thanks,
-Mike

Attachments: [double-helix2.zip](https://www.cheetah3d.com/forum/index.php?attachments/5208/), [double-helix2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5209/)

## #9 — tg_jp — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-23448>

hi

here is my try. it is destructive, so you can change some parameters as you want. 

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3D_sz_001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5214/), [try_dhp.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/5215/)

## #10 — frank beckmann — 2008-07-09
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-23449>

Hi Hiroto.
Brilliant! :icon_thumbup: 

Cheers
Frank

## #11 — frank beckmann — 2010-03-10
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-40092>

As Todd´s script got broken for Cheetah3dV5 I was the first time in my life able to fix it by myself - just be deleting 3 entries. :tongue: Don´t laugh.

So this on should work again. Thanks Todd for this wonderful script.

Cheers
Frank

Attachments: [Pathed Helix.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/10016/), [Faucet.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/10017/)

## #12 — SurfingAlien — 2010-03-10
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-40115>

[[QUOTE:  frank beckmann said: As Todd´s script got broken for Cheetah3dV5 I was the first time in my life able to fix it by myself - just be deleting 3 entries. :tongue: Don´t laugh. So this on should work ag]]

1st script work from Frank... I can't miss this one! (deleting 3 entries is easy... but only if you know what's to be deleted, BTW... I wouldn't)
now if you start to like this kind of things and apply in this field like you did for the rest... well it makes me eager and scared in the same time  

thank you for fixing,
cheers,
A

## #13 — SurfingAlien — 2010-08-03
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-46104>

Hi!
some times ago I tried to use this great script with Snow Leopard and 5.3 but it always crashed the application. Now I just tried again with SL and 5.5 and noticed it's always the same... can someone test if the script is working with the last release and with what OS?
any chance ToddWR could have a look into it (please :smile: )? I'd really *love* to be able to use it again...

thanks in advance,
Alessandro

## #14 — frank beckmann — 2010-08-03
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-46107>

Could this be a SnowLeopard issue? I still use it under Leopard.

Cheers
Frank

## #15 — SurfingAlien — 2010-08-03
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-46109>

[[QUOTE:  frank beckmann said: Could this be a SnowLeopard issue? I still use it under Leopard. Cheers Frank Click to expand... ]]

Hi Frank,
Yes I too think so, as we already saw your "tuned" version worked for you and not for me... let's see if some other can confirm it's working with 10.5.x and not with 10.6.x

(BTW, sorry to bother again about that but this script can be a real time saver... :smile: )

cheers,
A

## #16 — SurfingAlien — 2010-09-19
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-47548>

Dear Frank,

problem solved... I'm a bit ashamed to say but it was again an "operator error"  :redface: (just put it in the wrong script folder, go figure! ...probably a drag n' drop issue since I can't see a reason why I had to put it in the "tool" folder  )
working as a charm now :icon_thumbup: 

cheers,
A

## #17 — frank beckmann — 2010-09-19
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-47553>

Glad you got it working - strange enough that it´s moving from one to another folder - as you said it was already working.  Maybe you put the updated one into the wrong folder.

Cheers
Frank

## #18 — SurfingAlien — 2010-09-19
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-47555>

[[QUOTE:  frank beckmann said: Glad you got it working - strange enough that it´s moving from one to another folder - as you said it was already working. Maybe you put the updated one into the wrong folder. Ch]]

don't know... sometimes it's incredible what you can do with these trackpads  

cheers,
A

## #19 — novolume — 2010-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-51741>

Can anyone confirm whether this script is working or not in 5.6? Thanks

## #20 — SurfingAlien — 2010-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-51742>

[[QUOTE:  novolume said: Can anyone confirm whether this script is working or not in 5.6? Thanks Click to expand... ]]

works fine here Dave. Double check if the script is in the right folder (Splineobj)

cheers,
A

Attachments: [Schermata 2010-11-20 a 11.56.03.png](https://www.cheetah3d.com/forum/index.php?attachments/12893/), [PathedHelix5.6.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/12894/)

## #21 — novolume — 2010-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-51746>

Great thanks Alessandro, I had it in the wrong directory as I couldn't see any instructions on where to put it

## #22 — frank beckmann — 2010-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-51748>

[[QUOTE:  novolume said: Can anyone confirm whether this script is working or not in 5.6? Thanks Click to expand... ]]

Hi Dave. Need some coffee?
http://www.cheetah3d.com/forum/showpost.php?p=51738&postcount=35
 

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showpost.php?p=51738&postcount=35

## #23 — novolume — 2010-11-20
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-51749>

Totally missed that!!

## #24 — Shift Studio — 2016-05-06
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-100815>

Very cool script! Just what I need tonight.

Thanks Frank for updating it when it was broken.

I can confirm it works in C3D7.0beta13, OSX 10.11.4

--Shift Studio.

## #25 — joel ruiz c — 2019-09-25
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117725>

Hello! I don't know if this script is still being maintained, but I'm getting this error everytime the scripts loads. After that it works perfect though, so it's just a minor annoyance.

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

## #26 — frank beckmann — 2019-09-25
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117728>

I'm on HighSierra and don't get that message.

Cheers
Frank

## #27 — Helmut — 2019-09-25
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117730>

@joel ruiz c
Is jour .js the old version from 2007 or the corrected version from 2010?
There is a minor difference:

Attachments: [Screenshot 2019-09-25 at 14.27.13.png](https://www.cheetah3d.com/forum/index.php?attachments/34856/)

## #28 — ZooHead — 2019-09-25
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117747>

[[QUOTE:  Helmut said: @joel ruiz c Is jour .js the old version from 2007 or the corrected version from 2010? There is a minor difference: Click to expand... ]]
Thanks Helmut, that got it working for me!

## #29 — frank beckmann — 2019-09-25
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117749>

That might be the reason as my version is from 10th.Mar2010, 09:22.
As a tip it´s always useful to read the whole thread as newer versions of some scripts are not updated in the opening post.

Cheers
Frank

## #30 — joel ruiz c — 2019-09-26
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117751>

Ah! that must be it, thanks. I read the whole thread but somehow missed that the script in the first message was not the latest.. I'll check that now.

## #31 — frank beckmann — 2019-09-26
<https://www.cheetah3d.com/forum/index.php?threads/1298/post-117752>

[[QUOTE:  joel ruiz c said: Ah! that must be it, thanks. I read the whole thread but somehow missed that the script in the first message was not the latest.. I'll check that now. Click to expand... ]]
That wasn´t obvious: #11 

Cheers
Frank

Links: https://www.cheetah3d.com/forum/index.php?threads/1298/post-40092
