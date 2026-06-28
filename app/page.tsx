import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Nebula from '@/components/3d/Nebula';

export default function Home() {
  return (
    <>
      <Nebula />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
