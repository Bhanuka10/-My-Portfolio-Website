import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated nebula-like clouds
const NebulaClouds = () => {
  const mesh = useRef();
  const material = useRef();
  
  // Animate the nebula clouds
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime() * 0.2;
    }
  });

  // Custom shader for nebula effect
  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#3a1c71") },
        uColor2: { value: new THREE.Color("#d76d77") },
        // uColor3: { value: new THREE.Color("#ffaf7b") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDistort;
        
        uniform float uTime;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Add some subtle movement
          pos.x += sin(pos.z * 0.25 + uTime) * 0.5;
          pos.y += cos(pos.x * 0.25 + uTime) * 0.5;
          
          vDistort = sin(pos.x * 0.3 + uTime) * 0.5 + 0.5;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDistort;
        
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        void main() {
          // Create a nebula-like pattern
          float noise1 = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime) * 0.5 + 0.5;
          float noise2 = sin(vUv.x * 20.0 - uTime) * sin(vUv.y * 20.0 + uTime) * 0.5 + 0.5;
          
          // Mix colors based on noise
          vec3 color = mix(uColor1, uColor2, noise1);
          color = mix(color, uColor3, noise2 * vDistort);
          
          // Add transparency for a cloudy effect
          float alpha = noise1 * 0.7 + 0.1;
          
          gl_FragColor = vec4(color, alpha * 0.7);
        }
      `,
    }),
    []
  );

  return (
    <mesh ref={mesh} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[15, 64, 64]} />
      <shaderMaterial
        ref={material}
        uniforms={shaderData.uniforms}
        vertexShader={shaderData.vertexShader}
        fragmentShader={shaderData.fragmentShader}
        transparent
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Main space scene component
const SpaceAnimation = () => {
  return (
    <div className="space-animation-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <NebulaClouds />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default SpaceAnimation;