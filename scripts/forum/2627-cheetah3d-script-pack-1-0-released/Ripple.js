// Source: https://www.cheetah3d.com/forum/index.php?threads/2627/post-18122
// Author: hairball600 (Cheetah3D forum), posted 2008-01-28
// Thread: "Cheetah3D Script Pack 1.0 Released!!!"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Ripple.js (beta)
//
//	Todd Rogers
//  feel free to modify to suit your needs
//	only tested with Cheetah3D  3.2
//
//  20060615: modified by Hiroto Tsubaki
//              added basic Plane UV
//              added size (x width, z width)
//              added steps (means how many steps a one frame)
//              added use Ball (use child Ball Object(s) for drop, Ball x/z position -> drop position, Ball radius -> drop amount, Ball y position ( 0.5 is 5 step ) -> drop step count (in auto drop mode)
//              added use Ball checkbox. if checked, use child Ball Object for drop.
//              added auto drop checkbox. if checked, trigger drop with drop register.
//              added Register Drops button. for auto drop mode, register drop info from child Ball Object(s) and reset steps to 0.  
//              added Update button for culclate wave to steps.

// Usage: Place this into scripts/Polygonobj folder. restart Cheetah3D, then select from Tools -> Scritp -> Polygon Script
//


var tank = new Array;
var vel = new Array;

var dropResister = new Array;

var width = 0;
var height = 0;
var stepsTotal = 0;


function z(x,y) {
	return x +y*width;
}

function resetTank(x,y) {
    var i;
    var j;
	var index;
	width = x;
	height = y;
	for(i = 0;i<x;i++) {
		for(j = 0;j < y;j++) {
			index = z(i,j);
			tank[index] = 0;
			vel[index] = 0;
			//print(i + "," + j +"," + z(i,j));
		}
	}
}

function buildUI(obj){
    
	obj.setParameter("name","Wave Object");

    obj.addParameterFloat("x width",1,0.1,100,true,true);
    obj.addParameterFloat("z width",1,0.1,100,true,true);
    
	obj.addParameterInt("x Divisions",10,4,100,true,true);
	obj.addParameterInt("z Divisions",10,4,100,true,true);
	
	// a dirty way to get called every frame
	obj.addParameterFloat("time",0,0,10000,true,true);
	
	// step
	obj.addParameterFloat("steps",1,0,100,true,true);
	
	obj.addParameterButton("Calm the water","Calm","calm");
	
	obj.addParameterSeparator("Drop");
	obj.addParameterBool("use Ball",0,0,1,false,false);
	obj.addParameterBool("auto drop",0,0,1,false,false);
	obj.addParameterButton("Add Drop","Drop","adddrop");
	obj.addParameterButton("Register Drops","Register","registerDrop");
	
	obj.addParameterSeparator("Update");
	obj.addParameterButton("Update","Update","waveUpdate");
	resetTank(10,10);
}

function waveUpdate(obj) {
    obj.update();
}

function adddrop(obj) {
    var useBall = obj.getParameter("use Ball");
    
    if (useBall == false) {
        
    	var x = Math.floor(Math.random() * width);
    	var y = Math.floor(Math.random() * height);
    	var amount = Math.random() * .25 + .5;
    	print("amount:"+amount);
    	
    	EnergyEvent( x,y,amount);
    	
	} else {
    	var childCount = obj.childCount();
        var xwidth = obj.getParameter("x width");
        var zwidth = obj.getParameter("z width");
        var xdiv = obj.getParameter("x Divisions");
        var zdiv = obj.getParameter("z Divisions");
        
    	for (var i = 0;i < childCount;i++) {
    	   var child = obj.childAtIndex(i);
    	   if (child.type() == BALL) {
    	       var pos = child.getParameter("position");
    	       var amount = child.getParameter("radius");
    	       print("x:"+pos.x+",y:"+pos.z+",amount:"+amount);
    	       var xi = Math.floor((pos.x+xwidth/2)*xdiv/xwidth);
    	       var zi = Math.floor((pos.z+zwidth/2)*zdiv/zwidth);
    	       print("xi:"+xi+",yi:"+zi+",amount:"+amount);	       
    	       EnergyEvent(xi, zi, amount*10);
    	   }
    	}
	}
	obj.update();
}

function registerDrop(obj) {
    var childCount = obj.childCount();
    var dropIndex = 0;
    var xwidth = obj.getParameter("x width");
    var zwidth = obj.getParameter("z width");
    var xdiv = obj.getParameter("x Divisions");
    var zdiv = obj.getParameter("z Divisions");

    if (dropResister.length > 0) dropResister = new Array;
    for (var i = 0;i < childCount;i++) {
    	var child = obj.childAtIndex(i);
        if (child.type() == BALL) {
            var pos = child.getParameter("position");
            var amount = child.getParameter("radius")*10;
            var xi = Math.floor((pos.x+xwidth/2)*xdiv/xwidth);
            var zi = Math.floor((pos.z+zwidth/2)*zdiv/zwidth);
            var yi = Math.floor(pos.y*10);
            dropResister[dropIndex] = new Array(yi,xi,zi,amount);
            dropIndex++;
        }
    }
    stepsTotal = 0; // reset
}
function addDropFromResister(steps) {
    var dropCount = dropResister.length;
    for (var i = 0;i < dropCount;i++) {
        print("regi:"+dropResister[i][0]+",steps:"+steps);
        if (steps == Math.floor(dropResister[i][0])) {
            EnergyEvent(dropResister[i][1], dropResister[i][2], dropResister[i][3]);
            print("addFromRegister:"+dropResister[i][3]);
        }
    }
}

function calm(obj) {
	resetTank(width,height);
	stepsTotal = 0;
	obj.update();
}


