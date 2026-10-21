// Source: https://www.cheetah3d.com/forum/index.php?threads/3377/post-24000
// Author: giulioandrea (Cheetah3D forum), posted 2008-08-10
// Thread: "parametric modelling via script"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// global variables
var point_cache = [];



// path variables and counters
var where = '/Users/Pillo/Desktop/';
var obj_out = 'obj/';
OS.system('mkdir ' + where + obj_out);

//file containing the vertex coordinates
var	data_file = new File(where + 'data.txt');
// file containing the name of the obj file to export
var	iter_file = new File(where + 'N.txt');
// file used to check if an iteration can be started
var	doit_file = new File(where + 'doit.txt');
var doit = false;


//will keep updating until either the max iteration is exceed or a stop file is found
var stop_file = new File(where + 'stop.txt');
var Stop = false;
var current_iteration = 1;

// this value should be 10000000000000000
// I am using a small value just to check it works
var max_teration = 10;


////////////////////////////////////////////////////////////////////////////////////
// main function
function main(doc){

//get selected object that MUST BE THAT SPLINE
var obj=doc.selectedObject();


// current iteration < max iteration and there is not a stop file.
while ( !Stop && current_iteration < max_teration ) {
Stop = stop_file.exist();
doit = doit_file.exist();


while (!doit) {
doit = doit_file.exist();
	if( stop_file.exist() ) {
	break;
	}
}

// just make sure that next cycle the file doit.txt is not there
OS.system('rm '+ doit_file.directory()+ '/' + doit_file.lastPathComponent() );


//////////////////////////////////////////////////////////////////////////
	if( stop_file.exist() ) {
	break;
	}

// from the original script, plus read the N value that is an external counter.
// the idea is that Cheetah is a sort of server, waiting for the various files and 
// does not know the number of iteration of the external application.


    //straight form the original code
	point_cache.length = 0;

	// if data_file is set, and exists.
	if (data_file != '' && data_file.exist()) {

	// if iter_file is set, and exists.
	if (iter_file != '' && iter_file.exist()) {

// reading the vertexes positions
		data_file.open(READ_MODE);
		var line = data_file.readln();
		while (line != -1) {
			var data;
			if (data = line.match(/^([0-9\.\-]+)\s([0-9\.\-]+)\s([0-9\.\-]+)/)) {
				var vec = new Vec3D(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
				point_cache.push(vec);
			}
			line = data_file.readln();
		}
		data_file.close();

// reading the interation value
		iter_file.open(READ_MODE);
		var n_line = iter_file.readln();
		var n_data;
		if (n_data = n_line.match( /^([0-9\.\-]+)/)   ) {
		var N = parseFloat((n_data[1]));
		}
		iter_file.close();

//some checks
	//OS.system('echo ' +  N +  ' > ' + where + 'N.check')
	//OS.system('echo ' +  point_cache +  ' > ' +where+ 'PP.txt')


// after reading delete the data and N files so that they can not 
// be read twice
	OS.system('rm '+ data_file.directory()+ '/' +data_file.lastPathComponent()  );
	OS.system('rm '+ iter_file.directory()+ '/' + iter_file.lastPathComponent() );
//IF data	
	}
// IF ITER
	}


//////////////NON WORKING PART//////////////////////
// here I should give to the selected object the coordinartes of the vertexes and update...
// I am not too sure how to change this to make it work...
	var core = obj.core();
	var len = point_cache.length;
	for (var i = 0;i < len;i++) {
		if (i == 0) { // starting point
			core.move(point_cache[i]);
		} else if (i == len - 1) { // ending point, close to starting point
			core.line(point_cache[i]);
			core.line(point_cache[0]);
		} else {
			core.line(point_cache[i]);
		}
	}
  obj.update();


/////////////////////////////////
// Avter is all done and updated an obj is saved.
// the name of the file uses the external counter of N.txt
	//export obj file with incremental name        
	doc.saveToFile(where + obj_out + N + '.obj','obj');
	doc.saveToFile(where + obj_out + N + '.mtl','mtl');


////////////////////////////////////////////////////////////////////////////
// gives the signal to the external application that is all done.
OS.system('echo ' +  current_iteration +  ' > ' + where +  'fatto.txt')
current_iteration = current_iteration + 1;



//while iteration and not stop
}

//main
}






