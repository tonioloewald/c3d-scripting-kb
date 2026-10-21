#!/usr/bin/env python3
"""Static checks for Cheetah3D JavaScript scripts (targets 8.x).

Usage: python3 tools/c3d_lint.py [--type Macro|Tool|Tag|Polygonobj|Splineobj|Particle] file.js [...]

Checks are heuristics drawn from knowledge/gotchas.md. They catch the mistakes that most
often broke forum scripts; they cannot prove a script works. Exit code 1 if any ERROR.
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
API = json.load(open(ROOT / 'reference/api-index.json'))
DOC_METHODS = {m for c in API['classes'].values() for m in c['methods']} | set(API['globals'])
CONSTANTS = set(API['constants'])
for _f in list((ROOT / 'reference/api').glob('*.md')) + list((ROOT / 'examples/official').rglob('*.js')):
    CONSTANTS |= set(re.findall(r'\b([A-Z][A-Z0-9_]{3,})\b', _f.read_text(errors='replace')))
# Forum-confirmed calls missing from the 8.1.1 reference (see knowledge/gotchas.md)
FORUM_KNOWN = {'id', 'animationTime', 'recordParametersForUndo', 'performExpression', 'scriptPath',
               'currentRenderer', 'rendererAtIndex', 'rootNode', 'selectedObjects'}
JS_BUILTINS = set('''push pop shift unshift slice splice concat join split indexOf lastIndexOf toString
toFixed toPrecision replace match substr substring charAt charCodeAt fromCharCode toLowerCase toUpperCase
sort reverse map filter forEach reduce some every apply call bind floor ceil round sqrt sin cos tan atan
atan2 asin acos abs pow min max random exp log keys parseInt parseFloat isNaN getTime now trim test exec
hasOwnProperty search getFullYear getMonth getDate getHours getMinutes getSeconds localeCompare parse
stringify isArray assign create defineProperty freeze getOwnPropertyNames'''.split())
ENTRY = {'Macro': ['main'], 'Tool': ['buildUI'], 'Tag': ['buildUI'],
         'Polygonobj': ['buildUI', 'buildObject'], 'Splineobj': ['buildUI', 'buildObject'],
         'Particle': ['buildUI', 'buildObject']}
ADD_PARAM_ARGS = {'addParameterBool': 6, 'addParameterFloat': 6, 'addParameterInt': 6,
                  'addParameterColor': 6, 'addParameterVec2D': 6, 'addParameterVec3D': 6,
                  'addParameterSelector': 4, 'addParameterString': 3, 'addParameterTexture': 3,
                  'addParameterLink': 2, 'addParameterButton': 3, 'addParameterSeparator': 1}


def strip_comments(src):
    src = re.sub(r'/\*.*?\*/', lambda m: '\n' * m.group().count('\n'), src, flags=re.S)
    return re.sub(r'//[^\n]*', '', src)


def func_bodies(src):
    """Yield (name, body) for top-level-ish `function name(...) { ... }`."""
    for m in re.finditer(r'function\s+(\w+)\s*\([^)]*\)\s*\{', src):
        i, depth = m.end(), 1
        while i < len(src) and depth:
            depth += {'{': 1, '}': -1}.get(src[i], 0)
            i += 1
        yield m.group(1), src[m.end():i]


def split_args(s):
    depth, cur, out = 0, '', []
    for ch in s:
        if ch in '([{': depth += 1
        if ch in ')]}': depth -= 1
        if ch == ',' and depth == 0:
            out.append(cur); cur = ''
        else:
            cur += ch
    if cur.strip(): out.append(cur)
    return out


def calls_with_args(src, name):
    for m in re.finditer(r'\.\s*%s\s*\(' % name, src):
        i, depth = m.end(), 1
        while i < len(src) and depth:
            depth += {'(': 1, ')': -1}.get(src[i], 0)
            i += 1
        yield m.start(), split_args(src[m.end():i - 1])


def guess_type(src):
    fns = set(re.findall(r'function\s+(\w+)\s*\(', src))
    if 'main' in fns: return 'Macro'
    if 'buildObject' in fns:
        if 'addParticle' in src: return 'Particle'
        if re.search(r'\.(moveTo|curveTo|lineTo|move|curve|line)\s*\(', src) and 'addPolygon' not in src:
            return 'Splineobj'
        return 'Polygonobj'
    if 'performExpression' in fns: return 'Tag'
    if 'buildUI' in fns: return 'Tool' if fns - {'buildUI', 'update'} else 'Tag'
    return None


def lint(path, declared=None):
    raw = pathlib.Path(path).read_text(errors='replace')
    src = strip_comments(raw)
    line = lambda pos: src.count('\n', 0, pos) + 1
    out = []
    def add(level, pos, msg): out.append((level, line(pos) if pos is not None else 0, msg))

    t = declared or guess_type(src)
    fns = dict(func_bodies(src))
    if not t:
        add('ERROR', None, 'No recognisable entry point (main / buildUI / buildObject).')
    else:
        for e in ENTRY[t]:
            if e not in fns:
                add('ERROR', None, f'{t} script needs function {e}(...).')
        if declared and guess_type(src) and guess_type(src) != declared:
            add('WARN', None, f'Looks like a {guess_type(src)} script but declared {declared}: wrong folder = silent failure or crash.')
    if t == 'Particle' and 'addParticle' not in src:
        add('WARN', None, 'Particle script never calls core.addParticle().')

    # addParameter* argument counts (missing trailing args can crash C3D)
    for name, n in ADD_PARAM_ARGS.items():
        for pos, args in calls_with_args(src, name):
            if len(args) < n:
                add('ERROR' if len(args) < min(n, 4) else 'WARN', pos, f'{name} has {len(args)} args, needs {n}: omitted trailing args have crashed Cheetah3D (#11084, #14327).')
            if args and re.fullmatch(r'\s*["\']type["\']\s*', args[0]):
                add('ERROR', pos, 'Parameter named "type" collides with a hidden built-in; object vanishes after reload (#1294).')
    # addParameter* outside buildUI
    for name, body in fns.items():
        if name != 'buildUI' and re.search(r'\.addParameter\w+\s*\(', body):
            add('WARN', src.find(body), f'addParameter* called in {name}(); only valid inside buildUI().')
    # setParameter inside buildObject / performExpression without false
    for hook in ('buildObject', 'performExpression'):
        body = fns.get(hook)
        if body:
            off = src.find(body)
            for pos, args in calls_with_args(body, 'setParameter'):
                if len(args) < 3 or args[2].strip() != 'false':
                    add('ERROR', off + pos, f'setParameter in {hook}() without third arg false: infinite rebuild loop (#574, #8739).')
            if hook == 'buildObject' and re.search(r'Math\.random\s*\(', body):
                add('WARN', off, 'Math.random() in buildObject(): geometry changes on every rebuild. Use a PRNG seeded from a parameter (patterns.md B10).')
    # constructors without new
    for m in re.finditer(r'(?<![\w.])(?<!new )(Vec2D|Vec3D|Vec4D|Mat3D|Mat4D|FCurveKey|File)\s*\(', src):
        add('ERROR', m.start(), f'{m.group(1)}(...) without `new` has crashed Cheetah3D (#1055).')
    # prototype extension of native classes
    for m in re.finditer(r'\b(Vec2D|Vec3D|Vec4D|Mat3D|Mat4D|PolyCore|SplineCore)\.prototype\b', src):
        add('WARN', m.start(), f'Extending {m.group(1)}.prototype breaks or is ignored on native classes (#1298, #10400).')
    # light constants
    for m in re.finditer(r'\b(SPOTLIGHT|POINTLIGHT|DISTANTLIGHT|AREALIGHT)\b', src):
        add('WARN', m.start(), f'{m.group(1)}: since 5.x lights are LIGHT + "lightType" parameter; these constants threw "Can\'t find variable" (#5550). Verify in 8.x.')
    # print() of non-strings
    for pos, args in calls_with_args(' ' + src, 'print'):
        pass
    for m in re.finditer(r'(?<![\w.])print\s*\(\s*(true|false|\d+|[a-zA-Z_]\w*\s*\))', src):
        add('INFO', m.start(), 'print() only reliably accepts strings; wrap values: print("" + x) (#10415).')
    # vertex copy semantics
    for m in re.finditer(r'\.vertex\s*\([^)]*\)\s*\.\s*(add|sub|multiply|set)\s*\(', src):
        if not re.search(r'setVertex', src[max(0, m.start() - 80):m.start()]):
            add('WARN', m.start(), 'core.vertex(i) returns a copy; write back with core.setVertex(i, ...) (#3528).')
    # selectedObject null check
    if re.search(r'selectedObject\s*\(\s*\)', src) and re.search(r'(==|!=)\s*null|if\s*\(\s*!?\s*\w+\s*\)', src):
        if 'owner()' not in src:
            add('INFO', None, 'doc.selectedObject() returns the root (not null) when nothing is selected; test obj.owner() == null (#10088).')
    # unknown method calls
    defined = set(fns) | set(re.findall(r'(\w+)\s*[:=]\s*function', src))
    for m in re.finditer(r'\.\s*([a-zA-Z_]\w*)\s*\(', src):
        n = m.group(1)
        if n in DOC_METHODS or n in JS_BUILTINS or n in defined: continue
        if n in FORUM_KNOWN:
            add('INFO', m.start(), f'.{n}() is undocumented in 8.1.1 but used on the forum; verify in app.')
        else:
            add('WARN', m.start(), f'.{n}() is not in the 8.1.1 API reference.')
    # unknown ALLCAPS identifiers that look like constants
    for m in re.finditer(r'(?<![\w."\'])([A-Z][A-Z0-9_]{3,})(?![\w"\'])', src):
        c = m.group(1)
        if c not in CONSTANTS and not re.search(r'\b(var|let|const)\s+' + c + r'\b', src) and c not in {'LIGHT', 'NAN'}:
            add('INFO', m.start(), f'{c}: not a documented constant.')
    return t, sorted(set(out), key=lambda x: (x[1], x[0]))


def main(argv):
    declared, files = None, []
    it = iter(argv)
    for a in it:
        if a == '--type': declared = next(it)
        else: files.append(a)
    if not files:
        print(__doc__); return 2
    bad = 0
    for f in files:
        t, issues = lint(f, declared)
        print(f'== {f}  [{t or "?"}]')
        for lvl, ln, msg in issues:
            print(f'  {lvl:5} L{ln:<4} {msg}')
            bad += lvl == 'ERROR'
        if not issues: print('  ok')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
