# wrong uv coordinates at export

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9422/
- Subforum: scripting-general
- Started by **Ercan Solak** on 2013-03-21; last post 2013-03-22; 3 posts

## #1 — Ercan Solak — 2013-03-21
<https://www.cheetah3d.com/forum/index.php?threads/9422/post-77739>

wrong uv coordinates at export

Hi,

I am writing my own custom script to export vertex data to be used in iOS.

But for some reason, the uv coordinates come out wrong. There are gaps and in the final render (image attached).

Basically, I am using the following loop to go through each triangle of each polygon

	
	


```
             for(i=0;i < core.polygonCount();i++){
                for(j=0;j<core.polygonSize(i);j++){
                    vertexIndex = core.vertexIndex(i,j);

                    normal = core.normal(i,j);
                    normals[vertexIndex] = normal;

                    uv = core.uvCoord(i,j);
                    uvCoordinates[vertexIndex] = uv;

                }
            }
```


I am attaching the render, UV texture and the iPhone screenshot. As you can see, there are areas where apparently the UV coordinate lands in the background of the texture.

Attachments: [capsule.jpg](https://www.cheetah3d.com/forum/index.php?attachments/19502/), [capsule_uv.jpg](https://www.cheetah3d.com/forum/index.php?attachments/19503/), [iOS Simulator Screen shot Mar 21, 2013 9.58.53 AM.png](https://www.cheetah3d.com/forum/index.php?attachments/19504/)

## #2 — Martin — 2013-03-21
<https://www.cheetah3d.com/forum/index.php?threads/9422/post-77755>

Hi Ercan,
you are using just one UV coordinate per vertex on you exporter. But that is to less in your case. Just image a cube. A cube has 8 vertices but it can have up to 24 UV coordniates (6 faces X 4 corners per side). 

So in your case you are overwriting UV coords which have been already set.

Bye
Martin

## #3 — Ercan Solak — 2013-03-22
<https://www.cheetah3d.com/forum/index.php?threads/9422/post-77775>

Cheers Martin!

Indeed that was the problem. 

I now modified my script to include all the different UV coordinates for a vertex position and it works perfect.

Thanks for the help...

--Ercan

[[QUOTE:  Martin said: Hi Ercan, you are using just one UV coordinate per vertex on you exporter. But that is to less in your case. Just image a cube. A cube has 8 vertices but it can have up to 24 UV coordnia]]
