// Source: https://www.cheetah3d.com/forum/index.php?threads/1801/post-12214
// Author: MrTAToad (Cheetah3D forum), posted 2007-06-08
// Thread: "Grid objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var gridXObject="Max Columns";
var gridYObject="Max Rows";
var xScale="X Scale";
var yScale="Y Scale";
var zScale="Z Scale";
var xStep="X Step";
var yStep="Y Step";

function buildUI(tool)
{
	tool.addParameterSeparator("Grid Object.js");
	tool.addParameterInt(gridXObject,8,1,256,false,true);
	tool.addParameterInt(gridYObject,8,1,256,false,true);
	tool.addParameterFloat(xScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(yScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(zScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(xStep,0.0,-256.0,256.0,false,true);
	tool.addParameterFloat(yStep,0.0,-256.0,256.0,false,true);
	tool.addParameterButton("Apply","Apply","apply");
}

function apply(tool)
{
var y;
var x;
var box;
var obj;
var root;
var doc;
var xPos;
var zPos;

	doc=tool.document();
	root=doc.root();
		
	zPos=0.0;
	for (y=0; y<tool.getParameter(gridYObject); y++)
	{
		xPos=0.0;
		for (x=0; x<tool.getParameter(gridXObject); x++)
		{
			obj=doc.addObject(BOX);			
			obj.setParameter("scale",new Vec3D(tool.getParameter(xScale),tool.getParameter(yScale),tool.getParameter(zScale)));
			obj.setParameter("position",new Vec3D(xPos,0.0,zPos));
			xPos+=tool.getParameter(xScale)+tool.getParameter(xStep);
		}
		
		zPos+=tool.getParameter(yScale)+tool.getParameter(yStep);
	}
}