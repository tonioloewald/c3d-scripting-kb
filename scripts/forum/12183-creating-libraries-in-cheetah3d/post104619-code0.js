// Source: https://www.cheetah3d.com/forum/index.php?threads/12183/post-104619
// Author: feloneouscat (Cheetah3D forum), posted 2016-12-22
// Thread: "Creating Libraries in Cheetah3D"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
function buildUI(doc)
{
    loadLibrary(doc, "testLibrary.js");

    doc.addParameterSeparator("The title of our Tool");

    doc.addParameterButton("Press the button!", "The Button", "buttonpressed");
}

function buttonpressed(doc)
{
    testLibrary.doit(doc, "This is just a test");
}


function loadLibrary(doc, libraryName)
{
    var geval = eval;
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
	file.open(READ_MODE);
	var funcstring = file.read(file.size());
	file.close();
	geval(funcstring);
}