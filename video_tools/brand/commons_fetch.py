#!/usr/bin/env python3
"""Wikimedia Commons'tan yalnızca kamu malı / CC0 görüntü indirir (anahtar gerekmez).
Kullanım: python3 commons_fetch.py "gold bars" altin 3 [photo|video]
remotion/public/stock/ altına indirir, credits.json'a kaynak ve lisans yazar."""
import json, os, re, subprocess, sys, urllib.parse, urllib.request

q, name, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
kind = sys.argv[4] if len(sys.argv) > 4 else 'photo'
UA = {'User-Agent': 'StockFetcher/1.1 (offline video graphics tool) python-urllib/3.13'}
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'remotion', 'public', 'stock')
os.makedirs(out, exist_ok=True)
OK = re.compile(r'^(public domain|pd|cc0|cc-zero|no restrictions)', re.I)


def api(**p):
    p.update(format='json', action='query')
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(p)
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40))


ft = 'filetype:video' if kind == 'video' else 'filetype:bitmap'
d = api(generator='search', gsrsearch=f'{q} {ft}', gsrnamespace=6, gsrlimit=50, prop='imageinfo',
        iiprop='url|mime|size|extmetadata', iiurlwidth=1920)
pages = sorted(d.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 0))
cred_path = os.path.join(out, 'credits.json')
cred = json.load(open(cred_path)) if os.path.exists(cred_path) else {}
got = 0
for p in pages:
    ii = (p.get('imageinfo') or [{}])[0]
    md = ii.get('extmetadata', {})
    lic = md.get('LicenseShortName', {}).get('value', '')
    if not OK.match(lic.strip()):
        continue
    w, h = ii.get('width', 0), ii.get('height', 0)
    if w < 1280 or w < h * 1.2:  # yatay ve en az 1280 px
        continue
    if kind == 'video':
        if not ii.get('mime', '').startswith('video'):
            continue
        src, ext = ii['url'], ii['url'].rsplit('.', 1)[-1].lower()
    else:
        if ii.get('mime') not in ('image/jpeg', 'image/png'):
            continue
        src, ext = ii.get('thumburl') or ii['url'], 'jpg'
    fn = f'{name}-{got + 1}.{ext}'
    dst = os.path.join(out, fn)
    with urllib.request.urlopen(urllib.request.Request(src, headers=UA), timeout=120) as r, open(dst, 'wb') as f:
        f.write(r.read())
    if kind == 'video' and ext != 'mp4':  # webm -> mp4, sessiz, 1920 genişlik, en fazla 20 sn
        mp4 = dst.rsplit('.', 1)[0] + '.mp4'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', dst, '-t', '20', '-an', '-vf', 'scale=1920:-2',
                        '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', mp4], check=True)
        os.remove(dst)
        fn = os.path.basename(mp4)
    cred[fn] = {'title': p['title'], 'page': ii.get('descriptionurl'), 'license': lic,
                'author': re.sub('<[^>]+>', '', md.get('Artist', {}).get('value', '')).strip(), 'query': q}
    print('indi', fn, '|', lic, '|', p['title'])
    got += 1
    if got >= n:
        break
json.dump(cred, open(cred_path, 'w'), ensure_ascii=False, indent=1)
print(f'{got} dosya')
