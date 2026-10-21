// Source: https://www.cheetah3d.com/forum/index.php?threads/8469/post-70473
// Author: mixa (Cheetah3D forum), posted 2012-05-14
// Thread: "Particle Mesh -> Polygons"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(tool){
	tool.addParameterLink("mesh", true);
	tool.addParameterButton("apply","OK","apply");
}

function apply(tool) {
	var document = tool.document();
	var x = tool.getParameter("mesh");
	if (!x || x.family() != PARTICLEFAMILY) {
		return;
	}

	var childCount = x.childCount();
	var core = x.core();
	var particleCount = core.particleCount();
	folder = document.addObject(FOLDER);
	folder.setParameter("name", "Particle Group");
	folder.setParameter("position", x.getParameter("position"));
	folder.setParameter("rotation", x.getParameter("rotation"));
	folder.setParameter("scale", x.getParameter("scale"));

	var j = 0;
	var instance = 0;
	for (var i = 0; i < particleCount; i++) {
		var particle = core.particleAtIndex(i);

		var pPos = particle.getPosition();
		var pRot = particle.getRotation();
		var pScl = particle.getScale();

		// getting particle rotation matrix
		var pMat = new Mat4D( ROTATE, pRot.x, pRot.y, pRot.z );

		child = x.childAtIndex(j);
		copy = copyObject(document, child);
		var cRot = copy.getParameter("rotation");

		// getting copy rotation matrix
		var cMat = new Mat4D( ROTATE_HPB, cRot.x, cRot.y, cRot.z );
		// getting result rotation matrix
		var mat = pMat.multiply( cMat );

		// getting HPB rotation from result matrix
		var rh, rp, rb;
		rp = Math.asin( Math.max( -1.0, Math.min( 1.0, -mat.m12 ) ) );
		if (Math.abs( Math.cos( rp ) ) > 0.0001) {
			rh = Math.atan2( mat.m02, mat.m22 );
			rb = Math.atan2( mat.m10, mat.m11 );
		} else {
			rh = Math.atan2( -mat.m20, mat.m00 );
			rb = 0;
		}
		pRot = new Vec3D( rh * RAD2DEG, rp * RAD2DEG, rb * RAD2DEG );

		var name = copy.getParameter("name");
		copy.setParameter("name", name + "." + instance);
		copy.setParameter("position", copy.getParameter("position").add( pPos ) );
		copy.setParameter("rotation", pRot );
		copy.setParameter("scale", copy.getParameter("scale").multiply( pScl ) );

		folder.addChildAtIndex( copy, i );

		j++;
		if (j == childCount) {
			j = 0;
			instance++;
		}
	}
}

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

var RAD2DEG = 180 / Math.PI;
