// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Polygon Reduction.js
//
// v.20070517 not optimized, toooooo sloooooowwww!!!!
//  required version : Cheetah3D v3.5
//
// 20070301 first.
// 20070305 fixed bug, added options.
// 20070308 optimized.
// 20070517 UV is back.
//
// Progressive Mesh type Polygon Reduction Algorithm by Stan Melax (c) 1998 http://www.melax.com/polychop/
//
// @author Hiroto Tsubaki (tg@tres-graficos.jp)
//
// Description: Polygon Reduction. Tool Script.
// Usage: Place this into ~/Library/Application Support/Cheetah3D/scripts/Tool folder. restart Cheetah3D, then select from Tools -> Script -> Tool Script
//

var vertices = new Array;
var triangles = new Array;

var order = new Array;
var map = new Array;
var heap = new Array;

var lockSelPoint = false;
var lockSelEdge = false;

var time_s;

// add function 
if ( !Vec3D.dot ) {
    Vec3D.prototype.dot = function(other) {
        var xh = this.x*other.x;
        var yh = this.y*other.y;
        var zh = this.z*other.z;
        return xh + yh + zh;
    }
    Vec3D.prototype.cross = function(other) {
        var xh = this.y*other.z - this.z*other.y;
        var yh = this.z*other.x - this.x*other.z;
        var zh = this.x*other.y - this.y*other.x;
        return new Vec3D(xh, yh, zh);
    }
	Vec3D.prototype.magnitude = function() {
	   return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}
}
if ( !Vec3D.isEqualTo ) {
    Vec3D.prototype.isEqualTo = function(other) {
        return (this.x == other.x && this.y == other.y && this.z == other.z);
    }
}
if ( !Vec2D.isEqualTo ) {
    Vec2D.prototype.isEqualTo = function(other) {
        return (this.u == other.u && this.v == other.v);
    }
}
// Triangle class
function Triangle(v0,v1,v2,uv0,uv1,uv2) { //
    this.vertex = new Array;
    this.vertex[0] = v0;
    this.vertex[1] = v1;
    this.vertex[2] = v2;
    this.uv = new Array;
    this.uv[0] = uv0;
    this.uv[1] = uv1;
    this.uv[2] = uv2;    
    //this.normal = normal;
    this.ComputeNormal();
    this.place = triangles.length;
    triangles.push(this);
    for (var i = 0;i < 3;i++) {
        this.vertex[i].face.push(this);
        for (var j = 0;j < 3;j++) {
            if (i != j) {
                this.vertex[i].neighbor.AddUnique(this.vertex[j]);
            }
        }
    }
}
Triangle.prototype.deTriangle = function() {
    var i;
    //triangles = triangles.Remove(this);
    triangles[this.place] = triangles[triangles.length-1];
    triangles[this.place].place = this.place;
    triangles.pop();
    for (i = 0;i < 3;i++) {
        if (this.vertex[i]) this.vertex[i].face.Remove(this);
    }
    for (i = 0;i < 3;i++) {
        var i2 = (i+1)%3;
        if ( !this.vertex[i] || !this.vertex[i2] ) continue;
        this.vertex[i].RemoveIfNonNeighbor(this.vertex[i2]);
        this.vertex[i2].RemoveIfNonNeighbor(this.vertex[i]);
    }
}
Triangle.prototype.uvAt = function(vec) {
    for (var i = 0;i < 3;i++) {
        if (this.vertex[i].isEqualTo(vec)) break;
    }
    return this.uv[i];
}
Triangle.prototype.setUV = function(vec, uv) {
    for (var i = 0;i < 3;i++) {
        if (this.vertex[i].isEqualTo(vec)) break;
    }
    this.uv[i] = uv;
}
Triangle.prototype.HasVertex = function(vec) {
    return (vec.isEqualTo(this.vertex[0]) || vec.isEqualTo(this.vertex[1]) || vec.isEqualTo(this.vertex[2]));
}
Triangle.prototype.ComputeNormal = function() {
    var v0 = this.vertex[0].position;
    var v1 = this.vertex[1].position;
    var v2 = this.vertex[2].position;
    this.normal = v1.sub(v0).cross(v2.sub(v1));
    if (this.normal.magnitude() == 0) return;
    this.normal = normalize(this.normal);
}
Triangle.prototype.ReplaceVertex = function(vold, vnew) {
    if (vold.isEqualTo(this.vertex[0])) this.vertex[0] = vnew;
    else if (vold.isEqualTo(this.vertex[1])) this.vertex[1] = vnew;
    else this.vertex[2] = vnew;
    var i;
    vold.face.Remove(this);
    vnew.face.push(this);
    for (i = 0;i < 3;i++) {
        vold.RemoveIfNonNeighbor(this.vertex[i]);
        this.vertex[i].RemoveIfNonNeighbor(vold);
    }
    for (i = 0;i < 3;i++) {
        for (var j = 0;j < 3;j++) {
            if (i != j) {
                this.vertex[i].neighbor.AddUnique(this.vertex[j]);
            }
        }
    }
    this.ComputeNormal();
}
// Vertex class
function Vertex(vec, _id, _selected) {
    this.position = vec;
    this.id = _id;
    this.neighbor = new Array;
    this.face = new Array;
    this.objdist = 0.0;
    this.collapse = null;
    this.heapspot = null;
    this.place = vertices.length;
    this.selected = _selected;
    vertices.push(this);
}
Vertex.prototype.deVertex = function() {
    while(this.neighbor.length) {
        this.neighbor[0].neighbor.Remove(this);
        this.neighbor.Remove(this.neighbor[0]);
    }
    //vertices = vertices.Remove(this);
    vertices[this.place] = vertices[vertices.length-1];
    vertices[this.place].place = this.place;
    vertices.pop();
}
Vertex.prototype.isEqualTo = function(other) {
    return (this.position.isEqualTo(other.position));
}
Vertex.prototype.IsBorder = function() {
    var len = this.neighbor.length;
    for (var i = 0;i < len;i++) {
        var count = 0;
        var face_len = this.face.length;
        for (var j = 0;j < face_len;j++) {
            if (this.face[j].HasVertex(this.neighbor[i])) {
                count++;
            }
        }
        if (count == 1) return true;
    }
    return false;
}
Vertex.prototype.RemoveIfNonNeighbor = function(vec) {
    if (!this.neighbor.Contains(vec)) return;
    var len = this.face.length;
    for (var i = 0;i < len;i++) {
        if (this.face[i].HasVertex(vec)) return;
    }
    this.neighbor.Remove(vec);
}
// add fucntions
Array.prototype.AddUnique = function(obj) {
    var rm = -1;
    var len = this.length;
    for (var i = 0;i < len;i++) {
        if (obj==this[i]) {
            rm = i;
            break;
        }
    }
    if (rm < 0) this.push(obj);
}
Array.prototype.Remove = function(obj) {
    var len = this.length;
    for (var i = 0;i < len;i++) {
        if (obj==this[i]) {
            this.splice(i,1);
            break;
        }
    }
}
Array.prototype.Contains = function(obj) {
    var len = this.length;
    for (var i = 0;i < len;i++) {
        if (this[i] == obj) return true;
    }
    return false;
}

