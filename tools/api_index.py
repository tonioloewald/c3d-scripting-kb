import re, json, pathlib, sys
api = pathlib.Path(sys.argv[1]); idx = {"classes":{}, "constants":[], "globals":[]}
for f in sorted(api.glob('*.md')):
    t = f.read_text(); cls = f.stem
    if cls == 'Constants':
        idx['constants'] = sorted(set(re.findall(r'^([A-Z][A-Z0-9_]{2,})\b', t, re.M))); continue
    m = re.search(r'^# (\w+)\s*:?\s*(\w+)?', t); parent = m.group(2) if m and m.group(2) not in (None,'Object','Class') else None
    if cls=='Object': parent='Base'
    methods = {}
    for sig in re.findall(r'^### `(.+)`', t, re.M):
        for name in re.findall(r'\b([a-zA-Z_]\w*)\s*\(', sig):
            if name in ('Vec2D','Vec3D','Vec4D','Mat3D','Mat4D','File') and name==cls: name='constructor'
            methods.setdefault(name, []).append(sig)
    props = []
    pm = re.search(r'## Properties\n(.+?)\n\n', t, re.S)
    if pm and pm.group(1).strip()!='none':
        props = re.findall(r'(?:Number|String|Boolean|BOOL|Object|Vec\dD|Mat\dD|Array|\w+)\s+([a-zA-Z_][\w]*(?:\s*,\s*[a-zA-Z_]\w*)*)', pm.group(1))
        props = [p.strip() for g in props for p in g.split(',')]
    if cls=='Functions': idx['globals']=sorted(methods); continue
    idx['classes'][cls] = {"inherits":parent, "methods":methods, "properties":props}
json.dump(idx, open(sys.argv[2],'w'), indent=1)
print(len(idx['classes']), sum(len(c['methods']) for c in idx['classes'].values()), len(idx['constants']), idx['globals'])
for c,v in idx['classes'].items(): print(c, v['inherits'], len(v['methods']), v['properties'][:8])
