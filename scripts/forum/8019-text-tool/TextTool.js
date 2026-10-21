// Source: https://www.cheetah3d.com/forum/index.php?threads/8019/post-66606
// Author: Edward (Cheetah3D forum), posted 2012-01-17
// Thread: "Text Tool"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// ----------------------------------------------------------
//   Text Tool                          © 2012 Greg McMann
// ----------------------------------------------------------
// This script maps a font onto a square texture and then
// uses it to create strings of text that can be displayed
// in OpenGL or DirectX.
//
// After creating the text and maps, clicking the button
// again will adjust the existing characters. This allows
// faster editing. Please delete the text folder if you
// modify the source file.
//
// ----------------------------------------------------------
//   Settings
// ----------------------------------------------------------

var fontMap   = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?',.";
var directory = "/Users/greg/Documents/Project/Media/Source/";
var extension = ".png";

// ----------------------------------------------------------
// ----------------------------------------------------------

function buildUI(tool){
    tool.addParameterSeparator("Font");
	tool.addParameterString("Font", "Georgia", false);
	tool.addParameterFloat ("Trim",  0.02, 0.0, 10.0, false, false);
	tool.addParameterFloat ("Scale", 0.11, 0.0, 10.0, false, false);
	tool.addParameterFloat ("Space", 0.14, 0.0, 10.0, false, false);
	tool.addParameterInt   ("Resolution", 512, 128, 2048, false, false);
	
	tool.addParameterSeparator("Text");
	tool.addParameterString("Source", "Text.txt", false);
    tool.addParameterFloat ("Wrap",   1.00, 0.00, 10.0, false, false);
	tool.addParameterFloat ("Kern",   0.00,-1.00, 10.0, false, false);
	tool.addParameterFloat ("Lead",   0.10,-1.00, 10.0, false, false);
	tool.addParameterFloat ("Tabs",   0.20,  0.00, 10.0, false, false);
	tool.addParameterFloat ("Spaces", 0.05,  0.00, 10.0, false, false);
	
	tool.addParameterSeparator("");
	tool.addParameterButton("Create Font", "OK", "createMap");
	tool.addParameterButton("Render Font", "OK", "renderMap");
	tool.addParameterButton("Create Text", "OK", "createText");
	loadSettings(tool);
}

function saveSettings (tool) {
	var file = new File(directory + "TextTool.cfg");
	if (!file) return;
	file.open(WRITE_MODE);
	file.writeln   (tool.getParameter("Font"));
	file.writeFloat(tool.getParameter("Trim"));
	file.writeFloat(tool.getParameter("Scale"));
	file.writeFloat(tool.getParameter("Space"));
	file.writeInt  (tool.getParameter("Resolution"));
	file.writeln   (tool.getParameter("Source"));
	file.writeFloat(tool.getParameter("Wrap"));
	file.writeFloat(tool.getParameter("Kern"));
	file.writeFloat(tool.getParameter("Lead"));
	file.writeFloat(tool.getParameter("Tabs"));
	file.writeFloat(tool.getParameter("Spaces"));
	file.close();
}

function loadSettings (tool) {
	var file = new File(directory + "TextTool.cfg");
	if (!file) return;
	file.open(READ_MODE);
	tool.setParameter("Font",      file.readln());
	tool.setParameter("Trim",      file.readFloat());
	tool.setParameter("Scale",     file.readFloat());
	tool.setParameter("Space",     file.readFloat());
	tool.setParameter("Resolution",file.readInt());
	tool.setParameter("Source",    file.readln());
	tool.setParameter("Wrap",      file.readFloat());
	tool.setParameter("Kern",      file.readFloat());
	tool.setParameter("Lead",      file.readFloat());
	tool.setParameter("Tabs",      file.readFloat());
	tool.setParameter("Spaces",    file.readFloat());
	file.close();
}

