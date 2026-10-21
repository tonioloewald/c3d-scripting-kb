// Source: https://www.cheetah3d.com/forum/index.php?threads/5130/post-36875
// Author: Herb (Cheetah3D forum), posted 2009-12-27
// Thread: "Bent Arrow"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Arc_Arrow.js
// (c) 2006 Herbert Looser
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Creates a circular tube with arrow heads.
//


function buildUI(obj){
    obj.setParameter("name","ArcArrow");
    
    obj.addParameterFloat("radius",1,0,1000,true,true);
    obj.addParameterFloat("angle",180,0,360,true,true);
    obj.addParameterInt("sections longitudinal",10,3,1000,true,true);
    obj.addParameterInt("sections height",50,1,1000,true,true);
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
    var ArcRadius		=obj.getParameter("radius");
    var Angle			=obj.getParameter("angle")/180*Math.PI;
    var Segments		=obj.getParameter("sections longitudinal");
    var AngleStep		=Angle/obj.getParameter("sections height");
    var Diam_of_Shaft 	=obj.getParameter("diam_of_shaft");
    var L_of_Head		=obj.getParameter("L_of_head (rel.)")*Diam_of_Shaft;
    var Diam_of_Head	=obj.getParameter("diam_of_head (rel.)")*Diam_of_Shaft;
	var BothSides		=obj.getParameter("heads on both sides");
	
    var StartHeadAngle	=L_of_Head/ArcRadius;
    var EndHeadAngle	=Angle-StartHeadAngle;
    var FirstTubeAngle	=(Math.floor(StartHeadAngle/AngleStep)+1)*AngleStep;
    var LastTubeAngle	=Math.floor(EndHeadAngle/AngleStep)*AngleStep;


// create arrow head at start or just a circle

	var tip = new Vec3D(ArcRadius,0,0);

	if (BothSides) {
		//envelope of cone
		var circle= CreateCircle(Diam_of_Head/2, Segments, ArcRadius, StartHeadAngle);
		for (i = 1;i < Segments;i++) {
			core.addPolygon(3,true,[circle[i-1],circle[i],tip]);
        }
		core.addPolygon(3,true,[circle[Segments-1],circle[0],tip]);

		//Base
		var circle1=CreateCircle(Diam_of_Shaft/2,Segments,ArcRadius, StartHeadAngle);
		JoinPolygons(circle, circle1, Segments, core);
		circle=circle1;
	}
	else {
		TubeAngle=0.0;
		var circle=CreateCircle(Diam_of_Shaft/2,Segments, ArcRadius, TubeAngle);
		core.addPolygon(circle.length,true,circle);
		FirstTubeAngle=AngleStep;	// set angle for first segment
	}

// create the bent tube
	TubeAngle=FirstTubeAngle;
	while (TubeAngle<=LastTubeAngle) {
		var circle1=CreateCircle(Diam_of_Shaft/2,Segments,ArcRadius,TubeAngle);
		JoinPolygons(circle, circle1, Segments, core);
		TubeAngle=TubeAngle+AngleStep;
		circle=circle1;
	}

// create the arrow head at the end
	//connection tube to arrow head
	var circle1= CreateCircle(Diam_of_Shaft/2,Segments,ArcRadius,EndHeadAngle);
	JoinPolygons(circle, circle1, Segments, core);
	circle=circle1;

	// base of head
	var circle1= CreateCircle(Diam_of_Head/2,Segments,ArcRadius,EndHeadAngle);
	JoinPolygons(circle, circle1, Segments, core);
	circle=circle1;

	//envelope of cone
	var rot=new Mat4D(ROTATE,0,Angle*180/Math.PI,0);
	tip=rot.multiply(tip);
	for (i = 1;i < Segments;i++) {
		core.addPolygon(3,true,[circle[i],circle[i-1],tip]);
        }
	core.addPolygon(3,true,[circle[0],circle[Segments-1],tip]);
}



function CreateCircle(radius, segments, xposition, rotangle)  {
    var	poly=new Array;
	var	trans=new Mat4D(TRANSLATE, xposition, 0, 0);
	var	rot=new Mat4D(ROTATE, 0, rotangle*180/Math.PI, 0);
	var	ang_i=0.0;
	var	vert=new Vec3D(0,0,0);
	for (i = 0;i < segments;i++) {
		ang_i = Math.PI*2.0*i/segments;
        vert= new Vec3D(radius*Math.sin(ang_i),radius*Math.cos(ang_i),0);
		vert = trans.multiply(vert);
		vert= rot.multiply(vert);
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