# F-Curve Controller.js - v7+ only

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12344/
- Subforum: script-downloads
- Started by **tg_jp** on 2017-03-15; last post 2017-03-17; 10 posts

## #1 — tg_jp — 2017-03-15
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106360>

F-Curve Controller.js - v7+ only

Hello,

It's a tag script to control other object's f-curve with attached object's f-curve. available only v7+.

its parameters are almost same as F-Curve Linker.js..

tag index: -1 means attached object, and if 0/1/2.. means index of tag ( usually 0 indicates mode tag of attached object)
parameter: select which parameter you want get to control
p.name: if you select 'other' at parameter, you can input parameter name manually. in case you use material parameter, it will be 'material.[node id].[parameter name]'.
get for: which value you want to get from Vector value ( x / y / z, h / p / b )
check parameters: you can check parameter's name of current settings ( you can check [node id]  with this button )

target object: target object to be controlled
target tag index/target parameter/target p.name/set for/check target parameters: same as above, but for target object.

formula: you can input formula manually as javascript, it should contain v character as get value. for example.

multiplied by 2: v * 2
divided by 2: v / 2
sine: Math.sin(v)
floor: Math.floor(v)

Best.

tg_jp, Hiroto

Attachments: [c3d_fccontroller_20170315.jpg](https://www.cheetah3d.com/forum/index.php?attachments/30602/)

## #2 — bobziila — 2017-03-15
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106361>

This may sound like an odd question, but is it possible to use this (or, Linker, but I assumed that doesn't work in v7) to do things like tail wobble or fat jiggling?

I was playing around with Linker and I came close to a tail wobble. By this, I mean a tail that sort of moves up and down and around while a character walks.

Thanks!
Bob

## #3 — tg_jp — 2017-03-15
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106363>

Hi,

I think, it can be with Math.sin( v ) for formula parameter.

please check this post, I attached sample scene file.

http://www.cheetah3d.com/forum/showthread.php?t=12345

Best

tg_jp, Hiroto

Links: http://www.cheetah3d.com/forum/showthread.php?t=12345

## #4 — bobziila — 2017-03-15
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106384>

Do you mean using the Sound Loader script to do it?

Bob

## #5 — tg_jp — 2017-03-16
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106397>

Hi,

here is a sample, please check it.

Best

tg_jp, Hiroto

Attachments: [f-curve_sample_01.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/30623/)

## #6 — bobziila — 2017-03-16
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106416>

I can't find the script on your site, so the file won't load without it.

Bob

## #7 — bobziila — 2017-03-16
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106417>

I think I found it. I must have booked mark it at some point. Doesn't come up when I search your blog.

Bob

## #8 — bobziila — 2017-03-16
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106418>

Pretty neat! I'll have to play around with that.

Is it happening automatically, or are you animating any parts of it? 

Can it be made to have a falloff, meaning, if you grab the base of the tail and move it, then stop, the tail eventually comes to a gradual rest.

Bob

## #9 — tg_jp — 2017-03-17
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106420>

Hi,

in this sample scene, I attached 3 F-Curve Controller.js tag to "body" object. all 3 tags control certain objects with body's z position.

1st: x position of "tip target" object ( target object of IK handle ) with formula Math.sin( v ) * 0.5.
2nd: y position of "tip target" object ( target object of IK handle ) with formula Math.sin(v*2) * 0.1.
3rd: b rotation of "neck" object with formula 38 + Math.cos(v) * 20.

about "falloff", I think you can use "Point Constraint" tag attached to IK Handle's target and some value for weight. without F-Curve Controller.js script.
 

Best

tg_jp, Hiroto

## #10 — bobziila — 2017-03-17
<https://www.cheetah3d.com/forum/index.php?threads/12344/post-106421>

I'll have to digest all that! 

Thanks for all the information. I wish I could code. I have lots of idea (rigging, animation) but can't follow through with them.

Bob
