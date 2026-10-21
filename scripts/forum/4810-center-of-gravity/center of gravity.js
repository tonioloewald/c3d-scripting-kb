// Source: https://www.cheetah3d.com/forum/index.php?threads/4810/post-34335
// Author: podperson (Cheetah3D forum), posted 2009-10-23
// Thread: "Center of Gravity"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 	center of gravity

	Copyright ©2009 Tonio Loewald -- http://loewald.com/c3dstuff/
	Requires C3D 5.0 or later
	Install script in the ~/Library/Application Support/Cheetah3D/scripts/Tool

	calculates area and sets pivot to the center of gravity for a set of selected faces
*/

function buildUI(tool){
    tool.addParameterSeparator("Center of Gravity");
    tool.addParameterButton("Set Center of Gravity","OK","set_center");
	tool.addParameterFloat("Calculated Area", 0, -1000, 1000, false, false);
}

function set_center(tool){ 
    var doc = tool.document();
	var obj = doc.selectedObject();
	var core = obj.core();
	var area_list = [];
	var center_list = [];
	var total_area = 0;
	if( typeof(core.polygonCount) == "function" ){
		for( var i=0; i<core.polygonCount(); i++ ){
			if( core.polygonSelection(i) ){
				for( var j=0; j<core.polygonSize(i) - 2; j++ ){
					area_list.push( triangle_area( core, i, j ) );
					var area = triangle_area( core, i, j );
					total_area += area;
					center_list.push( triangle_center_of_gravity( core, i, j ) );
				}
			}
		}
	}
	if( total_area > 0 ){
		var center_of_gravity = center_list[0].multiply( area_list[0] );
		for( var i = 1; i < area_list.length; i++ ){
			center_of_gravity = center_of_gravity.add( center_list[i].multiply( area_list[i] ) );
		}
		center_of_gravity = center_of_gravity.multiply( 1.0 / total_area );
		set_pivot( obj, center_of_gravity );
	}
	print( center_of_gravity.x + ', ' + center_of_gravity.y + ', ' + center_of_gravity.z );
	tool.setParameter("Calculated Area", total_area);
	obj.update();
}

function set_pivot( obj, new_center ){
	core = obj.core();
	// offset all the vertices by subtracting the new center
	for( var i = 0; i < core.vertexCount(); i++ ){
		core.setVertex( i, core.vertex(i).sub( new_center ) );
	}
	
	// convert new_center to parent's coordinate system
	new_center = obj.objMatrix().multiply( new_center );
	
	// and move the object there so everything stays in place
	obj.setParameter( "position", new_center );
}

function triangle_center_of_gravity( polycore, poly_idx, tri_idx ){
	var verts = polycore.triangle( poly_idx, tri_idx );
	for( var i = 0; i < 3; i++ ){
		verts[i] = polycore.vertex( polycore.vertexIndex( poly_idx, verts[i] ) );
	}
	return verts[0].add( verts[1].add( verts[2] ) ).multiply( 1.0 / 3.0 );
}

function triangle_area( polycore, poly_idx, tri_idx ){
	var verts = polycore.triangle( poly_idx, tri_idx );
	for( var i = 0; i < 3; i++ ){
		verts[i] = polycore.vertex( polycore.vertexIndex( poly_idx, verts[i] ) );
	}
	var a = verts[1].sub(verts[0]);
	var b = verts[2].sub(verts[1]);
	var c = verts[0].sub(verts[2]);
	a = a.norm();
	b = b.norm();
	c = c.norm();
	var s = (a + b + c) * 0.5;
	return Math.sqrt( s * (s - a) * (s - b) * (s - c) );
}

function iterateTree(obj, fn){
	fn( obj );
    for( var i=0; i<obj.childCount(); i++ ){
		iterateTree( obj.childAtIndex(i), fn );
	}
}
