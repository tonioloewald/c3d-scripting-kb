// Source: https://www.cheetah3d.com/forum/index.php?threads/3342/post-23665
// Author: Spyder (Cheetah3D forum), posted 2008-07-20
// Thread: "Alignment and Center combined..."
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Alignment.js
//
//
//	Todd Rogers
//  feel free to modify to suit your needs
//	only tested with Cheetah3D  3.3
//
//	plus an idea for built in help for tools or other scripts

// no enums, so sue me
var xLOC	= 0;
var mxLOC	= 1;
var yLOC	= 2;
var	myLOC	= 3;
var zLOC	= 4;
var mzLOC	= 5;

function buildUI(tool){
    tool.addParameterSeparator("About/Help");
    tool.addParameterButton("","About","GiveInfo");
    tool.addParameterButton("","Help","AlignInfo");
	
    tool.addParameterSeparator("Alignment Selection");
    tool.addParameterButton("Select first object","Select","Select_Object");
    tool.addParameterSeparator("Alignment Methods");
    tool.addParameterButton("Alignment Method","X Centers","Align_XCenter");
	tool.addParameterButton("Alignment Method","Z Centers","Align_ZCenter");
    tool.addParameterButton("Alignment Method","Y Centers","Align_YCenter");
    tool.addParameterButton("Alignment Method","Tops","Align_Tops");
	tool.addParameterButton("Alignment Method","Bottoms","Align_Bottoms");
    tool.addParameterButton("Alignment Method","+X Sides","Align_PlusX");
    tool.addParameterButton("Alignment Method","-X Sides","Align_MinusX");
    tool.addParameterButton("Alignment Method","+Z Sides","Align_PlusZ");
    tool.addParameterButton("Alignment Method","-Z Sides","Align_MinusZ");
	tool.addParameterButton("Alignment Method", "-X to +X", "Align_MinusXtoPlusX");
	tool.addParameterButton("Alignment Method", "+X to -X", "Align_PlusXtoMinusX");
	tool.addParameterButton("Alignment Method", "-Z to +Z", "Align_MinusZtoPlusZ");
	tool.addParameterButton("Alignment Method", "+Z to -Z", "Align_PlusZtoMinusZ");
	tool.addParameterButton("Alignment Method", "-Y to +Y", "Align_MinusYtoPlusY");
	tool.addParameterButton("Alignment Method", "+Y to -Y", "Align_PlusYtoMinusY");
	tool.addParameterSeparator("Selected Object Axis Control");
	tool.addParameterButton("Center axis on","Object","DoObject");
}

//---------------------------------
//	about box and helps
function GiveInfo(tool){ 
	OS.messageBox("About","\
This is the Beta version of Alignment.\r\r\
Thanks to slugthog for giving me a challenge.\rBy Todd Rogers. \
");
}

function AlignInfo(tool){
	var what = 0;
	var flag = true;
	while(flag) {
		switch(what) {
		case 0:
	flag = OS.messageBox("Alignment Help","\
This is the Beta version of Alignment.\r\r\
First, select an object, then click on the button 'Select'.\r\r\
Click OK for more.\
");
			if(flag)
				what = 1;
			break;
		case 1:
	flag = OS.messageBox("Alignment Help","\
This is the Beta version of Alignment.\r\r\
Second,  select another object. Now by click on a method of alignment.\r\r\
Click OK for more.\
");
			if(flag)
				what = 2;
			break;
		case 2:
	flag = OS.messageBox("Alignment Help","\
This is the Beta version of Alignment.\r\r\
Third,  there is no third step, but this is an example of multipage help.\r\r\
Click Cancel to leave.\
");
			if(flag)
				what = 0;
			break;
		}
	}
}

//--------------------------
//	aligners
var theFirstObject = null;
var thePoints = new Array;;
function Select_Object(tool) {
	var doc = tool.document();
	if(doc.selectedObject() == null) {
		OS.beep();
		OS.messageBox("Error","Please select an object before pressing this button.");
		return;
	}
	// add more here to make sure its an object
	theFirstObject = doc.selectedObject();
	findThePoints(theFirstObject,thePoints);
}

