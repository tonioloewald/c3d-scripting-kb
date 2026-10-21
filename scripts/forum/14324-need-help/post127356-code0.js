// Source: https://www.cheetah3d.com/forum/index.php?threads/14324/post-127356
// Author: filip c (Cheetah3D forum), posted 2023-09-16
// Thread: "Need help"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
// Tool script ( ~/Library/Application Support/Cheetah3D/scripts/Tool to install )
//

function buildUI(tool) {
    tool.addParameterSeparator("Retarget");

    tool.addParameterLink("copy from", false);

    tool.addParameterButton("apply to selected", "ok", "copyParameters");
}

function copyParameters(tool) {
    var copyFrom = tool.getParameter("copy from");
    var copyTarget = tool.document().selectedObject();

    if (!copyFrom || !copyTarget) return;

    if (copyTarget.recordParametersForUndo) copyTarget.recordParametersForUndo();

    copyTarget.setParameter("rotation", copyFrom.getParameter("rotation"));

    // Add an ORIENTCONSTRAINTTAG to the target object and link it to the source object
    var constraintTag = copyTarget.addTagOfType(ORIENTCONSTRAINTTAG); // ORIENTCONSTRAINTTAG without double quotes
    constraintTag.setParameter("target", copyFrom);

    copyTarget.update();
}