function createMap (tool) {
	saveSettings(tool);
	var font     = tool.getParameter("Font");
	var trim     = tool.getParameter("Trim");
	var size     = tool.getParameter("Scale");
	var space    = tool.getParameter("Space");
	var cursor   = new Vec3D(trim,trim,0.0);
	var scaling  = new Vec3D(size,size,size);
	var document = tool.document();
	
	// Create Folders
	var fontFolder = findObject(document.root(),font);
	if (!fontFolder) {
		fontFolder = document.addObject(FOLDER);
		fontFolder.setParameter("name",font);
	}
	var meshFolder = findObject(fontFolder,"Mesh");
	if (!meshFolder) {
		meshFolder = document.addObject(FOLDER);
		meshFolder.setParameter("name","Mesh");
		fontFolder.addChildAtIndex(meshFolder,0);
	}
	var splineFolder = findObject(fontFolder,"Spline");
	if (!splineFolder) {
		splineFolder = document.addObject(FOLDER);
		splineFolder.setParameter("name","Spline");
		fontFolder.addChildAtIndex(splineFolder,1);
	}
	
	for (var index = 0; index < fontMap.length; index++) {
		var char = fontMap.charAt(index);
		
		// Create Text Poly
		var name = "Poly"+char;
		var poly = findObject(splineFolder,name);
		if (!poly) {
			poly = document.addObject(POLYPLANE);
			poly.setParameter("name","Poly"+char);
			splineFolder.addChildAtIndex(poly,splineFolder.childCount());
		}
		
		// Create Text Spline
		var name = "Text"+char;
		var text = findObject(splineFolder,name);
		if (!text) {
			text = document.addObject(TEXT);
			text.setParameter("name","Text"+char);
			text.setParameter("text",char);
			poly.addChildAtIndex(text,poly.childCount());
		}
		text.setParameter("textFont",font);
		text.setParameter("position",cursor);
		text.setParameter("scale",scaling);
		
		// Create Polygon Mesh
		var name = char;
		var size = measureSpline(text);
		var mesh = findObject(meshFolder,name);
		if (!mesh) {
			mesh = document.addObject(POLYGONOBJ);
			meshFolder.addChildAtIndex(mesh,meshFolder.childCount());
			mesh.setParameter("name",char);
			var core  = mesh.core();
			var minX  = -trim;   var maxX = trim + size.x;
			var minY  = -trim*2; var maxY = trim + size.y;
			var verts = [new Vec3D(maxX,maxY,0),
						 new Vec3D(maxX,minY,0),
						 new Vec3D(minX,minY,0),
						 new Vec3D(minX,maxY,0)];
			var minU  = cursor.x + minX; var minV = 1 - (cursor.y + minY);
			var maxU  = cursor.x + maxX; var maxV = 1 - (cursor.y + maxY);
			var uvs   = [new Vec2D(maxU,maxV),
						 new Vec2D(maxU,minV),
						 new Vec2D(minU,minV),
						 new Vec2D(minU,maxV)];
			core.addPolygon(4,false,verts,uvs);
		}
		mesh.setParameter("position",cursor);
		
		// Update Cursor
		cursor.x = cursor.x + size.x + trim*2;
		if (cursor.x > 1.0 - size.x * 1.5) {
			cursor.x = trim;
			cursor.y += space;
		}
	}
}

function renderMap (tool) {
	saveSettings(tool);
	var document = tool.document();
	var root     = document.root();
	var font     = tool.getParameter("Font");
	
	// Camera Setup
	var camera   = findObject(root,"Camera");
	var imageRes = tool.getParameter("Resolution");
	var position = new Vec3D(0.5, 0.5, 1.0);
	var rotation = new Vec3D(0.0, 0.0, 0.0);
	var color    = new Vec4D(1.0, 1.0, 1.0, 0.0);
	camera.setParameter("position",position);
	camera.setParameter("rotation",rotation);
	camera.setParameter("activeCamera",true);
	camera.setParameter("backgroundColor",color);
	camera.setParameter("cameraLightOnOff",0);
	camera.setParameter("shadowsOnOff",0);
	camera.setParameter("fieldOfView",53);
	camera.setParameter("projection",0);
	camera.setParameter("resolutionX",imageRes);
	camera.setParameter("resolutionY",imageRes);
	
	// Adjust Visibility
	var fontFolder   = findObject(root,font);
	var meshFolder   = findObject(fontFolder,"Mesh");
	var splineFolder = findObject(fontFolder,"Spline");
	if (meshFolder) {
		var mode = findTag(meshFolder,MODETAG);
		mode.setParameter("renderActive",false);
		mode.setParameter("editorActive",true);
	}
	if (splineFolder) {
		var mode = findTag(splineFolder,MODETAG);
		mode.setParameter("renderActive",true);
		mode.setParameter("editorActive",false);
	}
	
	// Render Font Splines
	document.render(directory + font + extension);
	
	// Apply Material
	var material = findMaterial(tool,font);
	if (material == null) {
		material = document.addMaterial("Default",font);
	}
	
	// Add Material Tag
	var count = meshFolder.childCount();
	for (index = 0; index < count; index++) {
		var object = meshFolder.childAtIndex(index);
		if (object.materialTags().length > 0) continue;
		var tag = object.addTagOfType(SHADERTAG);
		tag.setParameter("material",material);
	}
	
	// Present Limitation
	var image = material.colorMap();
	if (image == "none") {
		var title   = "Scripting Limitation";
		var message = "Please add " + font + extension + " to material " + font;
		OS.messageBox(title,message);
	}
}

