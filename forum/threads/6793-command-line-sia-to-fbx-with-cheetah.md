# Command Line .SIA to .FBX with Cheetah

- Thread: https://www.cheetah3d.com/forum/index.php?threads/6793/
- Subforum: scripting-general
- Started by **nervouschimp** on 2011-01-20; last post 2011-01-20; 4 posts

## #1 — nervouschimp — 2011-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6793/post-54753>

Command Line .SIA to .FBX with Cheetah

Hi, Cheetah script gurus.

The following shell script feeds any supported 3d file through Autodesk's FBX converter, and drops the resulting FBX into a sub-folder named FBXRips.

	
	


```js
for f in "$@"
do

function my_dirname {
typeset v="$@"
  echo ${v%/*}
}

function my_basename {
   typeset v x
   v=${1##*/}
   x=${2#.} # get rid of the '.'
   v=${v%.$x}
   echo $v
}

ddir=$(my_dirname "$@")

ffile=$(my_basename "$@")
echo $ffile

mkdir -p "$ddir/FBXRips"

#myfile=${1/.*/}
myfile="$ddir"/FBXRips/$ffile.fbx
myfile=${myfile/.*/}.fbx
echo $myfile

/Applications/Autodesk/FbxConverter/FbxConverter "$1" "$myfile"

done
```


I would like to do the same thing for .SIA using Cheetah as a command-line ripper.

I am assuming that since Unity is able to this with .JAS files... that .SIA (silo) fles can be done in a similar fashion via shell script.

Can this be done?

Thanks,

-NC

## #2 — Martin — 2011-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6793/post-54773>

Hi,
the command line jas->fbx converter is a special feature I've added for the Unity guys. It only works for jas->fbx.

For what would it need sia->fbx?

Bye
Martin

## #3 — nervouschimp — 2011-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6793/post-54780>

Hi, Martin,

The practical use would be for batch ripping silo models, and automating a process whereby simply saving a silo scene will feed it through cheetah, and the resulting FBX is then copied to my Unity project.

I do this currently with modo and the Autodesk FBX ripper using Hazel and an Automator workflow, and it's quite nice. Modo's FBX exporter is terrible, so I have a button that drops a Collada file beside my LXO, and Hazel listens for that DAE, feeds it though the Autodesk standalone FBX converter, and then copies the FBX to Unity.

Anyway, I got to thinking that the same thing could be done with silo, basically using Cheetah as a command line FBX ripper for SIA files that I can automate to fire off each time I save a silo scene.

No big deal, if it's a special thing for the Unity guys...

I was just curious if it was possible...

thanks.

## #4 — nervouschimp — 2011-01-20
<https://www.cheetah3d.com/forum/index.php?threads/6793/post-54790>

Also, if this seems weird... I actually use your tool as a file converter frequently. I know it wasn't designed as such, but your FBX exports are very dependable.
