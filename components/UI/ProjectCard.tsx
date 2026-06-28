'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';

const ProjectThumbnail = dynamic(() => import('../3d/ProjectThumbnail'), { ssr: false });

export default function ProjectCard({ 
  project, 
  onOpenShowcase 
}: { 
  project: { id: number, title: string, category: string, type: number, height: string },
  onOpenShowcase: (e: React.MouseEvent) => void
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative w-full rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden cursor-pointer shadow-sm ${project.height}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 25px 50px -12px var(--shadow-color)"
      }}
      onClick={onOpenShowcase}
      layout
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--bg-primary)] to-transparent opacity-50" />
      <div className="absolute inset-0 z-0">
        <ProjectThumbnail type={project.type} isHovered={isHovered} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex items-end justify-between">
        <div>
          <span className="text-xs font-mono tracking-wider text-[var(--accent-primary)] uppercase">{project.category}</span>
          <h3 className="text-2xl font-bold mt-1 text-[var(--text-primary)]">{project.title}</h3>
        </div>
        
        <motion.div 
          className="w-10 h-10 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowUpRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}
