# Glass transparency issues

- Thread: https://www.cheetah3d.com/forum/index.php?threads/11718/
- Subforum: scripting-general
- Started by **Ukulele Bern** on 2016-02-26; last post 2016-02-26; 7 posts

## #1 — Ukulele Bern — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99827>

Glass transparency issues

Hi

can anyone help me please. Trying to create a jam jar and am struggling to make the glass render with transparency. I know I must be doing something basically wrong. File attached

Many thanks

Ukulele Bern

Attachments: [jar and lid.zip](https://www.cheetah3d.com/forum/index.php?attachments/28437/)

## #2 — frank beckmann — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99828>

Hi Ukule Bern.
Your splines need some minor adjustments - then you render will work as expected:

Cheers
Frank

Attachments: [JarSplines.jpeg](https://www.cheetah3d.com/forum/index.php?attachments/28440/)

## #3 — Ukulele Bern — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99829>

Thank you very much Frank for the quick response, I'll give it a try.

## #4 — frank beckmann — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99830>

You´re welcome - I updated the pic.

Cheers
Frank

## #5 — Ukulele Bern — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99831>

Thanks Frank

worked a treat!

Cheers

Bern

## #6 — uncle808us — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99836>

[[QUOTE:  frank beckmann said: Hi Ukule Bern. Your splines need some minor adjustments - then you render will work as expected: Cheers Frank Click to expand... ]]

Is this showing that the liquid should be inside the glass, or that this is the problem and the liquid should be moved further inside?

## #7 — frank beckmann — 2016-02-26
<https://www.cheetah3d.com/forum/index.php?threads/11718/post-99840>

[[QUOTE:  uncle808us said: Is this showing that the liquid should be inside the glass, or that this is the problem and the liquid should be moved further inside? Click to expand... ]]

The main issues were liquid and inner glass surface share the same space and the splines were closed at the lathe-axis. Little things with great impact.  

Cheers
Frank
