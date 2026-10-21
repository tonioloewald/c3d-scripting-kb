# Seeking Method to Determine Whether or not File is Binary

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11080/
- Subforum: scripting-general
- Started by **aaronparr** on 2015-03-10; last post 2015-03-10; 1 posts

## #1 — aaronparr — 2015-03-10
<https://www.cheetah3d.com/forum/index.php?threads/11080/post-93898>

Seeking Method to Determine Whether or not File is Binary

I am working on file import and export via script, and could potentially be dealing with UTF-8 as well as Binary for a particular file type (.mdl for neverwinter nights).

Does anyone have any methods for determining whether a file is binary prior to opening it? I was looking at OS.system(command) but the function does not appear to return a standard out from the command, so I am unsure as to how to make use of that.

What about after the file is opened? I suspect that one could look at the results of a read and make a determination, but don't have the code for this on the tip of my fingers.

Any help is appreciated. Thanks.
