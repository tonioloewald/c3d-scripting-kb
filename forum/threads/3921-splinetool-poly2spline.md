# SplineTool Poly2spline??

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3921/
- Subforum: scripting-general
- Started by **uncle808us** on 2009-02-15; last post 2010-12-03; 7 posts

## #1 — uncle808us — 2009-02-15
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-27334>

SplineTool Poly2spline??

When I use the poly2spline script then sweep the resulting spline  I get holes in the sweep any ideas why?Answer?? http://www.cheetah3d.de/forum/showthread.php?t=2710

Links: http://www.cheetah3d.de/forum/showthread.php?t=2710

## #2 — frank beckmann — 2009-02-15
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-27336>

Hi.
That is because every single edge of a polygon become a spline - so if eg you have a cylinder with say 12 sections longitudinal you´ll receive a spline containing 12 segments. The script is pretty straight forward - but you can´t tell you want an upper edge as one whole spline - because it´s per face/polygon. I don´t know if it´s possible to write an addition to the "edge2Spline,js-script" telling "make a whole spline" out of segments etc. Maybe one of the script wizards can tell you what is possible and what´s not.

Cheers
Frank

Attachments: [poly_edge2spline.png](https://www.cheetah3d.com/forum/index.php?attachments/6304/)

## #3 — tg_jp — 2009-02-15
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-27337>

hello

thank you for using that script. 

here is my answer. sorry for my poor english.  
http://www.cheetah3d.de/forum/showpost.php?p=18931&postcount=7

anyway, I add new option to polygon2Spline.js. so please try it. ( I don't update poly2spline.js and edge2spline.js anymore, so please use polygon2Spline.js. )

http://www.cheetah3d.de/forum/showthread.php?t=2743

left ball and box are using old type [selected polygon], and rights are using [polygon based]. if you choose [polygon based], script makes each spline from each selected polygon. please check attached file. 

tg_jp, Hiroto.

Attachments: [Cheetah3D_sz_002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6305/), [polygon2Spline_sample.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/6306/)

Links: http://www.cheetah3d.de/forum/showpost.php?p=18931&postcount=7, http://www.cheetah3d.de/forum/showthread.php?t=2743

## #4 — uncle808us — 2009-02-15
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-27338>

Trouble with sample!

[[QUOTE:  tg_jp said: hello thank you for using that script. here is my answer. sorry for my poor english. http://www.cheetah3d.de/forum/showpost.php?p=18931&postcount=7 anyway, I add new option to polygon2Spl]]
When I try your file Cheetah becomes inactive. see image.

## #5 — frank beckmann — 2009-02-15
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-27339>

Hi.
Seems you didn´t updated the script Hiroto mentioned in this thread: http://www.cheetah3d.de/forum/showpost.php?p=18885&postcount=1

Cheers
Frank

Links: http://www.cheetah3d.de/forum/showpost.php?p=18885&postcount=1

## #6 — uncle808us — 2009-02-15
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-27340>

Yes I had the wrong one.

[[QUOTE:  frank beckmann said: Hi. Seems you didn´t updated the script Hiroto mentioned in this thread: http://www.cheetah3d.de/forum/showpost.php?p=18885&postcount=1 Cheers Frank Click to expand... ]]

I just downloaded the script yesterday and thought it was the one but...I was wrong. :redface:  It is working now Thank you Hiroto for the upfdate and thank you Frank.

## #7 — Eric_J — 2010-12-03
<https://www.cheetah3d.com/forum/index.php?threads/3921/post-52403>

Great scripts!

Thank you Todd and Hiroto, the loft and spline scripts are really great!

Maybe this isn't the right place to post it - and it isn't really my style of shoe - but I'm posting an image of a shoe that I modeled in C3D that I couldn't have done without the loft and spline scripts ....

Thanks again!

Eric_J

Attachments: [meshshoe01.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13091/)
