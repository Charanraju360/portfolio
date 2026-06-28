'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference text-white">
      <div className="font-mono text-lg font-bold tracking-tighter">
        <span className="text-[var(--accent-primary)]">PORT</span>FOLIO
      </div>
      
      <nav className="hidden md:flex gap-8 font-sans text-sm tracking-widest uppercase">
        <a href="#hero" className="hover:text-[var(--accent-primary)] transition-colors">Intro</a>
        <a href="#about" className="hover:text-[var(--accent-primary)] transition-colors">About</a>
        <a href="#projects" className="hover:text-[var(--accent-primary)] transition-colors">Work</a>
        <a href="#skills" className="hover:text-[var(--accent-primary)] transition-colors">Skills</a>
        <a href="#contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact</a>
      </nav>

      <button
        onClick={() => setIsDark(!isDark)}
        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </AnimatePresence>
      </button>
    </header>
  );
}
