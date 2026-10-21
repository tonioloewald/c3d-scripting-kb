// Source: https://www.cheetah3d.com/forum/index.php?threads/1939/post-13480
// Author: ToddWR (Cheetah3D forum), posted 2007-07-18
// Thread: "Merging Polygons (the clean way)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	clean polygon.js
//
// Todd Rogers
// Usage: Place this into scripts/Polygon folder. restart Cheetah3D,
//				then select from Tool -> Script -> Polygon -> Clean Polygon
//
//


if( !Vec3D.cross) {
	// returns a Vec3D as a result
	Vec3D.prototype.cross = function(other) {
		var xh = this.y * other.z - other.y * this.z;
		var yh = this.z * other.x - other.z * this.x;
		var zh = this.x * other.y - other.x * this.y;
		return new Vec3D(xh,yh,zh);
	}
}

function Point(val) {
	this.index = val;
	this.ignor = false;
	this.neighbors = new Array();
}

Point.prototype.len = function() {
	return this.neighbors.length;
}

Point.prototype.val = function() {
	return this.index;
}

Point.prototype.ignore = function() {
	this.ignor = true;
}

Point.prototype.ignored = function() {
	return this.ignor;
}

Point.prototype.get = function(index) {
	if( index < 0 || index >= this.neighbors.length)
		return -1;
	return this.neighbors[index];
}

Point.prototype.add = function(index) {
	var i;
	for(i=0;i<this.neighbors.length;i++)
		if( this.neighbors[i] == index)
			return;
	this.neighbors[this.neighbors.length] = index;
}

var verts = new Array();
var value = .000001;
var name = null;

function buildUI(obj){
    obj.setParameter("name","Clean Polygon");
    obj.addParameterInt("level",10,1,1000,true,true);
	obj.setCreatorObj(true);
	obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle",45,1,180,true,true);
	obj.setParameter("smooth",2);
}

function buildObject(obj) {
	var poly = new Array();
	var n = obj.childCount();
	obj.setParameter("normalType",obj.getParameter("smooth"),false);
	obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
	value = 1/(100 * obj.getParameter("level"));
	if(n > 0) {
		var c = obj.childAtIndex(0);
		var core = c.modCore();
		if( name == null) {
			name = c.getParameter("name");
			c.setParameter("name",name+" old");
			obj.setParameter("name",name);
		}
		//--------------- step one, scan the object
		var size = core.vertexCount();
		var m = c.obj2WorldMatrix();
		for( var i = 0; i < size;i++) {
			var pp = m.multiply(core.vertex(i));
			verts[i] = new Point(pp);
		}

		size = core.polygonCount();
		for(  i = 0; i < size;i++) {
			var l = core.polygonSize(i);
			var a = core.vertexIndex(i,0);
			poly[i] = new Array();
			poly[i][0] = a;
			for( var j = 1; j < l ;j++) {
				var b = core.vertexIndex(i,j);
				poly[i][poly[i].length] = b;
				verts[a].add(b);
				verts[b].add(a);
				a = b;
			}
			a = core.vertexIndex(i,0);
			verts[a].add(b);
			verts[b].add(a);
		}
		//--------------- step two, decide what vertexes can be deleted
		size = verts.length;
		for(i=0;i<size;i++) {
			// here we are only interested in points that ONLY have 2 neighbors
			if( verts[i].len() == 2) {
				var p1 = verts[verts[i].get(0)].val();
				var p2 = verts[i].val();
				var p3 = verts[verts[i].get(1)].val();
				if( Collinear(p1,p2,p3))
					verts[i].ignore();
			}
		}
		//--------------- step three, draw the object skipping the deleted points
		core = obj.core();
		for(i=0;i<poly.length;i++) {
			var p = new Array();
			a = 0;
			l = poly[i].length;
			for(j=0;j<l;j++) {
				if(verts[poly[i][j]].ignored()) {
					// actuall do nothing, just move to next point
				} else {
					p[p.length] = verts[poly[i][j]].val();
				}
			}
			core.addPolygon(p.length, true, p);
		}
	}  
}

function Collinear(p1,p2,p3) {
	//{find the difference between the 2 points P1 and P3 to P2 }
	var D1 = p1.sub(p2);
	var D2 = p3.sub(p2);

	//{perform a 3d cross product}
	var C = D1.cross(D2);
	var d = C.x * C.x + C.y * C.y + C.z * C.z;
	//print(d);
	return (d < value); // making this number larger makes for more anglar splines
	// best to keep it small
}
