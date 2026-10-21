// Source: https://www.cheetah3d.com/forum/index.php?threads/9816/post-81359
// Author: podperson (Cheetah3D forum), posted 2013-08-26
// Thread: "Quad UV Map: Perhaps the simplest useful script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc){
    //get selected object
    var obj = doc.selectedObject();
    
	obj = obj.core();
    for( var i = 0; i < obj.polygonCount(); i++ ){
    	if( obj.polygonSelection( i ) && obj.polygonSize( i ) === 4 ){
    		obj.setUVCoord( i, 0, new Vec2D( 0, 0 ) );
    		obj.setUVCoord( i, 1, new Vec2D( 1, 0 ) );
    		obj.setUVCoord( i, 2, new Vec2D( 1, 1 ) );
    		obj.setUVCoord( i, 3, new Vec2D( 0, 1 ) );
    	}
    }
    
    doc.redrawAll();
}