# experimental - particles

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4334/
- Subforum: script-downloads
- Started by **ToddWR** on 2009-06-23; last post 2010-01-04; 5 posts

## #1 — ToddWR — 2009-06-23
<https://www.cheetah3d.com/forum/index.php?threads/4334/post-30298>

experimental - particles

I need some feedback on this script. Actually there are two scripts, one polygon script, one tag script. Put the particle engine.js script into the polygonobj folder. Put the particle.js into the tag folder. start cheetah

to demo:

	
	


```
  1. create a plane.
  2. set the sections width and depth to 5.
  3. make the plane editable.
  4. select all but a row of squares.
  5. add particle.js tag to the object.
  6. add particle engine.js to the project.
  7. click the scan button in the particle engine.
  8. uncheck reset at time zero.
  9. set a key at time zero for time zero.
 10. go to the end of the time line.
 11. set a key at the end for time 700. (any number will work)
 12. select the plane object in object mode.
 13. press play... and move the plane object around
```


the points that will move are the ones surrounded by other selected points.

the tag can also be applied to joints

Attachments: [particles.zip](https://www.cheetah3d.com/forum/index.php?attachments/7101/)

## #2 — frank beckmann — 2009-06-23
<https://www.cheetah3d.com/forum/index.php?threads/4334/post-30305>

Hi Todd.
Very very cool script.

Cheers
Frank

Attachments: [ToddsSoftBody.mov.zip](https://www.cheetah3d.com/forum/index.php?attachments/7103/)

## #3 — PurpleLizzard — 2009-11-29
<https://www.cheetah3d.com/forum/index.php?threads/4334/post-35878>

Hi Todd,

That script is simply amazing. However, is there a way to either keep the body from colliding with other objects or to rotate which direction it uses as down? I would like to make an animated cape with it, but it can't come to rest inside of my character.

Thanks.

## #4 — DarthSidious05 — 2009-12-20
<https://www.cheetah3d.com/forum/index.php?threads/4334/post-36715>

This looks cool from that movie clip, much like water in an ocean. 

I'm working on it, but can't "add the particle engine.js tag to the project". By project, is that the same as "object", as it brings up an error message and doesn't have any parameters. I'm missing something, any tips, thanks.

Javascript Error:
line: 986 
Object.setParameter() couldn't find parameter called name

## #5 — electronik_cat — 2010-01-04
<https://www.cheetah3d.com/forum/index.php?threads/4334/post-37095>

[[QUOTE:  ToddWR said: I need some feedback on this script. Actually there are two scripts, one polygon script, one tag script. Put the particle engine.js script into the polygonobj folder. Put the particle.js]]

Hi!

That script is awesome! I just wonder if there is any way to prevent the particle object from colliding with other objects, like clothes? If it`s not possible with this script, maybe you could update it a litte and add that, because that would make it the ultimate script     :icon_thumbup: :icon_thumbup: :icon_thumbup:
