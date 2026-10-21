# getting material used by object

- Thread: https://www.cheetah3d.com/forum/index.php?threads/526/
- Subforum: scripting-general
- Started by **xpis** on 2006-03-11; last post 2006-03-16; 6 posts

## #1 — xpis — 2006-03-11
<https://www.cheetah3d.com/forum/index.php?threads/526/post-3419>

getting material used by object

hello, 

I'm a new guy. 

I am writing a file exporter using Cheetah3D's java script. 

I need to know what material a n-gon object  is using, how can I get the Material data from n-gon objects in script ?

thanks in advance,
cg

## #2 — Martin — 2006-03-11
<https://www.cheetah3d.com/forum/index.php?threads/526/post-3421>

Hi,
sorry that functionality is still missing. But I will add the material access functions to Cheetah3D 3.1. Cheetah3D 3.1 will be probably out next week. So you don't have to wait to long.

To which file format do you want to export?

By,
Martin

## #3 — xpis — 2006-03-11
<https://www.cheetah3d.com/forum/index.php?threads/526/post-3427>

ah!

excellent news! thanks!

I'm trying to make my own file format for a 3D engine that I wrote. Doing it in Java script will be a bit slow to export, but on the positive side your java API is really nice to work with! 

cg

## #4 — Martin — 2006-03-12
<https://www.cheetah3d.com/forum/index.php?threads/526/post-3431>

Hi,
you are right. A script is always slower than a plug-In written in C. But for a exporter the speed should be fine. Writing a script is generally also much easier than writing a full C Plug-In.

I've written a small example ASCII exporter script which shows how to retrieve and export materials.
The script exports  the material color, material texture, vertices, uv coords and the polygons. 
I will bundle that script with v3.1 so you will have a good starting point.

The export of a 40.000 polygon mesh took 7 seconds. If you consider that a 40k mesh is quite big for a game object the performance should be OK.

Please let me know when you are done with your game. 

By,
Martin

## #5 — Martin — 2006-03-13
<https://www.cheetah3d.com/forum/index.php?threads/526/post-3442>

Hi,
I've uploaded a beta version of Cheetah3D 3.1 in the "General" Forum. This beta contains the mentioned enhancements of the Javascript API plus some example exporter script.

By,
Martin

## #6 — xpis — 2006-03-16
<https://www.cheetah3d.com/forum/index.php?threads/526/post-3471>

Thanks Matrin!

I'll get to work on it this weekend when I don't have to worry about my day job 

cg
