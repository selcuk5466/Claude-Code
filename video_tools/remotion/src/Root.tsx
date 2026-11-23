import React from 'react';
import {Composition, Sequence} from 'remotion';
import bounds from './bounds.json';
import {SCENES} from './scenes';
import {Bg, Ticker} from './ui';
import {ShortVideo, SHORT_TOTAL, SHORT_FPS} from './Short';
import {ShortBorsa, ShortFed, ShortYarin, BORSA_FRAMES, FED_FRAMES, YARIN_FRAMES} from './ShortMulti';
import {Gun2Video, GUN2_TOTAL} from './Gun2Video';
import {EvBorc, EvKar, EvBugun, EV_FRAMES} from './ShortEv';
import {PNvidia, PNasdaq, PAltin, PCin, P_FRAMES} from './ShortPiyasa';
import {QCip, QBil, QAnt, QBut, Q_FRAMES} from './ShortPro';
import {NNv, NKo, NAl, NIs, N_FRAMES} from './ShortPro2';
import {Seri1, Seri2, Seri3, Seri4, Seri5, Seri6, SERI_FRAMES} from './ShortSeri';
import {BrandTest, BRAND_TEST_FRAMES, IntroSting} from './Brand';
import {Thumb17} from './Thumb17';
import {Thumb18} from './Thumb18';
import {Thumb19} from './Thumb19';
import {Thumb20} from './Thumb20';
import {Thumb21} from './Thumb21';
import {Thumb22} from './Thumb22';
import {Thumb23} from './Thumb23';
import {EnfVideo4, ENF4_TOTAL} from './Enf4';
import {EnfVideo5, ENF5_TOTAL} from './Enf5';
import {EnfVideo6, ENF6_TOTAL} from './Enf6';
import {EnfVideo7, ENF7_TOTAL} from './Enf7';
import {EnfVideo8, ENF8_TOTAL} from './Enf8';
import {EnfVideo9, ENF9_TOTAL} from './Enf9';
import {EnfVideo10, ENF10_TOTAL} from './Enf10';
import {Seri7, Seri8, Seri9, Seri10, SERIP_FRAMES} from './ShortPalet';
import {ProTest} from './ProTest';
import {EnfVideo3, ENF3_TOTAL} from './Enf3';
import {EnfVideo2, ENF2_TOTAL} from './Enf2';
import {EnfHook, EnfFive, EnfAsg, EnfBer, EnfYan, ENF_SHORT_FRAMES} from './ShortEnf';
import {G2Altin, G2Fed, G2Nvidia, G2Petrol, G2Turkiye, G2_FRAMES} from './ShortG2';
import {Thumb} from './Thumb';
import {CoinStack} from './Coins3D';
const CoinTest: React.FC = () => <div style={{background:'#08182f',width:1920,height:1080}}><CoinStack width={900} height={800} lostFrom={30} lostDur={60}/></div>;
import {EnfVideo, ENF_TOTAL} from './Enf';
const LITE = process.env.LITE === '1';

const FPS = 30;
const TOTAL = Math.ceil(bounds.total * FPS);

const Video: React.FC = () => {
  const starts: number[] = bounds.starts;
  return (
    <>
      {LITE ? <div style={{position:'absolute',inset:0,background:'#08182f'}}/> : <Bg total={TOTAL} />}
      {SCENES.map((Scene, i) => {
        const from = Math.round(starts[i] * FPS);
        const to = i + 1 < starts.length ? Math.round(starts[i + 1] * FPS) : TOTAL;
        return (
          <Sequence key={i} from={from} durationInFrames={to - from}>
            <Scene />
          </Sequence>
        );
      })}
      <Ticker total={TOTAL} />
    </>
  );
};

