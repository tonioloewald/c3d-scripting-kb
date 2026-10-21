// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Wavy Extrude.js
//  (c) 2007 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//  
// 
//  current: v.20070428
// 2007-04-27 : first.
// 2007-04-28 : fix geometry bug, etc. wave start now works.
//
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Script -> Polygon Script
//

var pth = new Array();
var lst = new Array();

if( !Vec3D.dot) {
	Vec3D.prototype.dot = function(other) {
		return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
	}
}
if( !Vec3D.cross) {
	// returns a Vec3D as a result
	Vec3D.prototype.cross = function(other) {
		var xh = this.y * other.z - other.y * this.z;
		var yh = this.z * other.x - other.z * this.x;
		var zh = this.x * other.y - other.x * this.y;
		return new Vec3D(xh,yh,zh);
	}
}
if( !Vec3D.str) {
	Vec3D.prototype.str = function() {
		return "("+ this.x.toFixed(5) + "," + this.y.toFixed(5) + "," + this.z.toFixed(5) + ")";
	}
}

function buildUI(obj){
    obj.setParameter("name","Wavy Extrude");
    
    obj.addParameterFloat("X-direction",0,-500,500,true,true);
    obj.addParameterFloat("Y-direction",0,-500,500, true, true);
    obj.addParameterFloat("Z-direction",-0.3,-500,500, true, true);
    
    obj.addParameterInt("sections",3,1,1000,true,true);
    obj.addParameterInt("sections spline",20,1,1000,true,true);
    
    obj.addParameterFloat("wave count",5,1,100,true,true);
    obj.addParameterFloat("wave start",0,-1000,1000,true,true);
    obj.addParameterFloat("wave scale start",0.3,-100,100,true,true);
    obj.addParameterFloat("wave scale end",0.3,-100,100,true,true);
    obj.addParameterSelector("scale type",["linear","x^2","-x^2"],false,true);
    obj.addParameterBool("close loop",0,0,1,true,true);
    obj.addParameterBool("flip",0,0,1,true,true);
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    
    obj.setParameter("smooth",2);
    obj.setCreatorObj(true);
}

