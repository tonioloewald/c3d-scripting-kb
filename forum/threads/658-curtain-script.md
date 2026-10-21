# Curtain Script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/658/
- Subforum: scripting-general
- Started by **peer** on 2006-05-09; last post 2006-05-12; 8 posts

## #1 — peer — 2006-05-09
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4207>

Curtain Script

Hello,

Is there someone who knows how to convert the reliefscript/tool into a script that makes curtain shaped models. I know it's possible to distort a plane using a displacement texture, but it would be nice to have a "curtain generator" or something so I don't have to create new displacement maps. Is there anybody that could help me? François or tg_jp?
Thanks in advance,

Regards,

Peter

## #2 — Francois — 2006-05-09
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4212>

[[QUOTE:  peer said: Hello, Is there someone who knows how to convert the reliefscript/tool into a script that makes curtain shaped models. I know it's possible to distort a plane using a displacement texture,]]

Peter,

I'm afraid I can't really help with scripting althought it may appear I could,  based on the couple of scripts I modified rather than I wrote. I am not really a programmer nor an expert in Javascript. But I will think about it and see if I  can produce something usable.
tg_jp is certainly a lot more experienced than me and his scripts are great !

François

## #3 — Martin — 2006-05-09
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4226>

Hi,
creating a curtain script shouldn't be to difficult. It's mainly a plane whose vertices are displaced. 
The biggest problem is probably to find a nice naturally looking function to displace the vertices since curtains are not very regular. So a simple sin() is probably not sufficient.

If I would have some more time I would try it. 

By,
Martin

## #4 — tg_jp — 2006-05-10
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4229>

Hello, Peter.

I think very simple curtain ( wavy plane ) generator is easy to make. 

but adding some effects ( wind, collision of other objects, gravity, etc.) are difficult for me. I try to make simple one on this weekend, because for long time I didn't play with script of Cheetah3D.:-D  

regards.

tg_jp

## #5 — peer — 2006-05-10
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4230>

Thanks for all your replies!! A simple curtain would be great!! I want to use it for architectural visualisations (stills). Please take your time tg_jp !

Regards,

Peter

## #6 — frank beckmann — 2006-05-10
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4233>

a curtain off the peg

Hi Peer.
Is a curtain not just an extruded spline  with a nice fabrictexture of course? Just wondering. Try it if you like. Its the simple version of a drape without curtainrail and ticking-off, but sewn with love;-)
regards
Frank

Attachments: [Curtain.jpg](https://www.cheetah3d.com/forum/index.php?attachments/767/), [Curtain.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/768/)

## #7 — peer — 2006-05-10
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4235>

Frank, thank you for the file! That's the way I'm making them now, but it would be nice to have an object that you can copy and by just tweaking a parameter would give you another curtain shape. It's a lot easier than to change every spline (zoom in select/move points, etc.). 
Again thanks in advance for helping!!

Regards,

Peter

Attachments: [Curtain.jpg](https://www.cheetah3d.com/forum/index.php?attachments/769/)

## #8 — tg_jp — 2006-05-12
<https://www.cheetah3d.com/forum/index.php?threads/658/post-4246>

Hi, Peter

please try this script. it can make just very simple wavy plane. if you want wind effect or collision effect, make it editable and use Magnet Tool or something.

http://cheetah3d.de/forum/showthread.php?p=4245

regards.

tg_jp

Links: http://cheetah3d.de/forum/showthread.php?p=4245
