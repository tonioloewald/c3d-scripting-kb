# Change all objects to render 'flat'

- Thread: https://www.cheetah3d.com/forum/index.php?threads/812/
- Subforum: scripting-general
- Started by **ROI** on 2006-07-28; last post 2006-08-04; 6 posts

## #1 — ROI — 2006-07-28
<https://www.cheetah3d.com/forum/index.php?threads/812/post-5137>

Change all objects to render 'flat'

Hi,

I'm trying to find an easy way to fix a problem with importing: DXF objects are by default imported with their shading set to "constraint", but I would prefer them set to "flat" (generally my models are flat-sided).  To change this by hand can take a long time if there are many objects, so I wondered could anyone help me make a simple script to do this automatically?

Thank you.

## #2 — ROI — 2006-07-28
<https://www.cheetah3d.com/forum/index.php?threads/812/post-5138>

...or is there a way to change the default for DXF imports?

## #3 — Martin — 2006-07-29
<https://www.cheetah3d.com/forum/index.php?threads/812/post-5144>

Hi,
just go through the scenegraph and set the normalType parameter of all polygon objects to 0.

	
	


```
obj.setParameter("normalType",0);
```


[[QUOTE:  ROI said: ...or is there a way to change the default for DXF imports? Click to expand... ]]

Sorry, not via script.

Bye,
Martin

## #4 — ROI — 2006-07-30
<https://www.cheetah3d.com/forum/index.php?threads/812/post-5155>

[[QUOTE:  Martin said: Hi, just go through the scenegraph and set the normalType parameter of all polygon objects to 0 Click to expand... ]]

Ahh, Martin - you make it sound so easy!  I think I understand what you mean, but unfortunately I don't know how to write any javascript to make it happen. I could manually modify the "normalType" tags in the .jas file using a text editor, but I'm sure there's a better (and safer) way.

Sorry to take up your time to answer newbie questions... when you could be working on making Cheetah even better.  Thank you anyway.

## #5 — Martin — 2006-07-31
<https://www.cheetah3d.com/forum/index.php?threads/812/post-5169>

Hi,
oh please don't mess up with the .jas files directly. You can also set the flat shading in Cheetah3D. Just use the "Smooth" property of the polygon object to "flat".

I've written the script for your. Just copy it to the "Scripts/Macro" folder and restart Cheetah3D. 
To call the script use the menu command "Tools->Scripts->Macro->SetShadingFlat.js"

Bye,
Martin

Attachments: [SetShadingFlat.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/1021/)

## #6 — ROI — 2006-08-04
<https://www.cheetah3d.com/forum/index.php?threads/812/post-5251>

Martin, you're a star - thank you so much.
