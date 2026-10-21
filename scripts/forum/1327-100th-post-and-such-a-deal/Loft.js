// Source: https://www.cheetah3d.com/forum/index.php?threads/1327/post-8340
// Author: ToddWR (Cheetah3D forum), posted 2007-02-12
// Thread: "100th post and such a deal!"
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
//  02/20/07  V7 : added splines between lines, also made calpoint go faster


if( !Vec3D.cross) {
	// returns a Vec3D as a result
	Vec3D.prototype.cross = function(other) {
		var xh = this.y * other.z - other.y * this.z;
		var yh = this.z * other.x - other.z * this.x;
		var zh = this.x * other.y - other.x * this.y;
		return new Vec3D(xh,yh,zh);
	}
}
// when a shaped spline is used in an object and then us converted to a generic spline
// build object is called once or twice with an extra spline that has no paths in it
// this needs to be checked for or else a crash will happen

// hold each of the splines list of points
var pth = new Array();
// this is the list of percentages for the above splines
var lst = new Array();
// the array of object matrixes
var mat = new Array();
// store the length of each spline here
//var len = new Array();

function buildUI(obj){
    obj.setParameter("name","Loft");
    obj.addParameterInt("Divisions",20,1,1000,true,true);
    obj.addParameterBool("Splines",false,false,true,true,true);
    obj.addParameterBool("Flip",false,false,true,true,true);
	obj.setCreatorObj(true); // thanks martin
	obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle",45,1,180,true,true);
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
		obj.setParameter("normalType",obj.getParameter("smooth"),false);
		obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
		var core = obj.core();
		var div = obj.getParameter("Divisions");
		var flip = obj.getParameter("Flip");
		var flag = obj.getParameter("Splines");
		var i,j;
		var pth1,lst1,mat1;
		var pth2,lst2,mat2;
		if(!flag) {
			for(j = 0; j<pth.length-1;j++) {
				if( flip) {
					pth1 = pth[j];   lst1 = lst[j];   mat1 = mat[j];
					pth2 = pth[j+1]; lst2 = lst[j+1]; mat2 = mat[j+1];
				} else {
					pth2 = pth[j];   lst2 = lst[j];   mat2 = mat[j];
					pth1 = pth[j+1]; lst1 = lst[j+1]; mat1 = mat[j+1];
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
		} else {
			var splinePTH = new Array();
			var splineLST = new Array();
			for(j = 0; j<=div;j++) {
				var a = new Array();
				for(i=0;i<pth.length;i++) {
					a[i] = mat[i].multiply(pointFromPercentage(pth[i],lst[i],j/div));
					//print(j+","+i+ "= ("+a[i].x+","+a[i].y+","+a[i].z+")");
				}
				splinePTH[splinePTH.length] = FullSpline(a);
				splineLST[splineLST.length] = new Array();
				calcSplineLength(splinePTH[splinePTH.length-1],splineLST[splineLST.length-1]);
			}
			for(i=0;i<div;i++) {
				for(j=0;j<div;j++) {
					//print(i+","+j);
					var p1 = pointFromPercentage(splinePTH[j  ],splineLST[j  ],(i  )/div);
					var p2 = pointFromPercentage(splinePTH[j  ],splineLST[j  ],(i+1)/div);
					var p3 = pointFromPercentage(splinePTH[j+1],splineLST[j+1],(i+1)/div);
					var p4 = pointFromPercentage(splinePTH[j+1],splineLST[j+1],(i  )/div);
					if(flip)
						core.addPolygon(4,true,[p1,p2,p3,p4]);
					else
						core.addPolygon(4,true,[p4,p3,p2,p1]);
				}
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
	if( percent < 0) percent = 0;
	if( percent > 1) percent = 1;
	var i,hi = path.length-1 ,lo = 0;
	var d = percent;
	while(hi-lo > 1) {
		i = Math.floor((hi+lo)/2);
		if( percent <= lst[i]) {
			hi = i;
			continue;
		}
		if( percent > lst[i]) {
			lo = i;
		}
	}
	i = hi;
			
	var p1 = path[i-1];
	var p2 = path[i];
	//	convert d into a percentage between the two points
	d = (d - lst[i-1])/(lst[i] - lst[i-1]);
	p1 = p1.multiply(1-d).add(p2.multiply(d));
	return p1;
}

function FullSpline(list) {
	var pnts = list;
	var result = new Array();
	pnts.splice(0,0,pnts[0]);
	pnts.splice(0,0,pnts[0]);
	pnts[pnts.length] = pnts[pnts.length-1];
	pnts[pnts.length] = pnts[pnts.length-1];
	result[0] = pnts[0];
	var p1,p2,p3,p4;
	for(var j = 0; j<pnts.length-3;j++) {
		p1 = pnts[j];
		p2 = pnts[j+1];
		p3 = pnts[j+2];
		p4 = pnts[j+3];
		//var count = 0;
		var lst = BSPLINE(p1,p2,p3,p4,20);
		for(i =1;i<lst.length;i++) {
			var t = result[result.length-1];
//			if(t.x == lst[i].x && t.y == lst[i].y && t.z == lst[i].z) 
//				continue;
			if(result.length > 2 && Collinear(result[result.length-2],result[result.length-1],lst[i])) {
				result[result.length-1] = lst[i];
				//count++;
			} else
				result[result.length] = lst[i];
		}
	}
	//print( "removed "+ count + " points. new length is "+ result.length);
	return result;
}

function BSPLINE( p1, p2, p3, p4, divisions) {
	var a=new Array();
	var b=new Array();
	var c=new Array();
	var spline_out = new Array();
	a[0] = ( -p1.x + 3*p2.x - 3*p3.x + p4.x)/6.0;
	a[1] = ( 3*p1.x - 6*p2.x + 3*p3.x )/6.0;
	a[2] = (-3*p1.x + 3*p3.x )/6.0;
	a[3] = ( p1.x + 4*p2.x + p3.x )/6.0;
	b[0] = ( -p1.y + 3*p2.y - 3*p3.y + p4.y)/6.0;
	b[1] = ( 3*p1.y - 6*p2.y + 3*p3.y )/6.0;
	b[2] = (-3*p1.y + 3*p3.y )/6.0;
	b[3] = ( p1.y + 4*p2.y + p3.y )/6.0;
	c[0] = ( -p1.z + 3*p2.z - 3*p3.z + p4.z)/6.0;
	c[1] = ( 3*p1.z - 6*p2.z + 3*p3.z )/6.0;
	c[2] = (-3*p1.z + 3*p3.z )/6.0;
	c[3] = ( p1.z + 4*p2.z + p3.z )/6.0;
	spline_out[0] = new Vec3D(a[3],b[3],c[3]);
	for (var i = 1 ; i < divisions ; i++) {
		var t = i /  divisions;
		var x = a[3] + t*(a[2] + t*(a[1] + t*a[0]));
		var y = b[3] + t*(b[2] + t*(b[1] + t*b[0]));
		var z = c[3] + t*(c[2] + t*(c[1] + t*c[0]));
		spline_out[i] = new Vec3D(x,y,z);
	}
	return spline_out;
}


function Collinear(p1,p2,p3) {
	//{find the difference between the 2 points P2 and P3 to P1 }
	var D1 = p2.sub(p1);
	var D2 = p3.sub(p1);

	//{perform a 3d cross product}
	var C = D1.cross(D2);
	var d = C.x * C.x + C.y * C.y + C.z * C.z;
	//print(d);
	return (d < 0.00000001); // making this number larger makes for more anglar splines
	// best to keep it small
}
