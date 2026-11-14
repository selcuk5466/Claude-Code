import React, {useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';

const makeTexture = (txt: string) => {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(256, 200, 40, 256, 256, 260);
  grad.addColorStop(0, '#ffe9a6'); grad.addColorStop(0.6, '#e2b84f'); grad.addColorStop(1, '#a87a1c');
  g.fillStyle = grad; g.fillRect(0, 0, 512, 512);
  g.strokeStyle = 'rgba(120,80,10,.85)'; g.lineWidth = 14;
  g.beginPath(); g.arc(256, 256, 226, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 5; g.beginPath(); g.arc(256, 256, 200, 0, Math.PI * 2); g.stroke();
  g.fillStyle = '#7a5410'; g.font = '900 250px Inter, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(txt, 256, 270);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
};

const Coin: React.FC<{y: number; lost: number; spin: number; tex: THREE.Texture}> = ({y, lost, spin, tex}) => {
  const side = useMemo(() => new THREE.MeshStandardMaterial({color: '#e0b04a', metalness: 0.35, roughness: 0.38, emissive: new THREE.Color('#4a3306'), emissiveIntensity: 0.6}), []);
  const top = useMemo(() => new THREE.MeshStandardMaterial({map: tex, metalness: 0.3, roughness: 0.4, emissive: new THREE.Color('#5a3d08'), emissiveIntensity: 0.55, emissiveMap: tex}), [tex]);
  const op = 1 - lost;
  side.transparent = true; side.opacity = op; top.transparent = true; top.opacity = op;
  if (lost > 0) { side.emissive = new THREE.Color('#f05b66'); side.emissiveIntensity = 0.6 + lost * 0.9; top.emissive = new THREE.Color('#f05b66'); top.emissiveIntensity = 0.55 + lost * 0.6; }
  return (
    <mesh position={[lost * 1.8, y + lost * 2.2, lost * 0.8]} rotation={[0, spin + lost * 4, lost * 1.2]} material={[side, top, top]}>
      <cylinderGeometry args={[1, 1, 0.22, 64]} />
    </mesh>
  );
};

export const CoinStack: React.FC<{width: number; height: number; lostFrom: number; lostDur: number}> = ({width, height, lostFrom, lostDur}) => {
  const f = useCurrentFrame();
  const tex = useMemo(() => makeTexture('₺'), []);
  const N = 10;
  const lostP = interpolate(f, [lostFrom, lostFrom + lostDur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const drop = interpolate(f, [0, 40], [6, 0], {extrapolateRight: 'clamp'});
  return (
    <ThreeCanvas width={width} height={height} camera={{position: [3.6, 3.0, 5.0], fov: 36}} style={{background: 'transparent'}}>
      <ambientLight intensity={1.4} />
      <hemisphereLight args={['#fff2cc', '#2a3f66', 1.2]} />
      <directionalLight position={[5, 8, 5]} intensity={2.4} />
      <pointLight position={[-4, 2, 3]} intensity={30} color="#7fb2ff" />
      <group rotation={[0, f * 0.012, 0]} position={[0, -1.6, 0]}>
        {Array.from({length: N}).map((_, i) => {
          const fall = Math.max(0, drop - i * 0.35);
          const li = i >= N - 3 ? Math.min(1, Math.max(0, lostP * 3 - (N - 1 - i) * 0.9)) : 0; // üstteki 3 jeton eriyor
          return <Coin key={i} y={i * 0.24 + fall} lost={li} spin={i * 0.5} tex={tex} />;
        })}
      </group>
    </ThreeCanvas>
  );
};
