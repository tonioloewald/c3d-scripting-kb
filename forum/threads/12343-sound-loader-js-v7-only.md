# Sound Loader.js - v7+ only

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12343/
- Subforum: script-downloads
- Started by **tg_jp** on 2017-03-15; last post 2025-07-18; 26 posts

## #1 — tg_jp — 2017-03-15
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106359>

Sound Loader.js - v7+ only

Hello,

It's a polygon script to load sound data as f-curve parameters. it's available for Cheetah3D v7+.

http://tres-graficos.jp/blog/files/article.php?id=119

you can load various sound format ( "aac", "ac3", "aif", "aiff", "aifc", "caf", "mp3", "mp4", "m4a", "wav", "mov" ).

resolution: resolution count in 1 sec.
sound left: left sound
sound right: right sound ( if it's mono, it will be 0 )
sound wave: custom f-curve value for control

[UPDATE] 20170401: sound file path escape bug fixed.

Best

tg_jp, Hiroto

Attachments: [c3d_soundloader_ss_20170315.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30601/)

Links: http://tres-graficos.jp/blog/files/article.php?id=119

## #2 — frank beckmann — 2017-03-15
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106367>

One word: Awesome!
Thank you very much.

Cheers
Frank

## #3 — CpH — 2017-03-25
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106567>

Hiroto,
The "Sound Loader Helper" Unix executable isn't completing the import of any sound file I've attempted in C3D 7.b21...  
Here's my Terminal Log below:

Last login: Sun Mar 19 11:09:31 on console
You have new mail.
/Users/CpH/Library/Application\ Support/Cheetah3D/Scripts/Polygonobj/Sound\ Loader/Sound\ Loader\ Helper ; exit;
CpH-MacBookPro:~ CpH$ /Users/CpH/Library/Application\ Support/Cheetah3D/Scripts/Polygonobj/Sound\ Loader/Sound\ Loader\ Helper ; exit;
2017-03-25 09:38:29.366 Sound Loader Helper[20836:4907641] resolution: 30, sound: /Users/tg/Desktop/soundFiles/dog.mp3, data: /tmp/soundLoader.data
2017-03-25 09:38:29.375 Sound Loader Helper[20836:4907650] failed
2017-03-25 09:38:29.375 Sound Loader Helper[20836:4907641] analyze finished.
logout
Saving session...
...copying shared history...
...saving history...truncating history files...
...completed.
Deleting expired sessions...13 completed.
_______________________________________________________________
Activity Monitor shows it running at upwards of 100% CPU but it never finished importing any audio files in none of its supported formats.  Always have to Force Quit.

Attachments: [SND_Loader Helper.png](https://www.cheetah3d.com/forum/index.php?attachments/30676/)

## #4 — tg_jp — 2017-03-29
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106628>

Hi,

Thank you for your testing.

Which OS version of your Mac? ( this script works 10.7+ )

Can you show me console log when you use it from Cheetah3D?

Best.

tg_jp, Hiroto

## #5 — CpH — 2017-03-29
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106632>

[[QUOTE:  tg_jp said: Hi, Thank you for your testing. Which OS version of your Mac? ( this script works 10.7+ ) Can you show me console log when you use it from Cheetah3D? Best. tg_jp, Hiroto Click to expand..]]

Hi, I'm on macOS 10.12.3

Short Console Log shows: Responsible:     systemsoundserverd [290]
  Thread 0x523              Thread name "SystemSoundServer"                     18 samples (1-18)         priority 61 (base 61)
Process:         Sound Loader Helper [6912]
Path:            /Users/USER/Library/Application Support/Cheetah3D/*/Sound Loader Helper
    1   main + 779 (Sound Loader Helper + 11883) [0x102a1fe6b] (running) 2
    1   main + 779 (Sound Loader Helper + 11883) [0x102a1fe6b] (running) 4
    1   main + 776 (Sound Loader Helper + 11880) [0x102a1fe68] 5
      1   -[TGSoundHelper isFinished] + 4 (Sound Loader Helper + 10564) [0x102a1f944] (running) 5
    1   main + 768 (Sound Loader Helper + 11872) [0x102a1fe60] (running) 6
    1   main + 776 (Sound Loader Helper + 11880) [0x102a1fe68] 7
      1   -[TGSoundHelper isFinished] + 4 (Sound Loader Helper + 10564) [0x102a1f944] (running) 7
    1   main + 776 (Sound Loader Helper + 11880) [0x102a1fe68] 17
      1   -[TGSoundHelper isFinished] + 12 (Sound Loader Helper + 10572) [0x102a1f94c] (running) 17
           0x102a1d000 -        0x102a22fff  Sound Loader Helper (0) <D97E7DA8-05AF-3BBA-AE72-124355820671>  /Users/USER/Library/Application Support/Cheetah3D/*/Sound Loader Helper
Process:         systemsoundserverd [290]
Path:            /usr/sbin/systemsoundserverd
           0x10c481000 -        0x10c4a2fff  systemsoundserverd (892.2.13)      <9FC7A6A1-8E18-3CFA-9845-FAA5A3B8AD84>  /usr/sbin/systemsoundserverd​Full report is available via this download link...
	
	


```
https://www.dropbox.com/s/u1i1ezkv6ygt1ho/Cheetah3D_2017-03-28-193535_CpH-MacBookPro.hang.txt?dl=0
```

## #6 — tg_jp — 2017-03-29
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106634>

Hi,

thank you for reporting.

1. please try to run helper binary (Sound Helper Loader) with double clicking.
2. after clicking, Terminal.app will be opened, and show some messages, then quit.

	
	


```
2017-03-29 16:50:35.081 Sound Loader Helper[12572:1490091] resolution: 4, sound: /Users/tg/Desktop/test.mp3, data: /tmp/soundLoader.data
2017-03-29 16:50:35.099 Sound Loader Helper[12572:1490100] failed
2017-03-29 16:50:35.099 Sound Loader Helper[12572:1490100] duration: 0.000000
2017-03-29 16:50:35.099 Sound Loader Helper[12572:1490100] tracks: (
)
logout
Saving session...
...copying shared history...
...saving history...truncating history files...
...completed.
Deleting expired sessions...18 completed.
```


if you see different messages, it doesn't work correctly. maybe some permission missing on 10.12.x. 

ADD: https://www.tekrevue.com/tip/gatekeeper-macos-sierra/
on macOS Sierra, required adding gatekeeper permission at first time.

Best

tg_jp, Hiroto

Links: https://www.tekrevue.com/tip/gatekeeper-macos-sierra/

## #7 — CpH — 2017-03-30
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106648>

Hi Hiroto,

Attempted correcting launch permissions via Gatekeeper, Firewall(added Sound Loader Helper & C3D to Advanced settings "allow all incoming connections"), added to the Sound Loader Helper executable Get info owners to run as system admin but still fail to import any audio into C3D.

I've noticed when launching into Terminal there is a directory listed that's not available on my MBP, that reads:

"sound: /Users/tg/Desktop/soundFiles/dog.mp3, data: /tmp/soundLoader.data"

It appears to be a directory from your workstation that's looking for a dog.mp3 & temp data from the drives hidden tmp folder called soundLoader.data...
Last effort I attempted to fool the sound loader by renaming an mp3 as "dog.mp3" in hopes that it would self correct it's internal cache but no win there either.

So how do I correct it on my end so the Sound Loader Helper unix executable can open without looking for those files without disabling Gatekeeper?

## #8 — tg_jp — 2017-03-30
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106658>

Hi,

thank you for reporting.

dog.mp3 is not required, that file will be loaded just in case standalone mode ( directly clicking Sound Loader Helper excecutables ).

How about logs on Console.log app when script loads sound file on Cheetah3D?

Best

tg_jp, Hiroto

## #9 — CpH — 2017-03-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106661>

Hello, here's a copy of the Console Log (Only yields spinning rainbow in C3D Open File Window after selecting a sound file to import.  It never reads-in any audio sound files after clicking import button & the C3D file window stays open without ever receiving a response from the Sound Loader):

	
	


```
Process:         Sound Loader Helper [6912]
Path:            /Users/USER/Library/Application Support/Cheetah3D/*/Sound Loader Helper
Architecture:    x86_64
Parent:          Cheetah3D [6835]
Responsible:     Cheetah3D [6835]
UID:             501
Task size:       11 MB
CPU Time:        1.693

  Thread 0x39db2            DispatchQueue 1           18 samples (1-18)         priority 31 (base 31)     cpu time 1.693
  <thread QoS default (requested user interactive), process unclamped, IO tier 0>
  18  start + 1 (libdyld.dylib + 21077) [0x7fff94472255] 1-18
    1   objc_msgSend + 46 (libobjc.A.dylib + 27502) [0x7fff93b82b6e] (running) 1
    1   main + 779 (Sound Loader Helper + 11883) [0x102a1fe6b] (running) 2
    1   objc_msgSend + 46 (libobjc.A.dylib + 27502) [0x7fff93b82b6e] (running) 3
    1   main + 779 (Sound Loader Helper + 11883) [0x102a1fe6b] (running) 4
    1   main + 776 (Sound Loader Helper + 11880) [0x102a1fe68] 5
      1   -[TGSoundHelper isFinished] + 4 (Sound Loader Helper + 10564) [0x102a1f944] (running) 5
    1   main + 768 (Sound Loader Helper + 11872) [0x102a1fe60] (running) 6
    1   main + 776 (Sound Loader Helper + 11880) [0x102a1fe68] 7
      1   -[TGSoundHelper isFinished] + 4 (Sound Loader Helper + 10564) [0x102a1f944] (running) 7
    1   objc_msgSend + 46 (libobjc.A.dylib + 27502) [0x7fff93b82b6e] (running) 8
    1   objc_msgSend + 33 (libobjc.A.dylib + 27489) [0x7fff93b82b61] (running) 9
    6   objc_msgSend + 46 (libobjc.A.dylib + 27502) [0x7fff93b82b6e] (running) 10-15
    1   objc_msgSend + 26 (libobjc.A.dylib + 27482) [0x7fff93b82b5a] (running) 16
    1   main + 776 (Sound Loader Helper + 11880) [0x102a1fe68] 17
      1   -[TGSoundHelper isFinished] + 12 (Sound Loader Helper + 10572) [0x102a1f94c] (running) 17
    1   objc_msgSend + 46 (libobjc.A.dylib + 27502) [0x7fff93b82b6e] (running) 18

  Binary Images:
           0x102a1d000 -        0x102a22fff  Sound Loader Helper (0) <D97E7DA8-05AF-3BBA-AE72-124355820671>  /Users/USER/Library/Application Support/Cheetah3D/*/Sound Loader Helper
        0x7fff93b7c000 -     0x7fff93f51fff  libobjc.A.dylib (706)   <47104A1B-13E8-369F-BC36-27FF465809FD>  /usr/lib/libobjc.A.dylib
        0x7fff9446d000 -     0x7fff94472fff  libdyld.dylib (421.2)   <6F506653-FFF6-3DB8-84F1-109AE3C52F32>  /usr/lib/system/libdyld.dylib

Sampling process 6912 for 3 seconds with 1 millisecond of run time between samples
Sampling completed, processing symbols...
Analysis of sampling Sound Loader Helper (pid 6912) every 1 millisecond
Process:         Sound Loader Helper [6912]
Path:            /Users/CpH/Library/Application Support/Cheetah3D/Scripts/Polygonobj/Sound Loader/Sound Loader Helper
Load Address:    0x102a1d000
Identifier:      Sound Loader Helper
Version:         0
Code Type:       X86-64
Parent Process:  ??? [1]

Date/Time:       2017-03-28 19:36:26.279 -1000
Launch Time:     2017-03-28 19:29:08.505 -1000
OS Version:      Mac OS X 10.12.3 (16D32)
Report Version:  7
Analysis Tool:   /usr/bin/sample
----

Call graph:
    2771 Thread_236978   DispatchQueue_1: com.apple.main-thread  (serial)
      2771 start  (in libdyld.dylib) + 1  [0x7fff94472255]
        2280 main  (in Sound Loader Helper) + 776  [0x102a1fe68]
        + 1758 objc_msgSend  (in libobjc.A.dylib) + 46,0,...  [0x7fff93b82b6e,0x7fff93b82b40,...]
        + 522 -[TGSoundHelper isFinished]  (in Sound Loader Helper) + 23,4,...  [0x102a1f957,0x102a1f944,...]
        489 main  (in Sound Loader Helper) + 779,768,...  [0x102a1fe6b,0x102a1fe60,...]
        2 DYLD-STUB$$objc_msgSend  (in Sound Loader Helper) + 0  [0x102a21fb6]

Total number in stack (recursive counted multiple, when >=5):

Sort by top of stack, same collapsed (when >= 5):
        objc_msgSend  (in libobjc.A.dylib)        1758
        -[TGSoundHelper isFinished]  (in Sound Loader Helper)        522
        main  (in Sound Loader Helper)        489

Binary Images:
       0x102a1d000 -        0x102a22fff +Sound Loader Helper (0) <D97E7DA8-05AF-3BBA-AE72-124355820671> /Users/CpH/Library/Application Support/Cheetah3D/Scripts/Polygonobj/Sound Loader/Sound Loader Helper
```

## #10 — tg_jp — 2017-03-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106683>

Hi

thank you for your information, but I want to know just a few lines on Console.log ( all messages ).

It shows sound file path and analysis result.

Best

tg_jp, Hiroto

Attachments: [consoleLog_soundLoader.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30713/)

## #11 — tg_jp — 2017-04-02
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106710>

Hi,

thank you for reporting,  I found a bug when sound file path contains * character. I have updated it. please replace it the latest version.

Best

tg_jp, Hiroto.

## #12 — CpH — 2017-04-02
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-106714>

Sound Loader updated version 20170401 fixed the import issues I've been experiencing.

Thanks for all your support, this is outstanding!

## #13 — Angry Alex — 2018-10-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114026>

Doesn't work for me, would love to have this feature ....

## #14 — frank beckmann — 2018-10-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114028>

Pretty sure you put the script in the wrong place.
I believe it still works as it loads sound files - but as soon as I enable the f-Curve-controller tag script Cheetah3d crashes instantly every time.
So maybe Hiroto might want to have a look into it.

		
	
Cheers
Frank

## #15 — Angry Alex — 2018-10-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114029>

Hi Frank, thank you for your answer, were's the proper place to place it?

## #16 — frank beckmann — 2018-10-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114030>

It´s a polygon-script with an accompanying "Sound Loader Helper" file put in HD/users/User/Library/Application Support/Cheetah3d/Scripts/Polygonobj

Cheers
Frank

## #17 — Angry Alex — 2018-10-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114031>

Got it. Same issue, C3D crashes when loading the mp3.

## #18 — frank beckmann — 2018-10-31
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114033>

It seems you might have not the latest version as I can load .mp3 files - see screenshot.
And I found an old file which still works. Should not crash though of course. 

		
	
Sorry for the lousy GIF quality.

Cheers
Frank

## #19 — Angry Alex — 2018-11-01
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114042>

Hey Frank, I got the latest version direct from his page. It's "Sound_Loader_20170401.zip". Can't load MP3's. Cheetah crashes ...

Links: http://www.tres-graficos.jp/blog/files/dl.php?id=119

## #20 — frank beckmann — 2018-11-01
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114043>

Not sure how I can help any further as I got it running after updating to that latest version. If you´re on Mojave already it´s maybe about the "permission thing" Hiroto mentioned in his reply N°6.

Cheers
Frank

## #21 — Angry Alex — 2018-11-01
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-114044>

Yes it looks like. I am on 10.14 already, couldn't get it work properly. Nevertheless, many thanks.

## #22 — Chocron — 2019-02-03
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-115198>

Hi! This is (potentially) such an awesome tool, but I don't get the basic workflow. Sorry. Can someone please just give a quick rundown of the steps to make this work. And also any other limitations (length of sound, etc) For me nothing is happening - but hope it will someday! : )

Cheers!

David

## #23 — frank beckmann — 2019-02-04
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-115206>

In essence you put the two scripts (Sound Loader Helper, Sound Loader.js) in to the Polygonobj-folder and need the additional F-Curve Controller tag script.
Call the Sound Loader script from Tools->Script->Polygon Script and load a sound file via "load".
Add the F-Curve Controller tag script to the sound loader from Tools->Script->Tag Script.
Now one can tell how the wave form (now f-curves) should modify the target object via different available parameters - in the end you´ ll bake the f-curve data to the target object and have an animated object driven by sound. That´s the theory.
I can´ t get it to run right now and my file from Nov. last year didn´ t seem to work anymore.
So I´ m a bit clueless how to get this workflow to run properly.

Cheers
Frank

## #24 — uncle808us — 2025-06-01
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-129041>

[[QUOTE:  frank beckmann said: In essence you put the two scripts (Sound Loader Helper, Sound Loader.js) in to the Polygonobj-folder and need the additional F-Curve Controller tag script. Call the Sound Loader]]
Hi Frank I wanted to have some music in my animation file to sync the guitar players hands to the music as a guide. I  installed the Sound loader helper and sound loader.js as told. I have the sound file loaded (I see it in the F curve editor.) I don't hear anything when I hit play. any idea why?
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

## #25 — frank beckmann — 2025-06-01
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-129042>

As far as I know Cheetah3D don´t support sound otherwise I would expect that movie textures contain the sound channel in rendered animation movie file which is not the case.

## #26 — gemat — 2025-07-18
<https://www.cheetah3d.com/forum/index.php?threads/12343/post-129215>

[[QUOTE:  uncle808us said: Hi Frank I wanted to have some music in my animation file to sync the guitar players hands to the music game as a guide. I installed the Sound loader helper and sound loader.js as to]]
Had the same issue try playing from the very start or scrubbing the timeline a bit. Also check if audio is muted in the settings.
