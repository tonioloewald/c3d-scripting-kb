// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Poly2Spline.js
//
//  v.061102 requied Cheetah3D version 3.5
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
// 
// for scripts/Splineobj Folder

var cache = new Array;

function buildUI(obj) {
    
    obj.setParameter("name","Poly 2 Spline");
    
    obj.addParameterSeparator("Polygon Selection");

    obj.addParameterBool("only selection",0,0,1,true,true);
    
    obj.addParameterInt("polygon selection",0,0,15,true,true);
    
    obj.addParameterSeparator("Transform");
    
    obj.addParameterSelector("coordinate system",["self","child"],true,true);
    //obj.addParameterInt("coordinate system",0,0,1,true,true);
    // in case that you don't use version 3.5.
    
    obj.addParameterSeparator("Update");
    
    obj.addParameterButton("Update","Update","objectUpdate");
}

function objectUpdate(obj) {
    obj.update();
}

function buildObject(obj) {
    var core = obj.modCore();
    var polysel = obj.getParameter("only selection");
    var polysel_store = 0;
    var polyselnum = obj.getParameter("polygon selection");
    var trans = parseInt(obj.getParameter("coordinate system"));
    
    if (obj.childCount() > 0) {
        var base = obj.childAtIndex(0);
        var baseMat = base.objMatrix();
        
        if (base.family() == NGONFAMILY) {
            var baseCore = base.modCore();
            var basePolyCount = baseCore.polygonCount();
            var i,j;
            
            cache = new Array(0);
            
            if (polysel) baseCore.setActivePolygonSelection(parseInt(polyselnum));
            
            for (i = 0;i < basePolyCount;i++) {
                var bSize = 1;
                if (polysel) {
                    if (baseCore.polygonSelection(i)) {
                        bSize = baseCore.polygonSize(i);
                    }
                } else {
                    bSize = baseCore.polygonSize(i);
                }
                if (bSize > 1) {
                    for (j = 0;j < bSize - 1;j++) {
                        var index_1 = baseCore.vertexIndex(i,j);
                        var index_2 = baseCore.vertexIndex(i,j+1);
                        var cache_d = new Array(index_1,index_2);
                        cache_d.sort();
                        
                        if (checkCache(cache_d)) {
                            var vertex1 = baseCore.vertex(index_1);
                            var vertex2 = baseCore.vertex(index_2);
                            if (trans == 1) {
                                vertex1 = baseMat.multiply(vertex1);
                                vertex2 = baseMat.multiply(vertex2);
                            }
                            core.move(vertex1);
                            core.line(vertex2);
                            
                            cache.push(cache_d);
                        }
                    }
                    
                    var index_1 = baseCore.vertexIndex(i,bSize - 1);
                    var index_2 = baseCore.vertexIndex(i,0);
                    var cache_d = new Array(index_1,index_2);
                    cache_d.sort();
                        
                    if (checkCache(cache_d)) {
                        var vertex1 = baseCore.vertex(index_1);
                        var vertex2 = baseCore.vertex(index_2);
                        if (trans == 1) {
                            vertex1 = baseMat.multiply(vertex1);
                            vertex2 = baseMat.multiply(vertex2);
                        }
                        core.move(vertex1);
                        core.line(vertex2);
                        
                        cache.push(cache_d);
                    }
                }
            }
        }
    }
}

function checkCache(comp) {
    var i;
    
    for (i = 0;i < cache.length;i++) {
        var cached = cache[i];
        
        if (cached[0] == comp[0] && cached[1] == comp[1]) return false;
    }
    return true;
}

