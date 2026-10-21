# Export dae issues with 7.1

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12714/
- Subforum: scripting-general
- Started by **drugge** on 2017-12-23; last post 2017-12-23; 6 posts

## #1 — drugge — 2017-12-23
<https://www.cheetah3d.com/forum/index.php?threads/12714/post-110230>

Export dae issues with 7.1

I recently upgraded to 7.1 and after that it looks like the dae export works differently. I have a project where I open fbx files in Cheetah and after applying some materiels I export them to dae files. 
It has worked great in 6.x but now when I export the dae files the models are 100 bigger in size.
I opened a dae file which I exported in 6.x, and I could see the scale property was set to x: 100, y: 100, z: 100.
I exported the same model but in 7.1, and I could see that the scale property was set to x: 1, y: 1, z: 1.
Both exported dae models have the same visual size (one having scale 100 and one scale 1). But it looks like the models exported in 7.1 have the size set in the geometry and not in the scale property.

Is this expected? I can change my workflow to work with the new export format, but it would be great if I could get it to work in the old way since I have a lot of old exported dae files.

## #2 — frank beckmann — 2017-12-23
<https://www.cheetah3d.com/forum/index.php?threads/12714/post-110231>

Hi and Welcome!
Have you already checked the "Scale factor:" for the Collada exporter at Cheetah3d preferences (cmd+,)?

Cheers
Frank

Attachments: [ColladaScaleFactor.gif](https://www.cheetah3d.com/forum/index.php?attachments/31979/)

## #3 — drugge — 2017-12-23
<https://www.cheetah3d.com/forum/index.php?threads/12714/post-110232>

Working now!

Thank you for the quick response!

The export scale was set to 100. I reduced it to 1 and now I get the expected results. I am not sure if 100 is default or if I changed it earlier. Anyway, it works as I need it to now!

Thanks again.

## #4 — frank beckmann — 2017-12-23
<https://www.cheetah3d.com/forum/index.php?threads/12714/post-110233>

Happy holidays!  

Cheers
Frank

## #5 — drugge — 2017-12-23
<https://www.cheetah3d.com/forum/index.php?threads/12714/post-110234>

Another related question

Happy holidays to you as well!

But I have one more question. I see there are scale options for import as well under preferences. Will that scale be applied whenever I open a dae file. Or is it only applied when I choose the Import option and not the regular Open option (under the File menu)?

Cheers
Peter

## #6 — frank beckmann — 2017-12-23
<https://www.cheetah3d.com/forum/index.php?threads/12714/post-110235>

Hi Peter.
Open and Import are the same in this case. So better have the same factor endorsed for im-+export.

Cheers
Frank
