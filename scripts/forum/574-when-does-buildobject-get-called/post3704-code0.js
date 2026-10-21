// Source: https://www.cheetah3d.com/forum/index.php?threads/574/post-3704
// Author: ToddWR (Cheetah3D forum), posted 2006-03-31
// Thread: "when does buildObject get called?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj){
    
    obj.setParameter("name","Watch Object");
    
    obj.addParameterFloat("Initial H",0,-180,180,true,true);
    obj.addParameterFloat("Initial P",0,-180,180,true,true);
    obj.addParameterFloat("Initial B",0,-180,180,true,true);
    obj.setCreatorObj(true);
}

function buildObject(obj){
	var n = obj.childCount();
	var d = obj.getParameter("distance");
	var hh = obj.getParameter("Initial H");
	var pp = obj.getParameter("Initial P");
	var bb = obj.getParameter("Initial B");
	if (n > 1) {
		var c1 = obj.childAtIndex(0);
		var c2 = obj.childAtIndex(1);
		var p1 = c1.getParameter("position");
		var p2 = c2.getParameter("position");
	
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		var dz = p2.z - p1.z;
		var a = Math.atan2(dy,dx);
		var b = 0.0;
		b = 0; //Math.atan2(dz,dx);
		var c = Math.atan2(dz,dy);
		// change from rads to degrees
		a = a / 3.141592 * 180.0;
		b = b / 3.141592 * 180.0;
		c = c / 3.141592 * 180.0;
		c1.setParameter("rotation",new Vec3D(c+hh,b+pp,a+bb));
		
	}
}