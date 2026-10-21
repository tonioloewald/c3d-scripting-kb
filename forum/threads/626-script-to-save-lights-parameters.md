# Script to save lights parameters

- Thread: https://www.cheetah3d.com/forum/index.php?threads/626/
- Subforum: script-downloads
- Started by **Francois** on 2006-04-22; last post 2008-04-02; 4 posts

## #1 — Francois — 2006-04-22
<https://www.cheetah3d.com/forum/index.php?threads/626/post-4002>

Script to save lights parameters

Hi,

Images are often (always?) rendered with different light parameters. If these parameters are not written somewhere, it may be then difficult to remember the settings that were used to produce a particular image. Comparing images/parameters in order to produce the best result is then not easy.

Well, that time is gone !

Here is a little script that will make your life easier when rendering images and tuning lights so you can produce your best shot. 

It will record all the parameters of all the lights of a scene (including those attached to cameras) in a text file (use TextEdit or any other text editor to read it). And it is very easy/quick to use :

- To install it, put it in the macro folder
- Setup your scene with as many number of lights you want
- Before rendering, call the "Save lights macro" script
- Choose saving location and give a name, hit return. Done !
- Console will display "Lights parameters saved"
- Now render your "86275 sec" image !
- You can now forget your settings and render the same image in 2 weeks with different settings as you will still be able to compare the settings !
- To make it easier, use the same name for the image and the text file (eg : imageX.jpg and imageX.txt)
- See the image below for an example of the output
- This script has only been tested with 3.1
- Don't ask questions on some unusual parameters you will eventually see ... 
- A future version will also include the HDRI & Rad tags
- Comments are welcome.
- This script is based on 2 scripts written by Martin ( Parameter Info and Scale light Intensity). As I am not an expert in Javascript, this code can surely be enhanced/optimized. Please do so if you feel you can do it. 

Enjoy !

Attachments: [Image 1.jpg](https://www.cheetah3d.com/forum/index.php?attachments/712/), [Save lights macro.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/713/)

## #2 — Francois — 2006-05-08
<https://www.cheetah3d.com/forum/index.php?threads/626/post-4199>

Script to save light parameters (updated)

Here is the same script but updated to handle the new parameters scheme for the lights in version 3.2

Enjoy !

Attachments: [Save lights macro 1.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/764/)

## #3 — Francois — 2008-03-26
<https://www.cheetah3d.com/forum/index.php?threads/626/post-19797>

Updated script

Here is an updated version (only tested with 4.5.1)
 
This script will save, in a text file, all the parameters of all the lights in a given scene. In addition, it will now also save all the parameters of the active camera as well as the parameters of the attached tags.
This should make it a lot easier now to share the lighting conditions of a scene or to keep track of various light tests.

Enjoy !

Attachments: [Save Camera & Lights Parameters.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/4294/)

## #4 — Targos — 2008-04-02
<https://www.cheetah3d.com/forum/index.php?threads/626/post-19965>

Thanks Francios, This will be handy for larger projects.

AaronC
