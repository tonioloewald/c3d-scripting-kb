// Source: https://www.cheetah3d.com/forum/index.php?threads/7079/post-57851
// Author: podperson (Cheetah3D forum), posted 2011-03-23
// Thread: "Surface Utilities.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Surface Utilities
// (originally: "Global Iterator")
// (c) 2010-11 Tonio Loewald
//
// Loosely based on "Scale Light Intensity.js"
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Goes down the whole scene graph and multiplies the 
//	intensity of every light by a certain factor which
//	has to be specified via the UI.
//

function buildUI(tool){
	tool.addParameterBool("Selection Only", true, false, true, false, false);
	tool.addParameterBool("Recurse Children", true, false, true, false, false);
    tool.addParameterSeparator("Smoothing");
    tool.addParameterFloat("Angle",15.0,0.0,90.0,true,true);
    tool.addParameterButton("Set Smooth Angle","OK","set_smooth");
    tool.addParameterSeparator("Normals");
    tool.addParameterButton("Flip All","OK","flip_normals");
    tool.addParameterButton("Outward from Origin","OK","fix_normals");
    tool.addParameterButton("Unify","OK","unify_normals");
    tool.addParameterButton("Flip Randomly","OK","randomize_normals");
    /*
    tool.addParameterSeparator("Coplanar Faces");
    tool.addParameterFloat("Threshold",0.5,0.0,10.0,true,true);
    tool.addParameterButton("Merge Faces","OK","merge_coplanar_faces");
    tool.addParameterButton("Select Faces","OK","select_coplanar_faces");
    */
}

function target(tool){
	var doc = tool.document();
	if( tool.getParameter("Selection Only") ){
		return doc.selectedObject();
	} else {
		return doc.root();
	}
}

function set_smooth(tool){
    var angle = tool.getParameter("Angle");
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
			obj.setParameter("normalAngle", angle);
		}
	}
    iterate_on_objects( tool, target(tool), fn );
	tool.document().redrawAll();
}

/*
	Note to self -- we're running into problems with iterating over
	adjacent polygons. Also note that we need to test the last edge
	( 0, 1, 2, ... , n-1 ) -> (n-1)-(0) isn't being tested
	
	Suggest I build an iterator that returns a list of qualifying polygons
	and work from there.
*/

// given a polycore and a polygon index, return a list of adjacent faces
function list_adjacent_faces( c, p ){
	var adjacent = [];
	
	for( var i = 1; i < c.polygonSize(p); i++ ){
		// for each edge...
		var u = c.vertexIndex( p, i - 1 );
		var v = c.vertexIndex( p, i );
		for( var q = 0; q < c.polygonCount(); q++ ){
			for( var j = 1; j < c.polygonSize(q); j++ ){
				// we look for another polygon that shares that edge
				var a = c.vertexIndex( q, j - 1 );
				var b = c.vertexIndex( q, j );
				// if it shares the edge in reverse order, it's "adjacent"
				if( a == u && b == v ){
					adjacent.push( q );
				}
			}
		}
	}
	
	return adjacent;
}

function merge_coplanar_faces(tool){
	var c; // our polycore instance
	
	// convert degrees to radians, and then take the sin
	// we can then test faces based on the dot product of face normals
	var threshold = Math.sin(tool.getParameter("Threshold") * 0.01745329252);
	
	// note that it would be GREAT to have a simple iterator for dealing with
	// polygon adjacency, but since we're planning to tear our polygons apart
	// and reassemble them, it's not easy to do
}

function select_coplanar_faces( c, p ){
}

