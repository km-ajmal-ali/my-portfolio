import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Linkedin, Copy, CheckCircle2, Terminal } from 'lucide-react';
export function Contact() {
  const [ref, isInView] = useInView({
    threshold: 0.2
  });
  const [copied, setCopied] = useState(false);
  const email = 'km.ajmal.ali@gmail.com';
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section
      id="contact"
      className="section-container min-h-[80vh] flex flex-col justify-center">
      
      <div className="md:pl-16 w-full max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {
            opacity: 0,
            y: 30
          }
          }
          transition={{
            duration: 0.6
          }}>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm mb-8">
            <Terminal className="w-4 h-4" />
            <span>06. What's Next?</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient pb-2">
            Get In Touch
          </h2>

          <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Although I'm not currently looking for any new opportunities, my
            inbox is always open. Whether you have a question or just want to
            say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:${email}`}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-3 w-full sm:w-auto justify-center">
              
              <Mail className="w-5 h-5" />
              Say Hello
            </a>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-6 py-4 rounded-xl glass-card hover:bg-white/10 text-slate-300 font-medium transition-all flex items-center justify-center gap-2 group"
                aria-label="Copy email address">
                
                {copied ?
                <CheckCircle2 className="w-5 h-5 text-green-400" /> :

                <Copy className="w-5 h-5 text-slate-400 group-hover:text-white" />
                }
                <span className="font-mono text-sm">
                  {copied ? 'Copied!' : 'Copy Email'}
                </span>
              </button>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-card hover:bg-white/10 text-slate-300 hover:text-blue-400 transition-all flex items-center justify-center"
                aria-label="LinkedIn Profile">
                
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}