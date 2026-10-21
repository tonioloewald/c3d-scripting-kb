# Voxelate Script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10106/
- Subforum: script-downloads
- Started by **tonbut** on 2014-01-19; last post 2014-02-09; 24 posts

## #1 — tonbut — 2014-01-19
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84591>

Voxelate Script

Hi All,

just wanted to post this Polygon script I've been working on which converts objects into voxels (cube pixels). I've been using this for a few weeks now and seems quite stable but it can be slow with a large numbers of voxels and/or polygons in the underlying object. To get it to work place the object you want to voxelate as the first child of the Voxelate object.

Here is a quick run through of the parameters on the script:
Voxel Size: voxels are cubes this is the length/width/height
Origin: if origin is odd then a voxel is placed centred on origin, if even then the corners are placed on origin
Skin Tolerance: adjust what proportion (0-1) of voxel distance is detected as skin (fine tuning)
Skin Offset: adjust what position the skin is relative to actual polygons (-ve=inside, +ve=outside)

Y Truncate: trim top proportion of shape so you can see inside (useful for designing or fx)
Dissolve: remove a random proportion of the voxels (0-1)

Voxel Volume: proportion of voxel space filled by cube (0-1)
Cull Adjacent: if voxel volume is 1 then you can cull inside surfaces as you can't see them

Have fun and let me know any problems or queries,

Cheers, Tony

