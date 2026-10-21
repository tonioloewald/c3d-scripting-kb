# BVH Importer.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8307/
- Subforum: script-downloads
- Started by **tg_jp** on 2012-04-13; last post 2017-01-21; 14 posts

## #1 — tg_jp — 2012-04-13
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-69274>

BVH Importer.js for Cheetah3D 6.0+

Hello

It's a tool script for importing bvh file. you can choose bone only / bone + animation data / attach animation data for selected root bone object.

It's available only Cheetah3D 6.0+.

download: http://www.tres-graficos.jp/blog/files/article.php?id=82 

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=82

## #2 — Martin — 2012-04-17
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-69480>

Hi Hiroto,
just saw your BVH exporter is available. It's a absolute must have script for all v6 users. Thank you very much for writing it.:smile: 

Bye
Martin

## #3 — karmacomposer — 2014-07-21
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88837>

I tried placing the script in the scripts folder, but it does not show up in the script drop-down menu.

What have I done wrong?  Brand new to Cheetah 3D, but I will definitely want to create characters and then animate them with motion capture files.

My goal is to make characters and levels for Unity3D with Cheetah3D.

Mike

## #4 — frank beckmann — 2014-07-21
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88838>

Hi Mike and Welcome!
The script is a tool-script so it needs to be inside that Tool-folder and Cheetah3d needs a restart after installing scripts.

Cheers
Frank

## #5 — karmacomposer — 2014-07-21
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88841>

[[QUOTE:  frank beckmann said: Hi Mike and Welcome! The script is a tool-script so it needs to be inside that Tool-folder and Cheetah3d needs a restart after installing scripts. Cheers Frank Click to expand...]]

I bought Cheetah 3D from the app store.  I'm not sure if that matters, but there is no other directories for Cheetah 3D.  If I right-click on the Cheetah3D icon under FINDER -> APPLICATIONS and choose 'Show Package Contents' - everything is in there.  Under the RESOURCES -> PLUGINS -> SCRIPTS folder, I copied your script to the TOOLS subfolder and restarted C3D.  Still does not show up.

What am I doing wrong?

Mike

## #6 — frank beckmann — 2014-07-21
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88843>

[[QUOTE:  karmacomposer said: What am I doing wrong? Click to expand... ]]
The path is:
Mac/HD/Users/User/Library/Application Support/Cheetah3d/Scripts/Tool
Don´t manipulated the app-content as it may cause damage to the license (GateKeeper).

Cheers
Frank

## #7 — Martin — 2014-07-21
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88847>

Hi Mike,
please also check out the chapter "Executing a script" in the Cheetah3D Help files. 

Bye
Martin

## #8 — karmacomposer — 2014-07-22
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88853>

[[QUOTE:  frank beckmann said: The path is: Mac/HD/Users/User/Library/Application Support/Cheetah3d/Scripts/Tool Don´t manipulated the app-content as it may cause damage to the license (GateKeeper). Cheers Fra]]

I have no Cheetah3D folder where you describe:

https://www.dropbox.com/s/ogor4hxxboriz7p/Screenshot 2014-07-21 19.22.02.png

My users directory also does not have a Cheetah3D folder:

https://www.dropbox.com/s/iaoatqwz455kt25/Screenshot 2014-07-21 19.23.27.png

There is no Cheetah3D folder.  It is only in the Applications folder:

https://www.dropbox.com/s/c6mfp4iez7gax59/Screenshot 2014-07-21 19.27.54.png

I bought Cheetah3D using the App Store.  This is how it installed it.

Mike

Links: https://www.dropbox.com/s/c6mfp4iez7gax59/Screenshot%202014-07-21%2019.27.54.png, https://www.dropbox.com/s/iaoatqwz455kt25/Screenshot%202014-07-21%2019.23.27.png, https://www.dropbox.com/s/ogor4hxxboriz7p/Screenshot%202014-07-21%2019.22.02.png

## #9 — karmacomposer — 2014-07-22
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88854>

[[QUOTE:  Martin said: Hi Mike, please also check out the chapter "Executing a script" in the Cheetah3D Help files. Bye Martin Click to expand... ]]

Yes, I immediately knew how to run a script.  I honestly am not that dumb - it was fairly obvious, but I read that help subject anyway.  There is obviously something very wrong with my install, which was 100% automatic off the App Store and I have no idea how to fix it.

I am getting frustrated.

Mike

## #10 — frank beckmann — 2014-07-22
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88855>

[[QUOTE:  karmacomposer said: I have no Cheetah3D folder where you describe: https://www.dropbox.com/s/ogor4hxxboriz7p/Screenshot 2014-07-21 19.22.02.png My users directory also does not have a Cheetah3D folde]]

I´m not sure how the Cheetah3d-MAS install looks look as I don´t have this version - but the place you´re looking up seems obviously the wrong one. Here it is again:
Mac/HD/Users/User/Library/Application Support/Cheetah3d/Scripts/Tool

When there are no such folders you might create these:
But I doubt it´s totally empty.

Cheers
Frank

Attachments: [C3dApplicationSupport.png](https://www.cheetah3d.com/forum/index.php?attachments/23762/)

## #11 — Rene66 — 2014-07-22
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88858>

I am certain your install is correct.
Mavericks HIDES the Library folder by default.

Check this link to discover how to make visible.

Also - you can do this from the Finder/Desktop:
Click on "Go"
Select "Go to Folder"
then input: "~/Library/Application Support/Cheetah3D/"
This will get you to the right Directory.

Cheers.

Links: http://www.macworld.com/article/2057221/how-to-view-the-library-folder-in-mavericks.html

## #12 — karmacomposer — 2014-07-22
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-88893>

Thank you.  I know how to do this in Windows but did not realize it needed to be done in Mac as well.  That makes total sense now.

Mike

## #13 — FilipAAOfficial — 2017-01-20
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-105461>

[[QUOTE:  tg_jp said: Hello It's a tool script for importing bvh file. you can choose bone only / bone + animation data / attach animation data for selected root bone object. It's available only Cheetah3D 6.0+]]

How do I attach the new bvh- files to my existing skeleton?
I'm unable to figure it out...

## #14 — tg_jp — 2017-01-21
<https://www.cheetah3d.com/forum/index.php?threads/8307/post-105484>

Hi, thank you for your comment.

1. select root object at object browser.
2. click 'attach motion' button

Best.

tg_jp, Hiroto.
