// Source: https://www.cheetah3d.com/forum/index.php?threads/6793/post-54753
// Author: nervouschimp (Cheetah3D forum), posted 2011-01-20
// Thread: "Command Line .SIA to .FBX with Cheetah"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
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