function buildUI(tool) {
    tool.addParameterSeparator("Polygon Reduction");
    
    tool.addParameterFloat("reduce ratio",0.5,0,1,true,true);
    //tool.addParameterFloat("morph",0,0,1.0,true,true);
    tool.addParameterBool("lock selected points",1,0,1,true,true);
    tool.addParameterBool("lock selected edges",1,0,1,true,true);
    tool.addParameterButton("Reduction","apply","PolyReduction");
}

function normalize(v) {
    var d = v.magnitude();
    if (d == 0) {
        print("Can't normalize ZERO vector");
        d=0.1;
    }
    v = v.multiply(1/d);
    return v;
}
//
function HeapVal(i) {
    if (i >= heap.length || heap[i] == null) return 9999999999999.9;
    return heap[i].objdist;
}
function SortUp(k) {
    var k2;
    while(HeapVal(k) < HeapVal((k2=parseInt((k-1)/2)))) {
        var tmp = heap[k];
        heap[k] = heap[k2];
        heap[k].heapspot = k;
        heap[k2] = tmp;
        heap[k2].heapspot = k2;
        k = k2;
    }
}
function SortDown(k) {
    var k2;
    while(HeapVal(k) > HeapVal((k2=(k+1)*2)) || HeapVal(k) > HeapVal((k2-1))) {
        k2 = (HeapVal(k2) < HeapVal(k2-1))? k2:k2-1;
        var tmp = heap[k];
        heap[k] = heap[k2];
        heap[k].heapspot = k;
        heap[k2] = tmp;
        if (tmp) heap[k2].heapspot = k2;
        k = k2;
    }
}
function HeapAdd(v) {
    var k = heap.length;
    heap.push(v);
    v.heapspot = k;
    SortUp(k);
}
function HeapPop() {
    rv = heap[0];
    rv.heapspot = -1;
    heap[0] = null;
    SortDown(0);
    return rv;
}
//
function ComputeEdgeCollapseCosts(u, v) {
    var i;
    var edgelength = v.position.sub(u.position).magnitude();
    var curvature = 0.001;
    //
    var sides = new Array;
    var count = u.face.length;
    for (i = 0;i < count;i++) {
        if (u.face[i].HasVertex(v)) {
            sides.push(u.face[i]);
        }
    }
    var sidesCount = sides.length;
    for (i = 0;i < count;i++) {
        var mincurv = 1.0;
        for (var j = 0;j < sidesCount;j++) {
            var dotprod = u.face[i].normal.dot(sides[j].normal);
            mincurv = Math.min(mincurv, (1.002-dotprod)/2.0);
        }
        curvature = Math.max(curvature,mincurv);
    }
    if (u.IsBorder() && sides.length > 1) {
        curvature = 1;
    }
    
    // UV
    var nomatch = 0;
    for (i = 0; i < u.face.length;i++) {
        for (var j = 0;j < sides.length;j++) {
            if (u.face[i].uvAt(u).isEqualTo(sides[j].uvAt(u))) break;
        }
        if (j == sides.length) {
            nomatch++;
        }
    }
    if (nomatch) curvature = 1;
    
    if (u.selected && lockSelPoint) {
        curvature = 9999.9;
    }
    return edgelength * curvature;
}

