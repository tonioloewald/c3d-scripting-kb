//C3D_VERSION_REQUIREMENT 6.0.0
//
// Distribute Selected.js
// Type / folder : Tool  ->  ~/Library/Application Support/Cheetah3D/Scripts/Tool/
// Requires      : Cheetah3D 6.0+ for Undo (runs without Undo on older versions);
//                 written and linted against the 8.1.1 API.
//
// Usage:
//   1. Install, then choose "Update Scripts Menu" at the bottom of the Script menu.
//   2. Select the PARENT object (e.g. a Folder) whose children you want to space out.
//   3. Tools > Script > Tool > Distribute Selected. The parameters appear in the Tool tab.
//   4. Pick the axis and press "Distribute".
//   The first and last child (in Object Browser order) stay where they are; the children
//   in between are moved along the chosen axis so they are evenly spaced between them.
//   The other two coordinates are left untouched. Positions are the children's local
//   positions (i.e. in the parent's space), which is what the Properties panel shows.
//   Undo: Edit > Undo should restore the positions (one Undo step per moved child may be
//   needed; see note in distribute()).
//
// Credit: written for Cheetah3D 8.x following the c3d-scripting-kb patterns (A2, B1).
//         Public domain.
//

function buildUI(tool) {
    tool.addParameterSeparator("Distribute Selected");
    // 0 = X, 1 = Y, 2 = Z
    tool.addParameterSelector("axis", ["X", "Y", "Z"], false, false);
    tool.addParameterBool("sort by position", false, false, true, false, false);
    tool.addParameterButton("distribute", "Distribute", "distribute");  // calls distribute(tool)
}

function axisValue(v, axis) {
    return axis == 0 ? v.x : (axis == 1 ? v.y : v.z);
}

function withAxis(v, axis, value) {
    // getParameter returns a copy; build a fresh vector (gotchas §4)
    return new Vec3D(axis == 0 ? value : v.x,
                     axis == 1 ? value : v.y,
                     axis == 2 ? value : v.z);
}

function distribute(tool) {
    var doc    = tool.document();
    var parent = doc.selectedObject();
    // selectedObject() returns the hidden root, not null, when nothing is selected
    if (parent == null || parent.owner() == null) {
        OS.beep();
        OS.messageBox("Distribute Selected", "Select the parent object whose children should be distributed.");
        return;
    }

    var n = parent.childCount();
    if (n < 3) {
        OS.messageBox("Distribute Selected",
                      "The selected object needs at least 3 children (it has " + n + ").");
        return;
    }

    var axis = parseInt(tool.getParameter("axis"), 10);
    var sortByPos = tool.getParameter("sort by position");

    var kids = [], i;
    for (i = 0; i < n; i++) {
        var c = parent.childAtIndex(i);
        kids.push({ obj: c, pos: c.getParameter("position"), index: i });
    }
    if (sortByPos) {
        // Optional: use spatial order instead of Object Browser order (stable on ties)
        kids.sort(function (a, b) {
            var d = axisValue(a.pos, axis) - axisValue(b.pos, axis);
            return d != 0 ? d : a.index - b.index;
        });
    }

    var start = axisValue(kids[0].pos, axis);
    var end   = axisValue(kids[n - 1].pos, axis);
    var step  = (end - start) / (n - 1);

    doc.retainRedrawLock();
    try {
        for (i = 1; i < n - 1; i++) {
            var k = kids[i];
            // Undo (6.0+, Tool scripts only per docs). Feature-detect for older versions.
            // UNVERIFIED: whether several recordParametersForUndo() calls in one button press
            // become one Undo step or one per object. Not covered by the KB.
            if (k.obj.recordParametersForUndo) k.obj.recordParametersForUndo();
            k.obj.setParameter("position", withAxis(k.pos, axis, start + step * i));
            k.obj.update();
        }
    } finally {
        doc.releaseRedrawLock();
        doc.redrawAll();
    }
    print("Distribute Selected: spaced " + (n - 2) + " children of '" +
          parent.getParameter("name") + "' along " + ["X", "Y", "Z"][axis] + ".");
}
