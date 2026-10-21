//
// Round Rectangular Spiral.js
// (c) 2010 none
//
//
// Purpose: 
//      For Biot Savart.
//

var min	= 0.5;
var max	= 1.0;
var width = 1.0;
var turns = 1;
var corner = 0.1;


function buildUI(obj){
    obj.setParameter("name","RoundedRect");

    obj.addParameterFloat("Width (X)",           width,  corner, 1000, true, true);    
    obj.addParameterFloat("min Length (Z)",      min,    corner, 1000, true, true);
    obj.addParameterFloat("max Length (Z)",      max,    min,    1000, true, true);
    obj.addParameterInt(  "Number of Turns",     turns,  1,       250, true, true);
    obj.addParameterFloat("Inner Corner Radius", corner, 0,      1000, true, true);
}


function buildObject(obj){
    var spline=obj.core();
	var P1;
	var C1;
	var C2;
	var P2;
    var x;
    var y;
    var dx = (max-min)/turns;
    var minWidth;
    var c = 1.0-4.0/3.0*(Math.sqrt(2.0)-1.0)+0.00037; // Bezier Correction factor for ARC

    min=obj.getParameter("min Length (Z)");
    max=obj.getParameter("max Length (Z)");
    turns=obj.getParameter("Number of Turns");
    corner=obj.getParameter("Inner Corner Radius");
    minWidth=obj.getParameter("Width (X)")-max+min;
 
    x = 0;
    y = 0;
    z = 0;
    P1=new Vec3D(x, 0, y+min);
	spline.move(P1);
    
    for(var i = 1; i <= turns; i++){
		P1 = new Vec3D(x+minWidth+i*dx-corner,  z, y+min+(i-1)*dx         );
		C1= new Vec3D(x+minWidth+i*dx-corner*c, z, y+min+(i-1)*dx         );
		C2= new Vec3D(x+minWidth+i*dx,          z, y+min+(i-1)*dx-corner*c);
		P2 = new Vec3D(x+minWidth+i*dx,         z, y+min+(i-1)*dx-corner  );
		spline.line(P1);
		spline.curve(C1, C2, P2);
		
		P1 = new Vec3D(x+minWidth+i*dx,         z, y-min-i*dx+corner  );
		C1= new Vec3D(x+minWidth+i*dx,          z, y-min-i*dx+corner*c);
		C2= new Vec3D(x+minWidth+i*dx-corner*c, z, y-min-i*dx         );
		P2 = new Vec3D(x+minWidth+i*dx-corner,  z, y-min-i*dx         );
		spline.line(P1);
		spline.curve(C1,C2,P2);

		P1 = new Vec3D(x-minWidth-i*dx+corner,  z, y-min-i*dx         );
		C1= new Vec3D(x-minWidth-i*dx+corner*c, z, y-min-i*dx         );
		C2= new Vec3D(x-minWidth-i*dx,          z, y-min-i*dx+corner*c);
		P2 = new Vec3D(x-minWidth-i*dx,         z, y-min-i*dx+corner  );
		spline.line(P1);
		spline.curve(C1,C2,P2);
		
		P1 = new Vec3D(x-minWidth-i*dx,         z, y+min+i*dx-corner  );
		C1= new Vec3D(x-minWidth-i*dx,          z, y+min+i*dx-corner*c);
		C2= new Vec3D(x-minWidth-i*dx+corner*c, z, y+min+i*dx         );
		P2 = new Vec3D(x-minWidth-i*dx+corner,  z, y+min+i*dx         );
		spline.line(P1);
		spline.curve(C1,C2,P2);
		corner = corner+dx;
	}
	P1 = new Vec3D(x, z, y+min+turns*dx);
	spline.line(P1);

}