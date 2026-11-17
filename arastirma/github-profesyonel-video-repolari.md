# Profesyonel görünen video için GitHub araştırması (17 Kasım 2026)

Yıldız sayıları ve lisanslar GitHub arama API'sinden 17 Kasım 2026'da alındı. "Şu an kullanıyoruz" işaretli olanlar Enf4 videosunda zaten var.

## İzleyicinin "yapay zekâ videosu" dediği şeyler
1. Tek düze, robotik seslendirme ve hiç nefes ya da vurgu olmayan tempo.
2. Ses tasarımı yok: müzik yok, geçiş sesleri yok, ses seviyesi videodan videoya değişiyor.
3. Her sahne aynı şablon: başlık + kart + kart. Kamera hareketi yok.
4. Gerçek dünyadan hiçbir görüntü yok, ya da her kanalda görülen genel stok görüntüler.
5. Kanal kimliği yok: açılış jeneriği, ara jenerik, alt bant (lower third), sabit renk ve yazı sistemi yok.
6. Altyazı zamanlaması kayıyor, rakamlar ekranda başka sesle başka söyleniyor.

"Arkasında ekip var" izlenimi veren şeyler bunların tersi: marka paketi (jenerik, ara jenerikler, alt bantlar), tekrar eden bölümler (Asya, Avrupa, Türkiye, kapanış tablosu), ses tasarımı, gerçek veriyle çizilmiş grafikler, ekranda kaynak, tutarlı ses.

