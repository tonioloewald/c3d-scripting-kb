// Source: https://www.cheetah3d.com/forum/index.php?threads/6801/post-54811
// Author: tg_jp (Cheetah3D forum), posted 2011-01-21
// Thread: "Extruded Text Maker.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Extruded Text Maker.js
//
// it's a Tool script for Cheetah3D. Place it into ~/Library/Application Support/Cheetah3D/scripts/Tool folder.

// v.20110121c fix bug.
// v.20110121d fix crush bug.
// v.20110122 fix relative spacing bug / adding options.
// v.20110524 fix paramter setting bug.

/*
[text] text contains each characters
[font name] 
[maintain center] move text spline as keep exturde object center
[spacing x/y/z] spacing values for each character object
[rot incremental] set rotation value incrementally for each characters
[rotatoin h/p/b] rotaion values
*/

// you can customize fontname list as you want. you have to use PostScript name of font. you can check it with Font Book.app
var fontnames = ["Lucida Grande", "Georgia", "CourierNewPSMT", "Monaco", "AmericanTypewriter", "GillSans", "HiraKakuProN-W3", "HiraMaruProN-W4"];

function buildUI( tool ) {
	
	tool.addParameterSeparator("Exturde Text Maker");
	
	tool.addParameterString("text", "TEXT", true);
	tool.addParameterSelector("font name", fontnames, true, true);
	
	tool.addParameterSelector("maintain center", ["xyz", "xz", "yz", "none"], true, true);
	
	tool.addParameterBool("relative spacing", 0, 0, 1, true, true);
	tool.addParameterSelector("rel spacing axis", ["x", "y", "z", "xy", "xz", "yz", "-y", "x-y", "-yz", "xyz"], true, true);
	
	tool.addParameterFloat("spacing x", 1.0, -10000, 10000, true, true);
	tool.addParameterFloat("spacing y", 0.0, -10000, 10000, true, true);
	tool.addParameterFloat("spacing z", 0.0, -10000, 10000, true, true);
	tool.addParameterFloat("random spacing x", 0.0, -10000, 10000, true, true);
	tool.addParameterFloat("random spacing y", 0.0, -10000, 10000, true, true);
	tool.addParameterFloat("random spacing z", 0.0, -10000, 10000, true, true);
	
	tool.addParameterBool("rot incremental", 0, 0, 1, true, true);
	tool.addParameterFloat("rotation h", 0, -10000, 10000, true, true);
	tool.addParameterFloat("rotation p", 0, -10000, 10000, true, true);
	tool.addParameterFloat("rotation b", 0, -10000, 10000, true, true);
	tool.addParameterFloat("random rotation h", 0, -10000, 10000, true, true);
	tool.addParameterFloat("random rotation p", 0, -10000, 10000, true, true);
	tool.addParameterFloat("random rotation b", 0, -10000, 10000, true, true);
	
	tool.addParameterBool("scale incremental", 0, 0, 1, true, true);
	tool.addParameterBool("proportional scale", 1, 0, 1, true, true);
	tool.addParameterFloat("scale x", 1, -10000, 10000, true, true);
	tool.addParameterFloat("scale y", 1, -10000, 10000, true, true);
	tool.addParameterFloat("scale z", 1, -10000, 10000, true, true);
	tool.addParameterFloat("random scale x", 0, -10000, 10000, true, true);
	tool.addParameterFloat("random scale y", 0, -10000, 10000, true, true);
	tool.addParameterFloat("random scale z", 0, -10000, 10000, true, true);
	
	tool.addParameterSeparator("Extrude Settings");
	
	tool.addParameterInt("extrudeSteps",  1, 1, 20, true, true);
	
	tool.addParameterFloat("extrudeDirX",  0.0, -10000, 10000, true, true);
	tool.addParameterFloat("extrudeDirY",  0.0, -10000, 10000, true, true);
	tool.addParameterFloat("extrudeDirZ", -0.3, -10000, 10000, true, true);
	
	tool.addParameterFloat("extrudeBevelRadius", 0.05, 0.01, 10000, true, true);
	tool.addParameterFloat("extrudeBevelMiterLimit", 3.0, 1.0, 10.0, true, true);
	tool.addParameterSelector("extrudeBevelType", ["extrudeBevelFlat", "extrudeBevelStaight", "extrudeBevelRound", "extrudeBevelInnerRound", "extrudeBevelStair"], true, true);
	
	tool.addParameterButton("make", "make", "makeExtrudedText");
}

