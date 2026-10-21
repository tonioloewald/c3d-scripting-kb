# Mirror Copy.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1448/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-03-23; last post 2020-09-01; 71 posts

## #1 — tg_jp — 2007-03-23
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9127>

Mirror Copy.js

Hello,

this is Tool script for copying object symmetrically. for character bones. 
this works for v4.0+.

please check sample movie.
sample movie (h.264 8.8Mb):http://homepage.mac.com/camelio/ch_movies/ch_20070324_mirrorCopySM.mov

UPDATED: now you can copy polygon objects.
UPDATED: fixed polygon object copying bug. 2008-06-06

download->http://www.tres-graficos.jp/blog/files/article.php?id=25

UPDATED: fixed bug for 5.0. 2009-10-14
UPDATED: fixed bug for 5.2. 2010-01-21

download for 5.x -> http://www.tres-graficos.jp/blog/files/article.php?id=51

tg_jp, Hiroto.

Links: http://homepage.mac.com/camelio/ch_movies/ch_20070324_mirrorCopySM.mov, http://www.tres-graficos.jp/blog/files/article.php?id=25, http://www.tres-graficos.jp/blog/files/article.php?id=51

## #2 — DaVinci — 2007-03-24
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9129>

Awesome script! That's gonna make using bones much easier! Thanks a lot!

## #3 — squareitround — 2007-03-26
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9227>

Just ordered my update to 4.0, so this will be very useful. Thanks!

## #4 — capnchunky — 2007-03-26
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9233>

I was just about to ask if there was an easy way to do this. Thank you!

## #5 — podperson — 2007-03-28
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9324>

Heh -- I just *did* ask and was referred to this script. Does it mirror constraints?

## #6 — fused — 2007-03-28
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9329>

[[QUOTE:  podperson said: Heh -- I just *did* ask and was referred to this script. Does it mirror constraints? Click to expand... ]]

I've only had a quick go but it seems to copy constraints.

Andrew

## #7 — tg_jp — 2007-03-28
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-9334>

hi,

[[QUOTE:  Heh -- I just *did* ask and was referred to this script. Does it mirror constraints? Click to expand... ]]

yes. this script copy all tags ( Constraints, Handle ) with parameters.

but testing may not be enough. so if there is a bug after your testing, please let me know it.

regards.

tg_jp, Hiroto.

## #8 — podperson — 2007-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-17148>

I can't currently use this script. I installed it and it doesn't shop up. I tried an older version I had lying around and had the same problem? Am I screwing up something or is there an incompatibility with 4.3.1?

## #9 — frank beckmann — 2007-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-17153>

Mmmh - works just fine here.(Tiger/Cheetah4.3.1)
Are you sure storing it at: Harddisk/User/Username/Library/Application Support/Cheetah3D/scripts/Tool/   ?

Cheers
Frank

## #10 — tg_jp — 2007-12-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-17186>

hi,

> podperson

thank you for trying this script. I checked it with Cheetah3D 4.3.1, it worked with my Mac. so, I don't know why it doesn't. any alert?

* doubleclick a file Mirror Copy.js_20070730.zip to extract it.
* place it ('Mirror Copy.js')  into ~/Library/Application Support/Cheetah3D/scripts/Tool folder
* relaunch document and select 'Mirror Copy.js' from 'Tool -> Script -> Tool Script' menu.

please make sure that script file name is 'Mirror Copy.js'. '.js' extension is required for script file.

regards.

tg_jp, Hiroto.

## #11 — podperson — 2008-01-17
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-17838>

Eep such slow replies ... Frank set me straight, thank you all. Sorry for the false alarm ;-)

## #12 — cnitteberg — 2008-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-17931>

I use leopard(10.5.1) and I had to put it in:
Harddisk/Applications/Cheetah3D/scripts/Tool/

where all de other scripts are.

