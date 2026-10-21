# Text Spline Around a circle

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10864/
- Subforum: scripting-general
- Started by **ml1986** on 2014-11-22; last post 2014-11-23; 11 posts

## #1 — ml1986 — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91744>

Text Spline Around a circle

Hi there

Is it possible to set a text spline around a full circle, much like for creating a dial for a clock or a compass. 

Any help would be great.

## #2 — ZooHead — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91751>

Illustrator or similar program would do the job.
​

Attachments: [Text on Path.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25150/)

## #3 — ml1986 — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91752>

Hi

Thanks for the quick reply. Would this be converted to a spline? As I need the text to be engraved on an object.

## #4 — ZooHead — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91753>

[[QUOTE:  ml1986 said: Hi Thanks for the quick reply. Would this be converted to a spline? As I need the text to be engraved on an object. Click to expand... ]]

Yes, in Illustrator convert to outlines, then make it a compound path and save as SVG. In Cheetah use import.

Extra tip: In Illustrator, move it close to the lower left corner of the document before you 
save as, that corner will be the world center point in Cheetah. It makes it easier to find.
​

Attachments: [Text on Path C3d.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25151/)

## #5 — ml1986 — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91755>

hi

thanks again for ur help. I've followed your advice and have imported a text as an sag file. However I can't seem to create anything with it. 

Can I extrude the text. Or perhaps find a way to engrave it to an object.

## #6 — ZooHead — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91760>

[[QUOTE:  ml1986 said: hi thanks again for ur help. I've followed your advice and have imported a text as an sag file. However I can't seem to create anything with it. Can I extrude the text. Or perhaps find a]]

To extrude use the Extrude Creator, just put the spline into it and experiment with the settings. 
Be careful, Cheetah doesn't stop you from making a mess. 

Low bevel settings are best with enough sections. (I used 5)
And check the internal structure in wireframe mode to see if it's messed up.

Insetting the text is possible with a Boolean Creator, but it makes all triangles, 
which is not the best. Also a Displacement Modifier may do what you need.
​

Attachments: [Text on Path Extrude.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25152/)

## #7 — frank beckmann — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91763>

No need to leave Cheetah3d for this.
Fully parametric set up:

Cheers
Frank

Attachments: [Dial.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/25155/), [Dial.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/25156/)

## #8 — ZooHead — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91765>

[[QUOTE:  frank beckmann said: No need to leave Cheetah3d for this. Fully parametric set up: Cheers Frank Click to expand... ]]

Cool Frank, I like that one.
​

## #9 — ZooHead — 2014-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91778>

Just to add, the all Cheetah method (red) 
distorts the text, the Illustrator method doesn't.
​

Attachments: [Text on Path Boolean.jpg](https://www.cheetah3d.com/forum/index.php?attachments/25166/)

## #10 — frank beckmann — 2014-11-23
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91781>

While all deformers do what they do I was a bit unmindful; a larger radius at the wrap-modifier will almost recreate the font shape:

Cheers
Frank

Attachments: [WrappedFont.png](https://www.cheetah3d.com/forum/index.php?attachments/25169/)

## #11 — ZooHead — 2014-11-23
<https://www.cheetah3d.com/forum/index.php?threads/10864/post-91783>

[[QUOTE:  frank beckmann said: While all deformers do what they do I was a bit unmindful; a larger radius at the wrap-modifier will almost recreate the font shape: Cheers Frank Click to expand... ]]

Can you send the file over, I'd like to see your WrapMod settings. 
I'm trying to understand them all and I'm having some trouble.
​
