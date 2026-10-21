# Grid objects

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1801/
- Subforum: script-downloads
- Started by **MrTAToad** on 2007-06-08; last post 2007-06-09; 11 posts

## #1 — MrTAToad — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12207>

Grid objects

This script will grid boxes of a given scale, so that they all appear in a grid formation :

	
	


```js
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
```

## #2 — frank beckmann — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12208>

Hi MrTAToad.
Thank you for the script. Nice one.
One thing thou. If I scale my box other than 1:1:1, maybe 1:3:0.5 I get one special box. Do you expect this?

With kindest regards
Frank

Attachments: [BoxGrid.png](https://www.cheetah3d.com/forum/index.php?attachments/2575/)

## #3 — MrTAToad — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12209>

No, I wasn't expecting that - I found that it seems to be something to do with the adding to child function.

If you use this instead, it works fine :

	
	


```js
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
			
//			if (x==0 && y==0)
//			{
//				child=obj;
//			}
//			else
//			{
//				if (child)
//				{
//					child.addChildAtIndex(obj,pos);
//				}
//			}
			
			pos++;

		}
	}
}
```


Unfortunately you then have to do all the grouping yourself. 

I'll see if anyone knows what the problem is (probably using the child function improperly or something).  Unfortunately the documentation doesn't help much there.

## #4 — frank beckmann — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12211>

[[QUOTE:  MrTAToad said: No, I wasn't expecting that - I found that it seems to be something to do with the adding to child function. Unfortunately you then have to do all the grouping yourself. I'll have to f]]

Thanks, works fine now. Grouping is just 3 clicks and I do prefer to do that manually, than have one "mother" and a tail of children;-)

With indest regards
Frank

Just for the challenge: One can think upon numerically adjustable holes between the boxes?

## #5 — DaVinci — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12212>

Would you mind adding a screenshot of what the script's result looks like to the first post?

## #6 — frank beckmann — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12213>

Now there´s no "vagabonding" box anymore.

Frank

Attachments: [BoxGriddy.png](https://www.cheetah3d.com/forum/index.php?attachments/2576/)

## #7 — MrTAToad — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12214>

[[QUOTE:  Just for the challenge: One can think upon numerically adjustable holes between the boxes? Click to expand... ]]
Should be easy to do a step value.

Okay, here it is :

	
	


```js
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
```


This generates a gap between each block.

## #8 — frank beckmann — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12223>

Cool - it´s working. Sorry for one thing thou. Wouldn´t you expect the same gap by the same "step" space?
Thanx again.

Frank

Attachments: [Griddy.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/2577/)

## #9 — MrTAToad — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12224>

Okay - one final update :

First off, there was a mixup with the Z & Y values - that should sort the step problem (although it wont fix the grouping problem with the original scaling values).  I've now added the option to just do the borders of the grid, and the option to group the grid.

	
	


```js
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
```

## #10 — frank beckmann — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12226>

Wow. Perfect.
I like the new "Border" function.

With kindest regards
Frank

Attachments: [Grid1.png](https://www.cheetah3d.com/forum/index.php?attachments/2578/)

## #11 — MrTAToad — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1801/post-12227>

I do want to get the grouping thing working - that would sort everything...

Okay, I think I've finally got the group positions sorted :

	
	


```js
// This script is designed to create a grid of boxes of a given scale
// Written by Nicholas Kingsley
// Version 1.04 - Fix object size when grouping them.  As child scales are affected by the parent, it seems that we just need to use a scale of 1.0,1.0,1.0
//					after setting the parent scale.
// 					The grouping problem does however affect child positioning if the Z scale!=1.0
//					To get around this, it appears that, as the scale is 1.0,1.0,1.0, we position in increments of 1.0,0.0,1.0

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
				
				if (x==0 && y==0 || tool.getParameter(groupObject)==false)
				{
					obj.setParameter("scale",new Vec3D(tool.getParameter(xScale),tool.getParameter(yScale),tool.getParameter(zScale)));
				}
				else
				{
					obj.setParameter("scale",new Vec3D(1.0,1.0,1.0));
				}
				
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
				
				obj.setParameter("position",new Vec3D(xPos,0.0,zPos));	
				obj.update();
			}
			
			if (tool.getParameter(groupObject))
			{
				xPos+=1.0+tool.getParameter(xStep);
			}
			else
			{
				xPos+=tool.getParameter(xScale)+tool.getParameter(xStep);
			}
		}
		
		if (tool.getParameter(groupObject))
		{
			zPos+=1.0+tool.getParameter(zStep);
		}
		else
		{
			zPos+=tool.getParameter(zScale)+tool.getParameter(zStep);
		}
	}
}
```
