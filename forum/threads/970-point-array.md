# Point Array

- Thread: https://www.cheetah3d.com/forum/index.php?threads/970/
- Subforum: script-downloads
- Started by **tg_jp** on 2006-10-14; last post 2009-02-01; 13 posts

## #1 — tg_jp — 2006-10-14
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6079>

Point Array

Hello,

I post new script. Point Array (not Polygon Array) is make copy to the position of Obect's vertex (Point).

sample movie1 : http://www.treemo.com/users/tg_jp/channel/item/17216/

download : http://www.tres-graficos.jp/blog/files/article.php?id=13

enjoy.

Hiroto, tg_jp.

Attachments: [ch_20061014_sb_pa_a.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1215/)

Links: http://www.treemo.com/users/tg_jp/channel/item/17216/, http://www.tres-graficos.jp/blog/files/article.php?id=13

## #2 — aelstein — 2006-11-10
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6498>

question about point array script

hi
like idea behind your point array script
can't seem to get it to work
here is error that comes up

line: 22 
Object.setParameter() couldn't find parameter called name

am running cheetah 3.5 vb2 and put the script in the "macro" folder

any suggestion what i am doing wrong?

thks!

adam

## #3 — tg_jp — 2006-11-11
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6507>

Hello,

thanks for trying.

sorry, lack of explaination.
this script is Polygonobj script, so please place it into scripts/Polygonobj Folder.

		
	

Hiroto, tg_jp

## #4 — luke Bocchinelli — 2006-11-13
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6549>

I can't get it to work aswell...

Dear tg_jp

I tried loads of different settings and the best I can get is this...

using the latest C3D version

Am I missing a simple trick here !?

regards

Luke

Attachments: [Picture-1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1308/)

## #5 — aelstein — 2006-11-13
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6551>

same result

funny, i used exactly the same geometry as luke to test and got exactly the same result.  plus, as i navigated around the window the distribution of the boxes seemed to change....any hints about what might be done to fix this?

thks
adam

## #6 — Eureka! — 2006-11-13
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6555>

Hi,
It looks like a great script but i'm having the same problom! How did you add lights?

Thanks,
Greg

## #7 — tg_jp — 2006-11-14
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6565>

Hello, All.

thanks for trying. so, this script ignore position / rotation / scale of both Objects (profile and copied). I post fixed new one, please download new one again.

download -> http://www.tres-graficos.jp/blog/files/article.php?id=13

> hi, aelstein.

I think you checked 'variation' or lower than 1.0 for 'copy' parameter. both use Random value for calculation at each refreshing time.

so if you want to fixed, make editable to Point Array object.
actually, I add this for fake blink animation like illumination. 

copy:0.5 -> 50% copy, 1.0 -> 100% (random profile point)
posx,y,z:0.1 -> move copied object 0.05 - -0.05 (randomly)
scalex,y,z:0.1 -> scale copied object 90% - 100% (randomly)

> hi, Eureka!

for fake light object ( emitting object ), you can use Solid Color or Material (bright Emittance color) with radiosity rendering.

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=13

## #8 — luke Bocchinelli — 2006-11-14
<https://www.cheetah3d.com/forum/index.php?threads/970/post-6566>

yeeessss...

Thanks that's the kiddie....works really well

Regards

Luke

## #9 — moqtev — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/970/post-27110>

Hi Hiroto!

When I try to use the script i get these errors  :

		
	

This happen when I try to change a parameter.

Cheers

Morten

## #10 — Targos — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/970/post-27112>

[[QUOTE:  moqtev said: Hi Hiroto! When I try to use the script i get these errors : This happen when I try to change a parameter. Cheers Morten Click to expand... ]]

Yes I do too

AaronC

## #11 — tg_jp — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/970/post-27115>

hello

thank you for trying to use this. I fixed that bug, so please download it again from link below. ( another my old script may have also same bug, if you find it, please let me know.  )

http://www.tres-graficos.jp/blog/files/article.php?id=13

regards.

tg_jp, Hiroto.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=13

## #12 — moqtev — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/970/post-27116>

Great thanks so much Hiroto - it works perfect now

## #13 — Targos — 2009-02-01
<https://www.cheetah3d.com/forum/index.php?threads/970/post-27119>

Fantastic again!

EDIT: Hiroto have you ever played with the Unity game engine? I think you would love its scripting capabilities.

AaronC

Attachments: [Picture 17.png](https://www.cheetah3d.com/forum/index.php?attachments/6256/)
