// Source: https://www.cheetah3d.com/forum/index.php?threads/2581/post-17853
// Author: ToddWR (Cheetah3D forum), posted 2008-01-17
// Thread: "Round Box"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	Round Box.js
//
// Todd Rogers
// Usage: Place this into scripts/Polygon folder. restart Cheetah3D,
//				then select from Tool -> Script -> Polygon -> Round Box
//

//if( !Vec3D.len) {
//	// returns a Vec3D as a result
//	Vec3D.prototype.leng = function() {
//		if( arguments.length == 0)
//			return Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );
//		var p = arguments[0].sub(this);
//		return Math.sqrt( p.x*p.x + p.y*p.y + p.z*p.z );
//	}
//}

function len() {
	var p1 = arguments[0];
	if( arguments.length == 1){
		return Math.sqrt( p1.x*p1.x + p1.y*p1.y + p1.z*p1.z );
		
	}
	var p = arguments[1].sub(p1);
	return Math.sqrt( p.x*p.x + p.y*p.y + p.z*p.z );
}

//if( !Vec3D.normalize) {
//	// returns a Vec3D as a result
//	Vec3D.prototype.normalize = function() {
//		//var l = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
//		var l = this.norm();
//		if( l != 0) 
//			return new Vec3D(this.x/l,this.y/l,this.z/l);
//		return new Vec3D(this.x,this.y,this.z);
//	}
//}

	// returns a Vec3D as a result
