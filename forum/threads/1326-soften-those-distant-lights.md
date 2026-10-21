# Soften those distant lights

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1326/
- Subforum: script-downloads
- Started by **capnchunky** on 2007-02-12; last post 2007-02-24; 11 posts

## #1 — capnchunky — 2007-02-12
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8337>

Soften those distant lights

Download (2kb) -- Put it in the Tool folder in the scripts folder.

I humbly submit my first (usable) little script, made because I was working on something where I wanted a softer shadow than what the distant light casts.  It simply clones and rotates the selected distant light a specified number of times, dimming them appropriately as it goes, and puts the new lights in a tidy folder named after the original light's name.

Not too special, but I hope someone finds it useful.  Any suggestions or modifications are welcome.  Perhaps it could be combined with Todd's sun script? 

Oh, and Martin, a couple things I learned from making this... I was surprised to find that a script-made DISTANTLIGHT object is not quite the same as a normal light set to distant -- is there any big difference, aside from fewer options?  Also, when typing a value in a text field and then clicking right on an action button, sometimes the field reverts to its old value; thought you should know.  And lastly, is it right that the addParameterBool documentation has min and max values?...

Attachments: [softshadow.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1694/)

Links: http://www.users.muohio.edu/howellme/cheetah3d/Distant_Softener.js.zip

## #2 — uncle808us — 2007-02-12
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8339>

Where to place script.

Where should I place this script ( polygon?) Thank you I sometimes would like a bit softer shadow.:icon_thumbup: 

[[QUOTE:  capnchunky said: I humbly submit my first (usable) little script, made Click to expand... ]]

## #3 — ToddWR — 2007-02-12
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8342>

looks like it goes into the tools folder.

also

capnchunky,
 the lights seem to be created at the origin, is this the effect you desired?  if not you would want to get the position of the selected light and then set the position of the folder to that. then all your lights will be groped together.

Todd

## #4 — Eureka! — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8345>

Hi,
Its great to have another script writer. It looks usefull. Would you post a link pointing me to the basics of script writing or tell me how you guys do it. Is it easy?

Thanks a lot,
Greg

## #5 — ToddWR — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8346>

Eureka!,
in between scripts I am putting together a sort of how to guide for cheetah script writters. all the things I have learned while doing this.

although I am doing this I am better at writting script than english, so it might take a few weeks to write it all down.

Todd

## #6 — Eureka! — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8349>

[[QUOTE:  ToddWR said: in between scripts I am putting together a sort of how to guide for cheetah script writters. all the things I have learned while doing this. Click to expand... ]]

Hi,
That sounds really good. Do you guys use javascript or dose C3D have it's own built in script software. Just so you know I have never written a script for any software and I'm totally new to it:redface:. Sorry if some of my questions are a duh to you pros:wink:.

Thanks for writing the tutorial,
Greg

## #7 — capnchunky — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8351>

[[QUOTE:  uncle808us said: Where should I place this script ( polygon?) Click to expand... ]]
Doh, I was so proud of myself I forgot to say. :tongue:  Todd's right, it goes in the "Tool" folder.

[[QUOTE:  Eureka! said: Hi, Its great to have another script writer. It looks usefull. Would you post a link pointing me to the basics of script writing or tell me how you guys do it. Is it easy? ... Do you gu]]

Thanks. Any other future scripts I might write will probably be similarly basic time savers, as I lack the creativity and amazing 3D math skills of Todd and tg_jp. 

C3D uses Javascript, although Martin has also mentioned integrating Angelscript in the future. In any case, I'm probably not the right person to ask; I wouldn't know how to suggest getting started with scripting.  I'm mainly familiar with Javascript through years of struggling with it for the web (and other similar object-oriented languages like Flash) at work, but even relatively simple tools like this take some trial and error for me.

[[QUOTE:  ToddWR said: the lights seem to be created at the origin, is this the effect you desired? if not you would want to get the position of the selected light and then set the position of the folder to th]]
I wasn't worrying too much about that since the position of a distant light doesn't matter in terms of rendering. But good point, I probably ought to, to be polite to the user.

Yikes, and I just now noticed that I managed to upload the wrong version earlier, which omitted locking the GUI during the (relatively) slow light creation process.  This new version is much faster, and creates the new lights' folder in the same position as the original one.

## #8 — tg_jp — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8354>

Hello,

wow, nice idea. :smile: 

tg_jp, Hiroto.

## #9 — Martin — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8390>

Hi,
great to see another scripter. The more the better. :smile: 

[[QUOTE:  capnchunky said: Oh, and Martin, a couple things I learned from making this... I was surprised to find that a script-made DISTANTLIGHT object is not quite the same as a normal light set to distant --]]

These are the old light sources. They are just there for backward compatibility. Please use the new light object for your scripts.

[[QUOTE:  capnchunky said: Also, when typing a value in a text field and then clicking right on an action button, sometimes the field reverts to its old value; thought you should know. Click to expand... ]]

That happens if you haven't pressed return before you clicked on the Button. Without the RETURN the new value won't be saved.

But a click on a button forced a redraw. So the old value will be redrawn.

[[QUOTE:  capnchunky said: And lastly, is it right that the addParameterBool documentation has min and max values?... Click to expand... ]]

OK. That doesn't make to much sense. I probably was to long out of sleep when I wrote this. But I will keep it due to compatibility reasons for the first. A solution for the problem is already under planing. 

Bye,
Martin

## #10 — Martin — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8391>

Hi,
one more thing. Please always update your script download in the first thread. So people who want to try your script won't have to search the hole thread to find the download.

Bye,
Martin

## #11 — capnchunky — 2007-02-24
<https://www.cheetah3d.com/forum/index.php?threads/1326/post-8664>

[[QUOTE:  Martin said: These are the old light sources. They are just there for backward compatibility. Please use the new light object for your scripts. Click to expand... ]]

Okay, good to know; I just saw DISTANTLIGHT in the helpfile and used that.   I'm now using the LIGHT constant (which doesn't seem to be listed?).

[[QUOTE:  Martin said: Please always update your script download in the first thread. So people who want to try your script won't have to search the hole thread to find the download. Click to expand... ]]

Whoops, very good point; I didn't expect the thread to get this long.  I've moved the updated download back to the top.
