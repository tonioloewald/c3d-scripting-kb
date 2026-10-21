# All polygons of object

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10377/
- Subforum: scripting-general
- Started by **McShaman** on 2014-04-21; last post 2014-04-22; 3 posts

## #1 — McShaman — 2014-04-21
<https://www.cheetah3d.com/forum/index.php?threads/10377/post-87104>

All polygons of object

Hey guys… Sorry but this might be a little bit of a noob question but I'm trying to get to know the API so their may be a few. (plus I don't really understand the math functions).

What I am trying to work out right now is how do I access all the polygons of an object?

## #2 — tg_jp — 2014-04-22
<https://www.cheetah3d.com/forum/index.php?threads/10377/post-87148>

hi

here is sample code to print all vertices of polygons made up object polygon mesh.

	
	


```
        var core = obj.core(); // modCore(); // if you want to get modified mesh with Modifiers
    	// getting all polygon count
    	var polygonCount = core.polygonCount();
    	
    	print( "Name: " + obj.getParameter("name") + ", polygonCount: " + polygonCount );
    	
    	for (var i = 0;i < polygonCount;i++) {
    	 	// getting polygon size of polygon index.
    		var polygonSize = core.polygonSize( i );
    		
    		var vertices = [];
    		for (var j = 0;j < polygonSize;j++) {
    			// getting vertex index of point [ j ] made up polygon [ i ]
    			var vertexIndex = core.vertexIndex( i, j );
    			// getting Vec3D value of vertex
    			vertices.push( core.vertex( vertexIndex ) );
    		}
    		
    		var polygonInfo = 'pindex: ' + i + ', size: ' + polygonSize + ', vertices: ';
    		
    		for (var k in vertices) {
    			var vertex = vertices[ k ];
    			polygonInfo += ' (' + vertex.x.toFixed(3) + ', ' + vertex.y.toFixed(3) + ', ' + vertex.z.toFixed(3) + '), ';
    		}
    		
    		print( polygonInfo );
```


Best

tg_jp, Hiroto

## #3 — McShaman — 2014-04-22
<https://www.cheetah3d.com/forum/index.php?threads/10377/post-87150>

Great! Thanks for that TG. It looked like that was the kind of thing I was going to have to do. 

I thought there may be a getPolygon method or polygons collection parameter I didn't know about.

Thanks for your help.
