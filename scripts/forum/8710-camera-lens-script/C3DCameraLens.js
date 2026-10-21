// Source: https://www.cheetah3d.com/forum/index.php?threads/8710/post-72673
// Author: chris g (Cheetah3D forum), posted 2012-08-21
// Thread: "Camera Lens Script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/**

Name: C3DCameraLens.js
Description: Controls the field of view and depth of field settings on a Cheetah3D Camera object.
Author: christopher guy
Version: 1.2

Useage:
	* Measurements are based on 1.0 unit = 1 meter, .01 = 1 centimeter and .001 = 1 millimeter. If you want measurements in feet and inches, grab your calculator (25.4 mm per inch).
	* Designed for Cheetah3D v6+. May work on older versions of Cheetah3D that support scripting.
	* Copy file into <User>/Library/Application Support/Cheetah3D/Scripts/Polygonobj folder. Restart Cheetah3D.
	* To Add Camera Lens from the menu go to Tools->Scripts->Polygon Scripts->C3DCameraLens.js 
	* Camera Lens automatically uses the active camera. To use a different camera, parent the Camera Lens object to the Camera you want to use. 
	* A different 'lens' can be set for each camera, by parenting the lens script to a camera. The Camera Lens script will respect field of view settings on the camera, if they were changed before adding Camera Lens. Setting the field of view directly will not update the Camera Lens focal length. Use Camera Lens settings.
	
	* Focal Length (mm): Sets the camera's field of view based on the focal length of a full frame camera lens. The default focal length is 33mm, which is roughly the equivalent the default field of view setting (40) on the Caemra Object.
	* Enable Depth of Field: Enables DOF settings. A DOF tag will be created automatically on the current camera if one doesn't already exist. Setting focal distance or lens radius on the DOF tag directly will not update the Camera Lens Object. Use Camera Lens settings.
	* Aperture (f/stop): Set the f/stop to control the depth of field. Valid entries are 1 - 128. Default f/stop is 5.6.
	* Focal Distance: Adjusts the the focal point of the camera.
	* Scale: Default is 1:1 ratio. Adjusts the Depth of Field (DOF) settings to aproximate the same Depth of Field one would get if the scene/object were full scale (1:1). Scaling is handy for objects that are very large or very small. For example it's not practical to build a city at 1:1 scale in a 3D program, so one might build it at ratio of 1:100 where 1 unit of measurement is equal to 100. But without scaling the DOF, the city renderd from the same distance, aperture and focal length would have a DOF the same as if you were photographing a model city.
	* Target: Drag and Drop an object into Target to set the focal distance to that object. Setting the target will override the Focal Distance settings. To manually set the Focal Distance, delete the target object.
	
Thanks to Hiroto Tsubaki (tg_jp) and his 'DOF Target.js' and 'DOF Helper.js' scripts for giving me an idea how to handle depth of field settings and the math for handling obj2Worldmatrix data.

Legal Notices:

Copyright (C) 2012 christopher guy

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/gpl.html>.

 */

function C3DCameraLens(obj)
{
	this.obj = obj;

	this.doc = this.obj.document();
	this.camera = this.doc.activeCamera();
	
	this.FILM_WIDTH = 36;
	this.FILM_HEIGHT = 24;
	
    this.defaultScale = "1:1";
    
	this.focalLength = 33;
	this.fstop = 5.6;
	this.distance = 5;
	
	this.dofTag = null;
}

C3DCameraLens.prototype.init = function()
{
	
	if(!this.obj) return;
	
	if(this.camera) {
		// set the position and rotation based on camera
		var pos = this.getPosition( this.camera );
		var rot = this.getRotation( this.camera );
	
		this.obj.setParameter("position", pos);
		this.obj.setParameter("rotation", rot);
		
		// get existing FOV and set the focal length
		var fov = this.camera.getParameter("fieldOfView");
		this.focalLength = this.getFocalLength( fov );
	}
	
	// create UI
	this.obj.setParameter("name", "Camera Lens");
	this.obj.addParameterSeparator("Camera Lens");
	
	this.obj.addParameterInt("Focal Length (mm)", this.focalLength, 1, 275, true, true);
	this.obj.addParameterBool("Enable Depth of Field", false, 0, 1, false, true);
	this.obj.addParameterFloat("Aperture (f/stop)", this.fstop, 1, 128, true, true);
	this.obj.addParameterFloat("Focal Distance", this.distance, .001, 10000, true, true);
	this.obj.addParameterString("Scale (1:1)", this.defaultScale, true);
	this.obj.addParameterSeparator("Use Target Focal Distance");
	this.obj.addParameterLink("Target", true);
}

