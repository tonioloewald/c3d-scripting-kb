// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Multi Light.js
//
// v.061110
// required version : Cheetah3D v.3.5
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
//  2006-07-25 created.
//  2006-07-26 fix 'cutOffAngle' bug.
//  2006-11-10 fix 'cutOffAngle' bug / use selector
// 
// Usage: Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//

var in_color = new Vec4D(1.0,1.0,1.0,0);
var in_scolor = new Vec4D(0.0,0.0,0.0,0.0);

function buildUI(tool) {
    tool.addParameterSeparator("Multi Light");
    
    tool.addParameterBool("color",0,0,1,false,false);
    tool.addParameterFloat("intensity",1.0,0.0,100.0,false,false);
    tool.addParameterSelector("light type",['ambient','area','distant','point','spot'],false,false);
    tool.addParameterSelector("attenuation",['none','1/r','1/(r^2)'],false,false);
    tool.addParameterBool("clamp attenuation",1,0,1,false,false);
    
    tool.addParameterFloat("width",0.5,0.0,100.0,false,false);
    tool.addParameterFloat("height",0.5,0.0,100.0,false,false);
    // tool.addParameterFloat("radius",0.5,0.0,100.0,false,false); // undocumented param yet.
    
    tool.addParameterSelector("shadow type",['none','raytrace','raytrace+trans'],false,false);
    tool.addParameterBool("shadow color",0,0,1,false,false);
    
    tool.addParameterSelector("spot type",['round','rect'],false,false);
    tool.addParameterFloat("cut off angle",30.0,0.0,80.0,false,false);
    tool.addParameterFloat("smooth cut off",1.0,0.0,80.0,false,false);
    
    tool.addParameterInt("caustic photons",10000,0,10000000,false,false);
    // tool.addParameterInt("global photons",10000,0,10000000,false,false); // undocumented param yet.
    tool.addParameterBool("pure photon light",0,0,1,false,false);
    
    tool.addParameterBool("recursive",0,0,1,false,false);
    
    tool.addParameterButton("apply","OK","apply");
    
    tool.addParameterSeparator("Capture");
    tool.addParameterButton("capture params","capture","captureParams");
    tool.addParameterButton("capture color","capture","captureColor");
    
    tool.addParameterSeparator("Help");
    tool.addParameterButton("Usage","show","showUsage");
}

function captureParams(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    if (obj.family() == LIGHTFAMILY) {
        tool.setParameter("intensity", obj.getParameter("intensity"));
        tool.setParameter("light type", obj.getParameter("lightType"));
        tool.setParameter("attenuation", obj.getParameter("attenuation"));
        tool.setParameter("clamp attenuation", obj.getParameter("cap"));
        tool.setParameter("width", obj.getParameter("width"));
        tool.setParameter("height", obj.getParameter("height"));
        //tool.setParameter("radius", obj.getParameter("radius"));
        
        tool.setParameter("shadow type", obj.getParameter("shadowType"));
        tool.setParameter("spot type", obj.getParameter("cutOffType"));
        tool.setParameter("cut off angle", obj.getParameter("cutOffAngle"));
        tool.setParameter("smooth cut off", obj.getParameter("cutOffAttenuation"));
        tool.setParameter("caustic photons", obj.getParameter("causticPhotons"));
        //tool.setParameter("global photons", obj.getParameter("globalPhotons"));
        tool.setParameter("pure photon light", obj.getParameter("photonLight"));
    }
}

function captureColor(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    if (obj.family() == LIGHTFAMILY) {
        in_color = obj.getParameter("color");
        in_scolor = obj.getParameter("shadowColor");
    }
}

function apply(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();

    print('---- Multi Light ----');
    
    // setting param.
    setParamsWithTool(obj,tool,tool.getParameter("recursive"));
}


function setParamsWithTool(obj,tool,recursive) {

    if (recursive) {
        if (obj.childCount() > 0) {
            var childCount = obj.childCount();
            for (var i = 0;i < childCount;i++) {
                var child = obj.childAtIndex(i);
                setParamsWithTool(child,tool,recursive);
            }
        }
    }
    
    if (obj.family() == LIGHTFAMILY) {
        obj.setParameter("intensity",tool.getParameter("intensity"));
        if (tool.getParameter("color")) obj.setParameter("color",in_color);
        obj.setParameter("lightType", tool.getParameter("light type"));
        obj.setParameter("attenuation", tool.getParameter("attenuation"));
        obj.setParameter("cap", tool.getParameter("clamp attenuation"));
        obj.setParameter("width", tool.getParameter("width"));
        obj.setParameter("height", tool.getParameter("height"));
        // obj.setParameter("radius", obj.getParameter("radius"));
        
        if (tool.getParameter("shadow color")) obj.setParameter("shadowColor",in_scolor);
        obj.setParameter("shadowType", tool.getParameter("shadow type"));

        obj.setParameter("cutOffType", tool.getParameter("spot type"));
        obj.setParameter("cutOffAngle", tool.getParameter("cut off angle"));
        obj.setParameter("cutOffAttenuation", tool.getParameter("smooth cut off"));
        
        obj.setParameter("causticPhotons", tool.getParameter("caustic photons"));
        // obj.setParameter("globalPhotons", obj.getParameter("global photons"));
        obj.setParameter("photonLight", tool.getParameter("pure photon light"));
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
//
function showUsage(tool) {
    OS.messageBox("Multi Light Usage", "capture params -> capture parameters of current selected light. \ncapture color -> capture color / shadow color of current selected. these value are used when color / shadow color are checked.\n");
}
