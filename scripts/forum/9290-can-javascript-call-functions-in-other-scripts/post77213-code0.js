// Source: https://www.cheetah3d.com/forum/index.php?threads/9290/post-77213
// Author: feloneouscat (Cheetah3D forum), posted 2013-02-24
// Thread: "Can Javascript call functions in other scripts?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var Bone = new function()
{
    this.createBone = function(doc, name, vertex)
    {
        /* function body */
        return bone;
    }

    this.recurseParentBoneVertex = function (object, vertex)
    {
        /* function body */
        return vertex;
    }

    this.createChildBone = function (doc, name, vertex, parent)
    {
        /* function body */

        vertex = Bone.recurseParentBoneVertex(parent, vertex);

        /* more function body */

        return bone;
    }
}