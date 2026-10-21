# Rounded Rectangle

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6698/
- Subforum: script-downloads
- Started by **Herb** on 2010-12-21; last post 2014-09-10; 16 posts

## #1 — Herb — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53309>

Rounded Rectangle

a, hopefully useful, spline script.

Herbert

Rev 1: Changed radius to absolut instead of relative units on suggestion of Frank.
Rev 2: Added Parameter "Orientation" to select "X", "Y", "Z"

Attachments: [RoundedRect.jpg](https://www.cheetah3d.com/forum/index.php?attachments/13387/), [Rounded_Rect_0_2.zip](https://www.cheetah3d.com/forum/index.php?attachments/13497/)

## #2 — frank beckmann — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53313>

Hi Herbert,
you did it again: cool addition. Very useful.:icon_thumbup: 
One thing though to adjust the Radius; is it possible to use units over %? I ask because using arrow keys&dragging is too slow.
Thank you.

Cheers
Frank

## #3 — Herb — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53314>

Hi Frank,
thought it would be a christmas present for you.

Now: Does your question mean that you prefer normal units instead of relative units, as implemented?
This can certainly be done. In this case I would check internally that the radius is not larger than the minimum of (W,H)/2 and set it back if necessary.
Would this be fine?

Herbert

## #4 — frank beckmann — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53315>

[[QUOTE:  Herb said: Hi Frank, thought it would be a christmas present for you. Now: Does your question mean that you prefer normal units instead of relative units, as implemented? This can certainly be done. ]]
Thank you.
Then I think I prefer units over percentage.:mrgreen: 

Cheers
Frank

## #5 — Herb — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53316>

Done.

Cheers, Herbert

## #6 — frank beckmann — 2010-12-21
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53317>

Cooler than cool!

That speed up things - don´t you think?:icon_thumbup: 

Thanks again and Happy Holidays!

Cheers
Frank

## #7 — Meshman — 2010-12-23
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53405>

Thanks Herb, these scripts are great!

## #8 — SurfingAlien — 2010-12-23
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53406>

Thanks a lot Herb!
I always thought we were missing this standard spline

cheers,
Alessandro

## #9 — Herb — 2010-12-23
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-53407>

As such cracks in C3D find these tools useful, Martin might agree to expose more spline methods to scripting 

Thanks to all for the positive echo

Herbert

## #10 — gille1981 — 2011-11-27
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-65334>

lines

Hey

Great script!

I tried it but i'v got strange ringcuts if a extract.

Can i get rid of them ? 

Pic:

## #11 — Herb — 2011-11-27
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-65335>

Hi Gilley,
these are not strange ringcuts, it is just the way C3D cuts a curve when making a parametric polygon editable.

Herb

## #12 — gille1981 — 2011-11-27
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-65336>

Hey Herb

Ok, but I want to take the "cover" off. How can i select the whole cover if there are so many divisions?

Thanks for the feedback

gille

## #13 — maruchan — 2014-09-10
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-89995>

Sorry to resurrect this old thread, but this script doesn't seem to work anymore...? Screenshot:

https://www.dropbox.com/s/sbok7vssyi9tht7/Screenshot 2014-09-10 13.49.53.png?dl=0

Links: https://www.dropbox.com/s/sbok7vssyi9tht7/Screenshot%202014-09-10%2013.49.53.png?dl=0

## #14 — frank beckmann — 2014-09-10
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-89997>

Mine´s still working. Your´s look like the rectangle coil.js script with 1 turn.

Cheers
Frank

Attachments: [Roundedrect.png](https://www.cheetah3d.com/forum/index.php?attachments/24310/)

## #15 — maruchan — 2014-09-10
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-89998>

Thanks, Frank. I see what you mean. Looks like I have a naming problem on my hands 

https://www.dropbox.com/s/p7iaiuor7rtnd1c/Screenshot 2014-09-10 14.54.43.png?dl=0

Links: https://www.dropbox.com/s/p7iaiuor7rtnd1c/Screenshot%202014-09-10%2014.54.43.png?dl=0

## #16 — frank beckmann — 2014-09-10
<https://www.cheetah3d.com/forum/index.php?threads/6698/post-89999>

You´re not the only one. I´m not sure where the "RoundedRectangular.js script came from. The "Rounded_Rect.js" still works here.

Cheers
Frank
