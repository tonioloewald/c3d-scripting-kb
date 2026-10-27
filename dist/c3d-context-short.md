# Cheetah3D Scripting: AI context pack (short)

> Give this file to an AI assistant (ChatGPT, Claude, Gemini, …) **before** asking it to write or fix a Cheetah3D script.
> It is a condensed version of the community knowledge base at https://github.com/tonioloewald/c3d-scripting-kb, built 2026-10-27. It was assembled from the official
> Cheetah3D 8.1.1 scripting reference, the scripts bundled with the app, and about 20 years of threads on the Cheetah3D forum.
> Citations like #574 are forum threads: https://www.cheetah3d.com/forum/index.php?threads/574/

**Instructions for the AI:** Use only the API documented below, or API the notes confirm. Don't invent methods. Mark anything
uncertain with `// UNVERIFIED:` and tell the user what to check. Write ES5 JavaScript (`var`, `function`; no arrow functions, `let`/`const`,
classes, template literals or modules). Always say which script type the code is, which folder to install it in
(`~/Library/Application Support/Cheetah3D/Scripts/<Type>/`) and how to run it. Tell the user the script hasn't been tested in Cheetah3D.
Assume the user knows Cheetah3D but not programming: give the complete script in one block, say to save it as a plain-text `.js` file
(in TextEdit, Format › Make Plain Text first, and turn off smart quotes), and tell them to paste back any Console errors if it fails.

**If you can open URLs,** fetch more detail when the task needs it (these are plain text):
- Everything (all patterns, all gotchas, the full API): https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/dist/c3d-context-full.md
- Gotchas only: https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/knowledge/gotchas.md · Patterns only: https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/knowledge/patterns.md
- One API class: https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/reference/api/<Class>.md (for example `PolyCore.md`, `Document.md`)
- Existing community scripts and whether they work: https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/catalog/CATALOG.md (files are under https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/scripts/forum/)

## Pick the script type first

The folder decides the type. A script in the wrong folder fails silently, throws misleading errors, or crashes the app.

| Type / folder | Entry points | Use for | How the user runs it |
|---|---|---|---|
| `Macro` | `main(doc)` | One-shot actions: no UI, runs immediately | Tools › Script › Macro › name |
| `Tool` | `buildUI(tool)` + button callbacks `fn(tool)` | Actions with parameters | Tools › Script › Tool › name; the UI is in the **Tool** tab |
| `Tag` | `buildUI(tag)` + `performExpression(tag)` (7.0+, undocumented; see `examples/official/Tag/CircleExpression.js`) | Per-frame expressions and constraints that drive the owner | Select the object, then Tools › Script › Tag › name |
| `Polygonobj` | `buildUI(obj)` + `buildObject(obj)` → fill `obj.core()` (PolyCore) | Procedural meshes | Tools › Script › Polygonobj › name creates the object; its parameters are in the object's properties |
| `Splineobj` | `buildUI(obj)` + `buildObject(obj)` → `core.move/line/curve/close` | Procedural splines | Same as Polygonobj |
| `Particle` | `buildUI(obj)` + `buildObject(obj)` → `core.addParticle()` | Custom particle layouts (children get instanced) | Same as Polygonobj |

An optional first line, `//C3D_VERSION_REQUIREMENT 7.0.0`, marks the minimum version, as the bundled examples do.

## Hard rules (each one broke real scripts)

1. **Pass every argument to `addParameter*`**, including the trailing `animate, build` booleans: Bool/Float/Int/Color/Vec take 6 arguments, Selector 4, String/Texture 3. Short forms have crashed the app. Only call them in `buildUI()`.
2. **Inside `buildObject()` or `performExpression()`, and in any helper they call, every `setParameter` must pass `false` as its third argument.** Without it you get an infinite rebuild loop, sometimes only at render time. Never write the script object's own parameters from `buildObject`.
   - **Expressions must not read back what they write.** Reading `rotation` and writing `rotation + offset` makes the offset build up each frame. Take the base from `getParameter(name, t)` on keyframes or from a parameter stored on the tag (patterns A3b).