function ComputeEdgeCostAtVertex(v) {
    if (v.neighbor.length == 0) {
        v.collapse = null;
        v.objdist = -0.01;
        return;
    }
    v.objdist = 1000000;
    v.collapse = null;
    var len = v.neighbor.length;
    for (var i = 0;i < len;i++) {
        var dist = ComputeEdgeCollapseCosts(v, v.neighbor[i]);
        if ((!v.collapse) || dist < v.objdist) {
            v.collapse = v.neighbor[i];
            v.objdist = dist;
        }
    }
    //print(v.id+", "+v.objdist+" collapse:"+v.collapse);
}

function ComputeAllEdgeCollapseCosts() {
    var count = vertices.length;
    for (var i = 0;i < count;i++) {
        ComputeEdgeCostAtVertex(vertices[i]);
        HeapAdd(vertices[i]);
    }
}

function MinimumCostEdge() {
    return HeapPop();
}

function Collapse(u, v, recompute) {
    if (!v) {
        u.deVertex();
        return ;
    }
    var i;
    var tmp = new Array;
    var count = u.neighbor.length;
    for (i = 0;i < count;i++) {
        tmp.push(u.neighbor[i]);
    }
    
    // for UV
    var sides = new Array;
    count = u.face.length;
    for (i = 0;i < count;i++) {
        if (u.face[i].HasVertex(v)) {
            sides.push(u.face[i]);
        }
    }
    for (i = 0;i < count;i++) {
        if (u.face[i].HasVertex(v)) continue;
        for (var j = 0;j < sides.length;j++) {
            if (u.face[i].uvAt(u).isEqualTo(sides[j].uvAt(u))) {
                u.face[i].setUV(u,sides[j].uvAt(v));
                break;
            }
            if (j == sides.length) ;
        }
    }
    
    count = u.face.length;
    for (i = count - 1;i >= 0;i--) {
        if (u.face[i].HasVertex(v)) {
            var rm = u.face[i];
            u.face.Remove(u.face[i]);
            rm.deTriangle(); // destruct.
        }
    }
    for (i = count - 1;i >= 0;i--) {
        if (u.face[i]) u.face[i].ReplaceVertex(u,v);
    }
    u.deVertex();
    if (recompute) {
        var tmpCount = tmp.length;
        for (i = 0;i < tmpCount;i++) {
            ComputeEdgeCostAtVertex(tmp[i]);
            SortUp(tmp[i].heapspot);
            SortDown(tmp[i].heapspot);
        }
    }
}

function PolyReduction(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    
    if (obj && obj.family() == NGONFAMILY) {
        print("---- Polygon Reduction ----");
        time_s = new Date().getTime();
        //
        var core = obj.core();
        
        var ratio = tool.getParameter("reduce ratio");
        var morph = 0; //tool.getParameter("morph");
        //
        lockSelPoint = tool.getParameter("lock selected points");
        lockSelEdge = tool.getParameter("lock selected edges");
        //
        map.length = 0;
        order.length = 0;
        ComputeProgressiveMesh(core);
        //
        DoProgressiveMesh(core,ratio);

        // create object;
        var tObj = doc.addObject(POLYGONOBJ);
        var tCore = tObj.core();
        var tPos = obj.getParameter("position");
        var tRot = obj.getParameter("rotation");
        var tScale = obj.getParameter("scale");
        
        tObj.setParameter("name",obj.getParameter("name")+"-reduc."+ratio.toPrecision(3));
        
        print("reduced vertices:"+vertices.length);
        print("reduced triangles:"+triangles.length);
        
        var vertexCount = vertices.length;
        for (i = 0;i < vertexCount;i++) {
            vertices[i].id = i;
            tCore.addVertex(false, vertices[i].position );
        }
        for (i = 0;i < triangles.length;i++) {
            var v0 = triangles[i].vertex[0].id;
            var v1 = triangles[i].vertex[1].id;
            var v2 = triangles[i].vertex[2].id;
            var uv0 = triangles[i].uv[0];
            var uv1 = triangles[i].uv[1];
            var uv2 = triangles[i].uv[2];
            
            if (v0 < vertexCount && v1 < vertexCount && v2 < vertexCount) { // error check
                tCore.addIndexPolygon(3, [v0, v1, v2], [uv0, uv1, uv2] );
            }
        }
        tObj.setParameter("position", tPos);
        tObj.setParameter("rotation", tRot);
        tObj.setParameter("scale", tScale);
        
        tObj.update();
        //
        printTime("total cost");
    }
}

