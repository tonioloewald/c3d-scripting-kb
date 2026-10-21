# Let the sun shine in...

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1161/
- Subforum: script-downloads
- Started by **ToddWR** on 2006-12-19; last post 2006-12-21; 9 posts

## #1 — ToddWR — 2006-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7325>

Let the sun shine in...

everyone,

here is the first drift of a script to position a light source just like it was the sun. this is a tools folder script. After martin makes an improvement to the script tags, I will redo this to be a tag for a light source

have fun

Todd

Attachments: [theSun.zip](https://www.cheetah3d.com/forum/index.php?attachments/1502/)

## #2 — peer — 2006-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7327>

Hi Todd, nice tool!
One thing though. Maybe this has something to do with the twilightzone, but when I enter the following settings, I get the "below the horizon" warning. The settings are for Rotterdam on july 29 2006 at 11 in the morning.

Regards,

Peter

Edit: maybe you can have settings for East/West and North/South?
If you made the script for American users you get different results compared to europe or australia I think.

Attachments: [Picture 1.png](https://www.cheetah3d.com/forum/index.php?attachments/1497/)

## #3 — ToddWR — 2006-12-19
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7351>

peer,

thanks, I looked into it with a fresh head and found the problem. Plus I added a bonus, see if you can see what it is.
latitude is positive to the NORTH, and longitude is positive to the WEST of the prime meridian, negitive values are to the SOUTH and EAST.

Todd

Attachments: [theSun.zip](https://www.cheetah3d.com/forum/index.php?attachments/1501/)

## #4 — peer — 2006-12-20
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7357>

Thanks for updating the script. I could find the bonus inside Cheetah, but when I looked through the code I saw some cities with coordinates. Is this the bonus? Does the script also change the angle of a distant light? I couldn't make that up in the script (I'm a complete beginner at scripting).
I made a solar animation from 6 in the morning to  6 in the evening. I only had to set an extra key on the 12 o'clock position of the light. This is very nice!!

Regards,
Peter

Attachments: [Sun.zip](https://www.cheetah3d.com/forum/index.php?attachments/1505/)

## #5 — Martin — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7363>

Hi Todd,
very useful script. I was ask quite some times for such a function. Now you took the work from me. Thanks. :smile: 

Bye,
Martin

## #6 — ToddWR — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7365>

Martin,
I would rather have this as a 'Tag' script instead of a tool script, so the sun could animated in an easier way.

speaking of requested features.... any that might be implimented as a script? I am always looking for things to do instead of modeling... just an idea  

Todd

P.s.

for any that desire for the sun (read area light) to point at the origin (0,0,0) look for the following line in the makeIt function:

	
	


```
	obj.setParameter("position",pos);
```


add the following line after it and BINGO, the light source points at (0,0,0)

	
	


```
	obj.setParameter("rotation",new Vec3D(-ang.x-north,0,ang.y + 90));
```


happy modeling
Todd

p.p.s

the hidden bonus is that the entries are saved to a file and reloaded when the script is loaded next time. 
martin, I created a cheetah3d folder at /Library/Application Support/Cheetah3D in order to save any prefs of my scripts... hope that is ok

## #7 — peer — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7366>

Hi Todd,

The script works great with the added line of code! This is a great tool. Indeed it would be nice if you could turn it into a tag.

Regards,

Peter

## #8 — tg_jp — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7369>

Hello, Tod.

great script!! works fine.

and your idea about script's prefs is useful. Possibly may need some guidelines about preferences file folder of scripts in the future.  

by the way, the lights is headed to -Y by default. 
So the code for rotation wiil be

	
	


```
obj.setParameter("rotation",new Vec3D(-ang.x-north,0,ang.y - 90));
```


regards.

Hiroto, tg_jp

## #9 — ToddWR — 2006-12-21
<https://www.cheetah3d.com/forum/index.php?threads/1161/post-7376>

Hiroto,

thanks for that correction, it seems like I am always having problems with changing the sign of the answer  lol

Todd
