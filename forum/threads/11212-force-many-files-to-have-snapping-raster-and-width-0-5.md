# Force many Files to have Snapping Raster and width 0.5

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11212/
- Subforum: scripting-general
- Started by **llamapixel** on 2015-06-01; last post 2015-06-03; 7 posts

## #1 — llamapixel — 2015-06-01
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95382>

Force many Files to have Snapping Raster and width 0.5

Hi Guys,.

I have many single assets in a folder.

I want to set every file to have Snapping on.

Raster

Raster Size 0.5

Is the Cheetah3d file editable with a find replace for such and occurrence?

## #2 — frank beckmann — 2015-06-01
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95386>

Snapping to raster is a general setting and not available per object.
What works is: take a folder - move it 0,5 - select every object you like to transform and drag it with shift key down onto the folder in the object browser - The objects jump 0,5 units - now select the folder and call "Ungroup" - every object has moved 0,5.

Cheers
Frank

## #3 — llamapixel — 2015-06-01
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95387>

Thanks Frank, you are always my sage advice with Cheetah mate.
So there is no way to force Cheetah3d files to open with snapping Raster On and at .5 ?

Includes sneak preview

Attachments: [Screen Shot 2015-06-01 at 3.39.36 pm.png](https://www.cheetah3d.com/forum/index.php?attachments/26693/)

## #4 — frank beckmann — 2015-06-01
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95388>

[[QUOTE:  llamapixel said: So there is no way to force Cheetah3d files to open with snapping Raster On and at .5 ? Click to expand... ]]

Are you talking about scale or transform along specific axis on open? When it´s scale you can use FBX-ex/import - but right now I´m confused on what you´re trying to achieve.

Cheers
Frank

## #5 — llamapixel — 2015-06-02
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95424>

Ok say I have a cheetah 3d file and when I open the file the snapping is turned off.

When I open the file I want to have the snapping activated by default and then on many different Cheetah3d files in the same folder.

## #6 — frank beckmann — 2015-06-02
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95427>

Still don´t get what you expect in the end - but see the little "factory"-icon at the right of the tool bar? Set up your Transform-tool and click that icon to make it permanent. Now when you start Cheetah3d your settings will set-up unless you change it and hit the factory icon again.

Cheers
Frank

## #7 — llamapixel — 2015-06-03
<https://www.cheetah3d.com/forum/index.php?threads/11212/post-95452>

Thanks mate I think that solved it.
