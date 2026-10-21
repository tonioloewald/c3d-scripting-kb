# file.read*() always returns big endian value

- Thread: https://www.cheetah3d.com/forum/index.php?threads/5584/
- Subforum: scripting-general
- Started by **memfrag** on 2010-03-28; last post 2010-03-28; 2 posts

## #1 — memfrag — 2010-03-28
<https://www.cheetah3d.com/forum/index.php?threads/5584/post-40901>

file.read*() always returns big endian value

I am new to Cheetah3D so I don't know if this is a known issue, but I haven't found anything in the forum indicating that anyone else has had this problem.

Anyway, I am trying to write a script that imports vertices/triangles from a binary file. Since I am using an intel mac, I use file.open(READ_MODE, LITTLE_ENDIAN) to read data. Unfortunately, the values returned by, for example, file.readFloat() are in BIG endian byte order, even though the values in the file are little endian (I double checked this in a hex editor).

So, the next thing I tried was to specify BIG_ENDIAN in the file.open() call, to see if the endian constants were somehow reversed, but that resulted in the exact same values (as with LITTLE_ENDIAN) being returned by file.readFloat().

My conclusion is that the endian parameter in the open() call has no effect on my system, everything is always converted to big endian.

Am I doing something wrong? Did someone else observe this behavior? Could it have something to do with the 64 bit version of Cheetah3D perhaps?

I am using Cheetah3D 5.3 64 bit, in Snow Leopard on an intel mac. I would like to add that Cheetah3D is insanely awesome, except for my endian problem.

## #2 — Martin — 2010-03-28
<https://www.cheetah3d.com/forum/index.php?threads/5584/post-40909>

Hi,
that is a bug which will be fixed in v5.4. Hiroto reported is some days ago and I've already fixed it.

Kind regards,
Martin
