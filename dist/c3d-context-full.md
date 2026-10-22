# Cheetah3D Scripting: AI context pack (full)

> Give this file to an AI assistant (ChatGPT, Claude, Gemini, …) **before** asking it to write or fix a Cheetah3D script.
> It is a condensed version of the community knowledge base at https://github.com/tonioloewald/c3d-scripting-kb, built 2026-10-22. It was assembled from the official
> Cheetah3D 8.1.1 scripting reference, the scripts bundled with the app, and about 20 years of threads on the Cheetah3D forum.
> Citations like #574 are forum threads: https://www.cheetah3d.com/forum/index.php?threads/574/

**Instructions for the AI:** Use only the API documented below, or API the notes confirm. Don't invent methods. Mark anything
uncertain with `// UNVERIFIED:` and tell the user what to check. Write ES5 JavaScript (`var`, `function`; no arrow functions, `let`/`const`,
classes, template literals or modules). Always say which script type the code is, which folder to install it in
(`~/Library/Application Support/Cheetah3D/Scripts/<Type>/`) and how to run it. Tell the user the script hasn't been tested in Cheetah3D.

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

# Patterns

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

### A. Script-type skeletons

#### A1. Macro (`Scripts/Macro/`)

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

#### A2. Tool (`Scripts/Tool/`)

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

#### A3. Tag (`Scripts/Tag/`): expression tag, 7.0+

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

#### A3b. Additive expression tag (wobble, jitter, offset), 7.0+ [VERIFY]

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

#### A4. Polygonobj (`Scripts/Polygonobj/`)

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

#### A5. Splineobj (`Scripts/Splineobj/`)

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

#### A6. Particle (`Scripts/Particle/`)

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

### B. Common tasks

#### B1. Iterate the scene graph

Sources: (ex: Scale light intensity.js), (ex: Simple ASCII Export.js), (book), #4442, #9213.

```js
function walk(obj, fn, depth) {
    fn(obj, depth || 0);
    for (var i = 0; i < obj.childCount(); i++) walk(obj.childAtIndex(i), fn, (depth || 0) + 1);
}

function findByName(doc, name) {
    var found = null;
    walk(doc.root(), function (o) {
        if (!found && o.owner() != null && o.getParameter("name") == name) found = o;
    });
    return found;
}

function main(doc) {
    walk(doc.root(), function (o, d) {
        if (o.owner() == null) return;                         // skip the invisible root
        var tag = (o.type() == LIGHT) ? " (light)" :           // LIGHT: undocumented but used by example
                  (o.family() == NGONFAMILY) ? " (mesh)" : "";
        print(new Array(d).join("  ") + o.getParameter("name") + tag);
    });
}
```

When exporting, don't descend into creator objects, because their children are inputs. Feature-detect the method name: the native method was spelled `isCeatorObj` before 7b20 #12218.

```js
function isCreator(o) {
    return o.isCreatorObj ? o.isCreatorObj() : (o.isCeatorObj ? o.isCeatorObj() : false);
}
```

#### B2. Iterate mesh polygons (world space, UVs, triangles, materials)

Sources: (ex: Simple ASCII Export.js), #4594, #11075, #5391.

```js
function dumpMesh(obj) {
    if (obj.family() != NGONFAMILY) return;
    var core = obj.modCore();                  // evaluated mesh (after modifiers); local space
    var M = obj.obj2WorldMatrix();
    var mattags = obj.materialTags();
    var p, c, t;
    for (p = 0; p < core.polygonCount(); p++) {
        var size = core.polygonSize(p);
        var mt = core.materialTagIndex(p);     // >= mattags.length means no material
        var matIndex = (mt < mattags.length) ? mattags[mt].linkedToMaterial() : -1;
        for (c = 0; c < size; c++) {
            var vi = core.vertexIndex(p, c);
            var w  = M.multiply(core.vertex(vi));          // world position
            var uv = core.uvCoord(p, c);                   // Vec4D: x,y = UV1; z,w = UV2
        }
        for (t = 0; t < size - 2; t++) {
            var tri = core.triangle(p, t);                 // 3 polygon-local corner indices
            var a = core.vertexIndex(p, tri[0]), b = core.vertexIndex(p, tri[1]), d = core.vertexIndex(p, tri[2]);
        }
        var n = core.normal(p);                            // face normal
        var sel = core.polygonSelection(p);
    }
}
```

#### B3. Build a mesh with UVs (grid)

Sources: (ex: GrapherUV.js). It reuses `Vec2D` objects through `.set()` to avoid allocation in loops #718.

```js
function buildObject(obj) {
    var core = obj.core();
    var nu = 10, nv = 10, i, j;
    for (i = 0; i <= nu; i++)
        for (j = 0; j <= nv; j++)
            core.addVertex(false, new Vec3D(i / nu - 0.5, 0, j / nv - 0.5));

    var row = nv + 1;
    var idx = [0, 0, 0, 0];
    var uv  = [new Vec2D(0, 0), new Vec2D(0, 0), new Vec2D(0, 0), new Vec2D(0, 0)];
    for (i = 0; i < nu; i++) {
        for (j = 0; j < nv; j++) {
            idx[0] = i * row + j;       uv[0].set(i / nu,       j / nv);
            idx[1] = (i + 1) * row + j; uv[1].set((i + 1) / nu, j / nv);
            idx[2] = (i + 1) * row + j + 1; uv[2].set((i + 1) / nu, (j + 1) / nv);
            idx[3] = i * row + j + 1;   uv[3].set(i / nu,       (j + 1) / nv);
            core.addIndexPolygon(4, idx, uv);   // indices must already exist (crash otherwise)
        }
    }
}
```

For a mesh made from free-floating quads with welded vertices, use `core.buildVertexBSP(min, max)`, then `core.addPolygon(4, true, [Vec3D...])` per quad, then `core.destroyVertexBSP()`. Source: (ex: Menger.js).

To set UVs on an existing mesh (Macro/Tool), call `core.setUVCoord(p, c, new Vec2D(u, v))` (set 1) or pass `new Vec4D(u1, v1, u2, v2)` (both sets), then `obj.update(); doc.redrawAll();` #9816 #4058.

#### B4. Build a spline

Splines are only drawn inside a Splineobj `buildObject` (see A5). From a Macro, create built-in spline objects instead:

```js
// Macro: text spline extruded. Sources: [#6801], [#1577]
function main(doc) {
    var ext  = doc.addObject(EXTRUDE);
    var text = doc.addObject(TEXT);
    text.setParameter("text", "Hello");          // lowercase name [#1577]
    ext.addChildAtIndex(text, 0);                // text becomes the extrude's profile
    ext.update();
}
```

To read a spline's points, sample the tessellated cache. Source: (ex: splineExport.js).

```js
function splinePoints(splineObj) {
    var out = [], M = splineObj.obj2WorldMatrix(), core = splineObj.core();
    for (var i = 0; i < core.pathCount(); i++) {          // handle multiple paths [#8863]
        var pts = core.cache(i);
        if (pts == null) continue;
        for (var j = 0; j < pts.length; j++) out.push(M.multiply(pts[j]));
    }
    return out;
}
```

#### B5. Add a material and assign it

Sources: (docs: Document) (`addMaterial`), #8015 (SHADERTAG + `"material"`), #1055 (`diffColor` on node 0), #2695 (per-selection). **VERIFY in 8.1.1** (gotchas Verify #8).

```js
function main(doc) {
    var obj = doc.selectedObject();
    if (obj.owner() == null) return;

    var mat = doc.addMaterial("Material", "Red");          // documented: (shader type, name)
    var shader = mat.nodeAtIndex(0);                        // FORUM: node 0 is the shader node; VERIFY vs rootNode()
    shader.setParameter("diffColor", new Vec4D(1, 0, 0, 1)); // FORUM param name; components 0..1

    var tag = obj.addTagOfType(SHADERTAG);                  // material tag (type 102)
    tag.setParameter("material", mat);                      // FORUM: link param on the tag

    // Optional: restrict to polygon selection k (0..24):  tag.setParameter("shadeSelection", k + 1);  [#2695]
    obj.update();
    doc.redrawAll();
}

// Reading an object's materials (documented; confirmed by Simple ASCII Export):
function materialsOf(doc, obj) {
    var res = [], tags = obj.materialTags();
    for (var i = 0; i < tags.length; i++) res.push(doc.materialAtIndex(tags[i].linkedToMaterial()));
    return res;
}
```

To list parameter names on a material or node, use `mat.parameterInfo()` and `node.inputCount()/inputAtIndex(i).name()`. Node IDs for `addConnection` come from `node.id()` (FORUM) #9078.

#### B6. Keyframe a parameter through FCurves (6.0+)

Sources: #1946 (tg_jp), (ex: Scale Take.js), #9041.

```js
// Keys "position".y at the given times (seconds) with spline interpolation.
function keyPositionY(doc, obj, times, values) {
    var takeName = doc.currentTake().name;              // Take.name is a property
    var param = obj.parameterWithName("position");
    var node  = param.takeNodeWithName(takeName) || param.addTakeNode(takeName);
    var curve = node.fCurveAtIndex(1);                  // Vec3D: 0=x, 1=y, 2=z
    curve.removeAllKeys();
    for (var i = 0; i < times.length; i++) {
        var k = new FCurveKey();
        k.time  = times[i];                             // SECONDS, not frames
        k.value = values[i];
        k.left_type  = SPLINE_INTERPOL;  k.left_time  = -0.1; k.left_value  = 0;  // handles are RELATIVE
        k.right_type = SPLINE_INTERPOL;  k.right_time =  0.1; k.right_value = 0;
        k.selected = false;
        curve.addKey(k);
    }
    curve.update();                                     // always, after editing
}

function main(doc) {
    var obj = doc.selectedObject();
    if (obj.owner() == null) return;
    var fps = 30;                                       // no frame-rate API: ask the user [#8696]
    keyPositionY(doc, obj, [0, 12 / fps, 24 / fps], [0, 1, 0]);
    doc.redrawAll();
}
```

To edit existing keys, call `var k = curve.keyAtIndex(i)`, modify it, then `curve.setKeyAtIndex(k, i)` and finally `curve.update()` ((ex: Scale Take.js)). To read the animated value, call `curve.valueAtTime(t)`.

#### B7. Read and write a file

Sources: (ex: Simple ASCII Export.js), (ex: splineExport.js), #2247, #10841, #12183, #9707.

```js
function writeText(path, lines) {
    var f = new File(path);                  // absolute path; "~" is NOT expanded [#2247]
    f.open(WRITE_MODE);                      // creates the file if missing
    if (!f.isOpen()) return false;
    for (var i = 0; i < lines.length; i++) f.writeln(lines[i]);
    f.close();
    return true;
}

function readText(path) {
    var f = new File(path);
    if (!f.exist()) return null;
    f.open(READ_MODE);
    if (!f.isOpen()) return null;
    var s = f.read(f.size());                // whole file; or loop f.readln() until it returns -1
    f.close();
    return s;
}

function main(doc) {
    var path = OS.runSavePanel("txt");       // full path or null
    if (path == null) return;
    writeText(path, ["hello", "world"]);
    var dir = new File(path).directory();    // folder of the chosen file
    // Shell: always single-quote paths [#9707]; no stdout capture, redirect to a file instead.
    OS.system("ls '" + dir.replace(/'/g, "'\\''") + "' > /tmp/c3d_ls.txt");
    print(readText("/tmp/c3d_ls.txt"));
}
```

#### B8. Include a shared library with indirect eval

Sources: #9039, #12183, #9290. Put library files in `~/Library/Application Support/Cheetah3D/Scripts/Library/`. That folder is not a type folder, so it never appears in the menus.

```js
// --- in your Tool / Polygonobj / Splineobj / Tag / Particle script ---
var geval = eval;                       // INDIRECT eval => definitions land in global scope

function loadLibrary(host, fileName) {  // host: any Base (tool/obj/tag) — has scriptPath()
    var m = host.scriptPath().match(/^(.*\/Cheetah3D\/Scripts\/)/i);
    if (!m) { print("loadLibrary: cannot locate Scripts folder"); return false; }
    var f = new File(m[1] + "Library/" + fileName);
    if (!f.exist()) { print("loadLibrary: missing " + fileName); return false; }
    f.open(READ_MODE);
    var src = f.read(f.size());
    f.close();
    geval(src);                         // a direct eval() here would stay function-local [#9290]
    return true;
}

function buildUI(tool) {
    loadLibrary(tool, "myLib.js");
    tool.addParameterButton("run", "Go", "run");
}
function run(tool) { MyLib.hello(tool); }
```

```js
// --- Scripts/Library/myLib.js : namespace everything to avoid global clashes ---
var MyLib = new function () {
    this.hello = function (host) { print("MyLib loaded for " + host.getParameter("name")); };
};
```

Notes:

- The library is re-read on each load, so it can be edited without restarting Cheetah3D.
- Macros receive a `Document`, which does not document `scriptPath()` (VERIFY). In a Macro, either hard-code the path, or get `$HOME` through `OS.system("echo $HOME > /tmp/c3d_home.txt")` and read that file #6458.

#### B9. Render frames to files

Sources: (ex: RotateObject.js), (ex: QTVR Helper.js), #2262, #2110, #5998, #10025.

```js
function main(doc) {
    var path = OS.runSavePanel("png");
    if (path == null) return;
    var f = new File(path);
    var dir = f.directory() + "/";
    var base = f.lastPathComponent().split(".")[0];

    var fps = 30, first = 0, last = 47;                  // no fps API: hard-code or ask
    var saved = doc.animPosition();                       // 6.0+
    // 7.0+: resolution is on the renderer, not the camera [#10025]
    // doc.currentRenderer().setParameter("resolution", new Vec2D(1280, 720));   // VERIFY
    for (var fr = first; fr <= last; fr++) {
        doc.setAnimPosition(fr / fps);                    // seconds
        var name = dir + base + ("000" + fr).slice(-4) + ".png";
        doc.render(name);                                 // synchronous; format from extension (VERIFY)
    }
    doc.setAnimPosition(saved);
}
```

For changes the timeline doesn't drive, such as rotating an object between renders, set the parameter, call `obj.update()`, then call `doc.render(path)` ((ex: RotateObject.js)). After joint or skin edits, call `update()` on every object, children first, before rendering #5998.

#### B10. Deterministic PRNG (stable across rebuilds and reloads)

