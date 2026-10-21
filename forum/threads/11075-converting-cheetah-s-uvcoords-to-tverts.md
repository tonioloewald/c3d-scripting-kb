# Converting Cheetah's uvcoords to tverts

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11075/
- Subforum: scripting-general
- Started by **aaronparr** on 2015-03-08; last post 2015-03-10; 4 posts

## #1 — aaronparr — 2015-03-08
<https://www.cheetah3d.com/forum/index.php?threads/11075/post-93852>

Converting Cheetah's uvcoords to tverts

I am working on a set of scripts for importing and exporting MDL format (a model format used in the ancient game Neverwinter Nights), and am having some trouble creating tverts out of Cheetah's uv information.

Part of this is that I do not understand the relationship between tverts and uvcoords. I suspect that they are the same thing, but I am unclear if there are any differences between the two. And more importantly I do not really understand in precise terms how either work.

So let me break this down into clear questions:

It appears that each tvert maps to each corner of a polygon, thus each vert maps to 1 or more tverts. Is this the same for UV Coords? Cheetah appears to map UVcoords to each "cindex" of a polygon rather than to each "vindex" of a mesh. Is this correct? It makes sense given that when you generate a UV map you can manipulate the corners of each polygon separately, but one nagging doubt I have is that in the MDL a tvert id can show up more than once on different faces/normals, but it could be that the "UV mesh" shares/recycles tverts with identical coordinates so as to avoid redundancy.
 the method PolyCore.uvCoord(pindex, cindex) is documented to return a "Vec4d" which is basically a structure with 4 numbers. I believe you access these with the properties x, y, z, w. Is that correct and if so what do each of those properties signify? I need to extract the positions U and V when I create my array of "tverts" out of these.
UV review question: is U a horizontal measurement from left to right, and V vertical from top to bottom? Also is this measurement a percentage of the distance across the image? A bit confused since sometimes a negative value shows up in the matrix.
 the MDL file keeps its tverts in an array, but I don't seem to be able to access uvCoords the same way in Cheetah. Basically uvCoords do not appear to be stored in an ordered list. Is that true? I guess I just want to ensure that when I generate an array of tverts that it won't matter if I inadvertently change the order of the uvCoords as long as I maintain the correct mapping to the corner of each polygon.

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

As to what an MDL looks like here is an example of what some of the mesh data from an ASCII version of a MDL file looks like. As you can see all of these are kept as arrays of structs. The first line of the block is the length of the array, then I only show you the first index of the array, but there would be a much longer list if you ere looking at the file:

vertices

	
	


```
verts 32
  -0.0497328 0.162773 0.724411
```

an array of vectors. straightforward except that the axes are not the same as in cheetah. I believe the two systems swap Y and Z.

faces (always triangles)

	
	


```
  faces 32
    0 1 17  4  44 45 47  1
```

face[0]'s contents go as follows:
vertId1, vertId2, vertId3, smoothing group id, tvertId1, tvertId2, tvertId3, material

tverts

	
	


```
  tverts 60
    0.963345 0.0923299 0
```


U, V, material

## #2 — aaronparr — 2015-03-08
<https://www.cheetah3d.com/forum/index.php?threads/11075/post-93853>

I am having trouble with one line of my code and for the life of me can not figure out why. I could have a javascript error, but what it would be I dunno. Some extra eyes would help.

_____

as a workaround I have expressly compared each property of the two Vec4D and the code is working. Some explanation for how to use isEqual however would be much appreciated.

_____

Am I using

	
	


```
.isEqual(Vec4D)
```

correctly?

I get this error:

[[QUOTE:  error: Wrong number or type of arguments Click to expand... ]]
in this line:

	
	


```
if( uvTemp.isEqual( uvCoords[j] ) )
```

of the following code:

	
	


```js
//faces 16
//0 1 5  2  0 1 23  5
var triCount  = core.triangleCount();
file.write("  faces "+triCount+"\n");

var uvCoords  = new Array(0); // array of uvCoords which are Vec4D
for(pindex=0;pindex<polyCount;pindex++)
{
  // The triangles indices of each polygon go from zero to polygonSize-2.
  var polySize  = core.polygonSize(pindex)-2;
  for(poly_tindex=0;poly_tindex<polySize;poly_tindex++)
  {
    // Cheetah3D automatically tesselates all polygons into triangles.
    // These triangles can be accessed with the triangle() call.
    // Just pass in the polygon index and the triangles index.
    // The function returns an array of 3 integers. These integers reference the corner indexes of the polygon.
    var triCorner  = core.triangle(pindex, poly_tindex)
    // index the vertices for the normal/triangle;
    file.write("    "  // start the line
              +  core.vertexIndex(pindex, triCorner[0])+" "
              +  core.vertexIndex(pindex, triCorner[1])+" "
              +  core.vertexIndex(pindex, triCorner[2])+"  "
            );
            
    // find and record the smoothing group for this poly
    file.write(getSmoothingGroup(core,pindex)+  "  ");

    // construct an array of uvCoords from which we will generate tverts
    var uvID = new Array(3);
    for(i=0;i<3;i++)
    {
      var uvTemp  = core.uvCoord(pindex, triCorner[i]);
      uvID[i] = -1;
      if(uvCoords.length==0)
      {
        uvID[i] = 0;
        uvCoords.push(uvTemp);
      }
      else
      {
        var j=0;
        while(j<uvCoords.length)
        {
          if( uvTemp.isEqual( uvCoords[j] ) )
          {
            uvID[i] = j;
            break;
          }
          j++
        }
        if(uvID[i]==-1)
        {
          uvID[i] = uvCoords.length;
          uvCoords.push(uvTemp);
        }
      }
    }
    // output the indexes of the tverts
    file.write(uvID[0]+" "+uvID[1]+" "+uvID[2]+" 1\n");

  }
}
```

## #3 — aaronparr — 2015-03-08
<https://www.cheetah3d.com/forum/index.php?threads/11075/post-93855>

Well I have this working well enough now that I can view a model in the neverwinternights game produced by Cheetah3d. Its rudimentary at present, but I plan on refining this. Thats a primitive cylinder, textured with a TGA.

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}
			
		
		
	

	
		
	

The script so far.

Links: http://pastebin.com/WXZBFF2p

## #4 — KurtF — 2015-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11075/post-93899>

Glad you got it working. I will study this, as I'm trying to learn something of Javascript myself.

Thanks.
