'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const Avatar = dynamic(() => import('./3d/Avatar'), { ssr: false });

const milestones = [
  { year: '2021', title: 'Creative Coding Beginnings', desc: 'Started experimenting with WebGL and generative art.' },
  { year: '2022', title: 'Frontend Mastery', desc: 'Built complex React applications focusing on performance.' },
  { year: '2023', title: '3D Integration', desc: 'Merged Three.js with standard DOM for immersive experiences.' },
  { year: '2024', title: 'Senior Creative Developer', desc: 'Leading teams to build award-winning interactive platforms.' }
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        <div className="w-full lg:w-1/2 h-[500px] lg:sticky lg:top-32">
          <Avatar />
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-6">Bridging the gap between <span className="text-[var(--accent-primary)]">code</span> and <span className="text-[var(--accent-secondary)]">design</span>.</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-12">
              I believe the web should be a living entity, not just a static document. My journey has been dedicated to mastering the tools that bring interfaces to life, focusing on rendering performance and intuitive micro-interactions.
            </p>
          </motion.div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border-color)]" />
            <motion.div 
              className="absolute left-0 top-0 w-[2px] bg-[var(--accent-primary)] origin-top"
              style={{ height: lineHeight }}
            />

            <div className="flex flex-col gap-12">
              {milestones.map((item, i) => (
                <motion.div 
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)] z-10" />
                  
                  <div className="bg-[var(--bg-card)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                    <span className="text-sm font-mono text-[var(--accent-secondary)] font-bold">{item.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
