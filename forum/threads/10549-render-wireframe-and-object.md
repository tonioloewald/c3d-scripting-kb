# Render Wireframe and object

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10549/
- Subforum: scripting-general
- Started by **shmambu** on 2014-07-13; last post 2019-08-10; 15 posts

## #1 — shmambu — 2014-07-13
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-88695>

Render Wireframe and object

Hi, I was wondering if there is a script that could render an object and show the wireframe and polygon points. I think that Silo 2.3 does a pretty cool looking wireframe/polygon mesh. I'm trying to achieve a very minimalist look.
-Sam

Attachments: [Screen Shot 2014-07-12 at 4.58.57 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/23697/), [Screen Shot 2014-07-12 at 4.59.05 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/23698/)

## #2 — shmambu — 2015-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98523>

redo

BUMP, really would appreciate some help

## #3 — frank beckmann — 2015-11-22
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98524>

I don´t understand what you´re asking for. What´s the difference here:

Cheers
Frank

Attachments: [C3d.png](https://www.cheetah3d.com/forum/index.php?attachments/27873/)

## #4 — shmambu — 2015-11-29
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98546>

Basic wireframe

Basically, I'd like to be able to render anything as just the lines of the polygons. 

Like this (the first entry): 
http://i.stack.imgur.com/MShnU.png

Links: http://i.stack.imgur.com/MShnU.png

## #5 — frank beckmann — 2015-11-29
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98548>

"Bounding Box" won´t work for you?

		
	
Cheers
Frank

## #6 — pjedvaj — 2015-12-01
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98572>

If you want to render it you need to make a material:

Add Default > Material and go to the Node editor
RMB Add Node > Textures > Wireframe
In Wireframe change Color 0 to white and Color 1 to black
Select Color output in Wireframe and drag it to the Transparency of Material
Set Specular to black and Index of refraction to 1
Apply the Material to the mesh and adjust the Line width

## #7 — frank beckmann — 2015-12-01
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98573>

I thought we´re talking about the 3d view as Silo has no renderer. :redface: 

Cheers
Frank

## #8 — pjedvaj — 2015-12-01
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98574>

[[QUOTE:  frank beckmann said: I thought we´re talking about the 3d view as Silo has no renderer. :redface: Cheers Frank Click to expand... ]]

Silly me, I didn't realised that you talk about Silo, not Cheetah.

## #9 — frank beckmann — 2015-12-01
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98576>

Let´s see what user shmambu had in mind. 

Cheers
Frank

## #10 — shmambu — 2015-12-06
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98644>

Exactly!

thanks guys for the lovely feedback!

Frank this post:

[[QUOTE:  frank beckmann said: "Bounding Box" won´t work for you? Cheers Frank Click to expand... ]]
is exactly what I wanted. Thank you!

and also, pjedvaj, thanks for this material tip. I'll make sure to try this too!

Best, 

-shmambu

## #11 — shmambu — 2015-12-07
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98649>

[[QUOTE:  frank beckmann said: Let´s see what user shmambu had in mind. Cheers Frank Click to expand... ]]

Actually, frank what I really wanted was to be able to render something as Bounding-Box. Not just in the editor, but post-render too. 

Let me know if this is possible. I'd love to know!

Thanks, 
-shmambu

## #12 — frank beckmann — 2015-12-07
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98651>

It´s already written down here: http://www.cheetah3d.com/forum/showpost.php?p=98572&postcount=6  

Cheers
Frank

Attachments: [Wire.png](https://www.cheetah3d.com/forum/index.php?attachments/27909/)

Links: http://www.cheetah3d.com/forum/showpost.php?p=98572&postcount=6

## #13 — shmambu — 2015-12-08
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-98656>

Wonderful

Thanks frank!

## #14 — frank beckmann — 2019-08-10
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-117023>

Are you sure?

Cheers
Frank

## #15 — uq6 — 2019-08-10
<https://www.cheetah3d.com/forum/index.php?threads/10549/post-117025>

[[QUOTE:  frank beckmann said: Are you sure? Cheers Frank Click to expand... ]]
Further testing showed that Falcon and Cheetah worked fine.  As usual, you're right!
