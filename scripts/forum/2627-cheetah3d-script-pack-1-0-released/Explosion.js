// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Explosion.js (beta)
//
//  v.060204
//  required version : Cheetah3D v2.6.1
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 2006-01-31 created.
// 2006-02-02 modified something.
// 2006-02-04 bug fix.

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//

var randomV = new Array();

function buildUI(obj){
    var i;
    var normalType, normalAngle;
    
    obj.setParameter("name","Explosion");
    
    obj.addParameterButton("update","Update","objectUpdate");
   
    obj.addParameterSeparator("Explosion");
    obj.addParameterFloat("core x", 0, -1000, 1000, true, true);
    obj.addParameterFloat("core y", 0, -1000, 1000, true, true);
    obj.addParameterFloat("core z", 0, -1000, 1000, true, true);
    
    obj.addParameterFloat("core value", 0, -1.0, 1.0, true, true);
    obj.addParameterFloat("core size", 1, 0, 100, true, true);
    obj.addParameterFloat("rotation min", 0, 0, 3600, true, true);
    obj.addParameterFloat("rotation max", 0, 0, 3600, true, true);
    
    obj.setParameter("normalType",2);
    obj.setParameter("normalAngle",45.0);
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterInt("smooth type", 2,0,2,true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    obj.addParameterButton("set smooth","Set","setSmooth");
    
    setSmooth(obj);       
    
}

function setRandoms(count) {

    //print("--- setRandoms ---");
    //print("count: "+count);
    for (i = 0;i < count;i++) {
        randomV[i] = Math.random() * -0.5;
    }
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
    
    var expVt = obj.getParameter("core value");
    var expCenter = new Vec3D(obj.getParameter("core x"),obj.getParameter("core y"),obj.getParameter("core z"));
    var areaRound = obj.getParameter("core size");
    var rotMin = obj.getParameter("rotation min");
    var rotVt = obj.getParameter("rotation max");
    
    //print("------ Explosion ------");
    
    //print(expCenter.x + ':' + expCenter.y + ':' + expCenter.z);
    //print('norm:'+expCenter.norm());
    //print('a*vt:'+areaRound * expVt);
    if (obj.childCount() > 0) {
        var base;
        var i, j;
        core.buildVertexBSP(new Vec3D(-areaRound, -areaRound, -areaRound),new Vec3D(areaRound,areaRound,areaRound));
        base = obj.childAtIndex(0);
        
        if (base.family() == NGONFAMILY) {
            var baseCore = base.modCore();
            var basePolyCount = baseCore.polygonCount();
            
            if (randomV.length < basePolyCount) {
                setRandoms(basePolyCount);
            }
            
            for (i = 0;i < basePolyCount;i++) {
                var basePolySize = baseCore.polygonSize(i);

                var Verts = new Array;
                var UVs = new Array;
                                
                for (j = 0;j < basePolySize;j++) { // store vertex and uv info to Verts, UVs 
                    var baseVtxIndex = baseCore.vertexIndex(i,j);
                    
                    Verts[j] = baseCore.vertex(baseVtxIndex);
                    UVs[j] = baseCore.uvCoord(i,j);
                    
                    //print(Verts[j].x+':'+Verts[j].y+':'+Verts[j].z);                    
                }
                //calculate each polygon center
                var polyVec = new Vec3D(0,0,0);
                for (j = 0;j < basePolySize;j++) {
                    polyVec = polyVec.add(Verts[j]);
                }
                polyVec = polyVec.multiply(1/basePolySize);
                //print(polyVec.x+':'+polyVec.y+':'+polyVec.z);
                //calculate value
                //maybe mistake..... I am not sure this culclation....
                var sp = Math.sqrt(Math.pow(expCenter.x - polyVec.x, 2) + Math.pow(expCenter.y - polyVec.y, 2) +Math.pow(expCenter.z - polyVec.z, 2));
                //print('sp1:'+sp);
                if (sp > 0) {
                    sp = expVt * areaRound / sp;
                }
                //print(sp);
                var moveVec = polyVec.copy();
                moveVec = moveVec.sub(expCenter.sub(polyVec));
                moveVec = moveVec.multiply(sp*sp);
                var movedVec = polyVec.add(moveVec);
                //
                var rotRandom = randomV[i];
                var rotation = ((rotMin + rotRandom*rotVt) * sp)*expVt;                
                //
                var transMatrix = new Mat4D(TRANSLATE, -polyVec.x,-polyVec.y,-polyVec.z);
                var rotMatrix = new Mat4D(ROTATE, rotation, rotation, 0);
                var transBackMatrix = new Mat4D(TRANSLATE, movedVec.x,movedVec.y, movedVec.z);
                for (j = 0;j < basePolySize;j++) {
                    Verts[j] = transBackMatrix.multiply(rotMatrix.multiply(transMatrix.multiply(Verts[j])));
                }
                //
                core.addPolygon(basePolySize, true, Verts, UVs);
            }
            
            core.destroyVertexBSP();
        }
    }
}



