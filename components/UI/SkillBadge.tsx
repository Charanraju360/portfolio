'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SkillIcon = dynamic(() => import('../3d/SkillIcons'), { ssr: false });

export default function SkillBadge({ name, i }: { name: string, i: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: i * 0.1 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-48 h-64 flex flex-col items-center justify-center gap-6 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] relative group cursor-pointer transition-shadow"
      style={{
        filter: isHovered ? 'drop-shadow(0 0 15px var(--accent-primary))' : 'drop-shadow(0 0 0px transparent)'
      }}
    >
      <div className="w-32 h-32 relative z-10">
        <SkillIcon name={name} isHovered={isHovered} />
      </div>
      
      <span className="font-mono text-sm tracking-widest uppercase font-bold text-[var(--text-primary)] relative z-10">
        {name}
      </span>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-0 group-hover:opacity-50 transition-opacity rounded-3xl z-0" />
    </motion.div>
  );
}
