#!/usr/bin/env python3
"""Pexels'ten ücretsiz stok video/foto indirir (Pexels lisansı: ticari kullanım serbest, kaynak gösterme zorunlu değil).
Kullanım: python3 pexels_fetch.py "gold bars" altin 3 [video|photo]
Dosyalar remotion/public/stock/ altına iner; credits.json'a kaynak bilgisi eklenir.
Anahtar ağ vekili tarafından eklenir, kod anahtar okumaz."""
import json, os, sys, urllib.parse, urllib.request
q, name, n = sys.argv[1], sys.argv[2], int(sys.argv[3]); kind = sys.argv[4] if len(sys.argv) > 4 else 'video'
out = os.path.join(os.path.dirname(__file__), '..', 'remotion', 'public', 'stock'); os.makedirs(out, exist_ok=True)
base = 'https://api.pexels.com/videos/search' if kind == 'video' else 'https://api.pexels.com/v1/search'
url = f"{base}?{urllib.parse.urlencode({'query': q, 'per_page': n, 'orientation': 'landscape', 'size': 'medium'})}"
data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={'Authorization': 'proxy-injected', 'User-Agent': 'video-tools'})))
cred_path = os.path.join(out, 'credits.json'); cred = json.load(open(cred_path)) if os.path.exists(cred_path) else {}
for i, it in enumerate(data.get('videos' if kind == 'video' else 'photos', [])):
    if kind == 'video':
        files = sorted([f for f in it['video_files'] if f.get('width') and f['width'] <= 1920 and f.get('file_type') == 'video/mp4'], key=lambda f: -f['width'])
        if not files: continue
        link, ext = files[0]['link'], 'mp4'
    else:
        link, ext = it['src']['large2x'], 'jpg'
    fn = f"{name}-{i + 1}.{ext}"; urllib.request.urlretrieve(link, os.path.join(out, fn))
    cred[fn] = {'pexels_url': it['url'], 'author': (it.get('user') or {}).get('name') or it.get('photographer'), 'query': q}
    print('indi', fn)
json.dump(cred, open(cred_path, 'w'), ensure_ascii=False, indent=1)