function makeExtrudedText( tool ) {
	
	var str = tool.getParameter("text");
	
	if (str.length == 0) return;
	
	var margin_x = tool.getParameter("spacing x");
	var margin_y = tool.getParameter("spacing y");
	var margin_z = tool.getParameter("spacing z");
	
	var maintain_center = parseInt( tool.getParameter("maintain center") );
	var relative_axis = parseInt( tool.getParameter("rel spacing axis") );
	
	var ran_x = tool.getParameter("random spacing x");
	var ran_y = tool.getParameter("random spacing y");
	var ran_z = tool.getParameter("random spacing z");
	
	var ran_rot_x = tool.getParameter("random rotation h");
	var ran_rot_y = tool.getParameter("random rotation p");
	var ran_rot_z = tool.getParameter("random rotation b");
	
	var scale_x = tool.getParameter("scale x");
	var scale_y = tool.getParameter("scale y");
	var scale_z = tool.getParameter("scale z");
	var ran_scale_x = tool.getParameter("random scale x");
	var ran_scale_y = tool.getParameter("random scale y");
	var ran_scale_z = tool.getParameter("random scale z");
	
	var doc = tool.document();
	var grp = doc.addObject(FOLDER);
	grp.setParameter("name", str);
	
	var spacing = new Vec3D();
	var size = null;
	
	//print('---');
	for (var i = 0;i < str.length;i++) {
		var chr = str.charAt( i );
		
		var tex = doc.addObject( TEXT );
		tex.setParameter("name", chr);
		tex.setParameter("textFont", fontnames[ tool.getParameter("font name") ] );
		tex.setParameter("text", chr);
		
		var extrude = doc.addObject( EXTRUDE );
		extrude.setParameter("name", "extrude_"+chr);
		extrude.setParameter("dirX", tool.getParameter("extrudeDirX"));
		extrude.setParameter("dirY", tool.getParameter("extrudeDirY"));
		extrude.setParameter("dirZ", tool.getParameter("extrudeDirZ"));
		
		extrude.setParameter("steps", tool.getParameter("extrudeSteps"));
		
		extrude.setParameter("bevelRadius", tool.getParameter("extrudeBevelRadius"));
		extrude.setParameter("bevelMiterLimit", tool.getParameter("extrudeBevelMiterLimit"));
		extrude.setParameter("bevelType", tool.getParameter("extrudeBevelType"));
		
		extrude.addChildAtIndex( tex, 0 );
		var size_before = ( size != null )? size.copy() : null;
		var bounding_box = __getSize( extrude );
		
		var vec_max = bounding_box.vec_max;
		var vec_min = bounding_box.vec_min;
		
		var size = vec_max.sub( vec_min );
		var center = vec_max.add( vec_min );
		
		//print( '('+chr+') '+'size:'+size.x.toFixed(2) +', '+size.y.toFixed(2)+', '+size.z.toFixed(2));
		if (tool.getParameter("rot incremental")) {
			extrude.setParameter("rotation", new Vec3D( tool.getParameter("rotation h")*i+Math.random()*ran_rot_x-ran_rot_x/2,
														tool.getParameter("rotation p")*i+Math.random()*ran_rot_y-ran_rot_y/2,
														tool.getParameter("rotation b")*i+Math.random()*ran_rot_z-ran_rot_z/2 ) );
		} else {
			extrude.setParameter("rotation", new Vec3D( tool.getParameter("rotation h")+Math.random()*ran_rot_x-ran_rot_x/2,
														tool.getParameter("rotation p")+Math.random()*ran_rot_y-ran_rot_y/2,
														tool.getParameter("rotation b")+Math.random()*ran_rot_z-ran_rot_z/2 ) );
		}
		if (tool.getParameter("scale incremental")) {
			if (tool.getParameter("proportional scale")) {
				var ran_scale = Math.random()*ran_scale_x;
				extrude.setParameter("scale", new Vec3D( 1+scale_x*i+ran_scale, 1+scale_x*i+ran_scale, 1+scale_x*i+ran_scale ) );
			} else {
				extrude.setParameter("scale", new Vec3D( 1+scale_x*i+Math.random()*ran_scale_x, 1+scale_y*i+Math.random()*ran_scale_y, 1+scale_z*i+Math.random()*ran_scale_z ) );
			}
		} else {
			if (tool.getParameter("proportional scale")) {
				var ran_scale = Math.random()*ran_scale_x;
				extrude.setParameter("scale", new Vec3D( scale_x+ran_scale, scale_x+ran_scale, scale_x+ran_scale ) );
			} else {
				extrude.setParameter("scale", new Vec3D( scale_x+Math.random()*ran_scale_x, scale_y+Math.random()*ran_scale_y, scale_z+Math.random()*ran_scale_z ) );
			}
		}
		
		if (tool.getParameter("relative spacing")) {
			if (i > 0) {
				switch ( relative_axis ) {
					case 0: // x
						var sp_x = size_before.x/2 + size.x/2 + margin_x;
						var sp_y = margin_y;
						var sp_z = margin_z;
						break;
					case 1: // y
						var sp_x = margin_x;
						var sp_y = size_before.y/2 + size.y/2 + margin_y;
						var sp_z = margin_z;
						break;
					case 2: // z
						var sp_x = margin_x;
						var sp_y = margin_y;
						var sp_z = size_before.z/2 + size.z/2 + margin_z;
						break;
					case 3: // xy
						var sp_x = size_before.x/2 + size.x/2 + margin_x;
						var sp_y = size_before.y/2 + size.y/2 + margin_y;
						var sp_z = margin_z;
						break;
					case 4: // xz
						var sp_x = size_before.x/2 + size.x/2 + margin_x;
						var sp_y = margin_y;
						var sp_z = size_before.z/2 + size.z/2 + margin_z;
						break;
					case 5: // yz
						var sp_x = margin_x;
						var sp_y = size_before.y/2 + size.y/2 + margin_y;
						var sp_z = size_before.z/2 + size.z/2 + margin_z;
						break;
					case 6: // -y
						var sp_x = margin_x;
						var sp_y = - size_before.y/2 - size.y/2 + margin_y;
						var sp_z = margin_z;
						break;
					case 7: // x-y
						var sp_x = size_before.x/2 + size.x/2 + margin_x;
						var sp_y = - size_before.y/2 - size.y/2 + margin_y;
						var sp_z = margin_z;
						break;
					case 8: // -yz
						var sp_x = margin_x;
						var sp_y = - size_before.y/2 - size.y/2 + margin_y;
						var sp_z = size_before.z/2 + size.z/2 + margin_z;
						break;
					case 9: // xyz
						var sp_x = size_before.x/2 + size.x/2 + margin_x;
						var sp_y = size_before.y/2 + size.y/2 + margin_y;
						var sp_z = size_before.z/2 + size.z/2 + margin_z;
						break;
				}
				spacing = spacing.add( new Vec3D( sp_x, sp_y, sp_z ) );
			}
			extrude.setParameter("position", new Vec3D( spacing.x + Math.random()*ran_x , spacing.y + Math.random()*ran_y, spacing.z + Math.random()*ran_z ));
			
		} else {
			extrude.setParameter("position", new Vec3D( margin_x * i + Math.random()*ran_x , margin_y * i + Math.random()*ran_y, margin_z * i + Math.random()*ran_z ));
		}
		
		
		if (maintain_center != 3) {
			if (maintain_center == 0) {
				tex.setParameter("position", new Vec3D( center.x/-2, center.y/-2, tool.getParameter("extrudeDirZ") / -2 ) );
			} else if (maintain_center == 1) {
				tex.setParameter("position", new Vec3D( center.x/-2, 0, tool.getParameter("extrudeDirZ") / -2 ) );
			} else if (maintain_center == 2) {
				tex.setParameter("position", new Vec3D( 0, center.y/-2, tool.getParameter("extrudeDirZ") / -2 ) );
			}
		}
		
		grp.addChildAtIndex( extrude, grp.childCount() );
	}
}

