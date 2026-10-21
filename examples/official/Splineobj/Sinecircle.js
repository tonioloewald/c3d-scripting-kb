//
// Sinecircle.js
// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom spline object.
//

var height	= 0.5;
var frequency	= 1.0;


function buildUI(obj){
    obj.setParameter("name","SineCircle");
    
    obj.addParameterFloat("height",0.5,0,4,true,true);
    obj.addParameterInt("frequency",4,1,250,true,true);
}


function buildObject(obj){
    var spline=obj.core();
    
    height=obj.getParameter("height");
    frequency=obj.getParameter("frequency");
    
    for(var i=0;i<=360;i++){
	var ii=Math.PI*2*i/360;
	var pos=new Vec3D(Math.sin(ii),height*Math.sin(frequency*ii),Math.cos(ii));
	
	if(i==0)    spline.move(pos);
	else	    spline.line(pos);
	}
}