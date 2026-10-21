// Source: https://www.cheetah3d.com/forum/index.php?threads/9038/post-74936
// Author: Edward (Cheetah3D forum), posted 2012-11-25
// Thread: "Debugging Types in Cheetah3D"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function main (document) {
    
    var object = document.selectedObject()
    
    if (object == null) {
        OS.beep()
        OS.messageBox("Error","Please select an object first.")
    }
	
    print("\n\n\n");
	
    printObject(object);
	
    printTags(object);
}

function printObject (object) {

    var objName   = object.getParameter("name");
    var objType   = objectToString(object.type());
    var objFamily = familyToString(object.family());
	
    
    print("-----------------------")
    print("        OBJECT         ")
    print("-----------------------")
    print("Name:   " + objName)
    print("Type:   " + objType)
    print("Family: " + objFamily)
    print("-----------------------")
	
	printParameters(object);
}

function printTags (object) {
    
    var tagCount = object.tagCount()
    
    for (var i = 0; i < tagCount; i++) {
        var tag       = object.tagAtIndex(i)
        var tagType   = tagToString(tag.type())
        var tagFamily = familyToString(tag.family())
        var tagParams = tag.parameterInfo()
        
        print("-----------------------")
        print("          TAG          ")
        print("-----------------------")
        print("Type:   " + tagType)
        print("Family: " + tagFamily)
        print("-----------------------")
        
        printParameters(tag);
    }
}

function printParameters (object) {
	
	var count = object.parameterCount();
	
	for (var i = 0; i < count; i++) {
		var parameter = object.parameterAtIndex(i);
		var name      = parameter.name();
		var type      = parameterToString(parameter.type());
		
		print("[" + type + "] " + name);
		
		if (type == "Int" || type == "Bool" || type == "String") {
			var value = object.getParameter(name);
			print("\t" + value);
		}
		
		if (type == "Float") {
			var value = object.getParameter(name);
			print("\t" + value.toFixed(2));
		}
		
		if (type == "Vec2D") {
			var value = object.getParameter(name);
			print("\t(" + value.x.toFixed(2) + ", " + value.y.toFixed(2) + ")");
		}
		
		if (type == "Vec3D") {
			var value = object.getParameter(name);
			print("\t(" + value.x.toFixed(2) + ", " + value.y.toFixed(2) + ", " + value.z.toFixed(2) + ")");
		}
		
		if (type == "Vec4D") {
			var value = object.getParameter(name);
			print("\t(" + value.x.toFixed(2) + ", " + value.y.toFixed(2) + ", " + value.z.toFixed(2) + ", " + value.w.toFixed(2) + ")");
		}
	}
}

function tagToString (type) {
	
	if (type == ANCHORTAG)				type = "ANCHORTAG";
	if (type == BAKETAG)				type = "BAKETAG";
	if (type == CAUSTICTAG)				type = "CAUSTICTAG";
	if (type == FOGTAG)					type = "FOGTAG";
	if (type == HDRITAG)				type = "HDRITAG";
	if (type == IKHANDLETAG)			type = "IKHANDLETAG";
	if (type == IKCONSTRAINTTAG)		type = "IKCONSTRAINTTAG";
	if (type == METABALLTAG)			type = "METABALLTAG";
	if (type == MODETAG)				type = "MODETAG";
	if (type == MORPHTAG)				type = "MORPHTAG";
	if (type == ORIENTCONSTRAINTTAG)	type = "ORIENTCONSTRAINTTAG";
	if (type == PARENTCONSTRAINTTAG)	type = "PARENTCONSTRAINTTAG";
	if (type == PARTICLETAG)			type = "PARTICLETAG";
	if (type == POINTCONSTRAINTTAG)		type = "POINTCONSTRAINTTAG";
	if (type == POSETAG)				type = "POSETAG";
	if (type == PROPWINTAG)				type = "PROPWINTAG";
	if (type == RADIOSITYTAG)			type = "RADIOSITYTAG";
	if (type == RIGIDBODYTAG)			type = "RIGIDBODYTAG";
	if (type == ROPETAG)				type = "ROPETAG";
	if (type == SKELETONTAG)			type = "SKELETONTAG";
	if (type == SOFTBODYTAG)			type = "SOFTBODYTAG";
	if (type == SPLINEIKTAG)			type = "SPLINEIKTAG";
	//if (type == UVTAG)				type = "UVTAG";
	if (type == SCRIPTTAG)				type = "SCRIPTTAG";
	if (type == SHADERTAG)				type = "SHADERTAG";
	
	return type;
}

