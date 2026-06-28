'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Dodecahedron, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

function GlyphModel({ name, isHovered }: { name: string, isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isHovered) {
        meshRef.current.rotation.x += Math.sin(state.clock.elapsedTime * 10) * 0.02;
        meshRef.current.rotation.y += Math.cos(state.clock.elapsedTime * 10) * 0.02;
      } else {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
      }
    }
  });

  const material = <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.7} />;

  switch (name) {
    case 'React':
      return (
        <group ref={meshRef as any}>
          <Sphere args={[0.3, 16, 16]}>{material}</Sphere>
          <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI/2, 0, 0]}>{material}</Torus>
          <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI/2, Math.PI/3, 0]}>{material}</Torus>
          <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI/2, -Math.PI/3, 0]}>{material}</Torus>
        </group>
      );
    case 'Three.js':
      return <Dodecahedron ref={meshRef as any} args={[1, 0]}>{material}</Dodecahedron>;
    case 'Next.js':
      return <Box ref={meshRef as any} args={[1.2, 1.2, 1.2]}>{material}</Box>;
    case 'Tailwind':
      return (
        <group ref={meshRef as any}>
          <Cylinder args={[0.5, 0.5, 0.2, 32]} position={[-0.4, 0.2, 0]} rotation={[Math.PI/2, 0, 0]}>{material}</Cylinder>
          <Cylinder args={[0.5, 0.5, 0.2, 32]} position={[0.4, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>{material}</Cylinder>
        </group>
      );
    case 'Framer Motion':
      return (
        <group ref={meshRef as any}>
          <Box args={[0.8, 0.8, 0.2]} position={[-0.4, 0.4, 0]}>{material}</Box>
          <Box args={[0.8, 0.8, 0.2]} position={[0.4, 0.4, 0]} rotation={[0, 0, Math.PI/4]}>{material}</Box>
          <Box args={[0.8, 0.8, 0.2]} position={[0, -0.4, 0]}>{material}</Box>
        </group>
      );
    default:
      return <Sphere ref={meshRef as any} args={[1, 8, 8]}>{material}</Sphere>;
  }
}

export default function SkillIcon({ name, isHovered }: { name: string, isHovered: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} className="pointer-events-none">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#BAE0DA" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#F2D6CE" />
      <GlyphModel name={name} isHovered={isHovered} />
    </Canvas>
  );
}
