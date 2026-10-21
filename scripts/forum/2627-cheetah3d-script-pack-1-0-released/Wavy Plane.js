// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Wavy Plane.js
//  (c) 2006 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp
//  
// 
//  current: v.20060515
// 2006-05-12 : first version.
// 2006-05-13 : change wave count type (Integer to Float). optimize culclation, little bit speed up.
// 2006-05-13b : add new variable 'wave start'.
// 2006-05-15 : add new vriable 'scale type'.

// I checked it with version.2.6.1 and version.3.2.
// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Script -> Polygon Script
//

function buildUI(obj){
    obj.setParameter("name","Wavy Plane");
    
    obj.addParameterFloat("width",1,0,500,true,true);
    obj.addParameterFloat("height",1,0,500, true, true);
    
    obj.addParameterInt("section width",6,1,1000,true,true);
    obj.addParameterInt("section height",6,1,1000,true,true);
    
    obj.addParameterFloat("wave count",2,1,100,true,true);
    obj.addParameterFloat("wave start",0,-100,100,true,true);
    obj.addParameterFloat("wave scale start",0.3,-100,100,true,true);
    obj.addParameterFloat("wave scale end",0.3,-100,100,true,true);
    obj.addParameterInt("scale type",0,0,2,false,true);
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterInt("smooth type", 1,0,2,true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    obj.addParameterButton("set smooth","Set","setSmooth");
    
    setSmooth(obj);       
    
    obj.setParameter("normalType",1);
}

function setSmooth(obj) {
    var normalType = obj.getParameter("smooth type");
    var normalAngle = obj.getParameter("smooth angle");
    
    obj.setParameter("normalType",normalType);
    obj.setParameter("normalAngle",normalAngle);
    
    normalType = obj.getParameter("normalType");
    normalAngle = obj.getParameter("normalAngle");
}

function buildObject(obj){
    var core = obj.core();
    
    var i, j;
    var width = obj.getParameter("width");
    var height = obj.getParameter("height");
    
    var sec_w = obj.getParameter("section width");
    var sec_h = obj.getParameter("section height");
    
    var wc = obj.getParameter("wave count");
    var wstart = obj.getParameter("wave start");
    var wss = obj.getParameter("wave scale start");
    var wse = obj.getParameter("wave scale end");
    var stype = obj.getParameter("scale type");
    
    var verts = new Array();
    var uvs = new Array();
    
    var width_t = width / sec_w;
    var height_t = height / sec_h;
    var width_1t = 1/sec_w;
    var height_1t = 1/sec_h;
    
    var rth;
    if (stype == 0) {
        rth = (wse - wss) / sec_h;    
    } else if (stype == 1) {
        rth = (wse - wss) / Math.pow(height,2);
    } else {
        rth = (wse - wss) / Math.pow(height,2);
    }
    
    var rtw = Math.PI/sec_w*wc;
    
    //print("width_t:"+width_t+",height_t:"+height_t);
    
    core.buildVertexBSP(new Vec3D(0,0,-2.0), new Vec3D(width, height, 2.0));
    
    var y_a1 = 0.0;
    var y_a2 = 0.0;
    var y_b1 = 0.0;
    var y_b2 = 0.0;
    var ws_a = 0.0;
    var ws_b = 0.0;
    
    verts[0] = new Vec3D(0,0,0);
    verts[1] = new Vec3D(0,0,0);
    verts[2] = new Vec3D(0,0,0);
    verts[3] = new Vec3D(0,0,0);
    
    uvs[0] = new Vec2D(0,0);
    uvs[1] = new Vec2D(0,0);
    uvs[2] = new Vec2D(0,0);
    uvs[3] = new Vec2D(0,0);
    
    ws_a = wss;
    for (j = 0;j < sec_h;j++) {
        if (stype == 0) {
            ws_b = (rth * (j+1)) + wss;
        } else if (stype == 1) {
            ws_b = (Math.pow(height_t*(j+1),2) * rth) + wss;
        } else {
            ws_b = -rth * Math.pow(height_t*(j+1)-height,2) + wse;
        }
        y_a1 = Math.sin(wstart)*ws_a;
        y_a2 = Math.sin(wstart)*ws_b;
        for (i = 0;i < sec_w;i++) {
            y_b1 = Math.sin(rtw*(i+1)+wstart)*ws_a;
            y_b2 = Math.sin(rtw*(i+1)+wstart)*ws_b;
            
            /*
            verts[0] = new Vec3D(width_t * (i + 1), y_b1, height_t * j);
            verts[1] = new Vec3D(width_t * (i + 1), y_b2, height_t * (j + 1));
            verts[2] = new Vec3D(width_t * i, y_a2, height_t * (j + 1));
            verts[3] = new Vec3D(width_t * i, y_a1, height_t * j);
            */
            
            verts[0].x = width_t * (i+1);
            verts[0].y = y_b1;
            verts[0].z = height_t * j;
            
            verts[1].x = width_t * (i+1);
            verts[1].y = y_b2;
            verts[1].z = height_t * (j+1);
            
            verts[2].x = width_t * i;
            verts[2].y = y_a2;
            verts[2].z = height_t * (j+1);

            verts[3].x = width_t * i;
            verts[3].y = y_a1;
            verts[3].z = height_t * j;
            
            /*
            uvs[0] = new Vec2D(width_1t*(i+1), height_1t*j);
            uvs[1] = new Vec2D(width_1t*(i+1), height_1t*(j+1));
            uvs[2] = new Vec2D(width_1t*i, height_1t*(j+1));
            uvs[3] = new Vec2D(width_1t*i, height_1t*j);
            */
            
            uvs[0].x = width_1t*(i+1);
            uvs[0].y = height_1t*j;
            
            uvs[1].x = width_1t*(i+1);
            uvs[1].y = height_1t*(j+1);

            uvs[2].x = width_1t*i;
            uvs[2].y = height_1t*(j+1);

            uvs[3].x = width_1t*i;
            uvs[3].y = height_1t*j;

            core.addPolygon(4,true,verts,uvs);
            
            y_a1 = y_b1;
            y_a2 = y_b2;
        }
        ws_a = ws_b;
    }
    
    core.destroyVertexBSP();
}



