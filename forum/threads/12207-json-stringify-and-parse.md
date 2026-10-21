# JSON Stringify and Parse

- Thread: https://www.cheetah3d.com/forum/index.php?threads/12207/
- Subforum: scripting-general
- Started by **feloneouscat** on 2017-01-03; last post 2017-01-03; 1 posts

## #1 — feloneouscat — 2017-01-03
<https://www.cheetah3d.com/forum/index.php?threads/12207/post-104906>

JSON Stringify and Parse

These are two pretty nifty things you can use in Javascript. For example, if you want to write an array out to a file, you would do this:

	
	


```
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var fileref = new File(prepath + “Library/Application Support/Cheetah3D/Scripts/Data/myfancydata.txt);
    fileref.open(WRITE_MODE);
    fileref.write(JSON.stringify(myarray));
    fileref.close();
```


This assumes, of course that the directory Data exists.

To read it back, use the following:

	
	


```
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var fileref = new File(prepath + “Library/Application Support/Cheetah3D/Scripts/Data/myfancydata.txt);
    fileref.open(WRITE_MODE);
    data  = fileref.read(fileref.size());
    var myarray = JSON.parse(data);
```


This makes it really spiffy to write complex data out to a file!
