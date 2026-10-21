// Source: https://www.cheetah3d.com/forum/index.php?threads/6557/post-51755
// Author: murcielago (Cheetah3D forum), posted 2010-11-21
// Thread: "Move Mouth with Wave File"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/* wave 
 main routine from 
    http://oku.edu.mie-u.ac.jp/~okumura/dumpwave.c
 
*/

/* assumption: 15fps */
/* this will produce a text file with the rotations for the jaw */
/* script "A Rotator.js" can be used to read the text file and create jpg's for each frame. */
/* Blender can be used to import jpg's and wave file to create *.mov file with sound */

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

	var f = new File(path.replace(".wav",".txt"));
	f.open(WRITE_MODE);
    if (f.isOpen()==false) return;	
	
	if (wave.read(4) != 'RIFF') {
		f.writeln("Not a 'RIFF' format");
		wave.close();
		return;
	} else {
		f.writeln("---");
	}
	
	var wavesize = wave.readUInt();
	if (wavesize == -1) return;
	f.writeln("[RIFF] "+wavesize+" bytes");
	
	if (wave.read(8) != 'WAVEfmt ') {
		f.writeln("Not a 'WAVE' format");
		wave.close();
		return;
	}
	
	len = wave.readUInt();
	f.writeln("[WAVE] ("+len+" bytes)");
	if (len != 16) {
		f.writeln("Not Linear PCM : "+len);
	} else {
		f.writeln("Linear PCM : "+len);
	}
	var datapos = wave.getpos() + len;
	
	f.writeln("  Data type = "+wave.readShort()+" (1 = PCM)");
	
	var channels = wave.readShort();
	f.writeln("  Number of channels = "+channels+" ( 1 = mono, 2 = stereo)");
	
	var samplingrate = wave.readUInt();
	f.writeln("  Sampling rate = "+samplingrate+"Hz");
	
	var bytesPerSecond = wave.readUInt();
	f.writeln("  Bytes / second = "+bytesPerSecond+"");
	
	var byes_channels = wave.readShort();
	f.writeln("  Bytes x channels = "+byes_channels+"");
	
	var bits = wave.readShort();
	f.writeln("  Bits / sample = "+bits);
	
	wave.seek( datapos, SEEK_SET );
	
	var totalSeconds = 0;
	do {
		s = wave.read(4);
		
		if (s == 'data') {
			len = wave.readUInt();
			f.writeln("["+s+"] ("+len+" bytes)");
			totalSeconds = len/bytesPerSecond;
			f.writeln("seconds:"+totalSeconds+"");
		} else if (s == 'fact') {
			len = wave.readUInt();
			f.writeln("["+s+"] ("+len+" samples)");
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

	// my vars
	var secondsElapsed = 0;
	var frame = 0;
	var sumY = 0;
	var cntY = 0;
	var stopMe = false;
	var secondsPerFrame = 1/15;
	var frames = [];

	for (count = 0;count != to; count++) {
		if (stopMe == true) {break;}
		for (i = 0;i < channels;i++) {
			// all my files will be 16 bit so will go to the "else" part
			if (bits == 8) {
				x = wave.read(1);
				// not sure of next line calculation
				// might be: secondsElapsed = secondsElapsed + (1/bytesPerSecond)*2;
				// but since I'm using 16 bit, it won't matter
				secondsElapsed = secondsElapsed + (1/bytesPerSecond);
				if ( x != null ) {
					x = (x.charCodeAt(0) - 128) / 128;
				} else {
					wave.close();
					stopMe = true;
					break;
					// return;
				}				
			} else {
				x = wave.readInt();
				secondsElapsed = secondsElapsed + (1/bytesPerSecond)*4;
				if ( x != null ) {
					x = x / 32767;
				} else {
					wave.close();
					stopMe = true;
					break;
					// return;
				}
			}
			// calculate pos.x and pos.y and add to spline
			pos.x = size + count * size;
			pos.y = x/ysize;
			spl_list[i][1].line(pos);
			
			// write frame
			if (frame == 0) {
				frames.push([0]);
				//f.writeln("frame:0,pos.y:0");
				frame += 1;
			} else {
				if (isNaN(pos.y) == false) {
					// accum sumY and cntY only if pos.y > 0
					if (pos.y > 0) {
						sumY += pos.y;
						cntY += 1;
					}
				}
				// check if new frame
				var modX = secondsElapsed % secondsPerFrame;
				var divX = (secondsElapsed / secondsPerFrame)-modX;
				if (divX > frame) {
					frame += 1;
					// new frame... get avg of pos.y
					var avgY = sumY / cntY;
					if (isNaN(avgY)) {avgY = 0;}
					//f.writeln("frame:"+frame+",pos.y:"+avgY+"");
					frames.push([avgY]);
					// reset accum's
					sumY = 0;
					cntY = 0;
				}
			}
		}
		// only one channel for spline
	}
	
	// need to calculate last frame
	var fx = new File(path.replace(".wav","Rotation.txt"));
	fx.open(WRITE_MODE);
    if (fx.isOpen()==false) return;			
	
	// max of y avg's
	var maxY = 0;
	for (z = 0;z < frames.length; z++) {
		if (frames[z] > maxY) {maxY = frames[z];}
	}

	for (z = 0;z < frames.length; z++) {
		if (frames[z] == 0) {
			fx.writeln("0");
		} else {
			var perc = ((frames[z] / maxY) * 100)*0.2;
			fx.writeln(""+perc+"");
		}
	}
	
	//f.writeln("maxY:"+maxY+"");
	fx.close();
	wave.close();
	f.close();
}