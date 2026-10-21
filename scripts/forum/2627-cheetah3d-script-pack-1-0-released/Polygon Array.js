// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Polygon Array.js
//
//  v.070517
//  required version : Cheetah3D v3.4
//
//  (c) 2006, 2007 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 2006-10-05 created.
// 2006-10-07 still beta.. :(
// 2006-10-10 change code by Martin's hint. :)
// 2006-10-11 .... have problem yet.
// 2007-05-17 at last. :p
// 2007-05-18 add parameters for position.
//
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select this script from Tools -> Scritp -> Polygon Script
//

var randoms = new Array;

function buildUI(obj){
    var normalType, normalAngle;
    
    obj.setParameter("name","Polygon Array");
    
    obj.addParameterBool("rotate along normal",1,0,1,true,true);
    
    obj.addParameterBool("random variation",0,0,1,true,true);
    
    obj.addParameterFloat("pos amount X",0,-1000,1000,true,true);
    obj.addParameterFloat("pos amount Y",0,-1000,1000,true,true);
    obj.addParameterFloat("pos amount Z",0,-1000,1000,true,true);
    
    obj.addParameterFloat("angle H",0,-180,180,true,true);
    obj.addParameterFloat("angle P",0,-180,180,true,true);
    obj.addParameterFloat("angle B",0,-180,180,true,true);
    
    obj.addParameterBool("keep proportion",1,0,1,true,true);
    obj.addParameterFloat("scale amount X",0,-1000,1000,true,true);
    obj.addParameterFloat("scale amount Y",0,-1000,1000,true,true);
    obj.addParameterFloat("scale amount Z",0,-1000,1000,true,true);

    obj.addParameterButton("update","Update","objectUpdate");
    
    obj.setParameter("normalType",2);
    obj.setParameter("normalAngle",45.0);
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    
    obj.setParameter("smooth",2);
    
    //obj.setCreatorObj(true);
}

function objectUpdate(obj) {
    obj.update();
}

function copyCoreToVertex(core, cCore, cMat, posV, scaleV, rotV, cPos, cRot, iter) {
    var i, j;
    var polyCount = cCore.polygonCount();
    var vertexCount = cCore.vertexCount();
    
    var trans = new Mat4D(TRANSLATE,posV.x,posV.y,posV.z);
    var scale = new Mat4D(SCALE,scaleV.x,scaleV.y,scaleV.z);
    var rot = new Mat4D(ROTATE_HPB,rotV.x,rotV.y,rotV.z);
    
    var cmPos = new Mat4D(TRANSLATE,cPos.x,cPos.y,cPos.z);
    var cmRot = new Mat4D(ROTATE_HPB,cRot.x,cRot.y,cRot.z);

    for (i = 0;i < vertexCount;i++) {
        var vert = cmPos.multiply(cmRot.multiply(cMat.multiply(cCore.vertex(i))));
        vert = trans.multiply(rot.multiply(scale.multiply(vert)));
        core.addVertex(false, vert);
    }
    for (i = 0;i < polyCount;i++) {
        var size = cCore.polygonSize(i);
        var verts = new Array;
        var uvs = new Array;
        for (j = 0;j < size;j++) {
            verts[j] = cCore.vertexIndex(i, j)+(iter*vertexCount);
            uvs[j] = cCore.uvCoord(i,j);
        }
        core.addIndexPolygon(size, verts, uvs);
    }
}

function buildObject(obj){
    var core = obj.core();
    var i,j,k;
    
    var alignNormal = obj.getParameter("rotate along normal");
    
    var variation = obj.getParameter("random variation");
    var posx = obj.getParameter("pos amount X");
    var posy = obj.getParameter("pos amount Y");
    var posz = obj.getParameter("pos amount Z");
    var rotx = obj.getParameter("angle H");
    var roty = obj.getParameter("angle P");
    var rotz = obj.getParameter("angle B");
    var proportion = obj.getParameter("keep proportion");
    var scalex = obj.getParameter("scale amount X");
    var scaley = obj.getParameter("scale amount Y");
    var scalez = obj.getParameter("scale amount Z");
    
    print("----- Polygon Array -----");
    
    if (obj.childCount() > 1) {
        var base = obj.childAtIndex(0);
        var guide = obj.childAtIndex(1);
        
        if (base.family() == NGONFAMILY) {
            // smooth
            obj.setParameter("normalType",obj.getParameter("smooth"),false);
            obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
            
            // getting base polyCore
            var guideCore = guide.modCore();
            var guideMat = guide.objMatrix();
            var guidePolyCount = guideCore.polygonCount();
            
            var baseCore = base.modCore();
            var baseMat = base.objMatrix();
            
            if (randoms.length < guidePolyCount) {
                for (i = 0;i < guidePolyCount;i++) {
                    randoms[i] = [Math.random(), Math.random(), Math.random()];
                }
            }
            print("copy count:"+guidePolyCount);
            for (i = 0;i < guidePolyCount;i++) {
                
                var gSize = guideCore.polygonSize(i);
                var gVert = new Vec3D(0,0,0);
                var gScale = new Vec3D(1,1,1);
                var gNormal = guideCore.normal(i);
                
                for (j = 0;j < gSize;j++) {
                    var vertIndex = guideCore.vertexIndex(i,j);
                    var vert = guideCore.vertex(vertIndex);
                    gVert = gVert.add(vert);
                }
                gVert = guideMat.multiply(gVert.multiply(1/gSize));
                
                if (alignNormal == 1) {
                    var nTrans = new Mat4D(TRANSLATE,gVert.x,gVert.y,gVert.z);
                    
                    var theta = Math.acos(gNormal.y)*180/Math.PI;
                    var phi = Math.atan2(gNormal.x,gNormal.z)*180/Math.PI;
                    
                    var gRot = new Vec3D(phi,theta,0);
                    
                    //printVec3D(gRot);
                } else {
                    var gRot = new Vec3D(0,0,0);
                }
                
                if (variation) {
                    var cPos = new Vec3D(randoms[i][0]*posx - posx/2, randoms[i][0]*posy - posy/2, randoms[i][0]*posz - posz)
                    var cRot = new Vec3D(randoms[i][0]*rotx/2-rotx/2, randoms[i][1]*roty/2-roty/2, randoms[i][2]*rotz/2-rotz/2);
                    if (proportion) gScale = gScale.add(new Vec3D(randoms[i][0]*scalex, randoms[i][0]*scalex, randoms[i][0]*scalex));
                    else gScale = gScale.add(new Vec3D(randoms[i][0]*scalex, randoms[i][1]*scaley, randoms[i][2]*scalez));
                } else {
                    var cPos = new Vec3D(posx, posy, posz);
                    var cRot = new Vec3D(rotx, roty, rotz);
                    if (proportion) gScale = gScale.add(new Vec3D(scalex, scalex, scalex));
                    else gScale = gScale.add(new Vec3D(scalex, scaley, scalez));
                }
                //printVec3D(gVert);
                copyCoreToVertex(core,baseCore,baseMat,gVert,gScale,gRot,cPos,cRot,i);
            }
        }
    }
}

function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}



