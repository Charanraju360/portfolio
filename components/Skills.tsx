'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SkillBadge from './UI/SkillBadge';

const skills = [
  'React', 'Three.js', 'Next.js', 'Tailwind', 'Framer Motion', 'WebGL', 'TypeScript', 'GLSL'
];

const doubledSkills = [...skills, ...skills];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="skills" ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[var(--bg-primary)] border-y border-[var(--border-color)]">
        
        <div className="max-w-7xl mx-auto w-full px-6 md:px-16 mb-12">
          <motion.h2 
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Technical <span className="text-[var(--accent-secondary)]">Arsenal</span>
          </motion.h2>
        </div>

        <motion.div 
          className="flex gap-8 px-6 md:px-16 w-max"
          style={{ x }}
        >
          {doubledSkills.map((skill, i) => (
            <SkillBadge key={`${skill}-${i}`} name={skill} i={i} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