`buildObject` re-runs often, so `Math.random()` makes geometry change on its own. Use a seeded generator driven by a parameter. Sources: (book: Particle City LCG), #1294, #8033, #13601.

```js
// Small LCG (from the book). Good enough for layout jitter; not for statistics.
function makeRng(seed) {
    var s = (Math.floor(seed) >>> 0) % 233280;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
function buildUI(obj) {
    obj.setParameter("name", "Scatter");
    obj.addParameterInt("random seed", 12345, 0, 999999, true, true);  // not "seed"/"type"
    obj.addParameterInt("count", 50, 1, 5000, true, true);
}
function buildObject(obj) {
    var rnd = makeRng(obj.getParameter("random seed"));   // re-seed on EVERY build
    var core = obj.core();
    for (var i = 0; i < obj.getParameter("count"); i++) {
        var x = rnd() * 2 - 1, z = rnd() * 2 - 1, h = 0.05;
        core.addPolygon(4, false, [new Vec3D(x - h, 0, z - h), new Vec3D(x + h, 0, z - h),
                                   new Vec3D(x + h, 0, z + h), new Vec3D(x - h, 0, z + h)]);
    }
}
```

Particle objects already have a built-in Int `seed` parameter; use `obj.getParameter("seed")` there (book).

#### B11. Introspect anything (first thing to run on an unknown object)

Sources: (ex: Parameter Info.js), (book `describe()`), #5550, #7187.

```js
function str(v) {                                  // print() needs strings
    if (v == null) return "null";
    if (typeof v != "object") return "" + v;
    if (v.w !== undefined) return "(" + v.x + "," + v.y + "," + v.z + "," + v.w + ")";
    if (v.z !== undefined) return "(" + v.x + "," + v.y + "," + v.z + ")";
    if (v.y !== undefined) return "(" + v.x + "," + v.y + ")";
    return "[object]";
}
function describe(doc, b, label) {
    print("-- " + label + " type=" + b.type());
    var info = b.parameterInfo();                  // [[name, typeString], ...]
    for (var j = 0; j < info.length; j++) {
        var val = (info[j][1] == "Link") ? "<link>" : str(b.getParameter(info[j][0]));
        print(info[j][0] + " [" + info[j][1] + "] = " + val);
    }
}
function main(doc) {
    var obj = doc.selectedObject();
    if (obj.owner() == null) { print("nothing selected"); return; }
    describe(doc, obj, "object");
    for (var i = 0; i < obj.tagCount(); i++) {
        var tag = obj.tagAtIndex(i);
        describe(doc, tag, "tag " + i);
        if (tag.type() == SHADERTAG) describe(doc, doc.materialAtIndex(tag.linkedToMaterial()), "material");
    }
}
```

#### B12. Tool that edits the children of the selection, with undo [VERIFY merge behaviour]

See Distribute Selected.js for the full script.

```js
function buildUI(tool) {
    tool.addParameterSelector("axis", ["X","Y","Z"], false, false);
    tool.addParameterButton("go", "Apply", "apply");
}
function apply(tool) {
    var doc = tool.document(), parent = doc.selectedObject();
    if (parent == null || parent.owner() == null) { OS.messageBox("Tool", "Select a parent object."); return; }
    doc.retainRedrawLock();
    try {
        for (var i = 0; i < parent.childCount(); i++) {
            var c = parent.childAtIndex(i), pos = c.getParameter("position");
            if (c.recordParametersForUndo) c.recordParametersForUndo();   // 6.0+
            c.setParameter("position", new Vec3D(pos.x, pos.y, pos.z));   // ...modified
            c.update();
        }
    } finally { doc.releaseRedrawLock(); doc.redrawAll(); }
}
```

# Gotchas

The things the official docs leave out, get wrong, or no longer describe correctly. This page is for anyone (human or AI) writing Cheetah3D JavaScript for **8.x**.

**Sources and conventions**

- Forum citations look like #574. Each one links to the archived thread (`forum/threads/<id>-*.md`). The thread's dates are in `catalog/forum-threads.json`.
- "Docs" means the official 8.1.1 reference in `reference/api/*.md`. A link like (docs: Base) points to a page there.
- "Example" means a script bundled with 8.1.1 in `examples/official/`, linked like (ex: Parameter Info.js). These are the best evidence of what still works in 8.x.
- **(pre-7; unverified in 8.x)**: the claim comes only from threads that end before Cheetah3D 7 (about 2016) and nothing newer confirms it.
- **DOCS-CONFLICT**: the forum or an example contradicts the 8.1.1 reference.
- **DOCS-GAP**: the forum or an example relies on behaviour or API that the reference does not document.
- **[verify]**: the claim is on the "Verify in app" list at the end.

---

### 1. Script types and installation

- **The folder decides the script type, not the file contents.** User scripts live in `~/Library/Application Support/Cheetah3D/Scripts/<Type>/`. The types are `Macro`, `Tool`, `Polygonobj`, `Splineobj`, `Particle` and `Tag`. The docs write `scripts` in lowercase; the forum and examples write `Scripts`. The macOS filesystem is case-insensitive, so both work. (docs: ExecuteScript) #808 #1294 #2627 #5752 #6652 #7522 #8307 #9025
- **A script in the wrong folder fails in confusing ways.** Possible symptoms:
  - `Object.setParameter() couldn't find parameter called name` or `... normalType`, because the host object is a different kind #970 #4334 #10257
  - `'undefined' is not a function (evaluating 'core.addParticle()')`: a Particle script in Polygonobj gets a PolyCore #7356
  - the script silently does nothing: a Macro in Tool, or a main() script anywhere other than Macro #989 #2565 #6373
  - a "Polygon script" object appears instead of a tool, or the app freezes or crashes #1099 #1298 #6367 #12264 #10416
  - JS errors in a spline or particle script #1284 #1456 #7347 #10106

  When debugging, check the folder first.
- **Only `.js` files are listed.** Unzip `*.js.zip` downloads. #808 #1448
- **New script files need a menu refresh.** Use the "Update Scripts Menu" / "Update menu" item at the bottom of the Script menu (5.x+), or relaunch. Edits to a script that is already listed are picked up without a restart; you may need to re-pick it from the menu. The docs only say "restart Cheetah3D" (DOCS-GAP). #812 #1145 #1294 #6373 (docs: ExecuteScript)
- **Subfolders inside a type folder are fine. A new top-level folder under `Scripts/` is not shown in the menus.** You can use that to hold shared library code: see `Scripts/Library` in §7. #9025 #12183
- **Scenes reference script objects and tags by script file name.** If you rename the `.js` file (even spaces to underscores), saved `.jas` files no longer find it and the stored parameter values are lost. Keep filenames stable across versions. #6905
- **Telling the type from the source** (heuristic from *Learn 3D with Cheetah 3D* (Tonio Loewald)):
  - `main(doc)` means Macro.
  - `buildObject` plus `addParticle` means Particle.
  - `buildObject` plus `move/line/curve` means Splineobj.
  - `buildObject` with neither means Polygonobj.
  - Only `buildUI`, maybe with `performExpression`, means Tag.
  - `buildUI` plus a button callback and no `buildObject` means Tool.

  See `reference/book-ch17.8-scripts.md`.
- **Only Tool scripts get a parameter panel**, and it is shown in the **Tool** tab of the properties panel. If your layout has no Tool tab, the tool seems to do nothing. Macros run immediately and have no UI. #2110 #10843 #12598
- **Tool parameter values reset every time the tool is invoked from the menu.** The tool-history hotkeys and the factory icon keep values. #2280
- **You cannot create a working script object from another script.** `doc.addObject(SCRIPTSPLINE)` followed by `setParameter("scriptName", path)` gives an object with no parameters (Martin, 7b19). There was also no documented way to set which script a script tag created this way runs. #12214 #11084
- **Hotkeys:** bind a script through macOS System Settings › Keyboard › App Shortcuts using the exact menu title (the file name), or through Cheetah3D's own shortcut settings. External automation (JXA/System Events) can then trigger macros. #2280 #3342 #6373 #11774
- **No native plug-ins and no loading of unsigned external code** (Mac App Store sandbox, 2012). Helper executables run through `OS.system` work. On macOS 10.12+, Gatekeeper must be allowed to run a bundled helper. #9039 #12343
- **The bundled examples start with an optional header comment**, `//C3D_VERSION_REQUIREMENT 7.0.0`, which presumably gates loading on older versions. DOCS-GAP. (ex: Particle Image.js)

### 2. Entry points and lifecycle

- **Hook functions by type.** Only these names are called; others are ignored.

  | Type | Hooks |
  |---|---|
  | Macro | `main(doc)` |
  | Tool | `buildUI(tool)`, plus button callbacks `fn(tool)` |
  | Polygonobj / Splineobj / Particle | `buildUI(obj)` once when the object is created, and `buildObject(obj)` on every rebuild |
  | Tag | `buildUI(tag)`, plus `performExpression(tag)` (7.0+) |

  `apply(tag)`, `buildObject(tag)` and `applyParameters(tag)` are **not** called on tags. #989 #1577 #4058 #10432 #13505 (ex: CircleExpression.js)
- **Expression tags (`performExpression`) are 7.0+ and missing from the docs** (DOCS-GAP: (docs: Tag) never mentions the hook).
  - Before 7, tag scripts could only add parameters: Martin in 2006 and again in May 2014. #574 #10432
  - By convention the first parameter is an Int named `priority` (`addParameterInt("priority",10,0,1000,true,true)`), which evidently sets evaluation order.
  - Inside the hook, use `tag.owner()` and `tag.document().animationTime()`.
  - Write with `owner.setParameter(name, v, false)`.

  #5752 #13505 (ex: CircleExpression.js)
- **The core is empty at the start of each `buildObject`.** Every official generator appends to `obj.core()` with no clearing step, so treat `buildObject` as "regenerate from scratch" (inferred from the examples). (ex: GrapherUV.js) (ex: Sinecircle.js) (ex: Particle Menger.js)
- **Calling `setParameter()` inside `buildObject()` causes an infinite rebuild loop.** This applies to the script object itself and to other objects or tags. It may only show up during final or movie rendering, after several good frames.
  - Always pass `false` as the third argument there.
  - Never write the script object's own parameters from `buildObject`.

  #574 #7885 #8338 #8739
- **Set `obj.setCreatorObj(true)` in `buildUI` if the script reads its children.** Otherwise `buildObject` is not re-run when a child changes (for example a spline being edited). #574 #1284 #1647 #1939
- **`buildObject` runs at unpredictable times**: viewport navigation, app re-activation, scene rebuilds, and every render. Anything unseeded, such as `Math.random()`, changes the shape: the official Grassy Knoll example does exactly this. Use a seeded PRNG (see patterns) or cache random values and only regenerate them from a button. #970 #1294 #8033 #13601 (ex: Grassy Knoll.js)
- **A script object only rebuilds during playback or rendering if one of its own parameters or transforms changes.** For simulations or time-driven output, add a `time`/`frame`/`timer` parameter and keyframe it (0 at the first frame, a large value at the last). Moving children, linked objects or parent-constrained children may **not** trigger a rebuild. #713 #3350 #4334 #7885 #9461 #8025 #9251 #574
- **Calling `obj.update()` on a script object re-runs its `buildObject`.** Script objects cannot read each other's JS globals; pass data through parameters or temp files. JS globals persist between `buildObject` calls of one script (the examples keep state in globals). #3377 (ex: Particle Menger.js) [verify]
- **Children of a Polygonobj/Splineobj script are treated as inputs, not rendered output.** Put visible geometry outside the script hierarchy, or generate it in `buildObject`. #2262 #9251
- **Order matters at render time.** A script object that drives other objects must sit **above** them in the Object Browser. #8338
- **Creating scene objects from inside `buildObject` is risky.** `document().addObject()` inside `buildObject` crashed in 2006 (3.x) #1072. A 2024 script does it safely by creating children **once** (`if (obj.childCount()==0)`) and then only updating their parameters with `child.update()` #14381. Prefer Macros or Tools for creating objects.
- **Long loops block the whole UI.** Hooks run synchronously on the main thread: no redraw, no progress bar, no background execution, and minutes-long beachballs on dense meshes. #3350 #3377 #7079 #10416
- **Scripts cannot react to selection changes or detect modifier keys**, and cannot attach to the document itself. Tag scripts can attach to any object, including cameras and folders. #11014 #9290
- **Version-specific crashes (4.3, fixed in the next release):**
  - `tool.document().animationEnd()` inside a Tool's `buildUI` crashed on first open.
  - `print()` in a Tool's `buildUI` printed nothing the first time.

  (pre-7; unverified in 8.x) #2375

### 3. Parameters

- **Every `addParameter*` call must receive all of its documented arguments**, including the trailing booleans. Omitting them can **crash** Cheetah3D rather than throw: `addParameterBool("x", true)` crashed 7.3.3, 7.5.2 and 8.0b3.
  - Note: the official Menger.js calls `addParameterBool(name, init, min, max)` with 4 of 6 arguments, so some short forms survive. Do not rely on that. [verify]

  #11084 #14327 (ex: Menger.js)
- **`addParameterBool` really does take `(name, init, min, max, animate, build)`**, with boolean min and max. That looks odd, but it is not a doc typo. Pass `false, true` for min and max. #1326 #14327 (docs: Base)
- **Only call `addParameter*` inside `buildUI()`** (docs). Calling `buildUI()` yourself from a Macro still crashed in 2015. Macros cannot add editable parameters to arbitrary objects. #11084 (docs: Base)
- **The parameter name is also the UI label, and it is case-sensitive.** For example, a Text spline uses `"text"`, not `"Text"`. #1577 #13505
- **Reserved and colliding names: do not reuse built-in parameter names for your own parameters.** Script objects already carry these, as seen in parameter dumps:
  - `name`, `scriptName`, `locked`, `position`, `rotation`, `scale`, `shear`, `pivot`, `prefrot`, `postrot`, `prerot`, `rotorder`, `order`
  - `editorActive`, `renderActive`, `editorShading`, `displayType`
  - `seed` on particle objects
  - a hidden `type`

  A parameter named **`type`** made the object vanish after save and reopen. #1294 #10025 (book)
