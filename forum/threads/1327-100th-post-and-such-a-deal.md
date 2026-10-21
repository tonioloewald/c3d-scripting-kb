# 100th post and such a deal!

- Thread: https://www.cheetah3d.com/forum/index.php?threads/1327/
- Subforum: script-downloads
- Started by **ToddWR** on 2007-02-12; last post 2016-05-11; 22 posts

## #1 — ToddWR — 2007-02-12
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8340>

100th post and such a deal!

Hi everyone!

100 posts and still going strong!  to celabrate this goal I and offering you a change to upgrade to a new and improved loft script. YES! it now includes splines at no extra cost!

			{
				"lightbox_close": "Close",
				"lightbox_next": "Next",
				"lightbox_previous": "Previous",
				"lightbox_error": "The requested content cannot be loaded. Please try again later.",
				"lightbox_start_slideshow": "Start slideshow",
				"lightbox_stop_slideshow": "Stop slideshow",
				"lightbox_full_screen": "Full screen",
				"lightbox_thumbnails": "Thumbnails",
				"lightbox_download": "Download",
				"lightbox_share": "Share",
				"lightbox_zoom": "Zoom",
				"lightbox_new_window": "New window",
				"lightbox_toggle_sidebar": "Toggle sidebar"
			}
			
		
		
	

	
		
	
and thats not all, act now and recieve at no cost to me the round box script

		
	
but wait, thats not all.... for the next 10 bijillion minutes anyone DLing the above scripts also get the Sierpinski sponge script, usefull for all those messy clean ups after those late night modeling sessions!

Todd

PS  any discalmer you have ever heard goes here. ymmv

