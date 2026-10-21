// Source: https://www.cheetah3d.com/forum/index.php?threads/13746/post-120630
// Author: ayanowitz (Cheetah3D forum), posted 2020-06-11
// Thread: "Some issues rendering sequential OBJ animation sequences"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Sequential OBJ.js
//
// this is Polygon scirpt. place this into ~/Library/Application Support/Cheetah3D/scripts/Polygonobj folder.
// updated: 20080521 - fix UV bug, cach creation bug.
// updated: 20090513 - fix bug.

/*
	cache file 
[version number(short)][frame num(uint)][vertex count(uint)][uv count(uint)][face count(uint)]
[vertex x(float)][vertex y(float)][vertex z(float][...][...]
[uv u(float)][uv v(float)][...][...]
[face corner count(uint)][face index1(uint)][uv index1(uint)][...][...][...]
*/

var SEQ_VERSION = 3;

var SHORT_BYTES = 2;
var UINT_BYTES = 4;
var FLOAT_BYTES = 4;

var seq_filedir = '';
var seq_filename = '';
var pad = 1;

var cache_ext = 'cache';

function buildUI(obj){
    
    if( obj.family() != NGONFAMILY) { // install error check from Todd's code.:)
        OS.messageBox("Installation Error!","This script file is in the wrong folder. Please place this in the PolygonObj folder.");
        return;
    }
    obj.setParameter("name","Undefined");

    obj.addParameterFloat("frame",1,0,9999,true,true); // 

    obj.addParameterSeparator("Initialize");
    obj.addParameterInt("0 pad count",6,1,10,false,false);
    obj.addParameterButton("Set File","Set","setFile");
    
    obj.addParameterSeparator("Cache");
    obj.addParameterButton("Create cache file","Create","createCacheFile");
    
    obj.addParameterSeparator("Smooth"); // normal type
    obj.addParameterSelector("smooth",["flat","phong","constraint"],true,true);
    obj.addParameterFloat("smooth angle",45,1,180,true,true);
    
    obj.setParameter("smooth",2);
}

function setFile(obj) {
	var doc = obj.document();
	
	var path = OS.runOpenPanel("obj",cache_ext);
	if (path == null) return;
	
	var file = new File(path);
	seq_filedir = file.directory();
    
    seq_filename = file.lastPathComponent();
	pad = obj.getParameter("0 pad count");
	
	/*
	file.open(READ_MODE);
	if (file.isOpen() == false) return;
	
	var line = file.readln();
	var obj_name;
	var match_name;
	while (line != null && line != -1) {
		if (match_name = line.match(/[go] (.*)$/) ) {
			if (!obj_name) {
				obj_name = match_name[1];
				break;
			}
		}
		line = file.readln();
	}
	file.close();
	
	obj.setParameter("name",obj_name);
	*/
	
	//print("setFile:"+path+", setName:"+obj_name);
}

