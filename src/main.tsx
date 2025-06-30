import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import './index.css';
import * as THREE from 'three/webgpu';
import Experience from './Experience.tsx';

function createWebGPURenderer(props: any): THREE.WebGPURenderer {
  const renderer = new THREE.WebGPURenderer({
    ...props,
    antialias: true,
  });

  renderer.init().then(() => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}

createRoot(document.getElementById('root')!).render(
  <Canvas
    gl={createWebGPURenderer}
    camera={{
      fov: 100,
      near: 0.1,
      far: 200,
      position: [0.12, 0.4, 0.08],
    }}
  >
    <Experience />
  </Canvas>
);
