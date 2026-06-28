'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import { Check } from 'lucide-react';
import * as THREE from 'three';

function TorusScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#BAE0DA" />
      <directionalLight position={[-5, -10, 5]} intensity={0.5} color="#F2D6CE" />
      <Torus ref={meshRef as any} args={[1.5, 0.6, 64, 100]}>
        <meshPhysicalMaterial 
          color="#F2E7DD"
          roughness={0.2}
          metalness={0.1}
          transmission={0.5}
          thickness={1}
        />
      </Torus>
    </>
  );
}

function StaticIllustration() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
      <TorusScene />
    </Canvas>
  );
}

function ParticleTrail({ isFocused }: { isFocused: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    if (!isFocused) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      
      const newId = idCounter.current++;
      setParticles(p => [...p, { id: newId, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      
      setTimeout(() => {
        setParticles(p => p.filter(part => part.id !== newId));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFocused]);

  if (!isFocused) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-0">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 0, x: p.x + (Math.random() * 40 - 20), y: p.y + (Math.random() * 40 - 20) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
            style={{ left: -4, top: -4 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FloatingInput({ label, type = "text", isTextarea = false }: { label: string, type?: string, isTextarea?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const active = focused || value.length > 0;

  return (
    <div className="relative w-full mb-8 group">
      <ParticleTrail isFocused={focused} />
      
      <motion.label
        initial={false}
        animate={{
          y: active ? -24 : 16,
          scale: active ? 0.75 : 1,
          color: active ? 'var(--accent-primary)' : 'var(--text-secondary)'
        }}
        className="absolute left-4 origin-left pointer-events-none font-mono tracking-wide z-10"
      >
        {label}
      </motion.label>

      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full min-h-[150px] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] relative z-10 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full h-14 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] relative z-10"
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full py-32 px-6 md:px-16 bg-[var(--bg-card)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[600px] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-xl">
        
        <div className="w-full lg:w-1/2 h-[400px] lg:h-auto bg-[var(--bg-primary)] relative">
          <StaticIllustration />
          <div className="absolute bottom-12 left-12 right-12 z-10">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Let's build something beautiful.</h2>
            <p className="text-[var(--text-secondary)]">Available for freelance opportunities and collaborative projects.</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-[var(--bg-card)] relative">
          <form onSubmit={handleSubmit} className="w-full relative z-10">
            <FloatingInput label="Name" />
            <FloatingInput label="Email" type="email" />
            <FloatingInput label="Message" isTextarea />

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full h-14 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold tracking-widest uppercase overflow-hidden relative flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    Send Message
                  </motion.span>
                )}
                {status === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-6 h-6 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin"
                  />
                )}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-[var(--accent-primary)] flex items-center gap-2"
                  >
                    <Check size={24} />
                    <span>Sent</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
