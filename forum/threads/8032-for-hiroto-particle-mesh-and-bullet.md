# For Hiroto:Particle mesh and bullet

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8032/
- Subforum: script-downloads
- Started by **Daveroony** on 2012-01-18; last post 2012-01-22; 8 posts

## #1 — Daveroony — 2012-01-18
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66699>

For Hirotoarticle mesh and bullet

Hi Hiroto
I think these bullet scripts are wonderful, but, quite complex to figure out. Just when I think I'm getting it - it all goes belly up.

I've tried to figure out the process for my problem below, but I'm stuck....could you help in any way?

I've attached screen shots to roughly show what I'm trying to get.

The top image is a spline with extrude, with a particle mesh added. I want to be able to make the lettering collapse, as you can with particle array or Ideally, I want to fire an sphere into the 'E & X' of the word and it to smash through the lettering - is this possible?

The actual word finally used will be 'breaker', hence why I want to see it breaking apart.

I do have another question, but one problem at a time

If anyone else has any ideas too, I'd welcome the advice.

Thanks in advance

Attachments: [text.jpg](https://www.cheetah3d.com/forum/index.php?attachments/16366/)

## #2 — tg_jp — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66704>

Hi, thank you for your comment.

actually [physics simulation started by first collision] is not available yet with this script, maybe next script update or it's better to wait  Cheetah3D v6.0 releasing, off course.  

I think you can get fake effect something like that, though...

did you try to make simple collapse movie?

regards.

tg_jp, Hiroto

## #3 — frank beckmann — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66710>

Wouldn´t be any overlapping geometry causing problems?

Cheers
Frank

## #4 — Daveroony — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66711>

[[QUOTE:  did you try to make simple collapse movie? Click to expand... ]]

Thanks for replying both..
Not sure how to do collapse movie- is it a script? I have searched the forum and can only see posts related to unity- which I know nothing about!

Frank:is your comment a question or answer?  Not sure what you mean

Regards

## #5 — frank beckmann — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66712>

[[QUOTE:  Daveroony said: Frank:is your comment a question or answer? Not sure what you mean Regards Click to expand... ]]
From my experience overlapping objects will "explode" when you start the simulation as they want to get "air" in between. (You can´t have this in real world   )

Cheers
Frank

## #6 — tg_jp — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66713>

hi,

I made some, please check it.

http://www.youtube.com/watch?v=S-XUw0n_E2I

[[QUOTE:  Daveroony said: Thanks for replying both.. Not sure how to do collapse movie- is it a script? I have searched the forum and can only see posts related to unity- which I know nothing about! Click to e]]

no, I meant that you did make some with bullet script. anyway, I attach jas file of my try. please check it and movie.

as frank wrote, fake simulation may be needed for collapse of that particles letters, because bullet simulation requires physically correct scene.   

regards.

tg_jp, Hiroto.

Attachments: [collapse.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/16369/)

Links: http://www.youtube.com/watch?v=S-XUw0n_E2I

## #7 — Francois — 2012-01-19
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66715>

[[QUOTE:  Daveroony said: If anyone else has any ideas too, I'd welcome the advice. Click to expand... ]]

Actually, the ParticuleMarty.jas example that's coming with Cheetah3D can be a good base for a fake simulation. Look at the parameters of the particule tag when running/stopping the animation. Just invert the start and end keyframes to reverse the effect.

## #8 — Daveroony — 2012-01-22
<https://www.cheetah3d.com/forum/index.php?threads/8032/post-66821>

Wow!
Thanks Hiroto for putting this together for me, really appreciate it. 
I'm part way though rebuilding your file to get what I need from it. Seeing as the ball breaking through the text has to be faked, if I wanted another word sitting on top of the crumbling text to push down and finally rest on the broken bits, this would have to be faked too?

The other scene I was trying to recreate was a bouncing ball with loads of smaller balls within......the link below explains all should you wish to have a look.

http://greyscalegorilla.com/blog/20...ftbody-glass-mesh-with-dynamics-in-cinema-4d/

Thanks and regards

Links: http://greyscalegorilla.com/blog/2010/11/how-to-build-a-softbody-glass-mesh-with-dynamics-in-cinema-4d/
