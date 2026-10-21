// Source: https://www.cheetah3d.com/forum/index.php?threads/6776/post-54515
// Author: tg_jp (Cheetah3D forum), posted 2011-01-13
// Thread: "Polygon Splitter.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Polygon Splitter.js
//
// it's a Tool script to split polygon object by its polygon seleciton. splitted object will be named 'original_name'_[polysel number]...
// place this into ~/Appliction Support/Cheetah3D/scripts/Tool folder.
//
// create by Hiroto Tsubaki
// tg@tres-graficos.jp
// http://www.tres-graficos.jp/blog/

function buildUI( tool ){ 
	
	tool.addParameterSeparator("Polygon Splitter");
	
	tool.addParameterButton("split by polysel", "split", "splitByPolySel");
	
}

function splitByPolySel( tool ) {
	
	var doc = tool.document();
	var bobj = doc.selectedObject();
	
	if (bobj && bobj.family() == NGONFAMILY) {
		
		var bcore = bobj.core();
		
		for (var i = 0;i < 16;i++) {
			
			bcore.setActivePolygonSelection(i);
			
			var size;
			var obj = null;
			var core = null;
			var vertices = [];
			var uvs = [];
			var polyCount = bcore.polygonCount();
			
			for (var j = 0;j < polyCount;j++) {
				
				if (bcore.polygonSelection( j )) {
					if (!obj) {
						obj = doc.addObject( POLYGONOBJ );
						bobj.owner().addChildAtIndex( obj, bobj.owner().childCount() );
						
						obj.setParameter("name", bobj.getParameter("name") + '_' + i);
						obj.setParameter("position", bobj.getParameter("position"));
						obj.setParameter("rotation", bobj.getParameter("rotation"));
						obj.setParameter("scale", bobj.getParameter("scale"));
						
						// if you use this with Cheetah3D 5.4-, comment out below 2 lines.
						obj.setParameter("pivot", bobj.getParameter("pivot"));
						obj.setParameter("shear", bobj.getParameter("shear"));
						
						core = obj.core();
					}
					size = bcore.polygonSize( j );
					
					print( i+', index:'+j );
					for (var k = 0;k < size;k++) {
						vertices[ k ] = bcore.vertex( bcore.vertexIndex( j, k ) );
						uvs[ k ] = bcore.uvCoord( j, k );
					}
					
					var pid = core.addPolygon( size, true, vertices );
					
					for (var k = 0;k < size;k++) {
						core.setUVCoord( pid, k, uvs[k] );
						core.setEdgeSelection( pid, k, SEAM, bcore.edgeSelection( j, k, SEAM ) );
						core.setEdgeSelection( pid, k, CREASE, bcore.edgeSelection( j, k, CREASE ) );
						core.setEdgeSelection( pid, k, SELECT, bcore.edgeSelection( j, k, SELECT ) );
						core.setEdgeSelection( pid, k, UVPOINT, bcore.edgeSelection( j, k, UVPOINT ) );
						core.setEdgeSelection( pid, k, UVEDGE, bcore.edgeSelection( j, k, UVEDGE ) );
						core.setEdgeSelection( pid, k, UVPINNED, bcore.edgeSelection( j, k, UVPINNED ) );
					}
				}
				
				if (obj) obj.update();
			}
		}
		
	}
}