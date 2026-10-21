# Print objects in console

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12807/
- Subforum: scripting-general
- Started by **Und00** on 2018-03-03; last post 2018-03-05; 3 posts

## #1 — Und00 — 2018-03-03
<https://www.cheetah3d.com/forum/index.php?threads/12807/post-110996>

Print objects in console

Hello! My first post to this forum. 
I am relatively new to Cheetah3D, I wish to use it mainly by scripting, and try to evaluate the workflow before investing more time in javascript.
Please, how to get "-1,-1,0" rather than "[object CallBackObject]" with the print() below?

	
	


```
var verts=[new Vec3D(1,-1,0), new Vec3D(-1,-1,0), new Vec3D(-1,1,0), new Vec3D(1,1,0)];

print(verts[1])
```


Thanks!

======== solved ====

	
	


```
var test = verts[1];
 print(test.x);
```

## #2 — podperson — 2018-03-05
<https://www.cheetah3d.com/forum/index.php?threads/12807/post-111011>

Javascript has lots of convenient tools for "introspection" (asking questions about the things you're looking at and tearing things apart).

The best way to learn Javascript is interactively in a web browser — e.g. fire up Safari, and in Preferences check "show develop menu in menu bar". Now you can hit command-option-i and get a javascript console to play with. (Sadly, it won't drive Cheetah  )

In the console you can play with Javascript.

For fun, go to a web page and type: document.body.setAttribute('contenteditable', true) — now you can edit the entire page like it's a Word document!

Anyway, you can do things like:

typeof {} // it will return 'object'

Object.keys({x: 10, y: 5, z: -4}) // it will return ['x', 'y', 'z']

It's pretty easy to write a function that will "walk" all the properties of an object and print them out (so you don't need to manually write a bunch of prints for every damn thing.

You might find this script useful or informative:

http://loewald.com/c3dbook/Scripts/Object-Info/

It produces documentation for Cheetah's built-in objects (select something and use it and it creates a markdown file for it; get a copy of MacDown if you want to see the documentation nicely formatted).

Unfortunately, C3D doesn't offer an interactive console.

Attachments: [Screen Shot 2018-03-04 at 8.21.58 PM.png](https://www.cheetah3d.com/forum/index.php?attachments/32259/)

Links: http://loewald.com/c3dbook/Scripts/Object-Info/

## #3 — Und00 — 2018-03-05
<https://www.cheetah3d.com/forum/index.php?threads/12807/post-111035>

I was using the OS X Script Editor for Javascript testing, as I am more familiar with this than with a browser development tools. Unfortunately, the Script Editor neither wont drive Cheetah, and it is a bit strange, as Cheetah probably uses JavaScriptCore:
https://developer.apple.com/documentation/javascriptcore

Thanks to Artyom Neustroev, I have adapted his function working for Cheetah:

	
	


```js
function iterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], stack + '.' + property);
                } else {
                 stack += property + ": " + obj[property] + "     ";
                }
        	}
        }
        print(stack);
    }
```

Thank you for the infos.  
Cheetah is an amazing 3D app, hiding power behind simplicity and elegance.

Attachments: [Capture dâÃ©cran 2018-03-05 Ã  11.21.39.png](https://www.cheetah3d.com/forum/index.php?attachments/32267/)

Links: https://developer.apple.com/documentation/javascriptcore, https://stackoverflow.com/questions/15690706/recursively-looping-through-an-object-to-build-a-property-list
