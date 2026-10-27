#!/usr/bin/env python3
"""Build the AI context packs in dist/ from skill/, knowledge/ and reference/.

dist/c3d-context-short.md : about 8k tokens. Paste it into any chat AI before asking for a script.
dist/c3d-context-full.md  : about 40k tokens. Upload it to a ChatGPT/Claude project, or attach it as a file.
"""
import re, pathlib, datetime
ROOT = pathlib.Path(__file__).resolve().parent.parent
REPO = 'https://github.com/tonioloewald/c3d-scripting-kb'
RAW = 'https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main'
skill = (ROOT / 'skill/SKILL.md').read_text()
patterns = (ROOT / 'knowledge/patterns.md').read_text()
gotchas = (ROOT / 'knowledge/gotchas.md').read_text()


def section(md, start, end=None):
    i = md.index(start)
    j = md.index(end, i + len(start)) if end else len(md)
    return md[i:j].strip()


def compact_cites(md):
    # [#574](https://...threads/574/) -> #574 ; [ex: X](../examples/...) -> (ex: X) ; [docs: X](...) -> (docs: X)
    md = re.sub(r'\[(#\d+)\]\(https?://[^)]+\)', r'\1', md)
    md = re.sub(r'\[((?:ex|docs): [^\]]+)\]\([^)]+\)', r'(\1)', md)
    md = re.sub(r'\[([^\]]+)\]\(\.\./[^)]+\)', r'\1', md)
    return md


def demote(md, by=1):
    return re.sub(r'^(#+)', lambda m: m.group(1) + '#' * by, md, flags=re.M)


today = datetime.date.today().isoformat()
HEAD = f"""# Cheetah3D Scripting: AI context pack ({{kind}})

> Give this file to an AI assistant (ChatGPT, Claude, Gemini, …) **before** asking it to write or fix a Cheetah3D script.
> It is a condensed version of the community knowledge base at {REPO}, built {today}. It was assembled from the official
> Cheetah3D 8.1.1 scripting reference, the scripts bundled with the app, and about 20 years of threads on the Cheetah3D forum.
> Citations like #574 are forum threads: https://www.cheetah3d.com/forum/index.php?threads/574/

**Instructions for the AI:** Use only the API documented below, or API the notes confirm. Don't invent methods. Mark anything
uncertain with `// UNVERIFIED:` and tell the user what to check. Write ES5 JavaScript (`var`, `function`; no arrow functions, `let`/`const`,
classes, template literals or modules). Always say which script type the code is, which folder to install it in
(`~/Library/Application Support/Cheetah3D/Scripts/<Type>/`) and how to run it. Tell the user the script hasn't been tested in Cheetah3D.
Assume the user knows Cheetah3D but not programming: give the complete script in one block, say to save it as a plain-text `.js` file
(in TextEdit, Format › Make Plain Text first, and turn off smart quotes), and tell them to paste back any Console errors if it fails.

**If you can open URLs,** fetch more detail when the task needs it (these are plain text):
- Everything (all patterns, all gotchas, the full API): {RAW}/dist/c3d-context-full.md
- Gotchas only: {RAW}/knowledge/gotchas.md · Patterns only: {RAW}/knowledge/patterns.md
- One API class: {RAW}/reference/api/<Class>.md (for example `PolyCore.md`, `Document.md`)
- Existing community scripts and whether they work: {RAW}/catalog/CATALOG.md (files are under {RAW}/scripts/forum/)
"""

core = re.sub(r'^## \d+\. ', '## ', '\n\n'.join([
    section(skill, '## 1. Pick the script type first', '## 3. Workflow'),
    '## Debugging order\n\nIf a script misbehaves, check in this order:\n\n1. Is it in the wrong folder?\n2. Is any `addParameter*` call missing arguments?\n3. Is a parameter name wrong? List the real names with `parameterInfo()`.\n4. Is there a rebuild loop (`setParameter` without `false`)?\n5. Has the API changed between versions?',
    section(skill, '## 4. API at a glance (8.1.1)', '## 5. If something is unknown').replace('Details and signatures are in `reference/api/`.', 'Full signatures are in the full context pack and in the repo under `reference/api/`.'),
]), flags=re.M)
skeletons = compact_cites(section(patterns, '## A. Script-type skeletons', '## B. Common tasks').split('\n', 1)[1].strip())
intro = section(patterns, '# Cheetah3D Script Patterns', '## A. Script-type skeletons').split('\n', 1)[1].strip()

short = HEAD.format(kind='short') + '\n' + core + '\n\n## Skeletons\n\n' + compact_cites(intro) + '\n\n' + skeletons + f'\n\n---\n**This is the short pack.** More patterns (scene iteration, meshes with UVs, splines, materials, keyframes, files, shared libraries, rendering, PRNG, introspection), every gotcha with its evidence, and the full API reference are in the full pack: {RAW}/dist/c3d-context-full.md. Fetch it, or ask the user to attach it, before using any API, pattern or gotcha that this file only mentions (for example patterns B8 or B10), and whenever a script fails for a reason not covered here.\n'

api_pages = []
order = ['Functions', 'Base', 'Document', 'Object', 'Tag', 'PolyCore', 'SplineCore', 'ParticleCore', 'Particle', 'Material', 'Node',
         'Parameter', 'Take', 'TakeNode', 'FCurve', 'FCurveKey', 'Texture', 'File', 'OS', 'Vec2D', 'Vec3D', 'Vec4D', 'Mat3D', 'Mat4D', 'Cluster', 'Constants']
for name in order:
    t = (ROOT / f'reference/api/{name}.md').read_text()
    t = re.sub(r'^_Source:.*\n', '', t, flags=re.M)
    api_pages.append(demote(t.strip(), 2))
full = (HEAD.format(kind='full') + '\n' + core + '\n\n# Patterns\n\n' + compact_cites(demote(patterns.split('\n', 1)[1].strip()))
        + '\n\n# Gotchas\n\n' + compact_cites(demote(gotchas.split('\n', 1)[1].strip()))
        + '\n\n# Official API reference (Cheetah3D 8.1.1)\n\n' + '\n\n'.join(api_pages) + '\n')

(ROOT / 'dist').mkdir(exist_ok=True)
(ROOT / 'dist/c3d-context-short.md').write_text(short)
(ROOT / 'dist/c3d-context-full.md').write_text(full)
for f in ('short', 'full'):
    s = (ROOT / f'dist/c3d-context-{f}.md').read_text()
    print(f, len(s), 'chars ~', len(s) // 4, 'tokens')
