# Cheetah3d export to gameplay

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8841/
- Subforum: scripting-general
- Started by **Contexter** on 2012-09-26; last post 2012-09-27; 8 posts

## #1 — Contexter — 2012-09-26
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73434>

Cheetah3d export to gameplay

Hi,

... about getting into scripting, since I need to export to https://github.com/blackberry/GamePlay

I do remember there's been some generalist code on exporting from Cheetah3d, but can't find it anymore.

Could anybody point me to right directions, short cuts, or secrets  :smile:  ?

Thanx in advance and greetings from Berlin

B.

Links: https://github.com/blackberry/GamePlay

## #2 — Martin — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73497>

Hi,
Cheetah3D comes with a very simple sample exporter script. You can find it at the following path:

~/Library/Application Support/Cheetah3D/Scripts/Macro/Simple ASCII Export.js

I hope it can give you a good starting point.

Bye
Martin

## #3 — Contexter — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73503>

Parameter Object finished ?

Hello Martin,

Thanx for the hint !

The help file ( the PDF download from Tonio's ) says that the Parameter Object isn't finished yet. Well at first glance parameters is exactly what is supposed to be exported in order to write out .gameplays simple persistence .dot files. 

What's state of the art right now ?

Thanx and greetings from Berlin

Benedikt

## #4 — tg_jp — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73510>

hi

[[QUOTE:  Contexter said: Hello Martin, Thanx for the hint ! The help file ( the PDF download from Tonio's ) says that the Parameter Object isn't finished yet. Well at first glance parameters is exactly what i]]

the doc of Parameter class is finished already, please check the latest help manual from menu bar ( pdf version is not latest one, I think ). and I used Parameter class for manipulating animation of object ( especially F-curves of each object's parameters ) in F-Curve Utility.js and Quick Recorder.js. If you want to export static object information ( vertices, polygons, uvs.. ), Parameters class is not needed. You can use Polycore class for it. 

regards.

tg_jp, Hiroto

## #5 — Swizl — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73519>

Did the help file get an update from v6 to v6.0.1? I can update the pdf version that I created if that's true. 

Thanks!,

Simon

## #6 — Contexter — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73526>

Correct

Seems to be true . 

How about doing an IBook ?

## #7 — Swizl — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73527>

Yeah, I've thought about it. You can open the converted pdf in iBooks, but of course it isn't as elegant looking as a custom made iBook one would be. All the links from the pdf do work on an iPad in iBooks though. I'll update the pdf when I get a chance (I originally did all three languages: Deutsch, English & Japanese). Another problem with doing an iBook version is dealing with the localizations. The Japanese would be especially difficult because of the Kanji. One other factor about doing an iBook version is the time it would take to create concerning the layout (which really isn't the biggest factor to me). I'm not privy to changes for each update, so I'd have to manually check to see what differed each time an update happens. I guess I could try to find a comparison tool to narrow down changes. I may still consider doing an iBook version though if that were the case. I'll have to look into how much work would be involved. It may be something where I create the original iBook version and then hand it off to Martin to give to whomever he has update the html help files. It would really be up to him if it would even be worth his bother to do such though.

I'll let everyone know when the updated pdf files are ready. 

P.S. I should clarify - The pdf versions that I made are different than the ones that Podperson made that are posted on his website. You can do a forum search to find the ones I did. There were ones I originally did for v5 and then re-did them when v6 was released.

## #8 — Contexter — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8841/post-73530>

Use Iframes

... you could use a tool like http://tumult.com/hype/ , actually working with Iframes (in IBooksAuthor) off from a centralized online version. Maybe Martin already reserved some space under cheetah3d's domain ?

Anyway : Thanx

Links: http://tumult.com/hype/
