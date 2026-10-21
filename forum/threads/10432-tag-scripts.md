# Tag scripts

- Thread: https://www.cheetah3d.com/forum/index.php?threads/10432/
- Subforum: scripting-general
- Started by **Bitnotic** on 2014-05-18; last post 2014-05-28; 2 posts

## #1 — Bitnotic — 2014-05-18
<https://www.cheetah3d.com/forum/index.php?threads/10432/post-87651>

Tag scripts

Hi Cheetah scripters,

I've spent a while looking through the cheetah Tag script sample and a bunch of your scripts, but still can't quite get a clear idea about the tag scripts.

Can a tag actually change an object, or are tags only to add properties to objects?

Physics.js only adds properties..it also looks like MatTag.js also is only adding properties.

Are tags reliant on another script object to read the properties and modify the tag's owner?? 

Or is there a method that can be added to the tag? I've tried function apply(tag)
and function buildObject(tag) but neither seems to be called.

thx!
Scott

## #2 — Martin — 2014-05-28
<https://www.cheetah3d.com/forum/index.php?threads/10432/post-87787>

Hi Scott,
sorry for the late reply.:redface: The tag script can be only used to add some custom parameters to a object. That can be helpful if you develop a custom file format for a game engine for example.

But I plan to extend that functionality in the future, so that even constraints tags can be written via Javascript. Then it will be possible to manipulate parameters and geometry via a tag.

Bye
Martin
