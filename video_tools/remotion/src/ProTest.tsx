import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Activity, Globe} from 'lucide-react';
import {Bg4, EChart, Hdr, Panel, T, WorldMap, useFonts} from './Pro';
import {C} from './ui';
export const ProTest: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill>
      <Bg4 total={300} />
      <Hdr title="Pro test" sub="Harita, grafik, ikon" icon={<Globe size={52} strokeWidth={2.4} />} />
      <WorldMap w={1000} h={560} x={90} y={230} hi={[{id: '156', color: C.red, t0: 0.2}, {id: '360', color: C.gold, t0: 0.4}, {id: '458', color: C.gold, t0: 0.5}, {id: '764', color: C.gold, t0: 0.6}, {id: '076', color: C.gold, t0: 0.7}, {id: '840', color: C.blue, t0: 0.1}]}
        markers={[{lon: 139.7, lat: 35.7, label: 'Tokyo', value: '−%1,34', color: C.red, t0: 0.5}, {lon: 126.9, lat: 37.5, label: 'Seul', value: '−%2,59', color: C.red, t0: 0.7, dy: 30}]}
        arcs={[{from: [116.4, 39.9], to: [101.7, 3.1], color: C.red, t0: 0.4}, {from: [-77, 38.9], to: [116.4, 39.9], color: C.blue, t0: 0.2}]} />
      <Panel x={1130} y={230} w={680} h={560} t0={0.3} accent={C.green}>
        <T x={32} y={22} s={22} wt={700} c="#8fa3bc" ls={2}>GÜNLÜK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 60}}>
          <EChart w={640} h={470} option={{grid: {left: 130, right: 90, top: 10, bottom: 20}, xAxis: {type: 'value', show: false, min: -3.4, max: 0.4}, yAxis: {type: 'category', inverse: true, data: ['Nasdaq', 'S&P 500', 'Dow'], axisLine: {show: false}, axisTick: {show: false}, axisLabel: {color: '#dbe6f5', fontSize: 26, fontWeight: 700}},
            series: [{type: 'bar', barWidth: 48, data: [-2.5, -1.9, -1.4].map((v) => ({value: v, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{offset: 0, color: '#f05b66'}, {offset: 1, color: '#f05b6699'}]}, borderRadius: [10, 0, 0, 10]}})), label: {show: true, position: 'right', formatter: (q: any) => '−%' + Math.abs(q.value).toString().replace('.', ','), color: '#f2f6fc', fontSize: 28, fontWeight: 800, fontFamily: 'JetBrains Mono Variable'}}]}} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};
