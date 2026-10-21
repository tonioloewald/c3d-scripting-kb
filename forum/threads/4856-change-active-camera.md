# Change active camera

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4856/
- Subforum: scripting-general
- Started by **kiriko** on 2009-10-28; last post 2009-10-28; 3 posts

## #1 — kiriko — 2009-10-28
<https://www.cheetah3d.com/forum/index.php?threads/4856/post-34658>

Change active camera

I have multiple cameras set up in a document. How can I toggle between them  for rendering, i.e. how can you change the active camera in a script?

The manual documents doc.activeCamera(), but no method to actually set it.

## #2 — tg_jp — 2009-10-28
<https://www.cheetah3d.com/forum/index.php?threads/4856/post-34661>

hi.

To change active camera, you can directly set a boolean parameter named 'activeCamera' of camera object. Object browser is not updated correctly, but this code seems to work internally. 

	
	


```js
function makeActiveCamera( cam ) {
	var doc = cam.document();
	var active_cam = doc.activeCamera();
	
	if ( cam.type() == CAMERA && active_cam != cam ) {
		active_cam.setParameter("activeCamera", 0);
		cam.setParameter("activeCamera", 1);
		
		cam.update();
		active_cam.update();
	}
}
```


regards.

tg_jp, Hiroto.

## #3 — kiriko — 2009-10-28
<https://www.cheetah3d.com/forum/index.php?threads/4856/post-34662>

[[QUOTE:  tg_jp said: hi. To change active camera, you can directly set a boolean parameter named 'activeCamera' of camera object. Object browser is not updated correctly, but this code seems to work internall]]

Indeed, wonderful  Well, I have spotted the 'activeCamera' property in the JAS-file, but for some reason ALL camera objects have set this boolean value to 'true'. Calling update() seems to do the trick. The method is not documented though, is it?

Thank you.