function ComputeProgressiveMesh(core) {
    var vertexCount = core.vertexCount();
    var triangleCount = core.triangleCount();
    var polyCount = core.polygonCount();
    
    vertices.length = 0;
    for (var i = 0;i < vertexCount;i++) { // copy
        var sel = (lockSelPoint)?core.vertexSelection(i):false;
        var v = new Vertex(core.vertex(i), i, sel);
    }
    triangles.length = 0;
    for (var i = 0;i < polyCount;i++) { // copy
        var polySize = core.polygonSize(i);
        if (lockSelEdge) {
            for(var j = 0;j < polySize;j++) {
                if (core.edgeSelection(i,j,SELECT)) {
                    var p1 = j;
                    var p2 = (j+1==polySize)? 0 : j+1;
                    var i1 = core.vertexIndex(i,p1);
                    var i2 = core.vertexIndex(i,p2);
                    vertices[i1].selected = true;
                    vertices[i2].selected = true;
                }
            }
        }
        for (var j = 0;j < polySize - 2;j++) {
            var trinum = core.triangle(i,j);
            var uv0 = core.uvCoord(i, trinum[0]);
            var uv1 = core.uvCoord(i, trinum[1]);
            var uv2 = core.uvCoord(i, trinum[2]);
            var t = new Triangle( vertices[core.vertexIndex(i,trinum[0])], 
                                  vertices[core.vertexIndex(i,trinum[1])], 
                                  vertices[core.vertexIndex(i,trinum[2])],
                                  uv0,
                                  uv1,
                                  uv2
                                );
        }
    }
    print("vertices:"+vertices.length);
    print("triangles:"+triangles.length);
    printTime("end Cache");
    
    heap = new Array;
    ComputeAllEdgeCollapseCosts();
    printTime("end ComputeAllEdgeCollapseCosts");
    
    map = new Array;
    order = new Array;
    while(vertices.length) {
        var mn = MinimumCostEdge();
        order[vertices.length-1] = mn.id;
        map[mn.id] = (mn.collapse)? mn.collapse.id : -1;
        //printTime("length."+vertices.length);
        Collapse(mn, mn.collapse, true);
    }
    printTime("end CostEdge");
}

function DoProgressiveMesh(core, ratio) {
    var i;
    var vertexCount = core.vertexCount();
    var triangleCount = core.triangleCount();
    var polyCount = core.polygonCount();
    var target = parseInt(ratio * vertexCount);
    //
    var vclist = new Array;
    
    vertices.length = 0;
    for (i = 0;i < vertexCount;i++) { // copy
        var v = new Vertex(core.vertex(i), i);
    }
    for (i = 0;i < vertexCount;i++) {
        vertices[i].collapse = (map[i]==-1)? null : vertices[map[i]];
        vclist[i] = vertices[order[i]];
    }
    triangles.length = 0;
    for (i = 0;i < polyCount;i++) { // copy
        var polySize = core.polygonSize(i);
        for (var j = 0;j < polySize - 2;j++) {
            var trinum = core.triangle(i,j);
            var uv0 = core.uvCoord(i, trinum[0]);
            var uv1 = core.uvCoord(i, trinum[1]);
            var uv2 = core.uvCoord(i, trinum[2]);
            var t = new Triangle( vertices[core.vertexIndex(i,trinum[0])], 
                                  vertices[core.vertexIndex(i,trinum[1])], 
                                  vertices[core.vertexIndex(i,trinum[2])],
                                  uv0,
                                  uv1,
                                  uv2
                                );
        }
    }
    if (lockSelPoint || lockSelEdge) {
        var lock_count = 0;
        for (i = 0;i < vertices.length;i++) {
            if (vertices[i].selected) lock_count++;
        }
        if (lock_count > target) target = lock_count;
    }
    while(vclist.length > target) {
        var mn = vclist.pop();
        Collapse(mn, mn.collapse, false);
    }
    //
    printTime("end ProgressiveMesh");
}

function printTime(str) {
    var time_e = new Date().getTime();
    var time = (time_e - time_s) / 1000;
    print(str+": "+time+"s.");
}
