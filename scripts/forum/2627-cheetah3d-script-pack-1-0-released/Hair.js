// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Hair.js (Normal Checker.js)
//
//  v.070217 - alpha? - this is still yet test code!!.
//  required version : Cheetah3D v3.5+
//
//  (c) 2006-2007 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 2007-01-30 first test.
// 2007-01-31 added some options.
// 2007-02-01 fixed width calculation bug.
// 2007-02-02 change width and curly calculaitons.
// 2007-02-03 change calculation. add uv type option.
// 2007-02-13 added 'curly coordinate', fixed 'face to cam' option bug. :)
// 2007-02-17 added poly-selection option.
//
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select this script from Tools -> Scritp -> Polygon Script
//

var randoms = new Array;
var randoms_sub = new Array;

function buildUI(obj){
    obj.setParameter("name","Hair");
    
    obj.addParameterSelector("implant type",["faces","points","faces and points"],true,true);
    obj.addParameterSelector("uv type",["hair","base object"],true,true);
    obj.addParameterBool("modified child",0,0,1,true,true);
    obj.addParameterBool("face to cam",0,0,1,true,true);
    
    obj.addParameterSeparator("Hair Settings");
    
    obj.addParameterInt("segments",1,1,20,true,true);
    obj.addParameterFloat("hair width",0.05,0.01,10,true,true);
    obj.addParameterFloat("hair length",1.0,0,100,true,true);
    obj.addParameterFloat("thinness",0.8,0,10,true,true);
    
    obj.addParameterBool("only polygon selection",0,0,1,true,true);
    obj.addParameterInt("polygon selection",0,0,15,true,true);
    
    obj.addParameterSeparator("Direction Settings");
    
    obj.addParameterSelector("curly coordinate",['implant point','object center'],true,true);
    obj.addParameterBool("random curly",0,0,1,true,true);
    obj.addParameterFloat("curly x",0,-1440,1440,true,true);
    obj.addParameterFloat("curly y",0,-1440,1440,true,true);
    obj.addParameterFloat("curly z",0,-1440,1440,true,true);
    obj.addParameterFloat("direction x",0,-100,100,true,true);
    obj.addParameterFloat("direction y",0,-100,100,true,true);
    obj.addParameterFloat("direction z",0,-100,100,true,true);

    obj.addParameterFloat("random a",0,-100,100,true,true);
    obj.addParameterFloat("random b",0,-100,100,true,true);
    
    obj.addParameterButton("update","Update","objectUpdate");
    
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
    
    obj.setParameter("normalType",normalType);
    obj.setParameter("normalAngle",normalAngle);
    
    normalType = obj.getParameter("normalType");
    normalAngle = obj.getParameter("normalAngle");
}

function objectUpdate(obj) {
    obj.update();
}

function addHair(core, vert, normal, nextWidth, thinness, segments, randB, gravV, curlV, uv, curlType) {
    var i;
    var segV = normal.sub(vert);
    segV = segV.multiply(1/segments);
    var nextV = vert;
    var randB_h = randB / 2;
    
    core.addVertex(false, vert.sub(nextWidth));
    core.addVertex(false, vert.add(nextWidth));
    for (i = 0;i < segments;i++) {
        var segFac = (i*2+1)/(segments*segments); // ?
        var nextCurlV = curlV.multiply(segFac);
        var curlMat = new Mat4D(ROTATE, nextCurlV.x, nextCurlV.y, nextCurlV.z);
        nextWidth = nextWidth.multiply(thinness);
        nextV = nextV.add(segV.add(new Vec3D(randoms[i][0]*randB-randB_h,randoms[i][1]*randB-randB_h,randoms[i][2]*randB-randB_h)));
        nextV = nextV.add(gravV.multiply(segFac));
        if (curlType) {
            nextV = curlMat.multiply(nextV);
        } else {
            nextV = vert.add(curlMat.multiply(nextV.sub(vert)));
        }
        addSeg(core,nextV,nextWidth,1/segments,i, uv);
    }
}

function addSeg(core, nextPos, width, segments_f, iter, uv) {
    var p1 = core.addVertex(false, nextPos.sub(width));
    var p2 = core.addVertex(false, nextPos.add(width));
        
    if (!uv) {
        var uv1 = new Vec2D(0, segments_f*(iter+1));
        var uv2 = new Vec2D(0, segments_f*iter);
        var uv3 = new Vec2D(1, segments_f*iter);
        var uv4 = new Vec2D(1, segments_f*(iter+1));
        core.addIndexPolygon(4, [p1, p2, (p1-1), (p1-2)], [uv1, uv4, uv3, uv2]);
    } else {
        core.addIndexPolygon(4, [p1, p2, (p1-1), (p1-2)], [uv, uv, uv, uv]);
    }
}

