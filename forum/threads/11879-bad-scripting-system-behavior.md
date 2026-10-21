# Bad scripting system behavior

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11879/
- Subforum: scripting-general
- Started by **podperson** on 2016-06-15; last post 2016-12-22; 6 posts

## #1 — podperson — 2016-06-15
<https://www.cheetah3d.com/forum/index.php?threads/11879/post-101700>

Bad scripting system behavior

The way the scripting system works, every object has the same methods. E.g. the document has a tagCount method. But if you call it the script crashes. These methods are poison to work with when trying to write generalized scripts — methods should either return reasonable values (if you have a tagCount method it should return the number of tags and not crash if there are no tags) or have the decency not to crash when called (correctly!).

It would be different if the C3D7 (a) reported the correct error (which is "this function always crashes when called from this object which shouldn't have it, sorry"), and (b) did not report the line number as -MAXINT because then you wouldn't need to hunt down which method(s) you're calling explode whenever they're called. I even had trouble fixing this by bisection because so many things started crashing when I generalized my carefully ducktyped code (if it walks like a duck and quacks like a duck it shouldn't explode like a bomb).

e.g.

	
	


```
obj = doc.selectedObject() || doc;
for(var i = 0; i < doc.tagCount(); i++){} // explodes
```


	
	


```
obj = doc.selectedObject() || doc;
if(obj.tagCount){
  for(var i = 0; i < doc.tagCount(); i++){} // also explodes
}
```

Attachments: [Screenshot 2016-06-15 11.46.22.png](https://www.cheetah3d.com/forum/index.php?attachments/29166/)

## #2 — Martin — 2016-06-17
<https://www.cheetah3d.com/forum/index.php?threads/11879/post-101752>

Hi,
both code snippets are buggy. For example 

	
	


```
obj = doc.selectedObject() || doc;
```


sets the variable obj to a boolean true. But Booleans neither have tags nor anything else. They just can be true or false. So it's not surprising that these scripts cause problems.

The Document class also has no tags so trying to access tags from a documents doesn't work.

Bye
Martin

## #3 — podperson — 2016-06-18
<https://www.cheetah3d.com/forum/index.php?threads/11879/post-101754>

No, Martin: in Javascript, || does not return a boolean necessarily (it returns the first truthy thing it sees).

The returned _object_ has tag methods that blow up. (I can show you the rest of the code; it checks for the existence of the method, finds it, calls it, and crashes. I was getting the object, checking its type, checking for the existence of the method, and then calling it.)

Javascript is a very different language from C or Java (it's actually closer to Lisp in many respects).

If you want to check, go into your browser's console (command-shift-J) and type ({} || []) and ({} && []) (they evaluate to {} and [] respectively.

(Consider for a moment where I work and what language I primarily code in ;-) — I wouldn't try to tell you how to code in C++.)

BTW: the second snippet is the first snippet wrapped in a bullet-proof check (assuming doc is an object and has the selectedObject() method). If there were a problem with this code the error would be "Uncaught ReferenceError: doc is not defined". (If doc were not an object then the error would be "selectedObject is not defined", but as I said, doc.selectedObject() returns a pathological object.)

But, I believe you've fixed this (the pathological object) per the other thread on a related issue.

Attachments: [Screen Shot 2016-06-17 at 7.37.25 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/29179/)

## #4 — Martin — 2016-06-18
<https://www.cheetah3d.com/forum/index.php?threads/11879/post-101755>

Ops, my fault. I didn't know that Javascript handles || differently than the C languages. Surprisingly I always used it as in the C languages and it always worked.:redface: 

The bug in the selectedObject() function will be fixed in Beta 16 so that shouldn't cause any problems anymore. 

Let me know if Beta 16 should still cause problems.

Bye
Martin

## #5 — podperson — 2016-06-19
<https://www.cheetah3d.com/forum/index.php?threads/11879/post-101773>

Javascript's strange behavior has gone from being perplexing to proudly abused…

Thanks for the fixes and sorry for basically double-posting this bug

## #6 — feloneouscat — 2016-12-22
<https://www.cheetah3d.com/forum/index.php?threads/11879/post-104622>

Wow! Thanks for this post! I, like Martin, has assumed || acted just like it did in C or C++!

Thanks for the clarification!
