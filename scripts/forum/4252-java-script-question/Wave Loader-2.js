// Source: https://www.cheetah3d.com/forum/index.php?threads/4252/post-47037
// Author: tg_jp (Cheetah3D forum), posted 2010-09-02
// Thread: "Java script question"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/* wave 
 main routine from 
    http://oku.edu.mie-u.ac.jp/~okumura/dumpwave.c
 
*/

function buildUI( tool ) {
	tool.addParameterSeparator("Wave Loader");
	
	tool.addParameterInt("from", 0, 0, 1000000, false, false);
	tool.addParameterInt("to", -1, -1, 1000000, false, false);
	tool.addParameterFloat("step size", 0.01, 0, 100, false, false);
	
	tool.addParameterButton("load wave", "load", "loadWave");
}

var to = -1;

function loadWave( tool ) {
	
	var path = OS.runOpenPanel("wav");
	
	var size = tool.getParameter("step size");
	var from = tool.getParameter("from");
	to = tool.getParameter("to");
	
	if ( path == null ) return;
	
	var s, x, len, i, count;
	var wave = new File(path);
	wave.open(READ_MODE, LITTLE_ENDIAN);
	
	if (wave.isOpen() == false) return;
	
	if (wave.read(4) != 'RIFF') {
		print("Not a 'RIFF' format");
		wave.close();
		return;
	} else {
		print("---");
	}
	
	var wavesize = wave.readUInt();
	if (wavesize == -1) return;
	print("[RIFF] "+wavesize+" bytes");
	
	if (wave.read(8) != 'WAVEfmt ') {
		print("Not a 'WAVE' format");
		wave.close();
		return;
	}
	
	len = wave.readUInt();
	print("[WAVE] ("+len+" bytes)");
	if (len != 16) {
		print("Not Linear PCM : "+len);
	} else {
		print("Linear PCM : "+len);
	}
	var datapos = wave.getpos() + len;
	
	print("  Data type = "+wave.readShort()+" (1 = PCM)");
	
	var channels = wave.readShort();
	print("  Number of channels = "+channels+" ( 1 = mono, 2 = stereo)");
	
	var samplingrate = wave.readUInt();
	print("  Sampling rate = "+samplingrate+"Hz");
	
	print("  Bytes / second = "+wave.readUInt()+"");
	
	var byes_channels = wave.readShort();
	print("  Bytes x channels = "+byes_channels+"");
	
	var bits = wave.readShort();
	print("  Bits / sample = "+bits);
	
	wave.seek( datapos, SEEK_SET );
	
	do {
		s = wave.read(4);
		
		if (s == 'data') {
			len = wave.readUInt();
			print("["+s+"] ("+len+" bytes)");
		} else if (s == 'fact') {
			len = wave.readUInt();
			print("["+s+"] ("+len+" samples)");
		}
	} while ( s != 'data' );
	
	
	/* spline */
	var pos = new Vec3D(0,0,0);
	var spl_list = [];
	var spl_name =  (wave.lastPathComponent())? wave.lastPathComponent().replace(".wav","") : "undefined";
	
	for (i = 0;i < channels;i++) {
		var spl = tool.document().addObject(SPLINE);
		var core = spl.core();
		spl_list.push( [spl, core] );
		spl.setParameter("name", spl_name+'_'+i);
		core.move(pos);
	}
	
	wave.seek(from*channels, SEEK_CUR);
	
	var ysize = Math.pow(2, bits) / 2;
	
	for (count = 0;count != to; count++) {
		for (i = 0;i < channels;i++) {
			if (bits == 8) {
				x = wave.read(1);
				if ( x != null ) {
					x = (x.charCodeAt(0) - 128) / 128;
				} else {
					wave.close();
					return;
				}
			} else {
				x = wave.readInt();
				if ( x != null ) {
					x = x / 32767;
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