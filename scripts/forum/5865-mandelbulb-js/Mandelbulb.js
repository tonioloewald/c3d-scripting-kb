// Source: https://www.cheetah3d.com/forum/index.php?threads/5865/post-47820
// Author: tg_jp (Cheetah3D forum), posted 2010-09-24
// Thread: "Mandelbulb.js"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 * Mandelbulb.js
 * 
 * v.20100616 first release
 * v.20100617 fixed julia bug
 */

// if you use older version than 5.5, you have to set manually absolute path for Mandelbubl executable file.
var exePath = "Mandelbulb";

var tmpFile = "/tmp/mandelbulb.data";
var cacheFile = '';
var createCache = false;

var Vec3D_toString = function() {
	var vec = arguments[0];
	return vec.x.toFixed(6) + ', ' + vec.y.toFixed(6) + ', ' + vec.z.toFixed(6);
}

function buildUI( obj ) {
	
	obj.setParameter("name", "Mandelbulb");
	
	obj.addParameterSelector("mode", ["points","mesh"], true, true );
	obj.addParameterSelector("mesh connect", ["on with BSP","on witout BSP","none"], true, true );
	
	
	obj.addParameterInt("resolution",50,2,5000,true,true);
	
	obj.addParameterFloat("grid scale",10,0.0001,100,true,true);
	
	obj.addParameterFloat("min x",-1.41421,-2,2,true,true);
	obj.addParameterFloat("min y",-1.41421,-2,2,true,true);
	obj.addParameterFloat("min z",-1.41421,-2,2,true,true);

	obj.addParameterFloat("max x",1.41421,-2,2,true,true);
	obj.addParameterFloat("max y",1.41421,-2,2,true,true);
	obj.addParameterFloat("max z",1.41421,-2,2,true,true);
	
	obj.addParameterButton("set def min/max", "set", "setDefaultValue");
	
	obj.addParameterSeparator("exceptions");
	
	obj.addParameterFloat("inner",       0, 0, 1.41422,true,true);
	obj.addParameterFloat("outer", 1.41421, 0, 1.41422,true,true);
	
	obj.addParameterSeparator("fractal parameter");
	
	obj.addParameterFloat("bailout", 4, 0.5, 12, true, true);
	
	obj.addParameterFloat("power",8,-32,32,true,true);
	
	obj.addParameterFloat("phase x",0,-2,2,true,true);
	obj.addParameterFloat("phase y",0,-2,2,true,true);
	
	obj.addParameterInt("max iterations",4,0,60,true,true);
	
	obj.addParameterSeparator("radiolaria parameter");
	
	obj.addParameterBool("radiolaria",0,0,1,true,true);
	obj.addParameterFloat("radiolaria factor",0,-4,4,true,true);
	
	obj.addParameterSeparator("julia parameter");
	
	obj.addParameterBool("julia",0,0,1,true,true);
	obj.addParameterFloat("julia x",1,-2,2,true,false);
	obj.addParameterFloat("julia y",0,-2,2,true,false);
	obj.addParameterFloat("julia z",0,-2,2,true,false);
	
	obj.addParameterSeparator("polygonization");
	
	obj.addParameterFloat("iso",0.5,0,1.0,true,true);
	obj.addParameterInt("surface smooth",3,1,15,true,true);
    
	obj.addParameterSeparator("cache");
	obj.addParameterButton("select cache","select","selectCache");
	obj.addParameterButton("reset cache", "reset", "resetCache");
	obj.addParameterButton("make cache","make","makeCache");
	
    obj.addParameterSeparator("Smooth");
    obj.addParameterSelector("smooth",["normalFlat","normalPhong","normalContraint"],true,true);
    obj.addParameterFloat("smooth angle", 45.0, 5.0, 90.0, true, true);
    
    obj.setParameter("smooth",2);
    obj.setParameter("mode",1);
	
	// cmd check
	if (obj.scriptPath) {
		var scrPath = obj.scriptPath();
	} else {
		var scrPath = '';
	}
	var scrFile = new File( scrPath );
	
	var fracFile = new File( scrFile.directory() + '/' + exePath );
	exePath = scrFile.directory().replace(" ", "\\ ") + '/' + exePath;
	print( "----\n"+exePath+" set as exePath");
	
	if (! fracFile.exist() ) { 
		OS.beep();
		print('error: Mandelbulb is not found at "'+exePath+'"');
		return;
	}
}

