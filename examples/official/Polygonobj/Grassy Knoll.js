//
//  Grassy Knoll
//  (c) 2005 Signwave UK
//  http://www.signwave.co.uk/
//
//  If you use this to generate some awesome visuals, please let us know!
//  mail@signwave.co.uk
//

var blades=450;

function buildUI(obj){
    obj.setParameter("name","Grassy Knoll");
    
    obj.addParameterInt("blades",450,0,1000,true,true);
}

function buildObject(obj){
    var core      = obj.core();

    var bx,bz,ba,bd;
    var gr,gsx,gsz,gra,gsxa,gsza;

    var i,j;

    var x1,y1,z1;
    var x2,y2,z2;
    var x3,y3,z3;
    var x4,y4,z4;
    
    blades=obj.getParameter("blades");
    
    core.buildVertexBSP(new Vec3D(-2.0,0.0,-2.0) ,new Vec3D(2.0,2.0,2.0));
	for (j=0; j < blades; j++) {

	    ba = Math.random() * 6.282;
		bd = Math.random() * Math.random();

		bx = Math.sin(ba) * bd;
		bz = Math.cos(ba) * bd;
   		ba = Math.random() * 6.282;

		gr = Math.random() * 0.1 + 0.03;
		gsx = Math.random() * 0.02;
		gsz = Math.random() * 0.02;
		gra = Math.random() * 0.02 - 0.01;
		gsxa = Math.random() * 0.02 - 0.01;
		gsza = Math.random() * 0.02 - 0.01;
	
		x1 = bx + (Math.sin(ba) * 0.03);
		y1 = 0;
		z1 = bz + (Math.cos(ba) * 0.03);

		x2 = bx - (Math.sin(ba) * 0.03);
		y2 = 0;
		z2 = bz - (Math.cos(ba) * 0.03);
    
		for (i=0; i< 10; i++) {

			x3 = (bx * 0.15) + (x2 * 0.85) + gsx;
			y3 = y2 + gr;
			z3 = (bz * 0.15) + (z2 * 0.85) + gsz;
	
			x4 = (bx * 0.15) + (x1 * 0.85) + gsx;
			y4 = y1 + gr;
			z4 = (bz * 0.15) + (z1 * 0.85) + gsz;
        	
		    var verts = [
    			new Vec3D(x1,y1,z1),
   		 		new Vec3D(x2,y2,z2),
   		 		new Vec3D(x3,y3,z3),
    			new Vec3D(x4,y4,z4)
    					];
			core.addPolygon(4,true,verts);

			x2 = x3;
			y2 = y3;
			z2 = z3;

			x1 = x4;
			y1 = y4;
			z1 = z4;

			gr += gra;
			gsx += gsxa;
			gsz += gsza;

			gra *= 0.95;
		}
	}
    core.destroyVertexBSP();
}



