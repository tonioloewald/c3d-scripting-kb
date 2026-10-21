// Source: https://www.cheetah3d.com/forum/index.php?threads/9039/post-94069
// Author: aaronparr (Cheetah3D forum), posted 2015-03-15
// Thread: "Request for Feature: require"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// load and execute external code
function loadLibrary(prepath,libraryName)
{
  var file = new File(prepath+"Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
  file.open(READ_MODE);
  var funcstring = file.read(file.size());
  file.close();
  eval(funcstring);
}

function loadIncludes(caller)
{
  var prepath = caller.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
  loadLibrary(prepath,"<insert the name of your js file here");
}

main(caller)
{
  loadIncludes(caller);
}