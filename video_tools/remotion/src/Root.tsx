import React from 'react';
import {Composition, Sequence} from 'remotion';
import bounds from './bounds.json';
import {SCENES} from './scenes';
import {Bg, Ticker} from './ui';
import {ShortVideo, SHORT_TOTAL, SHORT_FPS} from './Short';
import {ShortBorsa, ShortFed, ShortYarin, BORSA_FRAMES, FED_FRAMES, YARIN_FRAMES} from './ShortMulti';
import {G2Altin, G2Fed, G2Nvidia, G2Petrol, G2Turkiye, G2_FRAMES} from './ShortG2';
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
    <Composition id="ShortFed" component={ShortFed} durationInFrames={FED_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="ShortYarin" component={ShortYarin} durationInFrames={YARIN_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="G2Fed" component={G2Fed} durationInFrames={G2_FRAMES.fed} fps={30} width={1080} height={1920} />
    <Composition id="G2Altin" component={G2Altin} durationInFrames={G2_FRAMES.altin} fps={30} width={1080} height={1920} />
    <Composition id="G2Nvidia" component={G2Nvidia} durationInFrames={G2_FRAMES.nvidia} fps={30} width={1080} height={1920} />
    <Composition id="G2Petrol" component={G2Petrol} durationInFrames={G2_FRAMES.petrol} fps={30} width={1080} height={1920} />
    <Composition id="G2Turkiye" component={G2Turkiye} durationInFrames={G2_FRAMES.turkiye} fps={30} width={1080} height={1920} />
    <Composition id="ShortBorsa" component={ShortBorsa} durationInFrames={BORSA_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
