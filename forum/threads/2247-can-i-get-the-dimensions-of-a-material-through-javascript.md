# Can I get the dimensions of a material through javascript?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2247/
- Subforum: scripting-general
- Started by **Willem** on 2007-10-16; last post 2007-10-17; 9 posts

## #1 — Willem — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15737>

Can I get the dimensions of a material through javascript?

I have stuff like this in my script:

var material = doc.materialAtIndex(mat_tag.linkedToMaterial());

And that gives me a Material object but I don't see a way to ask that object what the size of the material is (i.e. 64x64).  Is this information available via scripts?

## #2 — tg_jp — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15745>

hi,

what kind of size you want to get from material object? icon size or texture size?

regards.

tg_jp, Hiroto.

## #3 — Willem — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15751>

The dimensions of the "Color > Texture" texture.  I know I can retrieve the filename and possibly load it myself but it would be really nice if Cheetah could provide this information to me.

## #4 — tg_jp — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15763>

hi,

I think, Cheetah3d doesn't offer such a API for that purpose. but with system command 'sips' via OS.system() function, you can get some informations or modify a image (resize, rotate, flip, etc..). 'sips' is installed with OS X 10.4 by default.

sample code is here.

	
	


```js
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
```


please check help for 'sips' command. 

regards.

tg_jp, Hiroto.

## #5 — Willem — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15764>

Bad ass, thanks a lot!  I'll give that a shot tonight.

BTW, as a side question ... where does the output of a "print" statement go if a script runs inside of Cheetah?  Is there a log window somewhere?

## #6 — tg_jp — 2007-10-16
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15765>

hi,

[[QUOTE:  Willem said: BTW, as a side question ... where does the output of a "print" statement go if a script runs inside of Cheetah? Is there a log window somewhere? Click to expand... ]]

'Console' view shows it, you can see it by CTRL + clicking onto topbar of anyview and selecting it. I usually use "Custom Layout" for it.

regards.

tg_jp, Hiroto

## #7 — Willem — 2007-10-17
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15783>

I'm having a weird experience.  This code:

	
	


```
OS.system("/usr/bin/sips -g all "+colorTex+" > ~/documents/sipstmpfile");

//open and read the temporary file.
 var tmpfile = new File("~/documents/sipstmpfile");
 tmpfile.open(READ_MODE);
```

Doesn't work on my machine.  It creates the file with all of the awesome sips information in it but trying to open the file fails.  I can't figure it out.  I've changed it to use different paths but it's never able to successfully open the file.

Thoughts?

## #8 — tg_jp — 2007-10-17
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15787>

hi,

I think, an absolute path string is required for opening it in File object. 
so, the variable '~' is not working in script, only in shell (OS.system()).

regards.

tg_jp, Hiroto

## #9 — Willem — 2007-10-17
<https://www.cheetah3d.com/forum/index.php?threads/2247/post-15788>

Wow, that's bizarre!  It wasn't working so I started fooling around with the path.  Now that you said it needs to be an absolute path, I put it back to "/tmp/siptmp" and NOW it works.  It wasn't working last night, I swear!  Heh.

Well, thanks again!  This'll work...