3. **Always use `new Vec3D(...)`, `new Vec2D(...)`, `new File(...)` and so on.** Calling them without `new` has crashed the app. Do not extend native prototypes (`Vec3D.prototype.x = ...`).
4. **`core.vertex(i)` returns a copy.** Write changes back with `core.setVertex(i, v)`, then call `obj.update()`.
5. **`doc.selectedObject()` returns the hidden root, not null, when nothing is selected.** Test `obj.owner() == null`.
6. **Do not name a parameter `type`**, or any built-in name (`name`, `position`, `rotation`, `scale`, `seed`, ...). A parameter's name is also its UI label and is case-sensitive.
7. **Parameter names in scripts differ from UI labels.** Discover them with `obj.parameterInfo()` (the bundled Macro *Parameter Info.js* prints them) instead of guessing.
8. **Use a seeded PRNG in `buildObject`, not `Math.random()`** (patterns B10). Otherwise geometry changes on every rebuild. Particle objects already have a `seed` parameter; elsewhere add an Int parameter such as `"random seed"`. Never name it `seed` on a non-particle object without checking `parameterInfo()`.
9. **Animation time is in seconds, not frames** (`doc.animPosition()`, `setAnimPosition(sec)`, `FCurveKey.time`).
10. **Lights:** since 5.x a light is one type, configured by the `lightType` parameter. Do not rely on `SPOTLIGHT`, `POINTLIGHT` and similar constants until they have been verified in 8.x (see gotchas).
11. **`print()` takes strings**, so write `print("" + x)`. There is no `require`; to share code, use the `File` + indirect-eval pattern in patterns.md B8.
12. **Pass `uvCoord()` results (Vec4D) to `addIndexPolygon` carefully.** Older builds needed `new Vec2D(uv.x, uv.y)` (gotchas §4).
13. **Facing and rotations.**
    - Which corner order faces outward is unconfirmed. For closed shapes, check face normals against the centre and call `flipWinding` (gotchas §4).
    - `rotation` is (heading, pitch, bank) in degrees, and heading turns around Y.
14. **Free a redraw lock if you take one.** Use `doc.retainRedrawLock()` with `releaseRedrawLock()` in `finally`, then call `doc.redrawAll()`.

When the docs and the forum disagree, prefer, in order: the 8.1.1 bundled examples, forum reports from 7.x/8.x, the 8.1.1 docs, then older forum reports. Say which one you relied on when it matters.

## Debugging order

If a script misbehaves, check in this order:

1. Is it in the wrong folder?
2. Is any `addParameter*` call missing arguments?
3. Is a parameter name wrong? List the real names with `parameterInfo()`.
4. Is there a rebuild loop (`setParameter` without `false`)?
5. Has the API changed between versions?

## API at a glance (8.1.1)

Full signatures are in the full context pack and in the repo under `reference/api/`.

- **Base** (parent of Object, Tag, Material, Node, tools):
  - `addParameter{Bool,Float,Int,Color,Vec2D,Vec3D,Selector,String,Texture,Link,Button,Separator}`
  - `getParameter(name[,time])`, `setParameter(name,val[,update])`
  - `parameterInfo()`, `parameterWithName`, `parameterAtIndex/Count`
  - `document()`, `owner()`, `type()`, `family()`
  - `recordGeometryForUndo()`, `recordParametersForUndo()`, `scriptPath()`
- **Document:**
  - Objects: `root()`, `selectedObject()`, `selectedObjects()`, `selectObject`, `addObject(TYPE)`, `activeCamera()`
  - Materials: `addMaterial`, `materialAtIndex/Count`, `removeMaterial`
  - Time and takes: `animPosition()`, `setAnimPosition(sec)`, `animationEnd`, `currentTake()`, `takeAtIndex/Count/WithName`, `addTake`, `renameTake`
  - Rendering and files: `render([path])`, `currentRenderer()`, `rendererAtIndex`, `saveToFile(path, fmt)`, `fileName`
  - Redraw: `redrawAll()`, `retainRedrawLock()`, `releaseRedrawLock()`