function createCacheFile(obj) {
	if (seq_filedir && seq_filename) {
		var obj_filelist = new Array;
		var dir = new File(seq_filedir);
		var dir_filelist = dir.contentOfDir();
		
		var cfile_names = seq_filename.match(/(.*)-F[0-9]+\.obj$/);
		var cfile_name = cfile_names[1];
		var cfile_regexp = new RegExp(cfile_name+'-F[0-9]+\.obj$');
		
		print("PREPARING FOR "+cfile_name);
		var filecount = dir_filelist.length;
		for (var i = 0;i < filecount;i++) {
			if (dir_filelist[i].match(cfile_regexp)) {
				obj_filelist.push(dir_filelist[i]);
			}
		}
		
		obj_filelist = obj_filelist.sort();
		filecount = obj_filelist.length;
		//filecount = 40; // test only 40 frames
		for (var i = 0;i < filecount;i++) {
			var ofile = new File(seq_filedir+'/'+obj_filelist[i]);
			ofile.open(READ_MODE);
			if (ofile.isOpen()) {
				var frame_num = obj_filelist[i].match(/.*-F([0-9]+)\.obj$/);
				var frame_uint = new Number(frame_num[1]);
				var cfile = new File(seq_filedir+'/'+cfile_name+'-F'+frame_num[1]+'.'+cache_ext);
				cfile.open(WRITE_MODE);
				print("WRITING CACHE FILE FOR FRAME:"+frame_uint);
				if (cfile.isOpen() != false) {
					var obj_flag = true;
					var uv_count = 0;
					var vert_count = 0;
					var face_count = 0;
					
					cfile.writeShort(SEQ_VERSION); // write version
					cfile.writeUInt(parseInt(frame_uint)); // write frame number
					cfile.writeUInt(0); cfile.writeUInt(0); cfile.writeUInt(0); // write dummy - vert_count / uv_count / face_count
					
					var line = ofile.readln();
					while (line != null && line != -1) {
						var data;
						
						if (data = line.match(/[go] (.*)$/)) {
							/*
							if (!obj_flag) obj_flag = true;
							else break; // only 1 object allowed. :p
							*/
						} else if (obj_flag && (data = line.match(/v ([0-9\-\.]+) ([0-9\-\.]+) ([0-9\-\.]+)/)) ) { // v - vertex
							vert_count++;
							cfile.writeFloat(parseFloat(data[1]));
							cfile.writeFloat(parseFloat(data[2]));
							cfile.writeFloat(parseFloat(data[3]));
						} else if (obj_flag && (data = line.match(/vt ([0-9\-\.]+) ([0-9\-\.]+)/)) ) { // vt - uv info
							uv_count++;
							cfile.writeFloat(parseFloat(data[1]));
							cfile.writeFloat(parseFloat(data[2]));
						} else if (obj_flag && (data = line.match(/f (.*)/)) ) {
							var index_data = data[1].split(/ /);
							var index_len = index_data.length;
							var vert_data;
							var verts = new Array;
							var uvs = new Array;
							for (var ii = 0;ii < index_len;ii++) {
								if (vert_data = index_data[ii].match(/^(\d+)\/(\d+)/)) { // vert_index/uv_index or vert_index/uv_index/normal_index
									verts.push(parseInt(vert_data[1])-1);
									uvs.push(parseInt(vert_data[2])-1);
								} else {
									verts.push(parseInt(parseInt(index_data[ii])-1));
								}
							}
							face_count++;
							var corner_count = verts.length;
							cfile.writeUInt(corner_count);
							for (var jj = 0;jj < corner_count;jj++) {
								cfile.writeUInt(parseInt(verts[jj]));
								if (uv_count > 0) cfile.writeUInt(parseInt(uvs[jj]));
							}
						}
						
						line = ofile.readln();
					}
					
					cfile.setpos(0); // rewrite object info
					cfile.writeShort(SEQ_VERSION);
					cfile.writeUInt(parseInt(frame_uint)); // write frame number
					cfile.writeUInt(vert_count);
					cfile.writeUInt(uv_count);
					cfile.writeUInt(face_count);
					
					cfile.close();
				}
				ofile.close();
			}
		}
	}
}

