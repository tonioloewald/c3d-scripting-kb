# ultra noob question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8521/
- Subforum: scripting-general
- Started by **filip c** on 2012-05-30; last post 2012-05-30; 7 posts

## #1 — filip c — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70850>

ultra noob question

Hi guys,

Forgive my ignorance, I'm a super noob on scripting...:redface::redface::redface:

I was experimenting with some ideas and was wondering if someone could help me get started on creating  a polygonobject from points values... (these will be generated in the script)

For example, my script generated these points (x,y,z) for constructing a cube:

0,0,0
1,0,0
1,0,1
0,0,1
0,1,0
1,1,0
1,1,1
0,1,0

How do I turn this into a script that generates the cube?

All help is very much appreciated!

Filip

## #2 — filip c — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70854>

If I take things one step further...
The faces defined by these points:

(0,0,0) (1,0,0) (1,0,1) (0,0,1)
(0,0,0) (1,0,0) (1,1,0) (0,1,0)
(1,0,0) (1,0,1) (1,1,1) (1,1,0)
(1,0,1) (1,1,1) (0,1,0) (0,0,1)
(0,0,1) (0,1,0) (0,1,0) (0,0,0)
(0,1,0) (1,1,0) (1,1,1) (0,1,0)

## #3 — Francois — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70855>

[[QUOTE:  filip c said: If I take things one step further... The faces defined by these points: (0,0,0) (1,0,0) (1,0,1) (0,0,1) (0,0,0) (1,0,0) (1,1,0) (0,1,0) (1,0,0) (1,0,1) (1,1,1) (1,1,0) (1,0,1) (1,1,1) (]]

Hi,

Have a look at this script from Hiroto. It's a little more complex than a simple cube but you can get the idea on what to do.

Links: http://www.tres-graficos.jp/blog/files/article.php?id=3

## #4 — filip c — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70856>

Thanks Francois!

I'll have a look :wink:

## #5 — filip c — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70857>

No succes thus far   (I did manage to crash cheetah :tongue

I don't want to seem lazy, but it still is a bit over my head. 

I'll be trying some more, but I would greatly appreciate it if anybody wants to help me get started and maybe create a simple example script for a basic polygonobject. Just a quad plane from 4 given points (for example: 0,0,0/1,0,0/1,0,1/0,0,1) will already do and save me tons of time (and frustration).

Many thanks in advance!
Filip

## #6 — ToddWR — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70861>

http://www.cheetah3d.com/forum/showthread.php?t=619&highlight=teapot

try looking here

Todd

Links: http://www.cheetah3d.com/forum/showthread.php?t=619&highlight=teapot

## #7 — filip c — 2012-05-30
<https://www.cheetah3d.com/forum/index.php?threads/8521/post-70863>

Thanks Todd!

This will get me going :smile:
