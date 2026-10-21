# Dynamically update text value of Text Spline Object

- Thread: https://www.cheetah3d.com/forum/index.php?threads/13505/
- Subforum: scripting-general
- Started by **jdmac** on 2019-10-28; last post 2019-10-29; 11 posts

## #1 — jdmac — 2019-10-28
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118229>

I want a script that will get the DateTime from a Skylight object and update the text of a Text Spline Object.
I haven't written a script for C3D before, so I'm hoping to get some pointers here.

One basic question is what kind of script should I specify? I've started with Tag script.

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
			
		
		
	

	
		
	

Below is what I have so far based on looking at some other scripts; but script doesn't show any visible changes.
(Of course, if the text value of the Text Spline Object can be dynamically set, than script could be modified to get parameters from any object, I suppose)

	
	


```js
/*
* Time of Day.js
*
* Created by Jerry McCreary at 10/28/19
*/

function buildUI( tag ) {
    tag.addParameterLink("Skylight", true);
}

function applyParameters(tag){
    var owner=tag.owner();
    var doc=tag.document();
    var sun=tag.getParameter("Skylight");
    var txt = sun.getParameter('Date');
    owner.setParameter("Text",txt.toString(),false);
}
```

## #2 — jdmac — 2019-10-28
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118231>

UPDATE
Success:
I've managed to get the datetime from the Skylight object and assign it to the Text Spline text value.

New question:
The value returned from the Skylight date parameter appears to be a float type. 
Trying it as a millisecond value from epoch does not convert correctly to a Date object.
 
@Martin , how can I convert that to a Javascript Data object that matches the date and time in the Skylight text field? (i.e. month, day, hour, minute)

	
	


```js
/*
 * Time of Day.js
 *
 * Created by Jerry McCreary at 10/28/19
 */


function buildUI(tag) {
    tag.addParameterLink("Skylight", true);
}

function performExpression(tag) {

        var owner = tag.owner();
        var doc = tag.document();
        var sun = tag.getParameter("Skylight");
        var d;
        var dt;

        try {
            d = sun.getParameter('date');  // <-- ACTUAL value from Skylight
            dt = new Date(d);                  // <-- NOT an accurate date

            print("SUN DATE: "
                 + d.toString() + " "
                 + dt.getMonth().toString() + "/"
                 + dt.getDate().toString() + " "
                 + dt.getHours().toString() + ":" + dt.getMinutes().toString());
            print("*************************");


        } catch (err) {
            print("********* ERROR *********");
            print(err);
            print("*************************");
        }

        owner.setParameter("text", d.toString());  // <-- ASSIGNING retrieved value to Text Spline

}
```

## #3 — Helmut — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118232>

*    Date seems to be an integer, starting from 0 (00:00 @ 01.01.yy) to some max value, 525 600 (24:00 @ 31.12.yy), ie number of minutes past New Year.
*    No idea if that takes into account any leap years.
*    Parsing that number into a proper date format is a bit awkward given the metrics of our calendar but essentially a set of trivial divisions and fiddling remainders.

## #4 — Helmut — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118233>

*    Note for testing:
*    You can manually fiddle the f-curve for the date in the bottom panel for the timeline.  As a matter of fact, you can simulate non-linear time, if this were useful in your project.

## #5 — jdmac — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118234>

Thanks, Helmut.
I realized after posting my last question that some simple math would show me that the value is the number of minutes past New Year --- just as you point out.

To convert to JS Date object, this may work:

	
	


```
var sun_d = sun.getParameter('date');  // minutes since new year

var minutes = Math.floor(sun_d);
var seconds = 60 * (sun_d - minutes)
var d = new Date(2019, 0, 1, 0, minutes, seconds); // the actual year is not relevant
```


Then, the different parts of date can be extracted ... e.g. d.getMonth()
The value from the Skylight date field is a float, so it is possible to get seconds.

## #6 — jdmac — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118235>

Success.
Text Spline text is updated by the Skylight date value.

(script attached)

Attachments: [Skylight_to_text.jas.zip](https://www.cheetah3d.com/forum/index.php?attachments/35111/), [TimeOfDay.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/35113/)

## #7 — jdmac — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118236>

I'll probably add option to select formatting of date. The current format is default.

## #8 — frank beckmann — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118237>

That's cool. 
Is it possible to have just hh:mm:ss? I ask because we'd have then digital clocks.

Cheers
Frank

PS. You might open a thread in the script general to release your script.

## #9 — jdmac — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118239>

[[QUOTE:  frank beckmann said: Is it possible to have just hh:mm:ss? Click to expand... ]]
Yes. I could add a select drop down to choose the output format.

I found this MIT licensed script by Steven Levithan to easily format Javascript dates date.format.js
and other solutions on Stackoverflow.com

I was also thinking to make a version to output values to make an analog clock.
... but I have to do paying work first

Links: http://stevenlevithan.com/assets/misc/date.format.js, https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

## #10 — jdmac — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118240>

[[QUOTE:  frank beckmann said: PS. You might open a thread in the script general to release your script. Click to expand... ]]

I will after I make other edits.

## #11 — frank beckmann — 2019-10-29
<https://www.cheetah3d.com/forum/index.php?threads/13505/post-118241>

Great! And thanks for sharing.

Cheers
Frank
