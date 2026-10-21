# Set Smooth Angle Globally / Global Iterator

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4442/
- Subforum: script-downloads
- Started by **podperson** on 2009-08-02; last post 2009-08-02; 1 posts

## #1 — podperson — 2009-08-02
<https://www.cheetah3d.com/forum/index.php?threads/4442/post-31150>

Set Smooth Angle Globally / Global Iterator

This script lets you set the smoothing angle of every editable polygon object in a scene with one click. Very useful for rendering files imported from parametric modelers such as MoI 3D, Rhino, etc.

Biggest hassle -- figuring out that the parameter for controlling smoothing angle was named normalAngle!

The script is loosely based on Martin's "Scale Light Intensity" script, but demonstrates the use of first-class functions and closures to allow very simple creation of global iterators.

	
	


```js
function buildUI(tool){
    tool.addParameterSeparator("Set Smooth Angle");
    tool.addParameterFloat("Angle",15.0,0.0,90.0,true,true);
    tool.addParameterButton("Set Smooth Angle","OK","set_smooth");
}

function set_smooth(tool){ 
    var doc = tool.document();
    var angle = tool.getParameter("Angle");

// here we create a function which will be run on every object in the scene
	var fn = function( obj ){
		if( obj.type() == POLYGONOBJ ){
// note that we're using the LOCAL variable angle, which is stored in 
// the function as a closure (don't worry, it "just works")
			obj.setParameter("normalAngle", angle);
		}
	}
// we could call it on document.selectedNode() instead, but it would then be
// really hard to do the whole scene
    iterateTree(doc.root(), fn);
}


// iterateTree applies fn to every obj in the entire scene -- how slick is that?
function iterateTree(obj, fn){
	fn( obj );
    for( var i=0; i<obj.childCount(); i++ ){
		iterateTree( obj.childAtIndex(i), fn );
	}
}
```


This is a tool script.

(So it goes in ~/Library/Application Support/Cheetah3D/scripts/tool, and after you install it and restart C3D it will be in Tools > Script > Tool > Global Iterator.js )

The basic idea is that to add an iterator you simple create a function and pass it to the iterator along with the root node.

Attachments: [Global Iterator.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/7361/), [robot claw worse.jpg](https://www.cheetah3d.com/forum/index.php?attachments/7362/), [robot claw better.jpg](https://www.cheetah3d.com/forum/index.php?attachments/7363/)
