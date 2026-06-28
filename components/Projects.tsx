'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import ProjectCard from './UI/ProjectCard';

const FullscreenShowcase = dynamic(() => import('./3d/FullscreenShowcase'), { ssr: false });

const projects = [
  { id: 1, title: 'Quantum Engine', category: 'WebGL Game', type: 0, height: 'h-[400px]' },
  { id: 2, title: 'Data Topology', category: 'Data Viz', type: 1, height: 'h-[300px]' },
  { id: 3, title: 'Neural Flow', category: 'AI Interface', type: 2, height: 'h-[500px]' },
  { id: 4, title: 'Spatial OS', category: 'AR/VR', type: 3, height: 'h-[350px]' },
  { id: 5, title: 'Crypto Grid', category: 'FinTech', type: 0, height: 'h-[450px]' },
  { id: 6, title: 'Eco Tracker', category: 'Dashboard', type: 1, height: 'h-[300px]' },
];

export default function Projects() {
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

  const handleOpenShowcase = (e: React.MouseEvent) => {
    setClickOrigin({ x: e.clientX, y: e.clientY });
    setShowcaseOpen(true);
  };

  return (
    <section id="projects" className="relative w-full py-32 px-6 md:px-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold tracking-tight">Selected <span className="text-[var(--accent-primary)] text-shadow-glow">Works</span></h2>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="break-inside-avoid"
            >
              <ProjectCard 
                project={project} 
                onOpenShowcase={handleOpenShowcase}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showcaseOpen && (
          <FullscreenShowcase 
            isOpen={showcaseOpen} 
            onClose={() => setShowcaseOpen(false)} 
            origin={clickOrigin} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
