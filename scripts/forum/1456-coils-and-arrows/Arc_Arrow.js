// Source: https://www.cheetah3d.com/forum/index.php?threads/1456/post-72163
// Author: Herb (Cheetah3D forum), posted 2012-07-24
// Thread: "Coils and Arrows"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------

// Arc_Arrow.js
// (c) 2006 Herbert Looser

// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.

// Purpose: 
// Creates a circular tube with arrow heads.
// uv coords are set such that the heads receive each 5% of the top and bottom of the texture
// in order to have them easily in the same color

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
//	--------------------    
	obj.addParameterSeparator("Smooth");
	obj.addParameterInt("smooth type", 2,0,2,true,true);
	obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
	obj.addParameterButton("set smooth","Set","setSmooth");
	setSmooth(obj);
}
//***********************

function setSmooth(obj) {
	normalType = obj.getParameter("smooth type");
	normalAngle = obj.getParameter("smooth angle");
	obj.setParameter("normalType",normalType);
	obj.setParameter("normalAngle",normalAngle);
}
//***********************

function buildObject(obj){
	var core=obj.core();
	var i;
	var BothSides=0;

	//get current parameter values
	var ArcRadius			= obj.getParameter("radius");
	var AngleDeg			= obj.getParameter("angle");
	var Angle				= AngleDeg/180*Math.PI;
	var Segments			= obj.getParameter("sections longitudinal");
	var Diam_of_Shaft 		= obj.getParameter("diam_of_shaft");
	var L_of_Head			= obj.getParameter("L_of_head (rel.)")*Diam_of_Shaft;
	var Diam_of_Head		= obj.getParameter("diam_of_head (rel.)")*Diam_of_Shaft;
	if ( obj.getParameter("heads on both sides") )	{ BothSides = 1};
	var N_AngleSteps		= obj.getParameter("sections height");

	var dphiTube			= ( Angle-(1+BothSides)*L_of_Head/ArcRadius )/N_AngleSteps;
	var dphiDeg				= dphiTube*180/Math.PI;	//TubeStep
	var HeadAngle			= L_of_Head/ArcRadius*180/Math.PI;	
	var TransRot			= new Mat4D(TRANSLATE, ArcRadius, 0 ,0);
	TransRot				= TransRot.multiply(new Mat4D(ROTATE, -90,0,0));
	var StartTip			= new Vec3D(ArcRadius,0,0);
	var EndTip				= new Vec3D(ArcRadius*Math.cos(Angle), ArcRadius*Math.sin(Angle), 0);
	var StartHeadCircMat	= new Mat4D(ROTATE, 0, HeadAngle*BothSides , 0).multiply(TransRot);
	var EndHeadCircMat		= new Mat4D(ROTATE, 0, AngleDeg-HeadAngle, 0).multiply(TransRot);
//	var EndHeadCircMat		= new Mat4D(ROTATE, 0, 170, 0).multiply(TransRot);
	var TubeStepMat			= new Mat4D(ROTATE, 0, dphiDeg, 0);
	
	// create and position the circles
	var StartHeadCircle 	= rotateVertexArray(createCircle(Diam_of_Head/2, Segments), StartHeadCircMat);
	var EndHeadCircle		= rotateVertexArray(createCircle(Diam_of_Head/2, Segments), EndHeadCircMat);
	var firstTubeCircle 	= rotateVertexArray(createCircle(Diam_of_Shaft/2, Segments), StartHeadCircMat);

	// prepare UV Settings
	var uTip				= 0.01; // value 0.01 to make the tip not getting colors from wrapping around
	var uStartCirc 			= 0.03;
	var uFirstTube			= 0.05; // on both sides of the texture, 5% is used for the tip
	var UV_Circle			= createUV_Circle(Segments);
	var StartUV_Circle		= shift_UV_Circle(UV_Circle,uStartCirc);
	var EndUV_Circle		= shift_UV_Circle(UV_Circle,1-uStartCirc);
	var FirstTubeUV			= shift_UV_Circle(UV_Circle, uFirstTube);

	// Create the lower cone or circle, depending on BothSides=True or False
	if (BothSides) {
		LowerCone(StartTip, StartHeadCircle, uTip, StartUV_Circle, core);
		connectCircles(StartHeadCircle, firstTubeCircle, StartUV_Circle, FirstTubeUV, core);
	}
	else {
		LowerCone(StartTip, firstTubeCircle, uTip, StartUV_Circle, core);
	} 

	// Create the shaft
	var lowerTubeCircle 	= copyVertexArray(firstTubeCircle);
	var lowerUV_C 			= copyUV_Array(FirstTubeUV);
	for (i=0; i< N_AngleSteps; i++) {
		var upperTubeCircle = rotateVertexArray(lowerTubeCircle, TubeStepMat);
		var upperUV_C 		= shift_UV_Circle(lowerUV_C, (1-2*uFirstTube)/N_AngleSteps);
		connectCircles(lowerTubeCircle, upperTubeCircle, lowerUV_C, upperUV_C, core);
		lowerTubeCircle 	= copyVertexArray(upperTubeCircle);
		lowerUV_C 			= copyUV_Array(upperUV_C);
	}

	// create the upper cone
	connectCircles(lowerTubeCircle, EndHeadCircle, lowerUV_C, EndUV_Circle, core);
	UpperCone(EndTip, EndHeadCircle, 1-uTip, EndUV_Circle, core);
}

//***********************
function LowerCone(Tip, Circle, uTip, UV_Circle, core) {
	var Tip_UV = new Vec2D(.5, uTip);
	var Wrap_U = new Vec2D(1, UV_Circle[0].y);
	var Npts=Circle.length;
	for (i = 1;i < Npts; i++) {
		core.addPolygon(3,true,[Circle[i-1],Circle[i],Tip], [UV_Circle[i-1], UV_Circle[i],Tip_UV] );
	}
	core.addPolygon(3,true,[Circle[Npts-1],Circle[0],Tip],[UV_Circle[Npts-1],Wrap_U,Tip_UV]);
}

//***********************
function UpperCone(Tip, Circle, uTip, UV_Circle, core) {
	var Tip_UV = new Vec2D(0.5, uTip);
	var Wrap_U = new Vec2D(1,UV_Circle[0].y);
	var Npts=Circle.length;
	for (i = 1;i < Npts; i++) {
		core.addPolygon(3,true,[Circle[i],Circle[i-1],Tip], [UV_Circle[i], UV_Circle[i-1],Tip_UV] );
	}
	core.addPolygon(3,true,[Circle[0],Circle[Npts-1],Tip], [Wrap_U,UV_Circle[Npts-1],Tip_UV]);
}

//***********************
function connectCircles(Circle1, Circle2, UV_C1, UV_C2, core){
	var Npts = Circle1.length;
	var Wrap_C1 = new Vec2D(1,0).add(UV_C1[0]);
	var Wrap_C2 = new Vec2D(1,0).add(UV_C2[0]);
	var Polygon = new Array; 												// introduced for readability
	var UVCoords = new Array;
	for (i = 1;i < Npts; i++) {
		Polygon.push( Circle1[i],Circle1[i-1],Circle2[i-1],Circle2[i] ); 	// prepare
		UVCoords.push( UV_C1[i], UV_C1[i-1], UV_C2[i-1], UV_C2[i] );
		core.addPolygon(4,true,Polygon, UVCoords); 							// write Polygon to core
		Polygon = [];
		UVCoords = [];
	}
	Polygon.push( Circle1[0], Circle1[Npts-1],Circle2[Npts-1], Circle2[0]);
	UVCoords.push(Wrap_C1, UV_C1[Npts-1], UV_C2[Npts-1], Wrap_C2);
	core.addPolygon(4,true,Polygon, UVCoords);
}

//***********************
function rotateVertexArray(vertices, rot) {
	var	shiftedVertices = new Array;
	for (i=0; i<vertices.length; i++) {
		shiftedVertices.push(rot.multiply(vertices[i]));
	}
	return shiftedVertices;
}
//***********************

function copyVertexArray(vertices) {
	var VertArrayCopy = new Array;
	for (i=0; i< vertices.length; i++) {
		VertArrayCopy.push(vertices[i]);
	}
	return VertArrayCopy;
}
//***********************

function createCircle(radius, segments)  {
	var	CircleVertices=new Array;
	var dphi=Math.PI*2.0/segments;
	for (i = 0;i < segments;i++) {
		CircleVertices.push(new Vec3D(radius*Math.sin(i*dphi), 0, radius*Math.cos(i*dphi)));
	}	
	return CircleVertices;
}

// UV-functions
function createUV_Circle(segments) {
	var UV_Circle = new Array;
	for (i=0; i<segments; i++) {
		UV_Circle.push(new Vec2D(i/segments,0));
	}
	return UV_Circle;
}
//***********************

function shift_UV_Circle(UV_Circle, dV) {
	var shiftedUV_Circle = new Array;
	var uvTransl = new Vec2D(0,dV);
	for (i=0; i < UV_Circle.length; i++) {
		shiftedUV_Circle.push(UV_Circle[i].add(uvTransl));
	}
	return shiftedUV_Circle;
}
//***********************

function copyUV_Array(UV_Array) {
	var UVArrayCopy = new Array;
	for (i=0; i< UV_Array.length; i++) {
		UVArrayCopy.push(UV_Array[i]);
	}
	return UVArrayCopy;
}
//***********************

function printVec3D(vec) {
	print('x:y:z-  '+vec.x+' : '+vec.y+' : '+vec.z);
}

function printVec2D(vec) {
	print('x:y:z-  '+vec.x+' : '+vec.y);
}