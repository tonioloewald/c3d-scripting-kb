// Source: https://www.cheetah3d.com/forum/index.php?threads/6557/post-51755
// Author: murcielago (Cheetah3D forum), posted 2010-11-21
// Thread: "Move Mouth with Wave File"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/* wave 
 main routine from 
    http://oku.edu.mie-u.ac.jp/~okumura/dumpwave.c
 
*/

function buildUI( tool ) {
	tool.addParameterSeparator("A Rotator");
	tool.addParameterButton("Run", "Run", "RenderIt");
}

function RenderIt( tool ) {
	var path = OS.runOpenPanel("txt");
	var f = new File(path);
	f.open(READ_MODE);
	if (f.isOpen() == false) {
		OS.messageBox("info","file not open");
		return;
	}
	var jpgPath = path.replace(".txt","");

	var doc = tool.document();
	var obj = doc.selectedObject();
	
	var x = true;
	var frame = 0;
	var sFrame = "";
	while (x == true) {
		/* assumption: 15fps and 4 seconds total */
		if (frame > 60) {
			f.close();
			return;
		}
		var s = "";
		s = f.readln();
		if (s == null) {
			f.close();
			return;
		}
		if (s == -1) {return;}
		if (s == "") {return;}
		var rot = parseFloat(s);
		
		/*assumption: jaw is already at 260 rotation */
		rot = 261 - rot;
		
		var currRot = obj.getParameter("rotation");				

		var rot1 = new Vec3D(rot,currRot.y,currRot.z);
		
		doc.setAnimPosition(frame);
		obj.setParameter("rotation",rot1);
		
		/* re:Hiroto... object must be updated for rotation to display */
		updateObject(doc.root());
		if (frame < 10) {
			sFrame = "0" + frame;
		} else {
			sFrame = frame;
		}
		doc.render(jpgPath + sFrame + ".jpg");
		frame = frame + 1;
	}
	
	f.close();
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
