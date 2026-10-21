// Source: https://www.cheetah3d.com/forum/index.php?threads/1327/post-8340
// Author: ToddWR (Cheetah3D forum), posted 2007-02-12
// Thread: "100th post and such a deal!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	Sierpinski.js
//
// Todd Rogers
// Usage: Place this into scripts/Polygon folder. restart Cheetah3D,
//				then select from Tool -> Script -> Polygon -> Sierpinski
//
//
if( !Vec3D.str) {
	Vec3D.prototype.str = function() {
		return "("+ this.x.toFixed(6) + "," + this.y.toFixed(6) + "," + this.z.toFixed(6) + ")";
	}
}

var BAD = true;
function buildUI(obj){
	if( obj.family() != NGONFAMILY) {
		OS.messageBox("Opps","This script object is in the wrong folder. Please place it in the PolygonObj folder.");
		return;
	}
	BAD = false;
    obj.setParameter("name","Sierpinski");
	obj.addParameterFloat("size",1,.01,250,true,true);
	obj.addParameterInt("levels",1,0,8,true,true);
	
	obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle",45,1,180,true,true);

}

function buildObject(obj) {
	if(BAD) return;
	var core = obj.core();
	var lev = obj.getParameter("levels");
	var size = obj.getParameter("size");
    obj.setParameter("normalType",obj.getParameter("smooth"),false);
    obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);

	var points = new Array();
	var sqrt3 = Math.sqrt(3);
	var sqrt6 = Math.sqrt(6);
	var ym = sqrt6/12;
	var zm = sqrt3/6;
//	points[points.length] = (new Vec3D(  0,  sqrt3/4 , 0       )).multiply(size);
//	points[points.length] = (new Vec3D(  0, -sqrt3/12, sqrt3/3 )).multiply(size);
//	points[points.length] = (new Vec3D( .5, -sqrt3/12,-sqrt3/6 )).multiply(size);
//	points[points.length] = (new Vec3D(-.5, -sqrt3/12,-sqrt3/6 )).multiply(size);

	points[points.length] = (new Vec3D(  0,  sqrt6/3 - ym, sqrt3/6 - zm)).multiply(size);
	points[points.length] = (new Vec3D(  0, 0        - ym, sqrt3/2 - zm)).multiply(size);
	points[points.length] = (new Vec3D( .5, 0        - ym, 0       - zm)).multiply(size);
	points[points.length] = (new Vec3D(-.5, 0        - ym, 0       - zm)).multiply(size);
	
	for(var i = 0; i < lev; i++) {
		var l = points.length/4;
		for(var j=0;j<l;j++) {
			var p0 = points[j*4+0];
			var p1 = points[j*4+1];
			var p2 = points[j*4+2];
			var p3 = points[j*4+3];
			
			var p01 = (p0.add(p1)).multiply(1/2);
			var p02 = (p0.add(p2)).multiply(1/2);
			var p03 = (p0.add(p3)).multiply(1/2);
			
			var p12 = (p1.add(p2)).multiply(1/2);
			var p13 = (p1.add(p3)).multiply(1/2);
			
			var p23 = (p2.add(p3)).multiply(1/2);
			
			points[j*4+0] = p0;
			points[j*4+1] = p01;
			points[j*4+2] = p02;
			points[j*4+3] = p03;
			
			points[points.length] = p01;
			points[points.length] = p1;
			points[points.length] = p12;
			points[points.length] = p13;
			
			points[points.length] = p02;
			points[points.length] = p12;
			points[points.length] = p2;
			points[points.length] = p23;
			
			points[points.length] = p03;
			points[points.length] = p13;
			points[points.length] = p23;
			points[points.length] = p3;
		}
	}
	l = points.length/4;
	for(i=0;i<l;i++) {
		core.addPolygon(3, true, [points[i*4+0],points[i*4+2],points[i*4+1]]);
		core.addPolygon(3, true, [points[i*4+0],points[i*4+3],points[i*4+2]]);
		core.addPolygon(3, true, [points[i*4+0],points[i*4+1],points[i*4+3]]);
		core.addPolygon(3, true, [points[i*4+1],points[i*4+2],points[i*4+3]]);
	}
}

