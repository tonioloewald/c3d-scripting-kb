// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Purpose         - Makes a polygon planar. It will calculate the average plane of all the 
//                   vertices of the polygon. Then it will align all the points on that 
//                   plane.
// Author          - Marco Biasini ( mbiasini DOT bluewin DOT ch )
//                   tg_jp
// Date            - March 6, 2007
// Feel free to modify


function get_selected_polygon( _object )
{
    selected = new Array;
    
	for ( var i = 0; i < _object.polygonCount(); ++i )
	{
		if ( _object.polygonSelection( i ) )
		{
            selected.push(i);
		}
	}
	return selected;
}

function vec3_dot( _a, _b )
{
	return _a.x*_b.x+_a.y*_b.y+_a.z*_b.z;
}

function main( _doc )
{
	var theObject = _doc.selectedObject();
	
	// Check if there's an object. If not, notify the user.
	if ( !theObject || theObject.family() != NGONFAMILY )
	{
		OS.beep();
		return;
	}
	var polyRep = theObject.core();
	var poly = get_selected_polygon( polyRep );
	if ( poly.length > 0 )
	{
		var normal = new Vec3D( 0.0, 0.0, 0.0 );
		var point  = new Vec3D( 0.0, 0.0, 0.0 );

		// Sum them up
		for (var num in poly) {
            var polynum = poly[num];
            var polySize = polyRep.polygonSize(polynum);
            var normal_sub = new Vec3D( 0.0, 0.0, 0.0 );
            var point_sub  = new Vec3D( 0.0, 0.0, 0.0 );
            for ( var i = 0; i < polySize; ++i )
            {
            	normal_sub = normal_sub.add( polyRep.normal(polynum, i ) );
            	point_sub = point_sub.add( polyRep.vertex( polyRep.vertexIndex( polynum, i ) ) );
            }
            normal_sub = normal_sub.multiply( 1.0/normal_sub.norm() );
            point_sub = point_sub.multiply( 1.0/polySize );
            
            normal = normal.add(normal_sub);
            point = point.add(point_sub);
		}
		printVec3D(normal);
		printVec3D(point);
		normal = normal.multiply(1.0/poly.length);
		point = point.multiply(1.0/poly.length);
		var planeD = vec3_dot( normal, point );
		
		for (var num in poly) {
		    var polynum = poly[num];
		    var polySize = polyRep.polygonSize(polynum);
    		for ( var i = 0; i < polySize; ++i )
    		{
    			var v = polyRep.vertex( polyRep.vertexIndex( polynum, i ) );			
    			// Calculate the distance from the plane.
    			var d = -vec3_dot( normal, v )+planeD;
    			// Move the long the planes normal onto the plane.
    			var pos = new Vec3D( v.x+d*normal.x, v.y+d*normal.y, v.z+d*normal.z );
    			polyRep.setVertex( polyRep.vertexIndex( polynum, i ), pos );
    		}
		}
		theObject.update();
	}
	else
	{
		OS.beep();
	}
}
