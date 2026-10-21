# Make Circle.js

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8848/
- Subforum: script-downloads
- Started by **tg_jp** on 2012-09-27; last post 2014-07-18; 34 posts

## #1 — tg_jp — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73501>

Make Circle.js

hello

it's Tool script to make circle shape from selected polygon. 
place it into ~/Library/Application Support/Cheetah3D/Scripts/Tool folder.

I hope it will be useful.

download: http://www.tres-graficos.jp/blog/files/article.php?id=87

update 20120927: bug fixed. add "adjust angle" command.
update 20121011: bug fixed for Cheeatah3D 5.8. with Cheetah3D 5.8, Undo/Redo are not available.

demo movie: http://www.youtube.com/watch?v=5en-8vrdjJM

regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=87, http://www.youtube.com/watch?v=5en-8vrdjJM

## #2 — frank beckmann — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73505>

This is simply amazing. A must have.  

Thank you very much! :icon_thumbup: 

Cheers
Frank

## #3 — uncle808us — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73511>

I need to get an english version of the demo any chance of this? I can't figure out how to use the tool.
Thanks  this will be handy.:icon_thumbup:

## #4 — frank beckmann — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73513>

Select at least 4 connected quads - call the script and hit "make" - or call Catmull Clark and then call the script and hit "make".

Cheers
Frank

## #5 — uncle808us — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73518>

Cool, Thanks

## #6 — maruchan — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73521>

Really cool script. I get a different result with the top of a capsule--is this normal? Thanks.

Attachments: [Screen Shot 2012-09-27 at 9.45.33 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/18026/)

## #7 — frank beckmann — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73523>

Uncheck "equal alignment".

Cheers
Frank

## #8 — maruchan — 2012-09-27
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73528>

Thanks Frank, that worked.

## #9 — tg_jp — 2012-09-28
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73534>

hi, all

thank you for testing it. thank you. :smile: 

I noticed several problems ( rotation gap with equal alignment ), I will update it for fixing these problems.

regards.

tg_jp, Hiroto

## #10 — tg_jp — 2012-09-28
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73541>

hi

I have updated this script. please check and replace it.

and I drew a chart for using this script. I hope it help to use.

In case that selected polygon curved ( a part of ball or capsel.. ), created circle is not fit to original shape. I will try to fix that problem. but for flat polygons has no problem.

regards.

tg_jp, Hiroto.

Attachments: [MakeCircle_chart.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18034/)

## #11 — frank beckmann — 2012-09-28
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73549>

Thanks for the improvements. :icon_thumbup: 

Cheers
Frank

## #12 — uncle808us — 2012-09-28
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73551>

I get it now thanks for the graphic.

## #13 — chuckl — 2012-09-29
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73556>

Thanks, Hiroto

I'll definitely be using this script in the near future.

Thanks, Hiroto!

## #14 — Martin — 2012-09-30
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73580>

Hi Hiroto,
wow, that's a really helpful script. I'm sure many will love it.:icon_thumbup: 

Thank you very much.:smile: :smile: 

Bye
Martin

## #15 — Hopper — 2012-10-10
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73900>

I get this error message. 

Javascript Error
line:137
error: 'undefined' is not a function (evaluating 'obj.recordGeometryForUndo0'}

What am I doing wrong?

## #16 — Martin — 2012-10-10
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73901>

Hi,
which version of Cheetah3D do you use? Look's like the script called a new Javascript function which was introduced in Cheetah3D 6.0.

Bye
Martin

## #17 — Hopper — 2012-10-11
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73904>

I am using 5.8 currently.

## #18 — tg_jp — 2012-10-11
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73906>

hi, thank you for testing.

I have just update it. please update it. for Cheetah3D 5.8, Undo/Redo functions are not available.

regards.

tg_jp, Hiroto

## #19 — Hopper — 2012-10-11
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-73927>

Holy cow! I didn't expect this!  Works fine in 5.8, Thanks so very much.

## #20 — ZooHead — 2013-06-23
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80061>

Hi tg_jp, I have tried to download this script three times and it does not download correctly.
 I'm getting a generic document file that does not show up in the script/tool menu.

​

## #21 — frank beckmann — 2013-06-23
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80063>

[[QUOTE:  ZooHead said: Hi tg_jp, I have tried to download this script three times and it does not download correctly. I'm getting a generic document file that does not show up in the script/tool menu.​ Click ]]
Did you restart Cheetah3d?

Cheers
Frank

## #22 — ZooHead — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80064>

[[QUOTE:  frank beckmann said: Did you restart Cheetah3d? Cheers Frank Click to expand... ]]

Yes I did restart, the file comes through as "Make" with a generic icon.

​

## #23 — ZooHead — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80066>

Does this look correct?

​

Attachments: [Make.jpg](https://www.cheetah3d.com/forum/index.php?attachments/20364/)

## #24 — uncle808us — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80067>

It unzipped fine for me here it is.

Attachments: [Make Circle.js_20121011.zip](https://www.cheetah3d.com/forum/index.php?attachments/20365/)

## #25 — ZooHead — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80068>

[[QUOTE:  uncle808us said: It unzipped fine for me here it is. Click to expand... ]]

Thanks Unc, that should do it.

​

## #26 — ZooHead — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80070>

I used the make circle script once and now a glitch has appeared.

​

Attachments: [GUIglitch.gif](https://www.cheetah3d.com/forum/index.php?attachments/20366/)

## #27 — uncle808us — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80071>

No problem here I have no idea what's going on.

Attachments: [makeHole.jpg](https://www.cheetah3d.com/forum/index.php?attachments/20367/)

## #28 — ZooHead — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80073>

[[QUOTE:  ZooHead said: I used the make circle script once and now a glitch has appeared. ​ Click to expand... ]]

The glitch has not reappeared and the script is working.

Thanks to all for the help.

​

## #29 — uncle808us — 2013-06-24
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-80074>

Glad it's working.

## #30 — shmambu — 2014-07-13
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-88694>

Thanks!

This Script really helps a lot! thanks!

## #31 — artstud3 — 2014-07-13
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-88709>

a big THANK YOU for all your great scripts

thank you for all your wonderful scripts :icon_thumbup::icon_thumbup::icon_thumbup:

## #32 — shmambu — 2014-07-16
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-88774>

Problem 

Um, I seem to have a problem when I try to use your script, it stopped working   
I followed your demo, but I couldn't "Make Circle" My computer specs are down below and my OS. What am I doing wrong

## #33 — frank beckmann — 2014-07-16
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-88775>

Where do you have the script stored? It´s a tool script.

Cheers
Frank

## #34 — tg_jp — 2014-07-18
<https://www.cheetah3d.com/forum/index.php?threads/8848/post-88807>

Hi

thank you for trying my script.

could you post some screen shot? how different is it from my demo movie?

Best

Hiroto Tsubaki
