# exchange data

- Thread: https://www.cheetah3d.com/forum/index.php?threads/3350/
- Subforum: scripting-general
- Started by **giulioandrea** on 2008-07-24; last post 2008-08-04; 8 posts

## #1 — giulioandrea — 2008-07-24
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23743>

exchange data

I have a simple problem, well not too simple for me since I am asking help...

I need to look on the disk for a file being created, then read the file and use the content to do some parametric modelling, after which I need to export an obj with the geometry.

Questions:

does anything like the matlab construct 'exist('a','file')' exist in cheetah js?

is there an easy and fast way for checking that a file has been changed or created on the disk?

thanks a lot!
G>

PS a typical problem is to extrude some closed polylines to a value contained in a file, then save an obj. All of this without anybody clicking on a GUI, just to automate things a little.

## #2 — Francois — 2008-07-25
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23749>

Hi and welcome,

[[QUOTE:  giulioandrea said: does anything like the matlab construct 'exist('a','file')' exist in cheetah js? Click to expand... ]]
Sorry but that doesn't exist. From what I understand of what you want to do, you should be able to do this with a script. Take a look at the script section of the forum or do a search and you will have plenty of them to use as examples.
And if you need help with js, then you know where to ask ... :wink: 

[[QUOTE:  is there an easy and fast way for checking that a file has been changed or created on the disk? Click to expand... ]]
Looks like you can use the "smart folder". See the help file.

## #3 — giulioandrea — 2008-07-28
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23773>

I think you missed my point... I was in fact asking if this was possible with a script and in the script area 
anyway, you hint that this is in fact not a problem and can be done with js.
This sounds very interesting for me.

SO, first question is: 
does cheetah js (javascript) allows to use a 'exist' construct and put it into a loop? Is cheetah going to run the rest of the script as soon as the file is found or it will be necessary to click the GUI to execute the script?
something like this...

start:
a = false;
while (a == false){
a = exist(file.txt);
}

b = load(file.txt);
generate_cube(b);
delete(file.txt);
goto start

Example: 
generate 10'000'000 solids changing one parameters and export all of them in obj for a simulation software.
Solids are changed based on the output of the simulations, it is an optimisation process, so there is no way to collect all the values in a file and do a batch... the process need to be interactive and continuous.
somehow Cheetah needs to liten for this file with the variables, when the file is updated or created then cheetah needs to read it, make to solids, save them and go back to the listening mode.

Next question is: is it cheetah going to have some sort of expresso in the future? or everything is going to be js coding?
The idea is that by writing a special script we could have a generic text importer (which needs to listen for a txt file and do stuff) plus an easier to create and handle expresso style interface to use the values read.
everybody can use expresso, but not everybody can write a plugin...

ideas?

Thanks a lot,

G

## #4 — tg_jp — 2008-07-31
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23809>

hi,

[[QUOTE:  does cheetah js (javascript) allows to use a 'exist' construct and put it into a loop? Is cheetah going to run the rest of the script as soon as the file is found or it will be necessary to click the]]

if you don't need to control cheetah3d while that script is executed, it's available. you can try with simple code, and you can see rainbow cursor when cheetah3d is executing the script.

or using a Polygonscript with trigger value for animation. while 3d scene is animated (by clicking Play button) and trigger value is updated, that script object automatically update by Cheetah3D. so, you can execute some code automatically in 'buildObj' function.

[[QUOTE:  Next question is: is it cheetah going to have some sort of expresso in the future? or everything is going to be js coding? The idea is that by writing a special script we could have a generic text im]]

what is expresso? I couldn't find this on the web, could you let me know some url or more info?

I am not sure what exactly you want to make with script. but Cheetah3D's javascript can handle some operation of read/write file with text or binary. It's sufficient to it, I think. please check my 'Sequential Obj.js' for sample polygon script with reading/writing text or binary file, actually it's not clean code though. 

regards.

tg_jp, Hiroto.

## #5 — frank beckmann — 2008-07-31
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23816>

[[QUOTE:  tg_jp said: what is expresso? I couldn't find this on the web, could you let me know some url or more info? Click to expand... ]]

Hi.
It´s spelled "XPresso" and (like C.O.F.F.E.E) it´s part of Cinema4d.

With kindest regards
Frank

## #6 — tg_jp — 2008-07-31
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23819>

hi,

thanks.   I don't have any experiences with C4D, but XPresso looks very cool. it is a graphical UI for accessing to all parameters of scene, isn't it? like Quartz Composer? 

it reminds this http://www.sourcebinder.org/blog/ to me.  

regards.

tg_jp

Links: http://www.sourcebinder.org/blog/

## #7 — giulioandrea — 2008-08-02
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23878>

yes,
it basically allows the 'non programmers' to parametrically generate / modify scenes.
It is a very interesting tool that would be welcome in Cheetah.
The problem of Cinema is that coffee is very complicate and there are (apparently) limitations in the file access when used in the expresso interface.

I like much more the js of cheetah...

G>

## #8 — giulioandrea — 2008-08-04
<https://www.cheetah3d.com/forum/index.php?threads/3350/post-23917>

ok, part 1 is done.
now need all the rest....
thanks
G.

	
	


```js
//check that a file is there.
function main(){
var path = "/Users/Pillo/Desktop/finito.txt";
var file = new File(path);
var A = false;
A = file.exist();
while (!A ) {
A = file.exist();
}
}
```