function createText (tool) {
	saveSettings(tool);
	var root   = tool.document().root();
	var font   = tool.getParameter("Font");
	var wrap   = tool.getParameter("Wrap");
	var kern   = tool.getParameter("Kern");
	var lead   = tool.getParameter("Lead");
	var tab    = tool.getParameter("Tabs");
	var space  = tool.getParameter("Spaces");
	var source = tool.getParameter("Source");
	var file   = new File(directory + source);
	
	// Create Folder
	var document   = tool.document();
	var fontFolder = findObject(root,font);
	var meshFolder = findObject(fontFolder,"Mesh");
	var textFolder = findObject(root,source);
	if (!textFolder) {
		textFolder = document.addObject(FOLDER);
		root.addChildAtIndex(textFolder,root.childCount());
		textFolder.setParameter("name",source);
		
		var mode = findTag(textFolder,MODETAG);
		mode.setParameter("renderActive",false);
		mode.setParameter("editorActive",true);
	}
	
	// Open Text File
	file.open(READ_MODE);
	var existing = textFolder.childCount();
	var cursor   = new Vec3D(0,0,0);
	var offset   = 0;
	while (true) {
		var string = file.readln();
		if (string == -1) break;
		
		// Create Characters
		for (index = 0; index < string.length; index++) {
			var char = string.charAt(index);
			if (char == "\t") {
				cursor.x += tab;
				if (wrap != 0 && cursor.x > wrap) {
					cursor.x = 0.0;
					cursor.y -= lead;
				}
				continue;
			}
			if (char == " ") {
				cursor.x += space;
				if (wrap != 0 && cursor.x > wrap) {
					cursor.x = 0.0;
					cursor.y -= lead;
				}
				continue;
			}
			if (offset < existing) {
				var name   = "Char" + offset;
				var object = findObject(textFolder,name);
				var size   = measureGeometry(object);
				object.setParameter("position",cursor);
				cursor.x += size.x + kern;
				offset += 1;
			}
			else {
				var name   = "Char" + offset;
				var object = findObject(meshFolder,char);
				var copy   = copyObject(document,object);
				var size   = measureGeometry(copy);
				var total  = textFolder.childCount();
				textFolder.addChildAtIndex(copy,total);
				copy.setParameter("position",cursor);
				copy.setParameter("name",name);
				cursor.x += size.x + kern;
				offset += 1;
			}
		}
		
		// Reset Cursor
		cursor.x = 0.0;
		cursor.y -= lead;
	}
}

function copyObject (document, object) {
	var copy = document.addObject(object.type());
	
	// Copy Parameters
	var name     = object.getParameter("name");
	var position = object.getParameter("position");
	var rotation = object.getParameter("rotation");
	var scale    = object.getParameter("scale");
	copy.setParameter("name",name);
	copy.setParameter("position",position);
	copy.setParameter("rotation",rotation);
	copy.setParameter("scale",scale);
	
	// Copy Materials
	var array = object.materialTags();
	var count = array.length;
	for (var index = 0; index < count; index++) {
		var ID  = array[index].linkedToMaterial();
		var mat = document.materialAtIndex(ID);
		var tag = copy.addTagOfType(SHADERTAG);
		tag.setParameter("material",mat);
	}
	
	// Copy Geometry
	if (object.type() == POLYGONOBJ) {
		var count = object.core().vertexCount();
		for (var index = 0; index < count; index++) {
			var vertex = object.core().vertex(index);
			copy.core().addVertex(false, vertex);
		}
		var count = object.core().polygonCount();
		for (var index = 0; index < count; index++) {
			var verts = [];
			var uvs   = [];
			var size  = object.core().polygonSize(index);
			for (var corner = 0; corner < size; corner++) {
				var vertex = object.core().vertexIndex(index,corner);
				var uv     = object.core().uvCoord(index,corner);
				verts[corner] = vertex;
				uvs[corner]   = new Vec2D(uv.x,uv.y);
			}
			copy.core().addIndexPolygon(size,verts,uvs);
		}
	}
	return copy;
}

function findObject (object, string) {
	if (!object) return null;
	var stack = [];
	while (object) {
		var name = object.getParameter("name");
		if (name == string) return object;
		for (var i = 0; i < object.childCount(); i++) {
			var child = object.childAtIndex(i);
			stack.push(child);
		}
		object = stack.pop(child);
	}
	return null;
}

function findMaterial (tool, string) {
	var document = tool.document();
	var count = document.materialCount();
	for (index = 0; index < count; index++) {
		var mat  = document.materialAtIndex(index);
		var name = mat.getParameter("name");
		if (string == name) return mat;
	}
	return null;
}

function findTag (object, type) {
	var count = object.tagCount();
	for (var index = 0; index < count; index++) {
		var tag = object.tagAtIndex(index);
		if (type == tag.type()) return tag;
	}
	return null;
}

function measureGeometry (object) {
	// ~~ Assumes mesh center at bottom left ~~
	var core  = object.core();
	var size  = new Vec3D(0,0,0);
	var count = core.vertexCount();
	var scale = object.getParameter("scale");
	
	for (var index = 0; index < count; index++) {
		var vertex = core.vertex(index);
		if (vertex.x > size.x) size.x = vertex.x;
		if (vertex.y > size.y) size.y = vertex.y;
		if (vertex.z > size.z) size.z = vertex.z;
	}
	return size.multiply(scale);
}

function measureSpline (object) {
	// ~~ Assumes spline center at bottom left ~~
	var core  = object.core();
	var count = core.pathCount();
	var size  = new Vec3D(0,0,0);
	var scale = object.getParameter("scale");
	
	for (var path = 0; path < count; path++) {
		var array = core.cache(path);
		for (index in array) {
			var vector = array[index];
			if (vector.x > size.x) size.x = vector.x;
			if (vector.y > size.y) size.y = vector.y;
			if (vector.z > size.z) size.z = vector.z;
		}
	}
	return size.multiply(scale);
}
