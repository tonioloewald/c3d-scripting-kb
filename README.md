# Cheetah3D Scripting Knowledge Base

**Use an AI chat assistant (ChatGPT, Claude, Gemini, …) to fix, improve or write Cheetah3D scripts, without being a programmer.**

AI assistants are good at JavaScript but know very little about Cheetah3D, so on their own they write scripts that look right but don't work. This repo fixes that. It gathers the real Cheetah3D 8.1.1 scripting API, the example scripts that ship with the app, and about 20 years of hard-won lessons from the Cheetah3D forum into one file you hand to the AI before you ask.

You don't need to install anything, and you don't need to understand the code the AI writes. You need to know Cheetah3D, describe what you want clearly, and test the result.

---

## Quick start (5 minutes)

1. **Download the context pack.** Open [`dist/c3d-context-short.md`](dist/c3d-context-short.md) and click the **Download raw file** button (the ⬇ icon at the top right of the file view).
2. **Start a new chat** in ChatGPT, Claude or a similar assistant.
3. **Attach the file** (paperclip or "+" button), or open it in any text editor and paste its whole contents into the chat.
4. **Ask for what you want** in the same message. For example:

   > Using the attached Cheetah3D guide, write a Macro script that renames every selected object to "Brick 1", "Brick 2", "Brick 3" and so on, in the order they appear in the object list. I'm using Cheetah3D 8.1.