function BoundingBox ( _max, _min ) {
	this.vec_max = _max;
	this.vec_min = _min;
}

function __getSize( obj ) {
	var core = obj.core();
	var vertexCount = core.vertexCount();
	
	if ( vertexCount ) {
		var vec = core.vertex( 0 );
		var vec_max = vec.copy();
		var vec_min = vec.copy();
		
		for (var i = 1;i < vertexCount;i++) {
			vec = core.vertex( i );
			
			vec_max.x = Math.max( vec_max.x, vec.x );
			vec_max.y = Math.max( vec_max.y, vec.y );
			vec_max.z = Math.max( vec_max.z, vec.z );
			
			vec_min.x = Math.min( vec_min.x, vec.x );
			vec_min.y = Math.min( vec_min.y, vec.y );
			vec_min.z = Math.min( vec_min.z, vec.z );
		}
		
		//print( 'max:'+vec_max.x.toFixed(2) +', '+vec_max.y.toFixed(2)+', '+vec_max.z.toFixed(2));
		//print( 'min:'+vec_min.x.toFixed(2) +', '+vec_min.y.toFixed(2)+', '+vec_min.z.toFixed(2));
		return new BoundingBox( vec_max, vec_min );
	} else {
		return new BoundingBox( new Vec3D(), new Vec3D() );
	}
}

