# experimental - Polygon Reduction.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1395/
- Subforum: script-downloads
- Started by **tg_jp** on 2007-03-05; last post 2010-11-19; 34 posts

## #1 — tg_jp — 2007-03-05
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8841>

experimental - Polygon Reduction.js

Hello,

this is experimental and tooooooo slooow, just sample for script from c++ code. 

( Progressive Mesh type Polygon Reduction Algorithm by Stan Melax http://www.melax.com/polychop/ ).

updated:20070306 please check it.
updated:20081014 fix: uv code error?.
updated:20090309 fix: error when some points share same positions.
updated:20100321 fix: bug for 5.2+.

for Cheetah3D 5.1- http://www.tres-graficos.jp/blog/files/article.php?id=24
for Cheetah3D 5.2+ http://www.tres-graficos.jp/blog/files/article.php?id=56

regards.

tg_jp, Hiroto.

Links: http://www.melax.com/polychop/, http://www.tres-graficos.jp/blog/files/article.php?id=24, http://www.tres-graficos.jp/blog/files/article.php?id=56

## #2 — Martin — 2007-03-05
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8851>

Hi Hiroto,
that is an excellent idea. I'm sure many game developers are interested in such a feature.
But I think there is a bug in your script. Applying your script (50%) to the box below didn't generate what I expected.

Bye,
Martin

Attachments: [Cheetah3DSchnappschuss001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1776/), [Cheetah3DSchnappschuss002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1777/)

## #3 — tg_jp — 2007-03-05
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8854>

Hi, yes it is a bug. now I am fixing... 

tg_jp, Hiroto.

## #4 — Francois — 2007-03-05
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8863>

[[QUOTE:  tg_jp said: this is experimental and tooooooo slooow, just sample for script from c++ code. Click to expand... ]]

Hi tg_jp,

This could be very useful ! Good idea !
You may know these pages already but just in case they can help too ( C++ source code and documentation are available ) :
- http://meshalgorithms.sourceforge.net/
- http://meshalgorithms.sourceforge.net/refman/annotated.html

Links: http://meshalgorithms.sourceforge.net/, http://meshalgorithms.sourceforge.net/refman/annotated.html

## #5 — tg_jp — 2007-03-06
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8873>

Hi,

thanks for comments. I fixed that bugs. still slow and not optimized, not well tested anyway. 

> hi Francois

thanks for info. after checking those source files of that link, I will try to optimize this script. thanks.

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3DScreenSnapz001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1778/)

## #6 — kraus — 2007-03-06
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8878>

very interesting script. thanks for sharing!

## #7 — Martin — 2007-03-07
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-8904>

Hi,
yes it is working now. Great job. :icon_thumbup: 

Now you just have to optimize it a little bit.:wink: 

I only had a very short look into the source code. But i think one of the main performance problems might by caused by the Array class. For example for removing an Object from the array the hole array has to be searched through. In such cases it is always better to work with indexes.

Bye,
Martin

## #8 — Targos — 2008-10-14
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-25361>

Hi,

I cant seem to get past this error?

Thanks

AaronC

Model is at

http://files.filefront.com/meshzip/;12059838;/fileinfo.html

