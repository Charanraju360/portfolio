'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 bg-[var(--bg-primary)] border-t border-[var(--border-color)] relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-[var(--text-secondary)] font-mono">
        © {currentYear} Developer Portfolio. All rights reserved.
      </div>
      
      <div className="flex gap-4">
        {[
          { icon: Github, href: '#', color: 'hover:text-[#333] dark:hover:text-white' },
          { icon: Twitter, href: '#', color: 'hover:text-[#1DA1F2]' },
          { icon: Linkedin, href: '#', color: 'hover:text-[#0A66C2]' },
          { icon: Mail, href: '#', color: 'hover:text-[var(--accent-primary)]' }
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            whileHover={{ y: -3, scale: 1.1 }}
            className={`w-10 h-10 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow-sm text-[var(--text-secondary)] transition-colors ${social.color}`}
          >
            <social.icon size={18} />
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse" />
        <span>Powered by Vercel</span>
      </div>
    </footer>
  );
}
