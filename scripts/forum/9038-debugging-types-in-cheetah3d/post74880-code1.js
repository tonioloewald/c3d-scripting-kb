// Source: https://www.cheetah3d.com/forum/index.php?threads/9038/post-74880
// Author: Reshka (Cheetah3D forum), posted 2012-11-23
// Thread: "Debugging Types in Cheetah3D"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main(doc)
{
    buildConstMap();
    ....
    // assume var obj is something you want the type of
    // assume var tag is a tag
    // if you know the context of the object
    print("NewObject = " + getNameForType(obj, "OBJECT");
    print("NewTag = " + getNameForType(tag, "TAG");

    // assume var thing is something you know nothing about it
    print("Thing = " + getNameForType(thing);
}