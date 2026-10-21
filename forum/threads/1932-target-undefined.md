# target UNDEFINED!

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1932/
- Subforum: scripting-general
- Started by **ToddWR** on 2007-07-13; last post 2007-07-15; 2 posts

## #1 — ToddWR — 2007-07-13
<https://www.cheetah3d.com/forum/index.php?threads/1932/post-13316>

target UNDEFINED!

Martin,

while working on a script, I need to locate the object (joint most likely) that has the IK handle on it and that contains a target. When I use a script to print out info on the objects I get this:

	
	


```
String:scriptName = 
Bool:locked = false
Vec3D:position = (0,0,0)
Vec3D:scale = (1,1,1)
Vec3D:rotation = (0,0,0)
Bool:tagOn = true
Int:priority = 10
Int:length = 3
Int:solver = 0
Int:target = undefined
Int:pole = undefined
Bool:usePreferedAngle = false
Vec4D:color
```


this is the info for the IK Handle tag.  the target and the pole values are undefined so there is no way to see what the target actually is. 
I will find a way to work around this.

Thanks
Todd

## #2 — Martin — 2007-07-15
<https://www.cheetah3d.com/forum/index.php?threads/1932/post-13387>

Hi Todd,
links aren't accessible via Javascript yet. But once implemented they could return the object to which they are connected.

Bye,
Martin
