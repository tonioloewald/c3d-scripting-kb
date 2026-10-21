# assign custom tag js via script

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12203/
- Subforum: scripting-general
- Started by **crgreen** on 2016-12-30; last post 2016-12-30; 3 posts

## #1 — crgreen — 2016-12-30
<https://www.cheetah3d.com/forum/index.php?threads/12203/post-104815>

assign custom tag js via script

Is it possible to assign a custom tag script to an object via script? Point to a specific .js file which is a tag script and attach it to an object, but via scripting?

Thanks a ton in advance

-Chris G

## #2 — feloneouscat — 2016-12-30
<https://www.cheetah3d.com/forum/index.php?threads/12203/post-104824>

[[QUOTE:  crgreen said: Is it possible to assign a custom tag script to an object via script? Point to a specific .js file which is a tag script and attach it to an object, but via scripting? Thanks a ton in a]]

Yes.

Assume you have the object already, you would do the following:

	
	


```
    scripttag = object.addTagOfType(SCRIPTTAG);	
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + "foobar.js");
    scripttag.setParameter(“scriptName", file);
```


I’m not exactly sure I completely understand how to use scripts on objects, but I DO know how to add tags!

## #3 — crgreen — 2016-12-30
<https://www.cheetah3d.com/forum/index.php?threads/12203/post-104825>

[[QUOTE:  feloneouscat said: Yes. Assume you have the object already, you would do the following: 
```
    scripttag = object.addTagOfType(SCRIPTTAG);    
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + "foobar.js");
    scripttag.setParameter(“scriptName", file);
```
 I’m not exactly sure I completely understand how to use scripts on objects, but I DO know how to add]]

Many thanks & happy holidays!
