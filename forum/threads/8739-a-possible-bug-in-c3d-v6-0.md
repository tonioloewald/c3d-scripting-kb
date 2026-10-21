# A Possible Bug in C3D v6.0?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8739/
- Subforum: scripting-general
- Started by **chris g** on 2012-08-13; last post 2012-08-17; 5 posts

## #1 — chris g — 2012-08-13
<https://www.cheetah3d.com/forum/index.php?threads/8739/post-72540>

A Possible Bug in C3D v6.0?

I'm trying to create a simple rack focus using an polygon object to set the focal distance. I'm using "DOF Target.js" script to calculate the distance between the camera and the object as it moves and update the DOF tag's focalDistance parameter.

When I render the animation, at some point during the render C3D hangs. Sometimes it hangs within the first couple of frames but most of the time it hangs around frame 18. I don't think it's the script file as it renders frames before hanging, but I can't be sure.

When setting the DOF tag key frames directly, without using the script the animation renders fine.

See attached zip for test files.

Thanks
-chris

Attachments: [DOF_Scripting_Test.zip](https://www.cheetah3d.com/forum/index.php?attachments/17734/)

## #2 — tg_jp — 2012-08-14
<https://www.cheetah3d.com/forum/index.php?threads/8739/post-72544>

hi

it's a bug of script. I updated it, so please check the latest one.

http://www.tres-graficos.jp/blog/files/article.php?id=77

old code seems to make a infinite update loop or something while rendering.

	
	


```
//line.37
    //dofTag.setParameter("focalDistance", cam_distance.norm() );
            
    dofTag.setParameter("focalDistance", cam_distance.norm(), false );
```


regards.

tg_jp, Hiroto

Links: http://www.tres-graficos.jp/blog/files/article.php?id=77

## #3 — chris g — 2012-08-14
<https://www.cheetah3d.com/forum/index.php?threads/8739/post-72546>

Thank you. That seems like it fixed it.

My first thought was that it was an Infinite loop, but it didn't make sense why it would render out a bunch of frames before hanging. Any thoughts?

-chris

## #4 — tg_jp — 2012-08-15
<https://www.cheetah3d.com/forum/index.php?threads/8739/post-72552>

hi

[[QUOTE:  My first thought was that it was an Infinite loop, but it didn't make sense why it would render out a bunch of frames before hanging. Any thoughts? Click to expand... ]]

I am guessing, update timing for object tree is different when Rendering and 3D preview ( multi threading ? caching scene graph info for next frame? ). anyway, we have take care using Object::setParameter function from some object/tag to another object/tag of different object tree. we can make infinit update loop easily.  

regards.

tg_jp, Hiroto

## #5 — chris g — 2012-08-17
<https://www.cheetah3d.com/forum/index.php?threads/8739/post-72607>

good to know.

thanks
-chris
