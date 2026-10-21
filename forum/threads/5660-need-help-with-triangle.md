# Need help with triangle()

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5660/
- Subforum: scripting-general
- Started by **georgiano** on 2010-04-20; last post 2010-04-20; 2 posts

## #1 — georgiano — 2010-04-20
<https://www.cheetah3d.com/forum/index.php?threads/5660/post-41632>

Need help with triangle()

Hi everyone! I am new to Cheetah 3D and just started scripting. I am planning on making my custom exporter and for this I need to know the index of each vertex of a triangle. This is the code I use to try if it works: 
	
	


```
var arrIndices = new Array();
    
    for(var i = 0;i  < polyCount;i++) {
    
        for(var j = 0;j < geomObject.polygonSize(i) - 2;j++) {
        
            arrIndices = geomObject.triangle(i, j);
            OS.messageBox("Title", arrIndices[0] + " " + arrIndices[1] + " " + arrIndices[2]);
            
        }
        
    }
```


the problem is that if triangleCount == polyCount for every triangle the indices are the same. If triangleCount != polyCount the indices of the triangles in each polygon are the same for all polygons.

In the first case for a cube:
triangle(0, 0) == triangle(1, 0) == ... == triangle(11, 0)

in the second: 
triangle(0, 0) == triangle(1, 0) == ... == triangle(6, 0)
triangle(0, 1) == triangle(1, 1) == ... == triangle(6, 1)

I hope you understood what I mean. Every response will be appreciated.

## #2 — georgiano — 2010-04-20
<https://www.cheetah3d.com/forum/index.php?threads/5660/post-41633>

Oooppsss!!! I guess I should have read the documentation more carefully.
To clarify for anyone that can come across the same misunderstanding, triangle() returns the 3 corners of the polygon that it is part of not the 3 vertex indices that define it. So to find the indices of the vertices that make this triangle the result from the triangle() should be passed 3 times to vertexIndex().

obj.vertextIndex(polygonIndex, cornerIndex[0]);
obj.vertextIndex(polygonIndex, cornerIndex[1]);
obj.vertextIndex(polygonIndex, cornerIndex[2]);

I hope that was helpful for someone!
