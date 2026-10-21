// Source: https://www.cheetah3d.com/forum/index.php?threads/5514/post-40304
// Author: PurpleLizzard (Cheetah3D forum), posted 2010-03-15
// Thread: "Getting Texture References"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// (c) 2010 Kyle
// The copyright line above is a total joke, do whatever you want with this script, it's not that great... and it's 9 lines long (with one of those lines being useless whitespace)

//This script prints all of the texture files used in a scene, or at least all of the textures that are directly linked to the diffuse input of the material shader

function main(doc){
	var numMats = doc.materialCount();

    for(var i = 0; i < numMats; i++){
    	var texPath = doc.materialAtIndex(i).colorMap();
    	if(texPath != 'none'){
	    	print(texPath);
    	}
    }
}