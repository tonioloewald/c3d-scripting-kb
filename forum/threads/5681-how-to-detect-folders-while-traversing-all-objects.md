# How to detect folders while traversing all objects?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5681/
- Subforum: scripting-general
- Started by **emanaku** on 2010-04-26; last post 2010-04-27; 2 posts

## #1 — emanaku — 2010-04-26
<https://www.cheetah3d.com/forum/index.php?threads/5681/post-41790>

How to detect folders while traversing all objects?

I have used the "Simple ASCII Export.js" that comes with the Cheetah 3D 5.3 to enumerate and print all objects in the object browser.

I works fine for objects and their childs.

But for some structures I have used folders. So the objects in the folders are printed - but not the folders itself: This is what I am looking for.

In the Cheetah 3D 5.3 Help I cannot find the folders and their properties in the script area ...

Are there any hints for this?
Is there a complete list of all objects and functions in the Scripting Language? I could not find one so far ...

Thank you for all hints and support

E-Ma-Naku

## #2 — tg_jp — 2010-04-27
<https://www.cheetah3d.com/forum/index.php?threads/5681/post-41791>

Hi,

you need write additional code to print folder information.

	
	


```
if (obj.type() == FOLDER) {
    var pos = obj.getParameter("position");
    file.writeln("FOLDER "+obj.getParameter("name"));
    file.writeln("   pos: "+pos.x.toFixed(6)+", "+pos.y.toFixed(6)+", "+pos.z.toFixed(6));
    /* .... */
}
```


regards.

tg_jp, Hiroto
