// Source: https://www.cheetah3d.com/forum/index.php?threads/3377/post-23954
// Author: tg_jp (Cheetah3D forum), posted 2008-08-07
// Thread: "parametric modelling via script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Para Spline.js
//
// for scripts/Splineobj Folder
//


// overload function to build-in Class for debug

Vec2D.prototype.toString = function() {
	return this.u.toFixed(4) + ', ' + this.v.toFixed(4);
}
Vec3D.prototype.toString = function() {
	return this.x.toFixed(4) + ', ' + this.y.toFixed(4) + ', ' + this.z.toFixed(4);
}
Vec4D.prototype.toString = function() {
	return this.x.toFixed(4) + ', ' + this.y.toFixed(4) + ', ' + this.z.toFixed(4) + ', ' + this.w.toFixed(4);
}

// glboal variables

var point_cache = [];
var data_file_path = '';
var data_file = '';

// buildUI() is automatically called after creation of this object

function buildUI(obj) {
    
    obj.setParameter("name","Para Spline");
    
    obj.addParameterFloat("timer",0,0,1000,false,false);
    
    obj.addParameterSeparator("Data Setting");
    obj.addParameterBool("auto delete",0,0,1,false,false);
    obj.addParameterButton("set data file","set","setDataFile");
}

// buildObject() is automatically called when scene graph is updated or update() function called.

function buildObject(obj) {
	// if data_file is set, and exists.
	if (data_file != '' && data_file.exist()) {
		data_file.open(READ_MODE);
		// error check
		if (data_file.isOpen() == false) {
			OS.messageBox("Open File Error", data_file.lastPathComponent() + ' could not be opened.');
			return;
		}
		
		// reading file
		var line = data_file.readln();
		while (line != -1) {
			var data;
			// you should change below reglar expression in case your data file format. 
			if (data = line.match(/^([0-9\.\-]+)\s([0-9\.\-]+)\s([0-9\.\-]+)/)) {
				var vec = new Vec3D(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
				
				point_cache.push(vec);
			}
			line = data_file.readln();
		}
		data_file.close();
		
		// deleting file by using system command
		if (obj.getParameter("auto delete")) OS.system('rm '+data_file_path);
	}
	
	// print('point_cache:'+point_cache);
	// creating spline path with point_cache.
	var core = obj.core();
	var len = point_cache.length;
	for (var i = 0;i < len;i++) {
		if (i == 0) { // starting point
			core.move(point_cache[i]);
		} else if (i == len - 1) { // ending point, close to starting point
			core.line(point_cache[i]);
			core.line(point_cache[0]);
		} else {
			core.line(point_cache[i]);
		}
	}
}

//
function setDataFile(obj) {
	var doc = obj.document();
	
	// store path string to global variable to use system command when deleting
	data_file_path = OS.runOpenPanel("txt");
	if (data_file_path == null) return;
	
	// set file object to global variable 'data_file'
	data_file = new File(data_file_path);
	
	// reset point cache
	point_cache.length = 0;
	
	// call update() function to call buildObject() function.
	obj.update();
}
