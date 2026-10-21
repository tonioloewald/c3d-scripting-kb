# How Render Black Matte Plastic Case

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11726/
- Subforum: scripting-general
- Started by **QCI1** on 2016-03-03; last post 2016-04-16; 7 posts

## #1 — QCI1 — 2016-03-03
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-99899>

How Render Black Matte Plastic Case

Hello,

I am trying to render a realistic image of a Matte Black Plastic Case. The size of an iPhone case. What are the best Materials, Lighting and Render settings. I have tried it but mine still looks too fake. The case also has 3 lights.
Is there a tutorial for this? Pic attached.

Thanks,
QCI1

Attachments: [Work.png](https://www.cheetah3d.com/forum/index.php?attachments/28472/), [Render.png](https://www.cheetah3d.com/forum/index.php?attachments/28473/)

## #2 — frank beckmann — 2016-03-03
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-99900>

Oops - we´re in the scripting forum right now - you did it again.  
i´d take the Help->Cheetah3d samples->Rendering->Pig.jas file as a starting point. Once you´ve got the lighting right we can adjust the material.

Cheers
Frank

## #3 — frank beckmann — 2016-03-03
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-99901>

Here´s what I´m talking about:

Cheers
Frank

Attachments: [MatPlastic.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/28474/)

## #4 — QCI1 — 2016-03-03
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-99902>

Wow!

Frank, I built the Material that you recommended then copy/pasted the whole case object into the Pig.jas file. What an amazing difference!
Thank you!

I will not be greedy and ask how this Surface Detail was made!
http://www.cheetah3d.com/forum/showthread.php?t=10326&highlight=plastic

Thanks again, Frank! I will try to post in the correct forum section next time.

QCI1

Attachments: [after.png](https://www.cheetah3d.com/forum/index.php?attachments/28475/)

Links: http://www.cheetah3d.com/forum/showthread.php?t=10326&highlight=plastic

## #5 — frank beckmann — 2016-03-03
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-99903>

[[QUOTE:  QCI1 said: I will not be greedy and ask how this Surface Detail was made! http://www.cheetah3d.com/forum/showthread.php?t=10326&highlight=plastic Click to expand... ]]
Turn off "Fresnel" and lower the Reflection value for instance.

Cheers
Frank

## #6 — QCI1 — 2016-03-03
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-99904>

Thank you, Frank.
I turned off Freznel but the render came out too black.
That said, you saved this project! I will adjust the Reflections and see how it turns out. 
Thanks, again for the help!

Attachments: [freznel.png](https://www.cheetah3d.com/forum/index.php?attachments/28476/)

## #7 — icodealot — 2016-04-16
<https://www.cheetah3d.com/forum/index.php?threads/11726/post-100433>

[[QUOTE:  QCI1 said: ..What an amazing difference! ... Click to expand... ]]

Image based lighting is a great way to get realistic renders. To do that in C3D you add tags to your camera instead of creating all of your lights by hand. (Did your original camera setup use an HDRI and Radiosity tag?)

You can achieve some very realistic renders with materials by playing around with those two tags. Keep in mind you will need to load an image into the HDRI and the source image used will change the tone and reflection mapped to the render.

Study the camera in the Pig.jas that ships with C3D and you'll see the tags there that you can build into any scene where you want image based lighting.

Attachments: [hdri_example.png](https://www.cheetah3d.com/forum/index.php?attachments/28684/)