C3DCameraLens.prototype.setCamera = function( focalLength, fstop, distance )
{
	// check for an owner of this object every time in case it's moved.
	var owner = this.obj.owner();
	if(!this.owner) {
		// has no owner, set the camera reference to active camera.
		this.camera = this.doc.activeCamera();
		
	} else {
		// has an owner, check owner type.
		if( owner.type() != 2 ) {
			// owner is not a camera. let's go ahead and stop you there.
			OS.beep();
			OS.messageBox("Error", "Camera Lens should only be parented to a Camera object. ");
			return;	
		}
		// owner is a camera, set the camera reference to this owner 
		this.camera = owner;
	}
	
	var fov_v = this.getFieldOfView( focalLength );
	this.camera.setParameter("fieldOfView", fov_v, false );
    
	// don't do anything else unless Enable DOF is checked
    if(!this.obj.getParameter("Enable Depth of Field") ) {
        return;
    }
	
	this.dofTag = this.getDOFTag( this.camera );
	if(!this.dofTag ) {
		this.dofTag = this.setDOFTag( this.camera );
	}
	
    var target = this.obj.getParameter("Target");

    if(target) {
        // get target distance and use that instead
        distance = this.getDistance( this.camera, target );
		
        if(this.obj.getParameter("Focal Distance") != distance) {
			// override the focal distance setting
        	this.obj.setParameter("Focal Distance", distance, false);
       	}
    }
	
	var str = this.obj.getParameter("Scale (1:1)");
	var patt = new RegExp("[0-9][:/][0-9]");
	
	if(!patt.test(str) ) {
		OS.beep();
		OS.messageBox("Error", "Scale value must contain two numbers separated by a colon or forward slash (: or /), for expample 1:100");
		return;
	}
	
	var tmp = str.split(":");
	if(str.indexOf("/") != -1) {
		tmp = str.split("/");
	}
	// prevent divide by 0
	if(Number(tmp[1]) <= 0) tmp[1] = 1;
	var scale = tmp[0]/tmp[1];
	
	var lensRadius = this.getApertureSize(focalLength, fstop, scale);
	
	this.dofTag.setParameter("lensRadius", lensRadius, false );
    this.dofTag.setParameter("focalDistance", distance, false );
}

/**
 * creates the DOF tag on the supplied camera if one doesn't exist or returns the existing DOF tag
 * @camera: the camera to get the DOF tag
 * @return: DOF Tag object
 */
C3DCameraLens.prototype.setDOFTag = function( camera )
{
    var tag = this.getDOFTag( camera );
	
    if(!tag) {
		tag = camera.addTagOfType(DOFTAG);
	}
	
	return tag;
}

/**
 * gets the existing DOF tag on the supplied camera
 * @camera: the camera to get the DOF tag
 * @return: DOF Tag object or null
 */
C3DCameraLens.prototype.getDOFTag = function( camera )
{
	var count = camera.tagCount();
    var doftag = null;
    var tag = null;
    
    for(var i = 0; i < count; i++) {
        tag = camera.tagAtIndex(i);
        if(tag.type() == DOFTAG) {
            doftag = tag;
			break;
        }
    }
  	
	return doftag;
}

/**
 * calculates the focal length based on the field of view (assumes a full frame 35mm camera)
 * @flen: number: Focal Length of the lens in millimeters
 * @return: Number
 */
C3DCameraLens.prototype.getFieldOfView = function( flen )
{
	var fov = 2 * Math.atan(this.FILM_HEIGHT / (2 * flen)) * (180 / Math.PI);
	return Number( fov.toPrecision(4) );
}
	
/**
 * calculates the focal length based on the field of view (assumes a full frame 35mm camera)
 * @fov: number: field of view/angle of view
 * @return: Number in millimeters
 */
C3DCameraLens.prototype.getFocalLength = function( fov )
{
	var E = fov * 0.5;
	var a2 = this.FILM_HEIGHT * 0.5;

	return Math.round( a2/Math.tan( E * (Math.PI/180)) );
}
	
/**
 * gets the distance between the camera and a target
 * @flen: the focal length of the camera lens
 * @fstop: the aperture (f/stop) setting  
 * @return: Number
 */
C3DCameraLens.prototype.getApertureSize = function( flen, fstop, scale )
{
    var aperturesize = (flen/fstop) / (1000 / scale);
    
    return Number( aperturesize.toPrecision(6) );
}

/**
 * gets the distance between the camera and a target
 * @camera: the camera you want to measure from
 * @target: the object you want to measure to 
 * @return: Vec3D
 */
C3DCameraLens.prototype.getDistance = function( camera, target )
{
    var c_pos = camera.obj2WorldMatrix().multiply( new Vec3D() );
    var t_pos = target.obj2WorldMatrix().multiply( new Vec3D() );
    
    var distance = t_pos.sub( c_pos );
    
    return distance.norm();
}

/**
 * gets the rotation of the supplied object in relation to the world
 * @obj: the object to to get the rotation
 * @rotVec3D: a Vec3D object
 * @return: Vec3D
 */
C3DCameraLens.prototype.getRotation = function( obj, rotVec3D ) 
{
	if(rotVec3D == undefined) rotVec3D = new Vec3D();
	
    rotVec3D = rotVec3D.add( obj.getParameter("rotation") );
    
    if (obj.owner()) {
        return this.getRotation( obj.owner(), rotVec3D );
    } else {
        return rotVec3D;
    }
}
/**
 * gets the position of the supplied object in relation to the world
 * @obj: the object to get the position
 * @return: Vec3D
 */
C3DCameraLens.prototype.getPosition = function( obj ) 
{
    var mtrx = obj.obj2WorldMatrix();
    var pos = new Vec3D(mtrx.m03, mtrx.m13, mtrx.m23);
    
    return pos;
}

var cc;
function buildUI(obj)
{
	cc = new C3DCameraLens(obj);
	cc.init();
}

function buildObject(obj) 
{
    cc.setCamera( obj.getParameter("Focal Length (mm)"), obj.getParameter("Aperture (f/stop)"), obj.getParameter("Focal Distance") );
}
