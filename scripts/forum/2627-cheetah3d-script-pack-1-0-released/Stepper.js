// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Stepper.js
//
// v.061213b
// required version : Cheetah3D v.3.5 above
//
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//
//  2006-12-11 created.
//  2006-12-12 bug fixed. add capture button.
//  2006-12-13 fixed some code.add parameter "selection", fix bug.
//
// Usage: Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
//        this Tool script for move/rotate/scale selected points with input values.
//

function buildUI(tool) {
    tool.addParameterSeparator("Stepper");
    
    tool.addParameterSelector("selection",["point","edge","polygon"],true,true);
    tool.addParameterSelector("coordinate system",["selected","object","world","input point"],true,true);
    tool.addParameterBool("set X",1,0,1,true,true);
    tool.addParameterFloat("step X",0,-1000,1000,true,true);
    tool.addParameterBool("set Y",1,0,1,true,true);
    tool.addParameterFloat("step Y",0,-1000,1000,true,true);
    tool.addParameterBool("set Z",1,0,1,true,true);
    tool.addParameterFloat("step Z",0,-1000,1000,true,true);
    
    tool.addParameterButton("step move","move","Move");
    tool.addParameterButton("step rotate","rotate","Rotate");
    tool.addParameterButton("step scale","scale","Scale");
    
    tool.addParameterSeparator("Input Point (rotate/scale center)");
    tool.addParameterFloat("point X",0,-1000,1000,true,true);
    tool.addParameterFloat("point Y",0,-1000,1000,true,true);
    tool.addParameterFloat("point Z",0,-1000,1000,true,true);
    tool.addParameterButton("capture","capture","Capture");
    
    tool.addParameterSeparator("Set");
    tool.addParameterButton("set","0.5","Set50");
    tool.addParameterButton("set","1.0","Set100");
    tool.addParameterButton("set","2.0","Set200");
    tool.addParameterButton("set","invert","Invert");
    
}

function Set50(tool) {
    tool.setParameter("step X",0.5);
    tool.setParameter("step Y",0.5);
    tool.setParameter("step Z",0.5);
}

function Set100(tool) {
    tool.setParameter("step X",1.0);
    tool.setParameter("step Y",1.0);
    tool.setParameter("step Z",1.0);
}

function Set200(tool) {
    tool.setParameter("step X",2.0);
    tool.setParameter("step Y",2.0);
    tool.setParameter("step Z",2.0);
}

function Invert(tool) {
    var stepx = tool.getParameter("step X");
    var stepy = tool.getParameter("step Y");
    var stepz = tool.getParameter("step Z");
    
    tool.setParameter("step X",stepx*-1);
    tool.setParameter("step Y",stepy*-1);
    tool.setParameter("step Z",stepz*-1);    
}

function Capture(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    print(NGONFAMILY);
    if (obj.family() == SPLINEFAMILY || obj.family() == LIGHTFAMILY || obj.family() == MODIFIERFAMILY || obj.family() == NGONFAMILY) {
        var position = obj.getParameter("position");
        tool.setParameter("point X", position.x);
        tool.setParameter("point Y", position.y);
        tool.setParameter("point Z", position.z);
        
        tool.update();
    }
}
function getCenterVecForSelector(coor, list, obj, tool) {
    var i;
    var len = list.length;
    var core = obj.core();
    var centerVec = new Vec3D(0,0,0);
    switch (coor) {
        case 0: // selected
            for (i = 0;i < len;i++) {
                var vec = core.vertex(list[i]);
                centerVec = centerVec.add(vec);
            }
            centerVec = centerVec.multiply(1/len);
            break;
        case 1: // object
            break;
        case 2: // world
            break;
        case 3: // captured point
            centerVec = new Vec3D(tool.getParameter("point X"), tool.getParameter("point Y"), tool.getParameter("point Z"));
            break;
        default:
            //print("error");
    }
    //print("coor:"+coor);
    //printVec3D(centerVec);
    return centerVec;
}

function getVertexList(core, tool) {
    var mode = parseInt(tool.getParameter("selection"));
    var list = new Array();
    var i;
    
    switch(mode) {
        case 0: // point
            var vCount = core.vertexCount();
            for (i = 0;i < vCount;i++) {
                if (core.vertexSelection(i)) {
                    list.push(i);
                }
            }
            break;
        case 1: // edge
            var pCount = core.polygonCount();
            for (i = 0;i < pCount;i++) {
                var pSize = core.polygonSize(i);
                var j;
                for (j = 0;j < pSize;j++) {
                    if (core.edgeSelection(i,j,SELECT)) {
                        var point1 = j;
                        var point2 = (j+1==pSize)? 0 : j+1;
                        var vIndex1 = core.vertexIndex(i,point1);
                        var vIndex2 = core.vertexIndex(i,point2);
                        if (! isExistIndex(list, vIndex1)) list.push(vIndex1);
                        if (! isExistIndex(list, vIndex2)) list.push(vIndex2);
                    }
                }
            }
            break;
        case 2: // polygon
            var pCount = core.polygonCount();
            for (i = 0;i < pCount;i++) {
                if (core.polygonSelection(i)) {
                    var pSize = core.polygonSize(i);
                    var j;
                    for (j = 0;j < pSize;j++) {
                        var vIndex = core.vertexIndex(i,j);
                        if (! isExistIndex(list, vIndex)) list.push(vIndex);
                    }
                }
            }
            break;
    }
    return list;
}

