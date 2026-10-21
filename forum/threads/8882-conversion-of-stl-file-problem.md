# Conversion of .stl file problem

- Thread: https://www.cheetah3d.com/forum/index.php?threads/8882/
- Subforum: scripting-general
- Started by **E Rea** on 2012-10-06; last post 2012-10-06; 6 posts

## #1 — E Rea — 2012-10-06
<https://www.cheetah3d.com/forum/index.php?threads/8882/post-73749>

Conversion of .stl file problem

I have received .stl files created on Rhino from my CAD draftsperson. The purpose is to output prototype models from Sculpteo. Problem, if I open the files in Cheetah3D and rename them, they jump from being 6mb (with no acceptance/model problems) to 22mb and often unacceptable ..corrupted.

Any thoughts or is this a unsolvable program issue despite the same file type?

## #2 — frank beckmann — 2012-10-06
<https://www.cheetah3d.com/forum/index.php?threads/8882/post-73750>

Hi and welcome.
I´m sitting right now on a stl file. Exporting to stl again has no influence regarding file size.
What have you done in Cheetah3d with the stl?

Cheers
Frank

## #3 — E Rea — 2012-10-06
<https://www.cheetah3d.com/forum/index.php?threads/8882/post-73753>

Hi Frank, thanks for the quick reply. I simply opened the .stl file sent to me by the CAD person and re-saved, again as an .stl. Originally I made changes but these got rejected so re did it without making any changes and the 3D print company still rejects it and says the file is massive. I thought it might be a PC to Mac problem.

## #4 — frank beckmann — 2012-10-06
<https://www.cheetah3d.com/forum/index.php?threads/8882/post-73755>

[[QUOTE:  E Rea said: I thought it might be a PC to Mac problem. Click to expand... ]]
Mine stays in exactly the same file size.  
Can´t tell what´s going on from here.
When it´s allowed you can send it over - give me a short briefing what you want to have changed and I will return it to you.

Cheers
Frank

## #5 — Martin — 2012-10-06
<https://www.cheetah3d.com/forum/index.php?threads/8882/post-73766>

Hi,
there exist two types of STL file "ASCII" and "Binary". Both are valid STL files and they have the same file ending but especially for big scenes "Binary" files are more common than "ASCII" files.

Please check in the STL exporter preferences that you export to "Binary".

Bye
Martin

## #6 — frank beckmann — 2012-10-06
<https://www.cheetah3d.com/forum/index.php?threads/8882/post-73767>

Thanks for the reminder.
Good tip - I wasn´t aware mine was set up for Binary already - ASCII will blow it up of course.

Cheers
Frank
