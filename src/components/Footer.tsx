import React from 'react';
import { Terminal } from 'lucide-react';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-500" />
          <span className="font-mono font-bold text-slate-300">
            ajmal<span className="text-blue-500">.</span>dev
          </span>
        </div>

        <div className="text-slate-500 text-sm font-mono flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <span>&copy; {currentYear} Ajmal Ali K M. All rights reserved.</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="flex items-center gap-1">
            Built with <span className="text-cyan-400">React</span> &{' '}
            <span className="text-blue-400">TypeScript</span>
          </span>
        </div>
      </div>
    </footer>);

}