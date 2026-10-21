# Rendering error / polygon artifacts

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9134/
- Subforum: scripting-general
- Started by **kwando** on 2012-12-20; last post 2012-12-20; 4 posts

## #1 — kwando — 2012-12-20
<https://www.cheetah3d.com/forum/index.php?threads/9134/post-75549>

Rendering error / polygon artifacts

Hi!
I love working with Cheetah, but there seems to be some rendering issues. The polygons are visible, where I think they should not be.

Scene contains one Ball and one PointLight. I've attached the test scene.

I'm using Cheetah3D 6.0.

Attachments: [image.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18747/), [broken.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/18748/)

## #2 — frank beckmann — 2012-12-20
<https://www.cheetah3d.com/forum/index.php?threads/9134/post-75550>

Hopefully you´re not after a scripting solution while we are here in this forum right now.  

It´s not a rendering error BTW: http://www.cheetah3d.com/forum/showpost.php?p=36988&postcount=2

Search the forum about "terminator".

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showpost.php?p=36988&postcount=2

## #3 — kwando — 2012-12-20
<https://www.cheetah3d.com/forum/index.php?threads/9134/post-75551>

Oops, I missed that I posted it in the wrong forum (@someone-with-privileges: feel free to move this thread to the appropriate forum section).

Thanks for the quick answer and for providing search keywords! I knew that increasing triangle count would make the issue go away. But since this issue is not present when working with realtime-3D /GPU/OpenGL, which I mainly do, I got a bit confused =)

For future reference, here is a PDF I dug up on the internetz.
http://www.geekshavefeelings.com/x/...Its-Really-Not-a-Rendering-Bug-You-see....pdf

Links: http://www.geekshavefeelings.com/x/wp-content/uploads/2010/03/Its-Really-Not-a-Rendering-Bug-You-see....pdf

## #4 — frank beckmann — 2012-12-20
<https://www.cheetah3d.com/forum/index.php?threads/9134/post-75552>

[[QUOTE:  kwando said: But since this issue is not present when working with realtime-3D /GPU/OpenGL, which I mainly do, I got a bit confused =) Click to expand... ]]
As I said; when it´s not the geometry it´s the lighting as you can see in the bottom half of the image I linked to.  

Cheers
Frank