function buildObject(obj){
	// i will always draw the object from -.5 to .5 in both the x and z directions
	// just to make things simpler
	var xwidth = obj.getParameter("x width");
	var zwidth = obj.getParameter("z width");
	//
	var x = obj.getParameter("x Divisions");
	var y = obj.getParameter("z Divisions");
	var t = obj.getParameter("time");
    var steps = parseInt(Math.floor(obj.getParameter("steps")));
    var auto = obj.getParameter("auto drop");

	var core = obj.core();
	var i;
	var j;
	if( x != width || y != height) {
	   resetTank(x,y);
	   stepsTotal = 0;
	} else {
	   for (i = 0;i < steps;i++) {
    		if (auto) {
    		   addDropFromResister(stepsTotal);
    		}
    		StepVelocity();
    		stepsTotal++;
	   }
	}
	print("stepsTotal:"+stepsTotal);
// this will add drops randomly more so as time passes
// change to suit your needs
//	if( Math.random() < t/30)
//		adddrop(obj);
	core.buildVertexBSP(new Vec3D(-xwidth / 2 ,-3,-zwidth /2) ,new Vec3D(xwidth /2 ,3,zwidth /2 ));
	var xStep = xwidth / (x-1);
	var zStep = zwidth / (y-1);
	var zPoint;
	var xPoint = -1 * xwidth / 2; // -.5;
	var xuvt = 1 / (x - 1);
	var zuvt = 1 / (y - 1);
	for(i = 0;i<x-1;i++) {
		zPoint = -1 * zwidth / 2; // -.5;
		for(j = 0;j < y-1;j++) {
			// link the squares like so:
			// -- tank[0][0] <-> tank[1][0] <-> tank[1][1] <-> tank[0][1]
			
			var p = [	new Vec3D(xPoint		,tank[z(i,j)]     ,zPoint),
						new Vec3D(xPoint+xStep	,tank[z(i+1,j)]   ,zPoint),
						new Vec3D(xPoint+xStep	,tank[z(i+1,j+1)] ,zPoint+zStep),
						new Vec3D(xPoint		,tank[z(i,j+1)]   ,zPoint+zStep)];
			var uv = [   
			             new Vec2D(xuvt*(i), zuvt*(j)),
			             new Vec2D(xuvt*(i+1), zuvt*(j)),
			             new Vec2D(xuvt*(i+1), zuvt*(j+1)),
			             new Vec2D(xuvt*(i), zuvt*(j+1))
			         ];
			core.addPolygon(4,true,p,uv);
			zPoint = zPoint + zStep;
		}
		xPoint = xPoint + xStep;
	}
	core.destroyVertexBSP();
}


// thanks to http://www.its.caltech.edu/~matthewf/ for the following code
// taken and modified to javascript
function bounded( Value,  Low,  High)
{
	if(Value >= Low && Value < High) return true;	//returns whether coordinate Value is between Low and High
	return false;
}

function HeightZero( x,  y)	//returns the height if x, y is on the map, 0 otherwise
{
	if(bounded(x,0,width) && bounded(y,0,height)) return tank[z(x,y)];
	return 0.0;
}

function EnergyEvent( x,  y,  factor)	//adds a drop of water by altering the velocities around the point x, y
{
	if(bounded(x,0,width) && bounded(y,0,height)) vel[z(x,y)] -= factor * 0.25;

	if(bounded(x-1,0,width) && bounded(y,0,height)) vel[z(x-1,y)] -= factor * 0.125;
	if(bounded(x+1,0,width) && bounded(y,0,height)) vel[z(x+1,y)] -= factor * 0.125;
	if(bounded(x,0,width) && bounded(y-1,0,height)) vel[z(x,y-1)] -= factor * 0.125;
	if(bounded(x,0,width) && bounded(y+1,0,height)) vel[z(x,y+1)] -= factor * 0.125;

	if(bounded(x-1,0,width) && bounded(y-1,0,height)) vel[z(x-1,y-1)] -= factor * 0.0625;
	if(bounded(x-1,0,width) && bounded(y+1,0,height)) vel[z(x-1,y+1)] -= factor * 0.0625;
	if(bounded(x+1,0,width) && bounded(y-1,0,height)) vel[z(x+1,y-1)] -= factor * 0.0625;
	if(bounded(x+1,0,width) && bounded(y+1,0,height)) vel[z(x+1,y+1)] -= factor * 0.0625;
}

function StepVelocity()
{
	var i,i2;
	var Desire;
	var AvgHeight=0.0;
	for(i=0;i<width;i++) {
		for(i2=0;i2<height;i2++) {
			Desire = 
					 (HeightZero(i-1,i2-1) + 
					  HeightZero(i-1,i2+1) + 
					  HeightZero(i+1,i2-1) + 
					  HeightZero(i+1,i2+1)) * (1.0 / 12.0)
					  +
					 (HeightZero(i+1,i2) +
					  HeightZero(i,i2+1) +
					  HeightZero(i-1,i2) +
					  HeightZero(i,i2-1)) * (2.0 / 12.0);		//height this point wants to be at

			// Update velocity
			var ii2 = z(i,i2);
			if(vel[ii2] > 0.005 || vel[ii2]  < -0.005)
				vel[ii2] *= 0.995;				//dissipate
			vel[ii2] += 0.3 * (Desire - tank[ii2]);	//change velocity
			AvgHeight += tank[ii2] + vel[ii2];			//update average height
		}
	}
	AvgHeight /= (width * height);
	
	for(i=0;i<width;i++) {
		for(i2=0;i2<height;i2++) {
			var ii2 = z(i,i2);
			tank[ii2] += vel[ii2] - AvgHeight;	//normalize the heights
		}
	}
}