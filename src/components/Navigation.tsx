import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, Terminal } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
interface NavigationProps {
  onOpenCommandPalette: () => void;
  sectionIds: string[];
}
export function Navigation({
  onOpenCommandPalette,
  sectionIds
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(sectionIds, 200);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  const navLinks = [
  {
    id: 'about',
    label: 'About'
  },
  {
    id: 'experience',
    label: 'Experience'
  },
  {
    id: 'skills',
    label: 'Skills'
  },
  {
    id: 'achievements',
    label: 'Achievements'
  },
  {
    id: 'education',
    label: 'Education'
  },
  {
    id: 'contact',
    label: 'Contact'
  }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection('hero')}>
          
          <Terminal className="w-6 h-6 text-blue-500 group-hover:text-cyan-400 transition-colors" />
          <span className="font-mono font-bold text-lg text-white tracking-tight">
            ajmal<span className="text-blue-500">.</span>dev
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) =>
            <li key={link.id}>
                <button
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${activeSection === link.id ? 'text-blue-500' : 'text-slate-400'}`}>
                
                  <span className="font-mono text-xs text-blue-500/50 mr-1">
                    /
                  </span>
                  {link.label}
                </button>
              </li>
            )}
          </ul>

          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm text-slate-300 group"
            aria-label="Open command palette">
            
            <Command className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span className="font-mono text-xs opacity-70">⌘K</span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-md bg-white/5 border border-white/10 text-slate-300"
            aria-label="Open command palette">
            
            <Command className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu">
            
            {isMobileMenuOpen ?
            <X className="w-6 h-6" /> :

            <Menu className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden">
          
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
            <li key={link.id}>
                  <button
                onClick={() => scrollToSection(link.id)}
                className={`text-base font-medium w-full text-left py-2 ${activeSection === link.id ? 'text-blue-500' : 'text-slate-400'}`}>
                
                    <span className="font-mono text-xs text-blue-500/50 mr-2">
                      /
                    </span>
                    {link.label}
                  </button>
                </li>
            )}
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}