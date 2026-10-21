# Custom tags?

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2274/
- Subforum: scripting-general
- Started by **Willem** on 2007-10-21; last post 2007-10-23; 5 posts

## #1 — Willem — 2007-10-21
<https://www.cheetah3d.com/forum/index.php?threads/2274/post-15921>

Custom tags?

As a sanity check, I'd thought I'd ask the group here - it's not possible to create your own custom tags in Cheetah is it?  Like, say I wanted the ability to create a simple tag via Javascript that consisted of a string that I could attach to objects and edit via Cheetah - possible?

## #2 — tg_jp — 2007-10-22
<https://www.cheetah3d.com/forum/index.php?threads/2274/post-15946>

Hi,

you know, we have Tag script type. but Cheetah3D doesn't offer string parameter type for object, so you cannot store strings in custom tag. but other types (int, float, enum) are available.

if you want to use string parameter with current version, you can use only built-in object's 'name' parameter.

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3DScreenSnapz001.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3346/)

## #3 — Willem — 2007-10-23
<https://www.cheetah3d.com/forum/index.php?threads/2274/post-15958>

Sorry, how did you get that "S" tag on your object?  I'm new to this side of Cheetah so talk to me like I'm a 5 year old.    This looks like it might be useful...

EDIT: OK, I got a SCRIPTTAG added to my object but is there any way to expose the name field for editing?  I really need to add strings to my objects rather than numbers and bool flags.

## #4 — tg_jp — 2007-10-23
<https://www.cheetah3d.com/forum/index.php?threads/2274/post-15961>

hi,

also, you can find Tag script sample in scripts/Tag folder. you can make directly custom tag and add to scene by menu Tool->Script->Tag Script.

[[QUOTE:  if you want to use string parameter with current version, you can use only built-in object's 'name' parameter. Click to expand... ]]

actually, you can not add a string parameter to object or tag with current version. you can use only 'name' BUILT-IN parameter of object or material for setting and getting string value.
I used 'name' field to get some informations for other renderers, please check my exporter script that you can find at this forum.

http://www.cheetah3d.de/forum/showthread.php?t=1240
http://www.cheetah3d.de/forum/showthread.php?t=1279

and this thread is also informative.

http://www.cheetah3d.de/forum/showthread.php?t=2183

regards.

tg_jp, Hiroto.

Links: http://www.cheetah3d.de/forum/showthread.php?t=1240, http://www.cheetah3d.de/forum/showthread.php?t=1279, http://www.cheetah3d.de/forum/showthread.php?t=2183

## #5 — Willem — 2007-10-23
<https://www.cheetah3d.com/forum/index.php?threads/2274/post-15962>

I settled on using a "Text" modifier as a child object instead of the tag option.  This way I can see the values easily in the object browser as well as edit them within the Cheetah UI.  I blogged the results if you're interested.

Thanks again, you've been an awesome help!

Links: http://wantonhubris.com/blog/2007/10/23/keyvalues/
