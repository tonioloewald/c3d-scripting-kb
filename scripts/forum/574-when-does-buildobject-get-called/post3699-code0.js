// Source: https://www.cheetah3d.com/forum/index.php?threads/574/post-3699
// Author: Martin (Cheetah3D forum), posted 2006-03-30
// Thread: "when does buildObject get called?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(obj){
    obj.setParameter("name","Menger");
    
    obj.addParameterInt("interations",2,0,3,true,true);
    obj.addParameterBool("removeHidden",true,true,true);

    obj.setCreatorObj(true);
}