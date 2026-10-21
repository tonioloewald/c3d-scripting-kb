// Source: https://www.cheetah3d.com/forum/index.php?threads/5130/post-36875
// Author: Herb (Cheetah3D forum), posted 2009-12-27
// Thread: "Bent Arrow"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Arrow.js
// (c) 2009 Herbert Looser
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a tube with arrow heads.
// Put into script folder Polygonobj
//


function buildUI(obj){
    obj.setParameter("name","Arrow");
    
//    obj.addParameterFloat("radius",1,0,1000,true,true);
    obj.addParameterFloat("length",1,0,1000,true,true);
    obj.addParameterInt("sections longitudinal",10,3,1000,true,true);
    obj.addParameterInt("sections height",1,1,1000,true,true);
    obj.addParameterFloat("diam_of_shaft",.03,0,1000,true,true);
    obj.addParameterFloat("diam_of_head (rel.)",2,0,1000,true,true);
    obj.addParameterFloat("L_of_head (rel.)",5,0,1000,true,true);
	obj.addParameterBool("heads on both sides",1,0,1,true,true);
// --------------------    
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
//    var ArcRadius		=obj.getParameter("radius");
    var Length			=obj.getParameter("length");
    var Segments		=obj.getParameter("sections longitudinal");
    var TubeStep		=Length/obj.getParameter("sections height");
    var Diam_of_Shaft 	=obj.getParameter("diam_of_shaft");
    var L_of_Head		=obj.getParameter("L_of_head (rel.)")*Diam_of_Shaft;
    var Diam_of_Head	=obj.getParameter("diam_of_head (rel.)")*Diam_of_Shaft;
	var BothSides		=obj.getParameter("heads on both sides");
	
    var StartHeadPosi	=L_of_Head;
    var EndHeadPosi		=Length-L_of_Head;
    var FirstTubePosi	=(Math.floor(StartHeadPosi/TubeStep)+1)*TubeStep;
    var LastTubePosi	=Math.floor(EndHeadPosi/TubeStep)*TubeStep;



// create arrow head at start or just a circle

	var tip = new Vec3D(0,0,0);

	if (BothSides) {
		//Konus Mantel
		var circle= CreateCircle(Diam_of_Head/2, Segments, StartHeadPosi);
		for (i = 1;i < Segments;i++) {
			core.addPolygon(3,true,[circle[i-1],circle[i],tip]);
        }
		core.addPolygon(3,true,[circle[Segments-1],circle[0],tip]);

		//Boden
		var circle1=CreateCircle(Diam_of_Shaft/2,Segments, StartHeadPosi);
		JoinPolygons(circle, circle1, Segments, core);
		circle=circle1;
	}
	else {
		FirstTubePosi=0.0;
		var circle=CreateCircle(Diam_of_Shaft/2,Segments, FirstTubePosi);
		core.addPolygon(circle.length,true,circle);
		FirstTubePosi=TubeStep;	// set posi for first segment
	}

// create the bent tube
	// Rohr
	TubePosi=FirstTubePosi;
	while (TubePosi<=LastTubePosi) {
		var circle1=CreateCircle(Diam_of_Shaft/2,Segments,TubePosi);
		JoinPolygons(circle, circle1, Segments, core);
		TubePosi=TubePosi+TubeStep;
		circle=circle1;
	}

// create the arrow head at the end
	//connection tube - arrow head
	var circle1= CreateCircle(Diam_of_Shaft/2,Segments,EndHeadPosi);
	JoinPolygons(circle, circle1, Segments, core);
	circle=circle1;

	// base of head
	var circle1= CreateCircle(Diam_of_Head/2,Segments,EndHeadPosi);
	JoinPolygons(circle, circle1, Segments, core);
	circle=circle1;

	//envelope of cone
	var trans=new Mat4D(TRANSLATE,0,Length,0);
	tip=trans.multiply(tip);
	for (i = 1;i < Segments;i++) {
		core.addPolygon(3,true,[circle[i],circle[i-1],tip]);
        }
	core.addPolygon(3,true,[circle[0],circle[Segments-1],tip]);
}



function CreateCircle(radius, segments, yposition)  {
    var	poly=new Array;
	var	trans=new Mat4D(TRANSLATE,0, yposition, 0);
	var	ang_i=0.0;
	var	vert=new Vec3D(0,0,0);
	for (i = 0;i < segments;i++) {
		ang_i = Math.PI*2.0*i/segments;
        vert= new Vec3D(radius*Math.sin(ang_i), 0, radius*Math.cos(ang_i));
		vert = trans.multiply(vert);
        poly.push(vert);
        }	
	return poly;
}


function JoinPolygons(circle, circle1, segments, coreobj) {
	for (i = 1;i < segments;i++) {
		coreobj.addPolygon(4,true,[circle[i],circle[i-1],circle1[i-1],circle1[i]]);
        }
	coreobj.addPolygon(4,true,[circle[0], circle[segments-1],circle1[segments-1], circle1[0]]);
}


function printVec3D(vec) {
    print('x:y:z-'+vec.x+':'+vec.y+':'+vec.z);
}

/*
		printVec3D(vert);
		print(rotangle);
*/