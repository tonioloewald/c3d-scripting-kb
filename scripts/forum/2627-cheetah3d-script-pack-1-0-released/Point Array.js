// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Point Array.js
//
//  v.070518
//  required version : Cheetah3D v3.4
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 2006-10-05 created.
// 2006-10-14 added pos, scale, copy parameters.
// 2006-11-13 fixed some problem.
// 2007-05-13 added rot parameters. change smooth
// 2007-05-18 change value name and behavier
//
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//

// if you want more morph target, change this value.

var randoms = [];
var randoms_s = [];
 
function buildUI(obj){
    var normalType, normalAngle;
    
    obj.setParameter("name","Point Array");
    
    obj.addParameterFloat("copy",1,0,1,true,true);
    
    obj.addParameterButton("update","Update","objectUpdate");

    obj.addParameterSeparator("Copy variation");
    obj.addParameterBool("variation",0,0,1,true,true);
    obj.addParameterFloat("pos x",0,-1000,1000,true,true);
    obj.addParameterFloat("pos y",0,-1000,1000,true,true);
    obj.addParameterFloat("pos z",0,-1000,1000,true,true);
    
    obj.addParameterFloat("rot H",0,-180,180,true,true);
    obj.addParameterFloat("rot P",0,-180,180,true,true);
    obj.addParameterFloat("rot B",0,-180,180,true,true);
    
    obj.addParameterBool("proportion",1,0,1,true,true);
    obj.addParameterFloat("scale amount x",0,0,1000,true,true);
    obj.addParameterFloat("scale amount y",0,0,1000,true,true);
    obj.addParameterFloat("scale amount z",0,0,1000,true,true);
    
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

function copyCoreToVertex(core, cCore, cMat, posV, scaleV, rotV, normalV, iter) {
    var i, j;
    var polyCount = cCore.polygonCount();
    var vertexCount = cCore.vertexCount();
    
    var trans = new Mat4D(TRANSLATE,posV.x,posV.y,posV.z);
    var scale = new Mat4D(SCALE,scaleV.x,scaleV.y,scaleV.z);
    var rot = new Mat4D(ROTATE_HPB,rotV.x,rotV.y,rotV.z);
    var norm = new Mat4D(TRANSLATE,normalV.x,normalV.y,normalV.z);
    
    //printVec3D(mVert);
    
    for (i = 0;i < vertexCount;i++) {
        var vert = cMat.multiply(cCore.vertex(i));
        //printVec3D(vert);
        vert = trans.multiply(rot.multiply(scale.multiply(vert)));
        //printVec3D(vert);
        core.addVertex(false, vert);
    }
    for (i = 0;i < polyCount;i++) {
        var size = cCore.polygonSize(i);
        var verts = new Array;
        var uvs = new Array;
        for (j = 0;j < size;j++) {
            verts[j] = cCore.vertexIndex(i, j)+(iter*vertexCount);
            uvs[j] = cCore.uvCoord(i,j);
            //print(verts[j]);
        }
        core.addIndexPolygon(size, verts, uvs);
    }
}

function buildObject(obj){
    var core = obj.core();
    var h,i,j,k;
    
    var copy = obj.getParameter("copy");
    
    var posx = obj.getParameter("pos x");
    var posy = obj.getParameter("pos y");
    var posz = obj.getParameter("pos z");
    var rotx = obj.getParameter("rot H");
    var roty = obj.getParameter("rot P");
    var rotz = obj.getParameter("rot B");
    
    var scap = obj.getParameter("proportion");
    var scax = obj.getParameter("scale amount x");
    var scay = obj.getParameter("scale amount y");
    var scaz = obj.getParameter("scale amount z");
    var variation = obj.getParameter("variation");
    
    if (obj.childCount() > 1) {
        var base = obj.childAtIndex(0);
        var guide = obj.childAtIndex(1);
        var baseMat = base.objMatrix();
        var guideMat = guide.objMatrix();
        
        if (base.family() == NGONFAMILY) {
            // getting base polyCore
            var guideCore = guide.modCore();
            var guideVertexCount = guideCore.vertexCount();
            var gVert = new Vec3D(0,0,0);
            var gRot = new Vec3D(rotx,roty,rotz);
            var gScale = new Vec3D(1,1,1);
            var gNormal = new Vec3D(0,0,0);
            var baseCore = base.modCore();
            
            // smooth
            obj.setParameter("normalType",obj.getParameter("smooth"),false);
            obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
            
            if (randoms.length < guideVertexCount) {
                for (i = 0;i < guideVertexCount;i++) {
                    randoms[i] = Math.random();
                    randoms_s[i] = [];
                    randoms_s[i][0] = Math.random();
                    randoms_s[i][1] = Math.random();
                    randoms_s[i][2] = Math.random();
                }
            }
            j = 0;
            //print("copy count:"+guideVertexCount);
            for (i = 0;i < guideVertexCount;i++) {
                if (copy == 1 || 1 - copy < randoms[i]) {
                    if (variation) {
                        gVert = new Vec3D(randoms_s[i][0]*posx - posx/2,
                                          randoms_s[i][1]*posy - posy/2,
                                          randoms_s[i][2]*posz - posz/2);
                        if (scap) {
                          var sx = 1 + randoms_s[i][0]*scax;
                          var sy = sx;
                          var sz = sx;
                        } else {
                          var sx = 1 + randoms_s[i][0]*scax;
                          var sy = 1 + randoms_s[i][1]*scay;
                          var sz = 1 + randoms_s[i][2]*scaz;
                        }
                        var rx = randoms_s[i][0]*rotx/2 - rotx/2;
                        var ry = randoms_s[i][1]*roty/2 - roty/2;
                        var rz = randoms_s[i][2]*rotz/2 - rotz/2;
                        
                        gRot = new Vec3D(rx, ry, rz);
                        gScale = new Vec3D(sx,sy,sz);
                        gVert = gVert.add(guideCore.vertex(i));
                    } else {
                        gVert = guideCore.vertex(i);
                    }
                    //printVec3D(gVert);
                    gVert = guideMat.multiply(gVert);
    
                    copyCoreToVertex(core,baseCore,baseMat,gVert,gScale,gRot,gNormal,j);
                    j++;
                //print('::');
                }
            }
            
        }
    }
}

function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}



