// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Billboard.js
//
// this is Polygon scirpt. place this into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder.

function buildUI(obj){
    
    if( obj.family() != NGONFAMILY) { // install error check from Todd's code.:)
        OS.messageBox("Installation Error!","This script object is in the wrong folder. Please place it in the PolygonObj folder.");
        return;
    }
    obj.setParameter("name","Billboard");

    obj.addParameterFloat("radius",0.5,0,10000,true,true);
    obj.addParameterFloat("height",1,0,10000,true,true);
    obj.addParameterInt("panels",2,1,15,true,true);
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle",45,1,180,true,true);
}

function buildObject(obj) {

    obj.setParameter("normalType",obj.getParameter("smooth"),false);
    obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
    
    var core = obj.core();
    
    var rad = obj.getParameter("radius");
    var height = obj.getParameter("height");
    
    var panels = obj.getParameter("panels");
    var step = 180 / panels;
    
    for (var i = 0;i < panels;i++) {
        var mat = new Mat4D(ROTATE_HPB, step*i, 0, 0);
        var uv = [];
        
        var i1 = core.addVertex(false,mat.multiply(new Vec3D(rad, height, 0)));
        var i2 = core.addVertex(false,mat.multiply(new Vec3D(rad, 0, 0)));
        var i3 = core.addVertex(false,mat.multiply(new Vec3D(-rad, 0, 0)));
        var i4 = core.addVertex(false,mat.multiply(new Vec3D(-rad, height, 0)));
        
        uv[0] = new Vec2D(0, 0);
        uv[1] = new Vec2D(0, 1);
        uv[2] = new Vec2D(1, 1);
        uv[3] = new Vec2D(1, 0);
        
        var pIndex = core.addIndexPolygon(4, [i1, i2, i3, i4], uv);
        
        core.setActivePolygonSelection(i+1);
        core.setPolygonSelection(pIndex, true);
    }
}

