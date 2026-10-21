# DOF Helper

- Thread: https://www.cheetah3d.com/forum/index.php?threads/808/
- Subforum: script-downloads
- Started by **tg_jp** on 2006-07-27; last post 2017-01-05; 17 posts

## #1 — tg_jp — 2006-07-27
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5123>

DOF Helper

this script for calculating 'distance' of DOF tag with selected Object and active camera position, and for calculating 'lens radius' from FOV value of active camera.

please try to use.

http://www.tres-graficos.jp/blog/files/article.php?id=11

Hiroto.

Attachments: [ch_20060727_dh_ss.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1002/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=11

## #2 — uncle808us — 2006-07-30
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5154>

DOF helper

[[QUOTE:  tg_jp said: this script for calculating 'distance' of DOF tag with selected Object and active camera position, and for calculating 'lens radius' from FOV value of active camera. please try to use. ht]]
I've looked in the libary/app.support/ but there is no Cheetah to put the DOF helper into. What have I done wrong?  OS(Tiger) 10.4.6

## #3 — Martin — 2006-07-31
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5168>

Hi,
these folders aren't generated automatically yet. I have to change that. So please generate that missing folders with the Finder.

Bye,
Martin

P.S. Hiroto, excellent idea for an script. That makes setting up the DOF indeed easier.

## #4 — tg_jp — 2006-08-01
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5172>

Hi, 

thank you for trying this script.

as Martin wrote, if you don't have Cheetah3D folder in ~/Library/Application Support/, you have to make it yourself. sorry, I didn't describe about it.

in this case, you have to make Cheetah3D/scripts/Tool folder in ~(your accoutn)/Library/Application Support.

Hiroto (tg_jp)

## #5 — uncle808us — 2006-08-01
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5173>

More detail please.

[[QUOTE:  tg_jp said: Hi, thank you for trying this script. as Martin wrote, if you don't have Cheetah3D folder in ~/Library/Application Support/, you have to make it yourself. sorry, I didn't describe about i]]
Is this correct? Make a folder named "Cheetah3D" then in it make a folder named "scripts" then in it make a folder named "tools" and place into library/application support, then place in the "tool" folder the DOF helper script?

## #6 — tg_jp — 2006-08-01
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5174>

Hi,

[[QUOTE:  Is this correct? Make a folder named "Cheetah3D" then in it make a folder named "scripts" then in it make a folder named "tools" and place into library/application support, then place in the "tool" f]]

yes. or, you can copy the folder 'scripts' in Applicaitons/Cheetah3D folder, and then delete .js files manually in each folders (Macro/Tool..etc). these file directory hierarchy is same.

* /Applications/Cheetah3D/scripts/ -> buid in script.
* ~/Application Support/Cheetah3D/scripts/ -> custum scripts.

Hiroto

## #7 — uncle808us — 2006-08-03
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5218>

Still no luck.

[[QUOTE:  tg_jp said: Hi, yes. or, you can copy the folder 'scripts' in Applicaitons/Cheetah3D folder, and then delete .js files manually in each folders (Macro/Tool..etc). these file directory hierarchy is sa]]
I made the folders and put them in my library/app support/ etc. but still do not see the DOF helper anywhere in Cheetah. Where should they show up? and why don't they? Thanks.

## #8 — Martin — 2006-08-03
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5226>

Hi,
if you name the directories correctly it will work. The right path names are:

	
	


```
~/Library/Application Support/Cheetah3D/scripts/Macro
~/Library/Application Support/Cheetah3D/scripts/Polygonobj
~/Library/Application Support/Cheetah3D/scripts/Splineobj
~/Library/Application Support/Cheetah3D/scripts/Tag
~/Library/Application Support/Cheetah3D/scripts/Tool
```


Script which are in these folders will appear in the "Tools->Scripts" submenus.

Bye,
Martin

P.S. v3.5 will create the script directories automatically.

## #9 — tg_jp — 2006-08-04
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5236>

Hi,

sorry, my last post was wrong.

the correct directry is

~/Library/Application Support/Cheetah3D/scripts/....

please check the attached images. once you added the custum script file into certain directry, you can select from Tool -> Script menu.

Hiroto. tg_jp

Attachments: [FinderScreenSnapz001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1033/), [Cheetah3DScreenSnapz001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1034/)

## #10 — uncle808us — 2006-08-04
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5241>

Maybe wrong file?

[[QUOTE:  tg_jp said: Hi, sorry, my last post was wrong. the correct directry is ~/Library/Application Support/Cheetah3D/scripts/.... please check the attached images. once you added the custum script file int]]
I think the problem may be the DOF helper script the one  I downloaded does not have the .js extention. Do you think that is the problem?  it is 4kb and says the file is a document it won't open in any app when double clicked. I;m stumped.

## #11 — tg_jp — 2006-08-04
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5242>

Hi,

sorry, again. I didn't describe about it. the file on the web is .zip file.

DOF Helper_20060727.js.zip -- duble click --> DOF Helper.js

so, please place this unarchived .js file into scripts/Tool folder.

regards.

Hiroto.

## #12 — uncle808us — 2006-08-05
<https://www.cheetah3d.com/forum/index.php?threads/808/post-5273>

DOF helper got it!!

[[QUOTE:  tg_jp said: Hi, sorry, again. I didn't describe about it. the file on the web is .zip file. DOF Helper_20060727.js.zip -- duble click --> DOF Helper.js so, please place this unarchived .js file into ]]
I got it thanks....yeah!

## #13 — pegot — 2016-09-23
<https://www.cheetah3d.com/forum/index.php?threads/808/post-103402>

I haven't ever tried this script.  Wondering if it is still necessary with v7's new DOF functionality and controls.  Does this script do anything that v7 can't?

## #14 — feloneouscat — 2017-01-05
<https://www.cheetah3d.com/forum/index.php?threads/808/post-104953>

[[QUOTE:  pegot said: I haven't ever tried this script. Wondering if it is still necessary with v7's new DOF functionality and controls. Does this script do anything that v7 can't? Click to expand... ]]

The DOF tag doesn’t appear to work (although Hiroto’s script adds it). I don’t know, but suspect, that his script will need to be reworked.

I’ve modified it so that it works better with C3D v7b19.

BTW, the Lens Radius I just took a stab at - I most likely got it wrong.

EDIT: Examples of the modified DOF helper. Works with both Cheetah and Falcon renderers.

Attachments: [DOF Helper.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/30154/), [image1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30175/), [image2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30176/)

## #15 — frank beckmann — 2017-01-05
<https://www.cheetah3d.com/forum/index.php?threads/808/post-104954>

I´m not sure if this script is any longer useful as we have a connectable DOF-Grid and "Focus on Object:" as camera properties.

Cheers
Frank

## #16 — feloneouscat — 2017-01-05
<https://www.cheetah3d.com/forum/index.php?threads/808/post-104955>

[[QUOTE:  frank beckmann said: I´m not sure if this script is any longer useful as we have a connectable DOF-Grid and "Focus on Object:" as camera properties. Cheers Frank Click to expand... ]]

Focus on Object is probably great if you are following a single object. What I need is a “focus pull” where I go from an object in the foreground to an object in the background.

If you are following an object, then, yes, it works great. But where you need to move the focus between two (or more) objects, I think you will need this script.

Cheers,

Cat

## #17 — frank beckmann — 2017-01-05
<https://www.cheetah3d.com/forum/index.php?threads/808/post-104956>

I didn´t meant to discourage you. I guess in this case I´d use an invisible dummy object to maintain the focus.

Cheers
Frank