If you doesn`t find it just search for one of the other scripts that come with Cheetah3D with spotlight!

## #13 — tg_jp — 2008-06-06
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-22677>

update for bug fix

hello.

I updated this script. I fixed a bug that mirror copying of polygon objects caused error with version 4.6.

if you use it, please replace it.

regards

tg_jp, Hiroto

## #14 — uncle808us — 2008-06-06
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-22678>

Thank you very much.

Thanks for the update I use this script all the time. Thanks again.

## #15 — tg_jp — 2009-10-14
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-33798>

hi,

I just updated this for fixing bug when using it with Cheetah3D 5.0.

http://www.tres-graficos.jp/blog/files/article.php?id=51

and if you find some problem when using a script that I wrote, please let me know it. thanks.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=51

## #16 — podperson — 2009-12-07
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-36288>

I'm having a lot of trouble with the copy/paste parameters function -- it produces twisted results. I don't think I had this problem before.

I modified the script to replace "L-" at the beginning of an object name with "R-" (vs. "..._copy" so "L-thigh" becomes "R-thigh") but as far as I can tell your code doesn't rely on names, so I think that the order of children in the copies has changed vs. v4.0 (the problem seems to occur if the hierarchy branches, but it sometimes occurs elsewhere).

## #17 — tg_jp — 2009-12-07
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-36298>

hi,

thank you for reporting. but I cannot reproduce it, it occurs that problem with all mirror plane (x/y/z) or certain plane?
if it available, please post the file.

I already updated the script to fix parameter copy/paste bug, and add pivot copy/paste for v.5.0. if you not yet, please update it. ( few line added, so you can easily modified your customized one. I will add name conversion function for next update.   ).

http://www.tres-graficos.jp/blog/files/article.php?id=51

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=51

## #18 — podperson — 2009-12-08
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-36333>

I was using the latest version on the website as of two days ago. I'll see if I can dependably replicate it and post the file.

## #19 — podperson — 2009-12-08
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-36337>

I think my file had some kind of internal corruption in it (the unique id issue again) because I ran into a bunch of problems while trying to move things around inside the hierarchy. So maybe the problem is just me.

I did come across this error though (note that the right hand has a gun in it while the left does not, which means the hierarchy is not perfectly symmetric).

Attachments: [Screen shot 2009-12-08 at 10.30.20 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/8845/)

## #20 — tg_jp — 2009-12-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-36369>

hi

thank you for reporting. I updated the script, please check it.

http://www.tres-graficos.jp/blog/files/article.php?id=51

* problem fixed when parameter copy for asymmetrical object list.
* name convert function added. R <-> L, Left <-> Right ..etc.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=51

## #21 — podperson — 2009-12-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-36376>

Thanks very much

## #22 — podperson — 2010-01-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37751>

Sigh: 5.2 breaks Mirror Copy again

## #23 — frank beckmann — 2010-01-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37759>

[[QUOTE:  podperson said: Sigh: 5.2 breaks Mirror Copy again Click to expand... ]]

Hi Tonio.
Had a quick fresh go and no prob here so under Leopard.

Cheers
Frank

Attachments: [MirroredJoints.jpg](https://www.cheetah3d.com/forum/index.php?attachments/9322/)

## #24 — podperson — 2010-01-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37764>

Weird -- I'm getting this error (see screenshot) using the Dec 2009 version (and Snow Leopard, obviously).

Attachments: [Screen shot 2010-01-20 at 2.12.15 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/9323/)

## #25 — frank beckmann — 2010-01-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37766>

Bummer.
I´m using still the version from June 2008.
With the newer version I got the same issue. So you might try the older one again.

Cheers
Frank

## #26 — podperson — 2010-01-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37768>

D'oh. The problem with the earlier version is it's broken for my naming convention ... and I think a few bugs got fixed along the way. Thanks for checking.

## #27 — tg_jp — 2010-01-20
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37790>

hi

yes, some of my script won't work on 5.2, because prototype functions I used for debugging.  

so, please comment out line.16 - line.26. it will work again. 

	
	


```js
/* comment out for v5.2
Vec2D.prototype.toString = function() {
	return this.u.toFixed(6) + ' ' + this.v.toFixed(6);
}
Vec3D.prototype.toString = function() {
	return this.x.toFixed(6) + ' ' + this.y.toFixed(6) + ' ' + this.z.toFixed(6);
}
Vec4D.prototype.toString = function() {
	return this.x.toFixed(6) + ' ' + this.y.toFixed(6) + ' ' + this.z.toFixed(6) + ' ' + this.w.toFixed(6);
}
*/
```


EDIT:

I udated the script for 5.2, please update it. 

http://www.tres-graficos.jp/blog/files/article.php?id=51

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=51

## #28 — podperson — 2010-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37802>

Thanks again

## #29 — uncle808us — 2010-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37854>

Link broken.

I use this script all the time but the update link is not working for me.

## #30 — frank beckmann — 2010-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37855>

Strange - both links are working for me. (here on page 1 and 3)
Should I send it to you?

Cheers
Frank

## #31 — uncle808us — 2010-01-21
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-37862>

Yes Thanks Frank,

Hope everything is going good with you.

## #32 — podperson — 2010-02-08
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38692>

The attached error occurs when I select the figure's root bone and then hit copy followed by paste.

The obvious use of Mirror Copy is to "flip" a pose (e.g. if you're creating a walk cycle, you start by creating one pose as a keyframe, making two evenly-spaced copies, then flipping the middle pose. But when I try to do this I get an error.

I can flip parts of the pose (e.g. copy the left arm's pose, and paste a flipped version on to the right) but this doesn't help much -- to get the desired result I need to flip each limb individually, and use a stored pose to get the unflipped data back (hard to explain... but it's not pretty).

Attachments: [Screen shot 2010-02-08 at 2.45.59 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/9613/)

## #33 — tg_jp — 2010-02-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38712>

hi, thank you for reporting.

I fixed that bug, so please update it.

http://www.tres-graficos.jp/blog/files/article.php?id=51

Link type parameter like "target", "pole" won't copy/paste for some tags. you have to set manually after copying.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=51

## #34 — podperson — 2010-02-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38715>

Before and after images.

Hmm. Any idea what I'm doing wrong?

Note that there is geometry mixed into the hierarchy (e.g. the pistol) -- but the problem occurs even if I remove them.

Attachments: [Screen shot 2010-02-08 at 9.39.49 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/9620/), [Screen shot 2010-02-08 at 9.39.56 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/9621/)

## #35 — tg_jp — 2010-02-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38718>

hi,

I suppose that in your scene file, bone object's hierarchy contains a body polygon objects? if so, the script copies polygon object as mirrored, so geometry would be wrong by skelton tag.

I can add "don't copy polygon" or "no mirror" option for polygon object in hierarchy. 

could you post that scene file for more info?

regards.

tg_jp, Hiroto

## #36 — podperson — 2010-02-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38739>

Here's the scene file -- thanks for looking into this.

Attachments: [omnidude 3 rigged.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/9633/)

## #37 — tg_jp — 2010-02-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38758>

hi, thank you for your file.

please use 'none' parameter of "mirror plane" for that purpose ( simple parameter copy ). I added 'none' option for latest update.

regards.

tg_jp, Hiroto

## #38 — podperson — 2010-02-12
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38838>

Thank you '

... hmm it doesn't seem to do anything at all.

## #39 — tg_jp — 2010-02-12
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38842>

hi,

[[QUOTE:  podperson said: Thank you ' ... hmm it doesn't seem to do anything at all. Click to expand... ]]

ah... I totally didn't get what you do with the script. 

try this for it.

* copy BASE hierarchy for reference. please remove asymmetrical object ( like GUN ) from object's hierarchy before copying.
* copy parameter from reference's R-Thigh, then paste paramter to L-Thigh. do the same for anotehr 3 group ( R-Thigh, L-Shoulder, R-Shoulder ).

regards.

tg_jp, Hiroto.

Attachments: [ch_ss.jpg](https://www.cheetah3d.com/forum/index.php?attachments/9676/)

## #40 — podperson — 2010-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-38920>

Ah OK that's what I was doing before... Thanks again.

## #41 — uncle808us — 2012-09-25
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-73423>

In Cheetah 6.1 I get an error message see image. Never the less it works.

Attachments: [Screen Shot 2012-09-25 at 12.02.24 PM9-25-12.jpg](https://www.cheetah3d.com/forum/index.php?attachments/17999/)

## #42 — tg_jp — 2012-09-26
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-73432>

hi, thank you for reporting.

According to the error message, I am guessing that your script is not the latest one. so please download and replace it.

http://www.tres-graficos.jp/blog/files/article.php?id=51

if you have same problem, please let me know it.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=51

## #43 — frank beckmann — 2012-09-26
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-73438>

Thanks for looking into it.
Funny thing I downloaded again and replaced it with the one from the same release date and the error is gone.  

Cheers
Frank

## #44 — BillG — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-73515>

Wow! This was timely!  I came to the forum to find how to do a mirror copy of a polygon object, and here is this thread, active.

Now, this probably my own bone-headedness, but I'm having trouble figuring out how to use the script.  Is this how to set it up?  Then, when I click "copy", it gives the error about not finding the mirror plane, no matter what I set the mirror plane parameter to.  Any ideas?

Attachments: [Screen shot 2012-09-27 at 8.56.49 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/18022/), [Screen shot 2012-09-27 at 8.57.26 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/18023/)

## #45 — frank beckmann — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-73516>

Actually you´re running the wrong script. Mirror-plane needs a plane as a mirror-axis while Hiroto´s "Mirror copy.js" scrip is a tool script. Load it from the first page of this thread.

Cheers
Frank

Attachments: [MirrorCopyScript.png](https://www.cheetah3d.com/forum/index.php?attachments/18024/)

## #46 — BillG — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-73517>

Thanks, Frank. Works like a charm!  And thanks, Hiroto!!
Bill in Minneapolis

## #47 — Sebastião — 2013-12-31
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-84021>

Thanks a lot for this script!
Cheers
Seb

## #48 — llamapixel — 2015-08-27
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-97520>

Thank you so much. I would love an object rename / Object prefix rename and find / replace script if there is one already somewhere ?

## #49 — uncle808us — 2016-11-09
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-103973>

[[QUOTE:  tg_jp said: hi, thank you for reporting. According to the error message, I am guessing that your script is not the latest one. so please download and replace it. http://www.tres-graficos.jp/blog/file]]

Hi tg_jp, Hiroto: Long time no hear from. Is this the latest version for C3D V7?
Mirror Copy.js_20100209.zip ( application/zip : 4 KB)

## #50 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108227>

I'm also curious about C3D v7.0 compatability.

In basic testing Mirror Copy/Object Copy a hierarchy of parametric objects and grouped objects, it seems okay.

In testing a Mirror Copy/Object Copy that included a Sweep Creator (with two splines inside), the resulting two splines ended up in reverse order and the Sweep Creator object needs fixing.

In other testing, using a simple mesh I get this error (see screen grab)
.
.
.
Yup tried several times. Simple mesh (non-parametric) in C3D v7.0b23 can't make a mirror copy.
Any ideas?

Thanks in advance!
--Shift Studio.

Attachments: [mirror-copy-error.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31306/)

## #51 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108228>

Added to above ^^

Getting similar errors in C3D v6.3.1 (see attached)

Tried a simple parametric cube and then cube 'made editable'.

Maybe it has to do with Javascript being different now?

Thanks for reading.
--Shift Studio.

Attachments: [mirror-copy-error2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31308/)

## #52 — frank beckmann — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108229>

[[QUOTE:  Shift Studio said: Yup tried several times. Simple mesh (non-parametric) in C3D v7.0b23 can't make a mirror copy. Any ideas? Click to expand... ]]
Still works as expected with parametric and editable meshes (these generate a Javascript warning) but the copied/mirrored objects appear:
Can you give a step-by-step instruction?
Are you using character joints as this script is initially meant for?

[[QUOTE:  tg_jp said: Hello, this is Tool script for copying object symmetrically. for character bones. this works for v4.0+. tg_jp, Hiroto. Click to expand... ]]

		
	
Cheers
Frank

## #53 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108231>

[[QUOTE:  frank beckmann said: Still works as expected with parametric and editable meshes (these generate a Javascript warning) but the copied/mirrored objects appear: Can you give a step-by-step instruction?]]

Hi Frank.

I'm not using the script for character joints, rather a hierarchy of meshes with subdivision modifiers and groups of the same. Also included in the hierarchy are Sweep Creators.

After some more testing it seems to be true that editable meshes (non grouped) do copy correctly, but generate the Javascript error as you suggest.
I'll do some more testing - to see if my results from yesterday can be repeated - or if I didn't interpret correctly. It was a long, long day yesterday.

It seems like when you have groups and groups with subgroups the script tries to make the new copies as children of the group, and this causes the script to fail. Also it will fail if you try to make mirror copies of meshes that have children. You can test this with the attached .jas file.

Thanks.
--Shift Studio.

Attachments: [mirror copy group.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/31311/)

## #54 — frank beckmann — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108232>

I think there are quite some more options we have:
The simplest is to duplicate the whole folder and set the scale at "X" to "-1" - boom - there you have it.
Or you use your hierarchy folder.jas file and feed two Smart Folders with - one set scale to X=-1 like above:

		
	
Cheers
Frank

## #55 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108234>

[[QUOTE:  frank beckmann said: I think there are quite some more options we have: The simplest is to duplicate the whole folder and set the scale at "X" to "-1" - boom - there you have it. Or you use your hier]]

You know, setting scale to "-1" was my first method, but the in a render, the copy turned out black. Now, I can't reproduce :frown:  :redface: 
I'm having a tough time the last day or two....

The mirror copy script not keeping materials made it a poor option anyways.

Thanks for your help Frank.

I think we can agree that the Mirror Copy script isn't working fully with groups, subgroups, parent/children hierarchies - right?

@Hiroto or any other person in the know, it would be great to see materials copied over too. I suppose there are considerations when it comes to flipping texture maps....

--shift studio.

## #56 — frank beckmann — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108235>

[[QUOTE:  Shift Studio said: You know, setting scale to "-1" was my first method, but the in a render, the copy turned out black. Now, I can't reproduce :frown: :redface: Click to expand... ]]
Renders fine here.

[[QUOTE:  Shift Studio said: I think we can agree that the Mirror Copy script isn't working fully with groups, subgroups, parent/children hierarchies - right? Click to expand... ]]
It´s main purpose is to mirror whole joint hierarchies which does it brilliantly - not polygonal meshes.

Cheers
Frank

## #57 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108236>

[[QUOTE:  frank beckmann said: It´s main purpose is to mirror whole joint hierarchies which does it brilliantly - not polygonal meshes. Cheers Frank Click to expand... ]]

I've used it for that. It does work brilliantly.

Apparently what I need is a mirror copy script for polygonal meshes.
Its not trivial either. The models I'm working on have many many parts, with complex hierarchies.

--shift studio.

## #58 — frank beckmann — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108238>

Have you tried this one lately? https://www.cheetah3d.com/forum/showthread.php?t=10374

Cheers
Frank

Links: https://www.cheetah3d.com/forum/showthread.php?t=10374

## #59 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108239>

[[QUOTE:  frank beckmann said: Have you tried this one lately? https://www.cheetah3d.com/forum/showthread.php?t=10374 Cheers Frank Click to expand... ]]

Hi Frank. 
Yes, I have - in fact thats my preferred way (Referenced Particles), because it only keeps one copy of all the objects (smaller and more manageable file) and because it keeps the materials!

But, alas, I'm getting the black render on mirrored objects again. See attached.
Any ideas about solving that? That would be appreciated very much.

Thanks,
--shift studio.

Attachments: [referenced-Particle(mirror)-error.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31313/)

## #60 — frank beckmann — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108242>

Damn - yes renders black. That make this script quite useless.
The only way you can now solve this is during modeling process by "simply" adding to symmetry-creators right into your hierarchy. Adding these later is easy enough:

		
	
Cheers
Frank

## #61 — Shift Studio — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108245>

Yes, simple enough except that there are several hundred to 1000 or more objects to be mirrored.

If I could put a symmetry modifier on an entire group ... then I'd be in business.
I think, for now, I'll do the scale = -1 method at the end of my modelling before rendering final images.

Thanks for all the considerations you put into it!
--Shift Studio.

## #62 — frank beckmann — 2017-07-18
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108246>

[[QUOTE:  Shift Studio said: I think, for now, I'll do the scale = -1 method at the end of my modelling before rendering final images. Click to expand... ]]
Not my workflow - if I have symmetrical objects in a scene I´ll model with symmetry on.  

Cheers
Frank

## #63 — tg_jp — 2017-07-23
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108277>

Hi

I've uploaded new script and updated. please try that for mirrored scene.

Referenced Polygon.js : https://www.cheetah3d.com/forum/showthread.php?t=12535

Referenced Particles.js : https://www.cheetah3d.com/forum/showthread.php?t=10374

demo: https://www.youtube.com/watch?v=di44VaWr17E&feature=youtu.be

Best

tg_jp, Hiroto

Links: https://www.cheetah3d.com/forum/showthread.php?t=10374, https://www.cheetah3d.com/forum/showthread.php?t=12535, https://www.youtube.com/watch?v=di44VaWr17E&feature=youtu.be

## #64 — frank beckmann — 2017-07-23
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108279>

Wonderful! Thank you for sharing.

Cheers
Frank

## #65 — uncle808us — 2017-07-23
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108282>

[[QUOTE:  tg_jp said: Hi I've uploaded new script and updated. please try that for mirrored scene. Referenced Polygon.js : https://www.cheetah3d.com/forum/showthread.php?t=12535 Referenced Particles.js : https]]
Can't find Referenced Polygon.js : the link goes to TGJP site Referenced Particles.js

## #66 — Shift Studio — 2017-07-23
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108283>

[[QUOTE:  uncle808us said: Can't find Referenced Polygon.js : the link goes to TGJP site Referenced Particles.js Click to expand... ]]

I'm finding the same... 
Interestingly, I downloaded them both (Referenced Particles.js from both links), and they are very similar code, but not exactly the same.

--shift studio.

## #67 — tg_jp — 2017-07-23
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108288>

Hi,

sorry. I re-uploaded script file, please check it.

Best

tg_jp, Hiroto

## #68 — uncle808us — 2017-07-24
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108291>

As usual Thanks for another wonderful script. Live forever...:icon_thumbup: :smile:

## #69 — Shift Studio — 2017-07-24
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108292>

[[QUOTE:  tg_jp said: Hi, sorry. I re-uploaded script file, please check it. Best tg_jp, Hiroto Click to expand... ]]
Another excellent, useful script - thank you!
-- shift studio.

## #70 — Shift Studio — 2017-08-14
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-108680>

[[QUOTE:  frank beckmann said: Damn - yes renders black. That make this script quite useless. The only way you can now solve this is during modeling process by "simply" adding to symmetry-creators right into y]]

Hi Frank, I've just assembled a few large sections of a model with many, many nested(child) symmetry creators in my hierarchy, very similar to your screengrab above - in fact I spent 2+ days doing it.

The idea is to use symmetry creators for minor mirroring within the large sections, then use Hiroto's 'Referenced Polygons' script to mirror these large portions to the other side of the machine (still these red farming machines)

So, it all looks great in C3D's viewport, then I go to render and nothing below a child symmetry creator renders - at all.

Yikes. Thats a big unpleasant surprise. Can you confirm? 

I've included a really basic example in the screengrab below.

Also, when you said this >> 

[[QUOTE:  Not my workflow - if I have symmetrical objects in a scene I´ll model with symmetry on. Click to expand... ]]
 << are you talking about using Symmetry modifier? I considered that, but have reasons (difficult to explain) not to.

Thanks for any insight.

btw, maybe I'll move this topic to a new thread - maybe 
--shift studio.

Attachments: [Nested-Symmetry-Creator-Bug.jpg](https://www.cheetah3d.com/forum/index.php?attachments/31454/)

## #71 — Cadlet — 2020-09-01
<https://www.cheetah3d.com/forum/index.php?threads/1448/post-121291>

I can't seem to make the script work in Mojave 10.14.6 with C3D 7.4.2. Nothing happens when I run it. Is there a permissions adjustment to make? I've used it in C3D 7, just not sure when exactly which version. Thanks.
