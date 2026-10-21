# F-Curve Linker.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8338/
- Subforum: script-downloads
- Started by **tg_jp** on 2012-04-17; last post 2016-12-14; 55 posts

## #1 — tg_jp — 2012-04-17
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69492>

F-Curve Linker.js

Hello.

It's a polygon script to update object (or tag) parameter with other object (or tag) parameter's update.

download: http://www.tres-graficos.jp/blog/files/article.php?id=83

filip c already makes some cool scene with this.  

update: bug fixed when rendering.
update: bug fixed for manual manipulation for tag parameter. ( 2013/1/28 )

limitation: F-Curve object has to be placed before updated object ( B object ) at Object Browserk, since script won't update correctly when redering.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=83

## #2 — filip c — 2012-04-17
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69496>

Hi guys,

As promised, I added several example files. Check them out 
I'll post some movies of this powerfull script later...

Kind regards,
Filip

Attachments: [F_link_examples.zip](https://www.cheetah3d.com/forum/index.php?attachments/16999/)

## #3 — tg_jp — 2012-04-17
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69497>

Cool! thank you so much.

regards

tg_jp, Hiroto

## #4 — Andreu — 2012-04-17
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69503>

WOW!!! :shock: 

We have (essentially) drivers now in Cheetah3D!

Hiroto, I am crying out of joy... :-D

## #5 — filip c — 2012-04-17
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69505>

Hi guys,

Here's a movie of the example files at work...http://vimeo.com/40516768

The possibilities are endless

Links: http://vimeo.com/40516768

## #6 — Swizl — 2012-04-19
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69575>

Wow those are super cool, thanks filip c and Hiroto! Some of the files are asking for an Arrow2D.js. Any idea where to get that please?

## #7 — Swizl — 2012-04-19
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69576>

Never mind, I found the link for the arrow2D.js. It's here if anybody else wants it. http://www.cheetah3d.com/forum/showthread.php?t=1456

Links: http://www.cheetah3d.com/forum/showthread.php?t=1456

## #8 — filip c — 2012-04-20
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-69597>

[[QUOTE:  Swizl said: Wow those are super cool, thanks filip c and Hiroto! Some of the files are asking for an Arrow2D.js. Any idea where to get that please? Click to expand... ]]

sorry, I forgot to turn them into splines...

## #9 — filip c — 2012-06-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-71708>

driver sliders

Hi,

While experimenting, I discovered that it seems perfectly possible to use a morph tag to drive F-curves (in stead of the reverse I did in a previous example)...

This way, the morph tag acts a control panel with sliders... see added example

Attachments: [F-sliders.zip](https://www.cheetah3d.com/forum/index.php?attachments/17537/)

## #10 — frank beckmann — 2012-09-12
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-73139>

Anyone who get an animation rendered with f-curve-linkers involved?
Cheetah freezes here.

Cheers
Frank

## #11 — tg_jp — 2012-09-13
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-73147>

hi, thank you for letting me know it.

I updated this script. please replace it.

regards.

tg_jp, Hiroto

## #12 — frank beckmann — 2012-09-13
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-73148>

Great news!
Thanks for the update - renders fine now. :icon_thumbup: 

Cheers
Frank

## #13 — crgreen — 2016-05-26
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101329>

v7 Falcon, mblur, crashes

Using F-Curve Linker (and another similar script I'm working on) seem to make the Falcon renderer freeze/crash when motion blur is on. Not sure if there's anything to be done on the scripting side.
Related subject, I wonder if it is possible to get Falcon to render blur frames even as stills (instead of having to make movie renders).

## #14 — frank beckmann — 2016-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101359>

Not so here under Yosemite. I tested the files Filip provided in this thread and all seems to work fine including rendering (except the f-tracking-file I can not open, maybe because of an extra script I don´t have installed)

Cheers
Frank

Attachments: [fc-linkerMB.jpg](https://www.cheetah3d.com/forum/index.php?attachments/29011/)

## #15 — frank beckmann — 2016-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101360>

[[QUOTE:  crgreen said: Related subject, I wonder if it is possible to get Falcon to render blur frames even as stills (instead of having to make movie renders). Click to expand... ]]
Not sure how this should work without telling Falcon in which direction an object moves/deforms/translates. At least you need just 3 frames to render. The third will have MB visible
from my experience.

Cheers
Frank

## #16 — crgreen — 2016-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101368>

[[QUOTE:  frank beckmann said: Not so here under Yosemite. I tested the files Filip provided in this thread and all seems to work fine including rendering (except the f-tracking-file I can not open, maybe beca]]

I'm trying to figure out what is going on. The "modifiers.js" example  and the "tank.js" example, if I keyframe the linked activators, the  render will get through one or two frames, then crap out. Same behavior I was talking about in the original post. I'm going to  see if this happens on my other machine as well...

## #17 — frank beckmann — 2016-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101370>

These files are working here with Falcon.

Cheers
Frank

Attachments: [Tank+.png](https://www.cheetah3d.com/forum/index.php?attachments/29017/)

## #18 — crgreen — 2016-05-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101378>

[[QUOTE:  frank beckmann said: These files are working here with Falcon. Cheers Frank Click to expand... ]]

I know this is thoroughly annoying question, but I assume you rendered more than two frames? Have to ask.

## #19 — frank beckmann — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101379>

[[QUOTE:  crgreen said: I know this is thoroughly annoying question, but I assume you rendered more than two frames? Have to ask. Click to expand... ]]
Yes - a whole second at 24fps.

Cheers
Frank

## #20 — crgreen — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101380>

[[QUOTE:  frank beckmann said: Yes - a whole second at 24fps. Cheers Frank Click to expand... ]]
Thank you!
Thanks, you guys, for the tests. I'll get on my other machine tonight and see if it's machine-specific.

## #21 — crgreen — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101381>

missing properties in v7

I hope you do see, however, that, for example, in the "Alien walk" project, the original properties referenced are no longer showing up in v7 (which means of course those parts – like the facial brow animation – aren't working).

http://postimg.org/image/laabgkix7/

Links: http://postimg.org/image/laabgkix7/

## #22 — crgreen — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101382>

not machine-specific

Sorry to say that this issue is the same with my other machine (with the better aka not crap gpu).
I did a screen recording -- really exciting, get the popcorn ready -- to show what happens every time (although sometimes it'll be one frame, sometimes two frames before it dies).
The spinning beach ball did not record, but that's what happens when the render progress stops.

This is frustrating. I could extend this app so much with this kind of scripting.
I have another idea -- I'm going to do a clean install and only have the f-curve linker script added. Frankly (no offense, Frank) I'd be shocked if this makes a difference but I'm not sure what else to try.

[[ [EDIT] Nope. Doesn't change anything.
Running b15. OS X 10.10.5, 32GB, Intel Core i7 (4 core) ]]

Here's the movie:

https://www.dropbox.com/s/f7aguk5pc3lpqzt/linkbug2_h2.mov?dl=0

Links: https://www.dropbox.com/s/f7aguk5pc3lpqzt/linkbug2_h2.mov?dl=0

## #23 — frank beckmann — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101383>

[[QUOTE:  crgreen said: I hope you do see, however, that, for example, in the "Alien walk" project, the original properties referenced are no longer showing up in v7 (which means of course those parts – like t]]

Not sure what you´re saying: the morph-tag is still recording and can be rendered by Falcon.

[[QUOTE:  crgreen said: Sorry to say that this issue is the same with my other machine (with the better aka not crap gpu). I did a screen recording -- really exciting, get the popcorn ready -- to show what hap]]
I can´t tell if the API for v7 is fully implemented already - please be aware we´re in beta stage right now - even I can´t reproduce the issues you have; see AnimGIF.

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
			
		
		
	

	
		
	       
		
	
Please grab the text from the bug report when you force quit Cheetah3d the next time - paste it into a TextEdit file along a line telling what you´re trying, a link to this thread and email it with the file to Martin.
I can´t help you any further with this - I´m sorry.

Cheers
Frank

## #24 — crgreen — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101384>

[[QUOTE:  frank beckmann said: Not sure what you´re saying: the morph-tag is still recording and can be rendered by Falcon. Click to expand... ]]

Sorry I should've been extra thorough:
There is a "check A Parameters" button and a "check B Parameters" button in the script. The still graphic I posted shows what parameters are showing up in v6 and v7 on my machines.

As for the other stuff, I'll get to it over the weekend.

Thanks again for the attention.

## #25 — frank beckmann — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101386>

Could it be that you possibly select the wrong B tag index: number?

Cheers
Frank

Attachments: [b-Parameters-Index.png](https://www.cheetah3d.com/forum/index.php?attachments/29026/)

## #26 — tg_jp — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101387>

Hello, thank you for reporting.

now I am working on writing same kind script for v7 ( kicked by sounds file ), so after that I will re-write this script for v7 as soon as possible. I knew this script has a problem on movie renderings with certain parameters combination.  

I am looking into it.

Best

tg_jp, Hiroto.

## #27 — crgreen — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101397>

[[QUOTE:  frank beckmann said: Could it be that you possibly select the wrong B tag index: number? Cheers Frank Click to expand... ]]

Turns out that this is/was the lesser problem, thanks. But no, I didn't change it. This is how the project opens in v7 on my machines; with the wrong B tag index number. Thanks.

## #28 — crgreen — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101398>

[[QUOTE:  frank beckmann said: Yes - a whole second at 24fps. Cheers Frank Click to expand... ]]

This may seem like a crazy idea, Frank, but could you post your project?

Thanks.

## #29 — frank beckmann — 2016-05-28
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101399>

Here you go:
Hope this helps.

Cheers
Frank

Attachments: [f-Linker-modifiers.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/29027/)

## #30 — crgreen — 2016-06-02
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-101483>

[[QUOTE:  tg_jp said: Hello, thank you for reporting. now I am working on writing same kind script for v7 ( kicked by sounds file ), so after that I will re-write this script for v7 as soon as possible. I knew]]

Hey Hiroto. Thanks for looking into it. If there's anything I can do to help, let me know. It's weird that I seem to be the only one with this problem, and it is on two machines!
Anyway, thanks again.

-Chris G

## #31 — crgreen — 2016-07-10
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102061>

the big 'why'

I'm frustrated by this issue, obviously because I seem to be (well, my two machines seem to be) affected by it only, and because neither Martin nor Hiroto have been able to explain WHY this is happening. I sent Martin two crash logs and he basically pushed the issue onto Hiroto. Hiroto noted that he had seen some sort of problem and planned on updating the script.
These things take time, I know, and this is beta software. But this is such a strange problem and of course very 'niche' - I wonder how many people either use the F-Curve Linker or have attempted (as I have) to do similar scripting solutions.
I would love if Martin, you could explain why this is not something you need to fix. This is a bug that not only kills functionality, but crashes (well, hangs) the app (when, really, it logically "should" work). I have found, by the way, that any movie rendering fails. Not just those with motion blur. And with either renderer (Cheetah or Falcon).
I am alone in the wilderness complaining. I'm feeling whine-y today.

## #32 — frank beckmann — 2016-07-10
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102062>

[[QUOTE:  crgreen said: I have found, by the way, that any movie rendering fails. Not just those with motion blur. And with either renderer (Cheetah or Falcon). Click to expand... ]]
That is still not 100% true as I still can render each of the available example scenes without any issue.

[[QUOTE:  crgreen said: I am alone in the wilderness complaining. I'm feeling whine-y today. Click to expand... ]]
That´s 100% true.

## #33 — crgreen — 2016-07-10
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102063>

[[QUOTE:  frank beckmann said: That is still not 100% true as I still can render each of the available example scenes without any issue. That´s 100% true. Click to expand... ]]

Oh yes, I should've said "ONLY" I have found. But since I already mentioned that only the two machines in my possession have this problem, it seemed obvious enough.

Some bugs can be very confounding. It'll be great to get some help regarding this one.

## #34 — frank beckmann — 2016-07-10
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102064>

Can you please upload an example scene which crashes/hang your machine?
It seems I don´t have any.

## #35 — crgreen — 2016-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102124>

[[QUOTE:  frank beckmann said: Can you please upload an example scene which crashes/hang your machine? It seems I don´t have any. Click to expand... ]]

If I simply open the "tank" example and keyframe the "move this" object's position, this will not render movies.

This is universally true for any project/object using the script, unless the script doesn't do anything (like if the tag index is off, which is a different (or different-seeming) bug (mentioned in another post).

(I'm guessing you'll be able to open this and render with no issues. Like before.)

Attachments: [tankWithKF.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/29306/)

## #36 — frank beckmann — 2016-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102125>

[[QUOTE:  crgreen said: (I'm guessing you'll be able to open this and render with no issues. Like before.) Click to expand... ]]
Yes - no idea what else I can do on this.

		
	
Cheers
Frank

## #37 — frank beckmann — 2016-07-12
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102126>

Hopefully there´s someone on El Capitan who will test as well.

Cheers
Frank

## #38 — frank beckmann — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102171>

Nobody on El Capitan who can load and render that file?

Cheers
Frank

## #39 — crgreen — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102172>

[[QUOTE:  frank beckmann said: Nobody on El Capitan who can load and render that file? Cheers Frank Click to expand... ]]

Actually, it would be great for anyone who has the time to test this, regardless of OS version. I'm on Yosemite 10.10.5 still, btw.

## #40 — Swizl — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102176>

I'm running El Cap on a 5k iMac at work. I'll render it to tomorrow and see how it goes. I didn't have time today to test it. I did open it in v7 and it functions as intended there.

## #41 — frank beckmann — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102177>

[[QUOTE:  crgreen said: Actually, it would be great for anyone who has the time to test this, regardless of OS version. I'm on Yosemite 10.10.5 still, btw. Click to expand... ]]
My bad - I thought you´re on El Capitan. Now I have absolutely no clue why it´s not running for you... :redface: 

Cheers
Frank

## #42 — Swizl — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102183>

Ok confirmed. Crashing when rendering in v7. A work around may be to render each frame and then composite. A pain for sure, but at least until it possibly may have a fix.

## #43 — frank beckmann — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102184>

So it´s crashing on Yosemite AND El Capitan?
Wonder what´s going on here as I can´t reproduce it. :redface: 

Cheers
Frank

## #44 — crgreen — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102185>

[[QUOTE:  Swizl said: Ok confirmed. Crashing when rendering in v7. A work around may be to render each frame and then composite. A pain for sure, but at least until it possibly may have a fix. Click to expand.]]

Which means no motion blur, which gets my vote for most important feature of v7.

## #45 — crgreen — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102186>

[[QUOTE:  Swizl said: Ok confirmed. Crashing when rendering in v7. A work around may be to render each frame and then composite. A pain for sure, but at least until it possibly may have a fix. Click to expand.]]

The plot finally thickens. Thank you.

## #46 — frank beckmann — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102187>

[[QUOTE:  crgreen said: Which means no motion blur, which gets my vote for most important feature of v7. Click to expand... ]]
I can hold against it as you can see in reply N° 14/17.
But now we need a bug/crash-log do determine if it´s the script or the API.
Who´s first? Please send it over to Martin. Thanks.

Cheers
Frank

## #47 — Swizl — 2016-07-15
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102188>

[[QUOTE:  frank beckmann said: I can hold against it as you can see in reply N° 14/17. But now we need a bug/crash-log do determine if it´s the script or the API. Who´s first? Please send it over to Martin. Th]]

Crash log sent to the good doctor.

## #48 — Martin — 2016-07-25
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102329>

Hi,
and sorry for the late reply. The problem is that the architecture of Cheetah3D 7 changed slightly. In v6 and older every object had a dummy tag which did nothing else than displaying the object icon. Since tag was removed in v7 since the object tag is now displayed directly by the object. That saves a lot of unnecessary tags throughout the scene. 

Unluckily this script stumbles over this missing tag since that script access the tags via the tag index. Especially for existing scenes this might be a problem if they access tags which don't exist anymore. 

So this script needs some small adjustments to work properly in v7. 

Bye
Martin

## #49 — crgreen — 2016-07-27
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-102341>

[[QUOTE:  Martin said: Hi, and sorry for the late reply. The problem is that the architecture of Cheetah3D 7 changed slightly. In v6 and older every object had a dummy tag which did nothing else than displayin]]

Hi Martin. Thanks for the reply. But what if a script doesn't use these tags explicitly why does this fail? And why would this kill renders when the tags that are referenced are corrected?? I'm sorry, but I'm looking to understand this problem better, and so far I am trying to understand the connection with the render-killing bug.

-cg

## #50 — crgreen — 2016-12-07
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-104342>

[[QUOTE:  crgreen said: Hi Martin. Thanks for the reply. But what if a script doesn't use these tags explicitly why does this fail? And why would this kill renders when the tags that are referenced are correct]]

I never got answers to this, and this bug is still unfixed (beta eighteen). I wrote a couple of scripts inspired by f-linker that avoid these tags completely. The scripts work beautifully, add amazing functionality, and I cannot render movies. It makes no sense.

## #51 — Martin — 2016-12-08
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-104355>

Hi,
I've tested your tankWithKF.jas.zip sample scene and it works fine. It also works for both renderers. Do you have the latest version of the script installed since Hiroto released some bugfixes?

Bye
Martin

## #52 — crgreen — 2016-12-08
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-104365>

[[QUOTE:  Martin said: Hi, I've tested your tankWithKF.jas.zip sample scene and it works fine. It also works for both renderers. Do you have the latest version of the script installed since Hiroto released som]]

From 2013? Yes. In the latest beta, the most recent f-linker does not even launch, giving 

	
	


```
line: 139 
error: Object.getParameter() couldn't find parameter called A prm. name
```

error. I have really tried to be thorough in my script version use; the links I've found here and on Hiroto's site were last updated in '13.

Keep in mind that the only two people to see the rendering crash are myself (two different machines) and Swizl. So far. No one else could or would contribute, except frank (for whom rendering movies worked fine). (Sorry to anyone I'm forgetting. I'm a little tired right now.)

This is why both Swizl and I both sent you crash logs.
But, like I said, I've created a few scripts using some of the same principles, which "work" (work up to rendering) on all versions of Cheetah, just fail to render movies. I first saw the render crashes with f-linker while I was developing the other scripts. In a way, my scripts are simpler, but they have the same render crash problem f-linker did.

Just to clarify: I can use f-linker with beta 17, but it is unusable with beta 18.
In all beta versions previous to 18, aside from the weird tag problem, all movie renders fail. This failure is the same with the scripts I've written, but my scripts work with all versions, aside from rendering, which always crashes.

Let me know what else I can contribute or send you.

Thanks

## #53 — frank beckmann — 2016-12-08
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-104366>

Seems the example files don´t work anymore under Yosemite/C3dv7beta18:

Cheers
Frank

Attachments: [fCurveLinker.png](https://www.cheetah3d.com/forum/index.php?attachments/29951/)

## #54 — Martin — 2016-12-10
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-104399>

Hi,
I've introduced a bug in Beta 18 which causes problems with parameter names which contain a dot. I've already fixed that problem and it will work properly in Beta 19 again.

@crgreen. Could you send me another crashlog with an example scene? 

Bye
Martin

## #55 — crgreen — 2016-12-14
<https://www.cheetah3d.com/forum/index.php?threads/8338/post-104461>

The good captain (Martin) has enlightened me on this render bug, which is a script problem. The solution is really a simple rule, but the problem (at least my experience with it) will most likely be made moot by a script included in a future release of v7. But I suppose it might be a good idea to mention a simple but essential rule when using the setParameter method in Cheetah's JS API ... 
Just to share with other script-makers:

[[QUOTE:  You are using the setParameter() function within the buildObject() function-hook like this: 
```
scriptParent.setParameter("rotation", new Vec3D(v, p.y, p.z) );
```
 but that causes a recursive hang since the setParameter() function will trigger a re-build of th]]
Thanks again to all who helped bring attention to this. I'm so happy with Cheetah v7 (especially since I have my motion blur back! :redface: )
