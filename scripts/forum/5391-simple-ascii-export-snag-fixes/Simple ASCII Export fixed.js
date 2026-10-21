// Source: https://www.cheetah3d.com/forum/index.php?threads/5391/post-39172
// Author: mlb (Cheetah3D forum), posted 2010-02-19
// Thread: "Simple ASCII export snag fixes"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
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
    file.writeln("\n");


    //save materials
    for(i=0;i<doc.materialCount();i++){
	var mat=doc.materialAtIndex(i);
	var matcolor=mat.color();
	var mattexture=mat.colorMap();
	var matname=mat.getParameter("name");

	file.writeln("Material \"" + matname + "\"");
	file.writeln("tex \"" + mattexture +"\"");
	file.writeln("color " + matcolor.x.toPrecision(3) + " " + matcolor.y.toPrecision(3) + " " + matcolor.z.toPrecision(3) + " " + matcolor.w.toPrecision(3));
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

		var out = polysize + " " + material;
	    for(j=0;j<polysize;j++){
		var	uvcoord=core.uvCoord(i,j);
			out += " " + core.vertexIndex(i,j) + "/" + uvcoord.x.toPrecision(3) + "/" + uvcoord.y.toPrecision(3);
		}
	    file.writeln(out);
	    }

	file.writeln("");
	}


    //save child objects if obj is not a creator object
    if(obj.isCeatorObj()==false){
	for(var i=0;i<obj.childCount();i++){
	    var  zwi=obj.childAtIndex(i);

	    saveObject(zwi,file);
	    }
	}
}




