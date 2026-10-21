// Source: https://www.cheetah3d.com/forum/index.php?threads/10625/post-89421
// Author: Edward (Cheetah3D forum), posted 2014-08-24
// Thread: "Read MQO"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//----------------------------------------------------------
// Read MQO.js                            Greg McMann 2014
//----------------------------------------------------------
// Imports the geometry from objects in a Metasequoia 'mqo'
// file. The javascript API doesn't currently provide ways
// to modify materials, so they are not loaded. To work
// around this limitation, I have printed the parameters
// of each material entry to the console so they may be
// created manually.
//----------------------------------------------------------

function buildUI (tool) {
	
	tool.addParameterSeparator ("Read MQO");
	tool.addParameterFloat     ("Scale", 0.01, 0.01, 100.0, false, false);
	tool.addParameterButton    ("Import", "ok", "readMQO");
	
}

function readMQO (tool) {

	var document   = tool.document();
	var scale      = tool.getParameter("Scale");
	var sceneScale = new Vec3D(scale,scale,scale);
	
	//-------------------
	// Open a file
	//-------------------
	
	var path = OS.runOpenPanel("mqo");
	if (!path) return;
	
	var file = new File(path);
	file.open(READ_MODE,LITTLE_ENDIAN);
	if (!file) return;
	
	print("\nLoading " + path);
	
	//-------------------
	// Read the header
	//-------------------
	
	var headerDocument = readLine(file);
	var headerVersion  = readLine(file);
	
	if (headerDocument != "Metasequoia Document") {
		messageBox("Error","Not a valid metasequoia document");
		return;
	}
	
	var format = scanString(headerVersion,"Format %s");
	
	if (format[0] != "Text") {
		messageBox("Error","Only text is supported");
		return;
	}
	
	var version = scanString(headerVersion,"Ver %d.%d");
	
	if (version[0] > 1) {
		messageBox("Error","Only version 1 is supported");
		return;
	}
	
	//-------------------
	// Define chunks
	//-------------------
	
	var ROOT     = 0;
	var SCENE    = 1;
	var OBJECT   = 2;
	var MATERIAL = 3;
	var VERTEX   = 4;
	var FACE     = 5;
	
	//-------------------
	// Define globals
	//-------------------
	
	var stack     = [];
	var chunk     = ROOT;
	var object    = null;
	var core      = null;
	var materials = [];
	
	//-------------------
	// Read the contents
	//-------------------
	
	while (true) {
		
		//-------------------
		// Read a line
		//-------------------
		
		var line = readLine(file);
		
		if (line == null) {
			break;
		}
		
		if (line == "Eof") {
			break;
		}
		
		//-------------------
		// Chunk start + end
		//-------------------
		
		if (isSubstring(line,"{")) {
			
			stack.push(chunk);
			
			switch (firstWord(line)) {
				case "Scene":    chunk = SCENE;    break;
				case "Object":   chunk = OBJECT;   break;
				case "Material": chunk = MATERIAL; break;
				case "vertex":   chunk = VERTEX;   break;
				case "face":     chunk = FACE;     break;
				default:         chunk = ROOT;
			}
			
			if (chunk == OBJECT) {
				
				if (object != null) {
					object.update();
				}
				
				object = document.addObject(POLYGONOBJ);
				core = object.core();
				
				var name = scanString(line,"Object %s")[0];
				name = name.replace('"','');
				name = name.replace('"','');
				
				object.setParameter("name",name);
			}
			
			continue;
		}
		
		if (isSubstring(line,"}")) {
			
			chunk = stack.pop();
			
			continue;
		}
		
		//-------------------
		// Chunk data
		//-------------------
		
		switch (chunk) {
			
			case OBJECT:
				
				var name = firstWord(line);
				
				switch (name) {
						
					case "translation":
						var values = scanString(line,"translation %f %f %f");
						var vector = new Vec3D(values[0],values[1],values[2]);
						object.setParameter("position",vector.multiply(sceneScale));
						break;
						
					case "rotation":
						var values = scanString(line,"rotation %f %f %f");
						var vector = new Vec3D(values[0],values[1],values[2]);
						object.setParameter("rotation",vector);
						break;
					
					case "scale":
						var values = scanString(line,"scale %f %f %f");
						var vector = new Vec3D(values[0],values[1],values[2]);
						object.setParameter("scale",vector);
						break;
						
					case "facet":
						var value = scanString(line,"facet %f")[0];
						object.setParameter("normalAngle",value);
						break;
					
				}
				
				break;
				
			case MATERIAL:
				
				var name    = scanString(line,"%s");
				var shader  = scanString(line,"shader(%d)");
				var col     = scanString(line,"col(%f %f %f %f)");
				var dif     = scanString(line,"dif(%f)");
				var amb     = scanString(line,"amb(%f)");
				var emi     = scanString(line,"emi(%f)");
				var spc     = scanString(line,"spc(%f)");
				var power   = scanString(line,"power(%f)");
				var reflect = scanString(line,"reflect(%f)");
				var refract = scanString(line,"refract(%f)");
				var tex     = scanString(line,"tex(%s");
				var aplane  = scanString(line,"aplane(%s");
				var bump    = scanString(line,"bump(%s");
				
				// Material access in the javascript API
				// is transitioning to a new node system.
				// During this time, it isn't possible to
				// modify material parameters.
				
				if (name)    print(name);
				if (col)     print("\tColor : " + col);
				if (dif)     print("\tDiffuse : " + dif[0]);
				if (amb)     print("\tAmbient : " + amb[0]);
				if (emi)     print("\tEmissive : " + emi[0]);
				if (spc)     print("\tSpecular : " + spc[0]);
				if (power)   print("\tSpecular size : " + power[0]);
				if (reflect) print("\tReflection : " + reflect[0]);
				if (refract) print("\tRefraction : " + refract[0]);
				if (tex)     print("\tTexture : " + tex[0].replace(")",""));
				if (aplane)  print("\tAlpha : " + aplane[0].replace(")",""));
				if (bump)    print("\tBump : " + bump[0].replace(")",""));
				
				break;
				
			case VERTEX:
				
				var values = scanString(line,"%f %f %f");
				var vertex = new Vec3D(values[0],values[1],values[2]);
				var index = core.addVertex(false,vertex.multiply(sceneScale));
				
				break;
				
			case FACE:
				
				var numCorners = scanString(line,"%d")[0];
				var matIndex   = scanString(line,"M(%d)");
				var indices    = parseIndices(line,numCorners);
				var uvs        = parseUVs(line,numCorners);
				var polyIndex  = 0;
				
				if (uvs == null) {
					polyIndex = core.addIndexPolygon(numCorners,indices);
				}
				
				else {
					polyIndex = core.addIndexPolygon(numCorners,indices,uvs);
				}
				
				if (matIndex != null) {
					matIndex = matIndex[0];
					if (matIndex >= 0 && matIndex <= 15) {
						core.setActivePolygonSelection(matIndex);
						core.setPolygonSelection(polyIndex,true);
					}
				}
				
				break;
		}
	}
	
	if (object != null) {
		object.update();
	}
	
	//-------------------
	// Close the file
	//-------------------
	
	file.close();
}

