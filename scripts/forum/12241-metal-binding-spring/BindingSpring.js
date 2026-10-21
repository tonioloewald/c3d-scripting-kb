// Source: https://www.cheetah3d.com/forum/index.php?threads/12241/post-105332
// Author: Oval (Cheetah3D forum), posted 2017-01-17
// Thread: "Metal Binding Spring"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// BindingSpring.js
// (c) 2016 Alexey Ovchinnikov
//
// This script is in the public domain. Feel free to modify it or use
// it as a starting point for your own creations.
//
//


var diameter      = 6.4;
var sections	= 2;
var step1       = 6.0;
var step2       = 2.0;
var roundness	= 2;
var segments	= 240;
function buildUI(obj){
    obj.setParameter('name','BindingSpring');
    obj.addParameterFloat('diameter',6.4,4,10,true,true);
    obj.addParameterFloat('step1',6.0,1.0,10.0,true,true);
    obj.addParameterFloat('step2',2.0,1.0,10.0,true,true);
    obj.addParameterInt('segments',240,60,240,true,true);
    obj.addParameterInt('sections',2,1,34,true,true);
}


function buildObject(obj){
	var spline=obj.core();
    
	diameter=obj.getParameter('diameter');
	sections=obj.getParameter('sections');
	step1=obj.getParameter('step1');
	step2=obj.getParameter('step2');
	segments=obj.getParameter('segments');
	
	roundness = Math.min(step1, step2)/2;
	var step = Math.max(step1, step2);
	
    var radius = diameter/2;

    var line1 = step/2 - roundness;
    print("line1 " + line1);

	var round_on_cyl1 = line1 + Math.PI*roundness/2; //quarter of roundness circle
    print("round_on_cyl1 = " + round_on_cyl1);
    
	var line_on_cyl1 = round_on_cyl1 + (2*Math.PI*radius - 2*roundness);
    print("line_on_cyl1 = " + line_on_cyl1);
    
	var round_on_cyl2 = line_on_cyl1 + Math.PI*roundness; //half of roundness circle
    print("round_on_cyl2 = " + round_on_cyl2);
    
	var line_on_cyl2 = round_on_cyl2 + (2*Math.PI*radius - 2*roundness);
    print("line_on_cyl2 = " + line_on_cyl2);
    
	var round_on_cyl3 = line_on_cyl2 + Math.PI*roundness/2; //quarter of roundness circle
    print("round_on_cyl3 = " + round_on_cyl3);
    
	var line2 = round_on_cyl3 + step/2 - roundness;
    print("line2 = " + line2);
    
	var L = line2;

	var deltaL = L/segments;	//iteration parameter on L length
    print(deltaL);

	var _X = -(step1+step2)*sections/2;
	var _Y = 0;
	var _Z = 0;
	
	var X_ = 0;
	var Y_ = 0;
    
    var X,Y,Z = 0;
	var angle,l = 0;

    var pos=new Vec3D(_X,-radius,_Z);

	spline.move(pos);


	for(var j=0;j<sections;j++)
	{ 

		for(var i=1;i<=segments;i++)
		{
			l = deltaL*i;
			switch(true)
			{
				case(l <= line1):
				X_ = l;
				Y_ = 0;
				break;

				case(l <= round_on_cyl1):
                dl = l - line1;
				angle = dl / roundness;
				X_ = line1 + Math.sin(angle)*roundness;
				Y_ =(1 - Math.cos(angle))*roundness;
				break;
				
				case(l <= line_on_cyl1):
				X_ = step/2;
				dl = l - round_on_cyl1;
				Y_ = roundness + dl;				
				break;


				case(l <= round_on_cyl2):
				dl = l - line_on_cyl1;
				angle = dl / roundness;
                X_ = step/2 + roundness - Math.cos(angle)*roundness;
                Y_ = 2*Math.PI*radius-roundness+Math.sin(angle)*roundness;
				break;


				case(l <= line_on_cyl2):
				X_ = step/2 + 2*roundness;
				dl = l - round_on_cyl2;
                Y_=2*Math.PI*radius-roundness-dl;
				break;


				case(l <= round_on_cyl3):
				dl = l - line_on_cyl2;
				angle = dl / roundness;
				X_ = step/2 + 2*roundness + (1 - Math.cos(angle))*roundness;
				Y_ =(1 - Math.sin(angle))*roundness;
				break;


				case(l <= line2):
				dl = l - round_on_cyl3;
				X_ = step/2 + 3*roundness + dl;
				Y_ = 0;
				break;

			}
			angle = Y_  / radius;
			Y = _Y - Math.cos(angle)*radius;
			Z = _Z + Math.sin(angle)*radius;
			X = _X + X_;
			pos = new Vec3D(X,Y,Z);
            print("X_ = " + X_ + "    Y_ = " + Y_)
			spline.line(pos);
		}
		_X = _X + step1 + step2;	
	}
	X = _X;
	Y = -radius;
	Z = _Z;
	pos=new Vec3D(X,Y,Z);
	spline.line(pos);
}
