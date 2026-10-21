// Source: https://www.cheetah3d.com/forum/index.php?threads/2247/post-15763
// Author: tg_jp (Cheetah3D forum), posted 2007-10-16
// Thread: "Can I get the dimensions of a material through javascript?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// for Macro scirpt.
function main(doc) {
	//getting first material of document.
	var mat = doc.materialAtIndex(0);
	
	if (mat != null) {
		//getting color texture file path.
		var colorTex = mat.getParameter("colorTex");
		
		print('sipsInfo for '+colorTex);
		//call system command 'sips' and save a result to the temporary file.
		OS.system('/usr/bin/sips -g all '+colorTex+' > /tmp/ch_sipsInfo');
		
		//open and read the temporary file.
		var info = new File('/tmp/ch_sipsInfo');
		info.open(READ_MODE);
		if (info.isOpen() == false) return;
		var line = info.readln();
		var ret = '';
		while (line != -1) {
			if (ret = line.match(/(pixelWidth|pixelHeight): ([0-9]+)/)) {
				print(ret[1]+':'+ret[2]);
			};
			line = info.readln();
		}
		info.close();
		//delete the temporary file.
		OS.system('rm /tmp/ch_sipsInfo');
	}
}