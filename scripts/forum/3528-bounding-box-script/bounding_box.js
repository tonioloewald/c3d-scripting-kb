// Source: https://www.cheetah3d.com/forum/index.php?threads/3528/post-24941
// Author: bugaboo (Cheetah3D forum), posted 2008-09-26
// Thread: "bounding box script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 bounding_box.js
 Cheetah3D Script ( 4.6.2 )
 9.28.2008
 Version 1.2

 Courtesy of Bugaboo. No strings attached....

 Usage: Place this into scripts/Tool folder. restart Cheetah3D, 
 then select from Tools -> Scritp -> Tool Script
*/

function buildUI(obj){	
	obj.addParameterSeparator("Bounding Box");
	obj.addParameterButton("Make Bounding Box","Create","CreateBox");
 	obj.addParameterBool("New Object",1,0,1,true,true); 
}


function CreateBox(obj) {
	
	// the passed in object is used to get the document
	var root = obj.document();
	
	// the root is then used to find the selected object
	var o = root.selectedObject();

	// if nothing is selected do nothing
	if( o == null)
		return;

 	o.update();
 	
	// now take the object and ask for the polyCore object
	// this is asking for the points of the object after any modiferies are applied
	var core = o.modCore();	
	
	// now that we have the core of the object, ask how many points are in it
	var size = core.vertexCount();
	
	//sanity check
	if( size == 0 ) {
		return;
	}
	
	// now set an accumalator to zero	
	var min = core.vertex(0);
	var max = core.vertex(0);
	
	// now loop thru all the points
	//find the minimum and maximum values
	for( var i = 0; i < size;i++) {

		var loc =  core.vertex(i) ;
		
		if( loc.x < min.x ) {
			min.x = loc.x;
		}
		
		if( loc.y < min.y ) {
			min.y = loc.y;	 
		}
		
		if( loc.z < min.z ) {
			min.z = loc.z;
		}
		 		
		if( loc.x > max.x ) {
			max.x = loc.x;
		}
		
		if( loc.y > max.y ) {
			max.y = loc.y;	 
		}
		
		if( loc.z > max.z ) {
			max.z = loc.z;
		}
		
	}
	
	//create a bounding box
	
	 var top = [
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0)
	 ];
	 
	 var bot = [
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0)
	 ];
	 
	 var s1 = [
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D( 0, 0, 0),
	 	new Vec3D( 0, 0, 0)
	 ];
	 
	 var s2 = [
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D( 0, 0, 0)
	 ];
	 
	 var s3 = [
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D( 0, 0, 0),  
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D(0, 0, 0)
	 ];
	 
	 var s4 = [
	 	new Vec3D( 0, 0, 0),  
	 	new Vec3D( 0, 0, 0),  
	 	new Vec3D( 0, 0, 0), 
	 	new Vec3D(0, 0, 0)
	 ];
	 
	 
	//top
	top[0].set(max.x,max.y,max.z);
	top[1].set(min.x,max.y,max.z);
	top[2].set(min.x,max.y,min.z);
	top[3].set(max.x,max.y,min.z);
	
 	//bottom
	bot[0].set(max.x,min.y,max.z);
	bot[1].set(min.x,min.y,max.z);
	bot[2].set(min.x,min.y,min.z);
	bot[3].set(max.x,min.y,min.z);
	
	//side 1
	s1[0].set(max.x, max.y,max.z);
	s1[1].set(max.x,min.y,max.z);
	s1[2].set(max.x,min.y,min.z);
	s1[3].set(max.x,max.y,min.z);
 
	//side 2
	s2[0].set(min.x,max.y,max.z);
	s2[1].set(min.x,min.y,max.z);
	s2[2].set(min.x,min.y,min.z);
	s2[3].set(min.x,max.y,min.z);
 	
	//side 3
	s3[0].set(max.x,max.y,max.z);
	s3[1].set(max.x,min.y,max.z);
	s3[2].set(min.x,min.y,max.z);
	s3[3].set(min.x,max.y,max.z);

	//side 4
	s4[0].set(max.x,max.y,min.z);
	s4[1].set(max.x,min.y,min.z);
	s4[2].set(min.x,min.y,min.z);
	s4[3].set(min.x,max.y,min.z);

 	
 	//get user settings
	var seperate = obj.getParameter("New Object");
	
	//create a separate object or modify the selected object
	if( seperate ) {

		//get the transformation matrix
		//var mtrx = o.obj2WorldMatrix();
		var mtrx = o.objMatrix();
				
		//create a bounding box transforming into local transform
		var v1 = new Vec4D(0,0,0,1);
		var v2 = new Vec4D(0,0,0,1);
		
		for( var i = 0; i < 4;i++) {
			v1.set(top[i].x,top[i].y,top[i].z,1);
			v2 = mtrx.multiply(v1);
			top[i].set(v2.x,v2.y,v2.z);
			
			v1.set(bot[i].x,bot[i].y,bot[i].z,1);
			v2 = mtrx.multiply(v1);
			bot[i].set(v2.x,v2.y,v2.z);
	
			v1.set(s1[i].x,s1[i].y,s1[i].z,1);
			v2 = mtrx.multiply(v1);
			s1[i].set(v2.x,v2.y,v2.z);
	
			v1.set(s2[i].x,s2[i].y,s2[i].z,1);
			v2 = mtrx.multiply(v1);
			s2[i].set(v2.x,v2.y,v2.z);
	
			v1.set(s3[i].x,s3[i].y,s3[i].z,1);
			v2 = mtrx.multiply(v1);
			s3[i].set(v2.x,v2.y,v2.z);
	
			v1.set(s4[i].x,s4[i].y,s4[i].z,1);
			v2 = mtrx.multiply(v1);
			s4[i].set(v2.x,v2.y,v2.z);
		}
		
		var myobject = root.addObject(POLYGONOBJ);
		var myobject_core = myobject.modCore();
		
		//add the new polygons to the object
		myobject_core.addPolygon(4, true, top);
		myobject_core.addPolygon(4, true, bot);
		myobject_core.addPolygon(4, true, s1);
		myobject_core.addPolygon(4, true, s2);
		myobject_core.addPolygon(4, true, s3);
		myobject_core.addPolygon(4, true, s4);		
	
		//update just in case
		myobject.update();
	}
	else {
		
		//add the new polygons to the object
		//this should already be offset
		core.addPolygon(4, true, top);
		core.addPolygon(4, true, bot);
		core.addPolygon(4, true, s1);
		core.addPolygon(4, true, s2);
		core.addPolygon(4, true, s3);
		core.addPolygon(4, true, s4);	
	
		//I suppose we just update
		o.update();
	}

	
}
	
	
