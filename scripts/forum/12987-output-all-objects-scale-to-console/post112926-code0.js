// Source: https://www.cheetah3d.com/forum/index.php?threads/12987/post-112926
// Author: oldmicah (Cheetah3D forum), posted 2018-08-05
// Thread: "Output all objects scale to console"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var key = 'editorActive'; // parameter name
var allValue = true;

function main(doc) {

	var root = doc.root();
	if ( root ) {
		printObjects( root, key, allValue );
	}
}

function printObjects( obj, key, value ) {
	var cc = obj.childCount();
	
	if (1) { // 1 => recursive / 0 => no recursive
		for (var i = 0;i < cc;i++) {
			var c = obj.childAtIndex( i );
			printObjects( c, key, value );
		}
	}
    if(obj.family()==NGONFAMILY){     //save current object if it is a polygon object

		var objname=obj.getParameter("name");
	
		var core=obj.modCore();

		var list = new Array;
		list = StoreChild(0, obj);
		var scale = list[1].getParameter("scale");

		print(objname + " : " + scale.x.toPrecision(3) + ", "+scale.y.toPrecision(3) + ", " + scale.z.toPrecision(3))

		}
	}
	
	function StoreChild(iter, obj) {
	   	var childCount = obj.childCount();
	    var list = new Array(iter, obj, new Array);
	    for (var i = 0; i < childCount;i++) {
  	      var child = obj.childAtIndex(i);
    	    var childList = StoreChild(iter+1, child);
   	     list[2].push(childList);
   	 }
   	 return list;
	}