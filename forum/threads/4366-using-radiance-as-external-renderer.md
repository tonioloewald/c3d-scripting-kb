# Using RADIANCE as external renderer

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4366/
- Subforum: scripting-general
- Started by **ephillips** on 2009-07-07; last post 2009-07-12; 5 posts

## #1 — ephillips — 2009-07-07
<https://www.cheetah3d.com/forum/index.php?threads/4366/post-30570>

Using RADIANCE as external renderer

Hello-

I am hoping to find a way to use the program RADIANCE (http://radsite.lbl.gov) to render images for which the object and camera positions and rotations have been set using Cheetah3D.  I am an experienced RADIANCE user, and I use it to render scenes where physically based lighting and material properties are paramount.  

RADIANCE comes with a routine to convert WAVEFRONT .obj files to its format, so that part is easy.  Material specifications often need to be tweaked, but that is doable.  What is missing, however, is an interactive user interface.  This makes it very impractical to create all but the simplest animations since it is not possible to view and edit object and camera motions before rendering an entire scene.

What I am envisioning for a first step is to use C3D to create the animation, and then a simple frame-by-frame ASCII export of the position and rotation of each object camera at that frame.  I would then use this information to run a UNIX Shell script that would go through the frames using the exported positions and rotations, use this information to transform the RADIANCE objects and camera, and then render the frame.  I have searched the forums, and can't find anything to get me going on this (I did find this thread, http://cheetah3d.de/forum/showthread.php?t=769&highlight=position+vector ,   but I am not clear how to implement it. Is anyone aware of a script that would do what I am describing, or one that is easily modified? 

Thanks for any help and or suggestions.

Erich Phillips, Ph.D.
San Carlos, CA

Links: http://cheetah3d.de/forum/showthread.php?t=769&highlight=position+vector, http://radsite.lbl.gov/

## #2 — Francois — 2009-07-08
<https://www.cheetah3d.com/forum/index.php?threads/4366/post-30574>

[[QUOTE:  ephillips said: Is anyone aware of a script that would do what I am describing, or one that is easily modified? Click to expand... ]]

Hi Erich and Welcome,

I think you should have a look at these 2 scripts from tg_jp/Hiroto : 
- Radium
- Sunflow
They are likely good candidates to help you build your own script.
Good luck

Links: http://cheetah3d.de/forum/showthread.php?t=1240, http://cheetah3d.de/forum/showthread.php?t=1279

## #3 — ephillips — 2009-07-08
<https://www.cheetah3d.com/forum/index.php?threads/4366/post-30588>

[[QUOTE:  Francois said: Hi Erich and Welcome, I think you should have a look at these 2 scripts from tg_jp/Hiroto : - Radium - Sunflow They are likely good candidates to help you build your own script. Good l]]

Thanks for the reply, François.  I have looked at those scripts, and unless I am missing something, I don't believe that the frame-by-frame motion data is exported.  Is that incorrect?

## #4 — tg_jp — 2009-07-09
<https://www.cheetah3d.com/forum/index.php?threads/4366/post-30593>

[[QUOTE:  Thanks for the reply, François. I have looked at those scripts, and unless I am missing something, I don't believe that the frame-by-frame motion data is exported. Is that incorrect? Click to expand.]]

no, correct. you need to add some codes for exporting each frames of an animation with loop function (while or for,.. etc. as you want).

for example.

	
	


```
var t = 0;
var t_end = 10; // from 0 to 10 sec.
var dt = 1 / frameRate;
while (t_end > t) {
    doc.setAnimPosition( t );
    /* exporting code here */
    t += dt;
}
```


regards.

tg_jp, Hiroto.

## #5 — ephillips — 2009-07-12
<https://www.cheetah3d.com/forum/index.php?threads/4366/post-30660>

First cut at C3D to RADIANCE exporter

Thanks Hiroto.  I have implemented your suggestions.  I have been able to create a simple animation in C3D, with one moving object and one moving camera.  I exported the object as an OBJ file, which I can read into RADIANCE.  I then used the following script to export the motion and orientation parameters at each frame for the object and then the camera.  Each is exported separately as ascii values separated by commas.  For cameras, I export position and the camera direction (a 3D vector), and for other objects, I export position and rotation information.  I use the values output from C3D orient and position the RADIANCE objects and camera for rendering at each frame.  Note that the script is meant to reside in the "Macro Script" folder.  Also note that this is a work in progress, and I have not tested it for anything very complex (such as objects parented to one another).

	
	


```js
//
// RADIANCE exporter by Erich Phillips
// July 11, 2009
//
// This script borrows heavily from the work of Hiroto Tsubaki and Martin Wengenmayer
// (Thank you, Hiroto and Martin)
//

function main(doc){
// Note that at this point, I have set the parameters to be specific
// for a 1 second animation, at 30 fps
    var	x, y, z, rx, ry, rz, dx, dy, dz, h, p, b;
	var f=1
	var fR = 30;
	var t = 1/fR;
	var obj = doc.selectedObject();
	var obj_mat = obj.obj2WorldMatrix();
	var rot = obj.getParameter("rotation");
	var rot_mat = new Mat4D(ROTATE_HPB, rot.h, rot.p, rot.b);
    var defcam = new Vec3D(0,0,-1);
	var camdir = defcam;
	var f_end = 30;
	var dt = 1 / fR;
	
	//get path for file
	var path=OS.runSavePanel("csv");
	if(path==null){
		return;
	}
    
    //open file
    var file = new File(path);
    file.open(WRITE_MODE);
    
    file.writeln("# File created by Cheetah3D");
	if(obj.type() == CAMERA) 	
		file.writeln("# frame, x, y, z, vdx, vdy, vdz");
	else
		file.writeln("# frame, x, y, z, ry, rz, rz");
    file.write("\n\n");

	while(f <= f_end) {
	    doc.setAnimPosition( t );
		obj_mat = obj.obj2WorldMatrix();
		rot = obj.getParameter("rotation");
		rot_mat = new Mat4D(ROTATE_HPB, rot.h, rot.p, rot.b);
		if(obj.type() == CAMERA) {
			x = obj_mat.m03.toPrecision(5);
			y = obj_mat.m13.toPrecision(5);
			z = obj_mat.m23.toPrecision(5);
			camdir = rot_mat.multiply(defcam);
			dx = camdir.x.toPrecision(5);
			dy = camdir.y.toPrecision(5);
			dz = camdir.z.toPrecision(5);			
			file.writeln("frame: "  +f + ", " + x + ", " + y + ", " + z + ", " + dx + ", " + dy + ", " + dz);
		}
		else {
			x = obj_mat.m03.toPrecision(5);
			y = obj_mat.m13.toPrecision(5);
			z = obj_mat.m23.toPrecision(5);
			h = rot.h.toPrecision(5);
			p = rot.p.toPrecision(5);
			b = rot.b.toPrecision(5);		
			file.writeln("frame: "  +f + ", " + x + ", " + y + ", " + z + ", " + h + ", " + p + ", " + b);
		}
		
		t += dt;
		f ++;
      }    
	  
	//close file
    file.close();

}
```


Here is a link to a comparison video using both RADIANCE and C3D
Click Here for C3D and RADIANCE comparison
Thanks for your suggestions, François and Hiroto.

Erich Phillips

Links: http://www.youtube.com/watch?v=VfVCwAkNGCw
