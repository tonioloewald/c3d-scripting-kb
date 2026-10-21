# Extending the Cheetah 3D API

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10400/
- Subforum: scripting-general
- Started by **McShaman** on 2014-05-01; last post 2014-07-07; 6 posts

## #1 — McShaman — 2014-05-01
<https://www.cheetah3d.com/forum/index.php?threads/10400/post-87287>

Extending the Cheetah 3D API

I have been thinking about extending the the Cheetah 3D JS API. I feel some common tasks require very long winded work arounds. 

What I am planning to do is create JS objects for each PolyCore element, e.g. polygon, vertex, edge, corner, UV, etc. These will be able to be stored in variables and changed directly through the object without having to continually traverse the objects PolyCore object.

For example. I should be able to get every UV coordinate for a selected object as an array of UV objects:

	
	


```
var arrayOfUvs = objectPolyCore.getUvs();
```


and then I would be able to modify each UV directly:

	
	


```
for( i = 0; i < arrayOfUvs.length; i++ ) {

    arrayOfUvs[i].move( 0.1, -0.2 );

}
```


My only concern is that maybe some features already exist that are not documented in the Cheetah 3D help centre. It says it hasn't been updated since 2004.

Can anybody tell me what changes (if any) have been made to the JS API that are not documented in the help centre?

## #2 — Edward — 2014-05-01
<https://www.cheetah3d.com/forum/index.php?threads/10400/post-87305>

Some things for you to consider..

Vertex Indexing
You might notice that when you call core.vertexCount(), the number of vertices isn't equal to the number of corners in the model. This is because the vertices are indexed.

Ok, so you create a 'Vertex' object for every indexed vertex. Let's say now you want to split two vertices apart an edge by giving them different positions. Now you think, OK - that is tricky, so why not just create an un-indexed array of vertices, one for each corner. Then this problem isn't tricky at all, but you have bunches of duplicate vertices to process, making your scripts slower.

Object versus Vector
Creating a UV as an object isn't a bad idea, but may not make things as simple as you hope. In your .move() example, you might want to move using hard-coded values, but what if you want to move by a vector named something like 'shift'? You need to add another wrapper function. This isn't as consistent as using vectors, and requires managing more code in your UV wrapper.

uv.move(0.5,0.5)
uv.moveWithVector(shift)

compared to uv as a Vec4..

uv.add(new Vec4(0.5,0.5,0.0,0.0))
uv.add(shift)

My Opinion
I like Cheetah3D's design. It gives you the option of modifying vertices indexed and unindexed, and the elements are represented as vectors, which are consistent and easy to modify.

## #3 — McShaman — 2014-05-01
<https://www.cheetah3d.com/forum/index.php?threads/10400/post-87316>

Thanks Edward, these are some great points!

I have not yet come across the vertex indexing issue yet. I will have a look at it soon.

Regarding the UV object, that was just an example of how it could function… I and considering extending the object from Vec4D so that I get all the existing functionality.

At the moment I'm in the early stages. Just trying to find out if its worth my time. I will continue plugging away and post any progress as I go.

## #4 — McShaman — 2014-05-02
<https://www.cheetah3d.com/forum/index.php?threads/10400/post-87318>

Is it possible to extend native objects?

I want to add extra methods to the PolyCore object, e.g:

	
	


```js
PolyCore.prototype.myMethod = function() {
	
	// lodgic here
		
};
```


This produces an error. 

According to the following test PolyCore isn't even the object returned but the core() method:

	
	


```
if( doc.root().childAtIndex( 1 ).core() instanceof PolyCore ) {
	
	print( 'yes' );
	
} else {
	
	print( 'no' );
	
}
```

## #5 — tg_jp — 2014-05-03
<https://www.cheetah3d.com/forum/index.php?threads/10400/post-87369>

Hi

[[QUOTE:  McShaman said: Is it possible to extend native objects? Click to expand... ]]

Currently it seems to be not available to extend an built-in object like Vec3D, PolyCore, etc. using 'prototype'.