function objectToString (type) {
	if (type == BALL)				type = "BALL";
	if (type == BOX)				type = "BOX";
	if (type == DISC)				type = "DISC";
	if (type == CONE)				type = "CONE";
	if (type == CYLINDER)			type = "CYLINDER";
	if (type == PLANE)				type = "PLANE";
	if (type == POLYGONOBJ)			type = "POLYGONOBJ";
	if (type == POLYHEDRA)			type = "POLYHEDRA";
	if (type == TORUS)				type = "TORUS";
	if (type == TUBE)				type = "TUBE";
	if (type == SCRIPTPOLY)			type = "SCRIPTPOLY";
	if (type == STAIR)				type = "STAIR";
	if (type == CIRCLE)				type = "CIRCLE";
	if (type == COG)				type = "COG";
	if (type == FLOWER)				type = "FLOWER";
	if (type == HELIX)				type = "HELIX";
	if (type == NEDGE)				type = "NEDGE";
	if (type == RECT)				type = "RECT";
	if (type == SCRIPTSPLINE)		type = "SCRIPTSPLINE";
	if (type == SPLINE)				type = "SPLINE";
	if (type == STAR)				type = "STAR";
	if (type == TEXT)				type = "TEXT";
	if (type == BLUEPRINT)			type = "BLUEPRINT";
	if (type == CAMERA)				type = "CAMERA";
	if (type == FOLDER)				type = "FOLDER";
	if (type == JOINT)				type = "JOINT";
	if (type == POINTLIGHT)			type = "POINTLIGHT";
	//if (type == SPOTLIGHT)		type = "SPOTLIGHT";		// -- Missing
	//if (type == DISTANTLIGHT)		type = "DISTANTLIGHT";	// -- Missing
	//if (type == AREALIGHT)		type = "AREALIGHT";		// -- Missing
	if (type == BOOLEAN)			type = "BOOLEAN";
	if (type == CHAIN)				type = "CHAIN";
	if (type == EXTRUDE)			type = "EXTRUDE";
	if (type == ISOSURFACE)			type = "ISOSURFACE";
	if (type == LATHE)				type = "LATHE";
	if (type == POLYPLANE)			type = "POLYPLANE";
	if (type == RELIEF)				type = "RELIEF";
	if (type == SUBDIV)				type = "SUBDIV";
	if (type == SWEEP)				type = "SWEEP";
	if (type == SYMMETRY)			type = "SYMMETRY";
	if (type == ARRAYMOD)			type = "ARRAYMOD";
	if (type == CRUMPLEMOD)			type = "CRUMPLEMOD";
	if (type == BENDMOD)			type = "BENDMOD";
	if (type == BUILDMOD)			type = "BUILDMOD";
	if (type == BULGEMOD)			type = "BULGEMOD";
	if (type == DISPLACEMENTMOD)	type = "DISPLACEMENTMOD";
	if (type == RINGMOD)			type = "RINGMOD";
	if (type == SHEARMOD)			type = "SHEARMOD";
	if (type == SHELLMOD)			type = "SHELLMOD";
	if (type == SMOOTHMOD)			type = "SMOOTHMOD";
	if (type == SPHERIFYMOD)		type = "SPHERIFYMOD";
	if (type == SYMMETRYMOD)		type = "SYMMETRYMOD";
	if (type == TAPERMOD)			type = "TAPERMOD";
	if (type == TRANSFORMMOD)		type = "TRANSFORMMOD";
	if (type == TWISTMOD)			type = "TWISTMOD";
	if (type == WARPMOD)			type = "WARPMOD";
	if (type == PARTICLE)			type = "PARTICLE";
	if (type == PARTICLEEMITTER)	type = "PARTICLEEMITTER";
	if (type == PARTICLEARRAY)		type = "PARTICLEARRAY";
	if (type == PARTICLEMESH)		type = "PARTICLEMESH";
	if (type == PARTICLESPLINE)		type = "PARTICLESPLINE";
	if (type == PARTICLESCRIPT)		type = "PARTICLESCRIPT";
	if (type == EFFECTOR)			type = "EFFECTOR";
	if (type == ORIENTATIONEFF)		type = "ORIENTATIONEFF";
	if (type == FORCE)				type = "FORCE";
	if (type == ATTRACTIONFORCE)	type = "ATTRACTIONFORCE";
	if (type == DRAGFORCE)			type = "DRAGFORCE";
	if (type == DEFLECTORFORCE)		type = "DEFLECTORFORCE";
	if (type == GRAVITYFORCE)		type = "GRAVITYFORCE";
	if (type == RADIALFORCE)		type = "RADIALFORCE";
	if (type == WINDFORCE)			type = "WINDFORCE";
	if (type == MATERIAL)			type = "MATERIAL";
	
	return type;
}

function familyToString (type) {
	
	if (type == OTHERFAMILY)	type = "OTHERFAMILY";
	if (type == SPLINEFAMILY)	type = "SPLINEFAMILY";
	if (type == LIGHTFAMILY)	type = "LIGHTFAMILY";
	if (type == MODIFIERFAMILY)	type = "MODIFIERFAMILY";
	if (type == NGONFAMILY)		type = "NGONFAMILY";
	if (type == TAGFAMILY)		type = "TAGFAMILY";
	if (type == LOADERFAMILY)	type = "LOADERFAMILY";
	if (type == PARTICLEFAMILY)	type = "PARTICLEFAMILY";
	if (type == MATERIALFAMILY)	type = "MATERIALFAMILY";
	if (type == NODEFAMILY)		type = "NODEFAMILY";
	if (type == SETTINGFAMILY)	type = "SETTINGFAMILY";
	if (type == FORCEFAMILY)	type = "FORCEFAMILY";
	if (type == EFFECTORFAMILY)	type = "EFFECTORFAMILY";
	
	return type;
}

function parameterToString (type) {
	
	if (type == INT_PARAMETER)         type = "Int";
	if (type == FLOAT_PARAMETER)       type = "Float";
	if (type == BOOL_PARAMETER)        type = "Bool";
	if (type == STRING_PARAMETER)      type = "String";
	if (type == VEC2D_PARAMETER)       type = "Vec2D";
	if (type == VEC3D_PARAMETER)       type = "Vec3D";
	if (type == VEC4D_PARAMETER)       type = "Vec4D";
	if (type == TEXTURE_PARAMETER)     type = "Texture";
	if (type == LINK_PARAMETER)        type = "Link";
	if (type == GRADIENT_PARAMETER)    type = "Gradient";
	if (type == FLOAT_ARRAY_PARAMETER) type = "Float Array";
	
	return type;
}