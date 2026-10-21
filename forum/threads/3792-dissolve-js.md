# Dissolve.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3792/
- Subforum: script-downloads
- Started by **tg_jp** on 2009-01-05; last post 2009-01-07; 5 posts

## #1 — tg_jp — 2009-01-05
<https://www.cheetah3d.com/forum/index.php?threads/3792/post-26482>

Dissolve.js

hello, happy new year.

this is a macro script to delete only point or edge.

http://www.tres-graficos.jp/blog/files/article.php?id=43

DEMO MOVIE
http://es.youtube.com/watch?v=oK8Lc_mNF5A

if you use Delete Edge.js, please replace it.

regards.

tg_jp, Hiroto

Links: http://es.youtube.com/watch?v=oK8Lc_mNF5A, http://www.tres-graficos.jp/blog/files/article.php?id=43

## #2 — Martin — 2009-01-05
<https://www.cheetah3d.com/forum/index.php?threads/3792/post-26495>

Hi Hiroto,
that's a really cool script. Very helpful. :icon_thumbup: 

Bye,
Martin

## #3 — tg_jp — 2009-01-06
<https://www.cheetah3d.com/forum/index.php?threads/3792/post-26499>

hi, Martin.

thank you 

actually, I have some problem I can't fix yet.
'Undo' causes crush after executing this macro. Is there any way to avoid this problem?

	
	


```
Thread 0 Crashed:
0   de.wengenmayer.MWM            	0x00af98b0 -[MWMnGon undoRecordedArrays::] + 496
1   com.apple.CoreFoundation      	0x915e0a3d __invoking___ + 29
2   com.apple.CoreFoundation      	0x915e0428 -[NSInvocation invoke] + 136
3   com.apple.CoreFoundation      	0x915e04f8 -[NSInvocation invokeWithTarget:] + 72
4   com.apple.Foundation          	0x9406e8dc -[_NSUndoInvocation invoke] + 44
5   com.apple.Foundation          	0x9406e644 -[_NSUndoStack popAndInvoke] + 244
6   com.apple.Foundation          	0x9406e447 -[NSUndoManager undoNestedGroup] + 199
7   com.apple.AppKit              	0x935d853b -[NSApplication sendAction:to:from:] + 112
8   com.apple.AppKit              	0x9368717c -[NSMenu performActionForItemAtIndex:] + 493
9   com.apple.AppKit              	0x93686e81 -[NSCarbonMenuImpl performActionWithHighlightingForItemAtIndex:] + 220
10  com.apple.AppKit              	0x93686b07 -[NSMenu performKeyEquivalent:] + 866
11  com.apple.AppKit              	0x936853ac -[NSApplication _handleKeyEquivalent:] + 492
12  com.apple.AppKit              	0x935a216b -[NSApplication sendEvent:] + 3999
13  de.wengenmayer.Cheetah3D      	0x00043c4b -[mwApplication sendEvent:] + 123
14  com.apple.AppKit              	0x934ff69f -[NSApplication run] + 847
15  com.apple.AppKit              	0x934cc8a4 NSApplicationMain + 574
16  de.wengenmayer.Cheetah3D      	0x00002902 _start + 216
17  de.wengenmayer.Cheetah3D      	0x00002829 start + 41
```


tg_jp, Hiroto

## #4 — frank beckmann — 2009-01-06
<https://www.cheetah3d.com/forum/index.php?threads/3792/post-26503>

Thank you Hiroto

for that awesome script.:icon_thumbup: 

With kindest regards
Frank

## #5 — Martin — 2009-01-07
<https://www.cheetah3d.com/forum/index.php?threads/3792/post-26545>

Hi Hirot,
ups I guess that isn't your fault. Since scripts can't be undone it looks like that the UndoManager can get into an unstable state. I have to add a Javascript function that polygon scripts can be undone. So that the undo manager doesn't get into a unstable state anymore.

Could you please send me the full crash log via email?

Bye,
Martin
