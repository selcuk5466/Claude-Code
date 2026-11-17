#!/usr/bin/env python3
"""Seslendirme + müzik yatağı (konuşmada otomatik kısma) + efektler, sonra -14 LUFS.
Kullanım: python3 mix_audio.py plan.json cikti.wav
plan.json alanları: total, voice, voice_parts [[kaynak_bas, kaynak_son, hedef_bas]],
bed, bed_loud [[bas, son]], sfx [[dosya, zaman, kazanc]].
"""
import json, os, subprocess, sys, tempfile
plan = json.load(open(sys.argv[1])); out = sys.argv[2]
T = plan['total']; tmp = tempfile.mkdtemp()
def ff(*a): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *a], check=True)
def fit(label): return f"apad=whole_dur={T},atrim=0:{T},asetpts=PTS-STARTPTS[{label}]"

# 1) seslendirme izi
fc, ls = [], []
for k, (a, b, d) in enumerate(plan['voice_parts']):
    fc.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,adelay={int(d*1000)}:all=1,{fit('v%d' % k)}")
    ls.append(f"[v{k}]")
fc.append(f"{''.join(ls)}amix=inputs={len(ls)}:normalize=0:duration=longest,{fit('o')}")
voice = os.path.join(tmp, 'voice.wav'); ff('-i', plan['voice'], '-filter_complex', ';'.join(fc), '-map', '[o]', '-ar', '48000', voice)

# 2) müzik yatağı: jenerik ve kapanışta yüksek, konuşma altında kısık
loud = '+'.join(f"between(t,{a},{b})" for a, b in plan['bed_loud'])
bed = os.path.join(tmp, 'bed.wav')
ff('-stream_loop', '-1', '-i', plan['bed'], '-i', voice, '-filter_complex',
   f"[0:a]atrim=0:{T},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume='if({loud},0.95,0.30)':eval=frame,afade=t=out:st={T-2.5}:d=2.5[b];"
   f"[b][1:a]sidechaincompress=threshold=0.03:ratio=8:attack=15:release=450,{fit('o')}", '-map', '[o]', '-ar', '48000', bed)

# 3) efekt izi
ins, fc, ls = [], [], []
for k, (f, t0, g) in enumerate(plan['sfx']):
    ins += ['-i', f]
    fc.append(f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={int(max(0, t0)*1000)}:all=1,{fit('s%d' % k)}")
    ls.append(f"[s{k}]")
fc.append(f"{''.join(ls)}amix=inputs={len(ls)}:normalize=0:duration=longest,{fit('o')}")
sfx = os.path.join(tmp, 'sfx.wav'); ff(*ins, '-filter_complex', ';'.join(fc), '-map', '[o]', '-ar', '48000', sfx)

# 4) birleştir ve ses seviyesini sabitle
pre = os.path.join(tmp, 'pre.wav')
ff('-i', voice, '-i', bed, '-i', sfx, '-filter_complex', f"[0:a][1:a][2:a]amix=inputs=3:normalize=0:duration=longest,{fit('o')}", '-map', '[o]', '-ar', '48000', pre)
ff('-i', pre, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '2', out)
print('ok', out)
