# sorry, another silly question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1793/
- Subforum: scripting-general
- Started by **karlok** on 2007-06-04; last post 2007-06-04; 3 posts

## #1 — karlok — 2007-06-04
<https://www.cheetah3d.com/forum/index.php?threads/1793/post-12108>

sorry, another silly question

How can I access the sub-types of a polyhedra object?  I have this:

var obj=doc.addObject(POLYHEDRA);

and I have tried both: 

obj.setParameter( "type", "Tetrahedron" );
-and-
obj.setParameter( "type", TETRAHEDRON );

with no luck.

Thanks in advance!

## #2 — tg_jp — 2007-06-04
<https://www.cheetah3d.com/forum/index.php?threads/1793/post-12123>

hi,

you can set directly integer value for that type, and you can dump parameter types of selected object with Parameter Info.js ( macro script ).  

regards.

	
	


```
obj.setParameter("type",0);
```


Hiroto, tg_jp

## #3 — karlok — 2007-06-04
<https://www.cheetah3d.com/forum/index.php?threads/1793/post-12124>

ah! thanks very much!

Thank You Hiroto!