Attachments: [scripts.zip](https://www.cheetah3d.com/forum/index.php?attachments/1698/)

## #2 — Eureka! — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8344>

Congratulations:wink:. Your a 10th of the way to a 1000:-D. Another one of your great scripts.

Thanks,
Greg

## #3 — tg_jp — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8355>

Hello, Tod.

nice scripts, yours is so useful anytime.

What do you think of which one is faster? prototype function or simple function to run? or no differences?

regards.

tg_jp, Hiroto.

## #4 — ToddWR — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8362>

Hiroto,

not sure which is faster, if your curious you can time the code like so:

	
	


```
		var st1 = new Date().getTime();
		//some fuction call
		var st2 = new Date().getTime();
		// st2-st1 is the time in milliseconds
```


the reason I like prototyping better is the fact that all instances of an object are modified and you can use this result how you like. concider this code:

	
	


```js
if( !Vec3D.str) {
	Vec3D.prototype.str = function() {
		if(arguments.length == 0)
			return "("+ this.x + "," + this.y + "," + this.z + ")";
		var l = arguments[0];
		return "("+ this.x.toFixed(l) + "," + this.y.toFixed(l) + "," + this.z.toFixed(l) + ")";
	}
}
```

yes you could call a functon to print each point out but they appear on seperate lines. now using the prototype 

	
	


```
	var v1 = new Vec3D(1.23,-.45,0);
	var v2 = new Vec3D(-.236,.367,-.3);
	print( v1.str(3) + " : " + v2.str(3));
```

would produce the output:
	(1.230,-0.450,0.000) : (-0.236,0.367,-0.300)
I guess a function call could be used to get the same results, I just prefer the prototype way of doing it, it just seems a bit cleaner to me. I'll run some tests to see which is faster and report back.

Todd

## #5 — ToddWR — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8363>

Frank,

I just checked the DL again, I am guessing you did not used the new one. try DLing again.

Todd

## #6 — Meshman — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8369>

Excellent Todd!  Your scripts are top-notch, thanks so much for all the effort you put into these.  The addition of splines to the loft tool is really useful.  :smile:

One more thing - is there any chance you could have the option to cap the ends of the loft?  (preferably with the bevel options that you get with the extrude tool? That would be fantastic :smile

## #7 — ToddWR — 2007-02-13
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8376>

[[QUOTE:  Meshman said: One more thing - is there any chance you could have the option to cap the ends of the loft? (preferably with the bevel options that you get with the extrude tool? That would be fantasti]]

I understand what you mean by cap the ends, thats found in the sweep tool. I just don't quite know what you mean by bevel options in the extrude tool. can you post a picture of it?

Todd

## #8 — Meshman — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8381>

[[QUOTE:  ToddWR said: I understand what you mean by cap the ends, thats found in the sweep tool. I just don't quite know what you mean by bevel options in the extrude tool. can you post a picture of it? Todd ]]

Here you go Todd, hopefully this makes it clear?  I hope this isn't too much too ask

Attachments: [caps.jpg](https://www.cheetah3d.com/forum/index.php?attachments/1705/)

## #9 — Martin — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8388>

Hi Todd,
excellent scripts as always.:icon_thumbup: It's always a pleasure to try your scripts.

Bye,
Martin

## #10 — Martin — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8389>

[[QUOTE:  Meshman said: Here you go Todd, hopefully this makes it clear? I hope this isn't too much too ask Click to expand... ]]

Theoretically it is possible. Practically not, since the polygon tesselator of Cheetah3D isn't available via Javascript. Without it it will become very difficult.

Bye,
Martin

## #11 — ToddWR — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8395>

Hi all,

a quick update from the loft labs here, now includes a loft tag you can add to spline to offset where to start on the spline. this effectively rotates the spline without actually roating it. now going from a circle spline to a ngon spline can be fixed by adding the loft tag to the ngon and setting the offset to -.25

have fun
Todd

Attachments: [Loft.zip](https://www.cheetah3d.com/forum/index.php?attachments/1707/)

## #12 — Meshman — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8399>

[[QUOTE:  Martin said: Theoretically it is possible. Practically not, since the polygon tesselator of Cheetah3D isn't available via Javascript. Without it it will become very difficult. Bye, Martin Click to ex]]

That's a shame.  I suppose you could just duplicate the spline at the end of the loft and extrude this to get the same effect?  Will have to try that.

## #13 — tg_jp — 2007-02-14
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-8401>

Hi, Todd

I checked cost time of prototype function and simple function in my script, and I found no differences. But as you said, I think that prototype is a smart way to write code in some situation.:smile: 

regards.

tg_jp, Hiroto.

p.s. I made a simple movie with your Sierpinski.js script.
http://homepage.mac.com/camelio/ch_movies/ch_20070214_sierpinskiLogoH264.mov

Links: http://homepage.mac.com/camelio/ch_movies/ch_20070214_sierpinskiLogoH264.mov

## #14 — uncle808us — 2016-05-10
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100871>

Still no way to sweep with more than one profile? 
I tried the loft tag but I don't understand how it is used. 
I also tried the loft script but it makes a polygon obj.
I'm trying to make a scarf that can be readjusted and I'd like to have where it goes around the neck a smaller profile at that point. Is this impossible still? 
I want to keep it as an active sweep obj.( not collapsed) 
Thanks.

## #15 — frank beckmann — 2016-05-10
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100874>

Can you give us an image please?
In the meantime you can check out Hiroto´s Taper Sweep script which seems very valuable to me.

Cheers
Frank

Links: http://www.cheetah3d.com/forum/showthread.php?t=4029

## #16 — uncle808us — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100878>

[[QUOTE:  frank beckmann said: Can you give us an image please? In the meantime you can check out Hiroto´s Taper Sweep script which seems very valuable to me. Cheers Frank Click to expand... ]]

Hi Frank I tried to use the Taper sweep but could not figure out how it works. Here's an Image.

Attachments: [Sweep.jpg](https://www.cheetah3d.com/forum/index.php?attachments/28850/)

## #17 — frank beckmann — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100880>

This case is perfect for the loft script:

Cheers
Frank

Attachments: [LoftScript.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/28853/)

## #18 — uncle808us — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100893>

[[QUOTE:  frank beckmann said: This case is perfect for the loft script: Cheers Frank Click to expand... ]]

Only problem here is now it is a polygon obj not a spline unless I'm missing something. Quote from my post below"I want to keep it as an active sweep obj.( not collapsed) "

Attachments: [Sweep2.jpg](https://www.cheetah3d.com/forum/index.php?attachments/28861/)

## #19 — frank beckmann — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100894>

You don´t have to make the loft-hierarchy editable as you do with a sweep-creator object.
I still think the taper-sweep script can help you here.

Cheers
Frank

## #20 — uncle808us — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100895>

[[QUOTE:  frank beckmann said: You don´t have to make the loft-hierarchy editable as you do with a sweep-creator object. I still think the taper-sweep script can help you here. Cheers Frank Click to expand... ]]

As I said in my earlier reply: "Hi Frank I tried to use the Taper sweep but could not figure out how it works."

## #21 — frank beckmann — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100896>

Hiroto has example files uploaded - no luck with it?

Cheers
Frank

## #22 — uncle808us — 2016-05-11
<https://www.cheetah3d.com/forum/index.php?threads/1327/post-100903>

Got it Solved Thanks TGP and Frank..
https://youtu.be/0j6HK3SMBHc

Links: https://youtu.be/0j6HK3SMBHc
