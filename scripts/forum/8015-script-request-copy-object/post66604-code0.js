// Source: https://www.cheetah3d.com/forum/index.php?threads/8015/post-66604
// Author: Edward (Cheetah3D forum), posted 2012-01-16
// Thread: "Script Request: Copy Object"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function copyObject (document, object) {
	var copy = document.addObject(object.type());
	
	// Copy Parameters
	var name     = object.getParameter("name");
	var position = object.getParameter("position");
	var rotation = object.getParameter("rotation");
	var scale    = object.getParameter("scale");
	copy.setParameter("name",name);
	copy.setParameter("position",position);
	copy.setParameter("rotation",rotation);
	copy.setParameter("scale",scale);
	
	// Copy Materials
	var array = object.materialTags();
	var count = array.length;
	for (var index = 0; index < count; index++) {
		var ID  = array[index].linkedToMaterial();
		var mat = document.materialAtIndex(ID);
		var tag = copy.addTagOfType(SHADERTAG);
		tag.setParameter("material",mat);
	}
	
	// Copy Geometry
	if (object.type() == POLYGONOBJ) {
		var count = object.core().vertexCount();
		for (var index = 0; index < count; index++) {
			var vertex = object.core().vertex(index);
			copy.core().addVertex(false, vertex);
		}
		var count = object.core().polygonCount();
		for (var index = 0; index < count; index++) {
			var verts = [];
			var uvs   = [];
			var size  = object.core().polygonSize(index);
			for (var corner = 0; corner < size; corner++) {
				var vertex = object.core().vertexIndex(index,corner);
				var uv     = object.core().uvCoord(index,corner);
				verts[corner] = vertex;
				uvs[corner]   = new Vec2D(uv.x,uv.y);
			}
			copy.core().addIndexPolygon(size,verts,uvs);
		}
	}
	return copy;
}