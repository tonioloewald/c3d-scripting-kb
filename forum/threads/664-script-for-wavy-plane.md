# script for Wavy Plane

- Thread: https://www.cheetah3d.com/forum/index.php?threads/664/
- Subforum: script-downloads
- Started by **tg_jp** on 2006-05-12; last post 2016-09-16; 10 posts

## #1 — tg_jp — 2006-05-12
<https://www.cheetah3d.com/forum/index.php?threads/664/post-4245>

script for Wavy Plane

this is for creating Wavy Plane and Wavy Plane animation.
you can control width, height, wave count and wave scale ( start and end ).

this script is for both version of Cheetah3D, 2.6.1 or 3.x.

Sample Movie: Waving Red Velvet Movie (84KB h.264)

** Download URL for Wavy Plane.js (20060513)

I updated. current version is v.20060515 (for smooth wave animation and scale type).

regards.

tg_jp

Attachments: [ch_20060512_wp1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/772/)

Links: http://www.tres-graficos.jp/blog/files/article.php?id=8, http://www.tres-graficos.jp/blog/resources/ch_20060513_wpB.mov

## #2 — peer — 2006-05-13
<https://www.cheetah3d.com/forum/index.php?threads/664/post-4247>

Wow!!!! :shock: :shock: :shock: That is so great thank you (arigato)!
I'm trying it out now!!

Regards,

Peter

## #3 — fused — 2006-05-14
<https://www.cheetah3d.com/forum/index.php?threads/664/post-4257>

Wow tg_jp the movie is amazing, nice job.

Andrew

## #4 — Shift Studio — 2013-07-09
<https://www.cheetah3d.com/forum/index.php?threads/664/post-80387>

Great script - Thanks!
I'm curious about the wave count parameter - it seems to have a max value of 100.
I'm in the need of more that 100 waves. Is it possible?

Thanks, 
--Shift Studio.

## #5 — frank beckmann — 2013-07-09
<https://www.cheetah3d.com/forum/index.php?threads/664/post-80388>

When I got it right this one can create up to 600 waves:

Cheers
Frank

Attachments: [Wavy Plane600.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/20479/)

## #6 — Shift Studio — 2013-07-09
<https://www.cheetah3d.com/forum/index.php?threads/664/post-80389>

Nice Frank! Thanks so much!

Now for 600 waves, I need more 'Section(s) Width' Right now it's maximum is 1000. I think I need 6 sections per wave so 3600.
I opened up  the .js and am going to have a go at setting this part myself.
If it works, I'll post it here.

thanks again,
--Shift Studio.

## #7 — Shift Studio — 2013-07-09
<https://www.cheetah3d.com/forum/index.php?threads/664/post-80390>

Okay, it works with 600 waves, 6 sections per wave.
Limited testing.

Thanks Frank for your help.

Here is modified - I hope this okay with tg_jp
Rename as desired :smile: 

--Shift Studio.

EDIT: Actually I was in error, and I really only need 3 sections per wave because I'm going to subdivide - so for a wave count of 600, sections width parameter can be 1800

Attachments: [Wavy Plane600b.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/20480/)

## #8 — Shift Studio — 2016-09-13
<https://www.cheetah3d.com/forum/index.php?threads/664/post-103175>

Hi Hiroto.

Thanks again for this script.

Can you look at the way it handles UV's? When I unwrap, I believe I should get a rectangle, instead, I get a curvy UV island that overlaps itself and isn't usable.

Thanks!
--Shift Studio.

Attachments: [wavyplan-unwrapped-UV.gif](https://www.cheetah3d.com/forum/index.php?attachments/29579/)

## #9 — tg_jp — 2016-09-15
<https://www.cheetah3d.com/forum/index.php?threads/664/post-103214>

Hello, thank you for your information.

I don't know why it doesn't work properly with this object.  

this script's polygon already has rectangle uv map. you want to edit it? as you wrote, UV Unwrap tool doesn't work correctly with this object, so I recommend using UV Mapper tool or Translate/Rotate/Scale Tool at UV Editor view.

Best.

tg_jp, Hiroto

## #10 — Shift Studio — 2016-09-16
<https://www.cheetah3d.com/forum/index.php?threads/664/post-103242>

[[QUOTE:  tg_jp said: Hello, thank you for your information. I don't know why it doesn't work properly with this object. this script's polygon already has rectangle uv map. you want to edit it? as you wrote, U]]

Thanks for looking into it Hiroto! Upon looking into it further, the simple version of the script does unwrap as expected:redface: - a rectangle.

I had added a catmull-clark subdivision modifier, made it editable and hoped I could unwrap. 

Turns out if you make the wavy-plane editable, then unwrap, then add Subdiv modifier, make editable, then unwrap, you get a useable, close to rectangular UV.

You might ask why not just increase the 'section width' parameter and forego the subdiv modifier altogether ... the answer is because I also had a crumple modifier in the mix that I didn't mention above.

thanks again - shift studio.
