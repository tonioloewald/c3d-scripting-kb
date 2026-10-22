# Cheetah3D Script Patterns (targeting 8.x)

Minimal, canonical skeletons for each script type and common task. Read `knowledge/gotchas.md` first.

**How to read the source tags**

- Each pattern names its sources: official 8.1.1 examples ([ex: Parameter Info.js](../examples/official/Macro/Parameter%20Info.js) style links), forum threads ([#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/) style links), and *Learn 3D with Cheetah 3D* (Tonio Loewald) (`reference/book-ch17.8-scripts.md`).
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

## A. Script-type skeletons

### A1. Macro (`Scripts/Macro/`)

Runs once and has no UI. It receives the `Document`.

Sources: [ex: Parameter Info.js](../examples/official/Macro/Parameter%20Info.js), [ex: RotateObject.js](../examples/official/Macro/RotateObject.js), [#10088](https://www.cheetah3d.com/forum/index.php?threads/10088/), [#1422](https://www.cheetah3d.com/forum/index.php?threads/1422/).

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

Sources: [ex: Scale light intensity.js](../examples/official/Tool/Scale%20light%20intensity.js), [ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js), [#989](https://www.cheetah3d.com/forum/index.php?threads/989/), [#8848](https://www.cheetah3d.com/forum/index.php?threads/8848/), [#10282](https://www.cheetah3d.com/forum/index.php?threads/10282/), [#14324](https://www.cheetah3d.com/forum/index.php?threads/14324/), [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/).

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

Sources: [ex: CircleExpression.js](../examples/official/Tag/CircleExpression.js), [ex: Physics.js](../examples/official/Tag/Physics.js), [#5752](https://www.cheetah3d.com/forum/index.php?threads/5752/), [#13505](https://www.cheetah3d.com/forum/index.php?threads/13505/).

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

The trap is reading back the value you wrote last frame, which makes the effect build up. Take the base from the keyframes, or from a parameter stored on the tag. A full version, with automatic capture and a Capture button, is in [Wobble.js](../examples/generated/Wobble.js).

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

Sources: [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js), [ex: Menger.js](../examples/official/Polygonobj/Menger.js), [#574](https://www.cheetah3d.com/forum/index.php?threads/574/), [#1939](https://www.cheetah3d.com/forum/index.php?threads/1939/), [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/).

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

Creator variant: read the first child's evaluated mesh into this object. Sources: [#1939](https://www.cheetah3d.com/forum/index.php?threads/1939/), [#8015](https://www.cheetah3d.com/forum/index.php?threads/8015/), [#718](https://www.cheetah3d.com/forum/index.php?threads/718/).

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

Sources: [ex: Sinecircle.js](../examples/official/Splineobj/Sinecircle.js), [ex: Bounce.js](../examples/official/Splineobj/Bounce.js), [#12214](https://www.cheetah3d.com/forum/index.php?threads/12214/), [#14379](https://www.cheetah3d.com/forum/index.php?threads/14379/).

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

Sources: [ex: Particle Menger.js](../examples/official/Particle/Particle%20Menger.js), [ex: Particle Image.js](../examples/official/Particle/Particle%20Image.js), (book: Particle City), [#6905](https://www.cheetah3d.com/forum/index.php?threads/6905/).

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

## B. Common tasks

### B1. Iterate the scene graph

Sources: [ex: Scale light intensity.js](../examples/official/Tool/Scale%20light%20intensity.js), [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js), (book), [#4442](https://www.cheetah3d.com/forum/index.php?threads/4442/), [#9213](https://www.cheetah3d.com/forum/index.php?threads/9213/).

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

When exporting, don't descend into creator objects, because their children are inputs. Feature-detect the method name: the native method was spelled `isCeatorObj` before 7b20 [#12218](https://www.cheetah3d.com/forum/index.php?threads/12218/).

```js
function isCreator(o) {
    return o.isCreatorObj ? o.isCreatorObj() : (o.isCeatorObj ? o.isCeatorObj() : false);
}
```

### B2. Iterate mesh polygons (world space, UVs, triangles, materials)

Sources: [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js), [#4594](https://www.cheetah3d.com/forum/index.php?threads/4594/), [#11075](https://www.cheetah3d.com/forum/index.php?threads/11075/), [#5391](https://www.cheetah3d.com/forum/index.php?threads/5391/).

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

### B3. Build a mesh with UVs (grid)

Sources: [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js). It reuses `Vec2D` objects through `.set()` to avoid allocation in loops [#718](https://www.cheetah3d.com/forum/index.php?threads/718/).

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

For a mesh made from free-floating quads with welded vertices, use `core.buildVertexBSP(min, max)`, then `core.addPolygon(4, true, [Vec3D...])` per quad, then `core.destroyVertexBSP()`. Source: [ex: Menger.js](../examples/official/Polygonobj/Menger.js).

To set UVs on an existing mesh (Macro/Tool), call `core.setUVCoord(p, c, new Vec2D(u, v))` (set 1) or pass `new Vec4D(u1, v1, u2, v2)` (both sets), then `obj.update(); doc.redrawAll();` [#9816](https://www.cheetah3d.com/forum/index.php?threads/9816/) [#4058](https://www.cheetah3d.com/forum/index.php?threads/4058/).

### B4. Build a spline

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

To read a spline's points, sample the tessellated cache. Source: [ex: splineExport.js](../examples/official/Macro/splineExport.js).

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

### B5. Add a material and assign it

Sources: [docs: Document](../reference/api/Document.md) (`addMaterial`), [#8015](https://www.cheetah3d.com/forum/index.php?threads/8015/) (SHADERTAG + `"material"`), [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) (`diffColor` on node 0), [#2695](https://www.cheetah3d.com/forum/index.php?threads/2695/) (per-selection). **VERIFY in 8.1.1** (gotchas Verify #8).

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

To list parameter names on a material or node, use `mat.parameterInfo()` and `node.inputCount()/inputAtIndex(i).name()`. Node IDs for `addConnection` come from `node.id()` (FORUM) [#9078](https://www.cheetah3d.com/forum/index.php?threads/9078/).

### B6. Keyframe a parameter through FCurves (6.0+)

Sources: [#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/) (tg_jp), [ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js), [#9041](https://www.cheetah3d.com/forum/index.php?threads/9041/).

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

To edit existing keys, call `var k = curve.keyAtIndex(i)`, modify it, then `curve.setKeyAtIndex(k, i)` and finally `curve.update()` ([ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js)). To read the animated value, call `curve.valueAtTime(t)`.

### B7. Read and write a file

Sources: [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js), [ex: splineExport.js](../examples/official/Macro/splineExport.js), [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/), [#10841](https://www.cheetah3d.com/forum/index.php?threads/10841/), [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/), [#9707](https://www.cheetah3d.com/forum/index.php?threads/9707/).

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

### B8. Include a shared library with indirect eval

Sources: [#9039](https://www.cheetah3d.com/forum/index.php?threads/9039/), [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/), [#9290](https://www.cheetah3d.com/forum/index.php?threads/9290/). Put library files in `~/Library/Application Support/Cheetah3D/Scripts/Library/`. That folder is not a type folder, so it never appears in the menus.

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
- Macros receive a `Document`, which does not document `scriptPath()` (VERIFY). In a Macro, either hard-code the path, or get `$HOME` through `OS.system("echo $HOME > /tmp/c3d_home.txt")` and read that file [#6458](https://www.cheetah3d.com/forum/index.php?threads/6458/).

### B9. Render frames to files

Sources: [ex: RotateObject.js](../examples/official/Macro/RotateObject.js), [ex: QTVR Helper.js](../examples/official/Macro/QTVR%20Helper.js), [#2262](https://www.cheetah3d.com/forum/index.php?threads/2262/), [#2110](https://www.cheetah3d.com/forum/index.php?threads/2110/), [#5998](https://www.cheetah3d.com/forum/index.php?threads/5998/), [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/).

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

For changes the timeline doesn't drive, such as rotating an object between renders, set the parameter, call `obj.update()`, then call `doc.render(path)` ([ex: RotateObject.js](../examples/official/Macro/RotateObject.js)). After joint or skin edits, call `update()` on every object, children first, before rendering [#5998](https://www.cheetah3d.com/forum/index.php?threads/5998/).

### B10. Deterministic PRNG (stable across rebuilds and reloads)

`buildObject` re-runs often, so `Math.random()` makes geometry change on its own. Use a seeded generator driven by a parameter. Sources: (book: Particle City LCG), [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/), [#8033](https://www.cheetah3d.com/forum/index.php?threads/8033/), [#13601](https://www.cheetah3d.com/forum/index.php?threads/13601/).

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

### B11. Introspect anything (first thing to run on an unknown object)

Sources: [ex: Parameter Info.js](../examples/official/Macro/Parameter%20Info.js), (book `describe()`), [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/), [#7187](https://www.cheetah3d.com/forum/index.php?threads/7187/).

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

### B12. Tool that edits the children of the selection, with undo [VERIFY merge behaviour]

See [Distribute Selected.js](../examples/generated/Distribute%20Selected.js) for the full script.

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
