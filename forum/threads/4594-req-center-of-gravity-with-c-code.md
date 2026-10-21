# (REQ) Center of Gravity (with c-code)

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4594/
- Subforum: scripting-general
- Started by **Micmac** on 2009-09-09; last post 2009-10-23; 13 posts

## #1 — Micmac — 2009-09-09
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32361>

(REQ) Center of Gravity (with c-code)

(REQ) Center of Gravity (with c-code)

Hi there

This is a request for a Center of Gravity Script for 2D objects or straight extruded 2D objects

A script for 3D objects would be great, but to make things eazy for a start the request is for 2D/extruded2D objects.

As a bonus the code (bellow) will return the area of the polygon. It could be nice to have a readout af that.

I would like that the pivot point is moved to the Center of Gravity.

I can supply some c-code that I have verified to work:

double polygonArea(double *X, double *Y, int points) {

**double *area=0. ;
**int * * i, j=0 *;

**for (i=0; i<points; i++) {
** *j++; if (j==points) j=0;
** *area+=(X+X[j])*(Y-Y[j]); }

**return area*.5; }

void centerOfGravity(double *X, double *Y, int points, double *Cx, double *Cy) {

**double *area6=6.*polygonArea(X,Y,points) ;
**int * * i, j=0 ;

**(*Cx)=0.;
**for (i=0; i<points; i++) {*
** *j++; if (j==points) j=0;
** *(*Cx)+=(X+X[j])*(X[j]*Y-X*Y[j]);
**(*Cx)/=area6;

**(*Cy)=0.;
**for (i=0; i<points; i++) {*
** *j++; if (j==points) j=0;
** *(*Cy)+=(Y+Y[j])*(X[j]*Y-X*Y[j]);
**(*Cy)/=area6; }

Here is a walkthrough of the code:

Would it be possible that you tell whats going on in the code line by line?

void centerOfGravity(double *X, double *Y, int points, double *Cx, double *Cy) {

Calculate polygon area and multiply it by 6:
**double *area6=6.*polygonArea(X,Y,points) ;
**int * * i, j=0 ;

Start with zero in the centroid's X coordinate:
**(*Cx)=0.;

Loop through the corners of the polygon, hitting each corner only once:
**for (i=0; i<points; i++) {*

Determine the index of the "next" corner after this one (which could be the first corner):
** *j++; if (j==points) j=0;

Calculate this...
(X+Xnext) x ( (Xnext x Y) - (X x Ynext) )
...then add it to the centroid's X coordinate:
** *(*Cx)+=(X+X[j])*(X[j]*Y-X*Y[j]);

After processing all corners, divide the centroid's X coordinate by the "6 x area" value calculated earlier:
**(*Cx)/=area6;
That's it!* (And it's almost the same for the centroid's Y coordinate, but a little different.)

Note that if the polygon is traced counterclockwise, the area function will return a negative number -- that is OK, the centroid function expects that, and will work correctly.

Here is a link to a page with CoG javascript for a triangle (for inspiration):

http://www.dreamincode.net/code/snippet3563.htm

Finally Here is how I have verified that it works. I have trancelated the c-code into a HyperCard-like language that I work with. It takes a polygon tGraphic and places the marker-graphic CoG on the Center of Gravity.

on mouseUp 
   put the points of graphic "tGraphic" into tpoints 
   put 0 into tArea 
   repeat with i = 1 to the number of lines of tpoints -1 
      put item 1 of line i of tpoints into x1 
      put item 1 of line i + 1 of tpoints into x2 
      put item 2 of line i of tpoints into y1 
      put item 2 of line i + 1 of tpoints into y2 
      put ((x1 + x2)*(y1-y2)) into tpeekArea 
      add tpeekArea to tArea 
   end repeat 
   put abs (tArea * .5) into tAll     -----This is the area
   
   
   put 6*tAll into Area6
   
   put 0 into Cx
   put 0 into xArea
   repeat with i = 1 to the number of lines of tpoints -1 
      put item 1 of line i of tpoints into x1 
      put item 1 of line i + 1 of tpoints into x2 
      put item 2 of line i of tpoints into y1 
      put item 2 of line i + 1 of tpoints into y2 
      put (x1 + x2) * ((x2 * y1) - (x1 * y2)) into xArea 
      add xArea to Cx 
   end repeat 
   put abs(Cx/Area6) into Cx
   
   put 0 into Cy
   put 0 into yArea
   repeat with i = 1 to the number of lines of tpoints -1 
      put item 1 of line i of tpoints into x1 
      put item 1 of line i + 1 of tpoints into x2 
      put item 2 of line i of tpoints into y1 
      put item 2 of line i + 1 of tpoints into y2 
      put (y1 + y2) * ((x2 * y1) - (x1 * y2)) into yArea 
      add yArea to Cy 
   end repeat 
   put abs(Cy/Area6) into Cy
   
   set the loc of grc CoG to Cx,Cy    ------This is the Center of gravity
end mouseUp 

Thanks for your interest
Michael

Links: http://www.dreamincode.net/code/snippet3563.htm

## #2 — ToddWR — 2009-09-10
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32398>

not sure about the 2D stuff
but here is some javascript code all ready for cheetah
I was doing various projects of my own.. this is from 
http://www.melax.com/volint.html

	
	


```js
var verts = new Array();
var tris = new Array();

function test(obj) {
	var root = obj.document();
	var o = root.selectedObject();
	if( o == null)
		return;
	verts = [];
	tris = [];
	var core = o.modCore();
	var size = core.vertexCount();
	for( var i = 0; i < size;i++) {
		verts[i] = core.vertex(i);
	}
	size = core.triangleCount();
	size = core.polygonCount();
	for(  i = 0; i < size;i++) {
		var l = core.polygonSize(i);
		for( var j = 0; j < l - 2;j++) {
			var a = core.triangle(i,j);
			var a0 = core.vertexIndex(i,a[0]);
			var a1 = core.vertexIndex(i,a[1]);
			var a2 = core.vertexIndex(i,a[2]);
			tris[tris.length] = new Vec3D(a2,a1,a0);
		}
	}
	print( "the volume is " + Volume(verts,tris,tris.length));
}

function Volume(vertices, tris,  count) {
	// count is the number of triangles (tris) 
	var	volume=0;
	var m = new Mat3D();
	for(var i=0; i < count; i++) { // for each triangle
		m.m00 = vertices[tris[i].x].x; m.m01 = vertices[tris[i].x].y; m.m02 = vertices[tris[i].x].z; 
		m.m10 = vertices[tris[i].y].x; m.m11 = vertices[tris[i].y].y; m.m12 = vertices[tris[i].y].z; 
		m.m20 = vertices[tris[i].z].x; m.m21 = vertices[tris[i].z].y; m.m22 = vertices[tris[i].z].z; 
		volume += Math.abs(m.determinant()); //divide by 6 later for efficiency
	}
	return volume/6.0;  // since the determinant give 6 times tetra volume
}

function CenterOfMass(vertices, tris, count) {
	// count is the number of triangles (tris) 
	var	com = new Vec3D();
	var	volume=0; // actually accumulates the volume*6
	var m = new Mat3D();
	for(var i=0; i < count; i++)  // for each triangle
	{
		m.m00 = vertices[tris[i].x].x; m.m01 = vertices[tris[i].x].y; m.m02 = vertices[tris[i].x].z; 
		m.m10 = vertices[tris[i].y].x; m.m11 = vertices[tris[i].y].y; m.m12 = vertices[tris[i].y].z; 
		m.m20 = vertices[tris[i].z].x; m.m21 = vertices[tris[i].z].y; m.m22 = vertices[tris[i].z].z; 
		var vol = m.determinant();  // dont bother to divide by 6 
		//com += vol * (A.x+A.y+A.z);  // divide by 4 at end
		com.x += vol * (m.m02 + m.m12 + m.m22);  // divide by 4 at end
		com.y += vol * (m.m02 + m.m12 + m.m22);  // divide by 4 at end
		com.z += vol * (m.m02 + m.m12 + m.m22);  // divide by 4 at end
		volume + =vol;
	}
	com = com.multiply(1/ volume * 4); 
	return com;
}
```

Links: http://www.melax.com/volint.html

## #3 — Micmac — 2009-09-11
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32405>

This is great ToddWR

What do I do with the code?

Shall it be compiled or what?

Im new to this

Will it return the volume and where?

Will it move the pivot point to the CoG?

Mic

## #4 — Micmac — 2009-09-11
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32406>

Ok I got the script saved as a (.js)

There's a little syntax error close to the end of the script:

volume + =vol;  —> volume += vol;

So I create a spline object, extrude it and then apply the script to the object and nothing happens.

As I said Im new to this 

What shall I do?

Mic

## #5 — frank beckmann — 2009-09-11
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32407>

Hi.
Will there be any difference by making the spline object editable first (to receive a polygonal mesh) and then call the script? Just curious.

Cheers
Frank

## #6 — Micmac — 2009-09-11
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32408>

[[QUOTE:  frank beckmann said: Hi. Will there be any difference by making the spline object editable first (to receive a polygonal mesh) and then call the script? Just curious. Cheers Frank Click to expand... ]]

Did that, same effect, nothing happens.

Mic

## #7 — ToddWR — 2009-09-11
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32412>

The javascript code does the same as Micmac's posted c code, nothing. He was requesting javascript code to find something specific, the center of gravity. It was meant to be used in another script.

If you'd like a fully working script, just ask.

Todd

## #8 — Micmac — 2009-09-11
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32422>

Thanks Todd

So I will ask for a complete script.

Center of Gravity-marker and Area readout

Thanks again

Mic

## #9 — Micmac — 2009-09-17
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32550>

Todd.....did I understand you correctly, that if I asked you would work on it?

Mic

## #10 — ToddWR — 2009-09-19
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32585>

I am working on it

## #11 — Micmac — 2009-09-20
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-32612>

Sounds exiting Todd!

Mic

## #12 — Micmac — 2009-10-21
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-34135>

Is this going forward Todd?

Mic

## #13 — podperson — 2009-10-23
<https://www.cheetah3d.com/forum/index.php?threads/4594/post-34336>

I implemented it using a much easier to understand algorithm 

Find center of mass of each triangle.
Find weighted average of the centers.
Set pivot to the weighted average
Report area

http://www.cheetah3d.de/forum/showthread.php?p=34335#post34335

Links: http://www.cheetah3d.de/forum/showthread.php?p=34335#post34335
