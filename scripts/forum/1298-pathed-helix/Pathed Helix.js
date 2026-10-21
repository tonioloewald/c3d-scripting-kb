// Source: https://www.cheetah3d.com/forum/index.php?threads/1298/post-8180
// Author: ToddWR (Cheetah3D forum), posted 2007-02-01
// Thread: "Pathed helix"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Pathed Helix.js
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom spline object.
//

if( !Vec3D.dot) {
	Vec3D.prototype.dot = function(other) {
		return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
	}
}
if( !Vec3D.cross) {
	// returns a Vec3D as a result
	Vec3D.prototype.cross = function(other) {
		var xh = this.y * other.z - other.y * this.z;
		var yh = this.z * other.x - other.z * this.x;
		var zh = this.x * other.y - other.x * this.y;
		return new Vec3D(xh,yh,zh);
	}
}
if( !Vec3D.str) {
	Vec3D.prototype.str = function() {
		return "("+ this.x.toFixed(5) + "," + this.y.toFixed(5) + "," + this.z.toFixed(5) + ")";
	}
}

function buildUI(obj){
    obj.setParameter("name","Pathed Helix");
    
    obj.addParameterInt("detail",5,1,10000,true,true);
    obj.addParameterFloat("radius",.3,0,10000,true,true);
    obj.addParameterInt("loops",10,1,1000,true,true);
    obj.addParameterInt("strands",1,1,100,true,true);
    obj.addParameterBool("flip",0,0,1,true,true);
    obj.addParameterBool("close",0,0,1,true,true);
	obj.setCreatorObj(true); // thanks martin
}

function buildObject(obj){
    var spline=obj.core();
	var n = obj.childCount();
	//print(n);
	if(n > 0) {
		var rots = obj.getParameter("detail");
		var rad = obj.getParameter("radius");
		var loops = obj.getParameter("loops");
		var flip = (obj.getParameter("flip")==1) ? -1:1;
		var close = obj.getParameter("close");
		var strands = obj.getParameter("strands");
		//print(flip);
		rots = 1 / (loops * rots);
		var c = obj.childAtIndex(0);
		var p = c.modCore();
		var list = new Array();
		var len;
		//print(p.pathCount());
		if( p.pathCount() > 0) { // safety first
			p = p.cache(0);
			if( p != null) {
				len = calcSplineLength(p,list);
				//OS.messageBox("Info",len + ","+ list);
				var mat = c.obj2WorldMatrix();
				// the trick with picking out a good PC is that
				// NONE of the points can point to it, if so
				// weird things happen
				var PC = new Vec3D(-100,100,-100);
				for( j=0;j<strands;j++) {
					var offset = j * (2*Math.PI)/strands;
					for(var i = 0;i<len;i+=rots) {
						var p1 = pointFromPercentage(p,list,i/len);
						var p2 = pointFromPercentage(p,list,(i+rots)/len);
							
						var p3 = p1.sub(PC).cross(p2.sub(PC));
							p3 = p3.multiply(1/p3.norm());
						var N = p2.sub(p1);
							N = N.multiply(1/N.norm());
						var C = mat.multiply(p1);
						var U = p3;
							U = U.multiply(1/U.norm());
						var V = N.cross(U);
						var a = rad * Math.cos(flip*i*loops + offset);
						var b = rad * Math.sin(flip*i*loops + offset);
						var P = C.add( U.multiply(a)).add( V.multiply(b));
						var PP;
						if( i == 0) {
							spline.move(P);
							PP = P;
						} else {
							spline.line(P);
						}
					}
					if(close == 1) spline.line(PP);
				}
			}
		}
	}
}
// found this solution @  http://mathforum.org/
/*
Date: 08/04/2003 at 12:51:03
From: Doctor George
Subject: Re: Parametric form of circle equation in 3D Space

Hi Francis,

To get a parametric equation follow this procedure.
1. Let N be a unit normal vector for the plane.
2. Let C be the circle center, and let R be the radius.
3. Let U be a unit vector from C toward a point on the circle.
4. Let V = N x U.
5. Let A be the paramter.
6. A point P is on the circle if...

          P = C + R cos(A) U + R sin(A) V

You can verify this result be checking the distance from P to the 
plane, and the distance from P to C.
*/

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

