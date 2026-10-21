// Source: https://www.cheetah3d.com/forum/index.php?threads/5834/post-43391
// Author: podperson (Cheetah3D forum), posted 2010-06-07
// Thread: "Particle City"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Particle City
// ©2010 Tonio Loewald
//

function buildUI(obj){
	obj.setParameter("name","Procedural City");
	
	obj.addParameterFloat( "Grid Spacing", 1,0.001,100,true, true);
	obj.addParameterInt("Width",10,3,100,true,true);
	obj.addParameterInt("Depth",10,3,100,true,true);
	obj.addParameterInt("Block Size",2,1,5,true,true);
	obj.addParameterFloat("Street Width",0.3,0.01,1,true,true);
	obj.addParameterFloat("Floor Height",0.05,0.001,1,true,true);
	obj.addParameterInt("Max Floor Reduction",3,0,100,true,true);
	obj.addParameterFloat("Density",0.7,0,1,true,true);
}

function buildObject(obj){
	var core = obj.core();
	
	var gridSpacing = obj.getParameter("Grid Spacing");
	var width = obj.getParameter("Width");
	var depth = obj.getParameter("Depth");
	var blockSize = obj.getParameter("Block Size");
	var streetWidth = obj.getParameter("Street Width");
	var maxFloors = obj.getParameter("Max Floor Reduction");
	var floorHeight = obj.getParameter("Floor Height");
	var density = obj.getParameter("Density");
	
	var w = (width - 1) * gridSpacing + Math.floor( width / blockSize ) * streetWidth;
	var d = (depth - 1) * gridSpacing + Math.floor( depth / blockSize ) * streetWidth;
	
	for( var x = 0; x < width; x++ ){
		for( var z = 0; z < depth; z++ ){
			if( Math.random() < density ){
				var bx = x * gridSpacing - w * 0.5 + Math.floor( x / blockSize ) * streetWidth;
				var bz = z * gridSpacing - d * 0.5 + Math.floor( z / blockSize ) * streetWidth;
							
				var	p = core.addParticle();
				
				// drop each building by a number of floors
				var h = Math.floor(Math.random() * maxFloors ) * floorHeight;
				p.setPosition( new Vec3D(bx, -h, bz) );
				
				// rotate each building by a multiple of 90°
				var r = Math.floor(Math.random() * 4) * 90;
				p.setRotation( new Vec3D( 0, r, 0 ) );
			}
		}
	}
}


