// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Morph.js
//
//  v.060615
//  required version : Cheetah3D v2.6.1 or 3.x
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 2006-01-12 created.
// 2006-01-13 change approach, uvcoord and selection problem solved.
// 2006-01-14 add morphTargetCount, reset and update Button.
// 2006-01-16 fixed soomthType/soomthAngle unsaved problem.
// 2006-01-25 bug fix edge problem.
// 2006-03-31 add setCreatorObject() function. for auto update. so, remove update button.
// 2006-06-15 optimize code.

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//

// if you want more morph target, change this value.
var morphTargetCount = 5;

var differMargin = 0.001;

function buildUI(obj){
    var i;
    var normalType, normalAngle;
    
    obj.setParameter("name","Morph");
    
    obj.addParameterButton("update","Update","objectUpdate");
   
    obj.addParameterSeparator("Morph");
    
    for (i = 0;i < morphTargetCount;i++) {
        var morphCount = i + 1;
        obj.addParameterFloat("morph "+morphCount+" value",0,-5,5,true,true);
    }
   
    obj.addParameterSeparator("Reset");
    obj.addParameterButton("All reset","Reset","objectUpdateAndReset");

    obj.setParameter("normalType",2);
    obj.setParameter("normalAngle",45.0);
    
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterInt("smooth type", 2,0,2,true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    obj.addParameterButton("set smooth","Set","setSmooth");
    
    setSmooth(obj);       
    
    //obj.setCreatorObj(true);
}

function setSmooth(obj) {
    var normalType = obj.getParameter("smooth type");
    var normalAngle = obj.getParameter("smooth angle");
    
    print('set normal:'+normalType+','+normalAngle);
    
    obj.setParameter("normalType",normalType);
    obj.setParameter("normalAngle",normalAngle);
    
    normalType = obj.getParameter("normalType");
    normalAngle = obj.getParameter("normalAngle");

    print('normalType:'+normalType);
    print('normalAngle:'+normalAngle);
}

function printWrongPolyCountMessage(value) {
    //print('morph '+value+'has different polygon count from base object!');
}

function objectUpdate(obj) {
    obj.update();
}

function objectUpdateAndReset(obj) {
    var i;
    var doc = obj.document();
    
    doc.retainRedrawLock();
    
    for (i = 0;i < morphTargetCount;i++) {
        var morphCount = i + 1;
        obj.setParameter("morph "+morphCount+" value", 0);
    }
    
    doc.releaseRedrawLock();
    
    obj.update();
}

function buildObject(obj){
    var core = obj.core();
    var i,j,k;
    var morphValue = new Array;
    
    for (i = 0;i < morphTargetCount;i++) {
        var morphCount = i + 1;
        morphValue[i] = obj.getParameter("morph "+morphCount+" value");
    }
    var childCount = obj.childCount();
    
    //print("----- Morph -----");

    if (obj.childCount() > 0) {
        var base;
        var morph = new Array(morphTargetCount);
        
        // I don't know if object have vertex value over 5!!
        core.buildVertexBSP(new Vec3D(-5,-5,-5),new Vec3D(5,5,5));
        
        base = obj.childAtIndex(0);

        for (i = 0;i < morphTargetCount;i++) {
            j = i + 1;
            if (obj.childCount() > j) {
                morph[i] = obj.childAtIndex(j);
                //print('childAtIndex '+j+', morph '+i+':'+morph[i]);
            } else {
                morph[i] = undefined;
            }
        }
        
        if (base.family() == NGONFAMILY) {
            // getting base polyCore
            var baseCore = base.modCore();
            var basePolyCount = baseCore.polygonCount();
            var baseVertexCount = baseCore.vertexCount();
            
            var morphCore = new Array;
            var morphFlg = new Array;
            
            for (i = 0;i < morphTargetCount;i++) {
                if (morph[i] != undefined && morph[i].family() == NGONFAMILY) {
                    morphCore[i] = morph[i].modCore(); // if you want ignore any modifier of morph target object, using core() will be ok.
                    
                    //print('morphPolyCount '+i+':'+morphPolyCount);
                    if (basePolyCount == morphCore[i].polygonCount()) {
                        morphFlg[i] = true;
                    } else {
                        morphFlg[i] = false;
                        printWrongPolyCountMessage(i+1);
                    }
                }
            }
            
            for (i = 0;i < baseVertexCount;i++) {
                var baseCompVert = baseCore.vertex(i);
                var Vert = baseCompVert;
                for (j = 0;j < morphTargetCount;j++) {
                    if (morphFlg[j]) {
                        var morphTVert = baseCompVert.sub(morphCore[j].vertex(i));
                        var addVerts = morphTVert.multiply(morphValue[j]);
                        var norm = addVerts.norm();
                        
                        if (Math.abs(norm) > differMargin) {
                            Vert = Vert.sub(addVerts);
                        }
                    }
                }
                // addVertex
                core.addVertex(false, Vert);
            }
            
            for (i = 0;i < basePolyCount;i++) {
                var basePolySize = baseCore.polygonSize(i);
                var Verts = new Array; // for store vertex indeces
                var UVs = new Array; // 
                
                for (j = 0;j < basePolySize;j++) {
                    Verts[j] = baseCore.vertexIndex(i,j);
                    UVs[j] = baseCore.uvCoord(i,j);                            
				}
                // add polygon for morphed object.
                core.addIndexPolygon(basePolySize, Verts, UVs);
            }
            
            // start poly selection copy
            
            var polygonCount = baseCore.polygonCount();
            
            for (i = 0;i < 16;i++) {
                            
                baseCore.setActivePolygonSelection(i);
                core.setActivePolygonSelection(i);
                
                for (j = 0;j < polygonCount;j++) {
                    core.setPolygonSelection(j, baseCore.polygonSelection(j));
                }
            }
            
            // set edge crease
            
            for (i = 0;i < polygonCount;i++) {
                var polygonSize = baseCore.polygonSize(i);
                for (j = 0;j < polygonSize;j++) {
                    //print(baseCore.edgeSelection(i,j,CREASE));
                    if (baseCore.edgeSelection(i,j,CREASE)) {
                        core.setEdgeSelection(i,j,CREASE,true);
                    }
                    if (baseCore.edgeSelection(i,j,SEAM)) {
                        core.setEdgeSelection(i,j,SEAM,true);
                    }
                }
            }
            
            // destroy BSP
            core.destroyVertexBSP();
        }
    }
}



