// Source: https://www.cheetah3d.com/forum/index.php?threads/1226/post-7782
// Author: tg_jp (Cheetah3D forum), posted 2007-01-15
// Thread: "I am stumped"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Multi Weld.js
//

// add function to Array class.
if( !Array.indexOf) {
    Array.prototype.indexOf = function(str) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] == str)
                return i;
        }
        return -1;
    }
}
if (!Array.isExists) {
    Array.prototype.isExists = function(value) {
        for (var i = 0;i < this.length;i++) {
            if (this[i] == value) {
                return true;
            }
        }
        return false;
    }
}

function buildUI(tool) {
    tool.addParameterSeparator("Multi Weld");
    tool.addParameterSelector("to",["middle","first point"],true,true);
    tool.addParameterButton("weld","weld","Weld");
}

function Weld(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    if (obj && obj.type() == POLYGONOBJ) {
        var core = obj.core();
        var polyCount = core.polygonCount();
        var vertCount = core.vertexCount();
        var i,j,k;
        var firstVertexIndex = undefined;
        var vList = new Array;
        var pList = new Array;
        var vPos = new Vec3D(0,0,0);
        
        // detect selected vertices.
        for (i = 0;i < vertCount;i++) {
            if (core.vertexSelection(i)) {
                var pos = core.vertex(i);
                if (firstVertexIndex == undefined) firstVertexIndex = i;
                vList.push(new Array(i,pos));
            }
        }
        // if only one selected point is detected, do nothing.
        if (vList.length < 2) return false;
        // calculation weld point.
        if (tool.getParameter("to") == 1 ) {
            vPos = core.vertex(firstVertexIndex);
        } else {
            for (i = 0;i < vList.length;i++) {
                vPos = vPos.add(core.vertex(vList[i][0]));
            }
            vPos = vPos.multiply(1/vList.length);
        }
        // store polygons has selected vertices.
        // pList: delete polygon index, pInfo: remake polygon info.
        var pInfo = new Array;
        for (i = 0;i < polyCount;i++) {
            var pSize = core.polygonSize(i);
            pInfo[i] = new Array;
            for (j = 0;j < pSize;j++) {
                var check = true;
                var index = core.vertexIndex(i,j);
                for (k = 0;k < vList.length;k++) {
                    if (index == vList[k][0]){
                        check = false;
                        if (!pList.isExists(i)) pList.push(i);
                    }
                }
                if (check) pInfo[i].push(index);
                else if (!pInfo[i].isExists("x")) pInfo[i].push("x");
            }
        }
        // create new vertex for remaking polygon.
        if (vList.length > 1) {
            weldVertexIndex = core.addVertex(false, vPos);
        }
        // remake polygon
        for (i = pList.length - 1;i > -1;i--) {
            var dIndex = pList[i]; // index from deleting polygon list.
            var info = pInfo[dIndex]; // polygon info
            var dPos = info.indexOf("x");
            info[dPos] = weldVertexIndex; // replace deleted vertex to new vertex index
            if (info.length > 2) core.addIndexPolygon(info.length, info);
        }
        // delete polygon
        for (i = pList.length - 1;i > -1;i--) {
            core.deletePolygon(pList[i]);
        }
        // delete selected Vertices.
        vertCount = core.vertexCount();
        for (i = vertCount - 1;i > -1;i--) {
            if (core.vertexSelection(i)) {
                core.deleteVertex(i);
            }
            
        }
        // update object
        obj.update();
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
