// Source: https://www.cheetah3d.com/forum/index.php?threads/4366/post-30660
// Author: ephillips (Cheetah3D forum), posted 2009-07-12
// Thread: "Using RADIANCE as external renderer"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
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