Attachments: [Picture 49.png](https://www.cheetah3d.com/forum/index.php?attachments/5794/)

Links: http://files.filefront.com/meshzip/;12059838;/fileinfo.html

## #9 — tg_jp — 2008-10-14
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-25369>

hi, please check the latest version.

http://www.tres-graficos.jp/blog/files/article.php?id=24

I didn't check your file, because I couldn't download your mesh file with web error. but I hope it would work. 

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=24

## #10 — Brady — 2008-12-03
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-26169>

This seems to work well (if somewhat slow), except that I have a model that's around 100k polys, and I quickly get an "out of memory" error from javascript when I try to use this on that mesh.

## #11 — kevinr — 2009-01-17
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-26744>

can anyone tell me how to actually use this script? I've tried grouping it and applying it every which way. It just makes a polygonscript-reduc object.. it I can't get it to do the reduction on my target object.

## #12 — tg_jp — 2009-01-18
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-26750>

hi

please check the folder you did install it. you have to place it into Tool folder of ~/Application Support/Cheetah3D/scripts.

After invoking Polygon Reduction.js from Tool->Script->Tool Script of menu bar. Select a target polygon object at object browser, then, click 'apply' button to make new polygon object with reducted polygon count. ( slow  ) 

as other post, million poly count costs a lot, and script error occur.

regards.

tg_jp, Hiroto

## #13 — Targos — 2009-01-27
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27022>

This is working great:icon_thumbup::icon_thumbup:

Thanks
AC

Attachments: [Picture 21.png](https://www.cheetah3d.com/forum/index.php?attachments/6232/), [Picture 20.png](https://www.cheetah3d.com/forum/index.php?attachments/6233/)

## #14 — bliprob — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27651>

Error in line 279

The script keeps throwing an error on line 279 for one particular model. 

"rv has no properties"

The line is:

"rv.heapspot = -1"

If I comment out the line, I get some hit-or-miss results. And some extremely ugly looking results, too.

## #15 — tg_jp — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27652>

hi

thank you for repoting. I couldn't reproduce it. so, could you post the model that cause a problem? 

regards.

tg_jp, Hiroto.

## #16 — bliprob — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27653>

Model

Thanks for the quick reply! This model causes the script error.

Attachments: [Head.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/6362/)

## #17 — tg_jp — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27654>

hi,

thank you for quick reply and the file. I could reproduce it.   I think you made that with 'Boolean Creator', that makes some complex polygons, I am guessing some polygons are too complex to reorganize with this script.

so to avoid that error, please try 'optimize' the model before executing 'polygon reduction.js'. it's work with that model.

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3D_sz_001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6363/)

## #18 — bliprob — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27657>

[[QUOTE:  tg_jp said: hi, thank you for quick reply and the file. I could reproduce it. I think you made that with 'Boolean Creator', that makes some complex polygons, I am guessing some polygons are too compl]]

Thanks, I'll give that a try. But I'm also wondering why the script would give that error. Why would rv have no properties? Is there an error in the HeapPop() function? Or is it caused by a low-memory condition?

## #19 — frank beckmann — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27658>

Hi
Just a side note.
Seems your model came from a CAD-app.
Shouldn´t be too hard to achieve this in Cheetah3d.;-) 

Cheers
Frank

Attachments: [Helmet.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6364/), [Head4U.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/6367/)

## #20 — bliprob — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27659>

I edited line 278 of the script:

	
	


```
    var rv = heap[0];
```


I added "var" because rv wasn't previously declared as a variable, but that makes no difference with this error.

[[QUOTE:  frank beckmann said: Hi Seems your model came from a CAD-app. Shouldn´t be too hard to achieve this in Cheetah3d. Click to expand... ]]

Thanks, Frank! Yes, my artist is deeply attached to Strata 3D. Apparently he's been modeling in Strata and copying and pasting objects into Cheetah. I've tried begging and bribing him to stop using Strata, but it's no use. Would you mind attaching your version of the model, so I can show it to him?

## #21 — frank beckmann — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27660>

[[QUOTE:  bliprob said: Would you mind attaching your version of the model, so I can show it to him? Click to expand... ]]

It´s already there linked beneath the image:mrgreen:
But it´s just a quick hack.

Cheers
Frank

## #22 — bliprob — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27661>

[[QUOTE:  frank beckmann said: It´s already there linked beneath the image:mrgreen: But it´s just a quick hack. Cheers Frank Click to expand... ]]

Thanks -- I downloaded it, but it seemed to be my original file. Maybe I got confused, I'll try again. Your quick hack looks good to me!

As for the script, it seems that HeapPop() is only called by MinimumCostEdge(), which is itself only called by ComputeProgressiveMesh(). I'll try to move the code up a couple of functions and see if it sheds any more light on the error.

## #23 — frank beckmann — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27662>

[[QUOTE:  bliprob said: I downloaded it, but it seemed to be my original file. Click to expand... ]]

Have a second look  
Seems I uploaded the wrong zip file. Sorry.

Cheers
Frank

Attachments: [Helmets.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6366/), [Head4U.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/6368/)

## #24 — tg_jp — 2009-03-08
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-27666>

hi,

that error occur when some points share same positions, I guess. so, after executing optimize (with weld close vertices), it will not occur.
I just update the script. ( if heap val is null, stop calculation at that loop. please check the code. ) 

please download again, and check it. it seems to work fine.

http://www.tres-graficos.jp/blog/files/article.php?id=24

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=24

## #25 — davidrivera — 2009-06-03
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-29924>

Hi Hiroto,

I tried your script and it works great! I took a 21,120 polygon model got him down to 7,779. With a little work I was able to bring the model's polygon count to 2,405. For game modeling this is an indispensable tool!:icon_thumbup: 

