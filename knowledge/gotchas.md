# Cheetah3D Scripting Gotchas (targeting 8.x)

The things the official docs leave out, get wrong, or no longer describe correctly. This page is for anyone (human or AI) writing Cheetah3D JavaScript for **8.x**.

**Sources and conventions**

- Forum citations look like [#574](https://www.cheetah3d.com/forum/index.php?threads/574/). Each one links to the archived thread (`forum/threads/<id>-*.md`). The thread's dates are in `catalog/forum-threads.json`.
- "Docs" means the official 8.1.1 reference in `reference/api/*.md`. A link like [docs: Base](../reference/api/Base.md) points to a page there.
- "Example" means a script bundled with 8.1.1 in `examples/official/`, linked like [ex: Parameter Info.js](../examples/official/Macro/Parameter%20Info.js). These are the best evidence of what still works in 8.x.
- **(pre-7; unverified in 8.x)**: the claim comes only from threads that end before Cheetah3D 7 (about 2016) and nothing newer confirms it.
- **DOCS-CONFLICT**: the forum or an example contradicts the 8.1.1 reference.
- **DOCS-GAP**: the forum or an example relies on behaviour or API that the reference does not document.
- **[verify]**: the claim is on the "Verify in app" list at the end.

---

## 1. Script types and installation

- **The folder decides the script type, not the file contents.** User scripts live in `~/Library/Application Support/Cheetah3D/Scripts/<Type>/`. The types are `Macro`, `Tool`, `Polygonobj`, `Splineobj`, `Particle` and `Tag`. The docs write `scripts` in lowercase; the forum and examples write `Scripts`. The macOS filesystem is case-insensitive, so both work. [docs: ExecuteScript](../reference/ExecuteScript.md) [#808](https://www.cheetah3d.com/forum/index.php?threads/808/) [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [#2627](https://www.cheetah3d.com/forum/index.php?threads/2627/) [#5752](https://www.cheetah3d.com/forum/index.php?threads/5752/) [#6652](https://www.cheetah3d.com/forum/index.php?threads/6652/) [#7522](https://www.cheetah3d.com/forum/index.php?threads/7522/) [#8307](https://www.cheetah3d.com/forum/index.php?threads/8307/) [#9025](https://www.cheetah3d.com/forum/index.php?threads/9025/)
- **A script in the wrong folder fails in confusing ways.** Possible symptoms:
  - `Object.setParameter() couldn't find parameter called name` or `... normalType`, because the host object is a different kind [#970](https://www.cheetah3d.com/forum/index.php?threads/970/) [#4334](https://www.cheetah3d.com/forum/index.php?threads/4334/) [#10257](https://www.cheetah3d.com/forum/index.php?threads/10257/)
  - `'undefined' is not a function (evaluating 'core.addParticle()')`: a Particle script in Polygonobj gets a PolyCore [#7356](https://www.cheetah3d.com/forum/index.php?threads/7356/)
  - the script silently does nothing: a Macro in Tool, or a main() script anywhere other than Macro [#989](https://www.cheetah3d.com/forum/index.php?threads/989/) [#2565](https://www.cheetah3d.com/forum/index.php?threads/2565/) [#6373](https://www.cheetah3d.com/forum/index.php?threads/6373/)
  - a "Polygon script" object appears instead of a tool, or the app freezes or crashes [#1099](https://www.cheetah3d.com/forum/index.php?threads/1099/) [#1298](https://www.cheetah3d.com/forum/index.php?threads/1298/) [#6367](https://www.cheetah3d.com/forum/index.php?threads/6367/) [#12264](https://www.cheetah3d.com/forum/index.php?threads/12264/) [#10416](https://www.cheetah3d.com/forum/index.php?threads/10416/)
  - JS errors in a spline or particle script [#1284](https://www.cheetah3d.com/forum/index.php?threads/1284/) [#1456](https://www.cheetah3d.com/forum/index.php?threads/1456/) [#7347](https://www.cheetah3d.com/forum/index.php?threads/7347/) [#10106](https://www.cheetah3d.com/forum/index.php?threads/10106/)

  When debugging, check the folder first.
- **Only `.js` files are listed.** Unzip `*.js.zip` downloads. [#808](https://www.cheetah3d.com/forum/index.php?threads/808/) [#1448](https://www.cheetah3d.com/forum/index.php?threads/1448/)
- **New script files need a menu refresh.** Use the "Update Scripts Menu" / "Update menu" item at the bottom of the Script menu (5.x+), or relaunch. Edits to a script that is already listed are picked up without a restart; you may need to re-pick it from the menu. The docs only say "restart Cheetah3D" (DOCS-GAP). [#812](https://www.cheetah3d.com/forum/index.php?threads/812/) [#1145](https://www.cheetah3d.com/forum/index.php?threads/1145/) [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [#6373](https://www.cheetah3d.com/forum/index.php?threads/6373/) [docs: ExecuteScript](../reference/ExecuteScript.md)
- **Subfolders inside a type folder are fine. A new top-level folder under `Scripts/` is not shown in the menus.** You can use that to hold shared library code: see `Scripts/Library` in §7. [#9025](https://www.cheetah3d.com/forum/index.php?threads/9025/) [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/)
- **Scenes reference script objects and tags by script file name.** If you rename the `.js` file (even spaces to underscores), saved `.jas` files no longer find it and the stored parameter values are lost. Keep filenames stable across versions. [#6905](https://www.cheetah3d.com/forum/index.php?threads/6905/)
- **Telling the type from the source** (heuristic from the user's book):
  - `main(doc)` means Macro.
  - `buildObject` plus `addParticle` means Particle.
  - `buildObject` plus `move/line/curve` means Splineobj.
  - `buildObject` with neither means Polygonobj.
  - Only `buildUI`, maybe with `performExpression`, means Tag.
  - `buildUI` plus a button callback and no `buildObject` means Tool.

  See `reference/book-ch17.8-scripts.md`.
- **Only Tool scripts get a parameter panel**, and it is shown in the **Tool** tab of the properties panel. If your layout has no Tool tab, the tool seems to do nothing. Macros run immediately and have no UI. [#2110](https://www.cheetah3d.com/forum/index.php?threads/2110/) [#10843](https://www.cheetah3d.com/forum/index.php?threads/10843/) [#12598](https://www.cheetah3d.com/forum/index.php?threads/12598/)
- **Tool parameter values reset every time the tool is invoked from the menu.** The tool-history hotkeys and the factory icon keep values. [#2280](https://www.cheetah3d.com/forum/index.php?threads/2280/)
- **You cannot create a working script object from another script.** `doc.addObject(SCRIPTSPLINE)` followed by `setParameter("scriptName", path)` gives an object with no parameters (Martin, 7b19). There was also no documented way to set which script a script tag created this way runs. [#12214](https://www.cheetah3d.com/forum/index.php?threads/12214/) [#11084](https://www.cheetah3d.com/forum/index.php?threads/11084/)
- **Hotkeys:** bind a script through macOS System Settings › Keyboard › App Shortcuts using the exact menu title (the file name), or through Cheetah3D's own shortcut settings. External automation (JXA/System Events) can then trigger macros. [#2280](https://www.cheetah3d.com/forum/index.php?threads/2280/) [#3342](https://www.cheetah3d.com/forum/index.php?threads/3342/) [#6373](https://www.cheetah3d.com/forum/index.php?threads/6373/) [#11774](https://www.cheetah3d.com/forum/index.php?threads/11774/)
- **No native plug-ins and no loading of unsigned external code** (Mac App Store sandbox, 2012). Helper executables run through `OS.system` work. On macOS 10.12+, Gatekeeper must be allowed to run a bundled helper. [#9039](https://www.cheetah3d.com/forum/index.php?threads/9039/) [#12343](https://www.cheetah3d.com/forum/index.php?threads/12343/)
- **The bundled examples start with an optional header comment**, `//C3D_VERSION_REQUIREMENT 7.0.0`, which presumably gates loading on older versions. DOCS-GAP. [ex: Particle Image.js](../examples/official/Particle/Particle%20Image.js)

## 2. Entry points and lifecycle

- **Hook functions by type.** Only these names are called; others are ignored.

  | Type | Hooks |
  |---|---|
  | Macro | `main(doc)` |
  | Tool | `buildUI(tool)`, plus button callbacks `fn(tool)` |
  | Polygonobj / Splineobj / Particle | `buildUI(obj)` once when the object is created, and `buildObject(obj)` on every rebuild |
  | Tag | `buildUI(tag)`, plus `performExpression(tag)` (7.0+) |

  `apply(tag)`, `buildObject(tag)` and `applyParameters(tag)` are **not** called on tags. [#989](https://www.cheetah3d.com/forum/index.php?threads/989/) [#1577](https://www.cheetah3d.com/forum/index.php?threads/1577/) [#4058](https://www.cheetah3d.com/forum/index.php?threads/4058/) [#10432](https://www.cheetah3d.com/forum/index.php?threads/10432/) [#13505](https://www.cheetah3d.com/forum/index.php?threads/13505/) [ex: CircleExpression.js](../examples/official/Tag/CircleExpression.js)
- **Expression tags (`performExpression`) are 7.0+ and missing from the docs** (DOCS-GAP: [docs: Tag](../reference/api/Tag.md) never mentions the hook).
  - Before 7, tag scripts could only add parameters: Martin in 2006 and again in May 2014. [#574](https://www.cheetah3d.com/forum/index.php?threads/574/) [#10432](https://www.cheetah3d.com/forum/index.php?threads/10432/)
  - By convention the first parameter is an Int named `priority` (`addParameterInt("priority",10,0,1000,true,true)`), which evidently sets evaluation order.
  - Inside the hook, use `tag.owner()` and `tag.document().animationTime()`.
  - Write with `owner.setParameter(name, v, false)`.

  [#5752](https://www.cheetah3d.com/forum/index.php?threads/5752/) [#13505](https://www.cheetah3d.com/forum/index.php?threads/13505/) [ex: CircleExpression.js](../examples/official/Tag/CircleExpression.js)
- **The core is empty at the start of each `buildObject`.** Every official generator appends to `obj.core()` with no clearing step, so treat `buildObject` as "regenerate from scratch" (inferred from the examples). [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js) [ex: Sinecircle.js](../examples/official/Splineobj/Sinecircle.js) [ex: Particle Menger.js](../examples/official/Particle/Particle%20Menger.js)
- **Calling `setParameter()` inside `buildObject()` causes an infinite rebuild loop.** This applies to the script object itself and to other objects or tags. It may only show up during final or movie rendering, after several good frames.
  - Always pass `false` as the third argument there.
  - Never write the script object's own parameters from `buildObject`.

  [#574](https://www.cheetah3d.com/forum/index.php?threads/574/) [#7885](https://www.cheetah3d.com/forum/index.php?threads/7885/) [#8338](https://www.cheetah3d.com/forum/index.php?threads/8338/) [#8739](https://www.cheetah3d.com/forum/index.php?threads/8739/)
- **Set `obj.setCreatorObj(true)` in `buildUI` if the script reads its children.** Otherwise `buildObject` is not re-run when a child changes (for example a spline being edited). [#574](https://www.cheetah3d.com/forum/index.php?threads/574/) [#1284](https://www.cheetah3d.com/forum/index.php?threads/1284/) [#1647](https://www.cheetah3d.com/forum/index.php?threads/1647/) [#1939](https://www.cheetah3d.com/forum/index.php?threads/1939/)
- **`buildObject` runs at unpredictable times**: viewport navigation, app re-activation, scene rebuilds, and every render. Anything unseeded, such as `Math.random()`, changes the shape: the official Grassy Knoll example does exactly this. Use a seeded PRNG (see patterns) or cache random values and only regenerate them from a button. [#970](https://www.cheetah3d.com/forum/index.php?threads/970/) [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [#8033](https://www.cheetah3d.com/forum/index.php?threads/8033/) [#13601](https://www.cheetah3d.com/forum/index.php?threads/13601/) [ex: Grassy Knoll.js](../examples/official/Polygonobj/Grassy%20Knoll.js)
- **A script object only rebuilds during playback or rendering if one of its own parameters or transforms changes.** For simulations or time-driven output, add a `time`/`frame`/`timer` parameter and keyframe it (0 at the first frame, a large value at the last). Moving children, linked objects or parent-constrained children may **not** trigger a rebuild. [#713](https://www.cheetah3d.com/forum/index.php?threads/713/) [#3350](https://www.cheetah3d.com/forum/index.php?threads/3350/) [#4334](https://www.cheetah3d.com/forum/index.php?threads/4334/) [#7885](https://www.cheetah3d.com/forum/index.php?threads/7885/) [#9461](https://www.cheetah3d.com/forum/index.php?threads/9461/) [#8025](https://www.cheetah3d.com/forum/index.php?threads/8025/) [#9251](https://www.cheetah3d.com/forum/index.php?threads/9251/) [#574](https://www.cheetah3d.com/forum/index.php?threads/574/)
- **Calling `obj.update()` on a script object re-runs its `buildObject`.** Script objects cannot read each other's JS globals; pass data through parameters or temp files. JS globals persist between `buildObject` calls of one script (the examples keep state in globals). [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [ex: Particle Menger.js](../examples/official/Particle/Particle%20Menger.js) [verify]
- **Children of a Polygonobj/Splineobj script are treated as inputs, not rendered output.** Put visible geometry outside the script hierarchy, or generate it in `buildObject`. [#2262](https://www.cheetah3d.com/forum/index.php?threads/2262/) [#9251](https://www.cheetah3d.com/forum/index.php?threads/9251/)
- **Order matters at render time.** A script object that drives other objects must sit **above** them in the Object Browser. [#8338](https://www.cheetah3d.com/forum/index.php?threads/8338/)
- **Creating scene objects from inside `buildObject` is risky.** `document().addObject()` inside `buildObject` crashed in 2006 (3.x) [#1072](https://www.cheetah3d.com/forum/index.php?threads/1072/). A 2024 script does it safely by creating children **once** (`if (obj.childCount()==0)`) and then only updating their parameters with `child.update()` [#14381](https://www.cheetah3d.com/forum/index.php?threads/14381/). Prefer Macros or Tools for creating objects.
- **Long loops block the whole UI.** Hooks run synchronously on the main thread: no redraw, no progress bar, no background execution, and minutes-long beachballs on dense meshes. [#3350](https://www.cheetah3d.com/forum/index.php?threads/3350/) [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [#7079](https://www.cheetah3d.com/forum/index.php?threads/7079/) [#10416](https://www.cheetah3d.com/forum/index.php?threads/10416/)
- **Scripts cannot react to selection changes or detect modifier keys**, and cannot attach to the document itself. Tag scripts can attach to any object, including cameras and folders. [#11014](https://www.cheetah3d.com/forum/index.php?threads/11014/) [#9290](https://www.cheetah3d.com/forum/index.php?threads/9290/)
- **Version-specific crashes (4.3, fixed in the next release):**
  - `tool.document().animationEnd()` inside a Tool's `buildUI` crashed on first open.
  - `print()` in a Tool's `buildUI` printed nothing the first time.

  (pre-7; unverified in 8.x) [#2375](https://www.cheetah3d.com/forum/index.php?threads/2375/)

## 3. Parameters

- **Every `addParameter*` call must receive all of its documented arguments**, including the trailing booleans. Omitting them can **crash** Cheetah3D rather than throw: `addParameterBool("x", true)` crashed 7.3.3, 7.5.2 and 8.0b3.
  - Note: the official Menger.js calls `addParameterBool(name, init, min, max)` with 4 of 6 arguments, so some short forms survive. Do not rely on that. [verify]

  [#11084](https://www.cheetah3d.com/forum/index.php?threads/11084/) [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/) [ex: Menger.js](../examples/official/Polygonobj/Menger.js)
- **`addParameterBool` really does take `(name, init, min, max, animate, build)`**, with boolean min and max. That looks odd, but it is not a doc typo. Pass `false, true` for min and max. [#1326](https://www.cheetah3d.com/forum/index.php?threads/1326/) [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/) [docs: Base](../reference/api/Base.md)
- **Only call `addParameter*` inside `buildUI()`** (docs). Calling `buildUI()` yourself from a Macro still crashed in 2015. Macros cannot add editable parameters to arbitrary objects. [#11084](https://www.cheetah3d.com/forum/index.php?threads/11084/) [docs: Base](../reference/api/Base.md)
- **The parameter name is also the UI label, and it is case-sensitive.** For example, a Text spline uses `"text"`, not `"Text"`. [#1577](https://www.cheetah3d.com/forum/index.php?threads/1577/) [#13505](https://www.cheetah3d.com/forum/index.php?threads/13505/)
- **Reserved and colliding names: do not reuse built-in parameter names for your own parameters.** Script objects already carry these, as seen in parameter dumps:
  - `name`, `scriptName`, `locked`, `position`, `rotation`, `scale`, `shear`, `pivot`, `prefrot`, `postrot`, `prerot`, `rotorder`, `order`
  - `editorActive`, `renderActive`, `editorShading`, `displayType`
  - `seed` on particle objects
  - a hidden `type`

  A parameter named **`type`** made the object vanish after save and reopen. [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) (book)
- **Exception: `normalType` and `normalAngle` on polygon scripts.** The 8.x GrapherUV example deliberately declares parameters named `normalType` (selector flat/phong/constraint) and `normalAngle`, then calls `setParameter("normalType",1)`. Re-declaring those names is how a polygon script exposes the host's smoothing controls. Old forum code calls `setParameter("normalType"/"normalAngle", ...)` without declaring them. [#812](https://www.cheetah3d.com/forum/index.php?threads/812/) [#4442](https://www.cheetah3d.com/forum/index.php?threads/4442/) [#10572](https://www.cheetah3d.com/forum/index.php?threads/10572/) [#13746](https://www.cheetah3d.com/forum/index.php?threads/13746/) [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js) [verify]
- **Parameter names containing a dot broke in 7 beta 18** (fixed in b19). Avoid dots anyway: `.tex` is a real suffix, see the texture bullet below. [#8338](https://www.cheetah3d.com/forum/index.php?threads/8338/)
- **Parameter names must be unique within one script.** Two selectors with the same name share state. [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/)
- **The third argument of `setParameter(name, value, update)`**: `false` suppresses the scene-graph update. Use it in `buildObject` and `performExpression`, and when writing from one object to another. The overload was added in 3.2 and has been reliable since 3.3. With `true` or omitted, the scene updates and the material preview refreshes, although the color well might not. [#574](https://www.cheetah3d.com/forum/index.php?threads/574/) [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [#5752](https://www.cheetah3d.com/forum/index.php?threads/5752/) [#7885](https://www.cheetah3d.com/forum/index.php?threads/7885/) [#8739](https://www.cheetah3d.com/forum/index.php?threads/8739/) [ex: CircleExpression.js](../examples/official/Tag/CircleExpression.js) [docs: Base](../reference/api/Base.md)
- **Selectors:**
  - `getParameter` on a selector returns the selected **index**. Wrap it in `parseInt()` before using it in a `switch`.
  - `setParameter(name, index)` sets it.
  - Option labels go through Cheetah3D's `Localizable.strings`, so `"point"` may display as "Points".
  - A selector with a very long option list was suspected of crashing (Leopard era).

  [#1145](https://www.cheetah3d.com/forum/index.php?threads/1145/) [#4058](https://www.cheetah3d.com/forum/index.php?threads/4058/) [#6801](https://www.cheetah3d.com/forum/index.php?threads/6801/) [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js)
- **Defaults.** Script objects have no UI for user defaults. Set initial values in `buildUI` *after* adding the parameters, for example `obj.setParameter("name","My Thing")` or `obj.setParameter("connect", true)`. Min and max limits come only from the `addParameter*` arguments; to raise a limit, edit the script. [#10603](https://www.cheetah3d.com/forum/index.php?threads/10603/) [#664](https://www.cheetah3d.com/forum/index.php?threads/664/) [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js)
- **Button callbacks** are given by name as a string: `addParameterButton(label, buttonTitle, "fnName")` calls the global `fnName(obj)`. [#989](https://www.cheetah3d.com/forum/index.php?threads/989/) [#1801](https://www.cheetah3d.com/forum/index.php?threads/1801/) [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js)
- **A Tool text field being edited is not committed until it loses focus.** Clicking a button straight after typing uses the old value. [#6600](https://www.cheetah3d.com/forum/index.php?threads/6600/) [#1326](https://www.cheetah3d.com/forum/index.php?threads/1326/)
- **`getParameter` on a name the object lacks throws.** The error is "couldn't find parameter called X". Guard by checking `obj.parameterInfo()` (an array of `[name, typeString]`) or `obj.parameterWithName(name)` first. [#3610](https://www.cheetah3d.com/forum/index.php?threads/3610/) [#4374](https://www.cheetah3d.com/forum/index.php?threads/4374/)
- **Discover names with introspection, not the docs.**
  - Use `parameterInfo()`, or `parameterCount()`/`parameterAtIndex(i).name()`/`.type()`.
  - The bundled Macro `Parameter Info.js` prints them.
  - Parameter names change between versions: light parameters changed in 3.1→3.2 and 3.4→3.5, and material parameters in 5.0.

  [#626](https://www.cheetah3d.com/forum/index.php?threads/626/) [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#7671](https://www.cheetah3d.com/forum/index.php?threads/7671/) [#9038](https://www.cheetah3d.com/forum/index.php?threads/9038/) [#9627](https://www.cheetah3d.com/forum/index.php?threads/9627/) [ex: Parameter Info.js](../examples/official/Macro/Parameter%20Info.js)
- **When dumping, skip `getParameter` on `Link`-type entries,** or print them specially. `print()` needs strings (§10). [#7187](https://www.cheetah3d.com/forum/index.php?threads/7187/) [#8220](https://www.cheetah3d.com/forum/index.php?threads/8220/)
- **Link parameters.** `addParameterLink(name, build)` gives an object picker; `getParameter(name)` returns the linked **object** (or null). Links are a cleaner input than relying on child order.
  - A Link to animated particles does not trigger a rebuild when they move.
  - IK and constraint `target`/`pole` links did not copy through get/setParameter in mirror-copy scripts.

  [#10106](https://www.cheetah3d.com/forum/index.php?threads/10106/) [#10603](https://www.cheetah3d.com/forum/index.php?threads/10603/) [#13505](https://www.cheetah3d.com/forum/index.php?threads/13505/) [#14324](https://www.cheetah3d.com/forum/index.php?threads/14324/) [#8025](https://www.cheetah3d.com/forum/index.php?threads/8025/) [#1448](https://www.cheetah3d.com/forum/index.php?threads/1448/) [#12535](https://www.cheetah3d.com/forum/index.php?threads/12535/)
- **Texture parameters.** `getParameter("Tex")` returns the **path string**; `getParameter("Tex.tex")` returns a `Texture` object (`width`, `height`, `sample(s,t)`, `pixel(x,y)`) or null. This removes the old need to shell out to `sips` for image size. [docs: Texture](../reference/api/Texture.md) [ex: Particle Image.js](../examples/official/Particle/Particle%20Image.js) [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/) [#11838](https://www.cheetah3d.com/forum/index.php?threads/11838/)
- **Particle objects already have an Int `seed` parameter.** It is not called "Random Seed" or "particlesSeed". Read it with `obj.getParameter("seed")`. (book)

## 4. Geometry: PolyCore, SplineCore, ParticleCore

- **Accessors return copies.** `core.vertex(i)` returns a copy, so `core.vertex(i).add(v)` changes nothing. Write it back: `core.setVertex(i, core.vertex(i).add(v))`. The same applies to `getParameter("position")` and the like: change the value, then call `setParameter`. [#3528](https://www.cheetah3d.com/forum/index.php?threads/3528/) [#1226](https://www.cheetah3d.com/forum/index.php?threads/1226/) [ex: RotateObject.js](../examples/official/Macro/RotateObject.js)
- **Use the return values of Vec3D math.** Treat `add/sub/multiply/cross` as returning new vectors (as the examples do); only `set()` is documented as changing the vector in place. [verify] [ex: Particle Menger.js](../examples/official/Particle/Particle%20Menger.js)
- **`core()` and `modCore()` are different.**
  - `core()` is the editable base mesh; it is empty (vertexCount 0) for creators and folders.
  - `modCore()` is the mesh after modifiers, for reading.
  - **Neither includes the object transform.** For world space, multiply by `obj.obj2WorldMatrix()`. For a child's geometry relative to the script object, use the child's `objMatrix()`.
  - Child or parent scaling is not reflected in `getParameter("scale")`.

  [#718](https://www.cheetah3d.com/forum/index.php?threads/718/) [#970](https://www.cheetah3d.com/forum/index.php?threads/970/) [#1099](https://www.cheetah3d.com/forum/index.php?threads/1099/) [#1298](https://www.cheetah3d.com/forum/index.php?threads/1298/) [#3537](https://www.cheetah3d.com/forum/index.php?threads/3537/) [#4594](https://www.cheetah3d.com/forum/index.php?threads/4594/) [#5391](https://www.cheetah3d.com/forum/index.php?threads/5391/) [#6840](https://www.cheetah3d.com/forum/index.php?threads/6840/) [#10525](https://www.cheetah3d.com/forum/index.php?threads/10525/) [#12987](https://www.cheetah3d.com/forum/index.php?threads/12987/) [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js)
- **Skinned (Skeleton-tag) meshes report pre-deformation positions** from `core()`/`modCore()`. [#10525](https://www.cheetah3d.com/forum/index.php?threads/10525/)
- **After editing an object's mesh from a Macro or Tool, call `obj.update()`.** Then call `doc.redrawAll()` if needed. Forum code even calls `setVertex` on a `modCore()` and then `update()`. [#6840](https://www.cheetah3d.com/forum/index.php?threads/6840/) [#8165](https://www.cheetah3d.com/forum/index.php?threads/8165/) [#9816](https://www.cheetah3d.com/forum/index.php?threads/9816/) [docs: Object](../reference/api/Object.md)
- **Vertices are shared and indexed.** `vertexCount()` is not the number of corners. Map polygon corners to vertices with `vertexIndex(p, c)`. [#10400](https://www.cheetah3d.com/forum/index.php?threads/10400/) [#1939](https://www.cheetah3d.com/forum/index.php?threads/1939/)
- **UVs are per polygon corner and come back as a `Vec4D`** (since 4.6). x,y hold UV set 1 and z,w hold UV set 2: `uvCoord(p,c).x/.y` give U/V. Deduplicate them yourself for exporters. [#2280](https://www.cheetah3d.com/forum/index.php?threads/2280/) [#5391](https://www.cheetah3d.com/forum/index.php?threads/5391/) [#11075](https://www.cheetah3d.com/forum/index.php?threads/11075/) [#4058](https://www.cheetah3d.com/forum/index.php?threads/4058/) [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js)
- **Pass Vec2D UVs to `addIndexPolygon`.** Since 4.6, passing `uvCoord()`'s Vec4D results errors with `Wrong elemet in uv array`; convert with `new Vec2D(uv.x, uv.y)`. **DOCS-CONFLICT**: the 8.1.1 docs list an `addIndexPolygon(size, vindex[], Vec4D uv[])` overload, so this may have been fixed. The official GrapherUV uses `Vec2D`, which is the safe choice. [#466](https://www.cheetah3d.com/forum/index.php?threads/466/) [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [#1731](https://www.cheetah3d.com/forum/index.php?threads/1731/) [#8015](https://www.cheetah3d.com/forum/index.php?threads/8015/) [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js) [verify]
- **`setUVCoord(p, c, uv)` accepts `Vec2D` (set 1) or `Vec4D` (both sets).** A generated mesh can carry two UV sets; Hair.js puts the base UV in set 1 and its own UV in set 2. [#4058](https://www.cheetah3d.com/forum/index.php?threads/4058/) [#9816](https://www.cheetah3d.com/forum/index.php?threads/9816/) [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [docs: PolyCore](../reference/api/PolyCore.md)
- **Polygon script objects get no UVs automatically.** If you don't generate them, textures don't map and only flat colour shows. [#2581](https://www.cheetah3d.com/forum/index.php?threads/2581/)
- **There is no vertex colour API** (8.x, 2025). The workaround is to store per-vertex data in a UV channel. [#14613](https://www.cheetah3d.com/forum/index.php?threads/14613/)
- **Two ways to build a mesh:**
  - `addVertex(false, v)` returns an index, then `addIndexPolygon(n, indices[, uvs])`.
  - `addPolygon(n, true, [Vec3D...])` with `meshed=true` welds coincident vertices.

  Wrap bulk `addVertex(true, ...)`/`addPolygon(..., true, ...)` in `buildVertexBSP(min,max)` … `destroyVertexBSP()` for speed. [#4058](https://www.cheetah3d.com/forum/index.php?threads/4058/) [#10572](https://www.cheetah3d.com/forum/index.php?threads/10572/) [#13746](https://www.cheetah3d.com/forum/index.php?threads/13746/) [ex: Grassy Knoll.js](../examples/official/Polygonobj/Grassy%20Knoll.js) [ex: Menger.js](../examples/official/Polygonobj/Menger.js)
- **`addIndexPolygon` with a nonexistent vertex index can crash** (docs). Malformed faces, such as bad indices or some degenerate n-gons that File › Import accepts, crashed in `MWMValenceTable::buildValenceTable` in 2020. Validate faces before adding them. [#13746](https://www.cheetah3d.com/forum/index.php?threads/13746/) [docs: PolyCore](../reference/api/PolyCore.md)
- **Winding**: reverse the order of OBJ-style indices to match Cheetah3D's winding. `flipWinding(p)` flips one polygon. (book) [#13746](https://www.cheetah3d.com/forum/index.php?threads/13746/)
- **Moving vertices onto each other does not weld them.** Use `mergeVertices(tol)`, or rebuild the polygons with `addIndexPolygon` pointing at the kept index. [#1226](https://www.cheetah3d.com/forum/index.php?threads/1226/) [docs: PolyCore](../reference/api/PolyCore.md)
- **Triangles:** for `t` in `0..polygonSize(p)-3`, `core.triangle(p,t)` returns 3 **polygon-local corner** indices; map them through `vertexIndex(p, c)`. `triangle()` is read-only, and centroid code built on it failed on some non-convex n-gons. Cheetah's general tessellator is not otherwise exposed. [#1226](https://www.cheetah3d.com/forum/index.php?threads/1226/) [#4594](https://www.cheetah3d.com/forum/index.php?threads/4594/) [#11075](https://www.cheetah3d.com/forum/index.php?threads/11075/) [#4810](https://www.cheetah3d.com/forum/index.php?threads/4810/) [#1327](https://www.cheetah3d.com/forum/index.php?threads/1327/) [docs: PolyCore](../reference/api/PolyCore.md)
- **`materialTagIndex(p)` is read-only.** To assign materials per polygon, use polygon selections:
  - Call `setActivePolygonSelection(k)`, then `setPolygonSelection(p, true)`.
  - Then set the material tag's `shadeSelection` to **k+1**; 0 means all polygons.
  - A return value ≥ `materialTags().length` means "no material".

  [#467](https://www.cheetah3d.com/forum/index.php?threads/467/) [#2695](https://www.cheetah3d.com/forum/index.php?threads/2695/) [#5391](https://www.cheetah3d.com/forum/index.php?threads/5391/) [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js)
- **A script that rebuilds a source mesh must copy its UVs and polygon selections** too, or the source's per-selection materials stop rendering. [#7259](https://www.cheetah3d.com/forum/index.php?threads/7259/) [#10920](https://www.cheetah3d.com/forum/index.php?threads/10920/)
- **Guard before using vertex methods.**
  - Return early if `core.vertexCount()==0`.
  - Initialize bounding boxes from `vertex(0)`, not from zero.
  - To check for a polygon core, test `typeof core.polygonCount == "function"` (`instanceof PolyCore` is false).

  [#3537](https://www.cheetah3d.com/forum/index.php?threads/3537/) [#4810](https://www.cheetah3d.com/forum/index.php?threads/4810/) [#10400](https://www.cheetah3d.com/forum/index.php?threads/10400/)
- **Built-in classes cannot be extended through `.prototype`.** This varied over time: it worked in 2007–08, assigning `Vec*.prototype.toString` broke scripts in 5.2, and it failed outright in 2014. Wrap native objects in your own JS objects instead. `instanceof Vec3D` does not work either. [#1298](https://www.cheetah3d.com/forum/index.php?threads/1298/) [#1327](https://www.cheetah3d.com/forum/index.php?threads/1327/) [#1448](https://www.cheetah3d.com/forum/index.php?threads/1448/) [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [#10400](https://www.cheetah3d.com/forum/index.php?threads/10400/) [#10415](https://www.cheetah3d.com/forum/index.php?threads/10415/)
- **Avoid allocating `new Vec3D`/`Mat4D` inside hot loops.** Reuse objects through `.set()`. Removing allocations nearly doubled speed (Martin). Pure-JS mesh algorithms on about 100k polygons can hit "out of memory"; work with indices and avoid O(n) array searches. [#718](https://www.cheetah3d.com/forum/index.php?threads/718/) [#1395](https://www.cheetah3d.com/forum/index.php?threads/1395/) [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js)
- **Coincident vertices and boolean-generated n-gons break topology code.** Run Optimize first, or null-check your adjacency results. [#1395](https://www.cheetah3d.com/forum/index.php?threads/1395/)
- **Splines: draw only inside a Splineobj `buildObject`:**
  1. Call `move(p)` first; it starts a new path.
  2. Then call `line(p)` / `curve(cp1, cp2, p)`.
  3. Optionally call `close()`.

  Drawing into an existing spline from a Macro crashed in 2008. [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [#12214](https://www.cheetah3d.com/forum/index.php?threads/12214/) [#6600](https://www.cheetah3d.com/forum/index.php?threads/6600/) [ex: Sinecircle.js](../examples/official/Splineobj/Sinecircle.js) [ex: Bounce.js](../examples/official/Splineobj/Bounce.js)
- **Reading splines:** there is no control-point accessor in the docs. Use `core.cache(i)`, which returns the tessellated `Vec3D[]` of path `i`, for `i < pathCount()`. Handle **multiple paths**: edited or Text-derived splines often have several. Points are local; multiply by `obj2WorldMatrix()`. [#1298](https://www.cheetah3d.com/forum/index.php?threads/1298/) [#8863](https://www.cheetah3d.com/forum/index.php?threads/8863/) [#1099](https://www.cheetah3d.com/forum/index.php?threads/1099/) [ex: splineExport.js](../examples/official/Macro/splineExport.js)
- **Several `move()` calls produce several contours.** A spline script that outputs an outer contour plus holes works under an Extrude creator; scripted splines also work under Lathe and Sweep. [#14379](https://www.cheetah3d.com/forum/index.php?threads/14379/) [#14384](https://www.cheetah3d.com/forum/index.php?threads/14384/) [#6607](https://www.cheetah3d.com/forum/index.php?threads/6607/) [#8025](https://www.cheetah3d.com/forum/index.php?threads/8025/)
- **Closing a 360° Bezier with float `%` on angles can leave a tiny gap.** Snap the angle. [#6607](https://www.cheetah3d.com/forum/index.php?threads/6607/)
- **A Sweep created with `addObject(SWEEP)` has no SplineCore.** Add spline children (profile and path) instead. [#14381](https://www.cheetah3d.com/forum/index.php?threads/14381/) [#8025](https://www.cheetah3d.com/forum/index.php?threads/8025/)
- **Particles:** in a Particle script, `obj.core()` is a ParticleCore.
  - Create particles with `core.addParticle()`, then call `setPosition/setRotation/setScale`.
  - Rotations are XYZ Euler angles in degrees.
  - `setIndex(n)` did not reliably choose the instanced child in 2014; the workaround was a Particle tag with frequency 0.
  - Particle Mesh needs at least one child, and lights inside instanced objects are not instanced.
  - Docs typo: Particle.md lists the setter as `void getDeath(Number)`; presumably it is `setDeath`. [verify]

  [#6905](https://www.cheetah3d.com/forum/index.php?threads/6905/) [#8469](https://www.cheetah3d.com/forum/index.php?threads/8469/) [#10106](https://www.cheetah3d.com/forum/index.php?threads/10106/) [#10374](https://www.cheetah3d.com/forum/index.php?threads/10374/) [ex: Particle Menger.js](../examples/official/Particle/Particle%20Menger.js) [docs: Particle](../reference/api/Particle.md)
- **Particle output does not export to OBJ** through `saveToFile`, and does not render when nested in itself. Convert it with Tools › Particle › Particle->Polygon first. Double-clicking a particle object's icon converts it to a raw particle object irreversibly. [#2110](https://www.cheetah3d.com/forum/index.php?threads/2110/) [#6905](https://www.cheetah3d.com/forum/index.php?threads/6905/) [#7169](https://www.cheetah3d.com/forum/index.php?threads/7169/)

## 5. Objects, tags, materials

- **Lights are all type `LIGHT` (5.x+). DOCS-CONFLICT.**
  - Constants.md lists `POINTLIGHT/SPOTLIGHT/DISTANTLIGHT/AREALIGHT` and does **not** list `LIGHT`.
  - Since 5.x, `SPOTLIGHT`, `DISTANTLIGHT` and `AREALIGHT` give `Can't find variable`.
  - The light kind is the Int parameter `lightType` (spot = 4); brightness is `intensity`.
  - The 8.x example `Scale light intensity.js` tests `type()==LIGHT`, which confirms it.
  - Use `LIGHT` (or `family()==LIGHTFAMILY`) and verify the 8.x `lightType` values.

  [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#9038](https://www.cheetah3d.com/forum/index.php?threads/9038/) [#10090](https://www.cheetah3d.com/forum/index.php?threads/10090/) [#1326](https://www.cheetah3d.com/forum/index.php?threads/1326/) [#6297](https://www.cheetah3d.com/forum/index.php?threads/6297/) [ex: Scale light intensity.js](../examples/official/Tool/Scale%20light%20intensity.js) [verify]
- **Undocumented constants that exist** (2013–14 dumps): `LIGHT`(5), `JOINT`(45), `SMARTFOLDER`, `DOFTAG`(110), `TARGETTAG`(111), `RENDERTAG`(114), `SPLINETRACKINGTAG`, `FOGTAG`, `RADIOSITYTAG`, `HDRITAG`, `TONEMAPPINGTAG`, `CAUSTICTAG`, `PIVOT_MODE`, `EOF`(-1), `IDENDITY`(sic), and the interpolation constants (`SOFT_INTERPOL`=0, `LINEAR_INTERPOL`=1, `SPLINE_INTERPOL`=2, `FLAT_INTERPOL`=3).
  - Some types had **no** constant: Subdivision modifier (42), Sky Light (55), Turbulence force (80).
  - `UVTAG` is documented but was missing.
  - DOCS-GAP. The numbers shown are 6.x values; compare against the names, not hard-coded numbers.

  [#9625](https://www.cheetah3d.com/forum/index.php?threads/9625/) [#10090](https://www.cheetah3d.com/forum/index.php?threads/10090/) [#9038](https://www.cheetah3d.com/forum/index.php?threads/9038/) [#8739](https://www.cheetah3d.com/forum/index.php?threads/8739/)
- **Enumerate all constants** by iterating the global object: `var g=(function(){return this;})(); for (var k in g) ...`. Values collide across groups, so a reverse lookup needs context. [#9038](https://www.cheetah3d.com/forum/index.php?threads/9038/) [#9625](https://www.cheetah3d.com/forum/index.php?threads/9625/)
- **`doc.selectedObject()` returns the invisible root, not `null`, when nothing is selected.** The official sample's `if(obj==null)` check never fires; test `obj.owner()==null` (or `obj == doc.root()`). DOCS-GAP. [#10088](https://www.cheetah3d.com/forum/index.php?threads/10088/) [ex: Parameter Info.js](../examples/official/Macro/Parameter%20Info.js)
- **Multiple selection**: 8.1.1 documents `doc.selectedObjects(flat)`. Forum code from 2011 predates it and used only `selectedObject()`. [#7079](https://www.cheetah3d.com/forum/index.php?threads/7079/) [docs: Document](../reference/api/Document.md) [verify]
- **Objects are not indexable by name.** `doc['x']` and `delete` do nothing; to find one, recurse from `doc.root()` and compare `getParameter("name")`. [#9213](https://www.cheetah3d.com/forum/index.php?threads/9213/) [#4442](https://www.cheetah3d.com/forum/index.php?threads/4442/) [#10376](https://www.cheetah3d.com/forum/index.php?threads/10376/)
- **Deleting objects and reordering them.**
  - 2008–2010 forum: no delete API. 8.1.1 documents `obj.removeChild(child)`, `doc.removeMaterial(mat)` and `obj.removeTag(tag)`.
  - `parent.addChildAtIndex(child, i)` re-parents a child, or reorders it when it is already a child.
  - Docs typo: `addChildAtIndex` is listed as returning a `Tag`.

  [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [#6458](https://www.cheetah3d.com/forum/index.php?threads/6458/) [#6098](https://www.cheetah3d.com/forum/index.php?threads/6098/) [docs: Object](../reference/api/Object.md)
- **Children inherit their parent's transform.** To group generated objects without compounding scale, parent them under `doc.addObject(FOLDER)`. [#1801](https://www.cheetah3d.com/forum/index.php?threads/1801/) [#1802](https://www.cheetah3d.com/forum/index.php?threads/1802/)
- **`isCreatorObj()` was spelled `isCeatorObj()` natively until 7 beta 19.** It was fixed in b20, and the typo is kept for compatibility. Code targeting 6.x must call the misspelled name. [#12218](https://www.cheetah3d.com/forum/index.php?threads/12218/) [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js)
- **There is no clone, Make Editable, or Coord-System (Burn/Center pivot) API.** Reimplement them yourself.
  - **Copy** an object with `addObject(obj.type())`, then copy its parameters, material tags and geometry.
  - **Burn a transform**: `setVertex(i, objMatrix().multiply(vertex(i)))`, then reset position and rotation to 0 and scale to 1.
  - **Move the pivot**: offset the vertices, then set `position` (`pivot` is also a Vec3D parameter), then call `update()`.

  [#8015](https://www.cheetah3d.com/forum/index.php?threads/8015/) [#8514](https://www.cheetah3d.com/forum/index.php?threads/8514/) [#7212](https://www.cheetah3d.com/forum/index.php?threads/7212/) [#4810](https://www.cheetah3d.com/forum/index.php?threads/4810/) [#12767](https://www.cheetah3d.com/forum/index.php?threads/12767/) [#12264](https://www.cheetah3d.com/forum/index.php?threads/12264/)
- **Common parameter names** (discover yours with `parameterInfo()`):
  - Box: `sizeX/sizeY/sizeZ` (not `scale`).
  - Text: `text` and `textFont` (a PostScript font name).
  - Extrude: `dirX/dirY/dirZ`, `steps`, `bevelRadius`, `bevelType`.
  - Polygon smoothing: `normalType` (0 = flat) and `normalAngle`.
  - Camera: `fieldOfView`, `focalDistance`, `activeCamera`, `focusOnObject`.
  - Joint: `rotation` plus `prerot/prefrot/postrot`; set them all to reset a joint.
  - Skylight `date`: a float, minutes since Jan 1 00:00.

  [#1802](https://www.cheetah3d.com/forum/index.php?threads/1802/) [#6801](https://www.cheetah3d.com/forum/index.php?threads/6801/) [#812](https://www.cheetah3d.com/forum/index.php?threads/812/) [#4442](https://www.cheetah3d.com/forum/index.php?threads/4442/) [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) [#10829](https://www.cheetah3d.com/forum/index.php?threads/10829/) [#13505](https://www.cheetah3d.com/forum/index.php?threads/13505/) [ex: QTVR Helper.js](../examples/official/Macro/QTVR%20Helper.js)
- **Rotation vectors expose `.h .p .b` as well as `.x .y .z`.** DOCS-GAP: Vec3D.md lists only x,y,z. `new Mat4D(ROTATE_HPB, h, p, b)` and `new Mat4D(ROTATE, x, y, z)` take **degrees** (undocumented). [#4366](https://www.cheetah3d.com/forum/index.php?threads/4366/) [#946](https://www.cheetah3d.com/forum/index.php?threads/946/) [ex: RotateObject.js](../examples/official/Macro/RotateObject.js) [docs: Mat4D](../reference/api/Mat4D.md)
- **Orientation conventions:**
  - Lights point down −Y by default; cameras look down −Z (−Z is the "front" view in QTVR Helper).
  - Mat4D translation is in `m03/m13/m23`.
  - Mat elements are named fields (`m00..m33`), not `m[i][j]`.

  [#1161](https://www.cheetah3d.com/forum/index.php?threads/1161/) [#4366](https://www.cheetah3d.com/forum/index.php?threads/4366/) [#3528](https://www.cheetah3d.com/forum/index.php?threads/3528/) [#6604](https://www.cheetah3d.com/forum/index.php?threads/6604/) [ex: QTVR Helper.js](../examples/official/Macro/QTVR%20Helper.js)
- **`activeCamera()` has no setter.** Set `activeCamera` to 0 on the old camera and 1 on the new one, then call `update()` on both. The Object Browser may not refresh. [#4856](https://www.cheetah3d.com/forum/index.php?threads/4856/)
- **Tag type 102 is the material ("shader") tag (`SHADERTAG`).** It holds no material properties; get the material with `doc.materialAtIndex(tag.linkedToMaterial())`, which the 8.x Simple ASCII Export confirms. Around 5.0 this briefly broke, and `tag.getParameter("material")` (a Link) was the workaround. [#2183](https://www.cheetah3d.com/forum/index.php?threads/2183/) [#3610](https://www.cheetah3d.com/forum/index.php?threads/3610/) [#7187](https://www.cheetah3d.com/forum/index.php?threads/7187/) [#3376](https://www.cheetah3d.com/forum/index.php?threads/3376/) [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js)
- **Assign a material**: `var t = obj.addTagOfType(SHADERTAG); t.setParameter("material", mat);`. This works since roughly 6.x; in 2008–2010 there was no way. [#8015](https://www.cheetah3d.com/forum/index.php?threads/8015/) [#3376](https://www.cheetah3d.com/forum/index.php?threads/3376/) [#6604](https://www.cheetah3d.com/forum/index.php?threads/6604/) [#1607](https://www.cheetah3d.com/forum/index.php?threads/1607/) [verify]
- **Materials are node-based since 5.0.**
  - Old flat parameters (`colorColor`, `colorTex`, `specTex`, `transColor`, …) stopped working in 5.0.
  - Read-only shortcuts remain: `color()`, `colorMap()`, `emission()`, `shininess()`.
  - To set a property, set it on a node, for example `mat.nodeAtIndex(0).setParameter("diffColor", new Vec4D(r,g,b,1))`.
  - The node API (`nodeCount/nodeAtIndex/rootNode/addNodeOfType/addConnection`) appeared in **6.2.1**; older versions throw `'undefined' is not a function`.

  [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [#1210](https://www.cheetah3d.com/forum/index.php?threads/1210/) [#4085](https://www.cheetah3d.com/forum/index.php?threads/4085/) [#5514](https://www.cheetah3d.com/forum/index.php?threads/5514/) [#7187](https://www.cheetah3d.com/forum/index.php?threads/7187/) [#9730](https://www.cheetah3d.com/forum/index.php?threads/9730/) [#10280](https://www.cheetah3d.com/forum/index.php?threads/10280/) [#9078](https://www.cheetah3d.com/forum/index.php?threads/9078/) [docs: Material](../reference/api/Material.md)
- **`Material.rib()` was removed in 5.0** but is still documented in 8.1.1 (DOCS-CONFLICT). It throws `'undefined' is not a function`. [#1210](https://www.cheetah3d.com/forum/index.php?threads/1210/) [#8220](https://www.cheetah3d.com/forum/index.php?threads/8220/) [#9078](https://www.cheetah3d.com/forum/index.php?threads/9078/) [docs: Material](../reference/api/Material.md)
- **`node.id()` is undocumented but works.** It returns the numeric ID that `addConnection(fromID, fromPara, toID, toPara)` needs.
  - `Parameter.connected()` is true only on the **input** side of a connection.
  - `outputAtIndex()` returns a Parameter wrapper, not a value.

  DOCS-GAP. [#9078](https://www.cheetah3d.com/forum/index.php?threads/9078/) [#12881](https://www.cheetah3d.com/forum/index.php?threads/12881/)
- **Material type** is the string parameter `shaderType`. Some exporters identify materials by name, so keep names unique. [#3610](https://www.cheetah3d.com/forum/index.php?threads/3610/) [#3376](https://www.cheetah3d.com/forum/index.php?threads/3376/)
- **Material colours from `mat.color()` expose `.r .g .b .a`.** DOCS-GAP: Vec4D.md lists x,y,z,w. Colour components are 0–1; one 2017 post passed 0–255 values. [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js) [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/)
- **v7 removed the hidden per-object icon tag.** In 6.x and earlier every object's `tagAtIndex(0)` was a dummy Mode-like tag (type 103) carrying `editorActive/renderActive/editorShading`. In 7+, every tag index shifted by one, and `tagAtIndex(0)` is whatever tag the user added first.
  - Look tags up by type (`tagOfType(T)`), never by index.
  - Visibility flags may now live on the object: check `parameterInfo()`. [verify]

  [#8338](https://www.cheetah3d.com/forum/index.php?threads/8338/) [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/) [#12890](https://www.cheetah3d.com/forum/index.php?threads/12890/)
- **Mode tag (103) parameters:** `editorVisible`/`editorActive`, `renderActive`, and `editorShading` (0 shaded, 1 wire, 2 box, 3 ISO). Only visibility propagates to children; apply shading to each child yourself. All of these can be keyframed. [#7106](https://www.cheetah3d.com/forum/index.php?threads/7106/) [#6373](https://www.cheetah3d.com/forum/index.php?threads/6373/)
- **Constraint tags:** use bare constants, not strings, with `addTagOfType(ORIENTCONSTRAINTTAG)` and `POINTCONSTRAINTTAG`, then `tag.setParameter("target", obj)`. Call `recordParametersForUndo()` first and `update()` after. [#14324](https://www.cheetah3d.com/forum/index.php?threads/14324/) [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/)
- **Lights inside particle-instanced objects are not instanced.** Use emissive geometry instead. [#10374](https://www.cheetah3d.com/forum/index.php?threads/10374/)
- **Skin weights, cluster data and morph data were not readable in 2012–13.** 8.1.1 now documents `Tag.addCluster/clusterAtIndex` and `Cluster.controlPointIndexArray/WeightArray`. The forum workaround was to save a non-binary `.jas` and parse it externally. [#9060](https://www.cheetah3d.com/forum/index.php?threads/9060/) [#9499](https://www.cheetah3d.com/forum/index.php?threads/9499/) [#6367](https://www.cheetah3d.com/forum/index.php?threads/6367/) [docs: Cluster](../reference/api/Cluster.md) [verify]

## 6. Animation

- **All API time is in seconds, not frames.** This covers `setAnimPosition`, `animPosition()`, `animationEnd()`, `FCurveKey.time` and `valueAtTime`. There is **no frame-rate API** (2012), so ask the user for fps as a parameter (`frame/fps`). [#9041](https://www.cheetah3d.com/forum/index.php?threads/9041/) [#8696](https://www.cheetah3d.com/forum/index.php?threads/8696/) [#4366](https://www.cheetah3d.com/forum/index.php?threads/4366/) [#2110](https://www.cheetah3d.com/forum/index.php?threads/2110/) [#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/)
- **Current time:**
  - `doc.animPosition()` (6.0+; it is absent in 5.8).
  - The 8.x example uses `doc.animationTime()`, which is **undocumented** (DOCS-GAP).
  - Save the position and restore it after stepping time.
  - One 2012 sample passes an argument to `animPosition(t)`, contrary to the docs.

  [#9461](https://www.cheetah3d.com/forum/index.php?threads/9461/) [#2183](https://www.cheetah3d.com/forum/index.php?threads/2183/) [#9041](https://www.cheetah3d.com/forum/index.php?threads/9041/) [ex: CircleExpression.js](../examples/official/Tag/CircleExpression.js) [docs: Document](../reference/api/Document.md)
- **Keyframing goes through Parameter → TakeNode → FCurve → FCurveKey (6.0+).**
  1. `param = obj.parameterWithName("scale")`.
  2. `node = param.takeNodeWithName(doc.currentTake().name) || param.addTakeNode(doc.currentTake().name)`.
  3. `curve = node.fCurveAtIndex(i)`: Vec3D gives curves 0/1/2 for x/y/z, and a Float gives one curve.
  4. Build `new FCurveKey()`, set `time` (seconds), `value`, `left_type/right_type`, `left_time/left_value/right_time/right_value`, then `curve.addKey(k)`.
  5. **Always call `curve.update()`** afterwards.

  [#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/) [#5752](https://www.cheetah3d.com/forum/index.php?threads/5752/) [#8339](https://www.cheetah3d.com/forum/index.php?threads/8339/) [#8841](https://www.cheetah3d.com/forum/index.php?threads/8841/) [ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js) [docs: FCurve](../reference/api/FCurve.md)
- **Tangent handles are *relative* to the key**, so `left_time` is negative. Interpolation constants: `SOFT_INTERPOL`, `LINEAR_INTERPOL`, `SPLINE_INTERPOL`, `FLAT_INTERPOL` (the forum sample misspells LINEAR as `LINER`). A 2014 update changed SOFT handling, so keys came out LINEAR until a script was fixed. [#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/) [#8702](https://www.cheetah3d.com/forum/index.php?threads/8702/) [docs: FCurveKey](../reference/api/FCurveKey.md)
- **`keyAtIndex(k)` returns a copy.** After changing it, write it back with `fcurve.setKeyAtIndex(key, k)`, then call `update()`. This is the official example's pattern. [ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js) [verify]
- **`takeNodeWithName()` returns null when the parameter isn't animated in that take.** Use `take.name`: a **property**, not a method. `valueAtTime(t)` evaluates a curve (one forum sample passes a second argument). [#9041](https://www.cheetah3d.com/forum/index.php?threads/9041/) [docs: Take](../reference/api/Take.md) [ex: Scale Take.js](../examples/official/Tool/Scale%20Take.js)
- **Rename takes only with `doc.renameTake()`.** It renames the matching TakeNodes too. [docs: Document](../reference/api/Document.md) [docs: Take](../reference/api/Take.md)
- **`setAnimPosition(t)` + `setParameter()` does NOT create keys,** even with auto-keying on (Martin, pre-6). One 2007 report says it made keys plus unexplained extras. Use FCurves. [#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/) [#2313](https://www.cheetah3d.com/forum/index.php?threads/2313/)
- **Custom script parameters can be keyframed,** but the user must record them explicitly (right-click record › record *param*, or 'P' to key all parameters). [#1210](https://www.cheetah3d.com/forum/index.php?threads/1210/) [#466](https://www.cheetah3d.com/forum/index.php?threads/466/) [#7872](https://www.cheetah3d.com/forum/index.php?threads/7872/) [#7690](https://www.cheetah3d.com/forum/index.php?threads/7690/)
- **Script-generated animation, like polygon-script vertex motion, is not exported to FBX/Collada/Unity.** Bake it, for example with MDD Exporter. MDD needs a constant vertex count. [#466](https://www.cheetah3d.com/forum/index.php?threads/466/) [#3880](https://www.cheetah3d.com/forum/index.php?threads/3880/) [#6367](https://www.cheetah3d.com/forum/index.php?threads/6367/)
- **To sample motion:** step `setAnimPosition(t)`, then re-read `obj2WorldMatrix()`/`getParameter` at each step. [#4366](https://www.cheetah3d.com/forum/index.php?threads/4366/)
- **Behaviour of mirrored rotations changed around 2013**, which broke pose-flip math. FBX-imported joints merge pre/post-rotation, so re-orient them before mirroring. (pre-7; unverified in 8.x) [#5358](https://www.cheetah3d.com/forum/index.php?threads/5358/) [#10829](https://www.cheetah3d.com/forum/index.php?threads/10829/)
- **Cheetah3D does not play audio.** Sound-loader scripts only drive F-curves. [#12343](https://www.cheetah3d.com/forum/index.php?threads/12343/)

## 7. Files, OS, shell, libraries

- **File paths must be absolute.** `new File("~/x")` does not expand `~`; only the shell does that. [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/)
- **`File.mkDir()` deletes any existing file or folder at that path without warning** (docs). Check `exist()` first. [docs: File](../reference/api/File.md) [#1161](https://www.cheetah3d.com/forum/index.php?threads/1161/)
- **Reading files:**
  - Text: open with `f.open(READ_MODE)`, check `f.isOpen()`, then read `f.read(f.size())`, or loop `f.readln()` until it returns **-1** (`EOF`; undocumented). Then `f.close()`.
  - `new File(p).exist()` returns a boolean.
  - Binary: `open(READ_MODE, LITTLE_ENDIAN|BIG_ENDIAN)`. The docs misspell these as `BIG_ENDIAM`/`LITTLE_ENDIA`.
  - `readInt()` is used successfully but undocumented; the documented readers are `readShort/readUInt/readFloat`.

  [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/) [#3350](https://www.cheetah3d.com/forum/index.php?threads/3350/) [#4252](https://www.cheetah3d.com/forum/index.php?threads/4252/) [#6557](https://www.cheetah3d.com/forum/index.php?threads/6557/) [#9039](https://www.cheetah3d.com/forum/index.php?threads/9039/) [#10841](https://www.cheetah3d.com/forum/index.php?threads/10841/) [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/) [docs: File](../reference/api/File.md)
- **Writing files:** `f.open(WRITE_MODE)` creates the file, then use `write` or `writeln`. Always call `close()`. [#4366](https://www.cheetah3d.com/forum/index.php?threads/4366/) [#5391](https://www.cheetah3d.com/forum/index.php?threads/5391/) [ex: Simple ASCII Export.js](../examples/official/Macro/Simple%20ASCII%20Export.js)
- **Save panels:** `OS.runSavePanel(ext)` returns a full path or **null**, and `runSavePanel()` with no argument is allowed. Then `new File(path).directory()` and `.lastPathComponent()` split the path. [#2110](https://www.cheetah3d.com/forum/index.php?threads/2110/) [#5391](https://www.cheetah3d.com/forum/index.php?threads/5391/) [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [ex: QTVR Helper.js](../examples/official/Macro/QTVR%20Helper.js)
- **There is no `require`/`import`, no DOM, no XHR or networking, and no external JS libraries.** The engine is macOS JavaScriptCore (changed in early 5.x). To share code, read a file and evaluate it. [#8220](https://www.cheetah3d.com/forum/index.php?threads/8220/) [#9039](https://www.cheetah3d.com/forum/index.php?threads/9039/) [#9290](https://www.cheetah3d.com/forum/index.php?threads/9290/) [#4085](https://www.cheetah3d.com/forum/index.php?threads/4085/)
- **Include through indirect eval:** `var geval = eval; geval(src);`.
  - A direct `eval(src)` inside a function defines things only in local scope; it was confirmed not to work on 7.0.18. One user says direct eval worked for them.
  - Put the library in `Scripts/Library/` (not shown in menus) and wrap it in a namespace object.
  - The library is re-read on every run, so you can edit it without restarting.

  [#9039](https://www.cheetah3d.com/forum/index.php?threads/9039/) [#9290](https://www.cheetah3d.com/forum/index.php?threads/9290/) [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/)
- **Finding your files:**
  - `obj.scriptPath()` / `tool.scriptPath()` give the running script's path (Base method). Derive the home folder or the Scripts folder from it with string manipulation.
  - Macros receive a `Document`, which does not document `scriptPath()`. Either hard-code the path, or shell out with `echo $HOME > /tmp/f` and read the file.
  - `new File(scriptPath).directory()` finds bundled helpers.

  [#9039](https://www.cheetah3d.com/forum/index.php?threads/9039/) [#12183](https://www.cheetah3d.com/forum/index.php?threads/12183/) [#5865](https://www.cheetah3d.com/forum/index.php?threads/5865/) [#6458](https://www.cheetah3d.com/forum/index.php?threads/6458/) [verify]
- **`OS.system(cmd)` passes a raw string to `/bin/sh`.** Single-quote every path and escape embedded quotes, otherwise paths with spaces fail silently. It returns a Number (the exit status, presumably). There is no stdout capture, so redirect output to a temp file and read that with File. [#9707](https://www.cheetah3d.com/forum/index.php?threads/9707/) [#5865](https://www.cheetah3d.com/forum/index.php?threads/5865/) [#12343](https://www.cheetah3d.com/forum/index.php?threads/12343/) [#10841](https://www.cheetah3d.com/forum/index.php?threads/10841/) [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/) [#9060](https://www.cheetah3d.com/forum/index.php?threads/9060/) [docs: OS](../reference/api/OS.md)
- **Typical uses of `OS.system`:**
  - `defaults` to read and write prefs
  - `sips` for image info
  - `mkdir`, `rm`, `mv`, `touch` for lock files
  - Python or PHP helpers for networking or parsing
  - external renderers

  [#1936](https://www.cheetah3d.com/forum/index.php?threads/1936/) [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/) [#6458](https://www.cheetah3d.com/forum/index.php?threads/6458/) [#10841](https://www.cheetah3d.com/forum/index.php?threads/10841/) [#11774](https://www.cheetah3d.com/forum/index.php?threads/11774/) [#9060](https://www.cheetah3d.com/forum/index.php?threads/9060/) [#1279](https://www.cheetah3d.com/forum/index.php?threads/1279/) [#574](https://www.cheetah3d.com/forum/index.php?threads/574/) [#4252](https://www.cheetah3d.com/forum/index.php?threads/4252/)
- **Exporting:** `doc.saveToFile(path, "jas"|"obj"|"mtl")`. To parse a `.jas` externally, turn off Preferences › Files › .jas "binary". Loop `setAnimPosition(f/fps)` + `saveToFile(..., "obj")` for OBJ sequences. The command-line converter is only jas→fbx. [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [#2110](https://www.cheetah3d.com/forum/index.php?threads/2110/) [#3377](https://www.cheetah3d.com/forum/index.php?threads/3377/) [#5752](https://www.cheetah3d.com/forum/index.php?threads/5752/) [#9060](https://www.cheetah3d.com/forum/index.php?threads/9060/) [#9499](https://www.cheetah3d.com/forum/index.php?threads/9499/) [#6793](https://www.cheetah3d.com/forum/index.php?threads/6793/)
- **There is no render-completion callback.** For external orchestration, poll a temp file. [#11774](https://www.cheetah3d.com/forum/index.php?threads/11774/)

## 8. Rendering

- **`doc.render()` and `doc.render(path)` are synchronous.** They block until the render finishes and show no progress. Call them on the **instance** (`doc.render()`, not `Document.render()`). You can call them repeatedly in one macro. [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [#2262](https://www.cheetah3d.com/forum/index.php?threads/2262/) [#5998](https://www.cheetah3d.com/forum/index.php?threads/5998/) [#11774](https://www.cheetah3d.com/forum/index.php?threads/11774/) [ex: RotateObject.js](../examples/official/Macro/RotateObject.js) [ex: QTVR Helper.js](../examples/official/Macro/QTVR%20Helper.js)
- **The output format comes from the file extension**: the examples use `.tiff` and the forum uses `.jpg`. [#2262](https://www.cheetah3d.com/forum/index.php?threads/2262/) [ex: QTVR Helper.js](../examples/official/Macro/QTVR%20Helper.js) [verify]
- **Since v7, render resolution lives on the renderer, not the camera.** Use `doc.currentRenderer().setParameter("resolution", new Vec2D(w,h))`; the camera's `resolutionX/Y` are legacy. Renderers are listed with `rendererCount()/rendererAtIndex(i)` and switched with `setCurrentRenderer(i)`. [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) [docs: Document](../reference/api/Document.md)
- **v7 replaced the DOF tag with camera properties** (focus distance, "Focus on Object"). The old DOF tag (`DOFTAG`, `focalDistance`) no longer drives DOF. [#808](https://www.cheetah3d.com/forum/index.php?threads/808/) [#8710](https://www.cheetah3d.com/forum/index.php?threads/8710/) [#8739](https://www.cheetah3d.com/forum/index.php?threads/8739/)
- **Before rendering after joint or skin changes, call `update()` on every object**, children first from the root. Skinned meshes don't re-evaluate on their own. [#5998](https://www.cheetah3d.com/forum/index.php?threads/5998/)
- **Update loops caused by `setParameter` in `buildObject` often appear only at render time.** See §2. [#8739](https://www.cheetah3d.com/forum/index.php?threads/8739/) [#8338](https://www.cheetah3d.com/forum/index.php?threads/8338/)
- **For hair-like generated meshes, turn off "visible in radiosity"** to avoid dark artifacts. [#4777](https://www.cheetah3d.com/forum/index.php?threads/4777/)
- **Field-of-view math:** angle of view = 2·atan(1 / (2·focalLength)), with image size 1.0 on the larger dimension (podperson). [#8710](https://www.cheetah3d.com/forum/index.php?threads/8710/)

## 9. Undo

- **Undo for script edits exists from 6.0.** Docs say these work only in Tool scripts.
  - Call `obj.recordGeometryForUndo()` *before* editing a mesh or spline.
  - Call `obj.recordParametersForUndo()` *before* `setParameter`.

  Without them, edits bypass Undo and don't mark the document dirty. [#8848](https://www.cheetah3d.com/forum/index.php?threads/8848/) [#10282](https://www.cheetah3d.com/forum/index.php?threads/10282/) [#14324](https://www.cheetah3d.com/forum/index.php?threads/14324/) [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/) [docs: Base](../reference/api/Base.md)
- **Before 6.0, Undo after a geometry-editing script could crash** (`-[MWMnGon undoRecordedArrays]`). 5.8 changed undo in a way that forced scripts to disable their own undo. (pre-7; unverified in 8.x) [#3792](https://www.cheetah3d.com/forum/index.php?threads/3792/) [#8024](https://www.cheetah3d.com/forum/index.php?threads/8024/) [#8878](https://www.cheetah3d.com/forum/index.php?threads/8878/) [#8884](https://www.cheetah3d.com/forum/index.php?threads/8884/) [#9892](https://www.cheetah3d.com/forum/index.php?threads/9892/) [#2565](https://www.cheetah3d.com/forum/index.php?threads/2565/)
- **For portable code, feature-detect:** `if (obj.recordGeometryForUndo) obj.recordGeometryForUndo();`. Calling it on 5.8 throws `'undefined' is not a function`. [#8848](https://www.cheetah3d.com/forum/index.php?threads/8848/)
- **Redraw lock.** If a script throws after `doc.retainRedrawLock()`, the UI stays frozen. Release it in `try/finally`. To recover, run a macro that calls `doc.releaseRedrawLock(); doc.redrawAll();`. [#1422](https://www.cheetah3d.com/forum/index.php?threads/1422/) [docs: Document](../reference/api/Document.md)

## 10. Debugging and crashes

- **`print()` goes to the Console panel, which is hidden by default.** Add it by right-clicking any panel header. There is no REPL and no action recorder. [#2247](https://www.cheetah3d.com/forum/index.php?threads/2247/) [#3610](https://www.cheetah3d.com/forum/index.php?threads/3610/) [#8514](https://www.cheetah3d.com/forum/index.php?threads/8514/) [#12807](https://www.cheetah3d.com/forum/index.php?threads/12807/) (book)
- **`print()` only handles strings.**
  - `print(false)` threw `'false' is not a function`.
  - `print(vec)` prints `[object CallBackObject]`.

  Concatenate with `""` and print vector fields yourself. [#10415](https://www.cheetah3d.com/forum/index.php?threads/10415/) [#12807](https://www.cheetah3d.com/forum/index.php?threads/12807/) [#8220](https://www.cheetah3d.com/forum/index.php?threads/8220/)
- **Native API objects need `new`.** Calling `Vec4D(...)` without `new` crashed the app. `new Vec2D()` and `new Vec4D(0.0)` (fewer arguments) work in examples. [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [ex: GrapherUV.js](../examples/official/Polygonobj/GrapherUV.js) [ex: Particle Image.js](../examples/official/Particle/Particle%20Image.js)
- **Known native bugs:**
  - `Vec3D.dot()` returned a vector instead of a Number; fixed in 6.3.2.
  - `Vec4D.isEqual()` threw "Wrong number or type of arguments" in 2015; compare components manually.

  [#6604](https://www.cheetah3d.com/forum/index.php?threads/6604/) [#10731](https://www.cheetah3d.com/forum/index.php?threads/10731/) [#11075](https://www.cheetah3d.com/forum/index.php?threads/11075/) [verify]
- **Introspection.** `for…in` over native objects lists their methods in 5.x+ (podperson's Object Info dumps); in 2007 it did not. `instanceof` fails on native classes; use `typeof x.method=="function"`. [#2183](https://www.cheetah3d.com/forum/index.php?threads/2183/) [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) [#10415](https://www.cheetah3d.com/forum/index.php?threads/10415/) [#4810](https://www.cheetah3d.com/forum/index.php?threads/4810/)
- **Common error strings:**
  - `Can't find variable: X`: an undefined helper, or a removed constant such as `SPOTLIGHT`.
  - `SyntaxError: illegal character` at line 1: full-width or multibyte whitespace was pasted in.
  - A crash in `-[MWMSFEngine loadScript]` (CFStringGetLength null): the script file is unreadable or corrupt (for example a bad encoding).

  [#1405](https://www.cheetah3d.com/forum/index.php?threads/1405/) [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#1577](https://www.cheetah3d.com/forum/index.php?threads/1577/) [#10731](https://www.cheetah3d.com/forum/index.php?threads/10731/)
- **Common crash causes:**
  - missing `addParameter*` arguments (§3)
  - `new` omitted on native constructors
  - nonexistent vertex indices or malformed polygons (§4)
  - a script in the wrong type folder (§1)
  - Undo after non-recorded edits (pre-6)
  - `addObject` inside `buildObject` (§2)

  Save before testing. Force-quit with ⌘⌥⎋. [#11084](https://www.cheetah3d.com/forum/index.php?threads/11084/) [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/) [#1055](https://www.cheetah3d.com/forum/index.php?threads/1055/) [#13746](https://www.cheetah3d.com/forum/index.php?threads/13746/) [#6367](https://www.cheetah3d.com/forum/index.php?threads/6367/) [#8024](https://www.cheetah3d.com/forum/index.php?threads/8024/)
- **The in-app Help is the most current reference.** Third-party PDFs lag behind, and the bundled examples are the best idioms. [#8841](https://www.cheetah3d.com/forum/index.php?threads/8841/) [#9213](https://www.cheetah3d.com/forum/index.php?threads/9213/)

## 11. Version history (what broke or changed)

| Version | Change for scripts | Cites |
|---|---|---|
| 2.6.1 | Scripts lived in `/Applications/Cheetah3D/scripts/…` | [#466](https://www.cheetah3d.com/forum/index.php?threads/466/) |
| 3.2 / 3.3 | `setParameter(name, v, false)` overload (3.2; reliable 3.3). Light param names changed 3.1→3.2 | [#574](https://www.cheetah3d.com/forum/index.php?threads/574/) [#626](https://www.cheetah3d.com/forum/index.php?threads/626/) |
| 3.5 | User script folders auto-created. Light params changed again (3.4→3.5); 3.5 API additions not back-compatible | [#808](https://www.cheetah3d.com/forum/index.php?threads/808/) [#803](https://www.cheetah3d.com/forum/index.php?threads/803/) [#1021](https://www.cheetah3d.com/forum/index.php?threads/1021/) |
| 4.3 | Crash on `animationEnd()` in Tool `buildUI`; `print()` silent in first `buildUI` (fixed next release) | [#2375](https://www.cheetah3d.com/forum/index.php?threads/2375/) |
| 4.6 | **UV change:** `uvCoord()` returns Vec4D (UV1+UV2); `addIndexPolygon` wants Vec2D UVs. Many polygon scripts broke | [#466](https://www.cheetah3d.com/forum/index.php?threads/466/) [#467](https://www.cheetah3d.com/forum/index.php?threads/467/) [#1294](https://www.cheetah3d.com/forum/index.php?threads/1294/) [#1731](https://www.cheetah3d.com/forum/index.php?threads/1731/) [#2280](https://www.cheetah3d.com/forum/index.php?threads/2280/) |
| 5.0 | **Node-based materials:** old material params (`colorColor`, `colorTex`…) and `rib()` gone; no node scripting until 6.2.1. **Lights unified** as `LIGHT` + `lightType` (5.x). New JS engine (JavaScriptCore) in early 5.x broke some scripts | [#1210](https://www.cheetah3d.com/forum/index.php?threads/1210/) [#4085](https://www.cheetah3d.com/forum/index.php?threads/4085/) [#5514](https://www.cheetah3d.com/forum/index.php?threads/5514/) [#5550](https://www.cheetah3d.com/forum/index.php?threads/5550/) [#9078](https://www.cheetah3d.com/forum/index.php?threads/9078/) [#3376](https://www.cheetah3d.com/forum/index.php?threads/3376/) |
| 5.2 | Broke many polygon scripts and `Vec*.prototype` overrides; separate 5.2+ builds needed | [#1395](https://www.cheetah3d.com/forum/index.php?threads/1395/) [#1448](https://www.cheetah3d.com/forum/index.php?threads/1448/) [#4029](https://www.cheetah3d.com/forum/index.php?threads/4029/) [#4108](https://www.cheetah3d.com/forum/index.php?threads/4108/) |
| 5.3 | 64-bit build broke some older scripts | [#3880](https://www.cheetah3d.com/forum/index.php?threads/3880/) |
| 5.4–5.5 | Particle scripts (book mentions 5.4); misc breakage in 5.5 | [#2743](https://www.cheetah3d.com/forum/index.php?threads/2743/) (book) |
| 5.8 | Undo for scripts changed: scripts had to disable their undo; no `animPosition()`, no `recordGeometryForUndo()` | [#8848](https://www.cheetah3d.com/forum/index.php?threads/8848/) [#8878](https://www.cheetah3d.com/forum/index.php?threads/8878/) [#8884](https://www.cheetah3d.com/forum/index.php?threads/8884/) [#9461](https://www.cheetah3d.com/forum/index.php?threads/9461/) |
| 6.0 | **Undo API** (`recordGeometryForUndo`, `recordParametersForUndo`); **animation API** (Parameter/TakeNode/FCurve/FCurveKey); `doc.animPosition()` | [#1946](https://www.cheetah3d.com/forum/index.php?threads/1946/) [#8024](https://www.cheetah3d.com/forum/index.php?threads/8024/) [#8848](https://www.cheetah3d.com/forum/index.php?threads/8848/) [#6367](https://www.cheetah3d.com/forum/index.php?threads/6367/) |
| 6.2.1 | Material node functions (`nodeCount`, `nodeAtIndex`, …) | [#9730](https://www.cheetah3d.com/forum/index.php?threads/9730/) |
| 6.3.2 | `Vec3D.dot()` fixed | [#10731](https://www.cheetah3d.com/forum/index.php?threads/10731/) |
| 7.0 | Dummy icon tag removed, so **tag indices shift by −1**. Render resolution moved to renderer. DOF tag replaced by camera DOF. Expression tags (`performExpression`, `animationTime()`). Texture objects via `"param.tex"` (examples from 2016). Dots in param names broke in b18 (fixed b19). `isCeatorObj` typo fixed in b20. Spline cut behaviour changed between betas | [#8338](https://www.cheetah3d.com/forum/index.php?threads/8338/) [#10025](https://www.cheetah3d.com/forum/index.php?threads/10025/) [#808](https://www.cheetah3d.com/forum/index.php?threads/808/) [#12218](https://www.cheetah3d.com/forum/index.php?threads/12218/) [#12262](https://www.cheetah3d.com/forum/index.php?threads/12262/) [ex: CircleExpression.js](../examples/official/Tag/CircleExpression.js) [ex: Particle Image.js](../examples/official/Particle/Particle%20Image.js) |
| 7.3–8.0b3 | 2-arg `addParameterBool` crash confirmed on 7.3.3, 7.5.2, 8.0b3 | [#14327](https://www.cheetah3d.com/forum/index.php?threads/14327/) |
| 8.x | No vertex-colour API (2025). Docs still list stale constants and `rib()` | [#14613](https://www.cheetah3d.com/forum/index.php?threads/14613/) |

---

## Verify in app (8.1.1)

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