- **Object:**
  - Hierarchy: `childCount/childAtIndex`, `addChildAtIndex`, `removeChild`
  - Tags: `tagCount/tagAtIndex/tagOfType`, `addTagOfType(TAG)`, `removeTag`, `materialTags()`
  - Geometry: `core()`, `modCore()`, `objMatrix()`, `obj2WorldMatrix()`, `update()`, `setCreatorObj(bool)`, `isCreatorObj()`
- **PolyCore:**
  - Vertices: `vertexCount`, `vertex(i)`, `setVertex`, `addVertex(sel, v)`, `deleteVertex`, `mergeVertices`
  - Polygons: `polygonCount`, `polygonSize(p)`, `vertexIndex(p,c)`, `addPolygon`, `addIndexPolygon(n, idx[], uv[])`, `deletePolygon`, `flipWinding`, `normal`, `triangle/triangleCount`
  - UVs and materials: `uvCoord(p,c)` returns a Vec4D (x,y = UV1; z,w = UV2), `setUVCoord`, `materialTagIndex`
  - Selections: `polygonSelection`, `setPolygonSelection`, `setActivePolygonSelection`, `vertexSelection`, `setVertexSelection`, `edgeSelection`, `setEdgeSelection`
- **SplineCore:** `move(Vec2D/3D)`, `line`, `curve`, `close`, `pathCount`, `cache(i)`, `currentPoint`
- **ParticleCore / Particle:**
  - Core: `addParticle()`, `particleCount`, `particleAtIndex`, `removeAllParticles`
  - Each particle has get/set pairs for Position, Rotation, Scale, Color, Index, Visible, Birth, Death, UVW and Weight, plus the speeds.
- **Tag:** `linkedToMaterial()`, `tag2WorldMatrix()`, clusters (skinning). The material tag type is `SHADERTAG` (`type()==102`); assign with `tag.setParameter("material", mat)`.
- **Material / Node:** `addNodeOfType`, `nodeAtIndex/Count`, `rootNode`, `addConnection(fromID, out, toID, in)`, `node.inputWithName`, `outputWithName`
- **Parameter → TakeNode → FCurve → FCurveKey:**
  - `param.takeNodeWithName(doc.currentTake().name)` or `addTakeNode`
  - `fCurveAtIndex(i)` (x, y, z)
  - `addKey(new FCurveKey())`, `update()`, `valueAtTime(t)`
- **File:** `new File(path)`, `open(READ_MODE|WRITE_MODE[,endian])`, `read/readln/write/writeln`, binary read/write for Float/Short/UInt, `exist`, `isDir`, `contentOfDir`, `mkDir`, `directory`, `lastPathComponent`, `close`. Paths are absolute; `~` only works in `OS.system`.
- **OS:** `messageBox(title,msg)`, `runOpenPanel(ext...)`, `runSavePanel(ext)`, `system(cmd)` (shell-quote paths), `beep()`
- **Globals:** `print`, `clearConsole`, `version()`
- **Math:**
  - `Vec2D/3D/4D` have `add/sub/multiply/norm/copy/set/isEqual/inverse`; Vec3D also has `dot/cross/convertEuler`.
  - `Mat3D/4D` have `multiply/concat/inverse/transpose/determinant`.
  - A Mat4D's translation is in `m03/m13/m23`.
- **Constants:** object types (`BOX`, `POLYGONOBJ`, `SPLINE`, `FOLDER`, `CAMERA`, `SCRIPTPOLY`, ...), tag types (`SHADERTAG`, `UVTAG`, ...), `*_PARAMETER` types, families, modes and `ROT_*`. The full list is in `reference/api/Constants.md`.

## Skeletons

Minimal, canonical skeletons for each script type and common task. Read `knowledge/gotchas.md` first.

