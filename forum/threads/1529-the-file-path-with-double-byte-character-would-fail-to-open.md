# The file path with double byte character would fail to open.

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1529/
- Subforum: scripting-general
- Started by **F.Junichi** on 2007-04-05; last post 2007-04-09; 3 posts

## #1 — F.Junichi — 2007-04-05
<https://www.cheetah3d.com/forum/index.php?threads/1529/post-9716>

The file path with double byte character would fail to open.

Hi,

I'm having trouble with opening file that has Japanese character in the file path. 

somthing like:
----------------------------------------------------------------------
myfile = new File("/Users/junichi/Desktop/???.mqo"); // fine at this moment.
myfile.open(READ_MODE); // fails at this point.
OS.messageBox("Check", myfile.isOpen()); // returns false.
----------------------------------------------------------------------

So, I rename my file to 'test.mqo' and do the same again:
----------------------------------------------------------------------
myfile = new File("/Users/junichi/Desktop/test.mqo"); // fine at this moment.
myfile.open(READ_MODE); // good at this point.
OS.messageBox("Check", myfile.isOpen()); // returns true.
----------------------------------------------------------------------

Well, at this point the ONLY problem with 2 bytes character is to 'open()' method.  In the other part, the Cheetah3d handles fine with double byte character like texture path.( tested in UI and reads texture correctly with 2 bytes path.):

So far, I do rename my file and folder name to ascii character to import from script, but it would be great if 'Open()' support the path with 2 bytes path. 

Thanks,
Junichi Fukuhara

## #2 — Martin — 2007-04-08
<https://www.cheetah3d.com/forum/index.php?threads/1529/post-9924>

Hi,
script files must be always saved in ASCII format. C/C++ etc. also don't allow 2-bytes characters in source code. I guess the Javascript engine does the same.

Bye,
Martin

## #3 — F.Junichi — 2007-04-09
<https://www.cheetah3d.com/forum/index.php?threads/1529/post-9964>

Hi,

Thanks for your repliy.
Ok, I understand that the script must be in ascii.
So since that, I make temporary file using copyTo() and then open my ascii renamed file and removing it when I done with reading.

myfile = new File(path);
tmpPath = myfile.directory()+"/tmp"+(new Date()).getTime();
var isOK = myfile.copyTo( tmpPath );
...
..
.

I hope copyTo() won't get too much time when the file size is big...

Thankyou,
Junichi Fukuhara
