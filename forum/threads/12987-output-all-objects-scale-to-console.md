# Output all objects scale to console

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12987/
- Subforum: scripting-general
- Started by **oldmicah** on 2018-08-05; last post 2018-08-05; 3 posts

## #1 — oldmicah — 2018-08-05
<https://www.cheetah3d.com/forum/index.php?threads/12987/post-112920>

Output all objects scale to console

I've been using Cheetah3d for visualizing items I'm building and it occurred to me that it would be really, really useful to be able to output a model (all objects) scale to console.  (This would give me a list of items to cut and shape)

I don't use any 'meta' scaling  (scaling of the boolean or groups) so I just need to walk the list of objects and output the scale factor.

pseudo code looks like this.

var outputtext = ""
for object in objectlist {
   outputtext = outputtext + object.name + "," + object.scalex + "," + object.scaley + "," + object.scalez + newline
}

print(outputtext)

I haven't been able to find any scripts that are close to this:

1) Is there a script that is close to what I'm looking for I can modify?
2) Can you point me to a script that iterates all objects and mods the scale factors?

as always, many thanks, 
Steven

## #2 — frank beckmann — 2018-08-05
<https://www.cheetah3d.com/forum/index.php?threads/12987/post-112924>

I have no clue what you´re aiming for as I can´t help with any scripting.

Cheers
Frank

## #3 — oldmicah — 2018-08-05
<https://www.cheetah3d.com/forum/index.php?threads/12987/post-112926>

Sorry I wasn't clear enough: I was looking to see if anyone had written a script that would go through the objects in a scene and print out their scale values.  For instance, for a drill press stand I just modeled, the script would show this in console:

[[QUOTE:  Back : 33.6, 18.9, 0.75 top : 31, 22.1, 0.75 bottom : 31, 22.1, 0.75 Sides : 33.6, 27.200000000000003, 0.75 side suport : 3.5, 24, 1.5 fr bk support : 3.5, 19, 1.5 vert support : 3.5, 34, 1.5 Click t]]

This would basically give me a cutting list when I went to the garage and started cutting out physical metal and wood.  

I was able to hack together the following from other scripts which seems to work.  

disclaimer 1: this only shows the scale of the objects themselves.  i.e If two shapes are in a group and that group is scaled, the group scaling is ignored.

disclaimer 2: I've never done Cheetah3d scripting (or much javascript) so while it works, it is a hack in the worst sense of the word. 

	
	


```js
var key = 'editorActive'; // parameter name
var allValue = true;

function main(doc) {

	var root = doc.root();
	if ( root ) {
		printObjects( root, key, allValue );
	}
}

function printObjects( obj, key, value ) {
	var cc = obj.childCount();
	
	if (1) { // 1 => recursive / 0 => no recursive
		for (var i = 0;i < cc;i++) {
			var c = obj.childAtIndex( i );
			printObjects( c, key, value );
		}
	}
    if(obj.family()==NGONFAMILY){     //save current object if it is a polygon object

		var objname=obj.getParameter("name");
	
		var core=obj.modCore();

		var list = new Array;
		list = StoreChild(0, obj);
		var scale = list[1].getParameter("scale");

		print(objname + " : " + scale.x.toPrecision(3) + ", "+scale.y.toPrecision(3) + ", " + scale.z.toPrecision(3))

		}
	}
	
	function StoreChild(iter, obj) {
	   	var childCount = obj.childCount();
	    var list = new Array(iter, obj, new Array);
	    for (var i = 0; i < childCount;i++) {
  	      var child = obj.childAtIndex(i);
    	    var childList = StoreChild(iter+1, child);
   	     list[2].push(childList);
   	 }
   	 return list;
	}
```
