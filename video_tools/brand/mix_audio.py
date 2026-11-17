#!/usr/bin/env python3
"""Seslendirme + müzik yatağı (konuşmada otomatik kısma) + efektler, sonra -14 LUFS.
Kullanım: python3 mix_audio.py plan.json cikti.wav
plan.json alanları: total, voice, voice_parts [[kaynak_bas, kaynak_son, hedef_bas]],
bed, bed_loud [[bas, son]], sfx [[dosya, zaman, kazanc]].
"""
import json, os, subprocess, sys, tempfile
import numpy as np
plan = json.load(open(sys.argv[1])); out = sys.argv[2]
T = plan['total']; tmp = tempfile.mkdtemp()
def ff(*a): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *a], check=True)
def fit(label): return f"apad=whole_dur={T},atrim=0:{T},asetpts=PTS-STARTPTS[{label}]"

# 1) seslendirme izi: parçalar numpy ile örnek hassasiyetinde yerleştirilir (ffmpeg adelay güvenilmez çıktı)
SR = 48000; N = int(round(T * SR))
def load(path, ss=None, to=None, gain=1.0):
    a = (['-ss', str(ss)] if ss is not None else []) + (['-to', str(to)] if to is not None else [])
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', *a, '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2) * gain
def place(buf, x, t0):
    i = int(round(max(0, t0) * SR)); n = max(0, min(len(x), N - i))
    buf[i:i + n] += x[:n]
def save(buf, path):
    p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-i', '-',
                          '-c:a', 'pcm_f32le', path], stdin=subprocess.PIPE)
    p.communicate(buf.astype(np.float32).tobytes())
    if p.returncode: sys.exit('ffmpeg yazma hatası')
vb = np.zeros((N, 2), np.float32)
vfull = load(plan['voice'])  # bazı TTS WAV'larında -ss ile atlama bozuk; tamamını çöz, sonra kes
for a, b, d in plan['voice_parts']: place(vb, vfull[int(round(a * SR)):int(round(b * SR))], d)
voice = os.path.join(tmp, 'voice.wav'); save(vb, voice)

# 2) müzik yatağı: jenerik/ara jenerik/kapanışta yüksek, konuşma altında çok kısık ve konuşma frekanslarından oyulmuş
LOW, HIGH, RAMP = plan.get('bed_low', 0.27), plan.get('bed_high', 2.4), 0.6
OFF = plan.get('bed_offset', 0)
win = [f"clip((t-{a})/{RAMP},0,1)*clip(({b}-t)/{RAMP},0,1)" for a, b in plan['bed_loud']]
expr = win[0]
for w in win[1:]: expr = f"max({expr},{w})"
bed = os.path.join(tmp, 'bed.wav')
ff('-stream_loop', '-1', '-i', plan['bed'], '-i', voice, '-filter_complex',
   f"[0:a]atrim={OFF}:{OFF + T},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,"
   f"equalizer=f=2200:t=q:w=1.0:g=-7,equalizer=f=350:t=q:w=1.0:g=-3,"
   f"volume='{LOW}+({HIGH}-{LOW})*({expr})':eval=frame,afade=t=out:st={T-2.5}:d=2.5[b];"
   f"[1:a]aformat=channel_layouts=stereo[sc];[b][sc]sidechaincompress=threshold=0.05:ratio=3:attack=15:release=500,{fit('o')}", '-map', '[o]', '-ar', '48000', '-c:a', 'pcm_f32le', bed)

# 3) efekt izi
sb = np.zeros((N, 2), np.float32)
for f, t0, g in plan['sfx']: place(sb, load(f, gain=g), t0)
sfx = os.path.join(tmp, 'sfx.wav'); save(sb, sfx)

# 4) birleştir ve ses seviyesini sabitle
pre = os.path.join(tmp, 'pre.wav')
ff('-i', voice, '-i', bed, '-i', sfx, '-filter_complex', f"[0:a][1:a][2:a]amix=inputs=3:normalize=0:duration=longest,{fit('o')}", '-map', '[o]', '-ar', '48000', '-c:a', 'pcm_f32le', pre)
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
m = json.loads(r[r.rindex('{'):r.rindex('}') + 1])
ff('-i', pre, '-af', f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true", '-ar', '48000', '-ac', '2', out)
print('ok', out)
