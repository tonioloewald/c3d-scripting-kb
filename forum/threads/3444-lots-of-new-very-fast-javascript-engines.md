# Lots of new very fast Javascript engines

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3444/
- Subforum: scripting-general
- Started by **Martin** on 2008-09-03; last post 2009-01-08; 18 posts

## #1 — Martin — 2008-09-03
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24491>

Lots of new very fast Javascript engines

Hi,
there are more and more new Javascript engines appearing. Some of them even with JIT compiler. :smile: 

Here is an interesting link showing how they compare performance-wise.

http://waynepan.com/2008/09/02/v8-tracemonkey-squirrelfish-ie8-benchmarks/

Comparing these numbers these JS engines should be multiple times faster than the Spidermonkey JS engine I currently use. Very tempting.:tongue: 

Bye,
Martin

Links: http://waynepan.com/2008/09/02/v8-tracemonkey-squirrelfish-ie8-benchmarks/

## #2 — JoergensenMBS — 2008-09-13
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24680>

Hi

Does anybody know where can I find a free javascript editor?

## #3 — jantzeno — 2008-09-13
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24682>

Smultron if you are using Leopard.

Komodo Edit also does syntax highlighting.

TextMate in my opinion is the king of editors if you have the cash.

Links: http://macromates.com/, http://smultron.sourceforge.net/, http://www.activestate.com/Products/komodo_ide/komodo_edit.mhtml

## #4 — jantzeno — 2008-09-14
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24685>

[[QUOTE:  Martin said: Comparing these numbers these JS engines should be multiple times faster than the Spidermonkey JS engine I currently use. Very tempting. Click to expand... ]]
 
Let me first say that my understanding of JS is very limited. I bought the books but haven't made the plunge.
 
According to the benchmarks WebKit (JavaScriptCore) comes out on top. It also happens to be an Apple project (for the fanboy in me).
 
If C3D uses Spidermonkey is there benefit to waiting for Tamarin to implement ECMAScript 4 in C3D? 
 
I have been looking but can't find anything on when WebKit plans to implement v4.
 
Bear in mind that due to my limited JavaScript and graphics programming knowledge I'm not sure if ECMAScript 4 features would be useful/needed in C3D.

## #5 — Martin — 2008-09-15
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24695>

Hi,
the Tamarin project was canceled. So that Javascript engine will never be a choice. Although ECMA Script 4 would have been very cool.

I don't know when the other JS engines plan to support v4. At the moment their focus seems to be on performance.

Bye,
Martin

## #6 — britt — 2008-09-17
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24739>

I've been keeping my eye on these... although for some things that I'd like to be able to do, I'd still need a native Cocoa plugin API; a very fast, powerful interpreted/JIT programming environment (V8 perhaps?) would be immensely useful; if possible it would be good if it could support Objective-J as well (I'm thinking more of the language and it's just-in-time compile-to-JavaScript functionality than of the whole Cappucino framework; as the implementation half of the framework is rather tightly intertwined with the browser DOM).