function setDefaultValue( obj ) {
	obj.setParameter("min x", -1.41421);
	obj.setParameter("min y", -1.41421);
	obj.setParameter("min z", -1.41421);
	
	obj.setParameter("max x",  1.41421);
	obj.setParameter("max y",  1.41421);
	obj.setParameter("max z",  1.41421);
}

function selectCache( obj ) {
	var path = OS.runOpenPanel('cache');
	if (path == null) return;
	
	cacheFile = path;
	
	print( "----\n" + 'set cache path:'+path );
	obj.update();
}

function resetCache( obj ) {
	cacheFile = '';
	
	print( "----\n" + 'reset cache' );
}

function makeCache( obj ) {
	var path = OS.runSavePanel('cache');
	if (path == null) return;
	
	cacheFile = '';
	createCache = true;
	obj.update();
	
	print( "----\n" + 'create cache:'+path );
	OS.system("cp "+tmpFile+" "+path);
	cacheFile = path;
	createCache = false;
	OS.system("rm "+tmpFile);
}

function buildObject( obj ) {
	var core = obj.core();
	
	var st1 = new Date().getTime();
	print('----');
	
	var mode = parseInt(obj.getParameter("mode"));
	var connect = parseInt(obj.getParameter("mesh connect"));

	var iso = obj.getParameter("iso");
	var smooth = obj.getParameter("surface smooth");
	var useGCD = true; //obj.getParameter("use GCD");
	
	var gridScale = obj.getParameter("grid scale");
	
	bailout = obj.getParameter("bailout");
	power = obj.getParameter("power");
	maxIterations = obj.getParameter("max iterations");
	
	var resolution = obj.getParameter("resolution");
	
	phase_x = obj.getParameter("phase x");
	phase_y = obj.getParameter("phase y");
	
	var radiolaria = obj.getParameter("radiolaria");
	var radiolariaFactor = obj.getParameter("radiolaria factor");
	
	var inner = obj.getParameter("inner");
	var outer = obj.getParameter("outer");
	
	var v_minx = obj.getParameter("min x");
	var v_miny = obj.getParameter("min y");
	var v_minz = obj.getParameter("min z");
	
	var v_maxx = obj.getParameter("max x");
	var v_maxy = obj.getParameter("max y");
	var v_maxz = obj.getParameter("max z");
	
	julia = obj.getParameter("julia");
	if (julia) {
		var julia_c = new Vec3D(obj.getParameter("julia x"), obj.getParameter("julia y"), obj.getParameter("julia z"));
		//print('julia:'+Vec3D_toString( julia_c ));
	}
	
	//
	var cmd = exePath + 
					' --iterations ' + maxIterations + ' --resolutions ' + resolution +
					' --maxx ' + v_maxx.toFixed(6) + ' --minx ' + v_minx.toFixed(6) + 
					' --maxy ' + v_maxy.toFixed(6) + ' --miny ' + v_miny.toFixed(6) + 
					' --maxz ' + v_maxz.toFixed(6) + ' --minz ' + v_minz.toFixed(6) + 
					' --scale ' + gridScale.toFixed(3) + 
					
					' --power ' + power.toFixed(2) + ' --bailout ' + bailout.toFixed(3) +
					' --inner ' + inner.toFixed(4) + ' --outer ' + outer.toFixed(4) + ' --phase_x ' + phase_x.toFixed(4) + ' --phase_y ' + phase_y.toFixed(4);
	
	if (julia) cmd += ' --julia ' + ' --julia_x ' + julia_c.x.toFixed(4) + ' --julia_y ' + julia_c.y.toFixed(4) + ' --julia_z ' + julia_c.z.toFixed(4);
	if (radiolaria) cmd += ' --radiolaria ' + " -radiolariaFactor " + radiolariaFactor.toFixed(4)
	if (mode == 0) {
		cmd += ' --output ' + tmpFile;
	} else {
		if (useGCD) {
			cmd += ' --s_output ' + tmpFile + ' --iso ' + iso.toFixed(2) + ' --smooth ' + smooth + ' -g';
		} else {
			cmd += ' --s_output ' + tmpFile + ' --iso ' + iso.toFixed(2) + ' --smooth ' + smooth;
		}
	}
	
	var tmp = new File( tmpFile );
	var tmpCache = new File( cacheFile );
	
	if (cacheFile != '' && tmpCache.exist()) {
		var st2 = new Date().getTime();
		printElapsedTime("cached calculation", st2-st1); 
		
		tmp = new File( cacheFile );
	} else {
		//print(cmd);
		OS.system( cmd );
		var st2 = new Date().getTime();
		printElapsedTime('calculation', st2-st1);
	}
	
	var vec = new Vec3D();
	
	if (mode == 0) {
		tmp.open( READ_MODE, BIG_ENDIAN );
		
		if (! tmp.isOpen()) {
			print('tmp open error [point mode]');
			return;
		}
		
		//OS.system("cp "+tmpFile+" "+tmpFile_cache);
		
		var dx = v_maxx - v_minx;
		var dy = v_maxy - v_miny;
		var dz = v_maxz - v_minz;
		
		var dmax = ( dx > dy )?
						( dx > dz )? dx : dz :
						( dy > dz )? dy : dz ;
						
		var d = dmax/resolution;
		var resx = Math.ceil( dx / d );
		var resy = Math.ceil( dy / d );
		var resz = Math.ceil( dz / d );
		
		var res;
		
		for (var i = 0;i < resx;i++) {
			for (var j = 0;j < resy;j++) {
				for (var k = 0;k < resz;k++) {
					res = tmp.readUInt();
					if (res == 1) {
						
						vec.set( v_minx + (i*d), v_miny + (j*d), v_minz + (k*d) );
						
						core.addVertex( false, vec );
					}
				}
			}
		}
	} else {
		tmp.open( READ_MODE, BIG_ENDIAN );
		
		if (! tmp.isOpen()) {
			print('tmp open error [polygon mode]');
			return;
		}
		
		// smooth
		obj.setParameter("normalType",obj.getParameter("smooth"),false);
		obj.setParameter("normalAngle",obj.getParameter("smooth angle"),false);
		
		var i1, i2, i3;
		var loop = true;
		
		var triangles = tmp.readUInt();
		
		var bsp_min = new Vec3D( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
		var bsp_max = new Vec3D( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
		
		//print('bsp_min:'+Vec3D_toString(bsp_min)+', bsp_max:'+Vec3D_toString(bsp_max));
		
		if (connect == 0) { // connect with BSP
			core.buildVertexBSP( bsp_min, bsp_max );
			
			for (var i = 0;i < triangles;i++) {
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i1 = core.addVertex( true, vec );
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i2 = core.addVertex( true, vec );
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i3 = core.addVertex( true, vec );
				
				core.addIndexPolygon( 3, [i1, i2, i3] );
			}
			
			core.destroyVertexBSP();
		} else if (connect == 1) { // connect without BSP
			
			for (var i = 0;i < triangles;i++) {
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i1 = core.addVertex( true, vec );
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i2 = core.addVertex( true, vec );
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i3 = core.addVertex( true, vec );
				
				core.addIndexPolygon( 3, [i1, i2, i3] );
			}
			
		} else  { // no connect
			for (var i = 0;i < triangles;i++) {
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i1 = core.addVertex( false, vec );
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i2 = core.addVertex( false, vec );
				vec.set( tmp.readFloat(), tmp.readFloat(), tmp.readFloat() );
				i3 = core.addVertex( false, vec );
				
				core.addIndexPolygon( 3, [i1, i2, i3] );
			}
		}
		var tri_count = new String(triangles);
		print("mesh count:"+tri_count.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, "$1,"));
	}
	
	tmp.close();
	
	var st3 = new Date().getTime();
	printElapsedTime('mesh creation', st3-st2);
	printElapsedTime('total', st3-st1);
	
	if (! createCache) OS.system("rm "+tmpFile);
}

function printElapsedTime(label, time) {
	if (time/1000 > 60) {
		print( label + ':' + (time/1000).toFixed(2) + 'sec(s) ( ' + Math.floor(time/1000/60) + '.' + Math.floor((time/1000)%60) + ' )');
	} else {
		print( label + ':' + (time/1000).toFixed(2) + 'sec(s)' );
	}
}