**How to read the source tags**

- Each pattern names its sources: official 8.1.1 examples ((ex: Parameter Info.js) style links), forum threads (#1946 style links), and *Learn 3D with Cheetah 3D* (Tonio Loewald) (`reference/book-ch17.8-scripts.md`).
- **API status:**
  - Plain calls are documented in `reference/api/`.
  - Calls marked `// FORUM` or `// EXAMPLE` work in practice but are **not** in the 8.1.1 reference.
  - Calls marked `// VERIFY` are on the gotchas "Verify in app" list.

**House rules used in every skeleton**

- Use `var` and ES5. The engine is JavaScriptCore; ES5 is the safe subset the examples use.
- Pass every argument to every `addParameter*` call.
- Never call `setParameter()` without `false` inside `buildObject` or `performExpression`.
- `print()` only strings.
- Install into `~/Library/Application Support/Cheetah3D/Scripts/<Type>/`, then run Scripts › Update menu (or relaunch).

---

### A1. Macro (`Scripts/Macro/`)

Runs once and has no UI. It receives the `Document`.

Sources: (ex: Parameter Info.js), (ex: RotateObject.js), #10088, #1422.

```js
// Macro: runs main(doc) immediately when chosen from Tools > Script > Macro.
function main(doc) {
    var obj = doc.selectedObject();
    // selectedObject() returns the invisible root (not null) when nothing is selected [#10088]
    if (obj == null || obj.owner() == null) {
        OS.beep();
        OS.messageBox("Error", "Please select an object first.");
        return;
    }

    doc.retainRedrawLock();               // optional: speeds up many edits
    try {
        // ... work on obj / doc ...
        print("Selected: " + obj.getParameter("name"));
    } finally {
        doc.releaseRedrawLock();          // always release, or the UI stays frozen [#1422]
        doc.redrawAll();
    }
}
```

### A2. Tool (`Scripts/Tool/`)

Its parameter panel appears in the **Tool** tab. Work happens in button callbacks. Edits are made undoable.

Sources: (ex: Scale light intensity.js), (ex: Scale Take.js), #989, #8848, #10282, #14324, #14327.

```js
function buildUI(tool) {
    tool.addParameterSeparator("My Tool");
    //                       name      init  min  max   animate build
    tool.addParameterFloat("factor",  1.0,  0.0, 10.0, false,  false);
    tool.addParameterBool ("children", true, false, true, false, false); // all 6 args! [#14327]
    tool.addParameterLink ("target",  false);                           // object picker
    tool.addParameterButton("apply", "OK", "apply");  // calls apply(tool)
}

function apply(tool) {
    var doc = tool.document();
    var obj = doc.selectedObject();
    if (obj.owner() == null) return;                 // nothing selected
    var factor = tool.getParameter("factor");

    // Undo (6.0+; documented as tool-script only). Feature-detect for old versions [#8848].
    if (obj.recordParametersForUndo) obj.recordParametersForUndo();
    var s = obj.getParameter("scale");               // returns a copy
    obj.setParameter("scale", new Vec3D(s.x * factor, s.y * factor, s.z * factor));

    // For mesh edits instead:
    // if (obj.recordGeometryForUndo) obj.recordGeometryForUndo();
    // ... core.setVertex(...) ...

    obj.update();
    doc.redrawAll();
}
```

### A3. Tag (`Scripts/Tag/`): expression tag, 7.0+

Sources: (ex: CircleExpression.js), (ex: Physics.js), #5752, #13505.

```js
// A tag with only buildUI() just adds custom parameters to its owner (e.g. for exporters).
// performExpression(tag) is the 7.0+ per-evaluation hook (undocumented in Tag.md).
function buildUI(tag) {
    tag.addParameterInt("priority", 10, 0, 1000, true, true);  // EXAMPLE: conventional first param
    tag.addParameterSeparator("MyExpression.js");
    tag.addParameterFloat("speed", 1, 0, 1000, false, false);
    tag.addParameterLink("driver", true);                      // optional linked object
}

function performExpression(tag) {
    var owner = tag.owner();                  // the object the tag is attached to
    var doc   = tag.document();
    var t     = doc.animationTime();          // EXAMPLE: seconds; undocumented (doc.animPosition() is documented)
    var speed = tag.getParameter("speed");
    // Third arg false: do not trigger a scene-graph rebuild from inside evaluation.
    owner.setParameter("position", new Vec3D(Math.cos(speed * t), 0, Math.sin(speed * t)), false);
}
```

### A3b. Additive expression tag (wobble, jitter, offset), 7.0+ [VERIFY]

The trap is reading back the value you wrote last frame, which makes the effect build up. Take the base from the keyframes, or from a parameter stored on the tag. A full version, with automatic capture and a Capture button, is in Wobble.js.

```js
function buildUI(tag) {
    tag.addParameterInt("priority", 10, 0, 1000, true, true);
    tag.addParameterFloat("amplitude", 10, 0, 180, true, true);
    tag.addParameterFloat("frequency", 1, 0, 100, true, true);
    tag.addParameterVec3D("base rotation", new Vec3D(0,0,0), -100000, 100000, false, true);
}
function performExpression(tag) {
    var owner = tag.owner(); if (owner == null) return;
    var doc = tag.document(), t = doc.animPosition();          // seconds
    var p = owner.parameterWithName("rotation");
    var node = p ? p.takeNodeWithName(doc.currentTake().name) : null;
    var base = (node && node.totalKeyCount() > 0)
        ? owner.getParameter("rotation", t)                     // keyed: F-curve value [VERIFY]
        : tag.getParameter("base rotation");                    // unkeyed: stored base
    var d = tag.getParameter("amplitude") * Math.sin(2*Math.PI*tag.getParameter("frequency")*t);
    owner.setParameter("rotation", new Vec3D(base.x + d, base.y, base.z), false);  // h += d; never omit false
}
```

### A4. Polygonobj (`Scripts/Polygonobj/`)

Sources: (ex: GrapherUV.js), (ex: Menger.js), #574, #1939, #1294.

```js
function buildUI(obj) {
    obj.setParameter("name", "MyMesh");                          // default display name
    obj.addParameterFloat("size", 1.0, 0.001, 1000, true, true);
    obj.addParameterInt  ("segments", 8, 1, 256, true, true);
    obj.addParameterInt  ("random seed", 12345, 0, 999999, true, true); // avoid the name "seed"/"type"
    // Smoothing controls, as GrapherUV declares them (VERIFY whether host already has them):
    obj.addParameterSelector("normalType", ["flat", "phong", "constraint"], true, true);
    obj.addParameterFloat("normalAngle", 45.0, 5.0, 90.0, true, true);
    obj.setParameter("normalType", 1);
    // obj.setCreatorObj(true);  // only if buildObject reads child objects [#574]
}

function buildObject(obj) {
    var core = obj.core();            // empty at entry; regenerate everything
    var size = obj.getParameter("size");
    // NEVER call obj.setParameter(...) here (rebuild loop) [#574, #8739]
    var i0 = core.addVertex(false, new Vec3D(-size, 0, -size));
    var i1 = core.addVertex(false, new Vec3D( size, 0, -size));
    var i2 = core.addVertex(false, new Vec3D( size, 0,  size));
    var i3 = core.addVertex(false, new Vec3D(-size, 0,  size));
    // Corner order as in GrapherUV (x first, then z) gives a +Y facing quad;
    // use core.flipWinding(p) if normals come out reversed.
    core.addIndexPolygon(4, [i0, i1, i2, i3],
        [new Vec2D(0, 0), new Vec2D(1, 0), new Vec2D(1, 1), new Vec2D(0, 1)]);
}
```

Creator variant: read the first child's evaluated mesh into this object. Sources: #1939, #8015, #718.

```js
function buildUI(obj) {
    obj.setParameter("name", "MyCreator");
    obj.addParameterFloat("offset", 0.1, -100, 100, true, true);
    obj.setCreatorObj(true);                       // rebuild when children change
}
function buildObject(obj) {
    if (obj.childCount() < 1) return;
    var child = obj.childAtIndex(0);
    var src = child.modCore();
    if (src == null || typeof src.polygonCount != "function") return;  // not a polygon core
    var m = child.objMatrix();                     // modCore() excludes the child's own transform
    var dst = obj.core();
    var off = obj.getParameter("offset");
    var n = src.vertexCount(), i, j;
    for (i = 0; i < n; i++) {
        var v = m.multiply(src.vertex(i));
        dst.addVertex(false, new Vec3D(v.x, v.y + off, v.z));  // keep indices 1:1
    }
    for (i = 0; i < src.polygonCount(); i++) {
        var size = src.polygonSize(i), idx = [], uvs = [];
        for (j = 0; j < size; j++) {
            idx.push(src.vertexIndex(i, j));
            var uv = src.uvCoord(i, j);              // Vec4D: x,y = UV set 1
            uvs.push(new Vec2D(uv.x, uv.y));         // pass Vec2D to addIndexPolygon [#466]
        }
        dst.addIndexPolygon(size, idx, uvs);
    }
}
```

### A5. Splineobj (`Scripts/Splineobj/`)

Sources: (ex: Sinecircle.js), (ex: Bounce.js), #12214, #14379.

```js
function buildUI(obj) {
    obj.setParameter("name", "MySpline");
    obj.addParameterFloat("radius", 1.0, 0.001, 1000, true, true);
    obj.addParameterInt("points", 64, 3, 1000, true, true);
}

function buildObject(obj) {
    var spline = obj.core();                         // SplineCore
    var r = obj.getParameter("radius");
    var n = obj.getParameter("points");
    for (var i = 0; i < n; i++) {
        var a = 2 * Math.PI * i / n;
        var p = new Vec3D(r * Math.cos(a), 0, r * Math.sin(a));
        if (i == 0) spline.move(p);                  // move() starts a path; required first
        else        spline.line(p);
    }
    spline.close();
    // A second contour (e.g. a hole for an Extrude parent) = another move()/line()/close() [#14379]
    // Bezier segment: spline.curve(cp1, cp2, to)
}
```

### A6. Particle (`Scripts/Particle/`)

Sources: (ex: Particle Menger.js), (ex: Particle Image.js), (book: Particle City), #6905.

```js
function buildUI(obj) {
    obj.setParameter("name", "MyParticles");
    obj.addParameterInt("count", 100, 1, 10000, true, true);
    obj.addParameterFloat("spread", 2.0, 0, 1000, true, true);
}

function buildObject(obj) {
    var core = obj.core();                     // ParticleCore in a Particle script
    var n = obj.getParameter("count");
    var spread = obj.getParameter("spread");
    var rng = makeRng(obj.getParameter("seed"));   // particle objects carry a built-in Int "seed" (book)
    for (var i = 0; i < n; i++) {
        var p = core.addParticle();
        p.setPosition(new Vec3D((rng() - 0.5) * spread, 0, (rng() - 0.5) * spread));
        p.setRotation(new Vec3D(0, Math.floor(rng() * 4) * 90, 0));   // Euler degrees
        p.setScale(new Vec3D(1, 1, 1));
    }
}

function makeRng(seed) {                       // see B10
    var s = (seed >>> 0) % 233280;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
```

Children of the particle object are the instanced shapes.

---

---
**This is the short pack.** More patterns (scene iteration, meshes with UVs, splines, materials, keyframes, files, shared libraries, rendering, PRNG, introspection), every gotcha with its evidence, and the full API reference are in the full pack: https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/dist/c3d-context-full.md. Fetch it, or ask the user to attach it, before using any API, pattern or gotcha that this file only mentions (for example patterns B8 or B10), and whenever a script fails for a reason not covered here.
