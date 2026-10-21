// Source: https://www.cheetah3d.com/forum/index.php?threads/1801/post-12207
// Author: MrTAToad (Cheetah3D forum), posted 2007-06-08
// Thread: "Grid objects"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var gridXObject="Max Columns";
var gridYObject="Max Rows";
var xScale="X Scale";
var yScale="Y Scale";
var zScale="Z Scale";

function buildUI(tool)
{
	tool.addParameterSeparator("Grid Object.js");
	tool.addParameterInt(gridXObject,8,1,256,false,true);
	tool.addParameterInt(gridYObject,8,1,256,false,true);
	tool.addParameterFloat(xScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(yScale,1.0,0.1,256.0,false,true);
	tool.addParameterFloat(zScale,1.0,0.1,256.0,false,true);
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
var pos;
var child;

	doc=tool.document();
	root=doc.root();
	pos=0;
	child=null;
		
	for (y=0; y<tool.getParameter(gridYObject); y++)
	{
		for (x=0; x<tool.getParameter(gridXObject); x++)
		{
			obj=doc.addObject(BOX);			
			obj.setParameter("scale",new Vec3D(tool.getParameter(xScale),tool.getParameter(yScale),tool.getParameter(zScale)));
			obj.setParameter("position",new Vec3D(tool.getParameter(xScale)*x,0.0,tool.getParameter(zScale)*y));
			
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
	}
}