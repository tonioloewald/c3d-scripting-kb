---
name: cheetah3d-scripting
description: Write, fix, explain or port Cheetah3D (Mac 3D app) JavaScript scripts (Macro, Tool, Tag, Polygonobj, Splineobj, Particle). Use whenever someone asks for a C3D/Cheetah 3D script, plugin-style automation, or help with an existing .js for Cheetah3D.
---

# Cheetah3D scripting

Cheetah3D (by Martin Wengenmayer, current version 8.x) runs JavaScript (JavaScriptCore, ES5-era) scripts that the user places in
`~/Library/Application Support/Cheetah3D/Scripts/<Type>/`. Its official docs are thin and partly out of date. Most of the real
knowledge is in forum threads from 2006 to 2025. All of it has been collected in the knowledge base repo
**https://github.com/tonioloewald/c3d-scripting-kb**. Use that repo; do not rely on memory for API details.

## 0. Get the knowledge base

```bash
KB=${KB:-/tmp/c3dkb}
git clone --depth 1 https://github.com/tonioloewald/c3d-scripting-kb "$KB" 2>/dev/null || git -C "$KB" pull -q
```

Paths below are relative to `$KB`.

Key files (read what the task needs, not everything):

| File | Use it for |
|---|---|
| `knowledge/patterns.md` | **Start here.** Working skeletons for every script type plus common tasks (scene iteration, mesh/UV building, splines, materials, FCurve keyframes, files, include-a-library, rendering, PRNG, introspection) |
| `knowledge/gotchas.md` | Things the docs leave out or get wrong, with forum citations and version notes. Read the section for your topic before writing |
| `reference/api/<Class>.md` | Official 8.1.1 API per class (Base, Object, Document, PolyCore, SplineCore, ParticleCore, Particle, Tag, Material, Node, Parameter, TakeNode, FCurve, FCurveKey, File, OS, Vec2D/3D/4D, Mat3D/4D, Texture, Constants) |
| `reference/api-index.json` | Machine-readable method list, for checking that a call exists |
| `examples/official/<Type>/*.js` | The 17 example scripts bundled with 8.1.1: the strongest evidence of what works in 8.x |
| `catalog/CATALOG.md`, `catalog/forum-threads.json` | About 240 community scripts with a reported works/broken status, version notes and evidence. Check here first: the script may already exist |
| `scripts/forum/<thread>/` | Archived community scripts (CC-BY: keep the attribution header if you reuse one) |
| `forum/threads/<id>-*.md` | Full thread transcripts, for digging into a specific problem |
| `tools/c3d_lint.py` | Static checker. **Always run it on what you write** |

## 1. Pick the script type first

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

## 2. Hard rules (each one broke real scripts)

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

## 3. Workflow

1. **Clarify the target.** Find out which Cheetah3D version (assume 8.x), what the script should act on (the selection, the whole scene, or generated geometry), and whether it should be animatable or interactive. That decides the type.
2. **Check the catalog** (`catalog/CATALOG.md`; grep `catalog/forum-threads.json` for keywords). If a script already exists, point the user to it (with its status, evidence and author), adapt it, or fix it. Do not reinvent it silently.
3. **Start from the matching skeleton** in `knowledge/patterns.md`, then read the relevant `gotchas.md` section and the `reference/api/` pages for every class you touch. Use only methods that are in `api-index.json` or confirmed in gotchas.md. Mark anything else `// UNVERIFIED:` in the code.
4. **Write the script.**
   - Put a header comment with the name, type/folder, the minimum C3D version, usage and a credit line.
   - Write ES5: `var`, function declarations, no arrow functions, `let`/`const`, classes, template literals or modules. JavaScriptCore in older versions rejected newer syntax, and ES5 is the safe default.
   - Give every parameter a sensible default and range.
   - Report problems with `OS.messageBox` and `print`; do not fail silently.
5. **Lint.** Run `python3 $KB/tools/c3d_lint.py --type <Type> script.js`. Fix every ERROR. Fix each WARN or explain why it is fine. Passing lint does **not** mean the script works. Tell the user the script is untested until it has run in Cheetah3D, and list any `UNVERIFIED` lines.
6. **Deliver.** Give the file named `<Name>.js` and its install path (`~/Library/Application Support/Cheetah3D/Scripts/<Type>/`). Tell the user to relaunch Cheetah3D, or use **Update Scripts Menu** at the bottom of the Script menu if their version has it. Say how to run the script and where its UI appears; for a Tool, that is the Tool tab.
   - If the session can reach the user's Mac, offer to install the file there.
   - If computer use is available, offer to run it in Cheetah3D and read the console (add a Console panel by right-clicking any panel header).
7. **Debug reported failures in this order:** wrong folder, then a missing argument in an `addParameter*` call, then a wrong parameter name (introspect it), then a rebuild loop, then API drift between versions (gotchas §11, "Version history").

## 4. API at a glance (8.1.1)

Details and signatures are in `reference/api/`.

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

## 5. If something is unknown

Do not invent API. Options, in order:

1. Grep the knowledge base (`grep -rn "methodName" $KB/{knowledge,reference,examples,scripts/forum}`).
2. Write an introspection macro (patterns.md B11) for the user to run, and ask for the console output.
3. Mark the call `// UNVERIFIED` and tell the user exactly what to check.
