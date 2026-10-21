// Source: https://www.cheetah3d.com/forum/index.php?threads/6905/post-56146
// Author: filip c (Cheetah3D forum), posted 2011-02-16
// Thread: "Relative_Particle_Array"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Relative Particle Array.js 
//  ©2011 by Filip Ceunen (idea + calculations) & Hiroto Tsubaki (execution)
//                    http://www.filipceunen.be & http://www.tres-graficos.jp/
//         
// current: v.20110216
// 2011-02-15 : first.
//
// What:
// replicates a defined number of particles, where each particle has a difined relation with its progenitor.
//
// Usage: 
// Place this into .../Library/Application Support/Cheetah 3D/Scripts/Particle. 
// Tools -> Script -> Update Menu 
// then select from Tools -> Script -> Particle Script
//
function buildUI( obj ) {
	
	obj.setParameter("name", "Relative Particle Array");
	
	obj.addParameterSeparator("Array Growth");
	obj.addParameterInt("Generations", 15, 1, 1000, true, true);
	
	obj.addParameterSeparator("Distance");
	
	obj.addParameterFloat("Particle Distance", 1, -1000, 1000, true, true);
	obj.addParameterFloat("Relative distance", 1, -10000, 10000, true, true);
	
	obj.addParameterSeparator("Direction");
	    
	obj.addParameterFloat("Direction y", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Direction y", 0, -1000, 1000, true, true);
    
    obj.addParameterSeparator("");
    
	obj.addParameterFloat("Direction z", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Direction z", 0, -1000, 1000, true, true);
	
	obj.addParameterSeparator("Offset");
	
	obj.addParameterFloat("Offset x", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Offset x", 0, -1000, 1000, true, true);
	
	obj.addParameterSeparator("");
	    
	obj.addParameterFloat("Offset y", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Offset y", 0, -1000, 1000, true, true);
    
    obj.addParameterSeparator("");
    
	obj.addParameterFloat("Offset z", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Offset z", 0, -1000, 1000, true, true);
	
	obj.addParameterSeparator("Rotation");
	
	obj.addParameterFloat("Rotation x", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Rotation x", 0, -1000, 1000, true, true);
	
	obj.addParameterSeparator("");
	    
	obj.addParameterFloat("Rotation y", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Rotation y", 0, -1000, 1000, true, true);
    
    obj.addParameterSeparator("");
    
	obj.addParameterFloat("Rotation z", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Rotation z", 0, -1000, 1000, true, true);
	
	obj.addParameterSeparator("Scale");	
	
	obj.addParameterFloat("Scale x", 1, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Scale x", 0, -1000, 1000, true, true);
	obj.addParameterSeparator("");	
	
	obj.addParameterFloat("Scale y", 1, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Scale y", 0, -1000, 1000, true, true);
    obj.addParameterSeparator("");	
	
	obj.addParameterFloat("Scale z", 1, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Scale z", 0, -1000, 1000, true, true);
	
}

var RAD = Math.PI / 180;

var fd;
var fdy, fdz;
var fox, foy, foz;
var frx, fry, frz;
var fsx, fsy, fsz;


function buildObject( obj ) {
	
	var gen = obj.getParameter("Generations");
	
	var dist = obj.getParameter("Particle Distance");
	
	var dy = obj.getParameter("Direction y");
	var dz = obj.getParameter("Direction z");

	var ox = obj.getParameter("Offset x");
	var oy = obj.getParameter("Offset y");
	var oz = obj.getParameter("Offset z");
		
	var rx = obj.getParameter("Rotation x");
	var ry = obj.getParameter("Rotation y");
	var rz = obj.getParameter("Rotation z");
	
	var sx = obj.getParameter("Scale x");
	var sy = obj.getParameter("Scale y");
	var sz = obj.getParameter("Scale z");
	
	fd = obj.getParameter("Relative distance");
	
	fdy = obj.getParameter("Relative Direction y");
	fdz = obj.getParameter("Relative Direction z");
		
	fox = obj.getParameter("Relative Offset x");
	foy = obj.getParameter("Relative Offset y");
	foz = obj.getParameter("Relative Offset z");
	
	frx = obj.getParameter("Relative Rotation x");
	fry = obj.getParameter("Relative Rotation y");
	frz = obj.getParameter("Relative Rotation z");
	
	fsx = obj.getParameter("Relative Scale x");
	fsy = obj.getParameter("Relative Scale y");
	fsz = obj.getParameter("Relative Scale z");
	
	var core = obj.core();
	
	addParticle( core, gen, dist, dy, dz, ox, oy, oz, 0, 0, 0, rx, ry, rz, sx, sy, sz );
}

function addParticle( core, gen, dist, dy, dz, ox, oy, oz, px, py, pz, rx, ry, rz, sx, sy, sz ) {
	
	if (gen-- < 1) return;
	
	var p = core.addParticle();
		
	var d = Math.cos( dz * RAD ) * dist;
	
	dy = dy + ( 1 * fdy ) 
	dz = dz + ( 1 * fdz ) 
	
	rx = rx + ( 1 * frx ) 
	ry = ry + ( 1 * fry ) 
	rz = rz + ( 1 * frz ) 
	
	ox = ox + ( 1 * fox )
	oy = oy + ( 1 * foy )
	oz = oz + ( 1 * foz )
	
	px = ( px + Math.cos( dy * RAD ) * d ) + ox ;
	py = ( py + Math.sin( dz * RAD ) * d ) + oy ;
	pz = ( pz + Math.sin( dy * RAD ) * d ) + oz ;
	
	p.setPosition( new Vec3D( px, py, pz ) );
	p.setRotation( new Vec3D( rx, ry, rz) );
	p.setScale( new Vec3D( sx, sy, sz ) );
	
	addParticle( core, gen, dist * fd, dy, dz, ox, oy, oz, px, py, pz, rx + ( rx * frx ), ry + ( ry * fry ), rz + ( rz * frz ), sx + ( sx * fsx ), sy + ( sy * fsy ), sz + ( sz * fsz ) );
}