but you can define capsule object that has custom functions.

	
	


```js
//

var myPolyCore = function( obj ) {
	// hold built-in PolyCore object
	this.core = obj.core();
	
	// custom function definition
	this.uvInfo = function() {
		var info = [];
		
		var polygonCount = this.core.polygonCount();
		for (var i = 0;i < polygonCount;i++) {
			var polygonSize = this.core.polygonSize();
			for (var j = 0;j < polygonSize;j++) {
				info.push( this.core.uvCoord(i,j) );
			}
		}
		
		return info;
	}
	
	return this;
}

// using sample in Macro script
function main(doc) {
    var obj = doc.selectedObject();
    
    if (obj.family() == NGONFAMILY) {
    	var core = myPolyCore( obj );
    	
    	print( core.uvInfo() );
    }
}
```


Best

tg_jp, Hiroto

## #6 — feloneouscat — 2014-07-07
<https://www.cheetah3d.com/forum/index.php?threads/10400/post-88634>

What I'm doing is creating brand new classes (using library functions that I have also created see http://www.cheetah3d.com/forum/showthread.php?t=9039 for more about that.

My current objects are pretty simple - but you might want to build off of them

	
	


```js
//----- Vertex class object
function Vertex()
{
	this.object = null;				// object made of polygons
	this.polygonIndex = 0;			// polygon index into the object
        this.polygonVertexIndex = 0;		// polygon vertex index
	this.vertexIndex = 0;				// vertex index into the polygon
	this.vertex = new Vec3D(0,0,0);		// Vec3D point
}

//----- Polygon class object
function Polygon()
{
	this.object = null;				// object made of polygons
	this.polygonIndex = 0;			// polygon index into the object
	this.vertexCount = 0;				// number of vertices in polygon
	this.vertexArray = new Array();		// copy of the array of vertices
}


//----- PolygonArray class object
function PolygonArray()
{
	this.object = null;			// object made of polygons
	this.polygonCount = 0;		// number of polygons in object
	this.polygonArray = new Array();	// array of Polygons objects
}
```


Basically the idea is that I copy some information that is relevant to me. 

For example, I have code that tells me what vertices are currently selected (note that this is used as a library function as indicated in the link earlier):

	
	


```js
//-----
//
//			selectedVertexArray
//
// synopsis:	retval = selectedVertex(doc);
//					retval 	- Vertex
//					doc		-
//
// description:	selectedVertexArray designed to return the selected Vertex class.
//
//			Basically returns an array of points that are selected in an array.
//
// errors:		none
//
// returns:		Vertex if there is a selected vertex
//			null if there is no vertex selected
//

this.selectedVertexArray = function (doc)
{
    var root = doc.document();
    var object = root.selectedObject();
    if (object == null)                                 // if object is null return null
        return null;

    var vertexArray = new Array();
    var vertexIndex = 0;

    polycore = object.core();		       // get the polygon core

    //----- get the number of vertices for polygon
    var vertexCount = polycore.vertexCount();
								
    //----- go thru all the vertices
    for (vindex = 0; vindex < vertexCount; ++vindex) 
    {
        if (polycore.vertexSelection(vindex))
        {
            var vertex = new Vertex();										// create vertex object
            vertex.object = object;			    // save object
            vertex.vertexIndex = vindex;		    // vertex index
            vertex.vertex = polycore.vertex(vindex); // save the vertex

            vertexArray[vertexIndex] = vertex;	// put Vertex object in array
            ++vertexIndex;
        }
    }

    if (vertexIndex == 0)
        return null;

    return vertexArray;
}
```


The advantage of creating my own structures is that I can put as much or as little information as needed.

Typically it is a balance between "can I avoid writing code that is already written" and "does the code that is already written require me to write the same thing over and over again".

HOWEVER the structures that I use are temporary. They are merely used for a short term and then discarded. The idea is that you don't want to reinvent the wheel, just the hubcap  

Not sure if that helps.

Links: http://www.cheetah3d.com/forum/showthread.php?t=9039
