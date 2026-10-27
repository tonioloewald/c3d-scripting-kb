# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A knowledge base for writing Cheetah3D (macOS 3D app) JavaScript scripts, published at https://github.com/tonioloewald/c3d-scripting-kb. It is mostly Markdown and JSON content plus a few Python 3 build/lint scripts. There is no app, test suite or package manager. The README is written for Cheetah3D users who are **not** programmers or heavy AI users; keep it that way and put technical material in the later sections.

## Layout

- `skill/SKILL.md`: agent skill for writing Cheetah3D scripts. Its sections (`## 1. Pick the script type first` … `## 3. Workflow`, `## 4. API at a glance (8.1.1)` … `## 5. If something is unknown`) are extracted **by heading text** into the context packs.
- `knowledge/patterns.md`: skeletons for each script type (section A) and common tasks (section B).
- `knowledge/gotchas.md`: about 450 cited, version-tagged forum lessons, ending with a "Verify in app (8.1.1)" list.
- `reference/api/*.md`: official 8.1.1 API, one page per class, converted from the in-app HTML help. `reference/api-index.json` is derived from these pages.
- `examples/official/<Type>/`: the 17 scripts bundled with 8.1.1, the strongest evidence of what works in 8.x. `examples/generated/` holds AI-written examples.
- `catalog/forum-threads.json` (per-thread AI reviews, evidence quotes, lint results), `catalog/reviews/batch-*.json`, `catalog/tres-graficos.json` (links only, never copy tg_jp's code) → `catalog/CATALOG.md`.
- `scripts/forum/<thread-id>-<slug>/`: archived community scripts with attribution headers. `forum/threads/`: thread transcripts.
- `dist/`: **generated** context packs. Don't hand-edit them.
- `llms.txt`: entry point for AI tools. `docs/`: eval notes and the forum announcement draft.

File names must stay unique when case is ignored, because the repo is used on macOS. (`scripts/forum/1456-coils-and-arrows/arrow2D-2007.js` was renamed from `arrow2D.js` for this reason; it is referenced in `catalog/forum-threads.json`.)

## Build pipeline (run from the repo root)

```bash
python3 tools/build_context.py                         # skill/ + knowledge/ + reference/ → dist/c3d-context-{short,full}.md (prints token estimates)
python3 tools/build_catalog_md.py                      # re-lints every archived script, rewrites lint results into catalog/forum-threads.json, regenerates catalog/CATALOG.md
python3 tools/api_index.py reference/api reference/api-index.json   # rebuild API index after changing reference/api/
python3 tools/html2md.py <help-html-dir> reference/api              # reconvert official HTML help (needs bs4 + html5lib)
```

Dependencies flow like this: `reference/api/` → `api-index.json` → `c3d_lint.py` (method/constant checks) → `build_catalog_md.py`. If you rename headings in `skill/SKILL.md` or `knowledge/patterns.md`, update the `section(...)` calls in `tools/build_context.py`. Token counts quoted in the README and `llms.txt` (about 5k and 34k) should match what `build_context.py` prints.

## Lint

```bash
python3 tools/c3d_lint.py --type Polygonobj MyScript.js   # types: Macro|Tool|Tag|Polygonobj|Splineobj|Particle
```

The checks are heuristics taken from `gotchas.md`: `addParameter*` argument counts, `setParameter` without `false` in `buildObject`, wrong-folder detection, undocumented API calls. The linter exits 1 only on ERROR; WARN lines don't fail. Methods that the forum confirms but the 8.1.1 docs leave out go in `FORUM_KNOWN` in `c3d_lint.py`.

## Content conventions

- Cheetah3D scripts are ES5 JavaScript (JavaScriptCore): `var` and `function` only, no arrows, `let`/`const`, classes or template literals. The script type is set by the install folder (`~/Library/Application Support/Cheetah3D/Scripts/<Type>/`).
- Every claim in the knowledge files gets a citation: forum thread `[#574](https://www.cheetah3d.com/forum/index.php?threads/574/)`, `[ex: …]` or `[docs: …]`. `build_context.py` compacts these into short forms. Mark unconfirmed behaviour `[VERIFY]` or `// UNVERIFIED:`.
- Evidence precedence when sources disagree: 8.1.1 bundled examples > 7.x/8.x forum reports > 8.1.1 docs > older forum reports.
- Catalog status means **what users reported**, not a test in 8.x.
- Licensing: forum content is CC BY with attribution (honor takedown requests), official docs and examples are © MW3D-Solutions, everything else is MIT (see `NOTICE.md`).
