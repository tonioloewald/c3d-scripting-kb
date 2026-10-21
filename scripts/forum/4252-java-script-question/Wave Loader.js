// Source: https://www.cheetah3d.com/forum/index.php?threads/4252/post-29791
// Author: tg_jp (Cheetah3D forum), posted 2009-05-27
// Thread: "Java script question"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/* wave 
 main routine from 
    http://oku.edu.mie-u.ac.jp/~okumura/dumpwave.c
 
*/

function buildUI( tool ) {
	tool.addParameterSeparator("Wave Loader");
	
	tool.addParameterInt("offset", 0, 0, 1000000, false, false);
	tool.addParameterInt("samples", -1, -1, 1000000, false, false);
	tool.addParameterFloat("step size", 0.01, 0, 100, false, false);
	
	tool.addParameterButton("load wave", "load", "loadWave");
}

var samples_to_output = -1;

function loadWave( tool ) {
	
	var path = OS.runOpenPanel("wav");
	
	var size = tool.getParameter("step size");
	var offset = tool.getParameter("offset");
	samples_to_output = tool.getParameter("samples");
	
	if ( path == null ) return;
	
	var s, x, len, i, count;
	var wave = new File(path);
	wave.open(READ_MODE, LITTLE_ENDIAN);
	
	if (wave.isOpen() == false) return;
	
	if (wave.read(4) != 'RIFF') {
		print("Not a 'RIFF' format");
		wave.close();
		return;
	}
	
	var wavesize = wave.readUInt();
	if (wavesize == -1) return;
	print("[RIFF] "+wavesize+" bytes");
	
	if (wave.read(8) != 'WAVEfmt ') {
		print("Not a 'WAVEfmt ' format");
		wave.close();
		return;
	}
	
	len = wave.readUInt();
	print("[WAVEfmt ] "+len+" bytes");
	if (len != 16) {
		print("Length of 'WAVEfmt ' must be 16!");
		return;
	}
	print("  Data type = "+wave.readShort()+" (1 = PCM)");
	var channels = wave.readShort();
	print("  Number of channels = "+channels+" ( 1 = mono, 2 = stereo)");
	print("  Sampling rate = "+wave.readUInt()+"Hz");
	print("  Bytes / second = "+wave.readUInt()+"");
	print("  Bytes x channels = "+wave.readShort()+"");
	var bits = wave.readShort();
	print("  Bits / sample = "+bits);
	s = wave.read(4);
	while(s != null) {
		len = wave.readUInt();
		print("["+s+"] ("+len+" bytes)");
		if (s == 'data') break;
		for (i = 0;i < len;i++) {
			x = wave.read(1);
			//print( x.charCodeAt(0) );
		}
		s = wave.read(4);
	}
	/* spline */
	var pos = new Vec3D(0,0,0);
	var spl_list = [];
	for (i = 0;i < channels;i++) {
		var spl = tool.document().addObject(SPLINE);
		var core = spl.core();
		spl_list.push( [spl, core] );
		spl.setParameter("name", wave.lastPathComponent().replace(".wav","")+'_'+i);
		core.move(pos);
	}
	
	wave.seek(offset, SEEK_CUR);
	
	var ysize = Math.pow(2, bits) / 2;
	
	for (count = 0;count != samples_to_output; count++) {
		for (i = 0;i < channels;i++) {
			if (bits <= 8) {
				x = wave.read(1);
				if ( x != null ) {
					x = x.charCodeAt(0) - ysize;
				} else {
					wave.close();
					return;
				}
			} else {
				x = wave.read(2);
				if ( x != null ) {
					x = x.charCodeAt(0) + (256 * x.charCodeAt(1)) - ysize;
				} else {
					wave.close();
					return;
				}
			}
			pos.x = size + count * size;
			pos.y = x/ysize;
			spl_list[i][1].line(pos);
		}
		// only one channel for spline
	}
	
	wave.close();
}