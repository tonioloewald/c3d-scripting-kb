// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Multi Obejct.js
//
// v.060726
// required version : Cheetah3D v.3.3
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
//  2006-07-25 created.
// 
// Usage: Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//

var in_position = new Vec3D(0.0, 0.0, 0.0);
var in_rotation = new Vec3D(0.0, 0.0, 0.0);
var in_scale = new Vec3D(1.0, 1.0, 1.0);

function buildUI(tool) {
    tool.addParameterSeparator("Multi Object");
    
    tool.addParameterBool("set position",0,0,1,false,false);
    tool.addParameterFloat("pos x",0.0,-1000.0,10000.0,false,false);
    tool.addParameterFloat("pos y",0.0,-1000.0,10000.0,false,false);
    tool.addParameterFloat("pos z",0.0,-1000.0,10000.0,false,false);

    tool.addParameterBool("set rotation",0,0,1,false,false);
    tool.addParameterFloat("rot x",0.0,-1000.0,10000.0,false,false);
    tool.addParameterFloat("rot y",0.0,-1000.0,10000.0,false,false);
    tool.addParameterFloat("rot z",0.0,-1000.0,10000.0,false,false);

    tool.addParameterBool("set scale",0,0,1,false,false);
    tool.addParameterFloat("scale x",1.0,-1000.0,10000.0,false,false);
    tool.addParameterFloat("scale y",1.0,-1000.0,10000.0,false,false);
    tool.addParameterFloat("scale z",1.0,-1000.0,10000.0,false,false);
    
    tool.addParameterBool("recursive",1,0,1,false,false);
    tool.addParameterBool("only children",1,0,1,false,false);
    
    tool.addParameterButton("apply","OK","apply");

    tool.addParameterSeparator("Factor");
    tool.addParameterFloat("factor",1.0,-1000.0,10000.0,false,false);
    tool.addParameterButton("apply factor","OK","applyFactor");
    
    tool.addParameterSeparator("Capture");
    tool.addParameterButton("capture","capture","capture");
    
    tool.addParameterSeparator("Help");
    tool.addParameterButton("Usage","show","showUsage");
}

function setUIParams(tool, vec, prop) {
    tool.setParameter(prop+" x", vec.x);
    tool.setParameter(prop+" y", vec.y);
    tool.setParameter(prop+" z", vec.z);
}

function applyFactor(tool) {
    var fac = tool.getParameter("factor");
    
    in_position = in_position.multiply(fac);
    in_scale = in_scale.multiply(fac);

    setUIParams(tool, in_position, "pos");
    setUIParams(tool, in_rotation, "rot");
    setUIParams(tool, in_scale, "scale");        
}

function updateInternalParams(in_param, inx, iny, inz) {
    in_param.x = inx;
    in_param.y = iny;
    in_param.z = inz;
}

function capture(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    if (obj.family() == NGONFAMILY || obj.family() == SPLINEFAMILY || obj.family() == LIGHTFAMILY || obj.type() == CAMERA || obj.type() == FOLDER) {
        in_position = obj.getParameter("position");
        in_rotation = obj.getParameter("rotation");
        if (obj.type != CAMERA) in_scale = obj.getParameter("scale");
        
        setUIParams(tool, in_position, "pos");
        setUIParams(tool, in_rotation, "rot");
        setUIParams(tool, in_scale, "scale");        
    }
}

function apply(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();

    print('---- Multi Object ----');
    
    /// not good...
    updateInternalParams(in_position, tool.getParameter("pos x"), tool.getParameter("pos y"), tool.getParameter("pos z"));
    updateInternalParams(in_rotation, tool.getParameter("rot x"), tool.getParameter("rot y"), tool.getParameter("rot z"));
    updateInternalParams(in_scale, tool.getParameter("scale x"), tool.getParameter("scale y"), tool.getParameter("scale z"));
    
    // setting param.
    setParamsWithTool(obj,tool,tool.getParameter("recursive"),tool.getParameter("only children"));
}


function setParamsWithTool(obj,tool,recursive,childrenOnly) {

    if (recursive) {
        if (obj.childCount() > 0) {
            var childCount = obj.childCount();
            for (var i = 0;i < childCount;i++) {
                var child = obj.childAtIndex(i);
                setParamsWithTool(child,tool,recursive,false);
            }
        }
    }
    
    if (childrenOnly == false && (obj.family() == NGONFAMILY || obj.family() == SPLINEFAMILY || obj.family() == LIGHTFAMILY || obj.type() == CAMERA || obj.type() == FOLDER)) {
        if (tool.getParameter("set position")) obj.setParameter("position", in_position);
        if (tool.getParameter("set rotation")) obj.setParameter("rotation", in_rotation);
        if (obj.type() != CAMERA && tool.getParameter("set scale")) obj.setParameter("scale", in_scale);
        
    }
}

// debug function.
function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}
function printVec4D(vec) {
    print('r:g:b:a-'+vec.r+':'+vec.g+':'+vec.b+':'+vec.a);
}
function printMatrix(matrix) {
    print(matrix.m00+':'+matrix.m01+':'+matrix.m02+':'+matrix.m03);
    print(matrix.m10+':'+matrix.m11+':'+matrix.m12+':'+matrix.m13);
    print(matrix.m20+':'+matrix.m21+':'+matrix.m22+':'+matrix.m23);
    print(matrix.m30+':'+matrix.m31+':'+matrix.m32+':'+matrix.m33);    
}

function showUsage(tool) {
    OS.messageBox("Multi Object Usage", "1. set value or capture value from selected object.\n2. select object or folder (recursive ) you want to change.\n3. apply.\n\n* set scale NOT WORK for Camera object.\n** apply factor WORK for position and scale values.");
}
