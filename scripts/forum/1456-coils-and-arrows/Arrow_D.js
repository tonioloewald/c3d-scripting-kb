// Source: https://www.cheetah3d.com/forum/index.php?threads/1456/post-9193
// Author: Herb (Cheetah3D forum), posted 2007-03-25
// Thread: "Coils and Arrows"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// arrow_D.js
// (c) 2006 Herbert Looser
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates an arrow with heads on both sides.
//


function buildUI(obj){
    obj.setParameter("name","ArrowD");
    
    obj.addParameterInt("segments",30,3,1000,true,true);
    obj.addParameterFloat("length",1,0,1000,true,true);
    obj.addParameterFloat("L_of_head",.3,0,1000,true,true);
    obj.addParameterFloat("diam_of_shaft",.1,0,1000,true,true);
    obj.addParameterFloat("diam_of_head",.25,0,1000,true,true);
    
    obj.addParameterSeparator("Smooth");
    obj.addParameterInt("smooth type", 2,0,2,true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    obj.addParameterButton("set smooth","Set","setSmooth");
    setSmooth(obj);
}


function setSmooth(obj) {
    normalType = obj.getParameter("smooth type");
    normalAngle = obj.getParameter("smooth angle");
    
    obj.setParameter("normalType",normalType);
    obj.setParameter("normalAngle",normalAngle);
}

function buildObject(obj){
    var core=obj.core();
    var i;
    
    //get current parameter values
    segments		=obj.getParameter("segments");
    Length			=obj.getParameter("length");
    L_of_head		=obj.getParameter("L_of_head");
    diam_of_shaft 	=obj.getParameter("diam_of_shaft");
    diam_of_head	=obj.getParameter("diam_of_head");

//	core.buildVertexBSP(new Vec3D(-2.0,-2.0,-2.0) ,new Vec3D(2.0,2.0,2.0));


// Bodenflche
    var	poly=new Array; 
	for (i = 0;i < segments;i++) {
        var ang_i = Math.PI*2.0*i/segments;
        var vert = new Vec3D(diam_of_shaft/2*Math.sin(ang_i),L_of_head,diam_of_shaft/2*Math.cos(ang_i));
        poly.push(vert);
        }
    core.addPolygon(poly.length,true,poly);
    

// Deckflche Zylinder    
    var	poly1=new Array;
    for (i = (segments-1);i > -1;i--) {
        var ang_i = Math.PI*2.0*i/segments;
        var vert = new Vec3D(diam_of_shaft/2*Math.sin(ang_i),Length-L_of_head,diam_of_shaft/2*Math.cos(ang_i));
        poly1.push(vert);
        }
	core.addPolygon(poly1.length,true,poly1);

//Seitenflchen	
	var j;
	for (i = 0;i < segments;i++) {
		j=i+1;
		if (j>(segments-1)) { j=0;}
		core.addPolygon(4,true,[ poly[poly.length-1-i], poly[poly.length-1 -j], poly1[j], poly1[i] ]);
		}

	core.deletePolygon(1);

//Boden des Kopfes	
    var	poly=new Array;
    for (i = 0;i < segments;i++) {
        var ang_i = Math.PI*2.0*i/segments;
        var vert = new Vec3D(diam_of_head/2*Math.sin(ang_i),Length-L_of_head,diam_of_head/2*Math.cos(ang_i));
        poly.push(vert);
        }
    core.addPolygon(poly.length,true,poly);

//Rest vom Kopf	
	var vert = new Vec3D(0,Length,0);
	for (i = 0;i < segments;i++) {
		j=i+1;
		if (j>(segments-1)) { j=0;}
		core.addPolygon(3,true,[poly[j], poly[i], vert]);
		}

//Boden des Kopfes 2	
    var	poly=new Array;
    for (i = 0;i < segments;i++) {
        var ang_i = Math.PI*2.0*i/segments;
        var vert = new Vec3D(diam_of_head/2*Math.sin(ang_i),L_of_head,diam_of_head/2*Math.cos(ang_i));
        poly.push(vert);
        }
    poly.reverse();
    core.addPolygon(poly.length,true,poly);

//Rest vom Kopf	
	var vert = new Vec3D(0,0,0);
	for (i = 0;i < segments;i++) {
		j=i+1;
		if (j>(segments-1)) { j=0;}
		core.addPolygon(3,true,[poly[j], poly[i], vert]);
		}
	
	core.deletePolygon(0);



}


