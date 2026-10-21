// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Random Array.js
//
//  v.060615
//  for Cheetah3D v.2.6.1 or v3.x above
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 2006-01-24:
// 2006-01-25: randomize button added
// 2006-06-15: optimized code unit values added.

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//

// random value holder.

var maxRandomCounts = 1000;

var randomValueX = new Array(maxRandomCounts);
var randomValueY = new Array(maxRandomCounts);
var randomValueZ = new Array(maxRandomCounts);

var randomValueS = new Array(maxRandomCounts);
var randomValueM = new Array(maxRandomCounts);

var randomValueRX = new Array(maxRandomCounts);
var randomValueRY = new Array(maxRandomCounts);
var randomValueRZ = new Array(maxRandomCounts);

function buildUI(obj){
    
    obj.setParameter("name","Random Array");
    
    obj.addParameterButton("update","Update","objectUpdate");
    
    obj.addParameterInt("counts",1,1,maxRandomCounts,true,true); // duplicated objects count.
    obj.addParameterFloat("unit width",1,0.1,1000,true,true); // 
    obj.addParameterFloat("unit height",1,0.1,1000,true,true); // 
    obj.addParameterFloat("unit depth",1,0.1,1000,true,true); // 
    obj.addParameterFloat("min scale value",1,0.1,1000,true,true);
    obj.addParameterFloat("max scale value",1,0.1,1000,true,true);
    obj.addParameterFloat("max x rotation",0,0,360,true,true);
    obj.addParameterFloat("max y rotation",0,0,360,true,true);
    obj.addParameterFloat("max z rotation",0,0,360,true,true);
    obj.addParameterInt("materials",1,1,16,true,true);
    
    obj.addParameterButton("randomize","Set","setRandom");
       
    obj.addParameterSeparator("Smooth");
    obj.addParameterInt("smooth type", 2,0,2,true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    obj.addParameterButton("set smooth","Set","setSmooth");
    
    setSmooth(obj);       
    setRandom(obj);
}

function setRandom(obj) {
    var i;
    
    for (i = 0;i < maxRandomCounts;i++) {
        randomValueX[i] = Math.random();
        randomValueY[i] = Math.random();
        randomValueZ[i] = Math.random();
        randomValueS[i] = Math.random();
        randomValueM[i] = Math.random();
        randomValueRX[i] =Math.random();
        randomValueRY[i] =Math.random();
        randomValueRZ[i] =Math.random();
    }
    
    obj.update();
}

function setSmooth(obj) {
    var normalType = obj.getParameter("smooth type");
    var normalAngle = obj.getParameter("smooth angle");
    
    //print('set normal:'+normalType+','+normalAngle);
    
    obj.setParameter("normalType",normalType);
    obj.setParameter("normalAngle",normalAngle);
    
    normalType = obj.getParameter("normalType");
    normalAngle = obj.getParameter("normalAngle");

    //print('normalType:'+normalType);
    //print('normalAngle:'+normalAngle);
}

function objectUpdate(obj) {
    obj.update();
}

function buildObject(obj){
    var core = obj.core();
    var h,i,j;
    var selectionList = new Array;
    
    var counts = obj.getParameter("counts");

    var unitX = obj.getParameter("unit width");
    var unitY = obj.getParameter("unit height");
    var unitZ = obj.getParameter("unit depth");
    
    var scaleMin = obj.getParameter("min scale value");
    var scaleT = obj.getParameter("max scale value") - scaleMin;
    
    var rotMaxX = obj.getParameter("max x rotation");
    var rotMaxY = obj.getParameter("max y rotation");
    var rotMaxZ = obj.getParameter("max z rotation");
    
    var materials = obj.getParameter("materials");
    
    var materialIndex = 0;
    
    var childCount = obj.childCount();
    
    //print("----- Random Array -----");

    if (obj.childCount() > 0) {
        var base;
        
        // I don't know if object have vertex value over unitT!!
        core.buildVertexBSP(new Vec3D(0,0,0),new Vec3D(unitX,unitY,unitZ));
        
        base = obj.childAtIndex(0);

        if (base.family() == NGONFAMILY) {
            // getting base polyCore
            var baseCore = base.modCore();
            var basePolyCount = baseCore.polygonCount();
            //
            var baseVertexCount = baseCore.vertexCount();
            
            for (h = 0;h < counts;h++) {
                var trans = new Mat4D(TRANSLATE,randomValueX[h]*unitX,randomValueY[h]*unitY,randomValueZ[h]*unitZ);
                var scaleD = randomValueS[h]*scaleT + scaleMin;
                var scale = new Mat4D(SCALE,scaleD,scaleD,scaleD);
                var rotation = new Mat4D(ROTATE,randomValueRX[h] * rotMaxX,randomValueRZ[h] * rotMaxY,randomValueRZ[h] * rotMaxZ);
                var materialNum = parseInt(randomValueM[h]*materials);
                
                // Change -start
                /*
                for (i = 0;i < basePolyCount;i++) {
                    var basePolySize = baseCore.polygonSize(i);
                    var baseVerts = new Array; //
                    
                    var Verts = new Array; //
                    var UVs = new Array; // 
                    
                    for (j = 0;j < basePolySize;j++) {
                        var baseVtxIndex = baseCore.vertexIndex(i, j);
                                                
                        Verts[j] = baseCore.vertex(baseVtxIndex);
                        UVs[j] = baseCore.uvCoord(i,j);
                                  
                        Verts[j] = trans.multiply(scale.multiply(rotation.multiply(Verts[j])));
    				}

                     core.addPolygon(basePolySize, true, Verts, UVs);
                }
                */
                
                for (i = 0;i < baseVertexCount;i++) {
                    var Vert = baseCore.vertex(i);
                    Vert = trans.multiply(scale.multiply(rotation.multiply(Vert)));
                    core.addVertex(false, Vert);
                }
                
                var Verts = new Array;
                var UVs = new Array;
                
                for (i = 0;i < basePolyCount;i++) {
                    var basePolySize = baseCore.polygonSize(i);
                    for (j = 0;j < basePolySize;j++) {
                        Verts[j] = baseCore.vertexIndex(i,j) + (baseVertexCount * h);
                        UVs[j] = baseCore.uvCoord(i,j);
                    }
                    core.addIndexPolygon(basePolySize, Verts, UVs);
                }
                // Change -end
                
                var polygonCount = core.polygonCount();
                core.setActivePolygonSelection(materialNum);
                for (i = materialIndex;i < polygonCount;i++) {
                    core.setPolygonSelection(i, true);
                }
                materialIndex = polygonCount;
            }
                        
            // destroy BSP
            core.destroyVertexBSP();
        }
    }
}



