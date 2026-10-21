# Creating Libraries in Cheetah3D

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12183/
- Subforum: scripting-general
- Started by **feloneouscat** on 2016-12-22; last post 2017-01-19; 4 posts

## #1 — feloneouscat — 2016-12-22
<https://www.cheetah3d.com/forum/index.php?threads/12183/post-104619>

Creating Libraries in Cheetah3D

I use libraries with my code. Lots of them. So one of my big questions was how to create one with Cheetah3D. This is my answer (this is from an older post).

Current Library usage is as follows:

1. Create a directory in ~/Library/Application Support/Cheetah3D/Scripts/ named Library. This is where you will keep all your libraries.

2. Put this in a file name MyTest.js in ~/Library/Application Support/Cheetah3D/Scripts/Tool

	
	


```js
function buildUI(doc)
{
    loadLibrary(doc, "testLibrary.js");

    doc.addParameterSeparator("The title of our Tool");

    doc.addParameterButton("Press the button!", "The Button", "buttonpressed");
}

function buttonpressed(doc)
{
    testLibrary.doit(doc, "This is just a test");
}


function loadLibrary(doc, libraryName)
{
    var geval = eval;
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
	file.open(READ_MODE);
	var funcstring = file.read(file.size());
	file.close();
	geval(funcstring);
}
```


This should work with any user name.

The geval is a hack that makes the thing work. For some reason using eval doesn’t work with 7.0.18 (or other versions of Cheetah). I leave the “why” as an exercise for those who know Javascript better than I do.

3. Put the following in a file named testLibrary.js in the Library folder you created in step 1.

Code:

	
	


```js
var testLibrary = new function()
{
	this.doit = function (tool, name)
	{
		print("it worked");
		OS.messageBox("And the answer is:", name);
		return 0;
	}

	this.anotherfunction = function (tool, name)
	{
		var object = 0;

		return 0;
	}
}
```

4. Restart Cheetah3D

5. Go to Tools/Script/Tools Script and select MyTest. You should get a window pop up.

This can be used to create multiple libraries in a fashion that is SIMILAR to Node (technically it isn't the same, but I'll let Javascript guru's explain that).

No, it is not beautiful and you can find a LOT of reasons why “eval” is considered "bad". 

But, for me, libraries are a good thing.

## #2 — feloneouscat — 2016-12-22
<https://www.cheetah3d.com/forum/index.php?threads/12183/post-104621>

Finding an object by name

First thing you may want for your library: find an object by name (whether it is a mesh or a bone). If you do a lot of scripting, this can save you a TON of time and effort.

1. Create a file named stdLib.js in ~/Library/Application Support/Cheetah3D/Scripts/Library.

2. Put this in that file:

	
	


```js
var stdLib = new function()
{
    //——- returns named object
    this.objectWithName = function (doc, name)
    {
        result = stdLib.recurseObjectWithName(doc.document().root(), name);
        if (result == 0)
            OS.messageBox("objectWithName couldn't find:", name);
        else
            print("objectWithName1 " + result.getParameter("name"));

        return result;
    }

    //———— recurse through all objects
    this.recurseObjectWithName = function (topobject, name)
    {
        var object = 0;
        var index;

        for (index = 0; index < topobject.childCount(); ++index)
        {
            var object = topobject.childAtIndex(index);
//          print(“recurse” + object.getParameter("name"));

            if (name == object.getParameter("name"))
                return object;

            if (object.type() == FOLDER)
            {
                object = stdLib.recurseObjectWithName(object, name);
                if (object)
                    return object;
            }

            else
            {
                if (object.childCount() > 0)
                {
                    object = stdLib.recurseObjectWithName(object, name);
                    if (object)
                        return object;
                }
            }
        }

        return 0;
    }
}
```


3. In a different script (call it dummy.js) you can have the following:

	
	


```js
function buildUI(doc)
{
    loadLibrary(doc, "stdLib.js");

    doc.addParameterButton(“Hide Mesh“, “Hide Mesh”, “hideMesh”);
}

function loadLibrary(doc, libraryName)
{
    var geval = eval;
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
    file.open(READ_MODE);
    var funcstring = file.read(file.size());
    file.close();
    geval(funcstring);
}

function hideMesh(doc)
{
    object = stdLib.objectWithName(doc, “yourMeshNameHere");
    tags = object.tagAtIndex(0);
    tag.setParameter(“editorActive”, 0);
}
```


Reload the script and boom, you can now turn the mesh “yourMeshNameHere” so it is not visible!

## #3 — feloneouscat — 2016-12-22
<https://www.cheetah3d.com/forum/index.php?threads/12183/post-104624>

Okay, so you want to find materials by name…

Add this to your stdLib.js file

	
	


```js
this.materialWithName = function (doc, name)
{
    for (index = 0; index < doc.document().materialCount(); ++index)
    {
        var material = doc.document().materialAtIndex(index);
        if (name == material.getParameter("name"))
            return material;
    }
    return 0;
}
```


Now in your Javascript you can get the material by name with:
 

	
	


```
    mymaterial = stdLib.materialWithName(doc, “MyMaterial.Obj”);
```


:smile: 
Easy peasy!

## #4 — CpH — 2017-01-19
<https://www.cheetah3d.com/forum/index.php?threads/12183/post-105431>

[[QUOTE:  The geval is a hack that makes the thing work. For some reason using eval doesn’t work with 7.0.18 (or other versions of Cheetah). I leave the “why” as an exercise for those who know Javascript bette]]

Enclosing eval with a pipe or escape character might be what you're looking for: |eval|

Works for AppleScriptObjC but I haven't touched javascript for a while.
