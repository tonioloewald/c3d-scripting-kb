# Cheetah Header Export -> OpenGL ES 2 GLSL Shader

- Thread: https://www.cheetah3d.com/forum/index.php?threads/7494/
- Subforum: scripting-general
- Started by **bittondb** on 2011-07-18; last post 2011-07-18; 2 posts

## #1 — bittondb — 2011-07-18
<https://www.cheetah3d.com/forum/index.php?threads/7494/post-61689>

Cheetah Header Export -> OpenGL ES 2 GLSL Shader

I'm trying to migrate a 3d sphere from Cheetah 3D to an iPhone app. I'm using OpenGL ES 2 so I'm working with GLSL shaders. I have no issues understanding how to move the texcoords, normals, vertexes and indices into the shaders, but from there, I'm sure what to do. My translation and camera settings inside Cheetah don't seem to translate correctly to the proper Projection and Modelview matrixes.  Also, what do I do with the normals in order to get the proper lighting?  Any help is appreciated. Thanks!

## #2 — podperson — 2011-07-18
<https://www.cheetah3d.com/forum/index.php?threads/7494/post-61744>

I'm a bit puzzled by the question. A shader doesn't include geometry, so why would you move coordinates "into" a shader?

I think writing GL shaders is a tad outside the scope of this forum.

http://iphonedevelopment.blogspot.com/2009/05/opengl-es-from-ground-up-table-of.html

seems to cover the usual bases pretty well.

Links: http://iphonedevelopment.blogspot.com/2009/05/opengl-es-from-ground-up-table-of.html
