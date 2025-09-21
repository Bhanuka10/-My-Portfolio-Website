import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingStars() {
  const points = useRef();
  const count = 2000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200; // spread in 3D space
  }

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0005; // slow rotation
      points.current.rotation.x += 0.0003;
    }
  });

  return (
    <Points ref={points} positions={positions}>
      <PointMaterial
        color="#6ec6ff"
        size={0.3}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </Points>
  );
}

const SpaceBackground = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <FloatingStars />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