Attachments: [Voxelate.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/21998/), [image.jpg](https://www.cheetah3d.com/forum/index.php?attachments/22000/)

## #2 — frank beckmann — 2014-01-19
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84592>

How cool is that?  
Thank you very much, Tony.

Cheers
Frank

## #3 — Swizl — 2014-01-19
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84593>

Very cool indeed! Thanks for sharing. Will try the script out when I get a chance.

## #4 — uncle808us — 2014-01-19
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84594>

Very cool I like it! Thanks very much.:icon_thumbup:

Attachments: [Voxelate.jpg](https://www.cheetah3d.com/forum/index.php?attachments/22001/)

## #5 — Helmut — 2014-01-19
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84595>

Thank you, Tony
This is very useful for some trickery I have been pondering recently.
Greetings from Vienna
Helmut

## #6 — ZooHead — 2014-01-19
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84597>

Awesome tool, thank you.
​

## #7 — pegot — 2014-01-22
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84669>

Really fun script - especially when you combine it with iosurfaces (reduce resolution down to 8 lowest).

Attachments: [Iosurface-and-Voxelate.mp4.zip](https://www.cheetah3d.com/forum/index.php?attachments/22037/)

## #8 — uncle808us — 2014-01-22
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84700>

[[QUOTE:  pegot said: Really fun script - especially when you combine it with iosurfaces (reduce resolution down to 8 lowest). Click to expand... ]]

That was cool....

## #9 — llamapixel — 2014-01-24
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84779>

V6 compatability?

Is there something I should be doing to make this work?

https://www.dropbox.com/s/nvrtaa8ytdef93t/Screenshot 2014-01-24 14.12.03.JPG

Links: https://www.dropbox.com/s/nvrtaa8ytdef93t/Screenshot%202014-01-24%2014.12.03.JPG

## #10 — tg_jp — 2014-01-24
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84780>

so cool:icon_thumbup: 

tg_jp, Hiroto

## #11 — Swizl — 2014-01-24
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84781>

[[QUOTE:  llamapixel said: Is there something I should be doing to make this work? https://www.dropbox.com/s/nvrtaa8ytdef93t/Screenshot 2014-01-24 14.12.03.JPG Click to expand... ]]

1. Put the script in the ~/user/library/application support/Cheetah 3d/Scripts/polygonobect
2. Restart C3d
3. Collapse your mesh if it's a parametric or if you've used a modifier / creator.
4. Select the script from the menu
5. Drag the object you want to Voxelate into the script in the object browser.
6. Adjust Voxel settings.

I think these are the proper steps. Modifiers / Creators may work without collapsing. I'm on my phone so I can't try it out.

## #12 — tonbut — 2014-01-24
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84794>

[[QUOTE:  llamapixel said: Is there something I should be doing to make this work? https://www.dropbox.com/s/nvrtaa8ytdef93t/Screenshot 2014-01-24 14.12.03.JPG Click to expand... ]]

I'm no expert in scripting but my guess is that you didn't put the script into the correct folder - it needs to go into the Polygonobj folder (i.e. /Users/you/Library/Application Support/Cheetah3D/Scripts/Polygonobj/ ) Also check you are using the latest version of Cheetah.

Cheers, Tony

## #13 — llamapixel — 2014-01-25
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84830>

Thank you very kindly guys.

I had the script in an incorrect area ( tool script folder )

## #14 — omniflair — 2014-01-31
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84967>

Hey, thanks for the script. This will be really useful!

I was just wondering what the best way would be to texture the voxels individually - as in making each voxel look like a Minecraft dirt block. Perhaps is there a script out there that would automatically separate them into different objects? I tried UV mapping the entire thing (after making it a raw polygon object) but that didn't work.

## #15 — ZooHead — 2014-01-31
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-84968>

[[QUOTE:  omniflair said: Hey, thanks for the script. This will be really useful! I was just wondering what the best way would be to texture the voxels individually - as in making each voxel look like a Minecr]]

I found if you set Voxel Volume to .999 and uncheck Cull Adjacent, then make it editable and you end up with full cubes
but disconnected. If you leave Cull Adjacent checked you get only the outside faces but disconnected.
​

## #16 — omniflair — 2014-02-02
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85036>

[[QUOTE:  ZooHead said: I found if you set Voxel Volume to .999 and uncheck Cull Adjacent, then make it editable and you end up with full cubes but disconnected. If you leave Cull Adjacent checked you get only]]

Thanks for the tip. The problem is texturing the cubes - automatically unwrapping the UV for all of them together just doesn't work and it would take forever to do it manually. A nice feature of the script would be for it to create particles so I could put my own textured cube on them.

## #17 — frank beckmann — 2014-02-02
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85038>

Maybe this ingenious approach will help you out: Mesh out of bricks

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showpost.php?p=55754&postcount=1

## #18 — omniflair — 2014-02-04
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85076>

[[QUOTE:  frank beckmann said: Maybe this ingenious approach will help you out: Mesh out of bricks Cheers Frank Click to expand... ]]

Thanks Frank  This is perfect for what I needed!

## #19 — tonbut — 2014-02-04
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85104>

[[QUOTE:  frank beckmann said: Maybe this ingenious approach will help you out: Mesh out of bricks Click to expand... ]]

Nice.

I thought about the particle approach to creating voxels because that seems to give more flexibility but I didn't quite work it out. Maybe next iteration...

## #20 — podperson — 2014-02-05
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85113>

Neat script (I notice you're doing collision detection to calculate the interior). The script might be simpler (and more versatile) if it were implemented as a particle system (instead of building each voxel, just create a particle instance). Your voxels eliminate interior faces, but they're always cubes.

## #21 — tonbut — 2014-02-07
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85185>

Hi Guys,
I've had a go at converting this script into a particle script. It's pretty much working but I have one problem. I want the first child of the voxelate script to be the object to voxelate and the second to be the voxel. The problem is that no matter what particle.setIndex() I set the particles seemed to get assigned round-robin to each child. This is my code:

var    part=core.addParticle();
part.setPosition(p);
part.setScale(size);
part.setIndex(1);

Any ideas anyone?

Cheers, Tony

Attachments: [ObjectBrowser.png](https://www.cheetah3d.com/forum/index.php?attachments/22206/), [3dview.png](https://www.cheetah3d.com/forum/index.php?attachments/22207/)

## #22 — tonbut — 2014-02-07
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85187>

I managed to make a bit of progress with this problem. If I add a particle tag to the child object I want to voxelate and set frequency to 0.0 then it stops any of the particles from using that object. So... it works, but not ideal. I still don't understand why particle.setIndex doesn't work as I expect.

Cheers, Tony

Attachments: [render.jpg](https://www.cheetah3d.com/forum/index.php?attachments/22208/)

## #23 — tg_jp — 2014-02-08
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85244>

hi

how about using addParameterfLink function to get reference guide object?

	
	


```js
function buildUI(obj) {
  ...
  obj.addParameterLink("Voxel Base", true);
  ...
}

function buildObject(obj) {
  ...
  
  // L.56 - 73  
  var child = obj.getParameter("Voxel Base");
  if (!child) return;
  ...
}
```


Mesh Particle with [ type: volume ] make almost same object, but script version can express more variations as you want.  

regards.

tg_jp, Hiroto.

## #24 — tonbut — 2014-02-09
<https://www.cheetah3d.com/forum/index.php?threads/10106/post-85251>

[[QUOTE:  tg_jp said: hi how about using addParameterfLink function to get reference guide object? Mesh Particle with [ type: volume ] make almost same object, but script version can express more variations as]]

Thanks Hiroto, addParameterLink looks like the best answer.

Mesh Particle is interesting. I'd not worked out how to use that before. Because it's not a script it is much much faster but it isn't quite as flexible.

Cheers, Tony
