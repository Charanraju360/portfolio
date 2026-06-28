'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, OrbitControls, Environment } from '@react-three/drei';
import { X } from 'lucide-react';
import * as THREE from 'three';

function ShowcaseScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <TorusKnot ref={meshRef as any} args={[2, 0.5, 200, 32]}>
        <meshStandardMaterial 
          color="#BAE0DA" 
          roughness={0.1} 
          metalness={0.8}
          envMapIntensity={1}
        />
      </TorusKnot>
      <Environment preset="city" />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} />
    </>
  );
}

export default function FullscreenShowcase({ 
  isOpen, 
  onClose, 
  origin 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  origin: { x: number, y: number }
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ 
        clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`,
        backdropFilter: 'blur(0px)',
        opacity: 0
      }}
      animate={{ 
        clipPath: `circle(150% at ${origin.x}px ${origin.y}px)`,
        backdropFilter: 'blur(20px)',
        opacity: 1
      }}
      exit={{ 
        clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`,
        backdropFilter: 'blur(0px)',
        opacity: 0
      }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/80 flex items-center justify-center"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
      >
        <X size={24} />
      </button>

      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-3xl font-bold">Interactive WebGL Showcase</h2>
        <p className="text-sm font-mono mt-2">Drag to rotate • Scroll to zoom</p>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ShowcaseScene />
        </Canvas>
      </div>
    </motion.div>
  );
}