function DoObject(tool) {
	// the passed in object is used to get the document
	var root = tool.document();
	// the root is then used to find the selected object
	var o = root.selectedObject();
	// if nothing is selected do nothing
	if( o == null)
		return;
	// now take the object and ask for the polyCore object
	// this is asking for the points of the object after any modiferies are applied
	var core = o.modCore();	
	// now that we have the core of the object, ask how many points are in it
	var size = core.vertexCount();
	// now set an accumalator to zero
	var loc = new Vec3D(0,0,0)
		
	var points = new Array;
	
	findThePoints(o, points);
	
	var difX = (points[mxLOC] + points[xLOC]) / 2;
	var difY = (points[myLOC] + points[yLOC]) / 2;
	var difZ = (points[mzLOC] + points[zLOC]) / 2;
	
	//print("xyz:" + difX + ", " + difY + ", " + difZ);
	
	loc.x = difX;
	loc.y = difY;
	loc.z = difZ;
	
	vertexloc = loc.sub(o.getParameter("position"));
	
	for(  i = 0; i < size;i++) {
		// take each point and subtract out the center
		var v = core.vertex(i).sub(vertexloc);
		// then reset the point to the new position
		
		core.setVertex(i,v);
		
	}
	// now to adjust the center of the object by adding the position

	o.setParameter("position",loc);
	
	// then tell cheetah to update the object
	o.update();
}

