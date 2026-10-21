# Cracker.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12264/
- Subforum: script-downloads
- Started by **tg_jp** on 2017-01-26; last post 2019-09-07; 28 posts

## #1 — tg_jp — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105575>

Cracker.js

Hello

It's a tool script to destroy polygon object. only v7+.

download: http://tres-graficos.jp/blog/files/article.php?id=118

demo: https://youtu.be/1fTVJUir7Kc

Best

tg_jp, Hiroto

Links: http://tres-graficos.jp/blog/files/article.php?id=118, https://youtu.be/1fTVJUir7Kc

## #2 — ZooHead — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105576>

Thanks Hiroto, I think this one will be very popular. 
​

## #3 — frank beckmann — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105579>

Many thanks Hiroto. Amazing script. Works great. :icon_thumbup: :icon_thumbup: 
Many greetings to the homeland of ゴジラ.  

Cheers
Frank

## #4 — bobziila — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105589>

Thanks, Hiroto! Nice job!

Bob

## #5 — pegot — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105605>

Been wanting to do this in Cheetah forever! Thank you so much Hiroto - an amazing and useful and FUN script.

## #6 — misoversaturated — 2017-01-26
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105619>

Big Thanks for this awesome stuff!!

GIF animation

Links: https://www.dropbox.com/s/mne8lknjvz3dp9i/smash.gif?dl=0

## #7 — Albert — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105625>

Very Nice Job!!

## #8 — pegot — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105626>

Can anyone help explain how to use the crack point settings?  Also, what is the difference between crack type random and point random?

## #9 — misoversaturated — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105627>

crack pot research

After some testing I found that a "crack origin" can be defined when point random is selected and the point values are set to be located on the surface of the object (works on an edge too, but not at a vertex position).

Because the cracking does not happen automatically in the course of a physics simulation, it has to be calculated in advance and here the possibility to define a point of impact definitely comes handy.

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

