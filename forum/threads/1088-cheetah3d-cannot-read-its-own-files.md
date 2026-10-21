# Cheetah3D cannot read its own files

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1088/
- Subforum: scripting-general
- Started by **Herb** on 2006-11-25; last post 2006-11-26; 3 posts

## #1 — Herb — 2006-11-25
<https://www.cheetah3d.com/forum/index.php?threads/1088/post-6800>

Cheetah3D cannot read its own files

Wrote a script, produced three nice pictures in ten hours, saving the files and then finding, that Cheetah3D could not read the files it wrote.
Can anybody help?
Find attached the script that is the culprit for the disaster.

herbert

[[QUOTE:  // function buildUI(obj){ obj.setParameter("name","Arrow2D"); obj.addParameterFloat("length",1,0,1000,true,true); obj.addParameterFloat("L_of_head",.3,0,1000,true,true); obj.addParameterFloat("diam_o]]

## #2 — Martin — 2006-11-26
<https://www.cheetah3d.com/forum/index.php?threads/1088/post-6801>

Hi,
the problem comes from the fact that you've defined a parameter "rot" which Cheetah3D already uses internally. It therefore overwrote an existing parameter.

The problem is that not all parameters are scriptable. Some are invisible in the script engine and they can therefore not be found with the "Parameter Info.js" script.

I have to think about a solution how you can detect parameter names which are already used.

Problematic for the bug you encountered are only the parameter names "rot" and "pos". Please avoid these parameter names in scripts.

Bye,
Martin

P.S. Herb I've fixed your files and mailed them back so you should be able to open them again. Sorry for the problems.

## #3 — Herb — 2006-11-26
<https://www.cheetah3d.com/forum/index.php?threads/1088/post-6809>

Christmas present

Hi Martin,
thank you for the wonderful Christmas present you made me!!!!

Herbert
