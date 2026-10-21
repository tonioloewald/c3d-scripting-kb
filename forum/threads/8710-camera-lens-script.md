# Camera Lens Script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8710/
- Subforum: script-downloads
- Started by **chris g** on 2012-08-02; last post 2012-12-07; 10 posts

## #1 — chris g — 2012-08-02
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72343>

Camera Lens Script

I saw somewhere else on the forum that someone had created a table listing a camera's field of view and equivalent focal lengths, but I didn't want to have to look up the focal length in a chart to get the field of view every time. So, I wrote a script that sets the cameras field of view automatically based on the focal length.

* Sets the active camera's field of view based on focal length of a lens on a full frame 35mm camera. 
* A different focal length can be set for each camera by parenting the lens script to the camera.
* Lens can be animated to create a zoom lens effect.
* Default is focal length is 33mm, which I based on Cheetah3D's default field of view.

Copy file into Polygonobj folder.

I didn't see a script that already did this. Hopefully someone will find it of use. Tested and known to work under Cheetah3D v6.

****
NEW version: 
Click link to download updated script.

http://www.cheetah3d.com/forum/showpost.php?p=72673&postcount=7

****

-chris

Links: http://www.cheetah3d.com/forum/showpost.php?p=72673&postcount=7

## #2 — podperson — 2012-08-02
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72350>

Great idea. Now go look up the stuff on depth of field and figure out how to script the DoF modifier ;-)

## #3 — chris g — 2012-08-03
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72359>

podperson,

Ha! It's funny, I was going to add a DOF setting to the script, but it wasn't imperative to the project I was working on, so I dropped it. I just needed to be able to match focal lengths to an After Effects Camera. And frankly all the math gives me a headache.

But since you mentioned it, when I have time again I'll take a look at adding it. 

-chris

## #4 — tg_jp — 2012-08-03
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72363>

Hi, 

it's nice script.

about DOF and exporting for AfterEffect. please check these scripts. I hope it would help.

DOF Helper.js
http://www.cheetah3d.com/forum/showthread.php?t=808

Cheetah2AE.js
http://www.cheetah3d.com/forum/showthread.php?t=7904

regards.

tg_jp, Hiroto

Links: http://www.cheetah3d.com/forum/showthread.php?t=7904, http://www.cheetah3d.com/forum/showthread.php?t=808

## #5 — chris g — 2012-08-03
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72382>

Hiroto,

I wish I had found that After Effects scripts earlier, I might not have gone down the path of making my own. As a point of difference, I opted to export to xml file and then import the xml via a .jsx script. 

I just started to write code to create nulls for tracking points, and wasn't sure how I wanted to handle it. I like what you did and was thinking of doing the same, but it produces a lot of unneeded data. I'm going to have to rethink how I do it now.

thanks for your help.

-chris

## #6 — podperson — 2012-08-20
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72658>

As I understand it:

Circle of Confusion (blur) ~ Aperture Size (1/f-number).

Angle of View = 2.arctan( "image dimension" / 2."focal length" )
-- "image dimension" is 1.0 in Cheetah 3d, and corresponds to the width or height of the rendered area, whichever is larger
-- "focal length" in this case needs to be inferred from Angle of View, so:
"focal length" = Tan( Angle of View ) / 2

f-number ~ 1/"lens radius" (the value in the C3D DOF tag)

What I don't know is how to convert "lens radius" to a real world value. I believe that:

aperture = "lens diameter" / "focal length" (where in this case lens diameter is the actual diameter of the front element). If so, we might have:

aperture = "lens radius" / tan( Angle of View )

## #7 — chris g — 2012-08-21
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72673>

@ Podperson, maybe this will help....

Finished this up last week and did some testing over the weekend with a real world camera to verify settings, so I think they are fairly accurate.  It seems to be good to go.

New Version! v1.2 attached below.

Copy file into <User>/Library/Application Support/Cheetah3D/Scripts/Polygonobj folder. Restart Cheetah3D.

New in this version.

* The Camera Lens script will respect field of view settings on the camera, if they were changed before adding Camera Lens.
	
* Enable Depth of Field: Enables DOF settings. A DOF tag will be created automatically on the current camera if one doesn't already exist.

* Aperture (f/stop): Set the f/stop to control the depth of field. Valid entries are 1 - 128. Default f/stop is 5.6, the smaller the number the shallower the depth of field and the more blur.

* Focal Distance: Manually adjusts the the focal point of the camera.

* Scale: Adjusts the Depth of Field (DOF) settings to aproximate the same Depth of Field one would get if the scene/object were full scale (1:1). Scaling is handy for objects that are very large or very small. For example it's not practical to build a city at 1:1 scale in a 3D program, so one might build it at ratio of 1:100 where 1 unit of measurement is equal to 100. But without scaling the DOF, the city rendered from the same distance, with same aperture and focal length would have a DOF the same as if you were photographing a model city.

* Target: Drag and Drop an object into Target to set the focal distance to that object. Setting the target will override the Focal Distance settings. To manually set the Focal Distance, delete the target object.
	
* Thanks to Hiroto Tsubaki (tg_jp) and his 'DOF Target.js' and 'DOF Helper.js' scripts for giving me an idea how to handle depth of field settings and the math for handling obj2Worldmatrix data.

-chris

Attachments: [C3DCameraLens.v1.2.zip](https://www.cheetah3d.com/forum/index.php?attachments/17760/)

## #8 — podperson — 2012-08-22
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-72681>

Great stuff!

## #9 — Resolution Television — 2012-12-07
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-75239>

Hi, 

New to the forum here - but just wanted to say thanks for such a great script.

I'm just experimenting tracking a camera past some 3d text with focus pull along the text too. Your script (along with the accessibility of Cheetah3D) has made it intuitive and simple to accomplish.

Thanks again.

## #10 — chris g — 2012-12-07
<https://www.cheetah3d.com/forum/index.php?threads/8710/post-75240>

@Resolution Television

thanks man. I really appreciate it.
