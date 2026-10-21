// Source: https://www.cheetah3d.com/forum/index.php?threads/10400/post-87369
// Author: tg_jp (Cheetah3D forum), posted 2014-05-03
// Thread: "Extending the Cheetah 3D API"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//

var myPolyCore = function( obj ) {
	// hold built-in PolyCore object
	this.core = obj.core();
	
	// custom function definition
	this.uvInfo = function() {
		var info = [];
		
		var polygonCount = this.core.polygonCount();
		for (var i = 0;i < polygonCount;i++) {
			var polygonSize = this.core.polygonSize();
			for (var j = 0;j < polygonSize;j++) {
				info.push( this.core.uvCoord(i,j) );
			}
		}
		
		return info;
	}
	
	return this;
}

// using sample in Macro script
function main(doc) {
    var obj = doc.selectedObject();
    
    if (obj.family() == NGONFAMILY) {
    	var core = myPolyCore( obj );
    	
    	print( core.uvInfo() );
    }
}