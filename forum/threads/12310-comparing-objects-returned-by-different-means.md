# comparing objects returned by different means

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12310/
- Subforum: scripting-general
- Started by **crgreen** on 2017-02-20; last post 2017-02-20; 1 posts

## #1 — crgreen — 2017-02-20
<https://www.cheetah3d.com/forum/index.php?threads/12310/post-106001>

comparing objects returned by different means

How does one (if indeed this is possible) compare two objects in a project when one is (if this makes sense) the object itself, and one is returned as the child of another object?
In other words, If I have an object (let's say for the sake of simplicity, that it is a camera) which is referenced in a variable (let's say, myVar1), and I have another object contained in another variable, (let's say, myVar2), which was returned by doing

	
	


```
myVar2 = parentObject.childAtIndex(0)
```

 and both are the same camera, if I do:

	
	


```
(myVar1 == myVar2)
```

 or 
	
	


```
(myVar1 === myVar2)
```

 Both return false.
How do we check that it is the same object?

[update:] I have figured out a way to do this, but I'd still be interested in knowing if others have messed around with this issue.
