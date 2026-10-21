# Custom Scripts not loading

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9025/
- Subforum: scripting-general
- Started by **Reshka** on 2012-11-22; last post 2012-11-28; 2 posts

## #1 — Reshka — 2012-11-22
<https://www.cheetah3d.com/forum/index.php?threads/9025/post-74832>

Custom Scripts not loading

Hi all,

I am an engineer that has been tasked with adding support to Cheeta3D with our game engine.  Currently I am running into a problem with my scripts not showing up in the Tools->Scripts menu.

Example:

In ~/Library/Application Support/Cheetah3D/scripts I created a folder called Hello.
In Hello I created a file named HelloWorld.js with the following code:

function main(doc) { 
    OS.messageBox("Hello", "This is my first script for Cheeta3D");
}

I startup Cheeta3D, goto the menu Tools->Scripts and I do not see a "Hello" option nor do I see my HelloWorld.js script anywhere.

However, if I move the HelloWorld.js script into on of the existing folders (Macros) I can see in the menu.

Does the latest Cheeta3D not support optional folders?  I searched the forms and I did not see any posts about new scripts not showing (just posts on no scripts showing up).

General info:
Environment: iMac running Mountain Lion
Purchased via Apple App Store

Any help would be greatly appreciated.

## #2 — Martin — 2012-11-28
<https://www.cheetah3d.com/forum/index.php?threads/9025/post-75002>

Hi,
sorry for the late reply. In Cheetah3D scripts can have different purposes. There are marco script which are just performed once when you call them from the menu command or your there are polygon or spline scripts which act like a parametric object and show up in the object browser.

To tell Cheetah3D which type of script you've written you have to sort it into the appropriate folder. So for example if you've written a Macro script you have to copy the script into the Macro folder. Within the Macro folder you can create subfolders. That's no problem.

Bye
Martin