export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
    <Composition id="Short" component={ShortVideo} durationInFrames={SHORT_TOTAL} fps={SHORT_FPS} width={1080} height={1920} />
    <Composition id="Enf2" component={EnfVideo2} durationInFrames={ENF2_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="EvBorc" component={EvBorc} durationInFrames={EV_FRAMES.borc} fps={30} width={1080} height={1920} />
    <Composition id="EvKar" component={EvKar} durationInFrames={EV_FRAMES.kar} fps={30} width={1080} height={1920} />
    <Composition id="EvBugun" component={EvBugun} durationInFrames={EV_FRAMES.bugun} fps={30} width={1080} height={1920} />
    <Composition id="Enf3" component={EnfVideo3} durationInFrames={ENF3_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="PNvidia" component={PNvidia} durationInFrames={P_FRAMES.nv} fps={30} width={1080} height={1920} />
    <Composition id="PNasdaq" component={PNasdaq} durationInFrames={P_FRAMES.nq} fps={30} width={1080} height={1920} />
    <Composition id="PAltin" component={PAltin} durationInFrames={P_FRAMES.au} fps={30} width={1080} height={1920} />
    <Composition id="PCin" component={PCin} durationInFrames={P_FRAMES.cn} fps={30} width={1080} height={1920} />
    <Composition id="Enf4" component={EnfVideo4} durationInFrames={ENF4_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Enf7" component={EnfVideo7} durationInFrames={ENF7_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Seri9" component={Seri9} durationInFrames={SERIP_FRAMES.s9} fps={30} width={1080} height={1920} />
    <Composition id="Seri10" component={Seri10} durationInFrames={SERIP_FRAMES.s10} fps={30} width={1080} height={1920} />
    <Composition id="Seri7" component={Seri7} durationInFrames={SERIP_FRAMES.s7} fps={30} width={1080} height={1920} />
    <Composition id="Seri8" component={Seri8} durationInFrames={SERIP_FRAMES.s8} fps={30} width={1080} height={1920} />
    <Composition id="Enf10" component={EnfVideo10} durationInFrames={ENF10_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Enf9" component={EnfVideo9} durationInFrames={ENF9_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Enf8" component={EnfVideo8} durationInFrames={ENF8_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Enf6" component={EnfVideo6} durationInFrames={ENF6_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Enf5" component={EnfVideo5} durationInFrames={ENF5_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Seri3" component={Seri3} durationInFrames={SERI_FRAMES.s3} fps={30} width={1080} height={1920} />
    <Composition id="Seri5" component={Seri5} durationInFrames={SERI_FRAMES.s5} fps={30} width={1080} height={1920} />
    <Composition id="Seri6" component={Seri6} durationInFrames={SERI_FRAMES.s6} fps={30} width={1080} height={1920} />
    <Composition id="Seri4" component={Seri4} durationInFrames={SERI_FRAMES.s4} fps={30} width={1080} height={1920} />
    <Composition id="Seri1" component={Seri1} durationInFrames={SERI_FRAMES.s1} fps={30} width={1080} height={1920} />
    <Composition id="Seri2" component={Seri2} durationInFrames={SERI_FRAMES.s2} fps={30} width={1080} height={1920} />
    <Composition id="NNv" component={NNv} durationInFrames={N_FRAMES.nv} fps={30} width={1080} height={1920} />
    <Composition id="NKo" component={NKo} durationInFrames={N_FRAMES.ko} fps={30} width={1080} height={1920} />
    <Composition id="NAl" component={NAl} durationInFrames={N_FRAMES.al} fps={30} width={1080} height={1920} />
    <Composition id="NIs" component={NIs} durationInFrames={N_FRAMES.is} fps={30} width={1080} height={1920} />
    <Composition id="QCip" component={QCip} durationInFrames={Q_FRAMES.cip} fps={30} width={1080} height={1920} />
    <Composition id="QBil" component={QBil} durationInFrames={Q_FRAMES.bil} fps={30} width={1080} height={1920} />
    <Composition id="QAnt" component={QAnt} durationInFrames={Q_FRAMES.ant} fps={30} width={1080} height={1920} />
    <Composition id="QBut" component={QBut} durationInFrames={Q_FRAMES.but} fps={30} width={1080} height={1920} />
    <Composition id="Thumb17" component={Thumb17} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Thumb23" component={Thumb23} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Thumb22" component={Thumb22} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Thumb21" component={Thumb21} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Thumb20" component={Thumb20} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Thumb19" component={Thumb19} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Thumb18" component={Thumb18} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="BrandTest" component={BrandTest} durationInFrames={BRAND_TEST_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="BrandIntro" component={IntroSting} durationInFrames={135} fps={30} width={1920} height={1080} />
    <Composition id="ProTest" component={ProTest} durationInFrames={300} fps={30} width={1920} height={1080} />
    <Composition id="EnfHook" component={EnfHook} durationInFrames={ENF_SHORT_FRAMES.hook} fps={30} width={1080} height={1920} />
    <Composition id="EnfFive" component={EnfFive} durationInFrames={ENF_SHORT_FRAMES.five} fps={30} width={1080} height={1920} />
    <Composition id="EnfAsg" component={EnfAsg} durationInFrames={ENF_SHORT_FRAMES.asg} fps={30} width={1080} height={1920} />
    <Composition id="EnfBer" component={EnfBer} durationInFrames={ENF_SHORT_FRAMES.ber} fps={30} width={1080} height={1920} />
    <Composition id="EnfYan" component={EnfYan} durationInFrames={ENF_SHORT_FRAMES.yan} fps={30} width={1080} height={1920} />
    <Composition id="ShortFed" component={ShortFed} durationInFrames={FED_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="ShortYarin" component={ShortYarin} durationInFrames={YARIN_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="G2Fed" component={G2Fed} durationInFrames={G2_FRAMES.fed} fps={30} width={1080} height={1920} />
    <Composition id="G2Altin" component={G2Altin} durationInFrames={G2_FRAMES.altin} fps={30} width={1080} height={1920} />
    <Composition id="G2Nvidia" component={G2Nvidia} durationInFrames={G2_FRAMES.nvidia} fps={30} width={1080} height={1920} />
    <Composition id="G2Petrol" component={G2Petrol} durationInFrames={G2_FRAMES.petrol} fps={30} width={1080} height={1920} />
    <Composition id="G2Turkiye" component={G2Turkiye} durationInFrames={G2_FRAMES.turkiye} fps={30} width={1080} height={1920} />
    <Composition id="Gun2" component={Gun2Video} durationInFrames={GUN2_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="Enf" component={EnfVideo} durationInFrames={ENF_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="CoinTest" component={CoinTest} durationInFrames={120} fps={30} width={1920} height={1080} />
    <Composition id="Thumb" component={Thumb} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ShortBorsa" component={ShortBorsa} durationInFrames={BORSA_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
