# Mass Rename macro now available

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10282/
- Subforum: script-downloads
- Started by **ByDesign Games** on 2014-03-22; last post 2014-03-23; 2 posts

## #1 — ByDesign Games — 2014-03-22
<https://www.cheetah3d.com/forum/index.php?threads/10282/post-86329>

Mass Rename macro now available

Hey all,

Didn't see an existing script for this, so yeah wrote a quick Cheetah macro to mass rename objects in your scene.

Useful, for example, if wanting to clean up scenes whose objects are rudely prefixed with a pointless namespace (looking at you exported Max Bipeds!) 

To use:

Tools -> Script -> Tool Script -> Mass Renamer 
Replace "old" with desired string to remove.
Replace "new" with new desired or empty string.
Enable / Disable Selection Only, to change names only on selected objects.
Enable / Disable Recurse Children  to change names on child objects.
Click Rename!
Macro operations apparently do not get trapped by Undo, nor flag that the file was changed, so yeah if anyone knows how to support undo or setting a file to dirty from scripts, please send message or reply here 

WARNING: as a powerful tool, you can easily muck up your object names if not careful!  

Enjoy!

joe

p.s. (hey Martin, isn't it about time that Scripts gets it's own menu? So tedious always having to drill down 4 levels...)

Attachments: [Mass Rename.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/22732/)

## #2 — tg_jp — 2014-03-23
<https://www.cheetah3d.com/forum/index.php?threads/10282/post-86339>

hello

it's very useful script :smile: .

[[QUOTE:  ByDesign Games said: Macro operations apparently do not get trapped by Undo, nor flag that the file was changed, so yeah if anyone knows how to support undo or setting a file to dirty from scripts, p]]

for Undo/Redo functions, you can use Base::recordParametersForUndo function.

	
	


```
line.41 ~
    if ( n == 0 ) {
      // OS.messageBox ( "Results", "Name: " + str + ", found: " + strPre + ", replacing with: " + strPost + ", for a result of: " + str.replace (strPre, strPost) );
      obj.recordParametersForUndo(); // added for Undo/Redo
      obj.setParameter( "name", str.replace (strPre, strPost) );
    }
```


please try it.

regards.

tg_jp, Hiroto
