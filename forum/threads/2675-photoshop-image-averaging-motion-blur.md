# Photoshop image averaging = motion blur!

- Thread: https://www.cheetah3d.com/forum/index.php?threads/2675/
- Subforum: script-downloads
- Started by **capnchunky** on 2008-02-13; last post 2008-08-28; 8 posts

## #1 — capnchunky — 2008-02-13
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-18435>

Motion blur via image averaging!

Download Applescripts (40kb)

I wanted to create motion blur by averaging a series of images. I found a good description of how to do so here (at the bottom), which turned out to be very easy to implement with Applescript and Photoshop. There are two versions of the script: one will average all the open documents into a single new document, and the other will average all the layers within the current document.

The second one is particularly useful: create a Quicktime movie in Cheetah3D, import it into layers with Photoshop's Video Frames to Layers (do not check Make Frame Animation), and then double-click the script. Simple!

Note: I had to have the scripts call on "Adobe Photoshop CS3" because that's what I have. You might need to change it in the first line if you have an earlier version of Photoshop (if this will work with previous versions; I haven't tried). To edit the scripts, just drag them onto Script Editor in the Applications/Applescript folder. Feel free to alter the code however works for you.

Attachments: [motionblur.jpg](https://www.cheetah3d.com/forum/index.php?attachments/3981/)

Links: http://www.cambridgeincolour.com/tutorials/noise-reduction.htm, http://www.users.muohio.edu/howellme/cheetah3d/PS_Average_scripts.zip

## #2 — podperson — 2008-02-26
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-18879>

You do realize that most video editing programs (Final Cut Pro, After Effects, etc.) will do this for you ...

Also, you tend to get better results if you weight the frames either to the end of each sequence or the middle (i.e. have a trailing blur that fades away, or a motion blur that fades off to either side of the strongest image).

		
	

Sunflow does much better motion blur -- and there's a C3D exporter for it. Anyone tried it?

Links: http://sunflow.sourceforge.net/

## #3 — podperson — 2008-04-08
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-20152>

Here's Final Cut Pro's Stop Motion Blur video filter in action. Its (rather strangely named) control parameters let you determine how much the motion blur tails off, where the blur is relative to the playhead, and so on.

If Cheetah 3D could render at 300fps we could produce pretty snazzy STILL pictures with motion blur using Final Cut Pro et al.

Attachments: [Picture 4.png](https://www.cheetah3d.com/forum/index.php?attachments/4358/)

## #4 — Martin — 2008-04-09
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-20167>

[[QUOTE:  podperson said: If Cheetah 3D could render at 300fps we could produce pretty snazzy STILL pictures with motion blur using Final Cut Pro et al. Click to expand... ]]

Cheetah3D 4.6 can. :wink:

## #5 — capnchunky — 2008-04-09
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-20219>

Hi Martin and podperson,

[[QUOTE:  podperson said: You do realize that most video editing programs (Final Cut Pro, After Effects, etc.) will do this for you ... Also, you tend to get better results if you weight the frames either to t]]

That's a good thought, but the only video app I have is Final Cut Express, which would limit me to a resolution of 720x480, interlaced.

I can see wanting the blur weighted (no idea how to approach that), but for what I was doing I wanted a linear blur, which is technically more realistic.

[[QUOTE:  Martin said: Cheetah3D 4.6 can. :wink: Click to expand... ]]

Ooh, does that mean we'll be able to set an arbitrary frame rate?

## #6 — Martin — 2008-04-09
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-20220>

[[QUOTE:  capnchunky said: Ooh, does that mean we'll be able to set an arbitrary frame rate? Click to expand... ]]

YES, you can set frame rates form 1-300.

## #7 — fused — 2008-04-10
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-20228>

Sweet

[[QUOTE:  Martin said: YES, you can set frame rates form 1-300. Click to expand... ]]

Ohhh, sweet. 

Andrew

## #8 — podperson — 2008-08-28
<https://www.cheetah3d.com/forum/index.php?threads/2675/post-24413>

Oh -- also see this thread:

http://www.cheetah3d.de/forum/showthread.php?t=3098&highlight=motion+blur

Links: http://www.cheetah3d.de/forum/showthread.php?t=3098&highlight=motion+blur
