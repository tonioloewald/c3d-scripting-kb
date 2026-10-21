// Source: https://www.cheetah3d.com/forum/index.php?threads/11075/post-93853
// Author: aaronparr (Cheetah3D forum), posted 2015-03-08
// Thread: "Converting Cheetah's uvcoords to tverts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
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