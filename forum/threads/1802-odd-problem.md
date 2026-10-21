# Odd problem

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1802/
- Subforum: scripting-general
- Started by **MrTAToad** on 2007-06-08; last post 2007-06-09; 5 posts

## #1 — MrTAToad — 2007-06-08
<https://www.cheetah3d.com/forum/index.php?threads/1802/post-12210>

Odd problem

With the following :

	
	


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


Its been reported that for some scales (eg 1,3,0.5) produce missing boxes.  In addition, the Z scale value changes to 1.0

Can anyone tell me whats wrong with the code ?

## #2 — tg_jp — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1802/post-12219>

Hi,

welcome to Cheetah3D's scripting. nice grid idea for script. 

the parent object's geometry (pos, scale, rotation) affects the child's geometry. if the parent object with scale (0.5,0.5,0.5) and the child object with scale (0.5,0.5,0.5) in property view, the child object looks like scale (0.25,0.25,0.25) in 3d view. you can produce same situation manually, it could help to you understand what's going on. 

how about adding a Folder object as parent of them?

tg_jp, Hiroto.

## #3 — MrTAToad — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1802/post-12222>

Thanks for that.

If the child scale is affected by the parents scale, that would be rather annoying.  I'll think I'll keep grouping out of it for now.

Scrap that - I think I know why the problem was occuring.  Turns out I was mixing up the Y and Z axis...

## #4 — tg_jp — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1802/post-12225>

hello,

there is so many solutions to solve this grouping problem.

1. a simple solution about grouping problem is to add a folder for parent object of all box objects.

	
	


```
// create folder object.
folder = doc.addObject(FOLDER);
// 
for ( / ... y loop code
    for ( // ... x loop code
        // end of the x loop
        folder.addChildAtIndex(obj, folder.childCount());
    }
}
```


2. or converting child's geometry before adding it to parent group. but in your case, all children's scale should be (1.0, 1.0, 1.0), so no calculation for this. EDIT: I've just forgot a calculation for x/zPos. so, code will be...

	
	


```
if (child) {
    // without setting scale parameter
}
    obj.setParameter("scale", .....) // only parent object
}
////
    xPos+=tool.getParameter(xScale)/tool.getParameter(xScale)+tool.getParameter(xStep)/tool.getParameter(xScale);
////
    zPos+=tool.getParameter(zScale)/tool.getParameter(zScale)+tool.getParameter(zStep)/tool.getParameter(zScale);
////
```


3. or for changing box's size, using 'width','height','length' parameters of Box primitive, not using 'scale' parameter. 

	
	


```
// changing box's size code
obj.setParameter("sizeX",tool.getParameter(xScale)); // display name is width (X).
obj.setParameter("sizeY",tool.getParameter(yScale)); // display name is height (Y).
obj.setParameter("sizeZ",tool.getParameter(zScale)); // display name is length (Z).
```


hope it will help.

regards.

tg_jp, Hiroto.

## #5 — MrTAToad — 2007-06-09
<https://www.cheetah3d.com/forum/index.php?threads/1802/post-12228>

Thanks for that.

I found that setting the scale for just the parent to solve the problem.  Positioning was solved by using steps of 1.0,0.0,1.0