## 1. Video motoru ve hareket
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| remotion-dev/remotion | 73.865 | Remotion lisansı | React ile video. Şu an kullanıyoruz | Devam |
| remotion-dev/skills | 7.419 | - | Remotion ekibinin resmî en iyi uygulama kuralları | Okunmalı |
| heygen-com/hyperframes | 85.824 | Apache-2.0 | HTML + GSAP ile video; ajan odaklı | İncele, geçiş yapma |
| motion-canvas/motion-canvas | 20.001 | MIT | Kod ile animasyon, editör önizlemeli | Gerek yok |
| midrender/revideo | 4.219 | MIT | Motion Canvas tabanlı video API | Gerek yok |
| 3b1b/manim | 96.620 | MIT | Açıklayıcı matematik animasyonu (Python) | Özel bölümler için |
| ManimCommunity/manim | 42.641 | MIT | Manim topluluk sürümü | Özel bölümler için |
| theatre-js/theatre | 13.034 | Apache-2.0 | Anahtar kare editörü, kamera koreografisi | Opsiyonel |
| juliangarnier/anime | 74.844 | MIT | Animasyon motoru, zaman çizelgesi | Opsiyonel |
| greensock/GSAP | 30.831 | GSAP lisansı | Endüstri standardı web animasyonu | Hyperframes ile birlikte |
| motiondivision/motion | 35.309 | MIT | React animasyonları (Remotion'da kare bazlı değil) | Kullanma |

## 2. Grafik ve veri görselleştirme
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| apache/echarts | 67.743 | Apache-2.0 | Grafik, gösterge, ağaç harita (treemap), mum. Şu an kullanıyoruz | Devam |
| d3/d3 | 113.950 | ISC | Ölçek, şekil, harita. Şu an kullanıyoruz | Devam |
| tradingview/lightweight-charts | 17.887 | Apache-2.0 | Profesyonel mum (borsa) grafikleri; TradingView atıf şartı var | Mum grafikleri için ekle |
| airbnb/visx | 21.113 | MIT | React + d3 bileşenleri | Opsiyonel |
| plouc/nivo | 14.145 | MIT | Hazır şık grafikler | Opsiyonel |
| observablehq/plot | 5.428 | ISC | Hızlı analiz grafikleri | Gerek yok |
| vasturiano/globe.gl | 3.238 | MIT | Three.js ile 3B dünya küresi | Açılış jeneriği için ekle |
| visgl/deck.gl | 14.765 | MIT | Büyük veri haritaları (WebGL2) | Ağ izni gerekir |
| maplibre/maplibre-gl-js | 12.114 | BSD | Vektör harita; karo sunucusu gerekir | Ağ izni gerekir |
| topojson/world-atlas | 1.241 | ISC | Natural Earth harita verisi. Şu an kullanıyoruz | Devam |

## 3. 3B, efekt ve doku
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| mrdoob/three.js | 118.754 | MIT | 3B. Şu an kullanıyoruz | Devam |
| pmndrs/react-three-fiber | 33.789 | MIT | React + three. Şu an kullanıyoruz | Devam |
| pmndrs/drei | 10.171 | MIT | Hazır 3B yardımcılar (metin, ortam, kamera) | Devam |
| pmndrs/postprocessing | 2.981 | Zlib | Bloom, vinyet, alan derinliği. Şu an kullanıyoruz | Devam |
| pixijs/pixijs + pixijs/filters | 48.787 / 1.153 | MIT | 2B GPU efektleri: film grenı, parlama, bozulma | Doku için ekle |
| gl-transitions/gl-transitions | 2.259 | açık koleksiyon | 100+ GLSL sahne geçişi | Geçiş çeşitliliği için ekle |
| scriptituk/xfade-easing | 127 | MIT | GL geçişlerini FFmpeg xfade'e taşır | Opsiyonel |

## 4. Tipografi, ikon, bayrak
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| rsms/inter | 20.085 | OFL-1.1 | Yazı tipi. Şu an kullanıyoruz (fontsource) | Devam |
| vercel/geist-font | 3.769 | OFL-1.1 | Modern yazı tipi, rakamlar için iyi | Opsiyonel |
| lucide-icons/lucide | 25.816 | ISC | İkonlar. Şu an kullanıyoruz | Devam |
| tabler/tabler-icons | 22.707 | MIT | 6.500+ ikon, finans ikonları zengin | Ek kaynak |
| HatScripts/circle-flags | 1.625 | MIT | Yuvarlak ülke bayrakları (SVG) | Ekle: piyasa tablolarında |
| lipis/flag-icons | 12.535 | MIT | Tüm ülke bayrakları (SVG) | Alternatif |
| vercel/satori | 14.195 | MPL-2.0 | HTML'den SVG/PNG; kapak üretimi | Opsiyonel |

## 5. Ses tasarımı (en büyük fark burada)
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| FFmpeg/FFmpeg | 67.642 | LGPL/GPL | loudnorm (−14 LUFS), sidechaincompress (müzik altında konuşmaya göre kısma), EQ | Hemen ekle |
| wyzowl/sfx-kit | 46 | CC0-1.0 | 320 video ses efekti (whoosh, pop, tik) | Ekle; yıldız az ama CC0 |
| facebookincubator/Meta-open-sound | 24 | CC0-1.0 | Meta'nın ücretsiz enstrüman ve efekt örnekleri | Ekle |
| maximilianfeix/plinkfx | 45 | belirtilmemiş | 180 CC0 efekt + Web Audio oynatıcı | Lisansı kontrol et |
| Tonejs/Tone.js | 14.923 | MIT | Tarayıcıda sentez: özgün jenerik sesi, riser, darbe | Marka sesi için |
| ace-step/ACE-Step-1.5 | 14.891 | MIT | Yerel müzik üretimi (özgün müzik yatağı) | Denenebilir; GPU gerekir |
| facebookresearch/audiocraft | 23.898 | MIT kod / NC ağırlık | MusicGen; model ağırlıkları ticari değil | Kullanma |
| bbc/audiowaveform | 2.170 | GPL-3.0 | Ses dalga formu görseli | Opsiyonel |

## 6. Seslendirme (Türkçe)
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| OpenBMB/VoxCPM | 42.587 | Apache-2.0 | VoxCPM2: 30 dil, ses tasarımı, 48 kHz | Türkçe test et (GPU) |
| alexturkey/voxcpm2-turkce-ses-tasarimi | 433 | Apache-2.0 | VoxCPM2 ile Türkçe ses tasarımı, 4 GB GPU | Türkçe için başlangıç |
| resemble-ai/chatterbox | 27.886 | MIT | Çok dilli TTS, Türkçe (tr) destekli; filigran ekler | Türkçe test et |
| fishaudio/fish-speech | 33.766 | özel lisans | Güçlü TTS; lisansı ticari kullanımda kısıtlı olabilir | Lisansı oku |
| QwenAudio/CosyVoice | 24.432 | Apache-2.0 | Çok dilli TTS; Türkçe desteği net değil | Düşük öncelik |
| coqui-ai/TTS (XTTS-v2) | 46.242 | MPL-2.0 kod / CPML model | Türkçe destekli; model lisansı ticari değil | Kullanma |
| freyavoiceai/FreyaTTS | 192 | Apache-2.0 | Türkçe için özel TTS modeli | Takip et |

## 7. Altyazı ve zamanlama
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| jianfch/stable-ts | 2.282 | MIT | Whisper ile zorunlu hizalama: elimizdeki metni sese kelime kelime oturtur | Vosk yerine geçmeli |
| m-bain/whisperX | 25.414 | BSD-2 | Kelime düzeyinde zaman damgası | Alternatif |
| SYSTRAN/faster-whisper | 26.832 | MIT | Hızlı Whisper (CPU'da da çalışır) | stable-ts ile |
| ggml-org/whisper.cpp | 55.268 | MIT | C++ Whisper; Remotion'ın resmî altyazı şablonu bunu kullanır | Alternatif |
| remotion-dev/template-tiktok | 308 | - | Remotion + whisper.cpp kelime kelime altyazı şablonu | Shorts için örnek |

## 8. Veri kaynakları (rakam hatasını önlemek için)
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| fatihmete/evds | 64 | MIT | TCMB EVDS verisi (Python); API anahtarı gerekir | Türkiye verisi için |
| SermetPekin/evdspy-repo | 8 | MIT | EVDS için alternatif istemci | Alternatif |
| ranaroussi/yfinance | 25.943 | Apache-2.0 | Yahoo Finance verisi; resmî API değil, kullanım şartlarına dikkat | Grafik verisi için |
| mortada/fredapi | 1.672 | Apache-2.0 | FED/FRED verileri | ABD makro verisi için |
| openbq-org/OpenBB | 75.492 | belirtilmemiş | Açık finans veri platformu | İncele |

## 9. Kurgu ve yayın grafikleri
| Repo | Yıldız | Lisans | Ne işe yarar | Karar |
|---|---|---|---|---|
| WyattBlue/auto-editor | 5.961 | Unlicense | Sessizlikleri otomatik keser | Seslendirme kayıtları için |
| mifi/editly | 5.624 | MIT | Bildirimsel kurgu (klip, geçiş, müzik) | Gerek yok |
| nodecg/nodecg | 1.308 | MIT | Canlı yayın grafik altyapısı (e-spor) | Canlı yayın yapılırsa |
| CasparCG/server | 1.109 | GPL-3.0 | TV kanallarının kullandığı oynatma sunucusu | Gerek yok |

## 10. Ajan iş akışı repoları (öğrenmek için, kopyalamak için değil)
| Repo | Yıldız | Lisans | Not |
|---|---|---|---|
| OpenMontageInc/OpenMontage | 81.293 | AGPL-3.0 | Ajanlı video üretim sistemi, 12 hat |
| Vincentwei1021/video-shotcraft | 20.974 | Apache-2.0 | Remotion ile sinematik tanıtım videoları |
| bangtutorial/bang-motion | 2.495 | MIT | Açılış, bumper, kinetik tipografi kalıpları |
| iart-ai/motion-skills | 1.819 | MIT | 56 hareket grafiği tarifi |

Bu repolar herkesin kullandığı kalıpları üretir; aynen kullanmak videoyu diğer yapay zekâ kanallarına benzetir. Kalıpları okuyup kendi marka paketimize uyarlamak doğru yol.

## Öneri: uygulama sırası
1. Bu hafta (ağ ve GPU gerektirmez):
   - Ses: müzik yatağı + sidechain ile konuşmada kısma + CC0 geçiş efektleri + loudnorm (−14 LUFS).
   - Marka paketi: 3 saniyelik açılış jeneriği (globe.gl küresi + logo), bölüm ara jenerikleri (ASYA, AVRUPA, TÜRKİYE), alt bant şablonu, sabit kapanış.
   - circle-flags ile piyasa tablolarında bayraklar; gl-transitions ile 4–5 sabit, markaya ait geçiş.
   - stable-ts ile metin-ses hizalaması (Vosk yerine), altyazı ve sahne zamanlaması daha doğru olur.
   - pixi filters / Remotion noise ile hafif film grenı ve kamera itme (push-in) hareketleri.
2. Sonraki adım (ağ izni gerekir):
   - Pexels/Pixabay API ile konuya uygun gerçek B-roll (borsa ekranları, liman, akaryakıt istasyonu). API anahtarı ve ağ izni gerekir.
   - lightweight-charts ile gerçek mum grafikleri; veriyi EVDS/yfinance'ten çek.
3. Ses kalitesi (GPU gerekir, kullanıcının bilgisayarı ya da Colab):
   - VoxCPM2 ve Chatterbox ile Türkçe test. Mevcut Google sesiyle aynı metni karşılaştır.
   - Özgün müzik için ACE-Step 1.5 dene; ya da YouTube Ses Kitaplığı gibi lisansı net kaynaklar.
