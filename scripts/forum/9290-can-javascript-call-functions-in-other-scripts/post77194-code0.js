// Source: https://www.cheetah3d.com/forum/index.php?threads/9290/post-77194
// Author: feloneouscat (Cheetah3D forum), posted 2013-02-23
// Thread: "Can Javascript call functions in other scripts?"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function loadLibrary(libraryName)
{
	var file = new File("/Users/YOURUSERNAMEHERE/Library/Application Support/Cheetah3D/Scripts/Tool/" + libraryName);
	file.open(READ_MODE);
	funcstring = file.read(100000);
	eval(funcstring);
}