// Source: https://www.cheetah3d.com/forum/index.php?threads/4334/post-30298
// Author: ToddWR (Cheetah3D forum), posted 2009-06-23
// Thread: "experimental - particles"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// these are used internally
function buildUI(tag){
	var type = tag.owner().family();
	if( type == NGONFAMILY) {
		tag.addParameterSeparator("cloth parameters");
	    tag.addParameterFloat("Mass",1,-99990,99990,true,true);
    } else {
		tag.addParameterSeparator("joint parameters");
	    tag.addParameterFloat("Mass",1,-99990,99990,true,true);
    	tag.addParameterSeparator("connection to parent");
	    tag.addParameterFloat("Strength",1,0,100,true,true);
	    tag.addParameterFloat("Damping",1,0,2,true,true);
	}
}


