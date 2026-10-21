# broken script since 4.3

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2375/
- Subforum: scripting-general
- Started by **benblo** on 2007-11-19; last post 2007-11-20; 4 posts

## #1 — benblo — 2007-11-19
<https://www.cheetah3d.com/forum/index.php?threads/2375/post-16607>

broken script since 4.3

Hi, I'm not sure I'm in the right topic as this is not a question but a bug report.
I made a script for 4.2 that doesn't work anymore in 4.3, and actually crashes Cheetah brutally (I attached the OSX bug report).

I found out precisely what goes wrong, there are 2 things: 
create a tool script that contains only this:

	
	


```js
function buildUI(tool)
{
    print(tool.document().animationEnd());
}
```

Reload Cheetah, bring up the console, open the tool: Cheetah crashes... at least in both our machines here a MacPro and a new iMac, both with OSX 10.4.11).
create an even simpler tool script that contains only this:

	
	


```js
function buildUI(tool)
{
    print("bla bla bla");
}
```

Reload Cheetah, bring up the console, open the tool: it doesn't print anything. Open the tool again, now it does print.
None of these bugs happen with a macro script.

So I suppose there's something wrong with tool scripts initialization on the first run... 
If I open the tool once without calling .animationEnd() (so Cheetah doesn't crash), then modify and save the script, then open the tool again, this time it works... so it's really only the first run...

Attachments: [cheetah OSX bug report.txt](https://www.cheetah3d.com/forum/index.php?attachments/3491/)

## #2 — Martin — 2007-11-20
<https://www.cheetah3d.com/forum/index.php?threads/2375/post-16625>

Hi,
sorry for the problems. Both bugs will be fixed in the next version.

Bye,
Martin

## #3 — benblo — 2007-11-20
<https://www.cheetah3d.com/forum/index.php?threads/2375/post-16629>

Super cool, thanks :tongue: !

BTW is the forum the way to go for bug reports, or do you have a different procedure, like a direct mail or something?

## #4 — Martin — 2007-11-20
<https://www.cheetah3d.com/forum/index.php?threads/2375/post-16630>

Hi,
for bug reporting guidelines please see the "readme" file which comes with Cheetah3D.

Please send bug reports to  martin at cheetah3d dot de .

Bye,
Martin
