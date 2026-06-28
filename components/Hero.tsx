'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const TechSphere = dynamic(() => import('./3d/TechSphere'), { ssr: false });

export default function Hero() {
  const handleHapticFeedback = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] flex flex-col lg:flex-row items-center px-6 md:px-16 pt-20">
      
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center relative z-10 text-center lg:text-left mt-12 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-[var(--accent-primary)] font-mono tracking-widest text-sm mb-4 uppercase">
            Creative Developer
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Building living <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
              UI playgrounds
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-lg mx-auto lg:mx-0">
            Blending smooth physics-driven scroll, immersive 3D scenes, and subtle micro-interactions to craft unforgettable digital experiences.
          </p>
          
          <motion.a 
            href="#projects"
            onClick={handleHapticFeedback}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium text-lg relative overflow-hidden group shadow-lg"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute -inset-1 rounded-full border-2 border-[var(--text-primary)] opacity-20 animate-ping group-hover:border-[var(--accent-primary)]" />
          </motion.a>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative mt-8 lg:mt-0">
        <TechSphere />
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)] hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