function buildObject(obj){
    var core = obj.core();
    
    var childCount = obj.childCount();
    
    if (childCount > 0) {
        pth.length = 0;
        lst.length = 0;
        var c = obj.childAtIndex(0);
        if (c.family() == SPLINEFAMILY) {
            var p = c.modCore();
            if (p.pathCount() > 0) {
                p = p.cache(0);
                if (p != null) {
                    pth = p;
                    calcSplineLength(pth, lst);
                }
                // smooth
                obj.setParameter("normalType",obj.getParameter("smooth"),false);
                obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
                // draw polygons
                var i, j;
                var wc = obj.getParameter("wave count");
                var wstart = obj.getParameter("wave start");
                var wss = obj.getParameter("wave scale start");
                var wse = obj.getParameter("wave scale end");
                var stype = parseInt(obj.getParameter("scale type"));
                var clos = obj.getParameter("close loop");
                var flip = obj.getParameter("flip");
                //
                var secW = obj.getParameter("sections spline");
                var secH = obj.getParameter("sections");
                var secW_p = (clos)? 1/secW : 1/(secW-1)
                var i;
                var mat = c.objMatrix(); //c.obj2WorldMatrix();
                var movV = new Vec3D(obj.getParameter("X-direction"), obj.getParameter("Y-direction"), obj.getParameter("Z-direction"));
                var movLength = movV.norm();
                //
                var rtw = Math.PI/secW*wc;
                var ws_a = wss;
                var ws_b = 0.0;
                //
                var s1, s2;
                for (j = 0;j < secH;j++) {
                    switch(stype) {
                        case 0:
                            var rth = (wse-wss)/secH;
                            ws_b = (rth * (j+1)) + wss;
                            break;
                        case 1:
                            var rth = (wse-wss)/Math.pow(movLength,2);
                            ws_b = (Math.pow((movLength/secH)*(j+1),2) * rth)+wss;
                            break;
                        case 2:
                            var rth = (wse-wss)/Math.pow(movLength,2);
                            ws_b = -rth * Math.pow(movLength/secH*(j+1)-movLength,2)+wse;
                            break;
                    }
                    var movV1 = movV.multiply(j/secH);
                    var movV2 = movV.multiply((j+1)/secH);
                    
                    var ss1, ss2;
                    for (i = 0;i < secW;i++) {
                        var p1 = pointFromPercentage(pth,lst,i/secW);
                        var p2 = pointFromPercentage(pth,lst,(i+1)/secW)
                        
                        var p3 = p1.cross(p2);
                            p3 = p3.multiply(1/p3.norm());
                        var N = p2.sub(p1);
                            N = N.multiply(1/N.norm());
                        var C = mat.multiply(p1);
                        var V = N.cross(p3);
                        var r = Math.sin(i*rtw+wstart);
                        var a = ws_a * r;
                        var P1 = C.add(V.multiply(a));
                        P1 = P1.add(movV1);
                        var i1 = core.addVertex(true,P1);
                        //
                        var b = ws_b * r;
                        var P2 = C.add(V.multiply(b));
                        P2 = P2.add(movV2);
                        
                        var i2 = core.addVertex(true,P2);
                        
                        if (i > 0) {
                            var uv1 = new Vec2D(secW_p*(i-1), 1/secH*j);
                            var uv2 = new Vec2D(secW_p*(i-1), 1/secH*(j+1));
                            var uv3 = new Vec2D(secW_p*i, 1/secH*(j+1));
                            var uv4 = new Vec2D(secW_p*i, 1/secH*j);
                            var pi = core.addIndexPolygon(4, [s1,s2,i2,i1], [uv1, uv2, uv3, uv4]);
                            if (flip) core.flipWinding(pi);
                        } else {
                            ss1 = i1;
                            ss2 = i2;
                        }
                        if (clos && i == secW - 1) {
                            var uv1 = new Vec2D(secW_p*i, 1/secH*j);
                            var uv2 = new Vec2D(secW_p*i, 1/secH*(j+1));
                            var uv3 = new Vec2D(secW_p*(i+1), 1/secH*(j+1));
                            var uv4 = new Vec2D(secW_p*(i+1), 1/secH*j);
                            var pi = core.addIndexPolygon(4, [i1,i2,ss2,ss1], [uv1, uv2, uv3, uv4]);
                            if (flip) core.flipWinding(pi);
                        }
                        s1 = i1;
                        s2 = i2;
                    }
                    ws_a = ws_b;
                }
            }
        }
    }
}

/* this function from Loft.js by Todd */
//
function calcSplineLength(points,lst) {
	var l = points.length;
	var i;
	var accum = 0;
	lst[0] = 0;
	for(i=0;i<l-1;i++) {
		var p = points[i+1].sub(points[i]);
		accum = accum + Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z);
		lst[i+1] = accum;
	}
	for(i=0;i<l;i++) {
		lst[i] = lst[i]/accum;
	}
	return accum;
}
// percent must be >= 0 and <= 1
function pointFromPercentage(path,lst,percent) {
	while( percent < 0) percent += 1;
	while( percent > 1) percent -= 1;
	var i,hi = path.length-1 ,lo = 0;
	var d = percent;
	while(hi-lo > 1) {
		i = Math.floor((hi+lo)/2);
		if( percent <= lst[i]) {
			hi = i;
			continue;
		}
		if( percent > lst[i]) {
			lo = i;
		}
	}
	i = hi;
			
	var p1 = path[i-1];
	var p2 = path[i];
	//	convert d into a percentage between the two points
	d = (d - lst[i-1])/(lst[i] - lst[i-1]);
	p1 = p1.multiply(1-d).add(p2.multiply(d));
	return p1;
}

