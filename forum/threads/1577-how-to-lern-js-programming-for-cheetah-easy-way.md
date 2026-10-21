# How to lern JS/Programming for Cheetah - easy way :)

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1577/
- Subforum: scripting-general
- Started by **wal3d** on 2007-04-12; last post 2007-04-20; 8 posts

## #1 — wal3d — 2007-04-12
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10112>

How to lern JS/Programming for Cheetah - easy way 

Hi,
 
I'm very interessted in programming scripts for Cheetah. But the problem I have is, I know JS only from websites programming. And I haven't found a book/trainings dvd that explain more than this.
 
So I have some questions regarding learing programming JS for Cheetah:
 
a) Will JS working also in future for Cheetah, or is it planned to change to another language in the nar future?
b) Could someone give me tip for a good book to learn more than websites programming with js - (but for beginners! :wink:  )
c) How is a good way to get more understanding how Cheetah's programming interface is working? 
 
Thanks a lot for your help and tips!
 
Best regards
Wolfgang

## #2 — podperson — 2007-04-12
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10155>

I'm no expert on scripting Cheetah3d but I do know a thing or two about JavaScript.

1) Try Danny Goodman's "The JavaScript Bible". It's huge and printed on crappy paper, but he's very good at explaining stuff.

2) I sure hope Cheetah sticks with JavaScript (I'd rather it figured out a way to run JavaScript faster -- e.g. Unity compiles it -- than went with exotica like AngelScript).

JavaScript (and ECMAScript) is becoming one of the world's most versatile languages. You can script almost anything in JavaScript. It has a bad name mainly because it deals with browsers (almost everything folks blame on JavaScript is actually inconsistencies between web browsers; JavaScript itself is a very clean, elegant language -- it has many of the virtues of Python, few of the failings, and a far, far bigger user base).

Edit:

There's really no easy way to learn to program except by doing it. Once you can program, learning new languages is relatively easy -- although jumping between language "families" is harder (e.g. LISP is totally foreign to C programmers). JavaScript is a "C-ish" language with most (all) of C's nastiness removed (e.g. pointers and memory management).

Just by learning JavaScript you will be able to program or script: web browsers, Adobe applications (including Flash ActionScript, which is essentially JavaScript), Unity3D, and Cheetah3D, and lots and lots of other programs. JavaScript is "C-ish", so once you're familiar with it, learning other similar languages (such as PHP, Perl, Java, C++, and C) will be significantly easier.

## #3 — wal3d — 2007-04-12
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10159>

Hi podperson,

thanks a lot for your tips.

I will check this out with the "Javascript bible" also with angelscript (there is a thread from Martin I saw).

Long, long, long ago I programmed my diploma in c++ but this is really long ago - so let's see! :smile: 

best regards
Wolfgang

## #4 — tg_jp — 2007-04-13
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10174>

Hello,

[[QUOTE:  c) How is a good way to get more understanding how Cheetah's programming interface is working? Click to expand... ]]

I don't have so good answer, but, I think. Some of other scripts are very good sample for it (default scripts and user scripts you can find at this forum). and other app's scripts (Blender, formZ, etc.., many modern 3D apps is scriptable! ) are also good sample. actually these are not JavaScirpt, but for some samples you can convert to JavaScript of Cheetah3D easily.

hope it will help.

	
	


```js
// simple Hello World.js for Cheetah3D : macro script.
function main(doc) {
    var string = 'Hello World of Cheetah3D!!'; 
    var textSpline = doc.addObject(TEXT);
    textSpline.setParameter("text",string); 
}
```


regards.

tg_jp, Hiroto.

## #5 — wal3d — 2007-04-13
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10177>

Hi Hiroto,
 
thank you very much for your tips and also for your Hello World-Skript. I will check this out.
 
Ok, I think I have to start with the smaller Cheetah-Skripts :smile: 
 
The main issue I have is where get I the Objects, Polygons etc. I like to have and how can I bring them back after I calculated it to show them in Cheetah on the screen ... but I hope I will find this out!
 
best regards
Wolfgang

## #6 — wal3d — 2007-04-15
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10230>

Hi,

I tried with my amateurish javascript knowledge the example of Hiroto and there was no success - I also tried it in different script folders macro, splineobj etc. ...

Here is the code:

	
	


```js
function main(doc) {
    var string = 'Hello World of Cheetah3D!!'; 
    var textSpline = doc.addObject(TEXT);
    textSpline.setParameter("TEXT",string); 
}
```


I also get the error message:
Javascript Error
line: 1
SyntaxError: illegal character

As far as I understand, there should be a new (Spline-)Objekt in the scene with the text of "Hello World ...". Am I right or wrong?

Best regards
Wolfgang

## #7 — tg_jp — 2007-04-19
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10404>

hi,

thanks you for trying. 

and please check there is no multibyte character at line 1 in script, multibyte white space?.

please change 'TEXT' to 'text' (lowercase) at line 4.
and this sample is macro script, not tool, nor spline. it should be placed into Macro folder.

[[QUOTE:  As far as I understand, there should be a new (Spline-)Objekt in the scene with the text of "Hello World ...". Am I right or wrong? Click to expand... ]]

you are right.  

for instance, each kind of script automatically calls specific functions.
* macro script (in Macro folder) : function main(doc) {} - doc is document object.
* tool script (in Tool folder) : function buildUI(tool) {} - tool is script object itself.
* polygon script and spline script (in  Polygonobj or Splineobj) : function buildUI(obj) {} and function buildObject(obj) {} - object is script object itself.
* tag script (in Tag folder) : function buildUI(tag) {} - tag is script object itself.

so, you can understand generally which kind of script by reading script text file.

hope it will help. regards.

tg_jp, Hiroto.

## #8 — podperson — 2007-04-20
<https://www.cheetah3d.com/forum/index.php?threads/1577/post-10412>

Spelling is very important in programming, as is correct case and syntax.

If someone writes "doThisThing" and you type "dothisthing" or "DOTHISTHING" then you're quite likely to pull out some of your hair.
