# Exporting binary data ?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4097/
- Subforum: scripting-general
- Started by **marks** on 2009-04-15; last post 2009-04-16; 7 posts

## #1 — marks — 2009-04-15
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28470>

Exporting binary data ?

I have made a script where i export the model as a propertylist,
and i use arrays for the data. ex.
 	    file.writeln("<key>Vertex</key>");
 	    file.writeln("<array>");

    file.writeln("<real>"+ world_vert.x.toPrecision(6) + "</real>");
    file.writeln("<real>"+ world_vert.y.toPrecision(6) + "</real>");
    file.writeln("<real>"+ world_vert.z.toPrecision(6) + "</real>");

but i would like to just export the raw bytes instead,

var numVert = core.triangleCount() * 3;
float v[numVert];

for......
v = world_vert.x.toPrecision(6);
v[i+1] = world_vert.y.toPrecision(6);
v[i+2] = world_vert.z.toPrecision(6);

     file.write(v,(numVert*4));

But this don't work

Is there any examples for doing this type of thing ?

and where can i find info about what classes i can use ?

 Thanks

## #2 — tg_jp — 2009-04-15
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28471>

hi

'writeFloat()' func will be work to it.

	
	


```
var numVert = n;
var v = [ x1,y1,z1, x2,y2,z2, ... , xn, yn, zn];

for (var i = 0;i < numVert;i++) {
  file.writeFloat(v[i*3]);
  file.writeFloat(v[i*3+1]);
  file.writeFloat(v[i*3+2]);
}
```


please check File class section in Help file of Cheetah3D.

binary read/write is much mooooore faster than ascii read/write. so I used binary mode to read/write vertices caches in OBJ Importer.js, or Sequential OBJ.js, also please check its.

regards.

tg_jp, Hiroto.

## #3 — marks — 2009-04-15
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28473>

Thanks,
I just changed the lines to 
   file.writeFloat(parseFloat(world_vert.x.toPrecision(6)));
    file.writeFloat(parseFloat(world_vert.y.toPrecision(6)));
    file.writeFloat(parseFloat(world_vert.z.toPrecision(6)));

and it seems to do the right thing,
i still need to check if i can read the data.

## #4 — tg_jp — 2009-04-15
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28474>

hi,

to read binary as float, simply use 'readFloat()' function. if you have need to care endian, you can use endian option: 'file.open( READ_MODE/WRITE_MODE, BIG_ENDIAN/LITTLE_ENDIAN )' when read/write file.

[[QUOTE:  marks said: file.writeFloat(parseFloat(world_vert.x.toPrecision(6))); file.writeFloat(parseFloat(world_vert.y.toPrecision(6))); file.writeFloat(parseFloat(world_vert.z.toPrecision(6))); Click to expa]]

why do you use 'toPresicion()' ? there seems to be some overhead in it.

	
	


```
 file.writeFloat( world_vert.x );
```


regards.

tg_jp, Hiroto.

## #5 — marks — 2009-04-15
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28476>

Yes i removed the toPrecision,

file.writeFloat(parseFloat(world_vert.x));

but my next problem is that is it a propertylist i am trying to write,
and the data needs to be in base64.

## #6 — tg_jp — 2009-04-16
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28491>

hi,

how about this.

1. write out binary data to temporary file with 'writeFloat()' func.
2. convert binary data to base64 string via php command line with 'OS.system()' func.
3. read base64 string data from tmp file.
4. write base64 string to xml property list file.

	
	


```
var bin_path = '/tmp/ch_bin.tmp';
var bin64_path = '/tmp/ch_bin64.tmp';

var bin_file = new File(bin_path);
bin_file.open(WRITE_MODE);

for (...) {
	/* write out binary data */
	// bin_file.writeFloat( vec.x );
	// bin_file.writeFloat( vec.y );
	// bin_file.writeFloat( vec.z );
}

bin_file.close();

// convert to base64 string using php command line ( or Python, Ruby what you want )
OS.system("php -r '$fp = \""+bin_path+"\";$fh = fopen($fp, \"r\");echo chunk_split(base64_encode(fread( $fh, filesize( $fp ) )));' > "+bin64_path);

var bin64_file = new File(bin64_path);
bin64_file.open(READ_MODE);

var base64_str = '';
var line = bin64_file.readln();
while (line != -1) {
	base64_str += line;
	line = bin64_file.readln();
}

// clean up tmp file
OS.system('rm '+bin_path  );
OS.system('rm '+bin64_path);

// now you getting base64 str ( chunked by 76 length )
print(base64_str); // for debug.
```


regards.

tg_jp, Hiroto.

## #7 — marks — 2009-04-16
<https://www.cheetah3d.com/forum/index.php?threads/4097/post-28498>

Thanks

I only had to change the endianness of the bin_file and the it works.

bin_file.open(WRITE_MODE,LITTLE_ENDIAN);
