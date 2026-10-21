# Scripting a batch converter?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8357/
- Subforum: scripting-general
- Started by **drtimhill** on 2012-04-21; last post 2012-04-22; 2 posts

## #1 — drtimhill — 2012-04-21
<https://www.cheetah3d.com/forum/index.php?threads/8357/post-69621>

Scripting a batch converter?

Hi,

I'm looking to see if I can script a batch converter to convert a lot of old 3DS files I have to DAE and JAS. Of course I can do this by hand using open/export in C3D, but I have 2,800 files to convert.

So I'd like to script it. JavaScript doesnt scare me (25 year software veteran) but locating information on the C3D JS APIs is pretty tough.

I know I can do "doc.saveToFile(..., "dae")" to save the file, but how do i script OPENING a file in C3D? Is there some kind of "doc.close()" and "doc.open()" API? Where can I find info on this? The information on scripts is VERY sparse. I've studied the samples both here and that ship with C3D but they only provide hints at best.

Thanks!
--Tim

## #2 — tg_jp — 2012-04-22
<https://www.cheetah3d.com/forum/index.php?threads/8357/post-69650>

Hi

[[QUOTE:  drtimhill said: Hi, I'm looking to see if I can script a batch converter to convert a lot of old 3DS files I have to DAE and JAS. Of course I can do this by hand using open/export in C3D, but I have ]]

unfortunately, Cheetah3D's script doesn't have function to open file as new document. so it will be complex task with Cheetah3D.

batch script will be...

using php, ruby or your familiar script language for shell of OS X

1. getting file list to convert [shell].
2. start to loop for each file [shell].
3. call "/Applications/Cheetah3D.app/Contents/MacOS/Cheetah3D [path/to/3ds_file.3ds]" for a current file [shell].
4. after opening, execute AppleScript file, that emulates key-pressing. this key assign as hot key for Cheetah3D's Macro script. [shell -> applescript]
5. start watching CPU usage. [shell]
6. Cheetah3D's Macro script simply execute 'doc.saveToFile('temp filename', 'dae or jas');'. [applescript -> macro script]
7. if CPU usage is 0, close Cheetah3D.app launched at 3. [shell]
8. rename [temp filename] to [file name]. [shell]
9. back to 2.

[ADD] or, 1.2.3.5.6.7.8.9 may be wrote totally AppleScript without shell script, actually.   

just an idea, It may not work..

regards.

tg_jp, Hiroto.
