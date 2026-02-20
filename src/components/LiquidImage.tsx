import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Gentle wave effect
      float noise = sin(pos.x * 5.0 + uTime) * cos(pos.y * 5.0 + uTime) * 0.1;
      pos.z += noise * uHover;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion on hover
      float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.02 * uHover;
      uv.x += wave;

      vec4 color = texture2D(uTexture, uv);
      
      // Add slight blue tint on hover
      color.b += uHover * 0.1;
      
      gl_FragColor = color;
    }
  `
};

function ImageMesh({ url }: { url: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const texture = useTexture(url);
  
  // Fix texture aspect ratio
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[3, 4, 32, 32]} />
      <shaderMaterial
        args={[WaveShaderMaterial]}
        uniforms-uTexture-value={texture}
        transparent
      />
    </mesh>
  );
}

export default function LiquidImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ImageMesh url={src} />
      </Canvas>
    </div>
  );
}
