// Source: https://www.cheetah3d.com/forum/index.php?threads/6840/post-55392
// Author: tg_jp (Cheetah3D forum), posted 2011-02-02
// Thread: "polygon script question"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Triangle Detector.s
//

function buildUI( tool ) {
	
	tool.addParameterSeparator("Triangle Detector");
	
	tool.addParameterBool("ignore normal", 0, 0, 1, true, true);
	tool.addParameterButton("select double tris.", "select", "selectDoubleTris");
}

function selectDoubleTris( tool ) {
	
	var obj = tool.document().selectedObject();
	
	if (obj.type() == POLYGONOBJ) {
		// a list of should be selected polygon's indices.
		var list = [];
		var i, j;
		
		var core = obj.core();
		var polyCount = core.polygonCount();
		var ignoreNormal = tool.getParameter("ignore normal");
		
		for (i = 0;i < polyCount;i++) {
			if (list.indexOf( i ) < 0) { // not yet detected.
				var poly = new Poly( i, core );
				
				for (j = 0;j < polyCount;j++) {
					if ( i != j && poly.isEqual( j, core, ignoreNormal )) {
						if (list.indexOf( j ) < 0) {
							list.push( j );
						}
					}
				}
			}
		}
		
		list = list.sort();
		print( "-- Triangel Detector --\ndetected indices: " +list );
		for (i = 0;i < list.length;i++) {
			core.setPolygonSelection( list[i], true );
		}
		// if you want delte polygon
		/*
		for (i = list.length-1;i > -1;i--) {
			core.deletePolygon( list[i] );
		}
		*/
		//
		obj.update();
	}
}

// funciton class 
function Poly( _index, core ) {
	this.index = _index;
	
	this.size = core.polygonSize( _index );
	
	this.vertices = [];
	for (var i = 0;i < this.size;i++) {
		this.vertices.push( core.vertex( core.vertexIndex( _index, i ) ) );
	}
}
// adding prototype function isEqual
Poly.prototype.isEqual = function ( _index, core, ignoreNormal ) {
	var csize = core.polygonSize( _index );
	
	// polygon sizes are different, return false.
	if (csize != this.size) return false;
	
	if ( !ignoreNormal) { // 
		// if both normals are different, return false.
		if ( ! core.normal( this.index ).isEqual( core.normal( _index ) ) ) return false;
	}
	
	var i,j;
	var result = 0;
	for (i = 0;i < csize;i++) {
		var vec = core.vertex( core.vertexIndex( _index, i ) );
		for (j = 0;j < this.size;j++) {
			if (vec.isEqual( this.vertices[ j ] ) ) {
				result++;
				continue;
			}
		}
	}
	// all vertices are equal.
	if (result == this.size) return true;
}
