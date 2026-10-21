// Source: https://www.cheetah3d.com/forum/index.php?threads/8739/post-72540
// Author: chris g (Cheetah3D forum), posted 2012-08-13
// Thread: "A Possible Bug in C3D v6.0?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// DOF Target.js
//
// v.111114
//
// (c) 2011 Hiroto Tsubaki
// http://www.tres-graficos.jp/
// tg@tres-graficos.jp
//

// it's polygon script to set automatically DOF Tag's distance parameter of active camera as focusing to self. if you use this for amination, you have to animate 'update timer' parameter.

var fov2FocalFactor = 0.02;

function buildUI( obj ) {
    
    obj.addParameterFloat("radius", 0.1, 0, 10000, true, true);
    obj.addParameterFloat("update timer", 0, 0, 1000, true, true);
    
    obj.setParameter("name", "DOF Target");
}

function buildObject( obj ) {
    
    var radius = obj.getParameter("radius");
    
    var cam = obj.document().activeCamera();
    var cam_mat = cam.obj2WorldMatrix();
    
    var mat = obj.obj2WorldMatrix();
    
    var cam_pos = cam_mat.multiply( new Vec3D() );
    var pos = mat.multiply( new Vec3D() );
    var cam_distance = pos.sub( cam_pos );
    
    dofTag = attachDOFTag( cam );
    dofTag.setParameter("focalDistance", cam_distance.norm() );
    
    // draw polygons
    var core = obj.core();
    
    var v = [];
    
    v[0] = core.addVertex( false, new Vec3D( 0, radius, 0 ) );
    
    v[1] = core.addVertex( false, new Vec3D( radius, 0, 0 ) );
    v[2] = core.addVertex( false, new Vec3D( 0, 0, radius ) );
    v[3] = core.addVertex( false, new Vec3D( -radius, 0, 0 ) );
    v[4] = core.addVertex( false, new Vec3D( 0, 0, -radius ) );
    
    v[5] = core.addVertex( false, new Vec3D( 0, -radius, 0 ) );
    
    core.addIndexPolygon(3, [ v[0], v[1], v[2] ]);
    core.addIndexPolygon(3, [ v[0], v[2], v[3] ]);
    core.addIndexPolygon(3, [ v[0], v[3], v[4] ]);
    core.addIndexPolygon(3, [ v[0], v[4], v[1] ]);

    core.addIndexPolygon(3, [ v[5], v[2], v[1] ]);
    core.addIndexPolygon(3, [ v[5], v[3], v[2] ]);
    core.addIndexPolygon(3, [ v[5], v[4], v[3] ]);
    core.addIndexPolygon(3, [ v[5], v[1], v[4] ]);
    
}

function attachDOFTag(cam) { 
    // if cam has no DOF tag, this func makes it, and returns it. if cam has DOF tag, just return it.
    var tagCount = cam.tagCount();
    var hasTag = false;
    var dofTag;
    for (i = 0;i < tagCount;i++) {
        var tag = cam.tagAtIndex(i);
        if (tag.type() == DOFTAG) {
            hasTag = true;
            dofTag = tag;
        }
    }
    
    if (hasTag == false) {
        dofTag = cam.addTagOfType(DOFTAG);
    }
    
    return dofTag;
}

