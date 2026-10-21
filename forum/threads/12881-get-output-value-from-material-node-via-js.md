# Get output value from Material Node via JS

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12881/
- Subforum: scripting-general
- Started by **jeffcase** on 2018-04-26; last post 2018-04-26; 1 posts

## #1 — jeffcase — 2018-04-26
<https://www.cheetah3d.com/forum/index.php?threads/12881/post-111743>

Get output value from Material Node via JS

I'm trying to get the value of the first number node of the attached material (node editor screencap) using the below JS.

	
	


```js
function main(doc){
	var mat2Get = doc.materialAtIndex(0);
	var numNode = mat2Get.nodeAtIndex(1);
	var numOut = numNode.outputAtIndex(0);

	print(""+numNode.nodeType()+" * "+numNode.outputCount()+" * "+numOut);

}
```

The output of this yields: 

number * 1 *  [object CallbackObject]

Can someone help me understand the "[object CallbackObject]" returned and how to get the actual value of the node's output?

TIA
Jeff

Attachments: [MatNodeView.jpg](https://www.cheetah3d.com/forum/index.php?attachments/32602/)
