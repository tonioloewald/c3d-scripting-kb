// Source: https://www.cheetah3d.com/forum/index.php?threads/9039/post-88599
// Author: feloneouscat (Cheetah3D forum), posted 2014-07-03
// Thread: "Request for Feature: require"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
var geval = eval;

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
    var prepath = doc.scriptPath().match(/(\/Users\/[-\w^&'@{}[\],$=!#().%+~ ]*\/)/g);
    var file = new File(prepath + "Library/Application Support/Cheetah3D/Scripts/Library/" + libraryName);
    file.open(READ_MODE);
    funcstring = file.read(100000);
    file.close();
    geval(funcstring);
}