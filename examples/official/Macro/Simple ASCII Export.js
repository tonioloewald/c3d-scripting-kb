// (c) 2005 Martin Wengenmayer
//
// This script is in the public domain. Feel free to modify it or use 
// it as a starting point for your own creations.
//
// Purpose: 
//      Shows how to write a simple custom exporter
//


function main(doc){
    var	    i;
    
    //get path for file
    var path=OS.runSavePanel("ascii");
    if(path==null){
	return;
	}
    
    //open file
    var file = new File(path);
    file.open(WRITE_MODE);
    
    //write some commentary at the beginning
    file.writeln("# File created by Cheetah3D");
    file.writeln("# Format of polygon entries");
    file.writeln("# \tPOLYGONSIZE MATERIAL_INDEX VERTEXINDEX/U/V ...");
    file.writeln("# If the material index is -1 no material was assigned");
    file.write("\n\n");
    
    
    //save materials
    for(i=0;i<doc.materialCount();i++){
	var mat=doc.materialAtIndex(i);
	var matcolor=mat.color();
	var mattexture=mat.colorMap();
	var matname=mat.getParameter("name");
	
	file.writeln("Material \"" + matname + "\"");
	file.writeln("tex \"" + mattexture +"\"");
	file.writeln("color " + matcolor.r.toPrecision(3) + " " + matcolor.g.toPrecision(3) + " " + matcolor.b.toPrecision(3) + " " + matcolor.a.toPrecision(3));
	file.writeln("");
	}
    
    //save object scene graph
    saveObject(doc.root(), file);
    
    
    //close file
    file.close();
    
    
}


function saveObject(obj,file){

    //save current object if it is a polygon object
    if(obj.family()==NGONFAMILY){
	var i,j;
	var objname=obj.getParameter("name");
	var obj2wordld=obj.obj2WorldMatrix();
	var mattags=obj.materialTags();
	var core=obj.modCore();
	var tag2mat=new Array(32);
	
	//build conversion table shadertag -> material index
	for(i=0;i<mattags.length;i++){
	    tag2mat[i]=mattags[i].linkedToMaterial();
	    print(tag2mat[i]);
	    }	
	
	//save object name, vertex count and polygon count
	file.writeln("Object \"" + objname + "\" " + core.vertexCount() + " " + core.polygonCount());
	
	//save vertices
	for(i=0;i<core.vertexCount();i++){
	    var vert=core.vertex(i);			//vertex in local coordinate system
	    var world_vert=obj2wordld.multiply(vert);	//vertex in world coordinate system
	    
	    file.writeln(world_vert.x.toPrecision(3) + " " + world_vert.y.toPrecision(3) + " " + world_vert.z.toPrecision(3));
	    }
	
	//save polygons
	for(i=0;i<core.polygonCount();i++){
	    var polysize=core.polygonSize(i);
	    var usedShaderTag=core.materialTagIndex(i);
	    var	material=(usedShaderTag==mattags.length) ? -1 : tag2mat[usedShaderTag];
	    
	    file.write(polysize + " " + material);
	    for(j=0;j<polysize;j++){
		var	uvcoord=core.uvCoord(i,j);
		file.write(" " + core.vertexIndex(i,j) + "/" + uvcoord.x.toPrecision(3) + "/" + uvcoord.y.toPrecision(3));
		}
	    file.write("\n");
	    }
	
	file.write("\n");
	}
    
    
    //save child objects if obj is not a creator object
    if(obj.isCreatorObj()==false){
	for(var i=0;i<obj.childCount();i++){
	    var  zwi=obj.childAtIndex(i);
	    
	    saveObject(zwi,file);
	    }
	}
}




