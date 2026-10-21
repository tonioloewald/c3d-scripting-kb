# Script crashes cheetah3d 6.2.1

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10731/
- Subforum: scripting-general
- Started by **joocoo** on 2014-10-02; last post 2014-10-04; 12 posts

## #1 — joocoo — 2014-10-02
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90602>

Script crashes cheetah3d 6.2.1

Hello,

Running cheetah3d 6.2.1 on MacBook Pro running OS 10.9.1

I installed a script but when I go to use it cheetah3d crashes. I see  post on the forum and it seems that others have got it to work: http://www.cheetah3d.com/forum/showthread.php?t=8339

The script was downloaded from here:

http://www.tres-graficos.jp/blog/fil...icle.php?id=84

It's F-Curve Utility.js .... it looks super super useful and would solve tons of problems but it doesn't seem to work.

I tried posting the script itself here but the forum didn't like the length ...

Here is the error dump:

"
Process:         Cheetah3D [10064]
Path:            /Applications/Cheetah3D 6.2.1/Cheetah3D.app/Contents/MacOS/Cheetah3D
Identifier:      de.wengenmayer.Cheetah3D
Version:         6.2.1 (6.2.1)
Code Type:       X86-64 (Native)
Parent Process:  launchd [152]
Responsible:     Cheetah3D [10064]
User ID:         502

Date/Time:       2014-10-01 22:16:42.216 -0700
OS Version:      Mac OS X 10.9.1 (13B42)
Report Version:  11
Anonymous UUID:  290F122E-A990-B2D9-883E-531EB4C2F72B

Sleep/Wake UUID: FD99E537-D30A-41BB-A181-EEFFA18473A5

Crashed Thread:  0  Dispatch queue: com.apple.main-thread

Exception Type:  EXC_BAD_ACCESS (SIGSEGV)
Exception Codes: KERN_INVALID_ADDRESS at 0x0000000000000000

VM Regions Near 0:
--> 
    __TEXT                 0000000100000000-00000001000be000 [  760K]  r-x/rwx SM=COW  /Applications/Cheetah3D  6.2.1/Cheetah3D.app/Contents/MacOS/Cheetah3D

