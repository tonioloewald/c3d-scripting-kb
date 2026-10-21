// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Mirror Copy.js
//
// v.20070730
//
// toDo: optimizing code. :p
//
// v.20070730: extended for copy polygon object.
//
// Description: copy objects.
// Usage: Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. restart Cheetah3D, then select from Tools -> Script -> Tool Script

var Mirror_Plane = 0;
var pList = new Array;
var jType = true;
var jMode = true;
var jColor = true;
var jTag = true;

function buildUI(tool) {
    tool.addParameterSeparator("Mirror Copy");
    tool.addParameterSelector("mirror plane",["x","y","z"],true,true);
    
    tool.addParameterBool("joint type",1,0,1,true,true);
    tool.addParameterBool("joint display mode",1,0,1,true,true);
    tool.addParameterBool("joint color",1,0,1,true,true);
    tool.addParameterBool("tag copy",1,0,1,true,true);
    
    tool.addParameterSeparator("Object Copy");
    tool.addParameterButton("copy","copy","Copy");
    
    tool.addParameterSeparator("Parameter Copy");
    tool.addParameterButton("parameter copy","copy","pCopy");
    tool.addParameterButton("parameter paste","paste","pPaste");
}

function Copy(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    Mirror_Plane = parseInt(tool.getParameter("mirror plane"));
    
    jType = tool.getParameter("joint type");
    jMode = tool.getParameter("joint display mode");
    jColor = tool.getParameter("joint color");
    jTag = tool.getParameter("tag copy");
    
    var list = new Array;
    var parentObj = obj.owner();

    list = StoreChild(0, obj);
    
    CopyChild(doc, parentObj, list);
}

function pCopy(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    Mirror_Plane = parseInt(tool.getParameter("mirror plane"));
    
    jType = tool.getParameter("joint type");
    jMode = tool.getParameter("joint display mode");
    jColor = tool.getParameter("joint color");
    jTag = tool.getParameter("tag copy");
    
    pList.length = 0;

    pList = StoreChild(0, obj);
}

function pPaste(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    Mirror_Plane = parseInt(tool.getParameter("mirror plane"));
    
    jType = tool.getParameter("joint type");
    jMode = tool.getParameter("joint display mode");
    jColor = tool.getParameter("joint color");

    if (pList.length > 0) {
        pPasteChild(obj, pList);
    }
}

function StoreChild(iter, obj) {
    var childCount = obj.childCount();
    var list = new Array(iter, obj, new Array);
    for (var i = 0; i < childCount;i++) {
        var child = obj.childAtIndex(i);
        var childList = StoreChild(iter+1, child);
        list[2].push(childList);
    }
    return list;
}

function getPos(vec) {
    switch(Mirror_Plane) {
        case 0:
            vec.x *= -1;
            break;
        case 1:
            vec.y *= -1;
            break;
        case 2:
            vec.z *= -1;
            break;
    }
    return vec;
}

function getRot(vec) { // HPB
    switch(Mirror_Plane) {
        case 0:
            vec.x *= -1;
            vec.z *= -1;
            break;
        case 1:
            vec.y *= -1;
            vec.z *= -1;
            break;
        case 2:
            vec.x *= -1;
            vec.y *= -1;
            break;
    }
    return vec;
}

function CopyCore(core, cCore) {
    var i, j;
    var polyCount = cCore.polygonCount();
    var vertexCount = cCore.vertexCount();
    
    for (i = 0;i < vertexCount;i++) {
        var vert = getPos(cCore.vertex(i));
        core.addVertex(false, vert);
    }
    for (i = 0;i < polyCount;i++) {
        var size = cCore.polygonSize(i);
        var verts = new Array;
        var uvs = new Array;
        for (j = 0;j < size;j++) {
            verts[j] = cCore.vertexIndex(i, j);
            uvs[j] = cCore.uvCoord(i,j);
        }
        core.addIndexPolygon(size, verts, uvs);
        core.flipWinding(i);
    }
}

