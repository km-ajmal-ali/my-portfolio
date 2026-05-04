import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Trophy, Star, Users, Figma } from 'lucide-react';
export function Achievements() {
  const [ref, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  return (
    <section id="achievements" className="section-container">
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
              <span className="text-blue-500 font-mono text-2xl mr-2">04.</span>
              Achievements & Initiatives
            </h2>
            <div className="h-px bg-white/10 flex-1 max-w-xs"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Achievement - Spans full width on mobile, 1 col on desktop */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={
            isInView ?
            {
              opacity: 1,
              scale: 1
            } :
            {
              opacity: 0,
              scale: 0.95
            }
            }
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="glass-card p-8 rounded-2xl md:col-span-2 relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-500/30 shrink-0">
                <Figma className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">
                    Figma-to-Code Initiative
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                    Carestack
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Created a streamlined internal guide for converting design
                  components into Angular code using company standards. Provided
                  as context to GPT agents, helping teams reduce development
                  time, improve consistency, and free up cognitive load during
                  UI development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Standard Cards */}
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
              delay: 0.2
            }}
            className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            
            <Trophy className="w-8 h-8 text-yellow-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">
              Top 20 Finalist - Babylon
            </h3>
            <p className="text-slate-400 text-sm mb-4 font-mono text-yellow-400/70">
              Blockchain Hackathon (2020)
            </p>
            <p className="text-slate-300">
              Qualified in the top 20 globally for building a blockchain-based
              document encryption and protection system.
            </p>
          </motion.div>

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
            className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            
            <Users className="w-8 h-8 text-cyan-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">
              Student Mentorship
            </h3>
            <p className="text-slate-400 text-sm mb-4 font-mono text-cyan-400/70">
              Carestack Bridge
            </p>
            <p className="text-slate-300">
              Volunteered as a mentor. Conducted mock interviews and guided
              students on interview expectations, career mindset, and industry
              readiness.
            </p>
          </motion.div>

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
              delay: 0.4
            }}
            className="glass-card p-8 rounded-2xl md:col-span-2 hover:-translate-y-2 transition-transform duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            <Star className="w-8 h-8 text-purple-400 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                React Nexus 2025
              </h3>
              <p className="text-slate-400 text-sm mb-3 font-mono text-purple-400/70">
                Community Participation
              </p>
              <p className="text-slate-300">
                Attended the React Nexus conference, gaining exposure to modern
                frontend patterns and strengthening my understanding of React
                and the broader FE ecosystem.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}