//---------------------------------------
// parseIndices
//---------------------------------------
// Returns an array of integers from a
// line in an object's face chunk.
//---------------------------------------

function parseIndices (line,count) {
	
	// build a format string
	
	var format = " V(";
	for (var i = 0; i < count; i++) {
		format += "%d";
		if (i != count - 1) {
			format += " ";
		}
	}
	format += ")";
	
	// return the indices
	
	return scanString(line,format);
	
}

//---------------------------------------
// parseUVs
//---------------------------------------
// Returns an array of Vec2D's from a
// line in an object's face chunk.
//---------------------------------------

function parseUVs (line,count) {
	
	// check for the chunk
	
	if (isSubstring(line,"UV(") == false) {
		return null;
	}
	
	// build a format string
	
	var format = "UV(";
	for (var i = 0; i < count * 2; i++) {
		format += "%f";
		if (i != count * 2 - 1) {
			format += " ";
		}
	}
	format += ")";
	
	// scan for the floats
	
	var floats = scanString(line,format);
	
	// create vectors for each pair
	
	var uvs = [];
	for (var i = 0; i < count; i++) {
		var floatA = floats[i * 2 + 0];
		var floatB = floats[i * 2 + 1];
		uvs.push(new Vec2D(floatA,floatB));
	}
	
	return uvs;
}

//---------------------------------------
// readLine
//---------------------------------------
// Returns a string containing every
// character until (but not including)
// the first '\n' character. If no line
// is found, null is returned.
//---------------------------------------

function readLine (file) {
	var line = "";
	var character = file.read(1);
	if (character == null) return null;
	for (var i = 0; i < 1000; i++) {
		if (character == '\n') break;
		if (character != '\r') {
			line += character;
		}
		character = file.read(1);
	}
	return line;
}

//---------------------------------------
// firstWord
//---------------------------------------
// Returns the first word in a string.
//---------------------------------------

function firstWord (string) {
	return scanString(string,"%s")[0];
}

//---------------------------------------
// isSubstring
//---------------------------------------
// Returns true of the string contains
// the substring.
//---------------------------------------

function isSubstring (string,substring) {
	return string.indexOf(substring) >= 0;
}

//---------------------------------------
// scanString
//---------------------------------------
// Emulates the C function 'sscanf', and
// returns an array of values flagged
// in the format string. The flags are
// limited to %c, %s, %d, and %f. Spaces
// are interpreted as a variable amount
// of whitespace characters.
//---------------------------------------

function scanString (string,format) {
	
	var pattern   = "";
	var modifiers = "";
	
	// construct a pattern
	
	pattern = format;
	pattern = pattern.replace(/\(/g,"\\(");            // parens (Reserved in regex)
	pattern = pattern.replace(/\)/g,"\\)");            // parens (Reserved in regex)
	pattern = pattern.replace(/ /g, "\\s+");           // whitespace
	pattern = pattern.replace(/%c/g,"(.)");            // char
	pattern = pattern.replace(/%s/g,"([^\\s]+)");      // string
	pattern = pattern.replace(/%d/g,"(-?[0-9]+)");     // integer
	pattern = pattern.replace(/%f/g,"(-?[0-9\\.]+)");  // float
	
	// create a regular expression
	
	var regex = new RegExp(pattern,modifiers);
	
	// match string values
	
	var values = string.match(regex);
	if (values == null) return null;
	
	// remove the first element
	
	values.shift();
	
	// validate value count
	
	// .. Currently the number of values
	//    isn't validated. I plan to
	//    return null if they don't match.
	
	// parse the numbers
	
	var entry = 0;
	for (var i = 1; i < format.length; i++) {
		
		var current = format[i];
		var previous = format[i-1];
		
		if (previous == '%') {
			if (current == 'd') {
				values[entry] = parseInt(values[entry]);
			}
			if (current == 'f') {
				values[entry] = parseFloat(values[entry]);
			}
			entry += 1;
		}
	}
	
	return values;
}

