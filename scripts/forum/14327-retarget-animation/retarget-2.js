// Source: https://www.cheetah3d.com/forum/index.php?threads/14327/post-127369
// Author: filip c (Cheetah3D forum), posted 2023-09-18
// Thread: "Retarget animation"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Tool script ( ~/Library/Application Support/Cheetah3D/scripts/Tool to install )
//

function buildUI(tool) {
    tool.addParameterSeparator("Retarget");

    tool.addParameterLink("copy from", false);

    tool.addParameterButton("apply to selected", "ok", "copyParameters");

    // Add a button for recursive copy
    tool.addParameterButton("apply to sel. + children", "ok", "recursiveCopy");

    // Add a button to create a POINTCONSTRAINTTAG
    tool.addParameterButton("link position", "ok", "applyPointConstraint");
}

function copyParameters(tool) {
    var copyFrom = tool.getParameter("copy from");
    var selectedObject = tool.document().selectedObject();

    if (!copyFrom || !selectedObject) return;

    // Copy parameters for the selected object only
    selectedObject.recordParametersForUndo();
    selectedObject.setParameter("rotation", copyFrom.getParameter("rotation"));

    // Add an ORIENTCONSTRAINTTAG to the selected object
    var constraintTag = selectedObject.addTagOfType(ORIENTCONSTRAINTTAG); // Remove double quotes from ORIENTCONSTRAINTTAG
    constraintTag.setParameter("target", copyFrom);

    selectedObject.update();
}

function recursiveCopy(tool) {
    var copyFrom = tool.getParameter("copy from");
    var selectedObject = tool.document().selectedObject();

    if (!copyFrom || !selectedObject) return;

    // Copy parameters recursively
    copyParametersRecursive(selectedObject, copyFrom, tool);
}

function applyPointConstraint(tool) {
    var copyFrom = tool.getParameter("copy from");
    var selectedObject = tool.document().selectedObject();

    if (!copyFrom || !selectedObject) return;

    // Add a POINTCONSTRAINTTAG to the selected object with the target applied from "copy from"
    var pointConstraintTag = selectedObject.addTagOfType(POINTCONSTRAINTTAG); // Remove double quotes from POINTCONSTRAINTTAG
    pointConstraintTag.setParameter("target", copyFrom);

    selectedObject.update();
}

function copyParametersRecursive(copyTarget, copyFrom, tool) {
    if (!copyTarget || !copyFrom) return;

    if (copyTarget.recordParametersForUndo) copyTarget.recordParametersForUndo();

    // Copy the "rotation" parameter from copyFrom to copyTarget
    copyTarget.setParameter("rotation", copyFrom.getParameter("rotation"));

    // Add an ORIENTCONSTRAINTTAG to the target object and link it to the source object
    var constraintTag = copyTarget.addTagOfType(ORIENTCONSTRAINTTAG); // Remove double quotes from ORIENTCONSTRAINTTAG
    constraintTag.setParameter("target", copyFrom);

    // Recursively copy parameters and add constraint tags for child objects
    var copyTargetCount = copyTarget.childCount();
    var copyFromCount = copyFrom.childCount();

    for (var i = 0; i < Math.min(copyTargetCount, copyFromCount); i++) {
        var copyTargetChild = copyTarget.childAtIndex(i);
        var copyFromChild = copyFrom.childAtIndex(i);

        // Pass the tool as a parameter to the recursive call
        copyParametersRecursive(copyTargetChild, copyFromChild, tool);
    }

    copyTarget.update();
}