- **Exception: `normalType` and `normalAngle` on polygon scripts.** The 8.x GrapherUV example deliberately declares parameters named `normalType` (selector flat/phong/constraint) and `normalAngle`, then calls `setParameter("normalType",1)`. Re-declaring those names is how a polygon script exposes the host's smoothing controls. Old forum code calls `setParameter("normalType"/"normalAngle", ...)` without declaring them. #812 #4442 #10572 #13746 (ex: GrapherUV.js) [verify]
- **Parameter names containing a dot broke in 7 beta 18** (fixed in b19). Avoid dots anyway: `.tex` is a real suffix, see the texture bullet below. #8338
- **Parameter names must be unique within one script.** Two selectors with the same name share state. #10025
- **The third argument of `setParameter(name, value, update)`**: `false` suppresses the scene-graph update. Use it in `buildObject` and `performExpression`, and when writing from one object to another. The overload was added in 3.2 and has been reliable since 3.3. With `true` or omitted, the scene updates and the material preview refreshes, although the color well might not. #574 #1055 #5752 #7885 #8739 (ex: CircleExpression.js) (docs: Base)
- **Selectors:**
  - `getParameter` on a selector returns the selected **index**. Wrap it in `parseInt()` before using it in a `switch`.
  - `setParameter(name, index)` sets it.
  - Option labels go through Cheetah3D's `Localizable.strings`, so `"point"` may display as "Points".
  - A selector with a very long option list was suspected of crashing (Leopard era).

  #1145 #4058 #6801 #10025 (ex: GrapherUV.js)
- **Defaults.** Script objects have no UI for user defaults. Set initial values in `buildUI` *after* adding the parameters, for example `obj.setParameter("name","My Thing")` or `obj.setParameter("connect", true)`. Min and max limits come only from the `addParameter*` arguments; to raise a limit, edit the script. #10603 #664 (ex: GrapherUV.js)
- **Button callbacks** are given by name as a string: `addParameterButton(label, buttonTitle, "fnName")` calls the global `fnName(obj)`. #989 #1801 #3377 (ex: Scale Take.js)
- **A Tool text field being edited is not committed until it loses focus.** Clicking a button straight after typing uses the old value. #6600 #1326
- **`getParameter` on a name the object lacks throws.** The error is "couldn't find parameter called X". Guard by checking `obj.parameterInfo()` (an array of `[name, typeString]`) or `obj.parameterWithName(name)` first. #3610 #4374
- **Discover names with introspection, not the docs.**
  - Use `parameterInfo()`, or `parameterCount()`/`parameterAtIndex(i).name()`/`.type()`.
  - The bundled Macro `Parameter Info.js` prints them.
  - Parameter names change between versions: light parameters changed in 3.1→3.2 and 3.4→3.5, and material parameters in 5.0.

  #626 #1055 #5550 #7671 #9038 #9627 (ex: Parameter Info.js)
- **When dumping, skip `getParameter` on `Link`-type entries,** or print them specially. `print()` needs strings (§10). #7187 #8220
- **Link parameters.** `addParameterLink(name, build)` gives an object picker; `getParameter(name)` returns the linked **object** (or null). Links are a cleaner input than relying on child order.
  - A Link to animated particles does not trigger a rebuild when they move.
  - IK and constraint `target`/`pole` links did not copy through get/setParameter in mirror-copy scripts.

  #10106 #10603 #13505 #14324 #8025 #1448 #12535
- **Texture parameters.** `getParameter("Tex")` returns the **path string**; `getParameter("Tex.tex")` returns a `Texture` object (`width`, `height`, `sample(s,t)`, `pixel(x,y)`) or null. This removes the old need to shell out to `sips` for image size. (docs: Texture) (ex: Particle Image.js) #2247 #11838
- **Particle objects already have an Int `seed` parameter.** It is not called "Random Seed" or "particlesSeed". Read it with `obj.getParameter("seed")`. (book)

### 4. Geometry: PolyCore, SplineCore, ParticleCore

- **Accessors return copies.** `core.vertex(i)` returns a copy, so `core.vertex(i).add(v)` changes nothing. Write it back: `core.setVertex(i, core.vertex(i).add(v))`. The same applies to `getParameter("position")` and the like: change the value, then call `setParameter`. #3528 #1226 (ex: RotateObject.js)
- **Use the return values of Vec3D math.** Treat `add/sub/multiply/cross` as returning new vectors (as the examples do); only `set()` is documented as changing the vector in place. [verify] (ex: Particle Menger.js)
- **`core()` and `modCore()` are different.**
  - `core()` is the editable base mesh; it is empty (vertexCount 0) for creators and folders.
  - `modCore()` is the mesh after modifiers, for reading.
  - **Neither includes the object transform.** For world space, multiply by `obj.obj2WorldMatrix()`. For a child's geometry relative to the script object, use the child's `objMatrix()`.
  - Child or parent scaling is not reflected in `getParameter("scale")`.

  #718 #970 #1099 #1298 #3537 #4594 #5391 #6840 #10525 #12987 (ex: Simple ASCII Export.js)
- **Skinned (Skeleton-tag) meshes report pre-deformation positions** from `core()`/`modCore()`. #10525
- **After editing an object's mesh from a Macro or Tool, call `obj.update()`.** Then call `doc.redrawAll()` if needed. Forum code even calls `setVertex` on a `modCore()` and then `update()`. #6840 #8165 #9816 (docs: Object)
- **Vertices are shared and indexed.** `vertexCount()` is not the number of corners. Map polygon corners to vertices with `vertexIndex(p, c)`. #10400 #1939
- **UVs are per polygon corner and come back as a `Vec4D`** (since 4.6). x,y hold UV set 1 and z,w hold UV set 2: `uvCoord(p,c).x/.y` give U/V. Deduplicate them yourself for exporters. #2280 #5391 #11075 #4058 (ex: Simple ASCII Export.js)
- **Pass Vec2D UVs to `addIndexPolygon`.** Since 4.6, passing `uvCoord()`'s Vec4D results errors with `Wrong elemet in uv array`; convert with `new Vec2D(uv.x, uv.y)`. **DOCS-CONFLICT**: the 8.1.1 docs list an `addIndexPolygon(size, vindex[], Vec4D uv[])` overload, so this may have been fixed. The official GrapherUV uses `Vec2D`, which is the safe choice. #466 #1294 #1731 #8015 (ex: GrapherUV.js) [verify]
- **`setUVCoord(p, c, uv)` accepts `Vec2D` (set 1) or `Vec4D` (both sets).** A generated mesh can carry two UV sets; Hair.js puts the base UV in set 1 and its own UV in set 2. #4058 #9816 #1294 (docs: PolyCore)
- **Polygon script objects get no UVs automatically.** If you don't generate them, textures don't map and only flat colour shows. #2581
- **There is no vertex colour API** (8.x, 2025). The workaround is to store per-vertex data in a UV channel. #14613
- **Two ways to build a mesh:**
  - `addVertex(false, v)` returns an index, then `addIndexPolygon(n, indices[, uvs])`.
  - `addPolygon(n, true, [Vec3D...])` with `meshed=true` welds coincident vertices.

  Wrap bulk `addVertex(true, ...)`/`addPolygon(..., true, ...)` in `buildVertexBSP(min,max)` … `destroyVertexBSP()` for speed. #4058 #10572 #13746 (ex: Grassy Knoll.js) (ex: Menger.js)
- **`addIndexPolygon` with a nonexistent vertex index can crash** (docs). Malformed faces, such as bad indices or some degenerate n-gons that File › Import accepts, crashed in `MWMValenceTable::buildValenceTable` in 2020. Validate faces before adding them. #13746 (docs: PolyCore)
- **Winding**: reverse the order of OBJ-style indices to match Cheetah3D's winding. `flipWinding(p)` flips one polygon. (book) #13746
- **Moving vertices onto each other does not weld them.** Use `mergeVertices(tol)`, or rebuild the polygons with `addIndexPolygon` pointing at the kept index. #1226 (docs: PolyCore)
- **Triangles:** for `t` in `0..polygonSize(p)-3`, `core.triangle(p,t)` returns 3 **polygon-local corner** indices; map them through `vertexIndex(p, c)`. `triangle()` is read-only, and centroid code built on it failed on some non-convex n-gons. Cheetah's general tessellator is not otherwise exposed. #1226 #4594 #11075 #4810 #1327 (docs: PolyCore)
- **`materialTagIndex(p)` is read-only.** To assign materials per polygon, use polygon selections:
  - Call `setActivePolygonSelection(k)`, then `setPolygonSelection(p, true)`.
  - Then set the material tag's `shadeSelection` to **k+1**; 0 means all polygons.
  - A return value ≥ `materialTags().length` means "no material".

  #467 #2695 #5391 (ex: Simple ASCII Export.js)
- **A script that rebuilds a source mesh must copy its UVs and polygon selections** too, or the source's per-selection materials stop rendering. #7259 #10920
- **Guard before using vertex methods.**
  - Return early if `core.vertexCount()==0`.
  - Initialize bounding boxes from `vertex(0)`, not from zero.
  - To check for a polygon core, test `typeof core.polygonCount == "function"` (`instanceof PolyCore` is false).

  #3537 #4810 #10400
- **Built-in classes cannot be extended through `.prototype`.** This varied over time: it worked in 2007–08, assigning `Vec*.prototype.toString` broke scripts in 5.2, and it failed outright in 2014. Wrap native objects in your own JS objects instead. `instanceof Vec3D` does not work either. #1298 #1327 #1448 #3377 #10400 #10415
- **Avoid allocating `new Vec3D`/`Mat4D` inside hot loops.** Reuse objects through `.set()`. Removing allocations nearly doubled speed (Martin). Pure-JS mesh algorithms on about 100k polygons can hit "out of memory"; work with indices and avoid O(n) array searches. #718 #1395 (ex: GrapherUV.js)
- **Coincident vertices and boolean-generated n-gons break topology code.** Run Optimize first, or null-check your adjacency results. #1395
- **Splines: draw only inside a Splineobj `buildObject`:**
  1. Call `move(p)` first; it starts a new path.
  2. Then call `line(p)` / `curve(cp1, cp2, p)`.
  3. Optionally call `close()`.

  Drawing into an existing spline from a Macro crashed in 2008. #3377 #12214 #6600 (ex: Sinecircle.js) (ex: Bounce.js)
- **Reading splines:** there is no control-point accessor in the docs. Use `core.cache(i)`, which returns the tessellated `Vec3D[]` of path `i`, for `i < pathCount()`. Handle **multiple paths**: edited or Text-derived splines often have several. Points are local; multiply by `obj2WorldMatrix()`. #1298 #8863 #1099 (ex: splineExport.js)
- **Several `move()` calls produce several contours.** A spline script that outputs an outer contour plus holes works under an Extrude creator; scripted splines also work under Lathe and Sweep. #14379 #14384 #6607 #8025
- **Closing a 360° Bezier with float `%` on angles can leave a tiny gap.** Snap the angle. #6607
- **A Sweep created with `addObject(SWEEP)` has no SplineCore.** Add spline children (profile and path) instead. #14381 #8025
- **Particles:** in a Particle script, `obj.core()` is a ParticleCore.
  - Create particles with `core.addParticle()`, then call `setPosition/setRotation/setScale`.
  - Rotations are XYZ Euler angles in degrees.
  - `setIndex(n)` did not reliably choose the instanced child in 2014; the workaround was a Particle tag with frequency 0.
  - Particle Mesh needs at least one child, and lights inside instanced objects are not instanced.
  - Docs typo: Particle.md lists the setter as `void getDeath(Number)`; presumably it is `setDeath`. [verify]

  #6905 #8469 #10106 #10374 (ex: Particle Menger.js) (docs: Particle)
- **Particle output does not export to OBJ** through `saveToFile`, and does not render when nested in itself. Convert it with Tools › Particle › Particle->Polygon first. Double-clicking a particle object's icon converts it to a raw particle object irreversibly. #2110 #6905 #7169

- **Polygon winding and facing (unconfirmed).** The KB has no documented statement of which corner order faces outward. Don't guess: build the mesh, then for a closed convex shape compute each face normal `(b-a)×(c-a)` and its centroid. If the normal points toward the object's centre, call `core.flipWinding(p)`. This is the technique of the forum's Surface Utilities script. Cheetah3D stores no per-polygon normal and only derives it from winding plus the smoothing settings. #7077 #7079 [verify]

### 5. Objects, tags, materials

- **Lights are all type `LIGHT` (5.x+). DOCS-CONFLICT.**
  - Constants.md lists `POINTLIGHT/SPOTLIGHT/DISTANTLIGHT/AREALIGHT` and does **not** list `LIGHT`.
  - Since 5.x, `SPOTLIGHT`, `DISTANTLIGHT` and `AREALIGHT` give `Can't find variable`.
  - The light kind is the Int parameter `lightType` (spot = 4); brightness is `intensity`.
  - The 8.x example `Scale light intensity.js` tests `type()==LIGHT`, which confirms it.
  - Use `LIGHT` (or `family()==LIGHTFAMILY`) and verify the 8.x `lightType` values.

  #5550 #9038 #10090 #1326 #6297 (ex: Scale light intensity.js) [verify]
- **Undocumented constants that exist** (2013–14 dumps): `LIGHT`(5), `JOINT`(45), `SMARTFOLDER`, `DOFTAG`(110), `TARGETTAG`(111), `RENDERTAG`(114), `SPLINETRACKINGTAG`, `FOGTAG`, `RADIOSITYTAG`, `HDRITAG`, `TONEMAPPINGTAG`, `CAUSTICTAG`, `PIVOT_MODE`, `EOF`(-1), `IDENDITY`(sic), and the interpolation constants (`SOFT_INTERPOL`=0, `LINEAR_INTERPOL`=1, `SPLINE_INTERPOL`=2, `FLAT_INTERPOL`=3).
  - Some types had **no** constant: Subdivision modifier (42), Sky Light (55), Turbulence force (80).
  - `UVTAG` is documented but was missing.
  - DOCS-GAP. The numbers shown are 6.x values; compare against the names, not hard-coded numbers.

  #9625 #10090 #9038 #8739
