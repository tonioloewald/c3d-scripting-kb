# Follow the yellow brick Spline

- Thread: https://www.cheetah3d.com/forum/index.php?threads/718/
- Subforum: script-downloads
- Started by **ToddWR** on 2006-06-05; last post 2009-05-05; 10 posts

## #1 — ToddWR — 2006-06-05
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4505>

Follow the yellow brick Spline

Place this in the polygonobj scripts folder. the first object needs to be a spline object, the second object will move along the spline based on the percentage in the parent object.

have fun
Todd 

http://www.geocities.com/todd_w_r/mov/ObjectTrack.js.zip

Links: http://www.geocities.com/todd_w_r/mov/ObjectTrack.js.zip

## #2 — peer — 2006-06-05
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4511>

Very nice!!! Do you think it could be possible to use it with a camera? That would make fly-throughs much easier!! At least we can make cars follow roads etc. Does the object keeps its rotation or does it rotate along with the path? A well still playing with your wave generator!! You've got some nice scripts here!!! Thanks again!

Regards,

Peter

## #3 — ToddWR — 2006-06-05
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4514>

peer,
yes it would make fly-throughs easier, however at this time I am just re-building the entire object in a new location. in 3.3 hopefully setParameter will work and then this script would work for any object.
I will work on making the object 'follow' the path next, for now thats up to you

Todd

## #4 — Martin — 2006-06-06
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4520>

Hi Todd,
that is a really interesting work arround about a missing feature in Cheetah3D. :grin: 
At the moment I'm working on scripting again so a tag solution to that problem isn't to far away.

I've read your script and found some performance slow downs. I just had to change some lines of code and it ran almost twice as fast. Is it OK for you if  I post my modified version here.

Bye,
Martin

## #5 — ToddWR — 2006-06-06
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4529>

Martin,
Please do post the improved version. That way I can learn what is different and improve my skills.

Todd

p.s.   I'll update the file so anyone DLing it will get the better version

## #6 — Martin — 2006-06-06
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4531>

Hi,
here is the accelerated version. In general avoid creating new vectors and matrices if possible since allocating and deallocating objects cost quite some time.

Bye,
Martin

Attachments: [Object Track.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/848/)

## #7 — ToddWR — 2006-06-06
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4533>

Hi all
I've updated the Object Track script with Martin's improvements, also added two buttons: for hiding/showing the spline and object. Just thought that it would save time and avoid confusion when there might be more of them.
The original link is the updated file.

Todd

## #8 — ToddWR — 2006-06-07
<https://www.cheetah3d.com/forum/index.php?threads/718/post-4535>

Martin,

I just noticed something, the object inside my object track script; modify it and no problem. the problem is when the inside object is rotated the rotation is not carried through.  Isn't that how modCore is supposed to work or is rotation not a modifier? the same is true for scale and position.

confused
Todd

## #9 — murcielago — 2009-05-05
<https://www.cheetah3d.com/forum/index.php?threads/718/post-29098>

question

How does this work again?

I tried it but nothing happens.

## #10 — frank beckmann — 2009-05-05
<https://www.cheetah3d.com/forum/index.php?threads/718/post-29101>

Hi.
Seems´s out of date (nearly 3 years old).
I think  it´s replaced by the spline tracking tag.

Cheers
Frank