5. **Install and test** the script the AI gives you (see [Installing a script](#installing-a-script) below).

**Short or full pack?**

- **Short (`c3d-context-short.md`, about 5k tokens)** covers most jobs and fits in any chat.
- **Full (`c3d-context-full.md`, about 34k tokens)** adds every pattern, every forum lesson and the complete API reference. Use it for bigger or unusual scripts, or when the short pack wasn't enough.
- If you use a ChatGPT **Project** or a Claude **Project**, add the full pack to the project's files once. Every chat in that project then knows it.

---

## Before you start: three things to set up in Cheetah3D

### 1. Find your Scripts folder

Scripts live in:

```
~/Library/Application Support/Cheetah3D/Scripts/
```

Inside it there is one folder per script type: `Macro`, `Tool`, `Tag`, `Polygonobj`, `Splineobj` and `Particle`. If a folder is missing, create it.

The `Library` folder is hidden. To get there in Finder, choose **Go › Go to Folder…** (⇧⌘G), paste the path above and press Return.

> **The folder decides what kind of script it is.** A Tool script placed in the Macro folder won't work, and may crash Cheetah3D without telling you why. The AI tells you which folder each script belongs in. Put it exactly there.

### 2. Turn on the Console

Error messages and anything a script prints go to the **Console** panel, which is hidden by default. Right-click any panel header in Cheetah3D and add the Console. You'll need it when something goes wrong.

### 3. Know where scripts appear

| Type | What it's for | How you run it |
|---|---|---|
| **Macro** | A one-shot action with no settings ("select all lights", "rename these") | Tools › Script › Macro › *name* |
| **Tool** | An action with settings and buttons | Tools › Script › Tool › *name*. Its settings appear in the **Tool** tab |
| **Tag** | Something that runs every frame and drives an object (follow, wobble, constrain) | Select the object, then Tools › Script › Tag › *name* |
| **Polygonobj** | A procedural mesh with editable parameters (a brick wall, a gear) | Tools › Script › Polygonobj › *name*. Its parameters are in the object's properties |
| **Splineobj** | A procedural spline (a spiral, an arrow outline) | Same as Polygonobj |
| **Particle** | A custom particle layout. The object's children are copied onto the particles | Same as Polygonobj |

If you don't know which type you need, describe what you want and ask the AI to choose.

---

## Installing a script

1. The AI gives you a block of code. Copy all of it.
2. Save it as a **plain-text** file whose name ends in `.js`, for example `Rename Bricks.js`.
   - **TextEdit:** choose **Format › Make Plain Text** *before* pasting. Also turn off smart quotes (**Edit › Substitutions › Smart Quotes**), because curly quotes break scripts.
   - Any code editor (BBEdit, CotEditor, VS Code) works without extra steps.
3. Put the file in the folder the AI named, for example `Scripts/Macro/`.
4. In Cheetah3D, choose **Update Scripts Menu** at the bottom of the Script menu, or quit and relaunch Cheetah3D. The script now appears in the menu.
5. **Test it on a copy of your scene.** A bad script can crash Cheetah3D, so save your work first.

If you edit a script that's already installed, Cheetah3D picks up the change the next time you run it. You may have to pick it from the menu again.

---

## Recipe 1: Fix a broken script

Many older scripts from the forum stopped working in newer Cheetah3D versions. Usually the fix is small.

1. **Find the script.** Check the [script catalog](catalog/CATALOG.md) first. It lists every script posted in the forum's Scripting section, says whether people reported it **working**, **broken** or **fixed later**, and shows which file is the best version. The files are in [`scripts/forum/`](scripts/forum/).
2. **Run it once and copy the error** from the Console, if there is one.
3. **Start a chat**, attach the context pack, then attach or paste the script and write something like:

   > This is a Cheetah3D **Polygonobj** script from the forum (around 2010). In Cheetah3D 8.1 it **[describe what happens: nothing appears / it crashes / the shape is inside out]**. The Console shows:
   >
   > `[paste the error here]`
   >
   > Please fix it for Cheetah3D 8.x, keep the original author's credit, and tell me what you changed and why.

4. Install the fixed version (consider adding "fixed" to the file name so you keep the original), test it, and paste any new errors back into the chat. Two or three rounds is normal.

**What to tell the AI:** your exact Cheetah3D version (Cheetah3D › About Cheetah3D), the script type, which folder you installed it in, what you expected, what actually happened, and the **exact** Console text. "It doesn't work" gives the AI nothing to go on.

---

## Recipe 2: Add a feature to a script

1. Attach the context pack and the script (one you wrote, one from the forum, or one an AI wrote earlier).
2. Describe the change in Cheetah3D terms, as you would to a colleague:

   > Here is a Cheetah3D **Polygonobj** script that makes a brick wall. Please add:
   > - a **Mortar gap** slider (0 to 0.5, default 0.05) that sets the space between bricks;
   > - a **Random offset** checkbox that shifts each row by a random amount, the same each time the scene is opened;
   > - separate materials for odd and even rows.
   >
   > Keep everything else the same.

3. Install, test and iterate. Ask for **one or two changes at a time**: if something breaks, you'll know which change caused it.

---

## Recipe 3: Create a new script

Your description matters more than anything else. A good request says:

- **What it acts on:** the selected objects, the whole scene, or a new object the script generates.
- **What it should do,** step by step, in Cheetah3D terms (objects, tags, materials, keyframes, splines, polygons, UVs).
- **What you want to control:** sliders, checkboxes, choices, buttons, with sensible ranges and defaults if you know them.
- **Whether it should animate** or update live when you change things, or run once.
- **Your Cheetah3D version.**

Example prompts:

> **Macro:** For every selected object, add a new material with a random colour and assign it to that object. Name each material after its object.

> **Tool:** A tool with a "Count" (1–100) and a "Radius" setting and a **Distribute** button. When I press the button, it arranges the selected objects evenly on a circle of that radius around the world origin, all facing the centre. One undo should put them back.

> **Polygonobj:** A procedural staircase with parameters for number of steps, step width, step height and step depth, plus an optional handrail on either side. Give it proper UVs so a wood texture lines up on each step.

> **Tag:** An expression tag that makes its object bob up and down. Parameters for height, speed and a phase offset so several objects can bob out of step. It must not drift over time, and I need to keep animating the object's position myself.

The AI tells you the script type, the folder and how to run it. If anything in the script is a guess, the guide asks the AI to mark it `UNVERIFIED` and tell you what to check, so read those notes.

---

## When it doesn't work

Paste the Console output back into the same chat and describe what you see. The context pack tells the AI the order in which to check the usual causes:

1. **Wrong folder.** A misplaced script fails silently or with a misleading error.
2. **A missing setting in the script's UI code.** This can crash Cheetah3D.
3. **A wrong parameter name.** Script names often differ from the labels you see in the app.
4. **An endless rebuild.** Cheetah3D freezes or gets very slow.
5. **An API change** between Cheetah3D versions.

If the AI seems stuck, try these:

- Start a fresh chat with the **full** pack.
- Ask it to write a small **diagnostic Macro** that prints what it needs to know (for example an object's real parameter names). Run it and paste the Console output back.
- Ask on the [Cheetah3D forum](https://www.cheetah3d.com/forum/). Include the script, your version and the Console output.

Always keep a backup of your scene, and never test a new script on your only copy.

---

## What's in this repo

| Path | Contents |
|---|---|
| `dist/c3d-context-short.md` | **About 5k tokens. Give it to any AI chat before asking for a script** |
| `dist/c3d-context-full.md` | About 34k tokens: everything below, for a ChatGPT/Claude project or as an attachment |
| `catalog/CATALOG.md` | Every script from the forum's Scripting section, with works/broken status, versions, evidence and the best file |
| `scripts/forum/` | 274 archived community scripts, each with an attribution header |
| `knowledge/gotchas.md` | **Things the docs don't tell you.** About 450 forum-sourced lessons, deduplicated, cross-checked against the 8.1.1 docs, cited and version-tagged |
| `knowledge/patterns.md` | Working skeletons for each script type and for common tasks |
| `reference/api/` | The official **Cheetah3D 8.1.1** scripting reference (one page per class), converted from the in-app help |
| `reference/api-index.json` | A machine-readable list of the documented classes, methods and constants |
| `reference/book-ch17.8-scripts.md` | The scripting chapter of *Learn 3D with Cheetah 3D* ([repo](https://github.com/tonioloewald/Learn-3D-with-Cheetah-3D)) |
| `examples/official/` | The 17 example scripts that ship with 8.1.1 |
| `examples/generated/` | Scripts written by an AI using this repo, as worked examples |
| `catalog/forum-threads.json` | The catalog as JSON, plus evidence quotes, API lessons and lint results for each thread |
| `catalog/tres-graficos.json` | An index of tg_jp's 116 script packages on tres-graficos.jp (links only) |
| `forum/threads/` | Full transcripts of 539 threads from the *Script downloads* and *Scripting General* subforums |
| `tools/c3d_lint.py` | A static checker for the mistakes that most often broke scripts |
| `skill/SKILL.md` | An agent skill for writing Cheetah3D scripts with this repo |
| `llms.txt` | The entry point for AI tools that read this repo |

### How the catalog status was decided

Forum threads were crawled on 2026-10-21. For each thread that contained or linked to a script, an AI reviewer read the whole thread. It recorded what the script does, whether people reported that it **worked**, **broke** or was **fixed later**, and which Cheetah3D versions they mentioned. It also kept 1–4 verbatim evidence quotes with links. The status reflects **what users reported, not a test in 8.x**. Treat scripts last confirmed before 7.0 as likely to need fixes.

---

## For more technical users

**Claude Code / agent skill.** `skill/SKILL.md` is a skill that clones this repo and follows a full workflow: check the catalog, start from a pattern, lint, then deliver with install instructions. For Claude Code, copy it to `~/.claude/skills/cheetah3d-scripting/SKILL.md`. With an agent that can reach your Mac, it can also install the script for you.

**Lint** (Python 3, no dependencies):

```bash
python3 tools/c3d_lint.py --type Polygonobj MyScript.js
```

It catches the mistakes that most often broke scripts (missing `addParameter*` arguments, rebuild loops, wrong-folder signs, undocumented API calls). Passing lint doesn't mean a script works.

**Rebuilding the generated files** after editing `skill/`, `knowledge/` or `reference/`:

```bash
python3 tools/build_context.py      # regenerate dist/ context packs
python3 tools/build_catalog_md.py   # re-lint archived scripts and regenerate catalog/CATALOG.md
```

---

## How you can help

- **Report what works in 8.x.** Most "works" reports in the catalog date from versions 5–7. If you try an old script in 8.x, open an issue or post on the forum with the script name, your version, and whether it worked (or the error).
- **Confirm the open questions.** The "Verify in app" list at the end of [`knowledge/gotchas.md`](knowledge/gotchas.md) covers claims that still need testing in 8.1.1. Many are one-line test macros.
- **Send fixes.** If you update an old script for 8.x, open a pull request or post it on the forum.
- **Not yet crawled:** scripts posted outside the Scripting subforums (General, Tutorials).

## Licensing

See [NOTICE.md](NOTICE.md). In short:

- Forum content is attributed to its authors and treated as CC BY. **Authors who want a script removed or credited differently: open an issue and it will be done promptly.**
- The official docs and examples are © MW3D-Solutions.
- tg_jp's scripts are linked, not copied. Please download them from [tres-graficos.jp](http://www.tres-graficos.jp) and consider supporting him.
- Everything else is MIT.