function isExistIndex(list, num) {
    var len = list.length;
    var i;
    for (i = 0;i < len;i++) {
        if (list[i] == num) return true;
    }
    return false;
}

function Move(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    var coor = parseInt(tool.getParameter("coordinate system"));
    var matrix = obj.obj2WorldMatrix();
    var matrixBack = matrix.inverse();
    var xstep = (tool.getParameter("set X"))? tool.getParameter("step X"): 0;
    var ystep = (tool.getParameter("set Y"))? tool.getParameter("step Y"): 0;
    var zstep = (tool.getParameter("set Z"))? tool.getParameter("step Z"): 0;
    
    var move = new Vec3D(xstep, ystep, zstep);
    
    if (obj.type() == POLYGONOBJ) {
        var core = obj.core();
        var vCount = core.vertexCount();
        var i;
        var vList = getVertexList(core, tool);
        //print(vList);
        var len = vList.length;
        for (i = 0;i < len;i++) {
            var vec = core.vertex(vList[i]);
            if (coor == 2) {
                vec = matrix.multiply(vec);
                vec = vec.add(move);
                vec = matrixBack.multiply(vec);
            } else {
                vec = vec.add(move);            
            }
            core.setVertex(vList[i], vec);
            //print("Stepper:"+i);
        }
    }
    obj.update();
}

function Rotate(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    var coor = parseInt(tool.getParameter("coordinate system"));
    var matrix = obj.obj2WorldMatrix();
    var matrixBack = matrix.inverse();
    var xstep = (tool.getParameter("set X"))? tool.getParameter("step X"): 0;
    var ystep = (tool.getParameter("set Y"))? tool.getParameter("step Y"): 0;
    var zstep = (tool.getParameter("set Z"))? tool.getParameter("step Z"): 0;
    
    var rotate = new Mat4D(ROTATE,xstep,ystep,zstep);
    
    if (obj.type() == POLYGONOBJ) {
        var core = obj.core();
        var vCount = core.vertexCount();
        var i;
        var vList = getVertexList(core, tool);
        var len = vList.length;
        var centerVec = new Vec3D(0,0,0);
        if (len > 1) {
            centerVec = getCenterVecForSelector(coor, vList, obj, tool);
        }
        for (i = 0;i < len;i++) {
            var vec = core.vertex(vList[i]);
            if (coor == 2) {
                vec = matrix.multiply(vec);
                vec = rotate.multiply(vec);
                vec = matrixBack.multiply(vec);
            } else if (coor == 3) {
                vec = matrix.multiply(vec);
                vec = vec.sub(centerVec);
                vec = rotate.multiply(vec);
                vec = vec.add(centerVec);
                vec = matrixBack.multiply(vec);            
            } else {
                vec = vec.sub(centerVec);
                vec = rotate.multiply(vec);
                vec = vec.add(centerVec);
            }
            core.setVertex(vList[i], vec);
        }
    }
    obj.update();
}

function Scale(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    var coor = parseInt(tool.getParameter("coordinate system"));
    var matrix = obj.obj2WorldMatrix();
    var matrixBack = matrix.inverse();
    var xstep = (tool.getParameter("set X"))? tool.getParameter("step X"): 1;
    var ystep = (tool.getParameter("set Y"))? tool.getParameter("step Y"): 1;
    var zstep = (tool.getParameter("set Z"))? tool.getParameter("step Z"): 1;
    
    var scale = new Mat4D(SCALE,xstep,ystep,zstep);
    
    if (obj.type() == POLYGONOBJ) {
        var core = obj.core();
        var vCount = core.vertexCount();
        var i;
        var vList = getVertexList(core, tool);
        var len = vList.length;
        var centerVec = new Vec3D(0,0,0);
        if (len > 1) {
            centerVec = getCenterVecForSelector(coor, vList, obj, tool);
        }
        for (i = 0;i < len;i++) {
            var vec = core.vertex(vList[i]);
            if (coor == 2) {
                vec = matrix.multiply(vec); // local -> global
                vec = scale.multiply(vec);
                vec = matrixBack.multiply(vec); // global -> local
            } else if (coor == 3) {
                vec = matrix.multiply(vec);
                vec = vec.sub(centerVec); // set center to 0
                vec = scale.multiply(vec);
                vec = vec.add(centerVec); // set back
                vec = matrixBack.multiply(vec);            
            } else {
                vec = vec.sub(centerVec);
                vec = scale.multiply(vec);
                vec = vec.add(centerVec);
            }
            core.setVertex(vList[i], vec);
        }
    }
    obj.update();
}
// for Debugging.
function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}
function printMatrix(matrix) {
    print(matrix.m00+':'+matrix.m01+':'+matrix.m02+':'+matrix.m03);
    print(matrix.m10+':'+matrix.m11+':'+matrix.m12+':'+matrix.m13);
    print(matrix.m20+':'+matrix.m21+':'+matrix.m22+':'+matrix.m23);
    print(matrix.m30+':'+matrix.m31+':'+matrix.m32+':'+matrix.m33);    
}
