// Source: https://www.cheetah3d.com/forum/index.php?threads/4594/post-32398
// Author: ToddWR (Cheetah3D forum), posted 2009-09-10
// Thread: "(REQ) Center of Gravity (with c-code)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var verts = new Array();
var tris = new Array();

function test(obj) {
	var root = obj.document();
	var o = root.selectedObject();
	if( o == null)
		return;
	verts = [];
	tris = [];
	var core = o.modCore();
	var size = core.vertexCount();
	for( var i = 0; i < size;i++) {
		verts[i] = core.vertex(i);
	}
	size = core.triangleCount();
	size = core.polygonCount();
	for(  i = 0; i < size;i++) {
		var l = core.polygonSize(i);
		for( var j = 0; j < l - 2;j++) {
			var a = core.triangle(i,j);
			var a0 = core.vertexIndex(i,a[0]);
			var a1 = core.vertexIndex(i,a[1]);
			var a2 = core.vertexIndex(i,a[2]);
			tris[tris.length] = new Vec3D(a2,a1,a0);
		}
	}
	print( "the volume is " + Volume(verts,tris,tris.length));
}

function Volume(vertices, tris,  count) {
	// count is the number of triangles (tris) 
	var	volume=0;
	var m = new Mat3D();
	for(var i=0; i < count; i++) { // for each triangle
		m.m00 = vertices[tris[i].x].x; m.m01 = vertices[tris[i].x].y; m.m02 = vertices[tris[i].x].z; 
		m.m10 = vertices[tris[i].y].x; m.m11 = vertices[tris[i].y].y; m.m12 = vertices[tris[i].y].z; 
		m.m20 = vertices[tris[i].z].x; m.m21 = vertices[tris[i].z].y; m.m22 = vertices[tris[i].z].z; 
		volume += Math.abs(m.determinant()); //divide by 6 later for efficiency
	}
	return volume/6.0;  // since the determinant give 6 times tetra volume
}

function CenterOfMass(vertices, tris, count) {
	// count is the number of triangles (tris) 
	var	com = new Vec3D();
	var	volume=0; // actually accumulates the volume*6
	var m = new Mat3D();
	for(var i=0; i < count; i++)  // for each triangle
	{
		m.m00 = vertices[tris[i].x].x; m.m01 = vertices[tris[i].x].y; m.m02 = vertices[tris[i].x].z; 
		m.m10 = vertices[tris[i].y].x; m.m11 = vertices[tris[i].y].y; m.m12 = vertices[tris[i].y].z; 
		m.m20 = vertices[tris[i].z].x; m.m21 = vertices[tris[i].z].y; m.m22 = vertices[tris[i].z].z; 
		var vol = m.determinant();  // dont bother to divide by 6 
		//com += vol * (A.x+A.y+A.z);  // divide by 4 at end
		com.x += vol * (m.m02 + m.m12 + m.m22);  // divide by 4 at end
		com.y += vol * (m.m02 + m.m12 + m.m22);  // divide by 4 at end
		com.z += vol * (m.m02 + m.m12 + m.m22);  // divide by 4 at end
		volume + =vol;
	}
	com = com.multiply(1/ volume * 4); 
	return com;
}