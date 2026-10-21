# Some issues rendering sequential OBJ animation sequences

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13746/
- Subforum: scripting-general
- Started by **ayanowitz** on 2020-06-10; last post 2020-06-11; 5 posts

## #1 — ayanowitz — 2020-06-10
<https://www.cheetah3d.com/forum/index.php?threads/13746/post-120629>

Hi,

I’m new to Cheetah3D. I purchased it after searching the web for a way to render animations from an existing set of sequential OBJ files, and stumbling on this old thread:  

https://www.cheetah3d.com/forum/index.php?threads/2110/

With a little bit of studying the script, and experimenting (are there no docs on scripting???) I was able to modify the Polygonobj script from that thread to work with my data set’s file naming convention, etc., and within a few hours of downloading Cheetah3D, I was already rendering out images based on the sequential OBJ files. Already worth the purchase price! Thanks.

However I am running into a few problems:

1) Some of the OBJ files were causing JavaScript errors in buildObject(obj) due to one or more faces in the OBJ referencing an index beyond the end of the uv_list. I added code to substitute the last entry in the uv_list instead in those cases, and that hack stopped the javascript errors.

2) On some OBJs (not necessarily the same ones from the above category), buildObject(obj) seems to cause a 100% Cheetah3D crash:

Thread 0 Crashed:: Dispatch queue: com.apple.main-thread
0   de.wengenmayer.MWM                0x00000001089b85f7 MWMValenceTable::buildValenceTable(MWMPolyCore*) + 487
1   de.wengenmayer.MWM                0x00000001088799c2 buildNormal(MWMPolyCore*, int, float) + 498
2   de.wengenmayer.MWM                0x0000000108860ee7 -[MWMnGon buildObject] + 87
3   de.wengenmayer.MWM                0x00000001088a0a3b -[MWMScriptPoly buildObject] + 91
4   de.wengenmayer.MWM                0x00000001087e5b76 -[MWMObject buildPartial] + 550
5   de.wengenmayer.MWM                0x00000001087e5a24 -[MWMObject buildPartial] + 212
6   de.wengenmayer.MWM                0x00000001088db2ee -[MWMScene buildScene:] + 350
7   de.wengenmayer.MWM                0x00000001088e0bd0 -[MWMScene setAnimPosition::::] + 272
8   de.wengenmayer.Cheetah3D          0x000000010876acde 0x1086d1000 + 629982
9   com.apple.Foundation              0x00007fff4c78c302 __NSThreadPerformPerform + 328
10  com.apple.CoreFoundation          0x00007fff4a492adb __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 17
11  com.apple.CoreFoundation          0x00007fff4a492a81 __CFRunLoopDoSource0 + 108
12  com.apple.CoreFoundation          0x00007fff4a47698b __CFRunLoopDoSources0 + 195
13  com.apple.CoreFoundation          0x00007fff4a475f53 __CFRunLoopRun + 1196
14  com.apple.CoreFoundation          0x00007fff4a475855 CFRunLoopRunSpecific + 459
15  com.apple.HIToolbox               0x00007fff496c61ab RunCurrentEventLoopInMode + 292
16  com.apple.HIToolbox               0x00007fff496c5ee5 ReceiveNextEventCommon + 603
17  com.apple.HIToolbox               0x00007fff496c5c76 _BlockUntilNextEventMatchingListInModeWithFilter + 64
18  com.apple.AppKit                  0x00007fff47a5e77d _DPSNextEvent + 1135
19  com.apple.AppKit                  0x00007fff47a5d46b -[NSApplication(NSEvent) _nextEventMatchingEventMask:untilDate:inMode:dequeue:] + 1361
20  com.apple.AppKit                  0x00007fff47a57588 -[NSApplication run] + 699
21  com.apple.AppKit                  0x00007fff47a46ac8 NSApplicationMain + 777
22  libdyld.dylib                     0x00007fff7648b3d5 start + 1

I haven’t identified what is “wrong” with those specific files that crash Cheetah3D here. But I haven’t had similar issues with those files in other programs, and it seems I can even “import” those files successfully using the Cheetah3D import featue.

Any idea what that crash is, and how to avoid it? I’m hoping there is something I can do in my script to detect and prevent it, since those crashes are making it very cumbersome to render out long sequences. 

I can provide an example OBJ, and my modified script if somebody is willing to take a look. 

Thanks.

Andy Yanowitz

Links: https://www.cheetah3d.com/forum/index.php?threads/2110/

## #2 — ayanowitz — 2020-06-11
<https://www.cheetah3d.com/forum/index.php?threads/13746/post-120630>

Here's an example OBJ that causes the Cheetah3D crash, and the Polygonobj script I'm using at the time the crash occurs.

Thanks for any help you can provide. Thanks.

Attachments: [ScriptAndBadOBJ.zip](https://www.cheetah3d.com/forum/index.php?attachments/36174/)

## #3 — ayanowitz — 2020-06-11
<https://www.cheetah3d.com/forum/index.php?threads/13746/post-120631>

And here are the "good" OBJs for the frame before and frame after the problematic one.

Not sure what's different about frame 286 that always crashes Cheetah3D. Any ideas?

Attachments: [Mesh-F00285.obj.zip](https://www.cheetah3d.com/forum/index.php?attachments/36175/), [Mesh-F00287.obj.zip](https://www.cheetah3d.com/forum/index.php?attachments/36176/)

## #4 — Helmut — 2020-06-11
<https://www.cheetah3d.com/forum/index.php?threads/13746/post-120640>

*    A download of any of the three .obj documents (Foo 285, 286 and 287) causes no problems on my Mac.
*    Scale factor in preferences / file / import for .obj set to 1 millionth plus blow up the scale of NoName object by 1k in scale or via the transform modifier.
*    20k polys, 11k vertices.
    I may, however, misunderstand the problem you are encountering.

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

## #5 — ayanowitz — 2020-06-11
<https://www.cheetah3d.com/forum/index.php?threads/13746/post-120641>

Helmut, yes all 3 objects import fine using File->Import. But I'm not importing those objects directly in this case. Instead I'm using that attached Polgonobj script to buildObject(obj), using the contents of a different OBJ file each frame time. That is the super-cool feature that brought me to Cheetah3D.

For somewhere around 0.5% of the OBJs in my animation sequence, buildObject(obj) is triggering that Cheetah3D crash in MWMValenceTable::buildValenceTable(MWMPolyCore*), which is really making it hard to render out long sequences. Frame 286 in the attachments above is one of the frame OBJs that always causes the crash, so I was hoping to figure out what it is about those small subset of my frames that triggers the issue, and if there was some what to detect it in the script to prevent the crash.
