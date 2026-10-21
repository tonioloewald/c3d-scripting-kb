// Source: https://www.cheetah3d.com/forum/index.php?threads/11774/post-100499
// Author: tg_jp (Cheetah3D forum), posted 2016-04-23
// Thread: "Queuestion"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Batch Render Helper
//
var tmpPath = "/tmp/";

function main(doc){

	// set data path
	var dataFilePath = tmpPath + "c3d_batchRenderData.txt"
	file = new File( dataFilePath );

	if (file.exist()) {

		file.open( READ_MODE );
		var data = file.read( 1024 );
		file.close();

		eval( data );

		OS.system( "touch " + path + "/c3d_batchRender.lock" );

		var filepath = path + "/" + filename;

		doc.render(filepath);

		OS.system( "rm " + dataFilePath );
		OS.system( "rm " + path + "/c3d_batchRender.lock" );
	} else {
		print( "data file is missing." );
	}
}
