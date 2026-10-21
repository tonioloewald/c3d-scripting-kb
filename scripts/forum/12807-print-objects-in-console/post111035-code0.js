// Source: https://www.cheetah3d.com/forum/index.php?threads/12807/post-111035
// Author: Und00 (Cheetah3D forum), posted 2018-03-05
// Thread: "Print objects in console"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function iterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], stack + '.' + property);
                } else {
                 stack += property + ": " + obj[property] + "     ";
                }
        	}
        }
        print(stack);
    }