# double sided colour

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5896/
- Subforum: scripting-general
- Started by **Allum** on 2010-06-23; last post 2010-06-23; 6 posts

## #1 — Allum — 2010-06-23
<https://www.cheetah3d.com/forum/index.php?threads/5896/post-44043>

double sided colour

Hi, I am sure this is dead simple but I can't work it out.
I want to put an object and camera inside a sphere, so when I travel the object with the camera I get a seamless horizon.

How do I put a colour or image on the inside sphere?
Do I have to put separate lights inside the sphere to light object?

I used to use Lightwave and they had a simple check box to make the mappings and colour objects doublesided.

## #2 — SurfingAlien — 2010-06-23
<https://www.cheetah3d.com/forum/index.php?threads/5896/post-44044>

with a script? or you simply posted in the wrong section...? :smile: 

if I got what you mean check archie's work here (see attached example, you can place any material instead of the (brilliant!) fake-HDRi mat)

cheers,
A

Links: http://www.cheetah3d.com/forum/showthread.php?t=5674

## #3 — Allum — 2010-06-23
<https://www.cheetah3d.com/forum/index.php?threads/5896/post-44048>

Yes, sorry probably the wrong place to ask, only been using Cheetah 3 weeks. 

That example is way to complicated for me to even try to comprehend but as you said totally brilliant. I could not see how that would apply to what I asked though.

I have since discovered that I was doing the right thing, except my camera was looking at the highlight on the inside of the sphere and I thought I was looking at a white background. 

Getting there slowly, I have just put my first Cheetah animations up on iStock and am awaiting approval . . . keep you posted

Bernard

## #4 — frank beckmann — 2010-06-23
<https://www.cheetah3d.com/forum/index.php?threads/5896/post-44051>

[[QUOTE:  Allum said: Hi, I am sure this is dead simple but I can't work it out. I want to put an object and camera inside a sphere, so when I travel the object with the camera I get a seamless horizon. Click ]]
All you need is kind of appropriate image; landscape/panorama format, jpeg, tiff radiance or whatever mapped via "Solid color" material to the sphere.
(The hdri tag attached to the camera will do the same just to let you know.)

Cheers
Frank

## #5 — Allum — 2010-06-23
<https://www.cheetah3d.com/forum/index.php?threads/5896/post-44053>

many thanks, will try 
Bernard

## #6 — SurfingAlien — 2010-06-23
<https://www.cheetah3d.com/forum/index.php?threads/5896/post-44060>

[[QUOTE:  Allum said: Yes, sorry probably the wrong place to ask, only been using Cheetah 3 weeks. That example is way to complicated for me to even try to comprehend but as you said totally brilliant. I could]]

no probs Bernard, it was quite clear but I was just asking if you wanted a script solution for your task...
honestly I was thinking about another (and more simple) work from archie but I couldn't find it so I gave you that link... you shouldn't look at the complicated procedural-fake-hdri material but simply put your own on the big sphere as Frank told you.
an hdri does the trick in a more simple way though (again as Frank said)

happy cheetah-ing
A
