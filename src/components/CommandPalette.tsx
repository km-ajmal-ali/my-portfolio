import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Briefcase,
  Code,
  Trophy,
  GraduationCap,
  Mail,
  Linkedin,
  Command,
  CornerDownLeft } from
'lucide-react';
import { createPortal } from 'react-dom';
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = [
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    type: 'section'
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    type: 'section'
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: Code,
    type: 'section'
  },
  {
    id: 'achievements',
    title: 'Achievements',
    icon: Trophy,
    type: 'section'
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    type: 'section'
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    type: 'section'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Profile',
    icon: Linkedin,
    type: 'link',
    url: 'https://linkedin.com'
  },
  {
    id: 'email',
    title: 'Send Email',
    icon: Mail,
    type: 'link',
    url: 'mailto:km.ajmal.ali@gmail.com'
  }];

  const filteredItems = items.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);
  const handleSelect = (item: (typeof items)[0]) => {
    if (item.type === 'section') {
      const element = document.getElementById(item.id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementRect - bodyRect - offset,
          behavior: 'smooth'
        });
      }
    } else if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank');
    }
    onClose();
  };
  if (!isOpen) return null;
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose} />
        

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: -20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: -20
          }}
          transition={{
            duration: 0.2
          }}
          className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
          
          <div className="flex items-center px-4 py-4 border-b border-white/10">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-500 font-mono"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            
            <div className="flex items-center gap-1 text-xs text-slate-500 font-mono bg-white/5 px-2 py-1 rounded">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>

          <div className="overflow-y-auto p-2 flex-1">
            {filteredItems.length === 0 ?
            <div className="py-12 text-center text-slate-500 font-mono">
                No results found for "{searchQuery}"
              </div> :

            <div className="space-y-1">
                {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/5'}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}>
                    
                      <div className="flex items-center gap-3">
                        <item.icon
                        className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {isSelected &&
                    <span className="text-xs opacity-70 flex items-center gap-1">
                          Jump to <CornerDownLeft className="w-3 h-3" />
                        </span>
                    }
                    </button>);

              })}
              </div>
            }
          </div>

          <div className="px-4 py-3 border-t border-white/10 bg-slate-950/50 flex items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">
                  ↓
                </kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">
                  ↵
                </kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">
                esc
              </kbd>
              to close
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}