// Source: https://www.cheetah3d.com/forum/index.php?threads/808/post-104953
// Author: feloneouscat (Cheetah3D forum), posted 2017-01-05
// Thread: "DOF Helper"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// DOF Helper.js
//
//  v.060725
//  required version : Cheetah3D v3.3
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 20060725 first
// 20060727 add error check.
// 20170105 Updated for Cheetah 7 - I'm not sure what "lens radius" means in the context of C3D v7
//
// Usage: Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//
// 1. select DOF Helper.js from menu bar.
// 2. select target object in Object browser view. if you want to focus to polygon, you should select the polygon before using DOF Helper.js tool.
// 3. click 'Set' button side of 'distance'.
//    * if 'use camera distance' is checked, this script set distance with value of  active camera (internal) property. camera 'distance' is changed by click target icon on right up side of 3D view.
//    * if 'selected polygon' is checked, this script use selected polygon(s) of target object for calculation of distance.
//    * this script attach DOF tag automatically, if active camera have not.
// 4. you also can set 'lens radius' to the value calculated with 'field of view' peroperty by clicking 'from cam FOV' button.

var fov2FocalFactor = 0.02; // default

function buildUI(tool) {

    tool.addParameterSeparator("DOF Helper");


    tool.addParameterSeparator("focal distance");

    tool.addParameterBool("use camera distance",0,0,1,false,false);
    tool.addParameterBool("selected polygon",1,0,1,false,false);
    tool.addParameterButton("distance","Set","setDistance");

    tool.addParameterSeparator("lens radius");

    tool.addParameterFloat("factor",fov2FocalFactor,0.0,0.005,false,false);
    tool.addParameterButton("from cam FOV","Set","setFocalLength");
}

function setFocalLength(tool) {
    // caulculating lenz side from fov.
    var doc = tool.document();
    var cam = doc.activeCamera();
    fov2FocalFactor = tool.getParameter("factor");
    //print("---- DOF Helper > setFocalLength ----");
    var cam_fov = cam.getParameter("fieldOfView");
    var cam_aspect = cam.getParameter("resolutionX") / cam.getParameter("resolutionY");
    var cam_focalLength = cam_aspect / Math.tan((cam_fov * Math.PI / 180) / 2) / 2 * fov2FocalFactor;

    cam.setParameter("apertureSize", cam_focalLength);
}

function setDistance(tool) {
    var i,j;
    var doc = tool.document();
    var cam = doc.activeCamera();
    var cam_distance = cam.getParameter("distance");
    var cam_pos = cam.getParameter("position");
    var target_obj = doc.selectedObject();

    if (tool.getParameter("use camera distance") != true && target_obj.type() == CAMERA && target_obj.getParameter("activeCamera")) {
        OS.messageBox("Error", "Please don't select active Camera.");
        return;
    }
    //print("---- DOF Helper > setDistance ----");
    if (tool.getParameter("use camera distance") != true) {
        var target_pos = target_obj.getParameter("position");
        //printVec3D("target_pos",target_pos);
        if (target_obj.family() == NGONFAMILY) {
            var isVertsSelected = false;
            var selectedVerts = new Array;
            var core = target_obj.modCore();
            var vertCount = core.vertexCount();
            var polyCount = core.polygonCount();
            var mat = target_obj.obj2WorldMatrix();
            //printMatrix(mat);
            //print("polygonCheck");
            // checking polygon selected.
            for (i = 0;i < polyCount;i++) {
                if (core.polygonSelection(i)) {
                    var polySize = core.polygonSize(i);
                    for (j = 0;j < polySize;j++) { // store verteces of selected polygon.
                        selectedVerts.push(core.vertex(core.vertexIndex(i,j)));
                    }
                }
            }
            if (tool.getParameter("selected polygon") && selectedVerts.length > 0) { // in case, has selected polygon.
                vertCount = selectedVerts.length;
                //print("selectedChecked:"+vertCount);
                target_pos = selectedVerts[0];
                for (i = 1;i < vertCount;i++) {
                    target_pos = target_pos.add(selectedVerts[i]);
                }
            } else { // has no selected polygon
                //print("selectedUnchecked");
                target_pos = core.vertex(0);
                for (i = 1;i < vertCount;i++) {
                    target_pos = target_pos.add(core.vertex(i));
                }
            }
            target_pos = target_pos.multiply(1/vertCount);
            target_pos = mat.multiply(target_pos);
            //printVec3D("target_pos",target_pos);
        }
        target_pos = target_pos.sub(cam_pos);
        //printVec3D("target_pos",target_pos);
        cam_distance = target_pos.norm();
    }

    cam.setParameter("focalDistance", cam_distance);

}


// debug funcs

function printVec3D(str, vec) {
    print(str+'=x:'+vec.x.toPrecision(3)+', y:'+vec.y.toPrecision(3)+', z:'+vec.z.toPrecision(3));
}

function printMatrix(matrix) {
    print(matrix.m00.toPrecision(3)+':'+matrix.m10.toPrecision(3)+':'+matrix.m20.toPrecision(3)+':'+matrix.m30.toPrecision(3));
    print(matrix.m01.toPrecision(3)+':'+matrix.m11.toPrecision(3)+':'+matrix.m21.toPrecision(3)+':'+matrix.m31.toPrecision(3));
    print(matrix.m02.toPrecision(3)+':'+matrix.m12.toPrecision(3)+':'+matrix.m22.toPrecision(3)+':'+matrix.m32.toPrecision(3));
    print(matrix.m03.toPrecision(3)+':'+matrix.m13.toPrecision(3)+':'+matrix.m23.toPrecision(3)+':'+matrix.m33.toPrecision(3));
}