Dave

## #26 — Targos — 2010-03-20
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-40545>

Hi there, is this one broken again?
Thanks
Aaron

Attachments: [Screen shot 2010-03-20 at 5.05.39 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/10167/)

## #27 — tg_jp — 2010-03-21
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-40581>

hi,

I updated this for 5.2+. please replace it.

http://www.tres-graficos.jp/blog/files/article.php?id=56

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=56

## #28 — Targos — 2010-03-21
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-40603>

Working great Hiroto :icon_thumbup: 

I'm glad, this a one of a few totally essential scripts that adds a great deal to cheetahs capabilities.

Thanks again.
Best wishes

AaronC

## #29 — maho — 2010-11-18
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-51659>

Apply, and then?

Hi,

I'm fairly new to Cheetah3D, so this might fall under RTFM...

When you have run the script and hit Apply.. then what? How do I get/save/use the new polygon reduced object? I want to get rid of the the original object as it is messy from various boolean operations.

And thanks for a great product! Really takes the pain out of modelling.

## #30 — frank beckmann — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-51664>

[[QUOTE:  maho said: Hi, I'm fairly new to Cheetah3D, so this might fall under RTFM... When you have run the script and hit Apply.. then what? How do I get/save/use the new polygon reduced object? I want to ge]]
The "boolean-reduc.0.XXX" object will be generated at the same place - so either delete your original object or make it unvisible via "mode-icon".

[[QUOTE:  maho said: And thanks for a great product! Really takes the pain out of modelling. Click to expand... ]]
Agreed - but why you´re using Boolean operations then? :mrgreen: 

Cheers
Frank

## #31 — maho — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-51713>

[[QUOTE:  frank beckmann said: The "boolean-reduc.0.XXX" object will be generated at the same place - so either delete your original object or make it unvisible via "mode-icon". Agreed - but why you´re using B]]

Yes, I get that reduc.0.XXX object, but I cannot delete the original object - everything disappears. "mode-icon" also does not compute for me. I must be missing something very basic.

For example, if I want to reduce a ball like podperson did in http://www.cheetah3d.com/forum/showthread.php?t=1383&page=2

How do I do it? I want to be able to save the reduced ball as a new object. I'm beginning to feel so stupid 

If you saw why I used boolean operators, you would probably come and visit me and hit me with the stupid-stick...

Links: http://www.cheetah3d.com/forum/showthread.php?t=1383&page=2

## #32 — frank beckmann — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-51714>

[[QUOTE:  maho said: Yes, I get that reduc.0.XXX object, but I cannot delete the original object - everything disappears. "mode-icon" also does not compute for me. I must be missing something very basic. Click]]
Select it in the object browser and hit backspace - gone.

[[QUOTE:  maho said: If you saw why I used boolean operators, you would probably come and visit me and hit me with the stupid-stick... Click to expand... ]]
Yes - for sure. Lets have a try - post a screenshot and learn something new.  

Cheers
Frank

## #33 — maho — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-51721>

[[QUOTE:  frank beckmann said: Select it in the object browser and hit backspace - gone. Yes - for sure. Lets have a try - post a screenshot and learn something new. Cheers Frank Click to expand... ]]

Yes, but when I delete the object nothing is left, just that reduc.0.XXX. I must be having them in wrong order or have the wrong selection or something when I invoke the script.

Regarding the polygon-obese model. 2 boxes + boolean, then 4 cylinders + boolean. Maybe I did something wrong to get into that mess, but I figured that reducing polygons would be nice trick to know.

Attachments: [messy.png](https://www.cheetah3d.com/forum/index.php?attachments/12891/)

## #34 — frank beckmann — 2010-11-19
<https://www.cheetah3d.com/forum/index.php?threads/1395/post-51723>

[[QUOTE:  maho said: Yes, but when I delete the object nothing is left, just that reduc.0.XXX. I must be having them in wrong order or have the wrong selection or something when I invoke the script. Regarding ]]
Ouch!
Please try the following:
Take a box and make it editable.
Select the polys where the holes should appear.
Make an inner extrude and scale the inner polygons.
Call Catmull Clark two times per right mouse button.
Hit backspace to delete these new polygons. Holes appear.
Select all polygons and call for the shell tool: click and drag - and voilá.

Cheers
Frank

Attachments: [SimpleHoles.jpg](https://www.cheetah3d.com/forum/index.php?attachments/12892/)
