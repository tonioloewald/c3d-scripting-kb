// Source: https://www.cheetah3d.com/forum/index.php?threads/6652/post-52984
// Author: tg_jp (Cheetah3D forum), posted 2010-12-16
// Thread: "Particlle Visualization of ASCII Data"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// EQ Visualizer.js
//
//

var datafile = '';
var datatag_s = /<Cheetah3Ddatafile>/; // data start tag
var datatag_e = /<\/Cheetah3Ddatafile>/; // data end tag
var earthRadius = 40000 / (Math.PI*2); // 6366.1977; // circumference 40,000 km divided by two pi
var piFac = Math.PI / 180; //0.0174532925199433; // degrees to radians

function buildUI( obj ) {
	
	obj.setParameter("name", "EQ Visualizer");
	
	obj.addParameterFloat("earth scale", 0.1, 0, 10000, true, true);
	obj.addParameterFloat("magnitude scale", 0.1, 0, 100, true, true);
	obj.addParameterBool("set mag. to scale", 0, 0, 1, true, true);
	
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

// this is the C++ code
/*
void ConvertLatLong ( float myLat, float myLong, float myDepth, float &earthX, float &earthY, float &earthZ ) {
	double phi, rho, radius;
	radius = earthRadius - myDepth;
	phi = myLong * piFac;
	rho = ( 90.0 - myLat ) * piFac;
	earthX = radius * cos( phi ) * sin( rho );	
	earthY = radius * sin( phi ) * sin( rho );	
	earthZ = radius* cos( rho );
}
 
*/


function calculateCartesianCoordinate ( myLat, myLong, myDepth ) {
	var phi, rho, radius;
	radius = earthRadius - myDepth;
	phi = myLong * piFac;
	rho = ( 90.0 - myLat ) * piFac;
	var x = radius * Math.cos( phi ) * Math.sin( rho );	
	var y = radius * Math.sin( phi ) * Math.sin( rho );	
	var z = radius * Math.cos( rho );
	
	return new Vec3D( x, y, z );
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
	
	var es = obj.getParameter("earth scale");
	var ms = obj.getParameter("magnitude scale");
	var set_mag = obj.getParameter("set mag. to scale");
	
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
			// var vec = new Vec3D( 0, 0, er - (depth*ds));
			// var mat1 = new Mat4D( ROTATE_HPB, long, 0, 0 );
			// var mat2 = new Mat4D( ROTATE_HPB, 0, lat, 0 );
			// vec = mat2.multiply( mat1.multiply( vec ) );
			
			var vec = calculateCartesianCoordinate ( lat, long, depth );
			vec = vec.multiply( es );
			
			p.setPosition( vec );
			if (set_mag) p.setScale( new Vec3D( mag*ms, mag*ms, mag*ms ) );
			// or you can set another properties for material setting.
			p.setUVW( mag*ms, mag, 0 ); // it's set for color variation of particles.
		}
	}
	
	file.close();
}

