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

var weight	= 1.0;
var friction	= 0.5;


function buildUI(tag){
    tag.addParameterSeparator("Physics.js");
    tag.addParameterFloat("weight",0.5,0,1000,true,true);
    tag.addParameterFloat("friction",1,0,1000,true,true);
}
