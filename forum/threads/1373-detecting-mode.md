# Detecting mode?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1373/
- Subforum: scripting-general
- Started by **capnchunky** on 2007-02-26; last post 2007-02-27; 5 posts

## #1 — capnchunky — 2007-02-26
<https://www.cheetah3d.com/forum/index.php?threads/1373/post-8707>

Detecting mode?

I'm trying to work on a simple tool to transform the current selection, be it polygon, edge, etc.  My first thought was to just check the core() for a selection of each type, but then I remembered that each mode has its own persistent selection, so that wouldn't work.

Is there a way for a script to tell what mode the document is in, or will I just have to make a pulldown to choose which selection to use?

## #2 — Martin — 2007-02-26
<https://www.cheetah3d.com/forum/index.php?threads/1373/post-8714>

Hi,
you can use the editMode() function of the document class.

Bye,
Martin

## #3 — capnchunky — 2007-02-27
<https://www.cheetah3d.com/forum/index.php?threads/1373/post-8718>

Hmm... am I doing something wrong? This code:

	
	


```js
function move(tool){
  var doc = tool.document();
  var mode = doc.editMode();
  ...
```

comes back with the error: doc.editMode is not a function

## #4 — Martin — 2007-02-27
<https://www.cheetah3d.com/forum/index.php?threads/1373/post-8736>

Hi,
I'm sorry. I just discovered that this is a v4.0 script function. It isn't available in v3.6.

Sorry for the confusion.

Bye,
Martin

## #5 — capnchunky — 2007-02-27
<https://www.cheetah3d.com/forum/index.php?threads/1373/post-8739>

Ahh.  That's okay, I'll just use a pulldown menu. Thanks.
