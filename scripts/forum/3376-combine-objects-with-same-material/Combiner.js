// Source: https://www.cheetah3d.com/forum/index.php?threads/3376/post-23953
// Author: tg_jp (Cheetah3D forum), posted 2008-08-07
// Thread: "Combine objects with same material"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Combiner.js
//
//  this is Tool script, place this into ~/Application Support/Cheetah3D/scripts/Tool folder.
//  
//  
//  
//  (c) 2008 Hiroto Tsubaki
//  http://www.tres-graficos.jp/
//  tg@tres-graficos.jp

var object_list = new Array;

function ObjectContainer(tag, name, obj) {
	this.tag = tag;
	this.name = name;
	this.list = [ obj ];
}
ObjectContainer.prototype.toString = function() {
	return this.tag + ':' + this.name + ':' + this.list.length + ',' + this.list.toString();
}

function setObjectForList(tag, name, obj) {
	var inserted = false;
	var len = object_list.length;
	for (var i = 0; i < len; i++) {
		if (object_list[i].tag == tag) {
			object_list[i].list.push(obj);
			inserted = true;
		}
	}
	if (!inserted) {
		object_list.push(new ObjectContainer(tag, name, obj));
	}
}

function buildUI(tool) {
	tool.addParameterSeparator("Combiner");
	
	tool.addParameterSelector("combine type",['materials'], false, false);
	tool.addParameterSelector("range",['all objects', 'selected and its children'], false, false);
	tool.addParameterButton("combine","combine","Combine");
}

function Combine(tool) {
	var doc = tool.document();
	
	switch (parseInt(tool.getParameter("range"))) {
		case 0 :
			var root = doc.root();
			break;
		case 1 :
			var root = doc.selectedObject();
			break;
	}
	
	object_list.length = 0;
	createList(root);
	
	//print(object_list);
	
	createObjects(doc);
}

function createObjects(doc) {
	var len = object_list.length;
	for (var i = 0;i < len;i++) {
		var info = object_list[i];
		
		var obj = doc.addObject(POLYGONOBJ);
		var core = obj.core();
		
		var i_len = info.list.length;
		for (var j = 0;j < i_len;j++) {
			var copy_core = info.list[j].modCore();
			var copy_mat = info.list[j].obj2WorldMatrix();
			copyCore(core, copy_core, copy_mat);
		}
		
		obj.setParameter("name", info.name);
	}
}

function copyCore(core, copy_core, copy_mat) {
	var verts_count = copy_core.vertexCount();
	var verts_index = [];
	for (var i = 0;i < verts_count;i++) {
		verts_index[i] = core.addVertex(false, copy_mat.multiply(copy_core.vertex(i)));
	}
	var poly_count = copy_core.polygonCount();
	var poly_index = [];
	for (var i = 0 ;i < poly_count;i++) {
		var poly_size = copy_core.polygonSize(i);
		var verts = [];
		var uvs = [];
		for (var j = 0;j < poly_size;j++) {
			verts[j] = verts_index[ copy_core.vertexIndex(i,j) ];
			uvs[j] = copy_core.uvCoord(i,j);
		}
		poly_index[i] = core.addIndexPolygon(poly_size, verts);
		
		for (var j = 0;j < poly_size;j++) {
			core.setUVCoord(poly_index[i], j, uvs[j]);
		}
		// copy polygon selection
		for (var s = 0;s < 16;s++) {
			copy_core.setActivePolygonSelection(s);
			core.setPolygonSelection(poly_index[i], copy_core.polygonSelection(i));
		}
	}
}

function createList(obj) {
	if (obj.type() == POLYGONOBJ) {
		// getting materials
		var doc = obj.document();
		var mat_tags = obj.materialTags();
		var mat_ids = '';
		var mat_name = '';
		for (var i in mat_tags) {
			var mat = mat_tags[i];
			mat_ids += mat.linkedToMaterial() + ',';
			mat_name += mat.linkedToMaterial() + ' - ' + doc.materialAtIndex(mat.linkedToMaterial()).getParameter("name") + ',';
		}
		// if object has not any material tag.
		if (mat_ids == '') mat_ids = 'none';
		
		setObjectForList(mat_ids, mat_name, obj);
	}
	var child_count = obj.childCount();
	for (var i = 0;i < child_count;i++) {
		var c_obj = obj.childAtIndex(i);
		createList(c_obj);
	}

}