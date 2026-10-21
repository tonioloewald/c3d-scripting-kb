// Source: https://www.cheetah3d.com/forum/index.php?threads/1415/post-8926
// Author: GuyBrown (Cheetah3D forum), posted 2007-03-08
// Thread: "Shell script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Sea shell
// Guy Brown 2007
//

function buildUI(obj){
    obj.setParameter("name","Seashell");
    obj.addParameterInt("sections",50,0,1000,true,true);
    obj.addParameterFloat("shape_a",-0.2,-10,10,true,true);
    obj.addParameterFloat("shape_b",0.5,-10,10,true,true);
    obj.addParameterFloat("overlap",0.1,-10,10,true,true);
    obj.addParameterFloat("numspirals",2,0.1,20,true,true);
    obj.addParameterBool("flip normals",true,true,true);
    }

function buildObject(obj){
	var core = obj.core();
	var sec = obj.getParameter("sections");
	var a = obj.getParameter("shape_a");
	var b = obj.getParameter("shape_b");
	var c = obj.getParameter("overlap");
	var n = obj.getParameter("numspirals");

	var x,y,z;

	var twopi = 2*Math.PI;

	var verts = [
  		new Vec3D(0,0,0),
   		new Vec3D(0,0,0),
   		new Vec3D(0,0,0),
    		new Vec3D(0,0,0)
    		];

   	core.buildVertexBSP(new Vec3D(-2.0,-2.0,-2.0) ,new Vec3D(2.0,2.0,2.0));

for (var u=1; u<=sec; u++) {

	var u0 = (u-1)*twopi/sec;
	var u1 = u*twopi/sec;

	var cosu0 = 1+Math.cos(u0)+c;
	var sinu0 = Math.sin(u0);
	var cosu1 = 1+Math.cos(u1)+c;
	var sinu1 = Math.sin(u1);

	for (var v=1; v<=sec; v++) {

		var v0 = (v-1)*twopi/sec;
		var v1 = v*twopi/sec;

		var cosnv0 = Math.cos(n*v0);
		var sinnv0 = Math.sin(n*v0);
		var cosnv1 = Math.cos(n*v1);
		var sinnv1 = Math.sin(n*v1);
		var av0pi = a*(1-v0/twopi);
		var av1pi = a*(1-v1/twopi);

		// point u0 v0

		x = av0pi*cosu0*cosnv0;
		y = av0pi*cosu0*sinnv0;
		z = b*v0/twopi+av0pi*sinu0;
		verts[0].set(x,y,z);

		// point u1 v0

		x = av0pi*cosu1*cosnv0;
		y = av0pi*cosu1*sinnv0
		z = b*v0/twopi+av0pi*sinu1;
		verts[1].set(x,y,z);

		// point u1 v1

		x = av1pi*cosu1*cosnv1;
		y = av1pi*cosu1*sinnv1;
		z = b*v1/twopi+av1pi*sinu1;
		verts[2].set(x,y,z);

		// point u0 v1

		x = av1pi*cosu0*cosnv1;
		y = av1pi*cosu0*sinnv1;
		z = b*v1/twopi+av1pi*sinu0;
		verts[3].set(x,y,z);

		core.addPolygon(4,true,verts);
	}
}

core.destroyVertexBSP();

// depending on parameters, may need to flip normals of all polygons to
// get the shading right

if (obj.getParameter("flip normals")) {
	for (var p=0; p<core.polygonCount(); p++)
		core.flipWinding(p);
}

}


