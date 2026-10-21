//C3D_VERSION_REQUIREMENT 7.0.0
//
// Wobble.js
// Type / folder : Tag  ->  ~/Library/Application Support/Cheetah3D/Scripts/Tag/
// Requires      : Cheetah3D 7.0+ (expression tags); written and linted against 8.1.1.
//
// Usage:
//   Install, choose "Update Scripts Menu" at the bottom of the Script menu, select an
//   object and add the tag from Tools > Script > Tag > Wobble (menu mirrors the Scripts
//   folders; exact placement for tag scripts not confirmed in the KB).
//   On playback / scrubbing the owner's rotation becomes
//       base rotation + amplitude * sin(2*pi*(frequency*t + phase))   on the chosen axis.
//   - If the owner's rotation is keyframed in the current take, the keyframed value is the
//     base, so the wobble rides on top of your animation.
//   - Otherwise the tag's "base rotation" is the base. It is captured automatically from
//     the owner the first time the tag is evaluated; press "Capture" after you rotate the
//     object by hand to make the new orientation the base.
//   Rotation components are Cheetah3D's heading / pitch / bank (degrees). Per the bundled
//   RotateObject.js example, heading (.h, first component) turns the object around Y.
//
// Rebuild-loop safety: every setParameter inside performExpression passes false as the
// third argument, and the owner's rotation is never read back as the base (that would
// accumulate the wobble each evaluation).
//
// Credit: written for Cheetah3D 8.x following the c3d-scripting-kb patterns (A3) and the
//         bundled CircleExpression.js. Public domain.
//

var AXIS_LABELS = ["heading (Y)", "pitch (X)", "bank (Z)"];

function buildUI(tag) {
    tag.addParameterInt("priority", 10, 0, 1000, true, true);   // convention from CircleExpression.js
    tag.addParameterSeparator("Wobble.js");
    //                     name          init  min     max    animate build
    tag.addParameterFloat("amplitude",   10.0, 0.0,    180.0, true,   true);   // degrees
    tag.addParameterFloat("frequency",   1.0,  0.0,    100.0, true,   true);   // cycles per second
    tag.addParameterFloat("phase",       0.0,  0.0,    1.0,   true,   true);   // fraction of a cycle
    tag.addParameterSelector("axis", AXIS_LABELS, true, true);
    tag.addParameterSeparator("Base");
    tag.addParameterVec3D("base rotation", new Vec3D(0, 0, 0), -100000, 100000, false, true);
    tag.addParameterBool("base captured", false, false, true, false, false);
    tag.addParameterButton("capture", "Capture", "captureBase");
}

// Wobble offset in degrees at time t (seconds).
function wobbleAt(tag, t) {
    var amp  = tag.getParameter("amplitude");
    var freq = tag.getParameter("frequency");
    var ph   = tag.getParameter("phase");
    return amp * Math.sin(2 * Math.PI * (freq * t + ph));
}

function currentTime(doc) {
    // animationTime() is what the 8.x example uses (undocumented); animPosition() is documented.
    if (typeof doc.animationTime == "function") return doc.animationTime();
    return doc.animPosition();
}

function addOnAxis(v, axis, d) {
    // Vec3D(h, p, b): constructor order as in RotateObject.js
    return new Vec3D(v.x + (axis == 0 ? d : 0),
                     v.y + (axis == 1 ? d : 0),
                     v.z + (axis == 2 ? d : 0));
}

// True if the owner's rotation has keys in the current take.
function rotationIsKeyed(owner, doc) {
    var p = owner.parameterWithName("rotation");
    if (p == null) return false;
    var take = doc.currentTake();
    if (take == null) return false;
    var node = p.takeNodeWithName(take.name);              // Take.name is a property
    return node != null && node.totalKeyCount() > 0;
}

// Button callback: make the owner's current (un-wobbled) rotation the new base.
function captureBase(tag) {
    var owner = tag.owner();
    if (owner == null) return;
    var doc  = tag.document();
    var axis = parseInt(tag.getParameter("axis"), 10);
    var rot  = owner.getParameter("rotation");
    // The rotation on screen includes the wobble applied for the current time; remove it.
    var base = tag.getParameter("base captured") ? addOnAxis(rot, axis, -wobbleAt(tag, currentTime(doc))) : rot;
    if (tag.recordParametersForUndo) tag.recordParametersForUndo();
    tag.setParameter("base rotation", base);
    tag.setParameter("base captured", true);
}

function performExpression(tag) {
    var owner = tag.owner();
    if (owner == null) return;
    var doc  = tag.document();
    var t    = currentTime(doc);
    var axis = parseInt(tag.getParameter("axis"), 10);
    var base;

    if (rotationIsKeyed(owner, doc)) {
        // Documented: getParameter(name, time) returns the animated value at that time,
        // independent of what we wrote last evaluation.
        // UNVERIFIED: that it evaluates the F-curve rather than returning the stored value.
        base = owner.getParameter("rotation", t);
    } else {
        if (!tag.getParameter("base captured")) {
            // First evaluation: adopt the owner's current orientation as base.
            // UNVERIFIED: writing the tag's own parameters from performExpression (with false)
            // is not covered by the KB; it follows the same no-update rule as for the owner.
            var rot = owner.getParameter("rotation");
            tag.setParameter("base rotation", rot, false);
            tag.setParameter("base captured", true, false);
        }
        base = tag.getParameter("base rotation");
    }

    // false: do not trigger a scene-graph update from inside evaluation (no rebuild loop)
    owner.setParameter("rotation", addOnAxis(base, axis, wobbleAt(tag, t)), false);
}
