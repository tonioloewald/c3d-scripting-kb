# Javascript Engine for Cheetah3D

- Thread: https://www.cheetah3d.com/forum/index.php?threads/9026/
- Subforum: scripting-general
- Started by **Reshka** on 2012-11-22; last post 2012-11-25; 9 posts

## #1 — Reshka — 2012-11-22
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74833>

Javascript Engine for Cheetah3D

Hi all,

What Javascript engine does Cheetah3D use?  V8, SpiderMonkey, JavaScriptCore, etc?  I would like to know because I have spent a LOT of time working on embedding Javascript into C/C++ applications and different optimizations can be made to speed up script execution by more than 350X if you know how the VM is interpreting the code.

Thanks!

## #2 — Reshka — 2012-11-22
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74834>

If V8...

If Cheeta3D is running with V8, would it be possible to get a build with Javascript debugging enabled?  V8 has a great remote debugger protocol and if you can kick out a build with that enabled we can hook it up to our custom debugger (or if you like the pain of eclipse, you can use googles plugin for chrome) and debug the scripts.

Thanks again!

## #3 — Martin — 2012-11-22
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74838>

Hi,
Cheetah3D is using the JavaScriptCore from OS X. So Cheetah3D always profits from the optimizations Apple does on the JavaScript engine. 

In earlier days (before  JavaScriptCore) Cheetah3D used SpiderMonkey.

Do you know is JavaScriptCore offers some sort of debugging facilities?

Bye
Martin

## #4 — Reshka — 2012-11-22
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74839>

Debugging JavaScriptCore

Not really.  If you are using JavaScriptCore via the WebKit API then you can debug it with Safari, but if you are directly linking it then there isn't much support there.

Correct me if I am wrong but I don't think JavaScriptCore has JIT support out of the box.  Apple keeps it's JIT engine (Nitro) closed source and only for Safari.  If you switched to V8 you would get a very large speedup in performance and a remote debugger (but believe me I know how much work that can be .

For our engine we use V8 for Mac, Windows, and Android.  But we have to use Spidermonkey for iOS.  I wrote a wrapper lib that makes is very simple to switch between JSVM at compile time and opened the source up:

https://bitbucket.org/cjimison/jscom

It is nice because you don't have to refactor your code each time you want to switch JSVMs.

Thanks for the info!

Links: https://bitbucket.org/cjimison/jscom

## #5 — Martin — 2012-11-22
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74842>

Hi,
I don't know for sure if the JavaScriptCore actually uses JIT since it's some sort of black box. I always hoped that it uses JIT.:wink: 

I'm not sure if JIT would help too much at all since scripts spend most of their time calling bound in functions. And JIT doesn't accelerate external functions at all. 

When I switched Javascript engines I also had a look in V8. But at the end I decided for JavascriptCore since it had one huge advantage over V8. I don't have to update it. JavaScriptCore always gets updated by Apple while the V8 engine would have been updated by me. And I knew from SpiderMonkey how much problems that always causes.

So I will stay with JavaScriptCore for the first. Also since refactoring the wrapper functions is no fun (over 7000 lines of code).:wink: 

Bye
Martin

## #6 — Reshka — 2012-11-23
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74883>

Not as big of a problem today

>>But at the end I decided for JavascriptCore since it had one huge advantage over V8. I don't have to update it. JavaScriptCore always gets updated by Apple while the V8 engine would have been updated by me.

This isn't as much of a problem today as it was a couple of years ago.  If you are concerned with having to build the libs yourself, both brew and macPorts has a copy of SpiderMonkey and V8 so it should be just as simple as doing a brew update.  However JavaScriptCore is one of the slowest of all the JSVMs because it does not have JIT (I verified this).

It is all a matter of taste, however I hate it when people who have not seen one line of my code tell me how I should do things.  So this will be the last you hear of me on this subject

## #7 — Dranix — 2012-11-24
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74902>

Javascript Core of course uses a JIT. Nitro is like the rest of webkit opensource - I think you confused the non-jit in iOS with the normal behaviour in OSX.

## #8 — Reshka — 2012-11-25
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74915>

Oh so right

Dranix:

Opps.  You are very correct.  I was looking at our source version (for iOS) which we removed the JIT compilation code because it violates the TOS for the apple store.  Sorry about the confusion...

## #9 — Martin — 2012-11-25
<https://www.cheetah3d.com/forum/index.php?threads/9026/post-74933>

Huch, I'm happy to hear that webkit uses JIT.:smile:  I'm actually quite happy with JavascriptCore at the moment. Maybe Apple adds a nice debugger one day. 

Bye
Martin
