# Extruded Text Maker.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6801/
- Subforum: script-downloads
- Started by **tg_jp** on 2011-01-21; last post 2011-05-25; 24 posts

## #1 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54811>

Extruded Text Maker.js

Hello

it's a Tool script by user's request, to make extuded text spline object automatically.

to use, place it into ~/Library/Application Support/Cheetah3D/scripts/Tool folder.

you can modify font name list at line 15 in script. you have to use Post script name as you can check it wth Font Book.app.

please try it.

fixed spacing bug: please update attached file.
fixed crush bug: please update attached file again.
fixed relative spacing bug: please update attached file again.
random option added: please update attached file again.

20110524b: fixed crush bug with wrong adding parameter (again).

regards.

tg_jp, Hiroto.

Attachments: [Extruded Text Maker.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/14790/)

## #2 — bartelsmedia — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54813>

tg-San, this is awesome and very smart parameter design. This script will really help a lot. Thank you!

I hesitate to ask as it is just a minor issue and not fault of the script: The position shift is static while letters have individual widths ("kerning"). I don't know whether it could be a solution to convert the letter objects into polygon objects and then define the overlap of the letters?! Just a thought....

Thanks again for your time.

Attachments: [thankyou.png](https://www.cheetah3d.com/forum/index.php?attachments/13662/), [settings.png](https://www.cheetah3d.com/forum/index.php?attachments/13663/)

## #3 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54817>

hello

I've just found a spacing bug, and have fixed it. and I add a new option 'relative spacing' due to your suggestion. For overlaps of objects, check this option and set negative value for spacing x/y/z . Thanks for comments.  

I update 
regards.

tg_jp, Hiroto.

## #4 — frank beckmann — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54818>

Great ideas included in a great script. :icon_thumbup: 
Unfortunately it crashes under Leopard for me.
I attached the crash report. If there´s no easy fix leave it as it is - please.
Thank you!

Cheers
Frank

Attachments: [crashReport.rtf.zip](https://www.cheetah3d.com/forum/index.php?attachments/13665/)

## #5 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54822>

Hi, Frank.

thank you for reporting. I updated it, so please check it.

I didn't check it with Leopard, but I think option counts of font name selector may cause this crush problem, so I reduced font name option counts. your crsh report file helped a lot. thanks.

regards.

tg_jp, Hiroto.

## #6 — frank beckmann — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54825>

[[QUOTE:  tg_jp said: your crsh report file helped a lot. thanks. Click to expand... ]]
So then you can have another one: :mrgreen:  It still crashes - could be my Mac - so no worries. Thanks for all your effort. :icon_thumbup: 
Please leave it as it works under SnowLeopard.

Cheers
Frank

Attachments: [crashReport2.rtf.zip](https://www.cheetah3d.com/forum/index.php?attachments/13667/)

## #7 — SurfingAlien — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54827>

[[QUOTE:  frank beckmann said: So then you can have another one: :mrgreen: It still crashes - could be my Mac - so no worries. Thanks for all your effort. :icon_thumbup: Please leave it as it works under SnowL]]

are you sure it isn't mother Apple that wants you to upgrade and join the AppStore...  :tongue: 

cheers,
A

## #8 — frank beckmann — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54828>

[[QUOTE:  SurfingAlien said: are you sure it isn't mother Apple that wants you to upgrade and join the AppStore... :tongue: cheers, A Click to expand... ]]
For sure - but I´m still in "fond raising mode" - so Apple has to have to wait in line. 

Cheers
Frank

## #9 — bartelsmedia — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54839>

Thank you. It is much better now.

Just one last thing. What would you think about making the overlap proportional to the width of the respective letter.

At the moment, the overlap for the narrow letter "I" is too much while it is only a little overlap for the broad letter "M".

Example:

Attachments: [test.png](https://www.cheetah3d.com/forum/index.php?attachments/13668/)

## #10 — SurfingAlien — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54842>

what about some random overlap/rotation?

BTW, another great one Hiroto!

## #11 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54843>

Hi

thank you for testing. that's a bug. now I am fixing it. so I will update it as soon as possible.  

regards.

tg_jp, Hiroto.

## #12 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54848>

hi all

I have just fixed relative spacing bug. and adding relative spacing axis option.
so, please update it again.

> bartelsmedia

the latest version, it will work as you expected. if you have some problem, please let me know it.

> Frank

I checked it with 5.6 on Leopard. but it didn't recreate that bug, it work properly. which version of Cheetah3D you are using on Leopard?

> A

hi. ok. I will add. 

regards.

tg_jp

## #13 — bartelsmedia — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54851>

rel spacing works much better now, a big thank you for that!

I only don't understand "rel spacing axis". Why does it shift letters on the y-axis if I set y-spacing to 0? How can it shift if the multiplier is zero?

--

What do you think about the idea to shift relatively to the width of a letter? Would it not solve the problem with lean letters like "I"?

Anyway, I can also tweak the kerning manually. The script is an amazing help already as it is. Thank you very much!

--

P.S.: What would be the benefit of a random shift?? I have to admit that I have no idea for what it could be useful?! ;-)

Attachments: [test.png](https://www.cheetah3d.com/forum/index.php?attachments/13672/), [test_para.png](https://www.cheetah3d.com/forum/index.php?attachments/13673/)

## #14 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54854>

hi,

[[QUOTE:  bartelsmedia said: rel spacing works much better now, a big thank you for that! I only don't understand "rel spacing axis". Why does it shift letters on the y-axis if I set y-spacing to 0? How can it]]

thank you for testing. 'rel spacing axis' is defining certain axis that each character should be shifted at. script calculates position of each character by this parameter with its size( with/height/depth ) and spacing x/y/z parameters separately.

I think in your case, you just set 'x' for rel spacing axis and negative spacing_x value for overlap.

[[QUOTE:  bartelsmedia said: What do you think about the idea to shift relatively to the width of a letter? Would it not solve the problem with lean letters like "I"? Anyway, I can also tweak the kerning manua]]

yes, I think it's solved that letter 'I' spacing problem with latest verison. no? random stuff is just option. it may not need it in your case though.

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3D_sz_002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13674/)

## #15 — bartelsmedia — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54856>

Thanks for the clarification.

I believe the proportional spacing would have a merit if the rel x-spacing is about -0.2 but as said, it is not that necessary. Thank you for all your help!

## #16 — bartelsmedia — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54857>

Is it possible that you forgot to upload the latest script version? 

In your screenshot there are the random variation parameters but I can't find them in the downloadable version.

## #17 — tg_jp — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54859>

hi

[[QUOTE:  bartelsmedia said: Is it possible that you forgot to upload the latest script version? In your screenshot there are the random variation parameters but I can't find them in the downloadable version. ]]

I have just updated now. please update it again.

regards.

tg_jp

## #18 — frank beckmann — 2011-01-21
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-54867>

[[QUOTE:  tg_jp said: > Frank I checked it with 5.6 on Leopard. but it didn't recreate that bug, it work properly. which version of Cheetah3D you are using on Leopard? Click to expand... ]]
Latest build each Cheetah and Leopard. It still crashes so it has to be my machine -  don´t know the reason but I won´t investigate any further as I give up trying to understand my crap Mac. Thanks for all.:icon_thumbup: 

Bye
Frank

## #19 — Andreu — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-60042>

Sorry to say that this script (latest version) has been crashing upon selecting it from the script menu. I'm using C3D 5.7, MacBook 2Ghz Intel Core Duo, 32bit, OSX 10.6.6.

## #20 — frank beckmann — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-60043>

Still true under Leopard.
Crash report attached.

Cheers
Frank

Attachments: [CrashReport24052011.rtf.zip](https://www.cheetah3d.com/forum/index.php?attachments/14788/)

## #21 — tg_jp — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-60044>

hi, thank you for reporting.

I fixed that bug. please download from the first post of this thread, and replace it.
:smile: 

regards.

tg_jp, Hiroto.

## #22 — frank beckmann — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-60046>

Still crashes  - but that´s maybe my machine. :redface: 

Cheers
Frank

## #23 — Andreu — 2011-05-24
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-60047>

Damn, sorry it still crashes  I've sent you a crash report.

## #24 — tg_jp — 2011-05-25
<https://www.cheetah3d.com/forum/index.php?threads/6801/post-60082>

hi

I have updated. please download from the top post of this thread. 

tg_jp, Hiroto.
