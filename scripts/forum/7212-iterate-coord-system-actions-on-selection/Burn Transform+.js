// Source: https://www.cheetah3d.com/forum/index.php?threads/7212/post-59089
// Author: tg_jp (Cheetah3D forum), posted 2011-04-28
// Thread: "Iterate Coord System actions on selection"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Burn Transform+.js
//
// place it into ( ~/Library/Application Support/Cheetah3D/scripts/Tool folder ).

function buildUI( tool ) {
    
    tool.addParameterSeparator("Burn Transform");
    tool.addParameterButton("Burn Transform", "burn", "burnTransform");
    tool.addParameterSeparator("Burn Scale");
    tool.addParameterButton("Burn Scale", "burn", "burnScale");
    
}

function burnTransform( tool ) {
    var doc = tool.document();
    
    var obj = doc.selectedObject();
    
    burn( obj, true );
}

function burnScale( tool ) {
    var doc = tool.document();
    
    var obj = doc.selectedObject();
    
    burn( obj, false );
}

function burn( obj, trans ) {
    var i;
    var count = obj.childCount();
    for (i = 0;i < count;i++) {
        var child = obj.childAtIndex( i );
        
        burn( child, trans );
    }
    
    if (obj.type() == POLYGONOBJ) {
        var core = obj.core();
        if (trans) {
            var mat = obj.objMatrix();
        } else {
            var scale = obj.getParameter("scale");
            var mat = new Mat4D( SCALE, scale.x, scale.y, scale.z );
        }
        
        var vCount = core.vertexCount();
        
        for (i = 0;i < vCount;i++) {
            core.setVertex( i, mat.multiply( core.vertex( i ) ) );
        }
        
        if (trans) {
            obj.setParameter("position", new Vec3D(0, 0, 0));
            obj.setParameter("rotation", new Vec3D(0, 0, 0));
        }
        obj.setParameter("scale", new Vec3D(1, 1, 1));
    }
}
