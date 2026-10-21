# Reading material parameters

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9078/
- Subforum: scripting-general
- Started by **Edward** on 2012-12-05; last post 2015-03-14; 7 posts

## #1 — Edward — 2012-12-05
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-75166>

Reading material parameters

I am trying to read the parameters of a material using the rib() function in a tool script, but I keep getting an error. Am I accessing the values correctly in this snippet?

	
	


```
var document = tool.document();
var count = document.materialCount();

for (var i = 0; i < count; i++) {
	var material = document.materialAtIndex(i);
	print("-------------------------");
	print(material.getParameter("name"));
	print(material.rib());
}
```


error: 'undefined' is not a function (evaluating 'object.rib()')​

## #2 — Martin — 2012-12-07
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-75229>

Hi Edward,
I'm sorry but that functions was removed when I introduced the new node based materials system in Cheetah3D 5.0. So it won't work anymore. I will remove that functions also from the documentation. :redface:

So at the moment only a few base material parameters can be accessed. But both access to the material nodes and access to the skinning weights will be the next things on my Javascript API todo list. 

Bye
Martin

## #3 — Edward — 2012-12-07
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-75230>

Excellent- Thank you Martin :smile:

## #4 — Reshka — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-75329>

Update?

I am running into this same problem.  Was there any update for this yet?  If so could someone point me to an example?  The docs still list rib() as the function to use.

Thanks!

## #5 — aaronparr — 2015-03-12
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-93963>

I would also really like to have access to materials via scripting. Modifying nodes, creating/adding nodes, adding material to an object etc...

thanks

## #6 — aaronparr — 2015-03-13
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-94033>

Martin posted the API for the Node based Material system:

	
	


```
Global class:
	    Functions:
		void	    clearConsole()
		
	Document class:
	    Functions:
		void	    setWindowFrame(Number originX,Number originY,Number width,Number height)
		
	Node class:
	    Functions:
		Vec4D	    Node::frame()
		void	    Node::setFrame(Vec4D frame)
		String	    Node::nodeType()
		Number	    Node::inputCount()
		Parameter   Node::inputAtIndex(Number index)
		Parameter   Node::inputWithName(String name)
		Number	    Node::outputCount()
		Parameter   Node::outputAtIndex(Number index)
		Parameter   Node::outputWithName(String name)
		void	    Node::update()

	Material class:
	    Functions:
		Number	    Material::nodeCount()
		Node	    Material::nodeAtIndex(Number index)
		Node	    Material::nodeWithID(Number id)
		Node	    Material::rootNode()
		Node	    Material::addNodeOfType(String type)
		Boolean	    Material::addConnection(Number fromID, String fromPara, Number toID, String toPara)
		Boolean	    Material::removeConnection(Number nodeID, String nodePara)
		Vec4D	    Material::reflection()
		Vec4D	    Material::transmission()
		
	Parameter class:
	    Functions:
		Boolean	    Parameter::connected()
		Number	    Parameter::connectedWithID()
		String	    Parameter::connectedWithParameter()
```


And that is awesome. Thank you.

But… I can't figure out how to associate a polygonobject with a material.

I create and modify a material via script and it is added to an array of objects associated with the document which I can later access.

But how do I via script give the material reference to a polygon mesh? I could really use some help here.

thanks.

## #7 — aaronparr — 2015-03-14
<https://www.cheetah3d.com/forum/index.php?threads/9078/post-94048>

How do we obtain the node ID?
I assume we need it for this function:

	
	


```
Boolean	    Material::addConnection(Number fromID, String fromPara, Number toID, String toPara)
```


is this the method to return the ID

	
	


```
node.id()
```


its not listed but i tried it and it does return a large number.

____
after testing... yes. that is the ID.
I used this code to test a pair of nodes that I connected manually and it all checks out

	
	


```js
// GENERIC FUNCTIONS
function alert(message)
{
	OS.messageBox("ALERT",message);
}

function main(doc)
{
	var mat			= doc.materialAtIndex(0);

	var node0		= mat.nodeAtIndex(0);
	var node1		= mat.nodeAtIndex(1);
	
	alert("Node0 ID("+node0.id()+")");
	alert("Node0 Type("+node0.nodeType()+")");
	alert("Node0 Inputs("+node0.inputCount()+")");
	for(i=0;i<node0.inputCount();i++)
	{
		var para = node0.inputAtIndex(i);
		if(para.connected())
		{
			var conID		= para.connectedWithID();
			var conPara	= para.connectedWithParameter();
			alert("Input("+para.name()+") connected to ID("+conID+") para("+conPara+")");
		}
		else
		{
			alert("Input("+para.name()+")");
		}
	}
	
	alert("Node1 ID("+node1.id()+")");
	alert("Node1 Type("+node1.nodeType()+")");
	alert("Node1 Outputs("+node1.outputCount()+")");
	for(i=0;i<node1.outputCount();i++)
	{
		var para = node1.outputAtIndex(i);
		if(para.connected())
		{
			var conID		= para.connectedWithID();
			var conPara	= para.connectedWithParameter();
			alert("Output("+para.name()+") connected to ID("+conID+") para("+conPara+")");
		}
		else
		{
			alert("Output("+para.name()+")");
		}
	}
}
```


what was interesting about this test is that the output parameter did not register as connected. but the input parameter did.
