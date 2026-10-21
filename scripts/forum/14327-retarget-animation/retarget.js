// Source: https://www.cheetah3d.com/forum/index.php?threads/14327/post-127358
// Author: filip c (Cheetah3D forum), posted 2023-09-17
// Thread: "Retarget animation"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//
// Tool script ( ~/Library/Application Support/Cheetah3D/scripts/Tool to install )
//

function buildUI(tool) {
    tool.addParameterSeparator("Retarget");

    tool.addParameterLink("copy from", false);

    // Add a checkbox parameter for enabling recursion
    tool.addParameterBool("+ children", true);

    tool.addParameterButton("apply to selected", "ok", "copyParameters");

    // Add a button to manually apply a POINTCONSTRAINTTAG from "copy from" to the selected object
    tool.addParameterButton("link position", "ok", "applyPointConstraint");
}

function copyParameters(tool) {
    var copyFrom = tool.getParameter("copy from");
    var selectedObject = tool.document().selectedObject();
    var recursive = tool.getParameter("+ children"); // Get the value of the checkbox

    if (!copyFrom || !selectedObject) return;

    if (recursive) {
        // Copy parameters recursively and pass the tool as a parameter
        copyParametersRecursive(selectedObject, copyFrom, tool);
    } else {
        // Copy parameters for the selected object only
        selectedObject.recordParametersForUndo();
        selectedObject.setParameter("rotation", copyFrom.getParameter("rotation"));

        // Add an ORIENTCONSTRAINTTAG to the selected object
        var constraintTag = selectedObject.addTagOfType(ORIENTCONSTRAINTTAG); // Remove double quotes from ORIENTCONSTRAINTTAG
        constraintTag.setParameter("target", copyFrom);

        selectedObject.update();
    }
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

    // Add an ORIENTCONSTRAINTTAG to the target object and link it to the source object if recursion is enabled
    var recursive = tool.getParameter("+ children"); // Get the value of the checkbox
    if (recursive) {
        var constraintTag = copyTarget.addTagOfType(ORIENTCONSTRAINTTAG); // Remove double quotes from ORIENTCONSTRAINTTAG
        constraintTag.setParameter("target", copyFrom);
    }

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
