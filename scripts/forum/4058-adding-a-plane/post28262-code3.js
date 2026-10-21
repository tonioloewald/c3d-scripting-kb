// Source: https://www.cheetah3d.com/forum/index.php?threads/4058/post-28262
// Author: tg_jp (Cheetah3D forum), posted 2009-04-02
// Thread: "Adding a Plane"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj) {
	obj.setParameter("name", "Plane");
	
	obj.addParameterSelector("axis",["x","y","z"],true,true);
	obj.addParameterFloat("width",0.5,0,1000,true,true);
	obj.addParameterFloat("depth",0.5,0,1000,true,true);
}
function buildObject(obj) {
	var width = obj.getParameter("width");
	var depth = obj.getParameter("depth");
	var axis = obj.getParameter("axis");
	
	var getVec;
	switch (parseInt(axis)) {
		case 0:
			getVec = function(w, d) { return new Vec3D(0, w, d); };
			break;
		case 1:
			getVec = function(w, d) { return new Vec3D(w, 0, d); };
			break;
		case 2:
		default:
			getVec = function(w, d) { return new Vec3D(w, d, 0); };
			break;
	}
	
	// make polygon
	var core = obj.core();
	var v = new Array;
	
	v[0] = core.addVertex(false, getVec( width /  2, depth /  2) );
	v[1] = core.addVertex(false, getVec( width / -2, depth /  2) );
	v[2] = core.addVertex(false, getVec( width / -2, depth / -2) );
	v[3] = core.addVertex(false, getVec( width /  2, depth / -2) );
	
	var pi = core.addIndexPolygon(4, v);
	
	// if you want UV coord.
	var u = new Array;
	
	u[0] = new Vec4D( 1,  1, 0, 0); // UV1.u, UV1.v, UV2.u, UV2.v
	u[1] = new Vec4D( 0,  1, 0, 0);
	u[2] = new Vec4D( 0,  0, 0, 0);
	u[3] = new Vec4D( 1,  0, 0, 0);
	
	for (var i = 0;i < u.length; i++) {
		core.setUVCoord(pi, i, u[i]);
	}
}