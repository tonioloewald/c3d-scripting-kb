# Request for Feature: require

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9039/
- Subforum: scripting-general
- Started by **Reshka** on 2012-11-23; last post 2016-12-22; 14 posts

## #1 — Reshka — 2012-11-23
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-74885>

Request for Feature: require

Hi all,

Sorry if I am blowing up the threads with too much stuff and if I become annoying I will stop 

I would love to request a feature for scripting.  Specifically I would LOVE it if we could have a require system like NodeJS.  The advantage to a system like this is I don't have to package EVERYTHING into on huge script file.  For those not familiar with Node you can break up scripts into multiple files.  Then use the syntax:

var obj = require('PATH/TO/Script");

and then call functions defined by the object.  You can check out NodeJS here:

http://nodejs.org

Very good system, easy to implement,  and it would make my scripts 100x more manageable!  My current script for exporting Cheeta3D data into our engine is over 1000+ lines

Links: http://nodejs.org/

## #2 — Martin — 2012-11-28
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75003>

Wow, that looks very powerful but not very applicable to the JavascriptCore framework. Looks like it only works for the v8 Javascript engine.

Bye
Martin

## #3 — Contexter — 2012-12-12
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75324>

Plugin base class

http://cranksoftware.com/blog/?p=1298

[[QUOTE:  WebKit does not support the CommonJS require function, so this will have to be added to the JavaScript interpreter. An easy way of doing this is to add it to the set of static functions associated wi]]

But sure Martin, you'd have to maintain this . But having a base for developing .js plugins would be a great feature addition !

Links: http://cranksoftware.com/blog/?p=1298

## #4 — Martin — 2012-12-18
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75501>

Hi,
this approach looks very interesting but at the moment it looks like Apple closes the doors for all types of native plug-ins. The sandbox requirements of the Mac App Store don't allow to load external unsigned code. But plug-ins are actually external unsigned code. 

Bye
Martin

## #5 — Contexter — 2012-12-18
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75504>

Use Lua in favour of JavaScript ?

Given the success of Lua scripting environments on IOS  there shouldn't be any hindrance on the Mac App Store - 

http://playcontrol.net/opensource/LuaCocoa/other-luaobjective-c-bridge.html

or 

https://github.com/lubyk/dub

JavaScript seems like the wrong choice  - don't you think ?:frown:

Links: http://playcontrol.net/opensource/LuaCocoa/other-luaobjective-c-bridge.html, https://github.com/lubyk/dub

## #6 — Martin — 2012-12-18
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75505>

[[QUOTE:  Contexter said: Given the success of Lua scripting environments on IOS there shouldn't be any hindrance on the Mac App Store - http://playcontrol.net/opensource/LuaCocoa/other-luaobjective-c-bridge.h]]

These bridge tools just seem to help embedding a script engine. That has nothing todo with loading unsigned code from an external library. That's also forbidden on IOS.

[[QUOTE:  Contexter said: https://github.com/lubyk/dub JavaScript seems like the wrong choice - don't you think ?:frown: Click to expand... ]]

Javascript seems to be the perfect choice since Javascript is an extremely popular scripting language. Probably the most often used scripting language at all. Almost no webpage would work without Javascript these days.

LUA on the other side has a pretty strange syntax and is only popular in the game development industry. 

So I'm very happy with Javascript.:smile: 

Bye
Martin

## #7 — Contexter — 2012-12-18
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75506>

Thanx for the clarification. 

What's your recommendation for Game Developers as far as 3D Authoring Tools are concerned ?

Best wishes !

## #8 — Martin — 2012-12-19
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-75539>

[[QUOTE:  Contexter said: What's your recommendation for Game Developers as far as 3D Authoring Tools are concerned ? Click to expand... ]]

I'm not sure what you mean with 3D Authoring tool but if you mean a game engine I could recommend you Unity since Cheetah3D is very well integrated with it.

Bye
Martin

## #9 — feloneouscat — 2014-07-03
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-88599>

[[QUOTE:  Reshka said: Hi all, I would love to request a feature for scripting. Specifically I would LOVE it if we could have a require system like NodeJS. The advantage to a system like this is I don't have t]]

This will make Javascript programmers squirm, but this can be done quite easily without modifying anything (I currently use it).

1. Create a directory in ~/Library/Application Support/Cheetah3D/Scripts/ named Library. This is where you will keep all your libraries.

2. Put this in a file name MyTest.js in ~/Library/Application Support/Cheetah3D/Scripts/Tool

	
	


```js
var geval = eval;

function buildUI(doc)
{
    loadLibrary(doc, "testLibrary.js");

    doc.addParameterSeparator("The title of our Tool");

    doc.addParameterButton("Press the button!", "The Button", "buttonpressed");
}

function buttonpressed(doc)
{
    testLibrary.doit(doc, "This is just a test");
}


function loadLibrary(doc, libraryName)
{
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
    file.open(READ_MODE);
    funcstring = file.read(100000);
    file.close();
    geval(funcstring);
}
```


This should work with any user name.

Okay, for you Javascript programmers note that I set geval to eval. That's because it doesn't work if you explicitly use eval   However, if you set a variable to eval and use it, everything works.

3. Put the following in a file named testLibrary.js in the Library folder you created in step 1.

	
	


```js
var testLibrary = new function()
{
	this.doit = function (tool, name)
	{
		print("it worked");
		OS.messageBox("And the answer is:", name);
		return 0;
	}

	this.anotherfunction = function (tool, name)
	{
		var object = 0;

		return 0;
	}
}
```


4. Restart Cheetah3D

5. Go to Tools/Script/Tools Script and select MyTest. You should get a window pop up.

This can be used to create multiple libraries in a fashion that is SIMILAR to Node (technically it isn't the same, but I'll let Javascript guru's explain that).

No, it is not beautiful and you can find a LOT of reasons why "eval" is considered "bad".

An interesting note: since technically the javascript files exist as text (which you are attempting to execute at run time), you can modify them AT WILL without having to restart Cheetah3D.

One final note: I'm not sure if libraries can load libraries or if it all just blows up.

Cheers!

EDIT: Hiroto suggested a solution to the issue of making sure that that user's name was in the code. At the time I didn't know of a solution but, fortunately, he did. I appreciate his pointing me in a better direction. Rather than split and join I decided to go with regular expressions. This reduced three lines to one at the cost of extra processing power

## #10 — Martin — 2014-07-22
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-88891>

Hi feloneouscat,
thanks for sharing that solution. I didn't know that it is possible to create global functions with a eval() function call. That is a really elegant solution.:smile: 

I already tried that trick in my Grapher.js  script. And it works very well.:smile: 

Bye
Martin

Links: http://www.cheetah3d.com/forum/showthread.php?t=10572

## #11 — feloneouscat — 2014-07-23
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-88900>

Hi Martin,

I'm glad you like it. It took me several days to work it out (I am not a Javascript guru).

Hopefully this will help others create libraries that can be shared. That would be awesome.

Cheers!

## #12 — aaronparr — 2015-03-07
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-93838>

This is a shame. I'd prefer to have the require/import option. Will look into the eval workaround.

## #13 — aaronparr — 2015-03-15
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-94069>

I find this implementation to be a bit cleaner:

	
	


```js
// load and execute external code
function loadLibrary(prepath,libraryName)
{
  var file = new File(prepath+"Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
  file.open(READ_MODE);
  var funcstring = file.read(file.size());
  file.close();
  eval(funcstring);
}

function loadIncludes(caller)
{
  var prepath = caller.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
  loadLibrary(prepath,"<insert the name of your js file here");
}

main(caller)
{
  loadIncludes(caller);
}
```


use caller as the argument instead of doc or tool in your main or buildui function. and you can insert the top 2 functions in any script.

also i did not need the geval workaround. i just call eval directly and it works.

Don't forget the good advice mentioned above: create a folder called "Library" in your Cheetah3D Scripts folder (thats the one in Application Support in ~/Library)

## #14 — feloneouscat — 2016-12-22
<https://www.cheetah3d.com/forum/index.php?threads/9039/post-104616>

[[QUOTE:  aaronparr said: also i did not need the geval workaround. i just call eval directly and it works. Click to expand... ]]

I have tested this and on Cheetah 7.0.18 and it does not work. You need the geval workaround.

When I originally designed the library system I used “eval” and never got it to work.