- **Enumerate all constants** by iterating the global object: `var g=(function(){return this;})(); for (var k in g) ...`. Values collide across groups, so a reverse lookup needs context. #9038 #9625
- **`doc.selectedObject()` returns the invisible root, not `null`, when nothing is selected.** The official sample's `if(obj==null)` check never fires; test `obj.owner()==null` (or `obj == doc.root()`). DOCS-GAP. #10088 (ex: Parameter Info.js)
- **Multiple selection**: 8.1.1 documents `doc.selectedObjects(flat)`. Forum code from 2011 predates it and used only `selectedObject()`. #7079 (docs: Document) [verify]
- **Objects are not indexable by name.** `doc['x']` and `delete` do nothing; to find one, recurse from `doc.root()` and compare `getParameter("name")`. #9213 #4442 #10376
- **Deleting objects and reordering them.**
  - 2008–2010 forum: no delete API. 8.1.1 documents `obj.removeChild(child)`, `doc.removeMaterial(mat)` and `obj.removeTag(tag)`.
  - `parent.addChildAtIndex(child, i)` re-parents a child, or reorders it when it is already a child.
  - Docs typo: `addChildAtIndex` is listed as returning a `Tag`.

  #3377 #6458 #6098 (docs: Object)
- **Children inherit their parent's transform.** To group generated objects without compounding scale, parent them under `doc.addObject(FOLDER)`. #1801 #1802
- **`isCreatorObj()` was spelled `isCeatorObj()` natively until 7 beta 19.** It was fixed in b20, and the typo is kept for compatibility. Code targeting 6.x must call the misspelled name. #12218 #5550 #10025 (ex: Simple ASCII Export.js)
- **There is no clone, Make Editable, or Coord-System (Burn/Center pivot) API.** Reimplement them yourself.
  - **Copy** an object with `addObject(obj.type())`, then copy its parameters, material tags and geometry.
  - **Burn a transform**: `setVertex(i, objMatrix().multiply(vertex(i)))`, then reset position and rotation to 0 and scale to 1.
  - **Move the pivot**: offset the vertices, then set `position` (`pivot` is also a Vec3D parameter), then call `update()`.

  #8015 #8514 #7212 #4810 #12767 #12264
- **Common parameter names** (discover yours with `parameterInfo()`):
  - Box: `sizeX/sizeY/sizeZ` (not `scale`).
  - Text: `text` and `textFont` (a PostScript font name).
  - Extrude: `dirX/dirY/dirZ`, `steps`, `bevelRadius`, `bevelType`.
  - Polygon smoothing: `normalType` (0 = flat) and `normalAngle`.
  - Camera: `fieldOfView`, `focalDistance`, `activeCamera`, `focusOnObject`.
  - Joint: `rotation` plus `prerot/prefrot/postrot`; set them all to reset a joint.
  - Skylight `date`: a float, minutes since Jan 1 00:00.

  #1802 #6801 #812 #4442 #10025 #10829 #13505 (ex: QTVR Helper.js)
- **Rotation vectors expose `.h .p .b` as well as `.x .y .z`.** DOCS-GAP: Vec3D.md lists only x,y,z. `new Mat4D(ROTATE_HPB, h, p, b)` and `new Mat4D(ROTATE, x, y, z)` take **degrees** (undocumented). #4366 #946 (ex: RotateObject.js) (docs: Mat4D)
- **Orientation conventions:**
  - Lights point down −Y by default; cameras look down −Z (−Z is the "front" view in QTVR Helper).
  - Mat4D translation is in `m03/m13/m23`.
  - Mat elements are named fields (`m00..m33`), not `m[i][j]`.

  #1161 #4366 #3528 #6604 (ex: QTVR Helper.js)
- **`activeCamera()` has no setter.** Set `activeCamera` to 0 on the old camera and 1 on the new one, then call `update()` on both. The Object Browser may not refresh. #4856
- **Tag type 102 is the material ("shader") tag (`SHADERTAG`).** It holds no material properties; get the material with `doc.materialAtIndex(tag.linkedToMaterial())`, which the 8.x Simple ASCII Export confirms. Around 5.0 this briefly broke, and `tag.getParameter("material")` (a Link) was the workaround. #2183 #3610 #7187 #3376 (ex: Simple ASCII Export.js)
- **Assign a material**: `var t = obj.addTagOfType(SHADERTAG); t.setParameter("material", mat);`. This works since roughly 6.x; in 2008–2010 there was no way. #8015 #3376 #6604 #1607 [verify]
- **Materials are node-based since 5.0.**
  - Old flat parameters (`colorColor`, `colorTex`, `specTex`, `transColor`, …) stopped working in 5.0.
  - Read-only shortcuts remain: `color()`, `colorMap()`, `emission()`, `shininess()`.
  - To set a property, set it on a node, for example `mat.nodeAtIndex(0).setParameter("diffColor", new Vec4D(r,g,b,1))`.
  - The node API (`nodeCount/nodeAtIndex/rootNode/addNodeOfType/addConnection`) appeared in **6.2.1**; older versions throw `'undefined' is not a function`.

  #1055 #1210 #4085 #5514 #7187 #9730 #10280 #9078 (docs: Material)
- **`Material.rib()` was removed in 5.0** but is still documented in 8.1.1 (DOCS-CONFLICT). It throws `'undefined' is not a function`. #1210 #8220 #9078 (docs: Material)
- **`node.id()` is undocumented but works.** It returns the numeric ID that `addConnection(fromID, fromPara, toID, toPara)` needs.
  - `Parameter.connected()` is true only on the **input** side of a connection.
  - `outputAtIndex()` returns a Parameter wrapper, not a value.

  DOCS-GAP. #9078 #12881
- **Material type** is the string parameter `shaderType`. Some exporters identify materials by name, so keep names unique. #3610 #3376
- **Material colours from `mat.color()` expose `.r .g .b .a`.** DOCS-GAP: Vec4D.md lists x,y,z,w. Colour components are 0–1; one 2017 post passed 0–255 values. (ex: Simple ASCII Export.js) #1055
- **v7 removed the hidden per-object icon tag.** In 6.x and earlier every object's `tagAtIndex(0)` was a dummy Mode-like tag (type 103) carrying `editorActive/renderActive/editorShading`. In 7+, every tag index shifted by one, and `tagAtIndex(0)` is whatever tag the user added first.
  - Look tags up by type (`tagOfType(T)`), never by index.
  - Visibility flags may now live on the object: check `parameterInfo()`. [verify]

  #8338 #5550 #12183 #12890
- **Mode tag (103) parameters:** `editorVisible`/`editorActive`, `renderActive`, and `editorShading` (0 shaded, 1 wire, 2 box, 3 ISO). Only visibility propagates to children; apply shading to each child yourself. All of these can be keyframed. #7106 #6373
- **Constraint tags:** use bare constants, not strings, with `addTagOfType(ORIENTCONSTRAINTTAG)` and `POINTCONSTRAINTTAG`, then `tag.setParameter("target", obj)`. Call `recordParametersForUndo()` first and `update()` after. #14324 #14327
- **Lights inside particle-instanced objects are not instanced.** Use emissive geometry instead. #10374
- **Skin weights, cluster data and morph data were not readable in 2012–13.** 8.1.1 now documents `Tag.addCluster/clusterAtIndex` and `Cluster.controlPointIndexArray/WeightArray`. The forum workaround was to save a non-binary `.jas` and parse it externally. #9060 #9499 #6367 (docs: Cluster) [verify]

- **Rotation component mapping.** `rotation` is a Vec3D of **heading, pitch, bank** in degrees, and `new Vec3D(h, p, b)` takes them in that order (`.x/.h`, `.y/.p`, `.z/.b`). Heading turns the object around **Y**: the official RotateObject.js increments `.h` to "rotate around the Y axis". By the usual HPB convention pitch is around X and bank around Z [verify]. (ex: RotateObject.js)
- **Additive expression tags: don't read back what you write.** If `performExpression` reads `owner.getParameter("rotation")` and writes back `rotation + offset`, the offset builds up on every evaluation. Take the base from somewhere the expression doesn't write:
  - `owner.getParameter("rotation", t)` when the parameter is keyframed. The documented time overload should evaluate the F-curve [verify].
  - Otherwise a base value stored in a parameter on the tag. See patterns A3b and (ex: Wobble.js).
- **What a tag script can do is under-documented.** Buttons in a tag's UI, writing the tag's own parameters from `performExpression` (pass `false`), and `recordParametersForUndo` from a tag are all unconfirmed [verify].
- **Undo for edits to several objects (unconfirmed).** Calling `recordParametersForUndo()` on each object before `setParameter` in a single Tool button press makes each edit undoable. Whether they merge into one Undo step is unknown [verify]. #10282
- **Where scripts appear.** The Script menu mirrors the `Scripts/` folders: Tools › Script › Macro/Tool/… For Tool scripts the UI appears in the **Tool** tab. Script objects (Polygonobj/Splineobj/Particle) are created from the same menu and have their parameters in the object's properties. Script tags are added from the same menu, or the tag menu, with the target object selected [verify exact menu for tags].

### 6. Animation

- **All API time is in seconds, not frames.** This covers `setAnimPosition`, `animPosition()`, `animationEnd()`, `FCurveKey.time` and `valueAtTime`. There is **no frame-rate API** (2012), so ask the user for fps as a parameter (`frame/fps`). #9041 #8696 #4366 #2110 #1946
- **Current time:**
  - `doc.animPosition()` (6.0+; it is absent in 5.8).
  - The 8.x example uses `doc.animationTime()`, which is **undocumented** (DOCS-GAP).
  - Save the position and restore it after stepping time.
  - One 2012 sample passes an argument to `animPosition(t)`, contrary to the docs.

  #9461 #2183 #9041 (ex: CircleExpression.js) (docs: Document)
- **Keyframing goes through Parameter → TakeNode → FCurve → FCurveKey (6.0+).**
  1. `param = obj.parameterWithName("scale")`.
  2. `node = param.takeNodeWithName(doc.currentTake().name) || param.addTakeNode(doc.currentTake().name)`.
  3. `curve = node.fCurveAtIndex(i)`: Vec3D gives curves 0/1/2 for x/y/z, and a Float gives one curve.
  4. Build `new FCurveKey()`, set `time` (seconds), `value`, `left_type/right_type`, `left_time/left_value/right_time/right_value`, then `curve.addKey(k)`.
  5. **Always call `curve.update()`** afterwards.

  #1946 #5752 #8339 #8841 (ex: Scale Take.js) (docs: FCurve)
- **Tangent handles are *relative* to the key**, so `left_time` is negative. Interpolation constants: `SOFT_INTERPOL`, `LINEAR_INTERPOL`, `SPLINE_INTERPOL`, `FLAT_INTERPOL` (the forum sample misspells LINEAR as `LINER`). A 2014 update changed SOFT handling, so keys came out LINEAR until a script was fixed. #1946 #8702 (docs: FCurveKey)
- **`keyAtIndex(k)` returns a copy.** After changing it, write it back with `fcurve.setKeyAtIndex(key, k)`, then call `update()`. This is the official example's pattern. (ex: Scale Take.js) [verify]
- **`takeNodeWithName()` returns null when the parameter isn't animated in that take.** Use `take.name`: a **property**, not a method. `valueAtTime(t)` evaluates a curve (one forum sample passes a second argument). #9041 (docs: Take) (ex: Scale Take.js)
- **Rename takes only with `doc.renameTake()`.** It renames the matching TakeNodes too. (docs: Document) (docs: Take)
- **`setAnimPosition(t)` + `setParameter()` does NOT create keys,** even with auto-keying on (Martin, pre-6). One 2007 report says it made keys plus unexplained extras. Use FCurves. #1946 #2313
- **Custom script parameters can be keyframed,** but the user must record them explicitly (right-click record › record *param*, or 'P' to key all parameters). #1210 #466 #7872 #7690
- **Script-generated animation, like polygon-script vertex motion, is not exported to FBX/Collada/Unity.** Bake it, for example with MDD Exporter. MDD needs a constant vertex count. #466 #3880 #6367
- **To sample motion:** step `setAnimPosition(t)`, then re-read `obj2WorldMatrix()`/`getParameter` at each step. #4366
- **Behaviour of mirrored rotations changed around 2013**, which broke pose-flip math. FBX-imported joints merge pre/post-rotation, so re-orient them before mirroring. (pre-7; unverified in 8.x) #5358 #10829
- **Cheetah3D does not play audio.** Sound-loader scripts only drive F-curves. #12343

### 7. Files, OS, shell, libraries

- **File paths must be absolute.** `new File("~/x")` does not expand `~`; only the shell does that. #2247
- **`File.mkDir()` deletes any existing file or folder at that path without warning** (docs). Check `exist()` first. (docs: File) #1161
- **Reading files:**
  - Text: open with `f.open(READ_MODE)`, check `f.isOpen()`, then read `f.read(f.size())`, or loop `f.readln()` until it returns **-1** (`EOF`; undocumented). Then `f.close()`.
  - `new File(p).exist()` returns a boolean.
  - Binary: `open(READ_MODE, LITTLE_ENDIAN|BIG_ENDIAN)`. The docs misspell these as `BIG_ENDIAM`/`LITTLE_ENDIA`.
  - `readInt()` is used successfully but undocumented; the documented readers are `readShort/readUInt/readFloat`.

  #2247 #3350 #4252 #6557 #9039 #10841 #12183 (docs: File)
- **Writing files:** `f.open(WRITE_MODE)` creates the file, then use `write` or `writeln`. Always call `close()`. #4366 #5391 (ex: Simple ASCII Export.js)
- **Save panels:** `OS.runSavePanel(ext)` returns a full path or **null**, and `runSavePanel()` with no argument is allowed. Then `new File(path).directory()` and `.lastPathComponent()` split the path. #2110 #5391 #1055 (ex: QTVR Helper.js)
- **There is no `require`/`import`, no DOM, no XHR or networking, and no external JS libraries.** The engine is macOS JavaScriptCore (changed in early 5.x). To share code, read a file and evaluate it. #8220 #9039 #9290 #4085
- **Include through indirect eval:** `var geval = eval; geval(src);`.
  - A direct `eval(src)` inside a function defines things only in local scope; it was confirmed not to work on 7.0.18. One user says direct eval worked for them.
  - Put the library in `Scripts/Library/` (not shown in menus) and wrap it in a namespace object.
  - The library is re-read on every run, so you can edit it without restarting.

  #9039 #9290 #12183
- **Finding your files:**
  - `obj.scriptPath()` / `tool.scriptPath()` give the running script's path (Base method). Derive the home folder or the Scripts folder from it with string manipulation.
  - Macros receive a `Document`, which does not document `scriptPath()`. Either hard-code the path, or shell out with `echo $HOME > /tmp/f` and read the file.
  - `new File(scriptPath).directory()` finds bundled helpers.

  #9039 #12183 #5865 #6458 [verify]
