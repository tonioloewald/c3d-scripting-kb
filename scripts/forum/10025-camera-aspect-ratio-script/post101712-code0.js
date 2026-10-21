// Source: https://www.cheetah3d.com/forum/index.php?threads/10025/post-101712
// Author: podperson (Cheetah3D forum), posted 2016-06-16
// Thread: "Camera Aspect Ratio Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function searchChildren(obj, callback, found){
    found || (found = []);
    for(var i = 0; i < obj.childCount(); i++){
        var child = obj.childAtIndex(i);
        if(callback(child)){
            found.push(child);
        }
        searchChildren(child, callback, found);
    }
    return found;
}

// which lets you write a one-liner like this
var cameras = searchChildren(doc.root(), function(obj){ return obj.type() === CAMERA; });