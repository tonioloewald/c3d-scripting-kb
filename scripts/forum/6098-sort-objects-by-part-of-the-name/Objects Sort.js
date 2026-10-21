// Source: https://www.cheetah3d.com/forum/index.php?threads/6098/post-46279
// Author: tg_jp (Cheetah3D forum), posted 2010-08-07
// Thread: "sort objects by part of the name"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI( tool ) {
	
	tool.addParameterSelector( "order", ["asc", "desc"] );
	
	tool.addParameterBool( "separate scene objects", 1, 0, 1, false, false);
	
	tool.addParameterButton( "sort", "sort", "objectSort" );
	
}

function objectSort( tool ) {
	
	var root = tool.document().root();
	var childCount = root.childCount();
	var list_scene = [];
	var list_light = [];
	var list_camera = [];
	var list = [];
	var obj;
	var i;
	
	var order = parseInt( tool.getParameter("order") );
	var exceptScene = tool.getParameter("separate scene objects");
	
	for (i = 0;i < childCount;i++) {
		obj = root.childAtIndex( i );
		
		if (exceptScene) {
			switch( obj.type() ) {
				case CAMERA:
					list_camera.push( obj );
					break;
				case LIGHT:
				case 55: // SKY LIGHT
					list_light.push( obj );
					break;
				case BLUEPRINT:
					list_scene.push( obj );
					break;
				default:
					list.push( obj );
			}
		} else {
			list.push( obj );
		}
	}
	
	compareObject = function( a, b ) {
		var name_a = a.getParameter("name");
		var name_b = b.getParameter("name");
		
		return ( name_a > name_b )? 1 : -1;
	};
	
	list_camera.sort( compareObject );
	list_light.sort( compareObject );
	list_scene.sort( compareObject );
	list.sort( compareObject );
	
	switch( order ) {
		case 0:
			break;
		case 1:
			list_camera = list_camera.reverse();
			list_light = list_light.reverse();
			list_scene = list_scene.reverse();
			list = list.reverse();
			break;
	}
	
	//print('---');
	
	var objCount = 0;
	
	var cameraCount = list_camera.length;
	
	for(i = 0; i < list_camera.length;i++) {
		obj = list_camera[i];
		
		//print( i + ':' + obj.getParameter("name") );
		root.addChildAtIndex( obj, i );
	}
	
	objCount += cameraCount;
	//print ( objCount );
	
	var lightCount = list_light.length;
	
	for(i = 0; i < list_light.length;i++) {
		obj = list_light[i];
		
		//print( i + ':' + obj.getParameter("name") );
		root.addChildAtIndex( obj, i + objCount);
	}
	
	objCount += lightCount;
	//print ( objCount );
	
	var sceneCount = list_scene.length;
	
	for(i = 0; i < list_scene.length;i++) {
		obj = list_scene[i];
		
		//print( i + ':' + obj.getParameter("name") );
		root.addChildAtIndex( obj, i + objCount);
	}
	
	objCount += sceneCount;
	//print ( objCount );
	
	for(i = 0; i < list.length;i++) {
		obj = list[i];
		
		//print( i + ':' + obj.getParameter("name") );
		root.addChildAtIndex( obj, i + objCount );
	}
}
