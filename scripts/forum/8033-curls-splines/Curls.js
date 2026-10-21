// Source: https://www.cheetah3d.com/forum/index.php?threads/8033/post-66722
// Author: filip c (Cheetah3D forum), posted 2012-01-19
// Thread: "Curls (splines)"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
//  Curls.js 
//
//  ©2012 by Filip Ceunen with the help of Hiroto Tsubaki 
//  http://www.filipceunen.be & http://www.tres-graficos.jp/
//         
// current: v.20120119
// 2012-01-19 : first.
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
//
// What:
// Creates splines, where each point has a difined relation with its prolitor.
//
// Usage: 
// Place this into .../Library/Application Support/Cheetah 3D/Scripts/Splineobj 
//
 

function buildUI( obj ) {
	
	obj.setParameter("name", "Curls");
	
	obj.addParameterSeparator("Spline Growth");
	
	obj.addParameterInt("Branches", 1, 1, 1000, true, true);
	obj.addParameterInt("Length", 15, 1, 1000, true, true);
	obj.addParameterInt("Randomize Length", 0, -100, 100, true, true);
	obj.addParameterFloat("Point Distance", 1, -100, 100, true, true);
	
	obj.addParameterSeparator("Direction");
	    
	obj.addParameterFloat("Direction y", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Bend y", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Curl", 1, 0.5, 1.5, true, true);
	
	obj.addParameterSeparator("");
	
	obj.addParameterFloat("Direction z", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Bend z", 0, -1000, 1000, true, true);
		
	obj.addParameterSeparator("Change Direction");
	
	obj.addParameterFloat("Bend Origin", 0, 0, 1000, true, true);	
	obj.addParameterFloat("Randomize Bend Origin", 0, -100, 100, true, true);
	
	obj.addParameterSeparator("");
		
	obj.addParameterFloat("Bend End", 0, 0, 1000, true, true);
	obj.addParameterFloat("Randomize Bend End", 0, -100, 100, true, true);

	obj.addParameterSeparator("");
	
	obj.addParameterFloat("Multibend", 0, -1000, 1000, true, true);
	
	obj.addParameterSeparator("Offset");
	
	obj.addParameterFloat("Offset x", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Offset x", 0, -1000, 1000, true, true);
	
	obj.addParameterFloat("Offset y", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Offset y", 0, -1000, 1000, true, true);
    
	obj.addParameterFloat("Offset z", 0, -1000, 1000, true, true);
	obj.addParameterFloat("Relative Offset z", 0, -1000, 1000, true, true);
 /// 





///		
}

var RAD = Math.PI / 180;


var fd;
var fdy, fdz;
var fox, foy, foz;
var mb
var a
var b
var c


function buildObject( obj ) {
	
	var l = obj.getParameter("Length");
	var branchCount = obj.getParameter("Branches");
	var dist = obj.getParameter("Point Distance");
	var dy = obj.getParameter("Direction y");
	var dz = obj.getParameter("Direction z");
	var ox = obj.getParameter("Offset x");
	var oy = obj.getParameter("Offset y");
	var oz = obj.getParameter("Offset z");
	fd = obj.getParameter("Curl");
	fdy = obj.getParameter("Bend y");
	fdz = obj.getParameter("Bend z");
	fox = obj.getParameter("Relative Offset x");
	foy = obj.getParameter("Relative Offset y");
	foz = obj.getParameter("Relative Offset z");
	by = obj.getParameter("Bend End");
	by2 = obj.getParameter("Bend Origin");
	mb = obj.getParameter("Multibend");

			
    var core = obj.core();
	
	for (var i = 0;i < branchCount;i++) {
		
		
///	randomize

	var limitl = obj.getParameter("Randomize Length");
	var limitby = obj.getParameter("Randomize Bend End");
	var limitby2 = obj.getParameter("Randomize Bend Origin");
	
	var randoml = Math.random() * limitl +1;
	var randomby = Math.random() * limitby +1;
	var randomby2 = Math.random() * limitby2 +1;

	
	
	dy_rand = dy ;
	dz_rand = dz ;
	l_rand = l + (l *(randoml+1));
	by_rand = by + (by * (randomby+1));
	by2_rand = by2 + (by2 * (randomby2+1));
///	
	
	core.move( new Vec3D( 0, 0, 0 ) );
	addPoint( core, l_rand, dist, dy_rand, dz_rand, ox, oy, oz, 0, 0, 0, by_rand, by2_rand);
}

		function addPoint( core, l, dist, dy, dz, ox, oy, oz, px, py, pz, by, by2 ) { 
			
	
	
		if (l-- < 1) return;
		
		if (l/10 < by-1)///bend end
  		{a=-1}
		else
		{a=1}
	
		if (1/l < by2/100) ///bend origin
 	 	{b=-1}
		else
		{b=1}
	
		if (1/Math.sin(mb*l) < -1)  ///multibend
 	 	{c=-1}
		else
		{c=1}
	
	
	
		///
	
		var d = Math.cos( dz * RAD ) * dist;
	
		dy = dy + ( a * b * c * fdy ) 
		dz = dz + ( 1 * fdz ) 
		    
		ox = ox + ( 1 * fox )
		oy = oy + ( 1 * foy )
		oz = oz + ( 1 * foz )
	
		px = ( px + Math.cos( dy * RAD ) * d ) + ox;
		py = ( py + Math.sin( dz * RAD ) * d ) + oy;
		pz = ( pz + Math.sin( dy * RAD ) * d ) + oz;

	
		// drawing spline
 		core.line( new Vec3D( px, py, pz ) );
    
		addPoint( core, l, dist * fd, dy, dz, ox, oy, oz, px, py, pz, by, by2 ); 
}}