- **`OS.system(cmd)` passes a raw string to `/bin/sh`.** Single-quote every path and escape embedded quotes, otherwise paths with spaces fail silently. It returns a Number (the exit status, presumably). There is no stdout capture, so redirect output to a temp file and read that with File. #9707 #5865 #12343 #10841 #2247 #9060 (docs: OS)
- **Typical uses of `OS.system`:**
  - `defaults` to read and write prefs
  - `sips` for image info
  - `mkdir`, `rm`, `mv`, `touch` for lock files
  - Python or PHP helpers for networking or parsing
  - external renderers

  #1936 #2247 #6458 #10841 #11774 #9060 #1279 #574 #4252
- **Exporting:** `doc.saveToFile(path, "jas"|"obj"|"mtl")`. To parse a `.jas` externally, turn off Preferences › Files › .jas "binary". Loop `setAnimPosition(f/fps)` + `saveToFile(..., "obj")` for OBJ sequences. The command-line converter is only jas→fbx. #1055 #2110 #3377 #5752 #9060 #9499 #6793
- **There is no render-completion callback.** For external orchestration, poll a temp file. #11774

### 8. Rendering

- **`doc.render()` and `doc.render(path)` are synchronous.** They block until the render finishes and show no progress. Call them on the **instance** (`doc.render()`, not `Document.render()`). You can call them repeatedly in one macro. #1055 #2262 #5998 #11774 (ex: RotateObject.js) (ex: QTVR Helper.js)
- **The output format comes from the file extension**: the examples use `.tiff` and the forum uses `.jpg`. #2262 (ex: QTVR Helper.js) [verify]
- **Since v7, render resolution lives on the renderer, not the camera.** Use `doc.currentRenderer().setParameter("resolution", new Vec2D(w,h))`; the camera's `resolutionX/Y` are legacy. Renderers are listed with `rendererCount()/rendererAtIndex(i)` and switched with `setCurrentRenderer(i)`. #10025 (docs: Document)
- **v7 replaced the DOF tag with camera properties** (focus distance, "Focus on Object"). The old DOF tag (`DOFTAG`, `focalDistance`) no longer drives DOF. #808 #8710 #8739
- **Before rendering after joint or skin changes, call `update()` on every object**, children first from the root. Skinned meshes don't re-evaluate on their own. #5998
- **Update loops caused by `setParameter` in `buildObject` often appear only at render time.** See §2. #8739 #8338
- **For hair-like generated meshes, turn off "visible in radiosity"** to avoid dark artifacts. #4777
- **Field-of-view math:** angle of view = 2·atan(1 / (2·focalLength)), with image size 1.0 on the larger dimension (podperson). #8710

### 9. Undo

- **Undo for script edits exists from 6.0.** Docs say these work only in Tool scripts.
  - Call `obj.recordGeometryForUndo()` *before* editing a mesh or spline.
  - Call `obj.recordParametersForUndo()` *before* `setParameter`.

  Without them, edits bypass Undo and don't mark the document dirty. #8848 #10282 #14324 #14327 (docs: Base)
- **Before 6.0, Undo after a geometry-editing script could crash** (`-[MWMnGon undoRecordedArrays]`). 5.8 changed undo in a way that forced scripts to disable their own undo. (pre-7; unverified in 8.x) #3792 #8024 #8878 #8884 #9892 #2565
- **For portable code, feature-detect:** `if (obj.recordGeometryForUndo) obj.recordGeometryForUndo();`. Calling it on 5.8 throws `'undefined' is not a function`. #8848
- **Redraw lock.** If a script throws after `doc.retainRedrawLock()`, the UI stays frozen. Release it in `try/finally`. To recover, run a macro that calls `doc.releaseRedrawLock(); doc.redrawAll();`. #1422 (docs: Document)

### 10. Debugging and crashes

- **`print()` goes to the Console panel, which is hidden by default.** Add it by right-clicking any panel header. There is no REPL and no action recorder. #2247 #3610 #8514 #12807 (book)
- **`print()` only handles strings.**
  - `print(false)` threw `'false' is not a function`.
  - `print(vec)` prints `[object CallBackObject]`.

  Concatenate with `""` and print vector fields yourself. #10415 #12807 #8220
- **Native API objects need `new`.** Calling `Vec4D(...)` without `new` crashed the app. `new Vec2D()` and `new Vec4D(0.0)` (fewer arguments) work in examples. #1055 (ex: GrapherUV.js) (ex: Particle Image.js)
- **Known native bugs:**
  - `Vec3D.dot()` returned a vector instead of a Number; fixed in 6.3.2.
  - `Vec4D.isEqual()` threw "Wrong number or type of arguments" in 2015; compare components manually.

  #6604 #10731 #11075 [verify]
