# F-Curve Linker Doesn't Respond In Realtime with Morph Tag

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9285/
- Subforum: scripting-general
- Started by **feloneouscat** on 2013-01-28; last post 2013-01-28; 6 posts

## #1 — feloneouscat — 2013-01-28
<https://www.cheetah3d.com/forum/index.php?threads/9285/post-76688>

F-Curve Linker Doesn't Respond In Realtime with Morph Tag

I saw a video by Filip Ceunen which showed on-screen manipulators using the F-Curve Linker. I asked for his help, because it seemed I could not get them to work correctly.

He sent me a small file which allows you to manipulate a spline on the X axis that changes an item in the morph tag.

Unfortunately, this seems to have worked in the past (as his video shows), but doesn't seem to update in real time anymore.

Attached is the file. You will notice that moving the spline on the X axis DOES change the position of the morph tag item, but that change is not reflected on the object UNTIL you touch the morph tag control item.

Any help in this would be appreciated.

Attached is the sample file he sent me.

Attachments: [fcurve.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/19155/)

Links: http://player.vimeo.com/video/45460700

## #2 — feloneouscat — 2013-01-28
<https://www.cheetah3d.com/forum/index.php?threads/9285/post-76693>

Okay, I found the problem...

I started thinking about "update" and wondered if I was missing something. As it turns out, I was.

On line 333 (approx) is the following:

	
	


```
      BTarget.setParameter(BObjParamName, preparedParam, false);
```


The last item indicates whether or not you want it to update. I'm not sure why it is false. Perhaps I have an old version of the F-Curve Linker. (shrugs)

To fix it required the following change - your milage may vary however:

	
	


```
      BTarget.setParameter(BObjParamName, preparedParam, true);
```


Now, I wonder (and worry) as to why it was false?

## #3 — tg_jp — 2013-01-28
<https://www.cheetah3d.com/forum/index.php?threads/9285/post-76700>

hi, thank you for reporting.

[[QUOTE:  feloneouscat said: I started thinking about "update" and wondered if I was missing something. As it turns out, I was. On line 333 (approx) is the following: 
```
      BTarget.setParameter(BObjParamName, preparedParam, false);
```
 The last item indicates whether]]

at first, this parameter was 'true', but if you add f-curve key for "Driver A"'s position, animation play is stucked sometimes. so I changed third parameter of "setParameter" function to false for f-curve animation.

as you wrote, with manual manipulation ( not animation play ) it won't work properly. so it has to be updated. 

regards.

tg_jp, Hiroto.

## #4 — feloneouscat — 2013-01-28
<https://www.cheetah3d.com/forum/index.php?threads/9285/post-76704>

Ah, okay, I understand.

Hmmm... I had planned to use this as part of an animation project (for facial expressions) - perhaps adding a checkbox to enable/disable it?

Thanks for the warning!

## #5 — tg_jp — 2013-01-28
<https://www.cheetah3d.com/forum/index.php?threads/9285/post-76705>

hi, I updated this script.

http://www.tres-graficos.jp/blog/files/article.php?id=83

please update it. now it's switching true/false automatically depends on animation playing or not.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=83

## #6 — feloneouscat — 2013-01-28
<https://www.cheetah3d.com/forum/index.php?threads/9285/post-76706>

Excellent!

Thank you very much!
