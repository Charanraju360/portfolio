'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Ring, MeshDistortMaterial } from '@react-three/drei';
import { useScrollContext } from '../providers';
import * as THREE from 'three';

function SphereScene({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  const { lenis } = useScrollContext();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    const targetRotation = progress * Math.PI * 4;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.1);

    const targetX = (mousePosition.x * 2 - 1) * 0.2;
    const targetY = -(mousePosition.y * 2 - 1) * 0.2;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.5;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.3;
      ring2Ref.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#BAE0DA" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#F2D6CE" />

      <Icosahedron ref={sphereRef} args={[1.5, 2]}>
        <MeshDistortMaterial
          color="#BAE0DA"
          emissive="#BAE0DA"
          emissiveIntensity={0.2}
          wireframe={true}
          distort={0.2}
          speed={2}
        />
      </Icosahedron>

      <Icosahedron args={[1.2, 3]}>
        <meshStandardMaterial
          color="#F2D6CE"
          emissive="#F2D6CE"
          emissiveIntensity={0.5}
          transparent={true}
          opacity={0.8}
        />
      </Icosahedron>

      <Ring ref={ring1Ref} args={[2.2, 2.25, 64]}>
        <meshBasicMaterial color="#A1B5A8" transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>
      
      <Ring ref={ring2Ref} args={[2.6, 2.62, 64]}>
        <meshBasicMaterial color="#BAE0DA" transparent opacity={0.8} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

export default function TechSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px]"
      onMouseMove={handleMouseMove}
      role="application"
      aria-label="Interactive 3D Tech Sphere"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <SphereScene mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
}
