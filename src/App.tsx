import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const sectionIds = [
  'hero',
  'about',
  'experience',
  'skills',
  'achievements',
  'education',
  'contact'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navigation
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        sectionIds={sectionIds} />
      

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)} />
      
    </div>);

}