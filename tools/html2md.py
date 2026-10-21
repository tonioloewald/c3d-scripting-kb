import sys, re, pathlib
from bs4 import BeautifulSoup
def clean(s): return re.sub(r'\s+', ' ', s).strip()
src, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
for f in sorted(src.glob('*.html')):
    soup = BeautifulSoup(f.read_text(encoding='utf-8', errors='replace'), 'html5lib')
    for s in soup(['script','style']): s.decompose()
    title = clean(soup.h2.get_text()) if soup.h2 else f.stem
    lines = [f'# {title}', '', f'_Source: Cheetah3D 8.1.1 bundled help, Scripting/Classes/{f.name}_', '']
    body = soup.body
    for el in body.find_all(['p','tr','h3','pre'], recursive=True):
        if el.name == 'tr':
            if el.find('tr'): continue
            pt=el.find_parent('table')
            if pt is not None and pt.get('cellpadding')!='0': continue
            t = clean(el.get_text(' '))
            if not t: continue
            tds = el.find_all('td')
            if tds and tds[0].get('colspan') == '2' and el.find('strong'):
                lines += ['', f'### `{t}`']
            else:
                lines.append(t)
        elif el.name == 'pre':
            lines += ['```js', el.get_text(), '```']
        else:
            pt=el.find_parent('table')
            if pt is not None and pt.get('cellpadding')=='0': continue
            t = clean(el.get_text(' '))
            t2=re.sub(r'\s*(Properties|Constructor|Methods|Functions)$','',t)
            hdr=t[len(t2):].strip()
            if t2 and hdr: lines += ['', t2]; t=hdr
            if t in ('Properties','Constructor','Methods','Functions'): lines += ['', f'## {t}']
            elif t: lines += ['', t]
    md = '\n'.join(lines)
    md = re.sub(r'\n{3,}', '\n\n', md)
    (out / (f.stem + '.md')).write_text(md + '\n')