- **Introspection.** `for…in` over native objects lists their methods in 5.x+ (podperson's Object Info dumps); in 2007 it did not. `instanceof` fails on native classes; use `typeof x.method=="function"`. #2183 #5550 #10025 #10415 #4810
- **Common error strings:**
  - `Can't find variable: X`: an undefined helper, or a removed constant such as `SPOTLIGHT`.
  - `SyntaxError: illegal character` at line 1: full-width or multibyte whitespace was pasted in.
  - A crash in `-[MWMSFEngine loadScript]` (CFStringGetLength null): the script file is unreadable or corrupt (for example a bad encoding).

  #1405 #5550 #1577 #10731
- **Common crash causes:**
  - missing `addParameter*` arguments (§3)
  - `new` omitted on native constructors
  - nonexistent vertex indices or malformed polygons (§4)
  - a script in the wrong type folder (§1)
  - Undo after non-recorded edits (pre-6)
  - `addObject` inside `buildObject` (§2)

  Save before testing. Force-quit with ⌘⌥⎋. #11084 #14327 #1055 #13746 #6367 #8024
- **The in-app Help is the most current reference.** Third-party PDFs lag behind, and the bundled examples are the best idioms. #8841 #9213

### 11. Version history (what broke or changed)

| Version | Change for scripts | Cites |
|---|---|---|
| 2.6.1 | Scripts lived in `/Applications/Cheetah3D/scripts/…` | #466 |
| 3.2 / 3.3 | `setParameter(name, v, false)` overload (3.2; reliable 3.3). Light param names changed 3.1→3.2 | #574 #626 |
| 3.5 | User script folders auto-created. Light params changed again (3.4→3.5); 3.5 API additions not back-compatible | #808 #803 #1021 |
| 4.3 | Crash on `animationEnd()` in Tool `buildUI`; `print()` silent in first `buildUI` (fixed next release) | #2375 |
| 4.6 | **UV change:** `uvCoord()` returns Vec4D (UV1+UV2); `addIndexPolygon` wants Vec2D UVs. Many polygon scripts broke | #466 #467 #1294 #1731 #2280 |
| 5.0 | **Node-based materials:** old material params (`colorColor`, `colorTex`…) and `rib()` gone; no node scripting until 6.2.1. **Lights unified** as `LIGHT` + `lightType` (5.x). New JS engine (JavaScriptCore) in early 5.x broke some scripts | #1210 #4085 #5514 #5550 #9078 #3376 |
| 5.2 | Broke many polygon scripts and `Vec*.prototype` overrides; separate 5.2+ builds needed | #1395 #1448 #4029 #4108 |
| 5.3 | 64-bit build broke some older scripts | #3880 |
| 5.4–5.5 | Particle scripts (book mentions 5.4); misc breakage in 5.5 | #2743 (book) |
| 5.8 | Undo for scripts changed: scripts had to disable their undo; no `animPosition()`, no `recordGeometryForUndo()` | #8848 #8878 #8884 #9461 |
| 6.0 | **Undo API** (`recordGeometryForUndo`, `recordParametersForUndo`); **animation API** (Parameter/TakeNode/FCurve/FCurveKey); `doc.animPosition()` | #1946 #8024 #8848 #6367 |
| 6.2.1 | Material node functions (`nodeCount`, `nodeAtIndex`, …) | #9730 |
| 6.3.2 | `Vec3D.dot()` fixed | #10731 |
| 7.0 | Dummy icon tag removed, so **tag indices shift by −1**. Render resolution moved to renderer. DOF tag replaced by camera DOF. Expression tags (`performExpression`, `animationTime()`). Texture objects via `"param.tex"` (examples from 2016). Dots in param names broke in b18 (fixed b19). `isCeatorObj` typo fixed in b20. Spline cut behaviour changed between betas | #8338 #10025 #808 #12218 #12262 (ex: CircleExpression.js) (ex: Particle Image.js) |
| 7.3–8.0b3 | 2-arg `addParameterBool` crash confirmed on 7.3.3, 7.5.2, 8.0b3 | #14327 |
| 8.x | No vertex-colour API (2025). Docs still list stale constants and `rib()` | #14613 |

---

### Verify in app (8.1.1)

These are the highest-impact claims. Each should become a small test macro.

1. **Light constants:**
   - Does `typeof LIGHT` give a number, and do `typeof SPOTLIGHT`, `POINTLIGHT`, `DISTANTLIGHT` and `AREALIGHT` give `"undefined"`?
   - What are the 8.x `lightType` values for point, spot, distant, area and sky?
   - Does `doc.addObject(POINTLIGHT)` work?
2. **`selectedObject()` with nothing selected:** does it return the root (`owner()==null`) rather than null?
3. **Missing `addParameter*` arguments:** does `addParameterBool(name, init)` with 2 arguments still crash 8.1.1? Is the 4-argument form in official Menger.js safe?
4. **`setParameter` in `buildObject`:** does calling it without `false` still loop? Does `false` fully prevent the loop, including during a movie render?
5. **UVs:** does `addIndexPolygon(n, idx, Vec4D[])`, the documented overload, work, or does it still throw "Wrong elemet in uv array"? Does `uvCoord()` still return Vec4D with z,w = UV2?
6. **Indirect vs direct eval:** does `eval(src)` inside a function leak definitions globally in 8.x, or is `var geval=eval` still required? Is `scriptPath()` available on the Document passed to a Macro's `main(doc)`?
7. **Tag indices and visibility flags:** in 8.x, is `editorActive/renderActive/editorShading` a parameter of the object itself? What is `tagAtIndex(0)` on a fresh object? Is `tagCount()` 0?
8. **Material assignment:** does `addMaterial("Material", name)` + `addTagOfType(SHADERTAG)` + `tag.setParameter("material", mat)` render the material? Does setting `"diffColor"` on `nodeAtIndex(0)` or on `rootNode()` change the colour, and which node is the shader?
9. **FCurve keyframing:**
   - Do keys built with `new FCurveKey()` + `addKey` + `update()` appear in the timeline?
   - Are `left_time/right_time` relative?
   - Does `keyAtIndex()` return a copy?
   - Does `setAnimPosition` + `setParameter` still create no keys?
10. **Time APIs:** do both `doc.animPosition()` and the undocumented `doc.animationTime()` exist, and do they agree? Is there still no frame-rate parameter (check `doc.parameterInfo` if Document is a Base, and the renderer's parameters)?
11. **Expression tags:** is `performExpression(tag)` called on every frame and during render? Does the `priority` parameter control order?
12. **Copy semantics:** do `core.vertex(i).add(v)`, `Vec3D.add()` and the result of `getParameter("position")` leave their source unchanged (that is, are they non-mutating or copies)?
13. **Render:** does `doc.currentRenderer().setParameter("resolution", new Vec2D(...))` take effect? Does the `doc.render(path)` format follow the extension (`.png`, `.jpg`, `.tiff`)?
14. **Undo:** does `recordGeometryForUndo()` work from a Macro (docs say Tool only), and does Undo then restore the mesh without crashing?
15. **`normalType`/`normalAngle` on polygon scripts:** are they host parameters, or only present when the script declares them (as GrapherUV does)?
16. **Native method gaps:** do `node.id()`, `File.readInt()`, `Particle.setDeath()`, `doc.selectedObjects(true)`, `Vec4D.isEqual()` and `Material.rib()` exist?
17. **Winding:** with `addPolygon`/`addIndexPolygon`, which corner order faces outward? (Build one quad and check its normal display.)
18. **Rotation axes:** confirm pitch is around X and bank around Z.
19. **Expression tags:**
    - Does `getParameter("rotation", t)` return the F-curve value rather than the value the expression last wrote?
    - Can a tag have working buttons?
    - Is a tag's own `setParameter(..., false)` safe inside `performExpression`?
20. **Undo:** does `recordParametersForUndo()` on N objects in one Tool action make one Undo step or N?
21. **New scripts:** does "Update Scripts Menu" exist in 8.x, or is a relaunch needed? The book says relaunch.

# Official API reference (Cheetah3D 8.1.1)

### Functions


Some globally defined functions.

##### `void clearConsole ()`
Clears the Cheetah3D console.

##### `void print (String message)`
Writes message to the Cheetah3D console.

##### `String version ()`
Returns the version string of Cheetah3D.

### Base Object


The Base object builds the foundation of all tools, objects, tags, loaders, etc. It holds all the parameters and some other very basic informations. Many other objects are inherited from the Base object.
none

#### Constructor
none

#### Methods

##### `void addParameterBool (String paraname, Boolean initvalue, Boolean paramin, Boolean paramax, Boolean animate, Boolean build)`
Adds a parameter of type Boolean with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterButton (String paraname, String buttonname, String functionname)`
Adds a button property with name paraname to the object. The button title will be buttonname . If the button will be clicked the Javascript function functionname( Base obj) will be called. Please call this function only in the buildUI() function.

##### `void addParameterColor (String paraname, Vec4D initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Vec4D with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterFloat (String paraname, Number initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Float with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterInt (String paraname, Number initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Int with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterLink (String paraname, Boolean build)`
Adds a parameter of type Object with name paraname to the object. build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterSelector (String paraname, Array options, Boolean animate, Boolean build)`
Adds a parameter of type selector with name paraname to the object. options = an array of strings which lists the menu items of the pull down button animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterString (String paraname, String initvalue, Boolean build)`
Adds a parameter of type String with name paraname to the object. initvalue = initial value of parameter build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterSeparator (String paraname)`
Adds a separator line to the UI. The title of the separator line is paraname.

##### `void addParameterTexture (String paraname, String initvalue, Boolean build)`
Adds a parameter of type Texture with name paraname to the object. initvalue = initial value of parameter build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterVec2D (String paraname, Vec2D initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Vec2D with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `void addParameterVec3D (String paraname, Vec3D initvalue, Number paramin, Number paramax, Boolean animate, Boolean build)`
Adds a parameter of type Vec3D with name paraname to the object. initvalue = initial value of parameter paramin = minimal value of parameter paramax = maximal value of parameter animate = if the parameter should be animateable build = if the scene graph should be recalculated after a change of that parameter. Please call this function only in the buildUI() function.

##### `Document document ()`
Returns the document which owns the object.

##### `Number family ()`
Returns the family type of the object.

##### `void getParameter (String paraname) void getParameter (String paraname, Number time)`
Returns the current parameter value of the parameter paraname. The value returned depends on the parameter type. If the parameter paraname is a float parameter a Number will be returned. If it is a Vec3D a three dimensional vector will be returned. Using the time parameter you can access the parameter at the given time point if the object was animated.

##### `Number modifiedHint ()`
Returns the modified hint of this object.

##### `Number modifiedHint2Root ()`
Returns the cumulative modified hint of this object and all it's parent objects.

##### `Base owner ()`
Returns the owner of the object. In case of an Object the owner is the parent object. In case of a Tag the owner is the object the tag is attached to.

##### `Number parameterCount ()`
Returns the number of parameters of this object.

##### `Parameter parameterAtIndex (Number index)`
Returns the parameter at index.

##### `String[][] parameterInfo ()`
Returns a two dimensional array of strings which contains the name and the type of all parameters attached to the object.

##### `Parameter parameterWithName (String name)`
Returns the parameter name "name".

##### `void recordGeometryForUndo ()`
This function pushes the geometry of the object on the Undo-Stack. In case of a polygon object the polygon mesh or in case of a spline object the path data. Once that function was called changes to the object geometry can be undone. Please call this function only in tool scripts!

##### `void recordParametersForUndo ()`
This function pushes all parameter values of the object on the Undo-Stack. Once that function was called changes to the object parameter can be undone. Please call this function only in tool scripts!

##### `Number selection ()`
Return the selection value of the object.

##### `String script ()`
Some objects are created by Javascripts. If an object has a Javascript attached this function returns the name of the script.

##### `String scriptPath ()`
Some objects are created by Javascripts. If an object has a Javascript attached this function returns the file system path of the script.

##### `void setParameter (String paraname, void value) void setParameter (String paraname, void value, Boolean update)`
Sets the current parameter value of the parameter called paraname to value. The value should be of the type as the parameter. Else an error will be posted. By defalte the scene graph will be updated if you change the value of one parameter. Calling the setParameter() function with the additional parameter update=false won't update the scene graph.

##### `Number type ()`
Returns the object or tag type of the object.

##### `void updateModifiedHint (Number hint)`
Updates the modified hint property of the object.

### Document Object


none

#### Constructor
none

#### Methods

##### `Object activeCamera ()`
Returns the active camera.

##### `Take addTake (String takename)`
Adds a take with name takename to the document. If there is already a take with that name in the document this function will return the already existing take and doesn't create a new one with the same name.

##### `Number animationEnd ()`
Returns the time point where the animation ends.

##### `Number animPosition ()`
Returns the current time point of the animation.

##### `Material addMaterial (String type, String name)`
Adds a new material to the scene. The type can be every available shader type like Material, Marble, Wood, etc. You also have to pass in an initial name of the material which can be changed later.

##### `Object addObject (Number type)`
Adds an object of the scene. The parameter type must be any of the various object type constants.

##### `Base currentRenderer ()`
Returns the currently selected renderer.

##### `Take currentTake ()`
Returns the currentty selected (playing) Take.

##### `Number editMode ()`
Returns the current edit mode (POINT_MODE, EDGE_MODE, POLY_MODE or OBJECT_MODE)

##### `String fileName ()`
Returns the file name of the current document. If the documents doesn't have a file name yet, it return null.

##### `Material materialAtIndex (Number index)`
Returns the material at index .

##### `Number materialCount ()`
Returns the number of materials in the scene.

##### `void releaseRedrawLock ()`
Releases the redraw lock. Only use this function if you called retainRedrawLock () before. Otherwise the UI of Cheetah3D will stay locked.

##### `void render () void render (String filename)`
Renders the current scene. If a filename is also passed to this function the rendered image will be saved to that file.

##### `void redrawAll ()`
Redraws the hole UI.

##### `void removeMaterial ( Material mat)`
Removes the Material mat from the document.

##### `void removeTake (String takename)`
Removes the Take takename from the document. This also removes all TakeNodes with name takename from all Parameters .

##### `void renameTake (String takename,String newname)`
Renames the Take takename to newname . This function also renames all TakeNodes with the name takename to newname. So if you want to rename a Take never rename the TakeNodes manually but always rename them with this function.

##### `Base rendererAtIndex (Number index)`
Returns the renderer as index .

##### `Number rendererCount ()`
Returns the number of renderers in this scene.

##### `void retainRedrawLock ()`
Many Javascript functions cause a redraw of the UI. To avoid wasting time by unnecessary UI redraws you can lock the automatic UI redraw. But don't forget to call releaseRedrawLock () at the end of the script. Otherwise the UI will stay locked.

##### `Object root ()`
Returns the root object of the scene graph.

##### `void saveToFile (String filename, String type)`
Saves the scene to the filename.

##### `void selectObject (Object obj,Boolean extendSelection)`
Selects Object obj .

##### `Object selectedObject ()`
Returns the selected object.

##### `Object[] selectedObjects (Boolean flat)`
Returns and array of all selected and sub-selected objects.

##### `void setAnimPosition (Number time)`
Sets the animation position to time .

##### `void setCurrentRenderer (Number index)`
Sets the renderer at index as the current renderer.

##### `void setCurrentTake (String takename)`
Sets the current (playing) Take to the Take with name takename .

##### `void setWindowFrame (Number originX, Number originY, Number width, Number height)`
Sets the document windows position and size.

##### `Take takeAtIndex (Number index)`
Returns the take at index .

##### `Take takeWithName (String takename)`
Returns the take with Name takename .

##### `Number takeCount ()`
Returns the number of takes.

### Object:Base


Objects are all elements within the scene graph like polygon objects, splines, light sources, cameras and so on. Objects can't be created directly. To create a object you have to call the addObject () function of the Document class.

#### Properties
none

#### Constructor
none

#### Methods

##### `Tag addTagOfType (Number type)`
Adds a tag of type type to the object. The function call returns the newly created tag.

##### `Tag addChildAtIndex ( Object child, Number index)`
Attaches the object child to this object. Calling this function automatically detaches the child object from it's parent or owner.

##### `Object childAtIndex (Number index)`
Return child (sub object) at index .

##### `Number childCount ()`
Return the number of children (sub objects).

##### `PolyCore core () SplineCore core ()`
Return the geometry data attached to an object. In case of an polygon object it return a PolyCore . In case of a spline object it returns a SplineCore . Otherwithe null.

##### `Boolean isCreatorObj ()`
Return if the object is a creator object . Creator objects update automatically if one of it's childs changes. Like the Lathe or the Extrude object.

##### `Tag [] materialTags ()`
Returns an array of all the material tags attached to the object.

##### `PolyCore modCore () SplineCore modCore ()`
Return the geometry data after the modifiers have been applied. In case of an polygon object it return a PolyCore . In case of a spline object it returns a SplineCore . Otherwithe null.

##### `Mat4D obj2WorldMatrix ()`
The transformation matrix from the local to the global coordinate system.

##### `Mat4D objMatrix ()`
The transformation matrix from the local to the parents objects coordinate system.

##### `void setCreatorObj (Boolean val)`
Sets a object to a creator object .

##### `void removeChild ( Object obj)`
Removes child object obj .

##### `void removeTag ( Tag tag)`
Removes tag from object.

##### `Tag tagAtIndex (Number index)`
Returns the tag at index .

##### `Number tagCount ()`
Return the number of tags attached to the object.

##### `Tag tagOfType (Number type)`
Returns the first tag of type .

##### `void update ()`
Rebuilds all caches. You always have to call this function once you've modified some geometry of parameters.

### Tag:Base Object


Tag objects can be created with a constructor. To create and attach a tag to an object you have to call the addTagOfType() function of the Object object.

#### Properties
none

#### Constructor
none

#### Methods

##### `Cluster addCluster ()`
Adds an empty cluster to a skeleton tag. If the tag is no skeleton tag nothing happens.

##### `Cluster clusterAtIndex (Number index)`
Returns the cluster at index .

##### `Number clusterCount ()`
Returns the number of clusters which are connected to this tag.

##### `Number linkedToMaterial ()`
If the tag is a material tag this function call returns the material index to which the tag is linked to. For all other tags this function just returns -1.

##### `void removeClusterAtIndex (Number index)`
Removes cluster at index .

##### `Mat4D tag2WorldMatrix ()`
Return the transformation matrix from the tags local coordinate system to the world coordinate system.

##### `void update ()`
Updates the scene graph starting from the tag.

### PolyCore Object


The PolyCore object hold all the data of a Polygon object. It contains all the information about vertices, polygons UV coords, polygon selections, creases, seams, etc. A PolyCore object can't be created manually. It is just possible to retrive PolyCore objects from Polygon objects with the core() or modCore() function calls.

#### Properties
none

#### Constructor
none

#### Methods

##### `Number addIndexPolygon (Number size]) Number addIndexPolygon (Number size, Number vindex[]) Number addIndexPolygon (Number size, Number vindex[], Vec2D uv[]) Number addIndexPolygon (Number size, Number vindex[], Vec4D uv[])`
Adds a new polygon with size corners to the object. You can either create an empty polygon or you can already initialize it with an array of vertex indices and optionally with an array of uvcoords. Please consider that the vertices referenced in the vertex index array vindex[] have to exist. Otherwise you could cause a crash.

##### `Number addPolygon (Number size) Number addPolygon (Number size, bool meshed, Vec3D p[]) Number addPolygon (Number size, bool meshed, Vec3D p[], Vec2D uv[])`
Adds a new polygon with size corners to the object. You can either create an empty polygon or you can already initialize it the an array of vertices and optionally with an array of uvcoords. If meshed=true Cheetah3D tries to reuse vertices which results in a connected mesh. So in most cases meshed=true is recommended.

##### `Number addVertex (Boolean meshed, Vec3D vert)`
Adds the vertex vert to the object. If meshed=true Cheetah3D first searches for a vertex with the same coordiantes if it findes one it returns the index of the existing vertex. If it doesn't find a vertex with the same coordinates it adds a new vertex to the vertex array and returns the index of the new vertex. If meshed=false Cheetah3D Cheetah3D adds the vertex without the test.

##### `void buildVertexBSP ( Vec3D bmin, Vec3D bmax)`
Creates an internal BSP tree within the box spanned up from bmin to bmax . If a BSP tree is created the addVertex() and addPolygon() functions offer an much increased performance. When you are done with the creation of the mesh always call destroyVertexBSP() to free up the memory of the BSP tree.

##### `void deletePolygon (Number pindex)`
Deletes the polygon at pindex.

##### `void deleteVertex (Number vindex)`
Deletes the vertex at vindex.

##### `void destroyVertexBSP ()`
Destroys the BSP tree and frees up it's memory.

##### `Number cornerCount ()`
Return the number of corners in the object. Each ngon as n corners.

##### `Boolean edgeSelection (Number pindex, Number eindex, Number mask)`
SELECT returns the selection of the edge
UVPOINT returns the selection of the corner in the UV editor
UVEDGE returns the selection of the edge in the UV editor
UVPINNED returns if the corner is pinned
SEAM returns if the edge is a seam
CREASE returns if the edge is a crease

##### `void flipWinding (Number pindex)`
Changes the winding of polygon pindex .

##### `Number materialTagIndex (Number pindex )`
Returns the index of the material tag which the polygon at pindex uses. Use the materialTags() function call of the Object class to retrieve all available materials tags. If the return of this function is greater or equal to the number of material tags no material is assigned to that polygon.

##### `void mergeVertices (Number tolerance)`
Merges vertices which are close to each other. You can use this function to connect the polygons of a mesh.

##### `Vec3D normal (Number pindex) Vec3D normal (Number pindex, Number cindex)`
Returns the normal perpendicular to polygon pindex if you only pass in the polygon index . If you also hand over the index of the corner cindex the returned normal will be the smoothed normal.

##### `Number polygonCount ()`
Return the number of polygons in the object.

##### `Boolean polygonSelection (Number pindex)`
Returns true if the polygon at pindex is selected.

##### `Number polygonSize (Number pindex)`
Returns the size or better the number of corners of the polygon at pindex .

##### `void setActivePolygonSelection (Number polysel)`
Changes the active polygon selection. Cheetah3D has 25 independet polygon selections. So you can pass in values form [0,24].

##### `void setEdgeSelection (Number pindex, Number eindex, Number mask, Boolean val)`
Sets verious edge and corner properties of the edge with index eindex of polygon pindex. Check out the function edgeSelection() to get the list of the various masks.

##### `void setPolygonSelection (Number pindex,Boolean val)`
Sets the polygon selection of polygon pindex to val. This call only effects th active polygonselection.

##### `void setUVCoord (Number pindex, Number cindex, Vec2D uv) void setUVCoord (Number pindex, Number cindex, Vec4D uv)`
Sets the uvcoord of corner cindex of polygon pindex.

##### `void setVertex (iNumbernt vindex, Vec3D vert)`
Sets the vertex at vindex to vert.

##### `void setVertexSelection (Number vindex, Boolean val)`
Sets the vertex selection of vertex vindex .

##### `Number[3] triangle (Number pindex, Number tindex)`
Cheetah3D automatically tesselates all polygons into triangles. These triangles can be accessed with the triangle() call. Just pass in the polygon index and the triangles index. The triangles indices of each polygon go from zero to polygonSize-2. The function returns an array of 3 integers. These integers reference the corner indexes of the polygon.

##### `Number triangleCount ()`
Return the number of triangles in the object. This number is normally not equal to the number of polygons since every ngon consist out of (n-2) triangles.

##### `Vec4D uvCoord (Number pindex, Number cindex)`
Return the uvcoord of corner cindex of polygon pindex .

##### `Number vertexCount ()`
Return the number of vertices in the object.

##### `Vec3D vertex (Number vindex)`
Returns the vertex at vindex.

##### `Number vertexIndex (Number pindex, Number cindex)`
Return the vertex index of corner cindex of polygon pindex .

##### `Boolean vertexSelection (Number vindex)`
Returns true if the vertex at vindex is selected.

### SplineCore Object


The SplineCore object hold all the data of a Spline object. It contains all the information about paths, control points, and so on. A SplineCore object can't be created manually. It is just possible to retrieve SplineCore objects from Spline objects with the core() or modCore() function calls.

#### Properties
none

#### Constructor
none

#### Methods

##### `Vec3D [] cache (Number pindex)`
Cheetah3D tessellates all spline data. This data will be cached. This function return and array of 3D vectors which describes the tessellated paths at index pindex .

##### `void close ()`
Closes the current path with a line segment.

##### `Vec3D currentPoint ()`
Returns the current point.

##### `void curve ( Vec3D cp1, Vec3D cp2, Vec3D to)`
Draws a Beziere curve with the control points cp1 and cp2 from the current point to to .

##### `void line ( Vec3D to)`
Draws a line from the current point to to .

##### `void move ( Vec3D to)`
Moves the pen to to . This function also initializes the current point. So this function should be always called before you continue with drawing a spline. Calling this function also starts a new path.

##### `Number pathCount ()`
Number of paths.

### ParticleCore Object


The ParticleCore object holds all particles of a particle system. It contains all the information about particle position, scale, rotation, etc. . A ParticleCore object can't be created manually. It is just possible to retrive ParticleCore objects from particle system objects with the core() or modCore() function calls.

#### Properties
none

#### Constructor
none

#### Methods

##### `Particle addParticle ()`
Adds a partilce to the particle core and return the newly created partilce.

##### `Number particleCount ()`
Returns the number of particles

##### `Particle particleAtIndex (Number index)`
Return the particle at index.

##### `void removeParticleAtIndex (Number index)`
Deletes the particle at index .

##### `void removeAllParticles ()`
Deletes all particles.

### Particle Object


The Particle object hold the state of a particle. Particle objects can be created by a constructor. They can be only created and deleted by the PolyCore object.

#### Properties
none

#### Constructor
none

#### Methods

##### `Number getBirth ()`
Returns the time of birth of the particle.

##### `Vec4D getColor ()`
Returns the color of the particle.

##### `Number getDeath ()`
Returns the time of death of the particle.

##### `Number getIndex ()`
Returns the index of the particle. The index property is used the detemine which child of the particle object will be used to instance the particle.

##### `Vec3D getPosition ()`
Returns the position of the particle in the local coordinate system of the particle object.

##### `Vec3D getPositionSpeed ()`
Returns the velocity of the particle in the local coordinate system of the particle object.

##### `Vec3D getRotation ()`
Returns the rotation of the particle in the local coordinate system of the particle object. The rotation is set via XYZ-Euler angles.

##### `Vec3D getRotationSpeed ()`
Returns the rotation speed of the particle in the local coordinate system of the particle object. The value is set via XYZ-Euler angles.

##### `Vec3D getScale ()`
Returns the scale of the particle in the local coordinate system of the particle object.

##### `Vec3D getScaleSpeed ()`
Returns the scale speed of the particle in the local coordinate system of the particle object.

##### `Vec3D getRand ()`
Returns a vector of 3 uniformly distributed random numbers. These random numbers are initalized at the birth of the particle.

##### `Vec3D getUVW ()`
Returns the UVW coordinate of the particle.

##### `Number getWeight ()`
Returns the weight of the particle.

##### `Boolean getVisible ()`
Returns the visibility of the particle.

##### `void setBirth (Number birth)`
Sets the birth property of the particle.

##### `void setColor ( Vec4D rgba) void setColor (Number red,Number green,Number blue,Number alpha)`
Sets particle color.

##### `void getDeath (Number death)`
Sets particle death time.

##### `void setIndex (Number index)`
Sets particle index.

##### `void setPosition ( Vec3D vec) void setPosition (Number x, Number y, Number z)`
Sets the position of the particle in the local coordinate system of the particle object.

##### `void setPositionSpeed ( Vec3D vec) void setPositionSpeed (Number x, Number y, Number z)`
Sets the velocity of the particle in the local coordinate system of the particle object.

##### `void setRotation ( Vec3D vec) void setRotation (Number x, Number y, Number z)`
Sets the rotation of the particle in the local coordinate system of the particle object. The rotation is set via XYZ-Euler angles.

##### `void setRotationSpeed ( Vec3D vec) void setRotationSpeed (Number x, Number y, Number z)`
Sets the rotation speed of the particle in the local coordinate system of the particle object. The rotation is set via XYZ-Euler angles.

##### `void setScale ( Vec3D vec) void setScale (Number x, Number y, Number z)`
Sets the position of the scale in the local coordinate system of the particle object.

##### `void setScaleSpeed ( Vec3D vec) void setScaleSpeed (Number x, Number y, Number z)`
Sets the scale speed of the particle in the local coordinate system of the particle object.

##### `void setRand ( Vec3D vec) void setRand (Number x, Number y, Number z)`
Sets the Rand property of the particle. This property shouldn't be altered.

##### `void setUVW ( Vec3D vec) void setUVW (Number u, Number v, Number z)`
Sets the UVW value of the particle.

##### `void setWeight (Number weight)`
Sets the particle weight.

##### `Number setVisible (Boolean visible)`
Sets the particles visibility property.

### Material:Base Object


Materials can't be created with a constructor. To create a material use the addMaterial() function of the Document object.
none

#### Constructor
none

#### Methods

##### `Boolean addConnection (Number fromID, String fromPara, Number toID, String toPara)`
Connects to nodes. Return true if successfull.

##### `Node addNodeOfType (String type)`
Adds a node of type to the material. The function returns the newly create node.

##### `Vec4D color ()`
Returns the base color of the material.

##### `String colorMap ()`
Returns the path of the color texture map.

##### `Vec4D emission ()`
Returns the emissive color of the material.

##### `Node nodeAtIndex (Number index)`
Returns the node at index .

##### `Number nodeCount ()`
Returns the number of nodes in this material.

##### `Node nodeWithID (Number id)`
Returns the node with base ID id .

##### `Vec4D reflection ()`
Returns the reflection color of the material.

##### `Boolean removeConnection (Number nodeID, String nodePara)`
Removes a connection from an imput parameter. Returns true of successfull.

##### `String rib ()`
Returns a string which contains all the material properties.

##### `Node rootNode ()`
Returns the root (shader) node of the material.

##### `Number shininess ()`
Returns the shininess of the material. This number is between [0,128].

##### `Vec4D specular ()`
Returns the specular color of the material.

##### `Vec4D transmission ()`
Returns the transmission color of the material.

### Node:Base Object


Nodes can't be created with a constructor. To create a node use the addNodeOfType() function of the Material object.
none

#### Constructor
none

#### Methods

##### `Vec4D frame ()`
Returns the frame rect (position.x, position.y, width, height) of the node.

##### `Parameter inputAtIndex (Number index)`
Returns the input parameter at index .

##### `Number inputCount ()`
Returns the number of input parameters.

##### `Parameter inputWithName (String name)`
Returns the input parameter with name .

##### `String nodeType ()`
Returns the node type of this node.

##### `Parameter outputAtIndex (Number index)`
Returns the output parameter at index .

##### `Number outputCount ()`
Returns the number of output parameters.

##### `Parameter outputWithName (String name)`
Returns the output parameter with name .

##### `void setFrame ( Vec4f frame)`
Sets the frame rect (position.x, position.y, width, height) of the node.

##### `void update ()`
Updates the node and the material preview.

### Parameter Object


The parameter objects hold the properties information and TakeNodes of Objects, Tag or Materials.
none

#### Constructor
none

#### Methods

##### `TakeNode addTakeNode (String takename)`
Adds a TakeNode with name takename to the Parameter. If there is already a TakeNode with that name Cheetah3D return that TakeNode .

##### `Boolean isAnimateable ()`
Returns if that Parameter can be animated.

##### `Boolean connected ()`
Returns true of this parameter is connected to another object.

##### `Number connectedWithID ()`
Returns ID of the object/node to which the parameter is connected.

##### `String connectedWithParameter ()`
Returns the parameter name to which the parameter is connected.

##### `String name ()`
Returns the name of the parameter

##### `TakeNode takeNodeAtIndex (Number index)`
Returns the TakeNode at index .

##### `Number takeNodeCount ()`
Returns the number of TakeNodes attached to this parameter.

##### `TakeNode takeNodeWithName (String takename)`
Returns the TakeNode with name takename . If no such TakeNode exists it return null.

##### `Number type ()`
Returns the paramater type. The parameter type can have one of these constant values: INT_PARAMETER FLOAT_PARAMETER BOOL_PARAMETER STRING_PARAMETER VEC2D_PARAMETER VEC3D_PARAMETER VEC4D_PARAMETER TEXTURE_PARAMETER LINK_PARAMETER GRADIENT_PARAMETER FLOAT_ARRAY_PARAMETER

### Take Object


A take object offers information about the length of and animation take or its preview interval in the timeline. Furthermore it offers the name of the take. Please use this take name to search for TakeNode s in Parameter objects.

Please don't rename Takes directly but via the renameTake() function of the Document class.

#### Properties
Number length Number previewFrom Number previewTo String name

#### Constructor
none

#### Methods
none

### TakeNode Object


TakeNodes group the FCurve s of a certain take together. The number of FCurve s in a TakeNode are determined by the dimension of the parameter. For example a Float parameter only has one FCurve while a 3-dimensional Vec3D parameter has 3 FCurve s. TakeNodes are child objects of Parameter objects.

#### Properties
none

#### Constructor
none

#### Methods

##### `FCurve fCurveAtIndex(Number index)`
Returns the FCurve at index .

##### `Number fCurveCount()`
Returns the number of FCurve s in the TakeNode. This number is identical to the dimension of the parameter.

##### `String name()`
Retunrs the name of the TakeNode.

##### `Number totalKeyCount()`
Tells you if there were any keys recorded in that TakeNode.

### FCurve Object


The FCurve objects represents parameter F-Curves. They are usually grouped together in a TakeNode . FCurves itself are a collection of animation keys ( FCurveKeys ) and can be evaluated at any time t.

#### Properties
none

#### Constructor
none

#### Methods

##### `void addKey ( FCurveKey key)`
Appends a key to the end of the F-Curve.

##### `void insertKeyAtIndex ( FCurveKey key, Number index)`
Inserts a key into the F-Curve at index .

##### `FCurveKey keyAtIndex (Number index)`
Returns the key at index .

##### `Number keyCount ()`
Returns the number of keys in the F-Curve

##### `void removeAllKeys ()`
Removes all keys from the F-Curve.

##### `void removeKeyAtIndex (Number index)`
Removes a key from the F-Curve at index .

##### `void setKeyAtIndex ( FCurveKey key, Number index)`
Sets the values of a F-Curve at index .

##### `void update ()`
Please always call this function after editing the F-Curve. It will performs some clean up tasks and calculate the tangents if you've choosen smooth spline interpolation.

##### `Number valueAtTime (Number time)`
Evaluates the F-Curve at time .

### FCurveKey Object


The FCurveKey objects represents a single key in a Parameter F-Curve. The key consists of the actual key value (time,value), the left tangent control point (left_type, left_time, left_value) and the right tangent control point (right_type, right_time, right_value) The tangent type of the FCurveKey can hereby have one of the following constants : LINEAR_INTERPOL, SOFT_INTERPOL, SPLINE_INTERPOL, FLAT_INTERPOL. Properties Boolean selected Number left_type Number left_time Number left_value Number right_type Number right_time Number right_value Number time Number value
Boolean selected Number left_type Number left_time Number left_value Number right_type Number right_time Number right_value Number time Number value

Constructor FCurveKey () Creates an empty FCurveKey object.

##### `FCurveKey ()`
Creates an empty FCurveKey object.

Methods none

### Texture Object


Texture objects can't be created with a constructor but textures can be accessed with the getParameter() function of the Base object.
```js

              var texturePath=obj.getParameter("texturePara");	//returns just the textures path as a String object
              var texture=obj.getParameter("texturePara.tex");	//returns the texture object itself
              
```

#### Properties
Number width Number height String filename

#### Constructor
none

#### Methods

##### `Vec4D pixel (Number x, Number y)`
Returns the color of pixel (x,y).

##### `Vec4D sample (Number s, Number t)`
Samples the texture at the texture coordinate (s,t) and returns a color.

### File Object


The File objects offers the possibility to read from and save to files.

#### Properties
none

#### Constructor
File ( String path)
Creates a file reference to a file at path . Creating a file reference doesn't automatically open the file.

#### Methods

##### `void close ()`
Closes an open file.

##### `String[] contentOfDir ()`
If path is an folder this function returns an array of all the files which are in the folder at path .

##### `Boolean copyTo ( String toPath)`
Copies the file from path to toPath. Returns true if the operation was successful.

##### `String directory ()`
Returns the directory path component of the file at path .

##### `Boolean exist ()`
Return true if the the file at path already exists. Otherwise it returns false.

##### `String extension ()`
Returns the file extension of the file at path .

##### `int getpos ()`
Returns the current seek file pointer position of the open file.

##### `Boolean isDir ()`
Returns if path is a directory or a file.

##### `Boolean isOpen ()`
Returns if the file has been successfuly opend.

##### `String lastPathComponent ();`
Return the last path component of the file/folder at path .

##### `Boolean mkDir ()`
Creates a folder at path . If there already exists a file or a folder the old one will be deleted without warning. The function return true of the folder has been created successfully.

##### `void open ( Number mode) void open ( Number mode, Number endian)`
Opens the file at path . mode = READ_MODE : File will be opend in read mode. mode = WRITE_MODE : File will be opend in write mode. If there exists no file at path a new file will be created. You only have to pass the endian parameter if you want to read/write a binary file. endian = BIG_ENDIAM : File data will be writen/read in big endian mode. endian = LITTLE_ENDIA : File data will be writen/read in little endian mode.

##### `String read ( Number size)`
Reads the next size chars form the open file.

##### `Number readFloat ()`
Reads the next binary float from the open file.

##### `String readln ()`
Reads the next line from the open file.

##### `Number readShort ()`
Reads the next binary unsigned short from the open file.

##### `Number readUInt ()`
Reads the next binary unsigned int from the open file.

##### `void seek ( Number offset, Number basis)`
Moves the currently file pointer position by offset bytes relative to basis = SEEK_SET : From the beginning of the file basis = SEEK_CUR : From the current file pointer position basis = SEEK_END : From the end of the file.

##### `void setpos (Number pos)`
Sets the seek file pointer to pos .

##### `Number size ()`
Returns the size in bytes of the file at path .

##### `void write ( String string)`
Writes sting to the open file.

##### `void writeFloat ( Number val)`
Writes a binary float number to the open file.

##### `void writeln ( String string)`
Writes string to the open file and attaches an new line charakter ('\n' ) to the string.

##### `void writeInt ( Number val)`
Writes a binary signed int number to the open file.

##### `void writeShort ( Number val)`
Writes a binary unsigned short number to the open file.

##### `void writeUInt ( Number val)`
Writes a binary unsigned int number to the open file.

### OS Class


The OS class offers various methods for performing some often used system calls like working with open and save panels for example.
none

#### Constructor
none

#### Methods

##### `void beep ()`
Performs a system beep.

##### `Number messageBox (String title, String message)`
Opens a message box with. The function returns 1 if the user clicked on the OK button and 0 otherwise.

##### `String runOpenPanel (String filetyp0, String filetyp1, ... )`
Opens a open panel which can load files with file extensions filetyp0, filetyp1, .... The function returns the path of the selected file. If the user clicked the Cancel button this function return null .

##### `String runSavePanel (String filetyp)`
Opens a save panel which can save files with file extension filetyp. The function returns the path of the selected file. If the user clicked the Cancel button this function return null .

##### `Number system (String command)`
Performs command in the Mac OS X terminal. You can use this function to call external command line applications from within Cheetah3D.

### Vec2D Object


The Vec2D objects represents a two dimensional vector. It's normally used for UV coords. Properties Number x,y Number u,v
Number x,y Number u,v

Constructor Vec2D ( Number x, Number y) Creates a two dimensional vector.

##### `Vec2D ( Number x, Number y)`
Creates a two dimensional vector.

Methods Vec2D add ( Vec2D a) Adds the vector a .

##### `Vec2D add ( Vec2D a)`
Adds the vector a .

##### `BOOL isEqual ( Vec2D a)`
Returns true if this vector and vector a are equal.

##### `Vec2D inverse ()`
Returns the inverse of this vecotr.

##### `Vec2D multiply (Number a) Vec2D multiply ( Vec2D a)`
Multiplys the vector with a .

##### `Number norm ()`
Returns the vector norm of the x and y components.

##### `Vec2D copy ()`
Creates a copy of the vector.

##### `void set ( Number x, Number y)`
Sets the values of the vector all at once.

##### `Vec2D sub ( Vec2D )`
Substracts the vector a .

### Vec3D Object


The Vec3D objects represents a three dimensional vector. It can be used either for vertices or control points.
Number x,y,z

#### Constructor

##### `Vec3D (Number x, Number y, Number z)`
Creates a three dimensional vector.

#### Methods

##### `Vec3D add ( Vec3D a)`
Adds the vector a .

##### `Vec3D cross ( Vec3D a)`
Returns the cross product of this x a .

##### `Vec3D convertEuler (Number current_order, Number new_order) Vec3D convertEuler (Number current_order, Number new_order, Vec3D tip)`
Converts a Euler rotation vector from the current rotation oder to the new rotation order. Please use the following constants for the rotation order: ROT_XYZ, ROT_XZY, ROT_YZX, ROT_YXZ, ROT_ZXY, ROT_ZYX or ROT_HPB. If you also offer a tip for the new euler ration vector Cheetah3D tries to keep the jump in the rotation values as small as possible.

##### `Number dot ( Vec3D a)`
Returns the dot product of < this, a> .

##### `BOOL isEqual ( Vec3D a)`
Returns true if this vector and vector a are equal.

##### `Vec3D inverse ()`
Returns the inverse of this vector.

##### `Vec3D multiply (Number a) Vec3D multiply ( Vec3D a)`
Multiplys the vector with a .

##### `Number norm ()`
Returns the vector norm of the x,y and z components.

##### `Vec3D copy ()`
Creates a copy of the vector.

##### `void set (Number x, Number y, Number z)`
Sets the values of the vector all at once.

##### `Vec3D sub ( Vec3D )`
Substracts the vector a .

### Vec4D Object


The Vec4D object represents a four dimensional vector. It is normally used to define colors.

#### Properties
Number x,y,z,w

#### Constructor

##### `Vec4D ( Number x, Number y, Number z, Number w)`
Creates a four dimensional vector.

#### Methods

##### `Vec4D add ( Vec4D a)`
Adds the vector a .

##### `BOOL isEqual ( Vec4D a)`
Returns true if this vector and vector a are equal.

##### `Vec4D inverse ()`
Returns the inverse of this vecotr.

##### `Vec4D multiply (Number a) Vec4D multiply ( Vec4D a)`
Multiplys the vector with a .

##### `Number norm ()`
Returns the vector norm of the r,g,b and a components.

##### `Vec4D copy ()`
Creates a copy of the vector.

##### `void set (Number r, Number g, Number b, Number a)`
Sets the values of the vector all at once.

##### `Vec4D sub ( Vec4D )`
Substracts the vector a .

### Mat3D Object


The Mat3D objects represents a 3x3 matrix. It's normally used for uv coords transformations.

#### Properties
Number m00, m01, m02 Number m10, m11, m12 Number m20, m21, m22

#### Constructor

##### `Mat3D () Mat3D (Number type, Number x, Number y)`
Creates a 3x3 matrix. If you pass no parameters a identity matrix will be created. For creating translation, scale or rotation matrices use for type on of the following constants {TRANSLATE, SCALE, ROTATE}

#### Methods

##### `Mat3D adjoint ()`
Returns an adjoint matrix.

##### `void concat ( Mat3D mat)`
Multiplys the matrix mat from the right hand side onto the current matrix.

##### `Mat3D copy ()`
Creates a copy of the matrix.

##### `Number determinant ()`
Returns the determinant of the matrix.

##### `Mat3D inverse ()`
Returns the inverse of the matrix.

##### `Vec2D multiply ( Vec2D vec) Vec3D multiply ( Vec3D vec) Mat3D multiply ( Mat3D mat)`
Performs a multiplication of a vector or an matrix. In case of the 2D vector the third vector component is assumed to be 1.

##### `Mat3D transpose ()`
Returns the transpose matrix.

### Mat4D Object


The Mat4D objects represents a 4x4 matrix. It's normally used for vertex transformations in 3D space.
Number m00, m01, m02, m03 Number m10, m11, m12, m13 Number m20, m21, m22, m23 Number m30, m31, m32, m33

#### Constructor

##### `Mat4D () Mat4D (Number type, Number x, Number y, Number z)`
Creates a 4x4 matrix. If you pass no parameters a identity matrix will be created. For creating translation, scale or rotation matrices use for type on of the following constants {TRANSLATE, SCALE, ROTATE, ROTATE_HPB}

#### Methods

##### `Mat4D adjoint ()`
Returns the adjoint matrix.

##### `void concat ( Mat4D mat)`
Multiplys the matrix mat from the right hand side onto the current matrix.

##### `Mat4D copy ()`
Creates a copy of the matrix.

##### `Number determinant ()`
Returns the determinant of the matrix.

##### `Mat4D inverse ()`
Returns the inverse of the matrix.

##### `Vec3D multiply ( Vec3D vec) Vec4D multiply ( Vec4D vec) Mat4D multiply ( Mat4D mat)`
Performs a multiplication of a vector or an matrix. In case of the 3D vector the forth vector component is assumed to be 1.

##### `Mat4D transpose ()`
Returns the transpose matrix.

### Cluster Object


Clusters can't be created with a constructor. To create a cluster use the addCluster() function of the Tag object.
Object link The joint object to which this cluster is linked.
Boolean linkBound The value of this property is true if the cluster is properly bound to a joint.
Boolean linkSelection The value of this property is true if the cluster is selected in the properties editor.
Vec3D bindPosePosition The value of the joints position property during binding.
Vec3D bindPoseRotation The value of the joints rotation property during binding.
Vec3D bindPoseScale The value of the joints scale property during binding.
Mat4D transformMatrix Reference transformation in which the transformLinkMatrix is given.
Mat4D transformLinkMatrix The transformation matrix of the joint object during binding.

#### Constructor
none

#### Methods

##### `Number controlPointCount ()`
Returns the number of control points in this cluster.

##### `Number[] controlPointIndexArray ()`
Returns the index array of the cluster.

##### `Number[] controlPointWeightArray ()`
Returns the weights array of the cluster.

##### `void setControlPoints (Number[] indices,Number[] weights)`
Sets the index and weights array of the cluster. Both arrays have to have the same number of entries.

### Constants


Tag types
ANCHORTAG Anchor tag
BAKETAG Bake tag
IKHANDLETAG IK Handle tag
IKCONSTRAINTTAG IK Constraint tag
METABALLTAG Metaball tag
MODETAG Mode tag
MORPHTAG Morph tag
ORIENTCONSTRAINTTAG Orient Constraint tag
PARENTCONSTRAINTTAG Parent Constraint tag
PARTICLETAG Particle tag
POINTCONSTRAINTTAG Point Constraint tag
POSETAG Pose Tag
PROPWINTAG Properties tag
RIGIDBODYTAG Rigid Body tag
ROPETAG Rope tag
SKELETONTAG Skeleton tag
SOFTBODYTAG Soft Body tag
SPLINEIKTAG Spline IK tag
UVTAG UV tag
SCRIPTTAG Script tag
SHADERTAG Shader tag
BALL Ball polygon object
BOX Box polygon object
DISC Disc polygon object
CONE Cone polygon object
CAPSULE Capsule polygon object
CYLINDER Cylinder polygon object
FRACTAL Fractal polygon object
PLANE Plane polygon object
POLYGONOBJ Polygon object
POLYHEDRA Polyhedra polygon object
TORUS Torus polygon object
TUBE Tube polygon object
SCRIPTPOLY Script polygon object
STAIR Stair polygon object
CIRCLE Circle spline object
COG Cog spline object
FLOWER Flower spline object
HELIX Helix spline object
LINE Line spline object
NEDGE Nedge spline object
RECT Rect spline object
SCRIPTSPLINE Script spline object
SPLINE Spline object
STAR Star spline object
TEXT Text spline object
BLUEPRINT Blueprint object
CAMERA Camera object
FOLDER Folder object
POINTLIGHT Point light source
SPOTLIGHT Spot light source
DISTANTLIGHT Distant light source
AREALIGHT Area light source
BOOLEAN Boolean creator object
CHAIN Chain creator object
EXTRUDE Extrude creator object
ISOSURFACE Isosurface creator object
LATHE Lathe creator object
POLYPLANE Polyplane creator object
RELIEF Relief creator object
SUBDIV Subdivision creator object
SWEEP Sweep creator object
SYMMETRY Symmetry creator object
ARRAYMOD Array modifier
CRUMPLEMOD Crumple modifier
BENDMOD Bend modifier
BOOLEANMOD Boolean modifier
BUILDMOD Build modifier
BULGEMOD Bulge modifier
DISPLACEMENTMOD Displacement modifier
RINGMOD Ring modifier
SHEARMOD Shear modifier
SHELLMOD Shell modifier
SMOOTHMOD Smooth modifier
SPHERIFYMOD Spherify modifier
SYMMETRYMOD Symmetry modifier
TAPERMOD Taper modifier
TRANSFORMMOD Transform modifier
TWISTMOD Twist modifier
WARPMOD Wrap modifier
PARTICLE Editable particle system
PARTICLEEMITTER Particle-Emitter object
PARTICLEARRAY Particle-Array object
PARTICLEMESH Particle-Mesh object
PARTICLESPLINE Particle-Spline object
PARTICLESCRIPT Particle-Script object
ORIENTATIONEFF Orientation effector
ATTRACTIONFORCE Attractor force object
DRAGFORCE Drag force object
DEFLECTORFORCE Deflector force object
GRAVITYFORCE Gravity force object
RADIALFORCE Radia force object
WINDFORCE Wind force object
MATERIAL Material object

Family types
OTHERFAMILY Objects which doesn't belong to another family type
SPLINEFAMILY Spline objects
LIGHTFAMILY Light objects
MODIFIERFAMILY Modifier objects
NGONFAMILY Polygon objects
TAGFAMILY Tags
LOADERFAMILY File loaders
PARTICLEFAMILY Partcile system objects
MATERIALFAMILY Materials
NODEFAMILY Node objects
SETTINGFAMILY Setting objects
FORCEFAMILY Force objects
EFFECTORFAMILY Effector objects

Edit modes
POINT_MODE Point mode
EDGE_MODE Edge mode
POLY_MODE Polygon mode
OBJECT_MODE Object mode

Modified hints
MODIFIED_NOTHING Nothings changed
MODIFIED_TRANSFORM A transformation parameter changed
MODIFIED_PARAMETER A non-transformation parameter changed
MODIFIED_GEOMETRY The geometry (polygon mesh or spline) changed
MODIFIED_MODI A modifier changed the geometry of the mesh
MODIFIED_PARTICLE A particle system changed
MODIFIED_TIME The time changed

Renderer types
CHEETAH Rendersettings for the Cheetah renderer
FALCON Rendersettings for the Falcon renderer

Rotation orders
ROT_XYZ XYZ rotation order
ROT_XZY XZY rotation order
ROT_YZX YZX rotation order
ROT_YXZ YXZ rotation order
ROT_ZXY ZXY rotation order
ROT_ZYX ZYX rotation order
ROT_HPB HPB rotation order

Selection types
EMPTY_SELECTION Object is not selected
PRIMARY_SELECTION Object is the primary selection
SECONDARY_SELECTION Object is a secondary selection

Parameter types
INT_PARAMETER Integere parameter
FLOAT_PARAMETER Float parameter
BOOL_PARAMETER Boolean parameter
STRING_PARAMETER String parameter
VEC2D_PARAMETER Vec2D parameter
VEC3D_PARAMETER Vec3D parameter
VEC4D_PARAMETER Vec4D parameter
TEXTURE_PARAMETER Texture parameter
LINK_PARAMETER Link parameter
GRADIENT_PARAMETER Gradient parameter
FLOAT_ARRAY_PARAMETER Float array parameter