Hmm... a brainstorm -- (now, I haven't investigated this, so this might be totally infeasable, but...) I wonder how hard it would be to use a WebView for JavaScript UI? That might allow one to leverage the whole Cappucino framework...

:smile:

## #7 — Martin — 2008-09-20
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24825>

Hi,
at the moment Squirrel Fish Extreme looks most tempting. SFX also beats V8 performace wise and from what I've seen so fast SFX is easier to embed.

Here are some bechmarks of the latest  Javascript engines:

http://webkit.org/blog/214/introducing-squirrelfish-extreme/

http://www.satine.org/archives/2008/09/19/squirrelfish-extreme-fastest-javascript-engine-yet/

SFX now also supports JIT now and since SFX is developed on Macs I expect PPC JIT to appear soon with Squirrel Fish Extreme.

Concerning Cappucino I'm not sure if I understood that right. I checked out their webpage and and Objective-J seem to be a complete different language. Almost like Objective-C. Considering the hugh number of classes it supports I think it is quite heavyweight. Probably to much for what I use Javascript in Cheetah3D.

Bye,
Martin

Links: http://webkit.org/blog/214/introducing-squirrelfish-extreme/, http://www.satine.org/archives/2008/09/19/squirrelfish-extreme-fastest-javascript-engine-yet/

## #8 — Martin — 2008-09-20
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24826>

Hi,
according to my own Sun Spider tests. Squirrelfish Extreme is 12x faster than the SpiderMonkey 1.5 Javascript engine I currently use.!!! Very impressive.

Bye,
Martin

## #9 — britt — 2008-09-21
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24837>

Objective-J and Cappucino

Well; I've only played with it a little bit; but what I've gathered so far goes something like this (now, I'm sure that Martin knows a good chunk of this, but for everybody else here who's not a total Cocoa-head I'll go over some of the basics too):

Objective-J, like Objective-C, is a language built on another, "lower-level" language (in Objective-J's case, that language is JavaScript; in Objective-C's, it's of course, C). Also like Objective-C, it is a true superset of JavaScript - everything you can do in JavaScript, you can do in Objective-J.

Objective-J, also like the early versions of Objective-C, is "compiled" into the language that it's a superset of (in Objective-C, the "compiler" produced C code, which was then compiled into machine code by the system's native compiler; in Objective-J the "compiler" produces JavaScript, which is then run by whichever JavaScript engine that the app is using). These days, the GCC compiler understands Objective-C directly, and no intermediate translation to C is necessary; but Objective-J, being new, is not yet natively supported by any of the JavaScript engines.

One of the tricks that the folks at 280 North have come up with is using the dynamic nature of JavaScript to allow just-in-time translation from Obj-J to JavaScript. However, the Obj-J "compiler" can also be run standalone, and produce a JavaScript file that can then be just loaded and run like any other JavaScript file.

Cappuccino is an app framework built on top of Obj-J, much like Cocoa is an app framework built on top of Obj-C. One of the things it does is abstract the web browser's DOM such that someone building an app with Cappuccino need not know or care about HTML, CSS, DOM, or other web-type things; Cappuccino takes care of all that for you. However, the bottom half of Cappuccino expects to interface to a web browser's DOM; meaning that if you want to use it you need to have a DOM available for it to interface to -- something that at the moment, Cheetah3D does not have (uhh... it doesn't, right, Martin?)

Using Obj-J in Cheetah3D should be easy; it should just work. However, using Cappuccino would require either rewriting the bottom half of Cappuccino to use Cheetah3D's UI system, or reworking Cheetah3D's UI system to provide a DOM for Cappuccino to interface to. Of the two options for getting Cappuccino into Cheetah3D, I think the latter (provide a DOM) is probably the easiest in terms of total work (by using a WebView to provide the DOM), but the former (rewrite the affected parts of Cappuccino) is something that Martin need not do himself; if it is desired, it could be community project.

Something that I am looking into is building a JavaScript-to-Objective-C bridge that would provide automatic mapping from Objective-C objects to JavaScript objects; in V8 it looks rather straightforward to do, but I haven't looked into the API's of the other engines yet.

:smile:

## #10 — jantzeno — 2008-09-21
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24838>

[[QUOTE:  Martin said: Very impressive. Click to expand... ]]

Attached are my benchmarks.  I got a carried away in NeoOffice.

Attachments: [JS Benchmark.jpg](https://www.cheetah3d.com/forum/index.php?attachments/5624/)

## #11 — Martin — 2008-09-21
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24843>

Hi Britt,
thanks for the explanation. But now I'm even more skeptical. Why create something like Objective-J if ECMA Script 4 will do something very similar. Especially if you consider that ES4 will be standardized and I assume most JS engines will support it natively in the future. ES4 also fits much better into JS than Objective-J.

Supporting the DOM of a webbrowser is also not a small task. But the main problem here is that many web browser DOM classes and functions simply make no sense in the context of a 3D app. Therefore it will add a big overhead of functions which make no sense and probably never work.

I've looked into the V8 embedding guide and it looks a little bit more complicated the Squirrelfish or Spidermonkey. So SF is currently most tempting to me. Especially if you consider that JavascriptCore (SquirrelFish) is be a default framework in OS X, so there is no work from my side to update the Javascript engine in Cheetah3D. It will be automatically updated with every update of Safari. SFX is also faster than V8 (at least at the moment :smile: ).

If you are interested in how embedding SF works here is a nice example from Apple:http://developer.apple.com/samplecode/JSPong/index.html

There already exists a Obj-C -> Javascript binder in JavascriptCore but unluckily it also requires a active WebView. But I nevertheless prefer writing the binding manually. So I have full control on what I do.

Bye,
Martin

Links: http://developer.apple.com/samplecode/JSPong/index.html

## #12 — Martin — 2008-09-21
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24844>

[[QUOTE:  jantzeno said: Attached are my benchmarks. I got a carried away in NeoOffice. Click to expand... ]]

Hi,
that's very interesting. But I personally wouldn't take the V8 benchmark to serious since it only test a small spectrum of Javascript performance. Mainly tasks were the V8 engine shined. But it is nice to see that SFX closed the gap also in this very special benchmark.:smile: 

Bye,
Martin

## #13 — jantzeno — 2008-09-21
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24850>

I was reading about the V8 test compared to the SunSpider test (I've since lost the link). 
V8 runs once and disregards errors where as SunSpider runs each test five times and takes into account the errors generated.

## #14 — britt — 2008-09-21
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24857>

[[QUOTE:  Why create something like Objective-J Click to expand... ]]

I'm guessing that it started back a while, when there was no clue as to when ECMA Script 4 would actually get deployed; and they wanted something that they could work with immediately; as well as run on older browsers.
 
It's also got some usability advantages, in that it uses the Objective-C messaging style, which can be much more readable.

[aNode configureWithWidth:100 height:200 style:ROUND connectionDepth:50 pin:37];

is better than

aNode.configure(100, 200, ROUND, 50, 37);

A more real world example might be from QuickTime -- I just pulled this line of code from one of my apps, if you didn't already know what you were looking at reading it without looking up the function would be impossible:

err=AddMediaSample2(audio, (UInt8 *)data, length, 1, 0, (SampleDescriptionHandle)soundDescription, samples, 0, NULL);

[[QUOTE:  Supporting the DOM of a webbrowser is also not a small task. Click to expand... ]]

Well, definitely not if you are starting from scratch... I was thinking of just imbedding WebKit to do the job as being easier than re-writing Cappuccino. I wouldn't consider either, however, to be trivial.

[[QUOTE:  But the main problem here is that many web browser DOM classes and functions simply make no sense in the context of a 3D app. Click to expand... ]]

Not quite sure I follow here? The DOM would be restricted to the user interface of the JavaScripts... it wouldn't have any broader scope than that.

(note that I'm not neccessarally advocating for this; I can think of a lot of other things I'd rather see you spend your coding time on than that! :smile: )

[[QUOTE:  But I nevertheless prefer writing the binding manually. So I have full control on what I do. Click to expand... ]]

Yeah... I think that the approach that I'm going to take is to create some "keywords" that a preprocessor can sniff out of the source code, and use that in a class map structure to determine what gets mapped over how (I've already got most of the infrastructure for this in place; that's how my object persistence engine works). If I put the binding resolution code in an instance method, any object would have the opportunity to override how it's exposed to the scripting engine.

:smile:

## #15 — podperson — 2008-09-24
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24896>

I'd suggest that ECMAScript 4 is a moving target and the subject of serious corporate combat (thanks to Adobe trying to steer things so that ActionScript is actually the basis for it), meanwhile Objective-J is out and works.

That said, Objective-J makes no real sense for C3D (at least, as things currently stand).

If you look at the 280slides demo it's probably one of the most impressive web apps I've ever seen, more impressive that any of Apple's stuff done with sproutcore, and more impressive than anything I've seen done with native javascript libraries such as ExtJS. There are equally or more impressive Flash-based web apps out there, and obviously some very cool stuff done in Java, but Objective-J crushes all the JS libraries out there like a bug.

I'm curious as to why they used Objective-J instead of plain, ordinary JavaScript (it's not like JavaScript lacks any of Objective-C's core features). But if you look at the internals of the major JavaScript UI libraries they are full of annoying "jumping through hoops" to deal with the fact that JavaScript makes some simple things hard. My guess is that they wanted to be able to write code that was as close to Cocoa as possible and simply produced a flavor of JavaScript to handle it.

E.g. in Objective-C you write something like:
[object doThis:blah withThis:blahblah andThat:blahblahblah];

In JavaScript you write:
object.doThis({ withThis : blahblah, andThat: blahblahblah });

Note: (a) that it's not much different in the two cases, and (b) that "compiling" the first line into the second would be almost trivial.

But in Objective-C the runtime:
1) flags an error if you miss a parameter
2) allows you to pass (correct) unlabelled parameters as a shortcut

In JavaScript you end up having a huge swathe of error checking code to make sure you got withThis: and andThat: ... Conseqently when using ExtJS (which I have quite some experience with) you frequently end up with crashes deep in the internals of a library and no clue as to how you got there. Three hours later you discover you accidentally passed andthat: in a seemingly unrelated part of the program.

The nice thing about Objective-C (and, I assume, Objective-J) is that it gives you rigor when you want and need it, and flexibility when you want and need it. JavaScript just gives you flexibility.

## #16 — britt — 2008-09-24
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-24902>

For some of us, the Objective-C syntax is addictive.  ...and the "JavaScript" call method you gave looks ugly to our eyes. I guess it's a Coke-vs-Pepsi thing... (and I'm not a Pepsi fan... especially diet - blech! but, I digress...)

The nice thing about Objective-J is it should require no additional work or modifications to Cheetah3d, because it's built on JavaScript's built-in dynamicism; and you need not use it if you don't want to.

The other nice thing about it is that with a little bit of preprocessor coding kung-fu you can build classes that compile in either Objective-J or Objective-C with no modifications.

:smile:

## #17 — podperson — 2008-10-01
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-25066>

I agree that the JavaScript syntax is uglier than Objective-C...

In fact, I go further in looking for reasons one might go to the trouble of using a preprocessor (I'm talking about Objective-J => JavaScript, not #defines here), and demonstrating that you get both (a) cosmetic benefits at a fairly low cost (since translating between the two syntaxes should be cheap, and (b) more robustness (because you can trap errors early).

I think (b) is a much better reason for Objective-J than (a) -- errors tend to fall right through JavaScript libraries because of the total lack of reality checks.

## #18 — Martin — 2009-01-08
<https://www.cheetah3d.com/forum/index.php?threads/3444/post-26556>

Hi,
yesterday I took a little time-out from my work on 5.0 and played with the JavaScriptCore (or better with Squirrel Fish Extreme) Framework. 

After one day I have to say that embedding JSC is a dream. Very easy. Super clean API. Very fast engine. And last but not least it would save me some MBytes in Cheetah3D which the Spidermonkey Javascript engine currently takes. 

Another advantage is that the users always profit from latest JavaScriptCore updates automatically since JavaScriptCore is a System Framework. 

So the SquirrelFish made the race.:smile: :smile: I can't await to replace the old Javascript engine. That will be a lot of fun.:smile: 

Bye,
Martin

P.S. Here is an interesting link to a JavaScriptCore->Cocoa binding
http://inexdo.com/JSCocoa

Links: http://inexdo.com/JSCocoa
