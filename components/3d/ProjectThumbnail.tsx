'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, TorusKnot, Octahedron, Cone } from '@react-three/drei';
import * as THREE from 'three';

function ThumbnailModel({ type, isHovered }: { type: number, isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(0);

  useEffect(() => {
    targetRotation.current = isHovered ? Math.PI * 2 : 0;
  }, [isHovered]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base constant rotation
      meshRef.current.rotation.x += delta * 0.2;
      
      // Interpolate the y rotation towards the target
      // We also add a small continuous rotation based on state.clock
      const currentY = meshRef.current.rotation.y;
      // Extract the continuous part (we can just lerp and then add)
      // Actually, just spring manually
      meshRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetRotation.current + state.clock.elapsedTime * 0.3, 0.1);
    }
  });

  const material = <meshStandardMaterial color="#BAE0DA" roughness={0.2} metalness={0.5} />;

  return (
    <group>
      {type === 0 && <Box ref={meshRef as any} args={[1.5, 1.5, 1.5]}>{material}</Box>}
      {type === 1 && <TorusKnot ref={meshRef as any} args={[0.8, 0.3, 100, 16]}>{material}</TorusKnot>}
      {type === 2 && <Octahedron ref={meshRef as any} args={[1.2, 0]}>{material}</Octahedron>}
      {type === 3 && <Cone ref={meshRef as any} args={[1, 2, 32]}>{material}</Cone>}
    </group>
  );
}

export default function ProjectThumbnail({ type, isHovered }: { type: number, isHovered: boolean }) {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <ThumbnailModel type={type} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
