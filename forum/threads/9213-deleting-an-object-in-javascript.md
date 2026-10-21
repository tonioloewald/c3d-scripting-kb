# Deleting an object in Javascript?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9213/
- Subforum: scripting-general
- Started by **feloneouscat** on 2013-01-10; last post 2013-01-10; 3 posts

## #1 — feloneouscat — 2013-01-10
<https://www.cheetah3d.com/forum/index.php?threads/9213/post-76094>

Deleting an object in Javascript?

I have the items in the attached list. I'm trying to delete "head-tongue" using Javascript but having no luck. I've tried:

	
	


```
delete doc["head-tongue"];

var name = "head-tongue";
delete doc[name];

var root = doc.root();
delete root["head-tongue"];

var root = doc.root();
var name = "head-tongue";
delete root[name];
```


Nothing seems to work. Either throws an error (no surprise) or does nothing.

I will be the first to admit that Objective C is my forte and Javascript is... well, falls out after Lisp.

Thanks!

Attachments: [From Clipboard.jpg](https://www.cheetah3d.com/forum/index.php?attachments/18877/)

## #2 — podperson — 2013-01-10
<https://www.cheetah3d.com/forum/index.php?threads/9213/post-76103>

Reposted from your original thread:

Hmm, well document.root points to the thing you'd expect it to. I'm not sure why you expect document[...] to do what you want (yeah it would be nice if it did, but...)

So you probably need to write a function that finds objects by name, something like:

	
	


```js
function findObjectByName( name, parent ){
  for( var i = 0; i < parent.childCount(); i++ ){
    var obj = parent.childAtIndex(i);
    if( obj.getParameter("name") === name ){
      return obj;
    }
  }
  return false;
}
```


There are some sample scripts that spelunk the scene graph, I'd suggest looking at them.

Simple ASCII Export is a good place to start (in Finder use Command-Shift-G to got to ~/Library/Application Support/Cheetah3D/Scripts/Macro/)

Any yes, this is a lot more cumbersome than it needs to be. It would be great if something like obj['foo'] would return a child named 'foo' or null/false if none existed, but there are bigger fish to fry.

## #3 — feloneouscat — 2013-01-10
<https://www.cheetah3d.com/forum/index.php?threads/9213/post-76108>

:smile: 

My apologies, but I'm a software engineer by trade (30+ years). The scene graph was trivial (and my function recurses to find objects by name in case they are buried in folders). No biggie.

I even wrote a function to list out the functions of the various objects (doc, doc.root(), and selected objects), but to no avail.

As I indicated, I'm not a Javascript expert, and was hoping for a simple answer to deleting the object. I can get the reference to the object (and it's owner) - that's trivial, but I can't seem to remove it from it's owner.

The other possibility is that you have to delete the polygons, vertices, etc. and then let the thing get GC'd - but I wasn't sure if that would really do it.

Sorry if I confused you with all the peripheral items - I assure you getting a reference to the object is the least of my problems.

But if you know how to delete the object, that would really make my day! :smile:

If I have the following:

	
	


```
  var objectToDelete = objectWithName(doc, "head-tongue");
```


What is the next line of code that actually DELETES the object from the scene graph?
