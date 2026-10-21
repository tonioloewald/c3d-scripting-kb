# rotate and render 2

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5998/
- Subforum: scripting-general
- Started by **murcielago** on 2010-07-14; last post 2010-07-14; 3 posts

## #1 — murcielago — 2010-07-14
<https://www.cheetah3d.com/forum/index.php?threads/5998/post-45046>

rotate and render 2

moving this from General forum.
I tried Hiroto's script on a simple object and it worked fine.
Tried it on the Jaw joint of the attached and it didn't work.
Any ideas?

function main( doc ) {
    var obj = doc.selectedObject();
    
    var rot1 = new Vec3D( 0, 0, 0 );
    var rot2 = new Vec3D( 0, 0, 50 );
    
    obj.setParameter("rotation", rot1);
    doc.render();
    
    obj.setParameter("rotation", rot2);
    doc.render();
}

Attachments: [GeneriHead.zip](https://www.cheetah3d.com/forum/index.php?attachments/11350/)

## #2 — tg_jp — 2010-07-14
<https://www.cheetah3d.com/forum/index.php?threads/5998/post-45079>

hi

Before rendering, you need call update() func for object ('Body') link to bone ('Jaw'). so try this codes below. in this code,
update all object in scene before rendering.

	
	


```js
function main( doc ) {
	var obj = doc.selectedObject();
	
	var rot1 = new Vec3D( 0, 0, 0 );
	var rot2 = new Vec3D( 0, 0, 50 );
	
	obj.setParameter("rotation", rot1);
	updateObject( doc.root() );
	doc.render();
	
	obj.setParameter("rotation", rot2);
	updateObject( doc.root() );
	doc.render();
}

function updateObject( obj ) {
	
	// update children first
	var childCount = obj.childCount();
	for (var i = 0;i < childCount;i++) {
		updateObject( obj.childAtIndex( i ) );
	}
	
	// update itself
	obj.update();
}
```


regards.

tg_jp, Hiroto

## #3 — murcielago — 2010-07-14
<https://www.cheetah3d.com/forum/index.php?threads/5998/post-45080>

thank you, sir.  u r d man.
