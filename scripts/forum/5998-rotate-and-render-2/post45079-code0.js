// Source: https://www.cheetah3d.com/forum/index.php?threads/5998/post-45079
// Author: tg_jp (Cheetah3D forum), posted 2010-07-14
// Thread: "rotate and render 2"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main( doc ) {
	var obj = doc.selectedObject();
	
	var rot1 = new Vec3D( 0, 0, 0 );
	var rot2 = new Vec3D( 0, 0, 50 );
	
	obj.setParameter("rotation", rot1);
	updateObject( doc.root() );
	doc.render();
	
	obj.setParameter("rotation", rot2);
	updateObject( doc.root() );
	doc.render();
}

function updateObject( obj ) {
	
	// update children first
	var childCount = obj.childCount();
	for (var i = 0;i < childCount;i++) {
		updateObject( obj.childAtIndex( i ) );
	}
	
	// update itself
	obj.update();
}