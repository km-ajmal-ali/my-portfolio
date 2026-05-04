import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
export function Education() {
  const [ref, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  return (
    <section id="education" className="section-container">
      <div className="md:pl-16">
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {
            opacity: 0,
            y: 20
          }
          }
          transition={{
            duration: 0.5
          }}
          className="mb-12">
          
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-blue-500 font-mono text-2xl mr-2">05.</span>
              Education & Certs
            </h2>
            <div className="h-px bg-white/10 flex-1 max-w-xs"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              x: 0
            } :
            {
              opacity: 0,
              x: -20
            }
            }
            transition={{
              duration: 0.5,
              delay: 0.1
            }}>
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-400" />
              Academic Background
            </h3>

            <div className="glass-card p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-white">
                  B.Tech, Electronics & Communication
                </h4>
                <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                  2018 - 2022
                </span>
              </div>
              <p className="text-slate-400 font-medium">ASIET</p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              x: 0
            } :
            {
              opacity: 0,
              x: 20
            }
            }
            transition={{
              duration: 0.5,
              delay: 0.2
            }}>
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-cyan-400" />
              Certifications
            </h3>

            <div className="space-y-4">
              <div className="glass-card p-6 rounded-xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-white">
                    DevOps and Cloud Engineering
                  </h4>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Ongoing
                  </span>
                </div>
                <p className="text-slate-400">Hero Vired</p>
              </div>

              <div className="glass-card p-6 rounded-xl relative overflow-hidden group hover:bg-white/10 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-white">
                    GenAI Certification Program
                  </h4>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Ongoing
                  </span>
                </div>
                <p className="text-slate-400">Hero Vired</p>
              </div>
            </div>
          </motion.div>

          {/* Areas of Interest */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              y: 0
            } :
            {
              opacity: 0,
              y: 20
            }
            }
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="lg:col-span-2 mt-4">
            
            <div className="glass-card p-6 rounded-xl border border-dashed border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-400" />
                Areas of Interest
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                'Embedded development',
                'Cyber security',
                'System architecture',
                'Gen AI',
                'Mentorship'].
                map((interest, i) =>
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-slate-800/80 text-slate-300 text-sm border border-white/5">
                  
                    {interest}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}