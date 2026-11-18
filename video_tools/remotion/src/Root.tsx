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
import {BrandTest, BRAND_TEST_FRAMES, IntroSting} from './Brand';
import {Thumb17} from './Thumb17';
import {EnfVideo4, ENF4_TOTAL} from './Enf4';
import {EnfVideo5, ENF5_TOTAL} from './Enf5';
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
    <Composition id="Enf5" component={EnfVideo5} durationInFrames={ENF5_TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="QCip" component={QCip} durationInFrames={Q_FRAMES.cip} fps={30} width={1080} height={1920} />
    <Composition id="QBil" component={QBil} durationInFrames={Q_FRAMES.bil} fps={30} width={1080} height={1920} />
    <Composition id="QAnt" component={QAnt} durationInFrames={Q_FRAMES.ant} fps={30} width={1080} height={1920} />
    <Composition id="QBut" component={QBut} durationInFrames={Q_FRAMES.but} fps={30} width={1080} height={1920} />
    <Composition id="Thumb17" component={Thumb17} durationInFrames={1} fps={30} width={1280} height={720} />
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