function unify_normals(tool){
	var correct = []; // track what we've fixed
	var c; // our polycore instance
	
	var check_adjacent_polygons = function( seed ){
		// implement an internal stack to avoid recursion across potentially huge numbers of polygons
		var polysToCheck = [ seed ];
		var loopStart = seed + 1; // we can make assumptions on the first pass through the loop
		
		while( polysToCheck.length > 0 ){
			var p = polysToCheck.pop();
			for( var i = 0; i < c.polygonSize(p); i++ ){
				// for each edge...
				var u, v;
				if( i == 0 ){
					u = c.vertexIndex( p, c.polygonSize(p) - 1 );
					v = c.vertexIndex( p, 0 );
				} else {
					u = c.vertexIndex( p, i - 1 );
					v = c.vertexIndex( p, i );
				}
				for( var q = loopStart; q < c.polygonCount(); q++ ){
					// for each uncorrected polygon
					if( !correct[q] ){
						for( var j = 0; j < c.polygonSize(q); j++ ){
							// we look for a shared edge
							var a, b;
							if( j == 0 ){
								a = c.vertexIndex( q, c.polygonSize(q) - 1 );
								b = c.vertexIndex( q, 0 );
							} else {
								a = c.vertexIndex( q, j - 1 );
								b = c.vertexIndex( q, j );
							}
							// if it shares the edge in reverse order, flip it
							if( a == u && b == v ){
								c.flipWinding( q );
								correct[q] = true;
								polysToCheck.push( q );
								break;
							// if it's simply adjacent...
							} else if( a == v && b == u ){
								correct[q] = true;
								polysToCheck.push( q );
								break;
							}
						}
					}
				}
				loopStart = 0; // from now on we need to check everything
			}
		}
	};
	
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
			c = obj.core();
			var number_checked = 0;
			for( var i = 0; i < c.polygonCount(); i++ ){
				correct[i] = false;
			}
			// the outer loop sweeps up islands
			while( correct.some( function( elt ){ return !elt; } ) ){
				for( var i = 0; i < correct.length; i++ ){
					if( !correct[i] ){
						correct[i] = true;
						check_adjacent_polygons( i );
					}
				}
			}
			// Force recalculation of normals
			obj.setParameter("normalAngle", obj.getParameter("normalAngle"));
		}
	};
	iterate_on_objects( tool, target(tool), fn );
	tool.document().redrawAll();
}

function flip_normals(tool){
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
			var c = obj.core();
			for( var i=0; i<c.polygonCount(); i++ ){
				c.flipWinding( i );
			}
			// Force recalculation of normals
			obj.setParameter("normalAngle", obj.getParameter("normalAngle"));
		}
	}
	iterate_on_objects( tool, target(tool), fn );
	tool.document().redrawAll();
}

function fix_normals(tool){
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
			var c = obj.core();
			for( var i=0; i<c.polygonCount(); i++ ){
				// existing normal
				var N = c.normal( i );
				// index of first vertex
				var v = c.vertexIndex( i, 1 );
				var P = c.vertex( v );
				P.norm();
				var d = P.dot(N);
				// c3d returns the dot-product as a VECTOR with x, y, z equal to the result
				if( d.x < 0 ){
					c.flipWinding( i );
				}
			}
			// Force recalculation of normals
			obj.setParameter("normalAngle", obj.getParameter("normalAngle"));
		}
	}
	iterate_on_objects( tool, target(tool), fn );
	tool.document().redrawAll();
}

function randomize_normals(tool){
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
			var c = obj.core();
			for( var i=0; i<c.polygonCount(); i++ ){
				if( Math.random() < 0.5 ){
					c.flipWinding( i );
				}
			}
			// Force recalculation of normals
			obj.setParameter("normalAngle", obj.getParameter("normalAngle"));
		}
	}
	iterate_on_objects( tool, target(tool), fn );
	tool.document().redrawAll();
}

// applies a function to an object and then, if user has selected recurse,
// recursively iterates across that object's children
function iterate_on_objects( tool, obj, fn ){
	fn( obj );
	if( tool.getParameter("Recurse Children") ){
		for( var i=0; i<obj.childCount(); i++ ){
			iterate_on_objects( tool, obj.childAtIndex(i), fn );
		}
	}
}