Application Specific Information:
Performing @selector(browserMenuAction from sender NSMenuItem 0x6080000be780

Thread 0 Crashed:: Dispatch queue: com.apple.main-thread
0   com.apple.CoreFoundation          0x00007fff90f27e4f CFStringGetLength + 15
1   com.apple.JavaScriptCore          0x00007fff90781373 JSStringCreateWithCFString + 51
2   de.wengenmayer.MWM                0x00000001002e3014 -[MWMSFEngine loadScript] + 564
3   de.wengenmayer.MWM                0x0000000100216de9 -[MWMBaseObject loadScript:] + 713
4   de.wengenmayer.Cheetah3D          0x0000000100011c46 -[MyDocument performScript:] + 454
5   com.apple.AppKit                  0x00007fff91ee73d0 -[NSApplication sendAction:to:from:] + 327
6   com.apple.AppKit                  0x00007fff91f02348 -[NSMenuItem _corePerformAction] + 394
7   com.apple.AppKit                  0x00007fff91f02084 -[NSCarbonMenuImpl performActionWithHighlightingForItemAtIndex:] + 117
8   com.apple.AppKit                  0x00007fff91f514dd -[NSMenu _internalPerformActionForItemAtIndex:] + 35
9   com.apple.AppKit                  0x00007fff91f51359 -[NSCarbonMenuImpl _carbonCommandProcessEvent:handlerCallRef:] + 104
10  com.apple.AppKit                  0x00007fff91ef8176 NSSLMMenuEventHandler + 716
11  com.apple.HIToolbox               0x00007fff976516d4  DispatchEventToHandlers(EventTargetRec*, OpaqueEventRef*,  HandlerCallRec*) + 892
12  com.apple.HIToolbox               0x00007fff97650c87  SendEventToEventTargetInternal(OpaqueEventRef*, OpaqueEventTargetRef*,  HandlerCallRec*) + 385
13  com.apple.HIToolbox               0x00007fff97664d90 SendEventToEventTarget + 40
14  com.apple.HIToolbox               0x00007fff9769aa30  SendHICommandEvent(unsigned int, HICommand const*, unsigned int,  unsigned int, unsigned char, void const*, OpaqueEventTargetRef*,  OpaqueEventTargetRef*, OpaqueEventRef**) + 420
15  com.apple.HIToolbox               0x00007fff976cd618 SendMenuCommandWithContextAndModifiers + 59
16  com.apple.HIToolbox               0x00007fff976cd5c4 SendMenuItemSelectedEvent + 178
17  com.apple.HIToolbox               0x00007fff976cd4a5 FinishMenuSelection(SelectionData*, MenuResult*, MenuResult*) + 94
18  com.apple.HIToolbox               0x00007fff976d5425  MenuSelectCore(MenuData*, Point, double, unsigned int, OpaqueMenuRef**,  unsigned short*) + 718
19  com.apple.HIToolbox               0x00007fff976d5051 _HandleMenuSelection2 + 446
20  com.apple.AppKit                  0x00007fff91e6a79c _NSHandleCarbonMenuEvent + 284
21  com.apple.AppKit                  0x00007fff91cc956e _DPSNextEvent + 2170
22  com.apple.AppKit                  0x00007fff91cc88db -[NSApplication nextEventMatchingMask:untilDate:inMode:dequeue:] + 122
23  com.apple.AppKit                  0x00007fff91cbc9cc -[NSApplication run] + 553
24  com.apple.AppKit                  0x00007fff91ca7803 NSApplicationMain + 940
25  de.wengenmayer.Cheetah3D          0x0000000100001304 start + 52
"

Links: http://www.cheetah3d.com/forum/showthread.php?t=8339, http://www.tres-graficos.jp/blog/files/article.php?id=84

## #2 — joocoo — 2014-10-02
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90639>

I don't use the forums very much and realized I posted in the wrong section. Sorry. I tried deleting in other section but it didn't take. I will try to delete again ...

Update:
Still not deleting in the other section so I don't know what to do here ... 

One post was in the General area for a script(found that section after posting in the general area so that is my bad). Another was in the thread about the script (thought it might be good to see if the thread was still alive which it seems now it isn't ... that's 2) and the 3rd was in the General section. The general section one was a mistake. Why is it bad to follow up on the original thread and then also ask in the correct section?

And I also picked the wrong emot for my original thread (angry it looks like?). Sorry I certainly was not angry. I'm also working with a visiual disability (2 yrs post stroke survivor which affected my vision) so please be patient with me. Thanks

## #3 — joocoo — 2014-10-02
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90643>

[[QUOTE:  frank beckmann said: We´ll find you! Cheers Frank Click to expand... ]]

The "Delete" option under "Edit" is not available ... 

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

## #4 — joocoo — 2014-10-02
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90648>

It looks like I can delete my previous post right above you so maybe it's a timed thing?

## #5 — tg_jp — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90665>

Hi,

please post more information.

1. Which folder did you place a script file?
2. Do another tool scripts work correctly? 
3. Which function of that script caused that crash?

Best

tg_jp, Hiroto.

## #6 — joocoo — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90667>

[[QUOTE:  tg_jp said: Hi, please post more information. 1. Which folder did you place a script file? 2. Do another tool scripts work correctly? 3. Which function of that script caused that crash? Best tg_jp, H]]

1. ~/Library/Application Support/Cheetah3D/

2. yes

3. I simply selected the script from the menu Tools-Script-Tool Script-F-Curve Utility.js

I had a bone selected and the F Curve editor open.

Do I need to have something else selected?

What is the exact process to run the script?

I have never run a script before.

Thanks tg_jp

Update:

I just open C3D without doing anything (new file no objects). I ran the script and it crashed.

## #7 — frank beckmann — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90668>

Still unanswered:
Why version 6.2.1? It´s from April 2013.
Where is your license from; MAS or KAGI?

Cheers
Frank

## #8 — joocoo — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90669>

[[QUOTE:  frank beckmann said: Still unanswered: Why version 6.2.1? It´s from April 2013. Where is your license from; MAS or KAGI? Cheers Frank Click to expand... ]]

That was the most recent version that I upgraded to I think last year.

I have only been using C3D occasionally so I didn't bother updating. 

I just checked and there is a new version 6.3.2. Should I upgrade?

My version claims to be registered. 

How do I tell if it is from MAS/KAGI?

## #9 — frank beckmann — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90671>

[[QUOTE:  joocoo said: I have only been using C3D occasionally so I didn't bother updating. Click to expand... ]]
What do you think are updates for?

[[QUOTE:  joocoo said: I just checked and there is a new version 6.3.2. Should I upgrade? Click to expand... ]]
Sure - for example the latest version got a bug-fix in the script section (Vec3D::dot() function)- so maybe you´re script-crashing is fixed already.

[[QUOTE:  joocoo said: How do I tell if it is from MAS/KAGI? Click to expand... ]]
Don´t know. I think it doesn´t matter as long the update works.

Cheers
Frank

## #10 — tg_jp — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90677>

Hi

thank you for reporting. I tested it with version 6.2.1, but it worked as I expected, no crash. :???: 

How about UV Stepper.js script, it has almost same initialization procedure. Please install and test it in your spare time.

http://www.tres-graficos.jp/blog/files/article.php?id=32

Best

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=32

## #11 — joocoo — 2014-10-03
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90699>

[[QUOTE:  tg_jp said: Hi thank you for reporting. I tested it with version 6.2.1, but it worked as I expected, no crash. :???: How about UV Stepper.js script, it has almost same initialization procedure. Pleas]]

I tried the UV Stepper.js script with C3D 6.2.1 and it worked fine. 

I then updated to C3D 6.3.2 and tried UV Stepper.js and it worked fine.

I tried F-Curve Utility.js again with C3D 6.3.2 and it crashed again.

Do I need to run F-Curve Utility.js with anything selected?

Need crash report?

## #12 — tg_jp — 2014-10-04
<https://www.cheetah3d.com/forum/index.php?threads/10731/post-90702>

hi

thank you for testing.
it's odd  . that script may corrupt.

please re-download script file, and replace it.

Best

tg_jp, Hiroto.