function CopyChild(doc, obj, list) {
    //var count = list.length;
    var name = list[1].getParameter("name");
    var pos = list[1].getParameter("position");
    var rot = list[1].getParameter("rotation");
    var scale = list[1].getParameter("scale");
    
    pos = getPos(pos);
    rot = getRot(rot);

    var obj_copied = doc.addObject(list[1].type());
    // for polygon object
    if (list[1].type() == POLYGONOBJ) {
    	CopyCore(obj_copied.core(), list[1].core());
    }
    //
    obj_copied.setParameter("name",name+"_copy");
    obj_copied.setParameter("position",pos);
    obj_copied.setParameter("rotation",rot);
    obj_copied.setParameter("scale",scale);
    if (list[1].type() == 45) { // BONE OBJECT
        if (jType) obj_copied.setParameter("jointType", list[1].getParameter("jointType"));
        if (jMode) obj_copied.setParameter("displayMode", list[1].getParameter("displayMode"));
        if (jColor) obj_copied.setParameter("jointColor", list[1].getParameter("jointColor"));
    }
    if (jTag) {
        var tagCount = list[1].tagCount();
        for (var i = 0;i < tagCount;i++) {
            var tTag = list[1].tagAtIndex(i);
            if (tTag.type() > 104) { // not object tag, not mode tag.
                var cTag = obj_copied.addTagOfType(tTag.type());
                var tagInfo = tTag.parameterInfo();
                if (tTag.type() == 120) {
                    var constraintRotMin = new Vec3D();
                    var constraintRotMax = new Vec3D();
                    for (var j = 0;j < tagInfo.length;j++) {
                        switch(tagInfo[j][0]) {
                            case "constraintRotH":
                                var constraint = tTag.getParameter(tagInfo[j][0]);
                                constraintRotMin.x = constraint.u;
                                constraintRotMax.x = constraint.v;
                                break;
                            case "constraintRotP":
                                var constraint = tTag.getParameter(tagInfo[j][0]);
                                constraintRotMin.y = constraint.u;
                                constraintRotMax.y = constraint.v;
                                break;
                            case "constraintRotB":
                                var constraint = tTag.getParameter(tagInfo[j][0]);
                                constraintRotMin.z = constraint.u;
                                constraintRotMax.z = constraint.v;
                                break;
                            default:
                                cTag.setParameter(tagInfo[j][0], tTag.getParameter(tagInfo[j][0]));
                        }
                    }
                    constraintRotMin = getRot(constraintRotMin);
                    constraintRotMax = getRot(constraintRotMax);
                    var rh = new Vec2D(Math.min(constraintRotMin.x, constraintRotMax.x),
                                        Math.max(constraintRotMin.x, constraintRotMax.x));
                    var rp = new Vec2D(Math.min(constraintRotMin.y, constraintRotMax.y),
                                        Math.max(constraintRotMin.y, constraintRotMax.y));
                    var rb = new Vec2D(Math.min(constraintRotMin.z, constraintRotMax.z),
                                        Math.max(constraintRotMin.z, constraintRotMax.z));
                    cTag.setParameter("constraintRotH", rh);
                    cTag.setParameter("constraintRotP", rp);
                    cTag.setParameter("constraintRotB", rb);
                } else {
                    for (var j = 0;j < tagInfo.length;j++) {
                        cTag.setParameter(tagInfo[j][0], tTag.getParameter(tagInfo[j][0]));
                    }
                }
            }
        }
    }
    
    var count = list[2].length;
    for (var i = 0;i < count;i++) {
        CopyChild(doc, obj_copied, list[2][i]);
    }
    obj.addChildAtIndex(obj_copied, 0);
}

function pPasteChild(obj, list) {
    var pos = list[1].getParameter("position");
    var rot = list[1].getParameter("rotation");
    var scale = list[1].getParameter("scale");
    
    pos = getPos(pos);
    rot = getRot(rot);
    
    obj.setParameter("position",pos);
    obj.setParameter("rotation",rot);
    obj.setParameter("scale",scale);
    if (list[1].type() == 45) { // BONE OBJECT
        if (jType) obj.setParameter("jointType", list[1].getParameter("jointType"));
        if (jMode) obj.setParameter("displayMode", list[1].getParameter("displayMode"));
        if (jColor) obj.setParameter("jointColor", list[1].getParameter("jointColor"));
    }
    if (jTag) {
        var tagCount = list[1].tagCount();
        var tagCount_o = obj.tagCount();
        if (tagCount == tagCount_o) {
            for (var i = 0;i < tagCount;i++) {
                var tTag = list[1].tagAtIndex(i);
                var oTag = obj.tagAtIndex(i);
                if (tTag.type() == oTag.type()) { // not object tag, not mode tag.
                    var tagInfo = tTag.parameterInfo();
                    if (tTag.type() == 120) {
                        var constraintRotMin = new Vec3D();
                        var constraintRotMax = new Vec3D();
                        for (var j = 0;j < tagInfo.length;j++) {
                            switch(tagInfo[j][0]) {
                                case "constraintRotH":
                                    var constraint = tTag.getParameter(tagInfo[j][0]);
                                    constraintRotMin.x = constraint.u;
                                    constraintRotMax.x = constraint.v;
                                    break;
                                case "constraintRotP":
                                    var constraint = tTag.getParameter(tagInfo[j][0]);
                                    constraintRotMin.y = constraint.u;
                                    constraintRotMax.y = constraint.v;
                                    break;
                                case "constraintRotB":
                                    var constraint = tTag.getParameter(tagInfo[j][0]);
                                    constraintRotMin.z = constraint.u;
                                    constraintRotMax.z = constraint.v;
                                    break;
                                default:
                                    oTag.setParameter(tagInfo[j][0], tTag.getParameter(tagInfo[j][0]));
                            }
                        }
                        constraintRotMin = getRot(constraintRotMin);
                        constraintRotMax = getRot(constraintRotMax);
                        var rh = new Vec2D(Math.min(constraintRotMin.x, constraintRotMax.x),
                                            Math.max(constraintRotMin.x, constraintRotMax.x));
                        var rp = new Vec2D(Math.min(constraintRotMin.y, constraintRotMax.y),
                                            Math.max(constraintRotMin.y, constraintRotMax.y));
                        var rb = new Vec2D(Math.min(constraintRotMin.z, constraintRotMax.z),
                                            Math.max(constraintRotMin.z, constraintRotMax.z));
                        oTag.setParameter("constraintRotH", rh);
                        oTag.setParameter("constraintRotP", rp);
                        oTag.setParameter("constraintRotB", rb);
                    } else {
                        for (var j = 0;j < tagInfo.length;j++) {
                            oTag.setParameter(tagInfo[j][0], tTag.getParameter(tagInfo[j][0]));
                        }
                    }
                }
            }
        }
    }

    var count = obj.childCount();
    for (var i = 0;i < count;i++) {
        pPasteChild(obj.childAtIndex(i), list[2][i]);
    }
}

function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}
function printMatrix(matrix) {
    print(matrix.m00+':'+matrix.m01+':'+matrix.m02+':'+matrix.m03);
    print(matrix.m10+':'+matrix.m11+':'+matrix.m12+':'+matrix.m13);
    print(matrix.m20+':'+matrix.m21+':'+matrix.m22+':'+matrix.m23);
    print(matrix.m30+':'+matrix.m31+':'+matrix.m32+':'+matrix.m33);    
}
