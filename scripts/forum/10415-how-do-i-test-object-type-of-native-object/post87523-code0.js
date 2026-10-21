// Source: https://www.cheetah3d.com/forum/index.php?threads/10415/post-87523
// Author: ToddWR (Cheetah3D forum), posted 2014-05-10
// Thread: "How do I test object type of native object"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function instanceOf(ob,con)
{
    if( typeof con === "object")
        return ob.__proto__ === con.__proto__;
    return ob instanceof con;
}


var myVal = new Vec3D( 0, 0, 0 );
if(instanceOf(myVal, Vec3D) 	print("is Vec3D");
else				print("is no Vec3D");