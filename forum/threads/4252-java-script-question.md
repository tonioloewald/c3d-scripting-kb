# Java script question

- Thread: https://www.cheetah3d.com/forum/index.php?threads/4252/
- Subforum: scripting-general
- Started by **murcielago** on 2009-05-22; last post 2010-09-06; 13 posts

## #1 — murcielago — 2009-05-22
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-29657>

Java script question

Can I use javascript along with Cheetah3d using libraries external to Cheetah3d?

## #2 — ToddWR — 2009-05-23
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-29688>

in a way you can... 
the javascript inside of cheetah can call system code... now if the code is give data to work with... by writing the data to a file then call the routine with used the data and write out more data which can read by the javascript afterwards.

it is slow and clunky for now, but possible

Todd

## #3 — murcielago — 2009-05-27
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-29771>

added question

I wanted to read a *.wav file using Javascript and use frequencies in the file to determine the size of a shapes in a Cheetah3d project.

Does that sound do-able?

## #4 — tg_jp — 2009-05-27
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-29791>

hi, .wav format seems to be simple binary format. so you can read directly via javascript of Cheetah3D.

here is a sample "Tool" script for creating spline object from .wav file. please check it.

regards.

tg_jp, Hiroto.

Attachments: [Cheetah3D_sz_002.jpg](https://www.cheetah3d.com/forum/index.php?attachments/6957/), [Wave Loader.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/6958/)

## #5 — murcielago — 2009-05-27
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-29795>

tanx

thanks Todd and Hitoro.  Much appreciated.

## #6 — podperson — 2009-08-03
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-31198>

If you're trying to fake lip-sync I think you'll want to use some kind of weighted average

## #7 — murcielago — 2010-08-28
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-46949>

[[QUOTE:  tg_jp said: hi, .wav format seems to be simple binary format. so you can read directly via javascript of Cheetah3D. here is a sample "Tool" script for creating spline object from .wav file. please ch]]

Hiroto,
I tried the wave loader script but the spline it produced looked very different.
Any ideas?
Thanks,
Mike

Attachments: [WaveLoaderTest.jpg](https://www.cheetah3d.com/forum/index.php?attachments/11796/)

## #8 — frank beckmann — 2010-09-01
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-47030>

Can´t help you here as I don´t know how the conversion works.
Here´s just a comparison from a 2 sec sound file: Above as splines in Cheetah3d, beneath as a sound wave form. It´s a 8000Hz, 32-bit float sound so it´s not a common one. Maybe it don´t fits into the process as your´s. Maybe.

Cheers
Frank

Attachments: [WaveVSsplines.png](https://www.cheetah3d.com/forum/index.php?attachments/11817/)

## #9 — murcielago — 2010-09-02
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-47035>

Thanks Frank.  Yeah, that nice wave form is what I'm trying to get to.  I think it's some kind of log10 calculation.

## #10 — podperson — 2010-09-02
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-47036>

If the WAV is encoded at more than 16 bits per sample it's probably not going to work. Try downsampling it (e.g. using Audacity).

## #11 — tg_jp — 2010-09-02
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-47037>

hi,

Thas's a bug when you use it with 16 bit .wav file, as reported. I didn't check 16 bit file when I wrote it 

I attached the latest version with 16 bit compatible. please try it.

actually, there are some variation of .wav format, if you have some problem with the script, please let me know, and I will check it with your .wav file. 

* I fixed bug when 16 bit .wav file.
* I changed parameter names.

regards.

tg_jp, Hiroto

Attachments: [Wave Loader.js.zip](https://www.cheetah3d.com/forum/index.php?attachments/11818/)

## #12 — frank beckmann — 2010-09-02
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-47038>

Thanks Hiroto.
Looking good now.  

Cheers
Frank

Attachments: [WAVloader.png](https://www.cheetah3d.com/forum/index.php?attachments/11819/)

## #13 — murcielago — 2010-09-06
<https://www.cheetah3d.com/forum/index.php?threads/4252/post-47125>

Yea!  Go Hiroto!  Thank you so much!
