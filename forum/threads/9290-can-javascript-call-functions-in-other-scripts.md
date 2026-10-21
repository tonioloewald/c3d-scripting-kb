# Can Javascript call functions in other scripts?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9290/
- Subforum: scripting-general
- Started by **feloneouscat** on 2013-01-29; last post 2013-02-24; 8 posts

## #1 — feloneouscat — 2013-01-29
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-76714>

Can Javascript call functions in other scripts?

I've got several questions (all related)

1. Can ALL objects have scripts? If so, how would you add a script to the camera? Can the scene graph have a script attached? If so, how?

2. Assuming you can attach a script to the document() object, is it possible for a tool to call functions in that document object's javascript?

For example, say I have a library of functions attached to my document object - can I then have a tool script that calls JS functions located in the document script?

3. Assuming 1 and 2 are possible how do I get scripts associated with the various objects? More scripts?

The reason for all of this is that I REALLY am hitting the point of needing a library of modules. I'm writing a "light insertion" script that allows me to create "lights" as a mesh in one program then in C3D it goes through and substitutes those meshes with real lights. The upside of this is that my model can change drastically, and yet my lights all remain in sync with the model.

Plus being able to attach a library script to the scene graph would be awesome, wouldn't violate Apple's practices (as nothing is being loaded behind the scenes), and would simplify my life.

## #2 — feloneouscat — 2013-01-29
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-76720>

So far I've managed to get one answered.

1. Yes via the tag object (which is insanely useful and really ought to be better documented). Tagging seems like it could handle things like animating flashing lights, etc.

2. Can't seem to attach to the document, but camera was a no-brainer. Unfortunately, it seems nigh impossible to expose Javascript functions to other Javascript scripts. No doubt this has much to do with how things are handled by C3D. 

3. Because of (2) it does not seem to be possible to create a library unless Martin exposes the Javascript object through the API. Even then, I'm not sure if that will work. I've only played with Javascript for a few weeks now.

## #3 — podperson — 2013-02-03
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-76886>

I'm assuming that what you want is events to handle. You could add a tag script to a folder and then work inside the folder to simulate the effect of a script hooked to the document/scene graph. (A scripted particle system is also quite powerful.)

Scripts can talk to one another via object properties. The obvious property to use is name, but it would be nice if objects could define new properties.

Finally, there is no "import" mechanism in C3D's script system, so each script needs to be self contained. That said it is JavaScript, there is a system object that lets you do file i/o and JavaScript has eval, but i think making scripts self-contained is a good thing.

## #4 — feloneouscat — 2013-02-04
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-76910>

Actually, no.

Handling of events would be akin to what is done via the browser. Although that is nice and powerful, what I'm finding is that there is plenty of "boiler plate" code that I have to copy and paste (find object by name, for example).

This is the antithesis of good programming practices for several reasons a) copying of "good code" may result in "bad code" if you miss a character - or don't copy functions/methods that are part and parcel of that function b) script bloat makes it far more difficult to read "what is really happening".

Self-containment is a double-edged sword. Web developers quickly discovered this as well which is why we have Node, jQuery, etc. These libraries exist because they simplify programming. We don't have to reinvent the wheel.

The problem with self-containment is that is makes it VERY DIFFICULT to write large, very useful programs. I'm working on two Javascript programs, one which automatically rigs a MakeHuman design (well, as much as possible since there are routines/parameters/tags that aren't exposed to Javascript :/ ).

In this I find that there are a LOT of routines that have to be reimplemented - recursive search for a mesh name in the scene. Position of a mesh, etc.

A library would allow a "code once, use multiple times" with little chance of error.

Therefore I have to disagree. I do not believe that scripts being self-contained is a good thing because it prevents one from "write once, use multiple". It requires duplication of code and makes the designer work harder, not smarter.

All of that said, it doesn't mean that I won't continue with my project. I'm merely attempting to ascertain the limitations of Javascript in C3D.

## #5 — feloneouscat — 2013-02-23
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-77194>

Probably Solved This

Okay, I've been researching this and I think I have a solution.

eval

For websites, eval is dangerous or as many put it, evil. But this is not a website and it is unlikely that someone could hack into Cheetah3d.

Eval, for what it is worth, is not speedy, but it is also not slow like many would have you to believe (results are cached).

I've written a test as follows:

	
	


```js
function loadLibrary(libraryName)
{
	var file = new File("/Users/YOURUSERNAMEHERE/Library/Application Support/Cheetah3D/Scripts/Tool/" + libraryName);
	file.open(READ_MODE);
	funcstring = file.read(100000);
	eval(funcstring);
}
```


I ran a test which was very simple (two functions written as normal javascript functions). Since they are global, it is best to make sure they they don't collide with any names. My knowledge of JS is very primitive.

Are there downsides to this code? Possibly. I would NEVER USE IT ON A WEB PAGE, but we should be safe on Cheetah3D.

What are the upsides? LIBRARIES. Write once, use multiple. 

IDEALLY I would prefer something like libary1.foo(far) and library2.bar(foo). If someone can figure that out (without making it a nightmare) I would appreciate it!

Cheers!

## #6 — feloneouscat — 2013-02-23
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-77195>

Hmmmm... didn't quite work...

Not sure why...

## #7 — feloneouscat — 2013-02-24
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-77196>

It Works Using the Following

At the top of your main file you MUST have the following:

	
	


```
var geval = eval;
```


Then in the buildUI(tool) I have the following:

	
	


```
	loadLibrary("MakeHuman/MHLibrary.js");
```


And then LoadLibaray looks like the following:

	
	


```js
function loadLibrary(libraryName)
{
	var file = new File("/Users/YOURNAMEHERE/Library/Application Support/Cheetah3D/Scripts/Tool/" + libraryName);
	file.open(READ_MODE);
	var funcstring = file.read(100000);
        geval(funcstring);
}
```


And that seems to work!

## #8 — feloneouscat — 2013-02-24
<https://www.cheetah3d.com/forum/index.php?threads/9290/post-77213>

Suggestions for Library

My last post indicated a concern about names and pollution - too many global names can get messy.

So I suggest that when creating libraries you put similar functions/methods under the same umbrella. For example I have bone creation code that autorigs a MakeHuman OBJ file. 

My Library looks like the following:

	
	


```js
var Bone = new function()
{
    this.createBone = function(doc, name, vertex)
    {
        /* function body */
        return bone;
    }

    this.recurseParentBoneVertex = function (object, vertex)
    {
        /* function body */
        return vertex;
    }

    this.createChildBone = function (doc, name, vertex, parent)
    {
        /* function body */

        vertex = Bone.recurseParentBoneVertex(parent, vertex);

        /* more function body */

        return bone;
    }
}
```


Bone has three methods, Bone.createBone(), Bone.recurseParentBoneVertex(), and Bone.createChildBone.

NOTE: When calling an internal function you must you the fully qualified name (i.e. Bone.xxxxxx).

By creating libraries, we extend the ability of C3D beyond the main classes defined by C3D. By using the above, we help avoid name pollution... maybe
