// Source: https://www.cheetah3d.com/forum/index.php?threads/2262/post-15849
// Author: sig33kde (Cheetah3D forum), posted 2007-10-18
// Thread: "Scripting Issues"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj){
	
    obj.setParameter("name","lots of pictures");
    obj.addParameterButton("update","RUN","take_pictures");

}

function take_pictures(obj){
	var imagetype="jpg";
	var doc=obj.document();
	// var cam=doc.activeCamera();

    for(var i=0;i<300;i++){ 

		var newROT=new Vec3D((i*1.2), 0, 0);
		obj.setParameter("rotation",newROT);
		obj.update();
		doc.render("/path/to/folder/"+i+"."+imagetype);

    }

}