function normalize(p) {
	//var l = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	var l = p.norm();
	if( l != 0) 
		return new Vec3D(p.x/l,p.y/l,p.z/l);
	return new Vec3D(p.x,p.y,p.z);
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


var BAD = true;
var kcornerStep = Math.PI/2; // adjust this to give the box smoother rounded edges
var cornerStep = Math.PI/2; // adjust this to give the box smoother rounded edges
var intTotalSteps = 2;
function buildUI(obj){
	
	if( obj.family() != NGONFAMILY) {
		OS.messageBox("Opps","This script object is in the wrong folder. Please place it in the PolygonObj folder.");
		return;
	}
	BAD = false;
    obj.setParameter("name","Round Box");
//	obj.addParameterInt("sections X",1,1,250,true,true)
//	obj.addParameterInt("sections Y",1,1,250,true,true)
//	obj.addParameterInt("sections Z",1,1,250,true,true)
    obj.addParameterFloat("width (X)",1,0,9999999,true,true);
    obj.addParameterFloat("height (Y)",1,0,9999999,true,true);
    obj.addParameterFloat("length (Z)",1,0,9999999,true,true);
	obj.addParameterSeparator("Radius");
    obj.addParameterFloat("X Radius",.25,0,999999,true,true);
    obj.addParameterFloat("Y Radius",.25,0,999999,true,true);
    obj.addParameterFloat("Z Radius",.25,0,999999,true,true);
	obj.addParameterSeparator("Edge Detail");
	obj.addParameterInt("Detail",5,1,100,true,true);
	
	obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle",45,1,180,true,true);

}

function buildObject(obj) {
	if(BAD) return;
    obj.setParameter("normalType",obj.getParameter("smooth"),false);
    obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
	var core = obj.core();
//	var sX = obj.getParameter("sections X");
//	var sY = obj.getParameter("sections Y");
//	var sZ = obj.getParameter("sections Z");
	
	var wX = obj.getParameter("width (X)");
	var wY = obj.getParameter("height (Y)");
	var wZ = obj.getParameter("length (Z)");
	
	var rX = obj.getParameter("X Radius");
	var rY = obj.getParameter("Y Radius");
	var rZ = obj.getParameter("Z Radius");
	
	intTotalSteps = obj.getParameter("Detail")+1;
	cornerStep = kcornerStep/intTotalSteps;
	
	// radii can't be more than half the size
	if( rX > wX / 2) {
		rX = wX/2;
		obj.setParameter("X Radius",rX,false);
	}
	if( rY > wY / 2) {
		rY = wY/2;
		obj.setParameter("Y Radius",rY,false);
	}
	if( rZ > wZ / 2) {
		rZ = wZ/2;
		obj.setParameter("Z Radius",rZ,false);
	}	
	//var p = obj.getParameter("position");
	var p = new Vec3D(0,0,0);
	
	// the inner box
	var p1 = new Vec3D(p.x-wX/2+rX,p.y+wY/2-rY,p.z-wZ/2+rZ);
	var p2 = new Vec3D(p.x+wX/2-rX,p.y+wY/2-rY,p.z-wZ/2+rZ);
	var p3 = new Vec3D(p.x+wX/2-rX,p.y+wY/2-rY,p.z+wZ/2-rZ);
	var p4 = new Vec3D(p.x-wX/2+rX,p.y+wY/2-rY,p.z+wZ/2-rZ);
	var p5 = new Vec3D(p.x-wX/2+rX,p.y-wY/2+rY,p.z-wZ/2+rZ);
	var p6 = new Vec3D(p.x+wX/2-rX,p.y-wY/2+rY,p.z-wZ/2+rZ);
	var p7 = new Vec3D(p.x+wX/2-rX,p.y-wY/2+rY,p.z+wZ/2-rZ);
	var p8 = new Vec3D(p.x-wX/2+rX,p.y-wY/2+rY,p.z+wZ/2-rZ);
	
	//the six faces
	DrawFace(core,p1,p2,p3,p4,(new Vec3D(0,1,0)).multiply(rY));
	DrawFace(core,p8,p7,p6,p5,(new Vec3D(0,-1,0)).multiply(rY));

	DrawFace(core,p6,p7,p3,p2,(new Vec3D(1,0,0)).multiply(rX));
	DrawFace(core,p1,p4,p8,p5,(new Vec3D(-1,0,0)).multiply(rX));

	DrawFace(core,p2,p1,p5,p6,(new Vec3D(0,0,-1)).multiply(rZ));
	DrawFace(core,p4,p3,p7,p8,(new Vec3D(0,0,1)).multiply(rZ));
	
	// the twelve edges
	DrawEdge(core,p1,p2,rY,rZ,new Vec3D(0, 1,0),new Vec3D(0,0,-1));
	DrawEdge(core,p6,p5,rY,rZ,new Vec3D(0,-1,0),new Vec3D(0,0,-1));
	DrawEdge(core,p8,p7,rY,rZ,new Vec3D(0,-1,0),new Vec3D(0,0, 1));
	DrawEdge(core,p3,p4,rY,rZ,new Vec3D(0, 1,0),new Vec3D(0,0, 1));
	
	DrawEdge(core,p2,p3,rY,rX,new Vec3D(0, 1,0),new Vec3D( 1,0,0));
	DrawEdge(core,p7,p6,rY,rX,new Vec3D(0,-1,0),new Vec3D( 1,0,0));
	DrawEdge(core,p5,p8,rY,rX,new Vec3D(0,-1,0),new Vec3D(-1,0,0));
	DrawEdge(core,p4,p1,rY,rX,new Vec3D(0, 1,0),new Vec3D(-1,0,0));
	
	DrawEdge(core,p6,p2,rZ,rX,new Vec3D(0,0,-1),new Vec3D( 1,0,0));
	DrawEdge(core,p3,p7,rZ,rX,new Vec3D(0,0, 1),new Vec3D( 1,0,0));
	DrawEdge(core,p1,p5,rZ,rX,new Vec3D(0,0,-1),new Vec3D(-1,0,0));
	DrawEdge(core,p8,p4,rZ,rX,new Vec3D(0,0, 1),new Vec3D(-1,0,0));
	
	// the eight corners
	DrawCorner(core,p1,rX,rY,rZ,new Vec3D(-1,0,0),new Vec3D(0, 1,0),new Vec3D(0,0,-1));
	DrawCorner(core,p2,rX,rY,rZ,new Vec3D( 1,0,0),new Vec3D(0, 1,0),new Vec3D(0,0,-1));
	DrawCorner(core,p3,rX,rY,rZ,new Vec3D( 1,0,0),new Vec3D(0, 1,0),new Vec3D(0,0, 1));
	DrawCorner(core,p4,rX,rY,rZ,new Vec3D(-1,0,0),new Vec3D(0, 1,0),new Vec3D(0,0, 1));
	DrawCorner(core,p5,rX,rY,rZ,new Vec3D(-1,0,0),new Vec3D(0,-1,0),new Vec3D(0,0,-1));
	DrawCorner(core,p6,rX,rY,rZ,new Vec3D( 1,0,0),new Vec3D(0,-1,0),new Vec3D(0,0,-1));
	DrawCorner(core,p7,rX,rY,rZ,new Vec3D( 1,0,0),new Vec3D(0,-1,0),new Vec3D(0,0, 1));
	DrawCorner(core,p8,rX,rY,rZ,new Vec3D(-1,0,0),new Vec3D(0,-1,0),new Vec3D(0,0, 1));
	
}

function UV(vec) {
	var x =  vec.x + vec.y;
	var y =  vec.z + vec.y;
	return new Vec2D(x,y);
}

function DrawCorner(core,point,radiusX,radiusY,radiusZ,vecX,vecY,vecZ) {
	var flip = vecX.x * vecY.y * vecZ.z;
	
	for( var ii = 0;ii<intTotalSteps;ii++) {
		var i = ii * cornerStep;
		var a = radiusX * Math.cos(i);
		var b = radiusZ * Math.sin(i);
		var c = radiusX * Math.cos(i+cornerStep);
		var d = radiusZ * Math.sin(i+cornerStep);
		var pp2 = point.add(vecX.multiply(a)).add(vecZ.multiply(b));
		var pp3 = point.add(vecX.multiply(c)).add(vecZ.multiply(d));
//		var len1 = pp2.len(point);
//		var len2 = pp3.len(point);
		var len1 = len(pp2,point);
		var len2 = len(pp3,point);
//		var vec1 = pp2.sub(point).normalize();
//		var vec2 = pp3.sub(point).normalize();
		var vec1 = normalize(pp2.sub(point));
		var vec2 = normalize(pp3.sub(point));
		
		for( var jj = 0; jj < intTotalSteps;jj++) {
			var j = jj * cornerStep;
			a = radiusY * Math.cos(j);
			b = len1 * Math.sin(j);
			c = radiusY * Math.cos(j+cornerStep);
			d = len1 * Math.sin(j+cornerStep);
			var p1 = point.add(vecY.multiply(a)).add(vec1.multiply(b));
			var p2 = point.add(vecY.multiply(c)).add(vec1.multiply(d));
			
			b = len2 * Math.sin(j);
			d = len2 * Math.sin(j+cornerStep);
			
			var p4 = point.add(vecY.multiply(a)).add(vec2.multiply(b));
			var p3 = point.add(vecY.multiply(c)).add(vec2.multiply(d));
			
			if( flip == 1) {
				if( j == 0) 
					core.addPolygon(3, true, [p1,p2,p3],[UV(p1),UV(p2),UV(p3)]);
				else
					core.addPolygon(4, true, [p1,p2,p3,p4],[UV(p1),UV(p2),UV(p3),UV(p4)]);
			} else {
				if( j == 0) 
					core.addPolygon(3, true, [p3,p2,p1],[UV(p3),UV(p2),UV(p1)]);
				else
					core.addPolygon(4, true, [p4,p3,p2,p1],[UV(p4),UV(p3),UV(p2),UV(p1)]);
			}
		}
	}
}

function DrawFace(core,point1,point2,point3,point4,vec) {
	var p1 = point1.add(vec);
	var p2 = point2.add(vec);
	var p3 = point3.add(vec);
	var p4 = point4.add(vec);
	core.addPolygon(4, true, [p1,p2,p3,p4],[UV(p1),UV(p2),UV(p3),UV(p4)]);
}

function DrawEdge(core,point1,point2,radius1,radius2,vec1,vec2) {
	var t1;
	var t2;
	var t3 = point1.add(vec1.multiply(radius1));
	var t4 = point2.add(vec1.multiply(radius1));
	for( var ii = 1;ii < intTotalSteps;ii++) {
		var i = ii * cornerStep;
		var a = radius1 * Math.cos(i);
		var b = radius2 * Math.sin(i);
		t1 = point1.add( vec1.multiply(a)).add( vec2.multiply(b));
		t2 = point2.add( vec1.multiply(a)).add( vec2.multiply(b));
		core.addPolygon(4, true, [t1,t2,t4,t3],[UV(t1),UV(t2),UV(t4),UV(t3)]);
		t3 = t1;
		t4 = t2;
	}
	t1 = point1.add(vec2.multiply(radius2));
	t2 = point2.add(vec2.multiply(radius2));
	core.addPolygon(4, true, [t1,t2,t4,t3],[UV(t1),UV(t2),UV(t4),UV(t3)]);
}







