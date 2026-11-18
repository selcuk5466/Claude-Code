#!/usr/bin/env python3
"""Pexels videolarını API anahtarı olmadan, video kimliğiyle (ID) indirir.
Kimlikler pexels.com/video/<ad>-<ID>/ adreslerinden alınır (web aramasıyla bulunur).
Dosya adı tahmin edilir: videos.pexels.com/video-files/<ID>/<ID>-hd_1920_1080_<fps>fps.mp4
Kullanım: python3 pexels_nokey.py altin-1=8733007 borsa-1=39068574 ...
remotion/public/stock/ altına 1920x1080, sessiz, en fazla 20 sn mp4 olarak kaydeder.
Pexels lisansı: ücretsiz, ticari kullanım serbest, kaynak gösterme zorunlu değil."""
import json, os, subprocess, sys, tempfile, urllib.error, urllib.request

UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) stock-fetch'}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'remotion', 'public', 'stock')
os.makedirs(OUT, exist_ok=True)
SIZES = ['hd_1920_1080', 'hd_1920_1012', 'hd_1920_1014', 'hd_1920_1008', 'hd_1920_1088', 'uhd_2560_1440', 'hd_1280_720']
FPS = ['25', '30', '24', '50', '60', '29.97', '23.98', '59.94', '100', '48', '120']


def exists(url):
    try:
        urllib.request.urlopen(urllib.request.Request(url, headers=UA, method='HEAD'), timeout=15)
        return True
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, OSError):
        return False


def find(vid):
    for s in SIZES:
        for f in FPS:
            u = f'https://videos.pexels.com/video-files/{vid}/{vid}-{s}_{f}fps.mp4'
            if exists(u):
                return u
    return None


cred_path = os.path.join(OUT, 'credits.json')
cred = json.load(open(cred_path)) if os.path.exists(cred_path) else {}
for arg in sys.argv[1:]:
    name, vid = arg.split('=', 1)
    url = vid if vid.startswith('https://') else find(vid)  # doğrudan dosya adresi de verilebilir
    vid = vid.rsplit('/video-files/', 1)[-1].split('/')[0]
    if not url:
        print('BULUNAMADI', name, vid)
        continue
    tmp = tempfile.mktemp(suffix='.mp4')
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r, open(tmp, 'wb') as f:
        f.write(r.read())
    dst = os.path.join(OUT, f'{name}.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-t', '20', '-an',
                    '-vf', 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30',
                    '-c:v', 'libx264', '-crf', '19', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', dst], check=True)
    os.remove(tmp)
    cred[f'{name}.mp4'] = {'source': 'Pexels', 'page': f'https://www.pexels.com/video/{vid}/', 'file': url, 'license': 'Pexels License'}
    print('indi', name, url.rsplit('/', 1)[-1])
json.dump(cred, open(cred_path, 'w'), ensure_ascii=False, indent=1)
