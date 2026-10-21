//
// CircleExpression.js
// (c) 2014 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom expression tag.
//

function buildUI(tag){
    tag.addParameterInt("priority",10,0,1000,true,true);
    tag.addParameterSeparator("CircleExpression.js");
    tag.addParameterFloat("speed", 1, 0, 1000, false, false);
}   
    

function performExpression(tag){
	var owner=tag.owner();
	var doc=tag.document();
	var t=doc.animationTime();
	
	var speed=tag.getParameter("speed");
	
	owner.setParameter("position",new Vec3D(Math.cos(speed*t),0,Math.sin(speed*t)),false);
}