function Align_Tops(tool){ 
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		pos = theObject.getParameter("position");
		var dif = thePoints[yLOC] - points[yLOC];
		pos.y = pos.y + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_YCenter(tool) {
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		var pos = theObject.getParameter("position");
		var c1 = (thePoints[yLOC] + thePoints[myLOC])/2;
		var c2 = (points[yLOC] + points[myLOC])/2;
		var dif = c1 - c2;
		pos.y = pos.y + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_Bottoms(tool){ 
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		var pos = theObject.getParameter("position");
		var dif = thePoints[myLOC] - points[myLOC];
		pos.y = pos.y + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_PlusX(tool){ 
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		pos = theObject.getParameter("position");
		var dif = thePoints[xLOC] - points[xLOC];
		pos.x = pos.x + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_XCenter(tool) {
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		var pos = theObject.getParameter("position");
		var c1 = (thePoints[xLOC] + thePoints[mxLOC])/2;
		var c2 = (points[xLOC] + points[mxLOC])/2;
		var dif = c1 - c2;
		pos.x = pos.x + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_MinusX(tool){ 
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		pos = theObject.getParameter("position");
		var dif = thePoints[mxLOC] - points[mxLOC];
		//print(thePoints[mxLOC]+","+ points[mxLOC]);
		pos.x = pos.x + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_PlusZ(tool){ 
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		pos = theObject.getParameter("position");
		var dif = thePoints[zLOC] - points[zLOC];
		pos.z = pos.z + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_ZCenter(tool) {
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		var pos = theObject.getParameter("position");
		var c1 = (thePoints[zLOC] + thePoints[mzLOC])/2;
		var c2 = (points[zLOC] + points[mzLOC])/2;
		var dif = c1 - c2;
		pos.z = pos.z + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_MinusZ(tool){ 
	if( alignmentCheck(tool) == 1) {
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject,points);
		pos = theObject.getParameter("position");
		var dif = thePoints[mzLOC] - points[mzLOC];
		//print(thePoints[mzLOC]+","+ points[mzLOC]);
		pos.z = pos.z + dif;
		theObject.setParameter("position",pos);
		theObject.update();
	}
}

function Align_MinusXtoPlusX(tool)
{
	if( alignmentCheck(tool) == 1)
	{
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject, points);
		pos = theObject.getParameter("position");
		var dif = thePoints[mxLOC] - points[xLOC];
		pos.x = pos.x + dif;
		theObject.setParameter("position", pos);
		theObject.update();
	}
}
function Align_PlusXtoMinusX(tool)
{
	if( alignmentCheck(tool) == 1)
	{
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject, points);
		pos = theObject.getParameter("position");
		var dif = thePoints[xLOC] - points[mxLOC];
		pos.x = pos.x + dif;
		theObject.setParameter("position", pos);
		theObject.update();
	}
}
function Align_MinusZtoPlusZ(tool)
{
	if( alignmentCheck(tool) == 1)
	{
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject, points);
		pos = theObject.getParameter("position");
		var dif = thePoints[mzLOC] - points[zLOC];
		pos.z = pos.z + dif;
		theObject.setParameter("position", pos);
		theObject.update();
	}
}
function Align_PlusZtoMinusZ(tool)
{
	if( alignmentCheck(tool) == 1)
	{
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject, points);
		pos = theObject.getParameter("position");
		var dif = thePoints[zLOC] - points[mzLOC];
		pos.z = pos.z + dif;
		theObject.setParameter("position", pos);
		theObject.update();
	}
}
function Align_MinusYtoPlusY(tool)
{
	if( alignmentCheck(tool) == 1)
	{
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject, points);
		pos = theObject.getParameter("position");
		var dif = thePoints[myLOC] - points[yLOC];
		pos.y = pos.y + dif;
		theObject.setParameter("position", pos);
		theObject.update();
	}
}
function Align_PlusYtoMinusY(tool)
{
	if( alignmentCheck(tool) == 1)
	{
		var doc = tool.document();
		var theObject = doc.selectedObject();
		var points = new Array;
		findThePoints(theObject, points);
		pos = theObject.getParameter("position");
		var dif = thePoints[yLOC] - points[myLOC];
		pos.y = pos.y + dif;
		theObject.setParameter("position", pos);
		theObject.update();
	}
}



//---------------------------------
// program utils
function findThePoints(anObject,anArray) {
	// look over the points in the object and record the 
	// one farest up,dow,left,right,back and forth
	var baseCore = anObject.modCore();
	var baseVertCount = baseCore.vertexCount();
	
	var aMatrix = new Mat4D(TRANSLATE, 0,0,0);
	//aMatrix = aMatrix.multiply(anObject.objMatrix());
	aMatrix = aMatrix.multiply(anObject.obj2WorldMatrix());
	var vert = baseCore.vertex(0);
	//print("before ( "+vert.x+","+vert.y+","+vert.z+")");
	vert = aMatrix.multiply(vert);
	//print("after  ( "+vert.x+","+vert.y+","+vert.z+")");
	
	var plusX = vert.x;
	var minusX = vert.x;
	var plusY = vert.y;
	var minusY = vert.y;
	var plusZ = vert.z;
	var minusZ = vert.z;

	var i;
	for(i=1;i<baseVertCount;i++) {
		vert = aMatrix.multiply(baseCore.vertex(i));
		if(vert.x > plusX)	plusX	= vert.x;
		if(vert.x < minusX)	minusX	= vert.x;
		if(vert.y > plusY)	plusY	= vert.y;
		if(vert.y < minusY)	minusY	= vert.y;
		if(vert.z > plusZ)	plusZ	= vert.z;
		if(vert.z < minusZ)	minusZ	= vert.z;
//		print(i + ", ( "+vert.x+","+vert.y+","+vert.z+")");
	}
	
	anArray[xLOC]	= plusX;
	anArray[mxLOC]	= minusX;
	anArray[yLOC]	= plusY;
	anArray[myLOC]	= minusY;
	anArray[zLOC]	= plusZ;
	anArray[mzLOC]	= minusZ;
}

function alignmentCheck(tool) {
	if( theFirstObject == null) {
		OS.beep();
		OS.messageBox("Error","Please select a first object before pressing this button.");
		return 0;
	}
	var doc = tool.document();
	var theObject = doc.selectedObject();
	if(doc.selectedObject()	== theFirstObject) {
		OS.beep();
		OS.messageBox("Error","Please select a different object to align to.");
		return 0;
	}
	if( theObject == null) {
		OS.beep();
		OS.messageBox("Error","Please have an object selected first.");
		return 0;
	}
	return 1;
}