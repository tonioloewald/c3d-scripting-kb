// Source: https://www.cheetah3d.com/forum/index.php?threads/718/post-4531
// Author: Martin (Cheetah3D forum), posted 2006-06-06
// Thread: "Follow the yellow brick Spline"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	Object Track.js
//
// Todd Rogers
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//
//		First object under the object is the spline to follow
//		Second object is the thing to follow the path
//		Percent is where on the spline to draw the object
var object = new Array;
var list = new Array;
var Verts = new Array;
var UVs = new Array;


function buildUI(obj){
    
    obj.setParameter("name","Object Track");
    
	// time here is the percentage of where to be on a line
    obj.addParameterFloat("percentage",0,0,100,true,true); 
}


function buildObject(obj){
	var n = obj.childCount();
	if( n > 1) {
		var core = obj.core();
		var d = obj.getParameter("percentage")/100;
		
		var theSpline = obj.childAtIndex(0);
		var theObject = obj.childAtIndex(1);
		
		if( theSpline.family() == SPLINEFAMILY) {
			//	the spline might have more than 1 path
			//	just look at the first one
			var path = theSpline.modCore().cache(0);
			var len = calcSplineLength(path);
			
			// d is a percentage change it to a value between 0 and actual length
			if( path.length > 0) {
				var i;
				for(i=1;i<path.length -1;i++) 
					if( d < list[i]) 
						break;
				var p1 = path[i-1];
				var p2 = path[i];
				// convert d into a percentage between the two points
				d = (d - list[i-1])/(list[i] - list[i-1]);
				p1 = p1.multiply(1-d).add(p2.multiply(d));
				
				// p1 is now the new center of theObject
				// just translate it to make it so
				//--------------------------------------------------------------------
				// this little section is taken from:
				//	Explosion.js (beta)
				//	(c) 2006 Hiroto Tsubaki
				if (theObject.family() == NGONFAMILY) {
					var baseCore = theObject.modCore();
					var basePolyCount = baseCore.polygonCount();
					var baseVertCount = baseCore.vertexCount();
					var transMatrix = new Mat4D(TRANSLATE, p1.x,p1.y,p1.z);
					
					// copy vertices    
					for (i = 0;i < baseVertCount;i++) {
					    var vert=baseCore.vertex(i);
					    vert = transMatrix.multiply(vert);
					    core.addVertex(false,vert);
					    }
					
					// copy polygons
					for (i = 0;i < basePolyCount;i++) {
						var basePolySize = baseCore.polygonSize(i);
						for (j = 0;j < basePolySize;j++) { 
							// store vertex and uv info to Verts, UVs 
							Verts[j] = baseCore.vertexIndex(i,j);
							UVs[j] = baseCore.uvCoord(i,j);
						}
				    core.addIndexPolygon(basePolySize, Verts, UVs);
					}
				// just so I don't need to figure it out for myself
				// is there a faster way to do this???  maybe in 3.3
				//--------------------------------------------------------------------
				} else {
					// if its not something I can draw, just do something
					var x = p1.x;
					var y = p1.y;
					var z = p1.z;
					var p = [	new Vec3D(x - .05	,y	,z - .05),
								new Vec3D(x - .05	,y	,z + .05),
								new Vec3D(x + .05	,y	,z + .05),
								new Vec3D(x + .05	,y	,z - .05)];
					core.addPolygon(4,true,p);
					p = [	new Vec3D(x	,y - .05	,z - .05),
							new Vec3D(x	,y - .05	,z + .05),
							new Vec3D(x	,y + .05	,z + .05),
							new Vec3D(x	,y + .05	,z - .05)];
					core.addPolygon(4,true,p);
					var p = [	new Vec3D(x - .05	,y - .05	,z),
								new Vec3D(x - .05	,y + .05	,z),
								new Vec3D(x + .05	,y + .05	,z),
								new Vec3D(x + .05	,y - .05	,z)];
					core.addPolygon(4,true,p);
				}
			}
		}
	}
}

function calcSplineLength(points) {
	var l = points.length;
	var i;
	var accum = 0;
	list[0] = 0;
	for(i=0;i<l-1;i++) {
		var p = points[i+1].sub(points[i]);
		accum = accum + Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
		list[i+1] = accum;
	}
	for(i=0;i<l;i++) {
		list[i] = list[i]/accum;
	}
	return accum;
}