// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
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
//
//	History:
//		 6/ 5/06:	created
//		 6/ 6/06:	added Martin's speed improvements & buttons to hide/show objects
//		 6/ 9/06:	added the parents rotation and scale, but not the position


//var object = new Array;
var	list = new Array;
var Verts = new Array;
var UVs = new Array;


function buildUI(obj){
    
    obj.setParameter("name","Object Track");
    
	// time here is the percentage of where to be on a line
    obj.addParameterFloat("percentage",0,0,100,true,true); 
	obj.addParameterSeparator("Utils");
	obj.addParameterButton("Hide/Show Spline","Swap","hsSpline");
	obj.addParameterButton("Hide/Show Object","Swap","hsObject");
}

function hsSpline(obj) {
	var n = obj.childCount();
	if(n>0) { // make sure it has a first child
		var theSpline = obj.childAtIndex(0);
		// right now there is no way to be sure if this is the right tag
		// guess we could cycle through all the tags and see which contains
		// the flags we want to change
		var splineTag = theSpline.tagAtIndex(1);
		splineTag.setParameter("editorActive",1 - splineTag.getParameter("editorActive"));
		splineTag.setParameter("renderActive",1 - splineTag.getParameter("renderActive"));
	}
}

function hsObject(obj) {
	var n = obj.childCount();
	if(n>1) { // make sure it has a second child
		var theObject = obj.childAtIndex(1);
		// right now there is no way to be sure if this is the right tag
		// guess we could cycle through all the tags and see which contains
		// the flags we want to change
		var objectTag = theObject.tagAtIndex(1);
		objectTag.setParameter("editorActive",1 - objectTag.getParameter("editorActive"));
		objectTag.setParameter("renderActive",1 - objectTag.getParameter("renderActive"));
	}
}


function buildObject(obj){
	var n = obj.childCount();
	var i;
	if( n > 1) {
		var core = obj.core();
		var d = obj.getParameter("percentage")/100;
		
		var theSpline = obj.childAtIndex(0);
		var theObject = obj.childAtIndex(1);
		
		if( theSpline.family() == SPLINEFAMILY) {
			//	the spline might have more than 1 path
			//	just look at the first one
			var path = theSpline.modCore().cache(0);
			//------
			// calc the total length and then change it into percents
			var l = path.length;
			var len = 0;
			list[0] = 0;
			for(i=0;i<l-1;i++) {
				var p = path[i+1].sub(path[i]);
				len = len + Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
				list[i+1] = len;
			}
			for(i=0;i<l;i++) {
				list[i] = list[i]/len;
			}
			//------
			core.buildVertexBSP(new Vec3D(-3,-3,-3) ,new Vec3D(3,3,3));
			// d is a percentage change it to a value between 0 and actual length
			if( path.length > 0) {
				for(i=1;i<path.length -1;i++) 
					if( d < list[i]) 
						break;
				var p1 = path[i-1];
				var p2 = path[i];
				//	convert d into a percentage between the two points
				d = (d - list[i-1])/(list[i] - list[i-1]);
				p1 = p1.multiply(1-d).add(p2.multiply(d));
				// p1 is now the new center of theObject
				// just translate it to make it so
				//--------------------------------------------------------------------
				// this little section is taken from:
				//	Explosion.js (beta)
				//	(c) 2006 Hiroto Tsubaki
				//	and modified for some extra speed by Martin
				if (theObject.family() == NGONFAMILY) {
					var baseCore = theObject.modCore();
					var basePolyCount = baseCore.polygonCount();
					var baseVertCount = baseCore.vertexCount();
					var pos = theObject.getParameter("position");
					var transMatrix = new Mat4D(TRANSLATE, p1.x-pos.x,p1.y-pos.y,p1.z-pos.z);
					var transMatrix = transMatrix.multiply(theObject.objMatrix());
					
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
			core.destroyVertexBSP();
		}
	}
}
