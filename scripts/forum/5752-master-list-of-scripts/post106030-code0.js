// Source: https://www.cheetah3d.com/forum/index.php?threads/5752/post-106030
// Author: crgreen (Cheetah3D forum), posted 2017-02-22
// Thread: "Master List of Scripts"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// PendulumExpression.js
// (c) 2014 Martin Wengenmayer (morphed from CircleExpression by CR Green)
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Demonstrates how to create a custom expression tag.
//

function buildUI(tag){
    tag.addParameterInt("priority",10,0,1000,true,true);
    tag.addParameterSeparator("PendulumExpression.js");
    tag.addParameterFloat("speed", 5, 0, 1000, false, false);
    tag.addParameterFloat("maxAngle", 20, 0, 90, false, false);
    tag.addParameterFloat("restTime", 20, 0, 90, false, false);
    tag.addParameterSelector("axis", ["Y", "Z"], false, false);

}   
    

function performExpression(tag){
    var owner=tag.owner();
    var doc=tag.document();
    var t=doc.animationTime();
    
    var speed=tag.getParameter("speed");
    var maxAngle=tag.getParameter("maxAngle");
    var restTime=tag.getParameter("restTime");
    var axisSel = parseInt(tag.getParameter("axis"));
    
    var startDelaySecs = 0;
    
    var ampl = ((t-startDelaySecs)*(0-maxAngle)/(restTime-startDelaySecs)+maxAngle);
    var o = Math.sin(t* speed)*ampl;
    rest=0;//degress of rest zero
    if (t >= restTime) {
      v=rest;
    } else {
      v=(rest + o);
    }
    
    p=owner.getParameter("rotation");
    
    if (axisSel == 0) {
      owner.setParameter("rotation", new Vec3D(p.x, v, p.z), false );
    }else{
      owner.setParameter("rotation", new Vec3D(p.x, p.y, v), false );
    }
}