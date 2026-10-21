// Source: https://www.cheetah3d.com/forum/index.php?threads/9078/post-94048
// Author: aaronparr (Cheetah3D forum), posted 2015-03-14
// Thread: "Reading material parameters"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
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