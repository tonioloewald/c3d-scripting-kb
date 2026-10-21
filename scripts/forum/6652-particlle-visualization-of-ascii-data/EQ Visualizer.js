// Source: https://www.cheetah3d.com/forum/index.php?threads/6652/post-52812
// Author: tg_jp (Cheetah3D forum), posted 2010-12-13
// Thread: "Particlle Visualization of ASCII Data"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// EQ Visualizer.js
//

var datafile = '';
var datatag_s = /<Cheetah3Ddatafile>/; // data start tag
var datatag_e = /<\/Cheetah3Ddatafile>/; // data end tag

function buildUI( obj ) {
	
	obj.setParameter("name", "EQ Visualizer");
	
	obj.addParameterFloat("earth radius", 100, 0, 1000000, true, true);
	obj.addParameterFloat("magnitude scale", 0.1, 0, 100, true, true);
	obj.addParameterFloat("depth scale", 0.01, 0, 100, true, true);
	
	obj.addParameterSeparator("Data File");
	
	obj.addParameterString("data file path", "", true);
	obj.addParameterButton("set data file", "set", "setDataFile");
}

function setDataFile( obj ) {
	
	var file = OS.runOpenPanel("txt"); // data file extension is .txt
	
	if (file != null) {
		obj.setParameter("data file path", file);
		datafile = file;
	}
}

function buildObject( obj ) {
	
	if (datafile != obj.getParameter("data file path")) {
		datafile = obj.getParameter("data file path");
	}
	
	var file = new File( datafile );
	file.open( READ_MODE );
	
	if ( file.isOpen() == false ) {
		print('data file is not open!');
		return;
	}
	
	var er = obj.getParameter("earth radius");
	var ds = obj.getParameter("depth scale");
	var ms = obj.getParameter("magnitude scale");
	var core = obj.core();
	
	var m, lat, long, depth, mag; // variables
	var px, py, pz;
	var p; // particle holder
	var reg_val = /([0-9\.\-e]+)\s+([0-9\.\-e]+)\s+([0-9\.\-e]+)\s+([0-9\.\-e]+)/; // search regular expression
	var read = false;
	while( (line = file.readln()) !== -1 ) {
		
		print( line );
		if ( datatag_s.exec( line ) ) read = true;
		if ( datatag_e.exec( line ) ) read = false;
		
		if ( read && (m = reg_val.exec( line )) ) {
		
			lat  = parseFloat( m[1] );
			long = parseFloat( m[2] );
			depth  = parseFloat( m[3] );
			mag  = parseFloat( m[4] );
			
			p = core.addParticle();
			
			// calc for XYZ position in 3D space from lat/long/depth data. it must be edited.
			var vec = new Vec3D( 0, 0, er - (depth*ds));
			var mat1 = new Mat4D( ROTATE_HPB, long, 0, 0 );
			var mat2 = new Mat4D( ROTATE_HPB, 0, lat, 0 );
			vec = mat2.multiply( mat1.multiply( vec ) );
			
			p.setPosition( vec );
			p.setScale( new Vec3D( mag*ms, mag*ms, mag*ms ) );
			// or you can set another properties for material setting.
			p.setUVW( mag*ms, mag, 0 ); // it's set for color variation of particles.
		}
	}
	
	file.close();
}

