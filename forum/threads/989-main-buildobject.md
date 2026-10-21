# main/buildObject

- Thread: https://www.cheetah3d.com/forum/index.php?threads/989/
- Subforum: scripting-general
- Started by **holdeg2** on 2006-10-17; last post 2006-10-18; 2 posts

## #1 — holdeg2 — 2006-10-17
<https://www.cheetah3d.com/forum/index.php?threads/989/post-6182>

main/buildObject

I feel like I'm missing documentation on scripting.

When is main() called?  I created a script:

	
	


```js
function main(doc) {
	OS.messageBox("Debug", "WTF");
	filename= OS.runOpenPanel("dat");
}
```


I call it from Tools directory.  Does nothing except create a script/spline object.  If I make the function a buildObject it works fine, except for asking me to pick a file everytime I open it.

Where can I find the different build* (i.e. buildObject, buildUI) functions that will be called by c3d?

Thanks in Advance
G

## #2 — tg_jp — 2006-10-18
<https://www.cheetah3d.com/forum/index.php?threads/989/post-6185>

Hello.

I think,
only Macro script calls main() function automatically when it's selected.

required and automatically called function(s).
* Macro : main()
* Polygonobj : buildUI(), buildObj()
* Splineobj : buildUI(), buildObj()
* Tool : buildUI()
* Tag : buildUI() ???

so, you want to make some importer with Tool script, you have to write kind of these code for calling import function.

	
	


```js
function buildUI(tool) {
    tool.addParameterButton("Import","OK","importMesh");
}

function importMesh(tool) {
    // .... some code here ...
}
```


if you push OK button, importMesh() func called.

I attach sample code for mesh file import (this is Tool script). I hope it will help.

regards.
Hiroto, tg_jp

Attachments: [mesh Import.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/1236/)
