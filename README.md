# Cheetah3D Scripting Knowledge Base

**Want an AI to write a Cheetah3D script?** Give it [`dist/c3d-context-short.md`](dist/c3d-context-short.md) first: paste it in, or attach [`dist/c3d-context-full.md`](dist/c3d-context-full.md). Then ask. Always test the result.

Cheetah3D's JavaScript scripting API is powerful, but the official documentation is thin and much of what people know is scattered across 20 years of forum posts. This repo collects that knowledge in a form people and AI agents can use. It was built to back an AI skill that writes working Cheetah3D scripts (`skill/SKILL.md`).

## What's here

| Path | Contents |
|---|---|
| `reference/api/` | The official **Cheetah3D 8.1.1** scripting reference (one page per class), converted from the in-app help |
| `reference/api-index.json` | A machine-readable list of the documented classes, methods and constants |
| `reference/book-ch17.8-scripts.md` | The scripting chapter of *Learn 3D with Cheetah 3D* ([repo](https://github.com/tonioloewald/Learn-3D-with-Cheetah-3D)) |
| `examples/official/` | The 17 example scripts that ship with 8.1.1 |
| `knowledge/gotchas.md` | **Things the docs don't tell you.** About 450 forum-sourced lessons, deduplicated, cross-checked against the 8.1.1 docs, cited and version-tagged |
| `knowledge/patterns.md` | Working skeletons for each script type and for common tasks |
| `catalog/CATALOG.md` | Every script from the forum's Scripting section, with a works/broken status, versions, evidence and best file |
| `catalog/forum-threads.json` | The same data as JSON, plus evidence quotes, API lessons and lint results for each thread |
| `catalog/tres-graficos.json` | An index of tg_jp's 116 script packages on tres-graficos.jp (links only) |
| `scripts/forum/` | 274 archived community scripts, each with an attribution header |
| `forum/threads/` | Full transcripts of 539 threads from the *Script downloads* and *Scripting General* subforums |
| `tools/c3d_lint.py` | A static checker for the mistakes that most often broke scripts |
| `skill/SKILL.md` | An agent skill for writing Cheetah3D scripts using this repo |
| `dist/c3d-context-short.md` | **About 5k tokens. Paste it into any AI chat before asking for a script** |
| `dist/c3d-context-full.md` | About 34k tokens: everything, for a ChatGPT/Claude project or as an attachment (`tools/build_context.py` regenerates both) |
| `llms.txt` | The entry point for AI tools that read this repo |

## How the status was decided

Forum threads were crawled on 2026-10-21. For each thread that contained or linked to a script, an AI reviewer read the whole thread. It recorded what the script does, whether people reported that it **worked**, **broke** or was **fixed later**, and which Cheetah3D versions they mentioned. It also kept 1–4 verbatim evidence quotes with links. The status reflects **what users reported, not a test in 8.x**. Treat scripts last confirmed before 7.0 as likely to need fixes, and run `tools/c3d_lint.py` on them.

## Lint

```bash
python3 tools/c3d_lint.py --type Polygonobj MyScript.js
```

## Still open

- **Verify in app:** the "Verify in app" list at the end of `knowledge/gotchas.md` covers claims that should be tested in 8.1.1 with small test macros.
- **Not yet crawled:** scripts posted outside the Scripting subforums (General, Tutorials).

## Licensing

See [NOTICE.md](NOTICE.md). In short:

- Forum content is attributed to its authors and treated as CC BY. Takedown requests will be honored.
- The official docs and examples are © MW3D-Solutions.
- tg_jp's scripts are linked, not copied.
- Everything else is MIT.
