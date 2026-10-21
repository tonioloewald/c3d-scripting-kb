// Source: https://www.cheetah3d.com/forum/index.php?threads/1284/post-8076
// Author: ToddWR (Cheetah3D forum), posted 2007-01-28
// Thread: "Lofty Ideas"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	Loft.js
//
// Todd Rogers
// Usage: Place this into scripts/Polygon folder. restart Cheetah3D,
//				then select from Tool -> Script -> Polygon -> Loft
//
//
//	11/28/06  V1 : released and forgot
//            V2 : fixed by using the object matrix
//            V3 : sets the new objects center between the splines centers 
//	11/29/06  V4 : modded to use childern instead of selecting one and then another
//  01/24/07  V5 : changed to polygon object
//  01/27/07  V6 : added checks for a cache of null and pathCount > 0


// then a shaped spline is used in an object and then us converted to a generic spline
// build object is call once of twice with an extra spline that has no paths in it
// this needs to be checked for or else a crash will happen

// hold each of the splines list of points
var pth = new Array();
// this is the list of percentages for the above splines
var lst = new Array();
// the array of object matrixes
var mat = new Array();

function buildUI(obj){
    obj.setParameter("name","Loft");
    obj.addParameterInt("Divisions",50,1,1000,false,false);
    obj.addParameterBool("Flip",false,false,true,false,false);
	obj.setCreatorObj(true); // thanks martin
}

function buildObject(obj) {
	var n = obj.childCount();
	if(n > 1) {
		pth = new Array();
		lst = new Array();
		mat = new Array();
		var i;
		for( i = 0; i< n; i++) {
			var c = obj.childAtIndex(i);
				// gather only the spline info
			if( c.family() == SPLINEFAMILY) {
				var p = c.modCore();
				if (p.pathCount() > 0) {
					p = p.cache(0);
					if( p != null) {
						pth[pth.length] = p;
						lst[lst.length] = new Array();
						calcSplineLength(pth[pth.length-1],lst[lst.length-1]);
						mat[mat.length] = c.objMatrix();
					}
				}
			} 
			
		}
		if( pth.length < 2) return;
		var core = obj.core();
		var div = obj.getParameter("Divisions");
		var flip = obj.getParameter("Flip");
		var i,j;
		var pth1;
		var lst1;
		var mat1;
		var pth2;
		var lst2;
		var mat2;
		for(j = 0; j<pth.length-1;j++) {
			if( flip) {
				pth1 = pth[j];
				lst1 = lst[j];
				mat1 = mat[j];
				pth2 = pth[j+1];
				lst2 = lst[j+1];
				mat2 = mat[j+1];
			} else {
				pth2 = pth[j];
				lst2 = lst[j];
				mat2 = mat[j];
				pth1 = pth[j+1];
				lst1 = lst[j+1];
				mat1 = mat[j+1];
			}
			var p1 = pointFromPercentage(pth1,lst1,0);
			var p2 = pointFromPercentage(pth2,lst2,0);
			p1 = mat1.multiply(p1);
			p2 = mat2.multiply(p2);
			for(i=0;i<div;i++) {
				var p3 = pointFromPercentage(pth2,lst2,(i+1)/div);
				var p4 = pointFromPercentage(pth1,lst1,(i+1)/div);
				p3 = mat2.multiply(p3);
				p4 = mat1.multiply(p4);
				var p = [p1,p2,p3,p4];
				core.addPolygon(4,true,p);
				p1 = p4;
				p2 = p3;
			}
		}
	}  
}

function calcLen(p1,p2) {
	var p = p1.sub(p2);
	return Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
}

function calcSplineLength(points,lst) {
	var l = points.length;
	var i;
	var accum = 0;
	lst[0] = 0;
	for(i=0;i<l-1;i++) {
		var p = points[i+1].sub(points[i]);
		accum = accum + Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
		lst[i+1] = accum;
	}
	for(i=0;i<l;i++) {
		lst[i] = lst[i]/accum;
	}
	return accum;
}

// percent must be >= 0 and <= 1
function pointFromPercentage(path,lst,percent) {
	var i;
	var d = percent;
	for(i=1;i < path.length - 1;i++) 
		if( percent < lst[i]) 
			break;
	var p1 = path[i-1];
	var p2 = path[i];
	//	convert d into a percentage between the two points
	d = (d - lst[i-1])/(lst[i] - lst[i-1]);
	p1 = p1.multiply(1-d).add(p2.multiply(d));
	return p1;
}