function buildObject(obj) {

    obj.setParameter("normalType",obj.getParameter("smooth"),false);
    obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
    
    print("AY_DEBUG: buildObject")
    
    if (seq_filedir && seq_filename) {
    	var frame = Math.floor(obj.getParameter("frame"));
	    var core = obj.core();
	    
	    var file_names = seq_filename.match(/(.*)-F[0-9]+\..+$/);
        
        print(file_names)
        
		var file_name = file_names[1];
		
		var frame_char = new String(frame);
		while (frame_char.length < pad-1) frame_char = '0'+frame_char; // padding 0
		
		var file_path = seq_filedir + '/'+ file_name+'-F'+frame_char+'.obj';
		var cfile_path = seq_filedir + '/'+ file_name+'-F'+frame_char+'.'+cache_ext;
		        
        print("file_path"+file_path);
        print("cfile_path"+cfile_path);
        
		var file = new File(file_path);
		var cfile = new File(cfile_path);
		
        
        
		if (cfile.exist()) {
			print("using CACHE file:"+cfile_path);
			cfile.open(READ_MODE);
			if (cfile.isOpen() == false) {
				print("FILE ERROR:"+cfile_path+" is not open.");
				return;
			}
			var cache_version = cfile.readShort();
			if (cache_version == SEQ_VERSION) {
				cfile.seek(UINT_BYTES,SEEK_CUR);
				var vert_count = cfile.readUInt();
				var uv_count = cfile.readUInt();
				var face_count = cfile.readUInt();
				var uv_list = new Array;
				
				print('uv_count:'+uv_count);
				var i = 0;
				for (i = 0;i < vert_count;i++) {
					core.addVertex(false, new Vec3D(cfile.readFloat(), cfile.readFloat(), cfile.readFloat()));
				}
				for (i = 0;i < uv_count;i++) {
					uv_list.push(new Vec2D(cfile.readFloat(), cfile.readFloat()));
				}
				for (i = 0;i < face_count;i++) {
					var corner_count = cfile.readUInt();
					var verts = new Array;
					var uvs = new Array;
					for (var ii = 0;ii < corner_count;ii++) {
						verts.push(cfile.readUInt());
						if (uv_count > 0) {
                            
                            var tmp = cfile.readUInt();
                            if (tmp < uv_list.length) {
                                uvs.push(uv_list[tmp]);
                            } else {
                                print("AY_DEBUG: Did the hack!!!!")
                                uvs.push(uv_list[parseInt(uv_list.length-1)]);
                            }
                           
                        }
					}
                    
                    //core.addIndexPolygon(size, verts, uvs);
                    
					if (uv_count > 0) {
						core.addIndexPolygon(corner_count, verts.reverse(), uvs.reverse());
					} else {
						core.addIndexPolygon(corner_count, verts.reverse());
					}
				}
			} else {
				print("ERROR: Cache file version is different "+cache_version);
			}
			print("READ FINISHED:"+vert_count+","+uv_count+","+face_count);
			cfile.close();
		} else if (file.exist()) {
			print("reading OBJ file:"+file_path);
			file.open(READ_MODE);
			if (file.isOpen() == false) {
				print("FILE ERROR:"+file_path+" is not open.");
				return;
			}
			var obj_flag = true;
			var uv_list = new Array;
			var vert_count = 0;
			var face_count = 0;
			
			var line = file.readln();
			while (line != null && line != -1) {
				var data;
				
				if (data = line.match(/[go] (.*)/)) {
					/*
					if (!obj_flag) obj_flag = true;
					else break; // only 1 object allowed.
					*/
				} else if (obj_flag && (data = line.match(/v ([0-9\-\.]+) ([0-9\-\.]+) ([0-9\-\.]+)/)) ) { // v - vertex
					core.addVertex(false, new Vec3D(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3])));
					vert_count++;
                    //print("AY_DEBUG: vert_count= " + vert_count)
				} else if (obj_flag && (data = line.match(/vt ([0-9\-\.]+) ([0-9\-\.]+)/)) ) { // vt - uv info
					uv_list.push(new Vec2D(parseFloat(data[1]), parseFloat(data[2])));
                    //print("AY_DEBUG: uv_list.length= " + uv_list.length)
				} else if (obj_flag && (data = line.match(/f (.*)/)) ) {
					var index_data = data[1].split(/ /);
					var index_len = index_data.length;
					var vert_data;
					var verts = new Array;
					var uvs = new Array;
					for (var i = 0;i < index_len;i++) {
						if (vert_data = index_data[i].match(/^(\d+)\/(\d+)/)) { // vert_index/uv_index or vert_index/uv_index/normal_index
                            verts.push(parseInt(vert_data[1])-1);
                            
                            if ((parseInt(vert_data[2])-1) < uv_list.length) {
                                uvs.push(uv_list[parseInt(vert_data[2])-1]);
                            } else {
                                print("AY_DEBUG: Did the hack!!!!")
                                uvs.push(uv_list[parseInt(uv_list.length-1)-1]);
                            }
                            
                            //print("AY_DEBUG: verts= " + verts[i] + " uvs= " + uvs[i])
						} else {
							verts.push(parseInt(parseInt(index_data[i])-1));
                            //print("AY_DEBUG: verts only")
						}
					}
                    
                    //print("AY_DEBUG: buildObject - uvs.length= "+uvs.length + " verts.length= "+verts.length +" face_count= " +  face_count)
                    
					if (uvs.length > 0) {
						core.addIndexPolygon(index_len, verts.reverse(), uvs.reverse());
					} else {
						core.addIndexPolygon(index_len, verts.reverse());
					}
					face_count++;
				}

                line = file.readln();
			}
			file.close();
			print("READ FINISHED:"+vert_count+","+face_count);
		} else {
			print("FILE ERROR:"+file_path+" is not exist.");
			return;
		}
    }
}

