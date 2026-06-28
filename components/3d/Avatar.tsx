'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function AvatarScene() {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!headRef.current) return;

    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 8;

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);

    const breath = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, breath, 0.1);
  });

  return (
    <group ref={headRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#BAE0DA" />
      <pointLight position={[-5, -5, 2]} intensity={0.8} color="#F2D6CE" />

      <Box args={[2, 2.5, 2]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </Box>

      <Cylinder args={[0.5, 0.8, 1, 32]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
      </Cylinder>

      <group position={[0, 0.3, 1.01]}>
        <Sphere ref={leftEyeRef} args={[0.25, 32, 32]} position={[-0.5, 0, 0]}>
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
        </Sphere>
        
        <Sphere ref={rightEyeRef} args={[0.25, 32, 32]} position={[0.5, 0, 0]}>
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
        </Sphere>

        <Sphere args={[0.1, 16, 16]} position={[-0.55, 0.05, 0.18]}>
          <meshBasicMaterial color="#BAE0DA" />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[0.45, 0.05, 0.18]}>
          <meshBasicMaterial color="#BAE0DA" />
        </Sphere>
      </group>
    </group>
  );
}

export default function Avatar() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--border-color)] to-transparent">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <AvatarScene />
      </Canvas>
    </div>
  );
}
