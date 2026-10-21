// Source: https://www.cheetah3d.com/forum/index.php?threads/1801/post-12224
// Author: MrTAToad (Cheetah3D forum), posted 2007-06-09
// Thread: "Grid objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// This script is designed to create a grid of boxes of a given scale
// Written by Nicholas Kingsley

var gridXObject="Max Columns";
var gridYObject="Max Rows";
var xScale="X Scale";
var yScale="Y Scale";
var zScale="Z Scale";
var xStep="X Step";
var zStep="Z Step";
var justBorder="Only Border ?";
var groupObject="Group Objects ?";

function buildUI(tool)
{
	tool.addParameterSeparator("Grid Object.js");
	tool.addParameterInt(gridXObject,8,1,256,false,true);
	tool.addParameterInt(gridYObject,8,1,256,false,true);
	tool.addParameterFloat(xScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(yScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(zScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(xStep,0.0,-256.0,256.0,false,true);
	tool.addParameterFloat(zStep,0.0,-256.0,256.0,false,true);
	tool.addParameterBool(justBorder,false,false,true,false,true);
	tool.addParameterBool(groupObject,false,false,true,false,true);
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
var process;
var child;
var pos;

	doc=tool.document();
	root=doc.root();
	child=null;
	pos=0;
				
	zPos=0.0;
	for (y=0; y<tool.getParameter(gridYObject); y++)
	{
		xPos=0.0;
		for (x=0; x<tool.getParameter(gridXObject); x++)
		{
			process=true;
			if (tool.getParameter(justBorder)==true)
			{
				if (x>0 && y>0 && x<tool.getParameter(gridXObject)-1 && y<tool.getParameter(gridYObject)-1)
				{
					process=false;
				}
			}
				
			if (process)
			{
				obj=doc.addObject(BOX);			
				obj.setParameter("scale",new Vec3D(tool.getParameter(xScale),tool.getParameter(yScale),tool.getParameter(zScale)));
				obj.setParameter("position",new Vec3D(xPos,0.0,zPos));
				
				if (tool.getParameter(groupObject))
				{
					if (x==0 && y==0)
					{
						child=obj;
					}
					else
					{
						if (child)
						{
							child.addChildAtIndex(obj,pos);
						}
					}
					
					pos++;
				}
						
				obj.update();
			}
			
			xPos+=tool.getParameter(xScale)+tool.getParameter(xStep);
		}
		
		zPos+=tool.getParameter(zScale)+tool.getParameter(zStep);
	}
}