import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const texture = new THREE.TextureLoader().load("/textures/earth.jpg");

  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const EarthBackground = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -1 }}>
      <Canvas>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Earth */}
        <Earth />

        {/* Stars for space vibe */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* Auto Rotation */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default EarthBackground;
