import React, {useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {interpolate, useCurrentFrame} from 'remotion';
import * as THREE from 'three';
import {Bloom, EffectComposer, Vignette} from '@react-three/postprocessing';

const goldMat = () => new THREE.MeshStandardMaterial({color: '#e8be55', metalness: 0.62, roughness: 0.26, emissive: new THREE.Color('#6b4a0a'), emissiveIntensity: 0.65});

// ingot: yamuk kesitli külçe (üst yüzey dar)
const ingotGeo = () => {
  const s = new THREE.Shape();
  const w = 1.0, h = 0.5, t = 0.78;
  s.moveTo(-w, -h / 2); s.lineTo(w, -h / 2); s.lineTo(w * t, h / 2); s.lineTo(-w * t, h / 2); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {depth: 0.9, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3});
  g.translate(0, 0, -0.45);
  return g;
};

const Ingot: React.FC<{pos: [number, number, number]; drop: number; geo: THREE.BufferGeometry; mat: THREE.Material}> = ({pos, drop, geo, mat}) => (
  <mesh position={[pos[0], pos[1] - drop, pos[2]]} geometry={geo} material={mat} />
);

const Coin: React.FC<{pos: [number, number, number]; rot: number; mat: THREE.Material}> = ({pos, rot, mat}) => (
  <mesh position={pos} rotation={[Math.PI / 2.4, rot, 0]} material={mat}>
    <cylinderGeometry args={[0.55, 0.55, 0.1, 64]} />
  </mesh>
);

export const GoldScene: React.FC<{width: number; height: number}> = ({width, height}) => {
  const f = useCurrentFrame();
  const geo = useMemo(ingotGeo, []);
  const mat = useMemo(goldMat, []);
  const rise = interpolate(f, [0, 40], [6, 0], {extrapolateRight: 'clamp'});
  const bob = Math.sin(f * 0.05) * 0.05;
  const bars: [number, number, number][] = [[-1.05, 0, 0.5], [1.05, 0, 0.5], [0, 0.52, 0.5], [-1.05, 0, -0.55], [1.05, 0, -0.55], [0, 0.52, -0.55], [0, 1.04, 0]];
  return (
    <ThreeCanvas width={width} height={height} camera={{position: [3.2, 2.5, 4.6], fov: 36}} style={{background: 'transparent'}}>
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#fff2cc', '#233a63', 1.1]} />
      <directionalLight position={[5, 8, 5]} intensity={3.2} />
      <pointLight position={[-4, 2, 3]} intensity={40} color="#7fb2ff" />
      <pointLight position={[3, 1, -3]} intensity={30} color="#ffd36b" />
      <group rotation={[0, f * 0.012 - 0.5, 0]} position={[0, -1.2 + bob, 0]}>
        {bars.map((b, i) => <Ingot key={i} pos={b} drop={Math.max(0, rise - i * 0.45)} geo={geo} mat={mat} />)}
        <Coin pos={[2.1, 0.12 + Math.max(0, rise - 3.2), 1.3]} rot={f * 0.03} mat={mat} />
        <Coin pos={[-2.2, 0.12 + Math.max(0, rise - 3.6), 1.1]} rot={-f * 0.025} mat={mat} />
      </group>
      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.5} />
      </EffectComposer>
    </ThreeCanvas>
  );
};