Attachments: [screenshot.png](https://www.cheetah3d.com/forum/index.php?attachments/30381/), [centercrack.gif](https://www.cheetah3d.com/forum/index.php?attachments/30382/)

## #10 — tg_jp — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105629>

Hi all

thank you for testing.

pieces: count of cracked polygon count
crack type:
    random -> script will divide polygon with random plane at random point
    regular -> script divide polygon at exact half of polygon
    point random -> script will divide polygon with random plane at 'crack point'
crack size var.(variation): 
    each piece size variation [0 - 1], only affect random and regular of crack type.

Best

tg_jp, Hiroto

## #11 — misoversaturated — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105630>

Thanks Hiroto for the clarification!

Indeed the "crack point" works inside too.

Attachments: [screenshot.png](https://www.cheetah3d.com/forum/index.php?attachments/30383/)

## #12 — pegot — 2017-01-27
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105633>

[[QUOTE:  misoversaturated said: After some testing I found that a "crack origin" can be defined when point random is selected and the point values are set to be located on the surface of the object (works on ]]
Thanks misoversaturated.  And thanks again Hiroto. Now I feel I can use this great script to its full advantage.

## #13 — crgreen — 2017-01-30
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105702>

'burned' pivot?

Hi, Hiroto. Splendid script.
I've noticed there's a strange (?) behavior that is related to how you are setting the pivot points in the script. It seems that, even though the pivots are reset, they aren't "burned". I'm wondering if you can add a checkbox option for "burn pivots". If I'm not being clear about this or am missing something, I'll try to post a video explaining it.
A little more clarification:
I mentioned on the forum that, previous to the accessibility of "Cracker", I used Blender to "Cell Fracture" objects then re-import them into C3D and use a script that I hacked from the "center of gravity" script (I made it do multiple objects). If I try to do anything with the pivots after using Cracker, things get weird (the pivots are off). But if I use the "Coord System"'s "Burn pivot point" after using Cracker, I can then set the pivots to whatever.
Does this make sense?

Thanks again. Donation coming...

-cg

## #14 — tg_jp — 2017-01-30
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105703>

Hi cg

thank you for testing and donation.  

I will fix this problem for next version.

Best

tg_jp, Hiroto

## #15 — crgreen — 2017-01-30
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105706>

:icon_thumbup:
Thanks a ton!

## #16 — llamapixel — 2017-02-03
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105776>

<3

I love you for this

## #17 — tg_jp — 2017-02-09
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-105876>

Hello, 

I have updated this script.

demo1: https://www.youtube.com/watch?v=vAYZOrXvL_E
demo2: https://youtu.be/QcTt3_lNAz4

I added "point weight" mode for cracking and changed random to fake random ( same seed value creates same result )

Best.

tg_jp, Hiroto

Links: https://www.youtube.com/watch?v=vAYZOrXvL_E, https://youtu.be/QcTt3_lNAz4

## #18 — frank beckmann — 2017-04-15
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-106991>

Hi Hiroto.
Is the script able to keep more than 1 texture of an fractured object?
I have an hull kind of object with an inner+outer texture and after the cracker-script just the first "all" texture assignment shows up - though 2 assignments ("all" and "1") are still there. Any idea?
Thanks for your time.

Cheers
Frank

## #19 — Chocron — 2017-05-15
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-107525>

Cracker trouble

Hi! 

I am am trying to follow the demo, but it seems I can't select the object I want to crack and the tool in order to "apply" at the same time. Is this a problem with the 7 beta or the script? My version doesn't look like Hiroto's demo (my Cheetah is 7.0b17). Ultimately it freezes. Please help! : )

Thanks!

David

## #20 — frank beckmann — 2017-05-15
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-107526>

Hi David.
We´re up to beta 23 right now - but the script does work in beta17.
What are your steps exactly? It´s really just selecting an object - calling the script - adjust and hit apply.

Cheers
Frank

## #21 — Chocron — 2017-05-15
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-107535>

Hi Frank,
I do as the demo says: I make an object (a box), I call the Cracker script, and then I'm stuck because the tool doesn't stay in the tool pane while I select the box, so it's impossible to hit the select button. Well, I can hit it of course, but there is no effect. And after that it usually freezes. 

I upgraded to the b23, but this doesn't help.

As you notice from the attached screen shots "Polygon script" shows up in the objects list and not as a tool when the box is selected. Strange, no?

Help is appreciated as this is the exact effect I'm looking for : )

Thanks so much!

David

Attachments: [Screen Shot 2017-05-15 at 23.28.23.png](https://www.cheetah3d.com/forum/index.php?attachments/31066/), [Screen Shot 2017-05-15 at 23.28.48.png](https://www.cheetah3d.com/forum/index.php?attachments/31067/)

## #22 — ZooHead — 2017-05-16
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-107536>

Hi David, looks like you have the script in the wrong folder, 
it's a tool script so it goes in the tool folder. Works fine here. 
​

## #23 — frank beckmann — 2017-05-16
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-107538>

Yup!

Cheers
Frank

Attachments: [ToolScript.png](https://www.cheetah3d.com/forum/index.php?attachments/31068/)

## #24 — Chocron — 2017-05-16
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-107539>

Exactly! Which is why it now works perfectly.  Sorry for the obvious mistake, this was my first venture into scripts. 

Thanks so much for your rapid responses!

Best regards,

David

## #25 — joel ruiz c — 2019-09-07
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-117396>

Is this script still working?

## #26 — frank beckmann — 2019-09-07
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-117397>

Yes:

		
	

Cheers
Frank

## #27 — joel ruiz c — 2019-09-07
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-117398>

Thanks, I was having issues cracking the pig (that sounds funny), so I used my lever and it works fine (that sounds weird)

Attachments: [lever-break.jpg](https://www.cheetah3d.com/forum/index.php?attachments/34709/)

## #28 — frank beckmann — 2019-09-07
<https://www.cheetah3d.com/forum/index.php?threads/12264/post-117399>

That´s probably because the Pig mesh isn´t watertight; check with cmd+I when selected.

Cheers
Frank