function buildObject(obj){
    var core = obj.core();
    var i,j;
    var hType =obj.getParameter("implant type");
    var width_f = obj.getParameter("hair width") / 2;
    var length = obj.getParameter("hair length");
    var polysel = obj.getParameter("only polygon selection");
    var polyselNum = obj.getParameter("polygon selection");
    
    var curlType = parseInt(obj.getParameter("curly coordinate"));
    var curlX = obj.getParameter("curly x");
    var curlY = obj.getParameter("curly y");
    var curlZ = obj.getParameter("curly z");
    var randCurly = obj.getParameter("random curly");
    var segments = obj.getParameter("segments");
    var faceCam = obj.getParameter("face to cam");
    var uvType = parseInt(obj.getParameter("uv type"));
    var mod = obj.getParameter("modified child");    
    
    var gravX = obj.getParameter("direction x");
    var gravY = obj.getParameter("direction y");
    var gravZ = obj.getParameter("direction z");
    
    var thinness = obj.getParameter("thinness");
    
    var randA = obj.getParameter("random a");
    var randB = obj.getParameter("random b");
    
    var gravGV = new Vec3D(gravX, gravY, gravZ);
    var curlV = new Vec3D(curlX, curlY, curlZ);
    
    if (obj.childCount() > 0) {
        var guide = obj.childAtIndex(0);
        
        if (guide.family() == NGONFAMILY) {
            //var st1 = new Date().getTime();
            // getting base polyCore
            var doc = obj.document();
            var cam = doc.activeCamera();
            
            var camMat = cam.obj2WorldMatrix();
            var camTrans = new Mat4D(TRANSLATE, -camMat.m03, -camMat.m13, -camMat.m23);
            var camNormal = camTrans.multiply(camMat.multiply(new Vec3D(width_f, 0, width_f)));

            if (mod) var guideCore = guide.modCore();
            else var guideCore = guide.core();
            
            var guidePolyCount = guideCore.polygonCount();
            var guideMat = guide.objMatrix();
            var randomCount = (guidePolyCount > segments)? guidePolyCount : segments;
            var polysel_store = guide.getParameter("activePolySelection");
            
            if (randoms.length < randomCount) {
                //print("calc randoms");
                for (i = 0;i < randomCount;i++) {
                    randoms[i] = [Math.random(), Math.random(), Math.random()];
                }
            }
            if (randoms_sub.length < 100) {
                //print("calc randoms_sub");
                for (i = 0;i < 100;i++) { // 100 corner poly max;
                    randoms_sub[i] = Math.random();
                }
            }

            if (polysel) guideCore.setActivePolygonSelection(parseInt(polyselNum));
            
            for (i = 0;i < guidePolyCount;i++) {
                var gSize = guideCore.polygonSize(i);
                if (gSize > 100) break; //
                if (!polysel || guideCore.polygonSelection(i)) {
                    if (hType == 1 || hType == 2) { // points, or both
                        for (j = 0;j < gSize;j++) {
                            var rand = randoms_sub[j];
                            var rand1 = (randoms[i][0] + rand)/2;
                            var rand2 = (randoms[i][1] + rand)/2;
                            var rand3 = (randoms[i][2] + rand)/2;
                            var randA_h = randA / 2;
                            var curlX_h = curlX / 2;
                            var curlY_h = curlY / 2;
                            var curlZ_h = curlZ / 2;
    
                            var gravV = gravGV.add(new Vec3D(rand1*randA-randA_h,rand2*randA-randA_h,rand3*randA-randA_h));
                            var vert = guideCore.vertex(guideCore.vertexIndex(i,j));
                            var normal = guideCore.normal(i,j);
                            var uv = guideCore.uvCoord(i,j);
                            
                            var width = new Vec3D((-normal.y)*width_f, (-normal.z)*width_f, (normal.x)*width_f);
                            if (faceCam) width = camTrans.multiply(camMat.multiply(width));
                            
                            normal = normal.multiply(length);
                            normal = vert.add(normal);
                            if (randCurly) curlV = new Vec3D(rand1*curlX-curlX_h, rand2*curlY-curlY_h, rand3*curlZ-curlZ_h);
                            
                            vert = guideMat.multiply(vert);
                            normal = guideMat.multiply(normal);
                            
                            if (uvType == 0) uv = false;
                            addHair(core, vert, normal, width, thinness, segments, randB, gravV, curlV, uv, curlType);
                        }
                    }
                    if (hType == 0 || hType == 2) { // faces, or both
                        var rand1 = randoms[i][0];
                        var rand2 = randoms[i][1];
                        var rand3 = randoms[i][2];
                        var randA_h = randA / 2;
                        var curlX_h = curlX / 2;
                        var curlY_h = curlY / 2;
                        var curlZ_h = curlZ / 2;
                        
                        var gravV = gravGV.add(new Vec3D(rand1*randA-randA_h,rand2*randA-randA_h,rand3*randA-randA_h));
                        var vert = new Vec3D(0,0,0);
                        var uv = new Vec2D(0,0);
                        for (j = 0;j < gSize;j++) {
                            vert = vert.add(guideCore.vertex(guideCore.vertexIndex(i,j)));
                            uv = uv.add(guideCore.uvCoord(i,j));
                        }
                        vert = vert.multiply(1/gSize);
                        var normal = guideCore.normal(i);
                        uv = uv.multiply(1/gSize);
                        
                        
                        var width = new Vec3D((-normal.y)*width_f, (-normal.z)*width_f, (normal.x)*width_f);
                        if (faceCam) width = camTrans.multiply(camMat.multiply(width));
    
                        normal = normal.multiply(length);
                        normal = vert.add(normal);
                        if (randCurly) curlV = new Vec3D(rand1*curlX-curlX_h, rand2*curlY-curlY_h, rand3*curlZ-curlZ_h);
                        
                        vert = guideMat.multiply(vert);
                        normal = guideMat.multiply(normal);
                        
                        if (uvType == 0) uv = false;
                        addHair(core, vert, normal, width, thinness, segments, randB, gravV, curlV, uv, curlType);
                    }
                }
            }
            if (polysel) guideCore.setActivePolygonSelection(parseInt(polysel_store));
            /*
            var st2 = new Date().getTime();
            var st3 = st2 - st1;
            print("cost time:"+st3);
            */
        }
    }
}
