// Source: https://www.cheetah3d.com/forum/index.php?threads/989/post-6185
// Author: tg_jp (Cheetah3D forum), posted 2006-10-18
// Thread: "main/buildObject"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// mesh Import
// 
// 
// ver. 0.1
// Modified 20050614 Hiroto Tsubaki

function buildUI(tool) {
    
    tool.addParameterSeparator("mesh Importer");
    tool.addParameterFloat("scale",1.0,0,100.0,false,false);
    tool.addParameterButton("Import","OK","importMesh");
}

function importMesh(tool) {
    var doc = tool.document();
    var scale = tool.getParameter("scale");
    
	print ("---- import mesh ----");
	
    var path = OS.runOpenPanel("mesh");
    if (path == null) {
		print("Cancel");
		return;
	}
    
    var file = new File(path);
    file.open(READ_MODE);
    if (file.isOpen() == false) {
		print("file not open");
		return;
	}
	
	var readMode = 0;
	var polyObj = doc.addObject(POLYGONOBJ);
	var core = polyObj.core();
	
	var vec = new Vec3D(0, 0, 0);
	var meshes = new Array;
	
	core.buildVertexBSP(new Vec3D(-100,-100,-100), new Vec3D(100, 100, 100));
	
	line = file.readln();
	
	while (line != null) {
        line = file.readln();
        var data = line.split(/ +/);
        while (! data[0] && data.length > 1) {
            data.shift();
        }
        var tag = line.split(/ +/).join('').split(/\t+/).join('');
        if (tag == 'Vertices') {
            readMode = 1;
        } else if (tag == 'Triangles') {
            readMode = 2;
        } else if (tag == 'Edges') {
            readMode = 3;
        } else if (tag == 'Corners') {
            readMode = 4;
        } else if (tag == 'Ridges') {
            readMode = 5;
        } else if (tag == 'Normals' || tag == 'Tangents') {
            readMode = 0;
        } else if (tag == 'Quadrilaterals' || tag == 'Tetrahedra' || tag == 'Hexahedra') {
            readMode = 0;
        }
        if (readMode == 1) {
            if (data.length == 4) {
			    vec.x = parseFloat(data[0]);
			    vec.y = parseFloat(data[1]);
			    vec.z = parseFloat(data[2]);
                vec = vec.multiply(scale);
                
                core.addVertex(false, vec);
            } else if (data.length == 1) {
                print("__line:"+line);
            } else {
                print("illegal length:"+data.length+" __line:"+line);
            }
        } else if (readMode == 2) {
            if (data.length == 4) { //
                meshes[2] = parseInt(data[0]) - 1;
                meshes[1] = parseInt(data[1]) - 1;
                meshes[0] = parseInt(data[2]) - 1;
                
                core.addIndexPolygon(3, meshes);
            } else if (data.length == 5) { //  
                meshes[3] = parseInt(data[0]) - 1;
                meshes[2] = parseInt(data[1]) - 1;
                meshes[1] = parseInt(data[2]) - 1;
                meshes[0] = parseInt(data[3]) - 1;
                
                core.addIndexPolygon(4, meshes);
            } else if (data.length == 1) {
                var polyCount = parseInt(data[0]);
                print("__line:"+line);
            } else {
                print("illegal length:"+data.length+" __line:"+line);
            }    
        }
        if (tag == 'End') {
            break;
        }
	}
	
	core.destroyVertexBSP();
	
    file.close();
}
