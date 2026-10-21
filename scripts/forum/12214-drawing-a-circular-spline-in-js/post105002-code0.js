// Source: https://www.cheetah3d.com/forum/index.php?threads/12214/post-105002
// Author: feloneouscat (Cheetah3D forum), posted 2017-01-06
// Thread: "Drawing a circular spline in JS"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Circle.js
//
// Based off of SineCircle (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use
// it as a starting point for your own creations.
//
// Purpose:
//      Demonstrates how to create a custom spline object.
// Goes in the /Scripts/Splineobj/ folder.

function buildUI(obj){
    obj.setParameter("name","Circle");

    obj.addParameterFloat("Diameter", 0.5, 0.001, 1000.0, true, true);
}


function buildObject(obj) {
    var diameter = obj.getParameter("Diameter");

    var spline=obj.core();

    var pos = new Vec3D(0, 0, 1);
    spline.move(pos);
	
    for(var i=1; i<=360; i++) {
        var ii=Math.PI*2*i/360;
        pos = new Vec3D(Math.sin(ii) * diameter, 0, Math.cos(ii) * diameter);
        spline.line(pos);
    }
}