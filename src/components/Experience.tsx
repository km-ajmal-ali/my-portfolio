import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
export function Experience() {
  const [ref, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [expandedId, setExpandedId] = useState<number | null>(0);
  const experiences = [
  {
    id: 0,
    role: 'Product Engineer',
    company: 'Carestack',
    period: 'AUG 2022 - PRESENT',
    description:
    'End-to-end delivery of features in RCM for a HIPAA-compliant US Dental PMS.',
    highlights: [
    'Led global feature development for Task Manager (US/AUS/UK/IE), owning architecture and delivery of a microservice + MFE, leading a 2-member team.',
    'Built Insurance Manager (templating) to help clients configure carrier/insurance setup using templates; delivered in a 4-member team over 6 months.',
    'Contributed to an Ortho PMS track, working with a 12-member team to deliver orthodontics-specific workflows.',
    'Played a major role in product modernization, refactoring legacy modules, improving UX/UI, and enhancing performance.',
    'Created multiple reusable/shared frontend components to standardize UI patterns and improve developer velocity.',
    'Developed RCM operational dashboards, grids, and downloadable reports.',
    'Worked on analytics pipeline integration using Kafka, Flink, and Doris.',
    'Automated framework/package publishing, saving ~30 minutes per release.',
    'Served as Scrum Master (6 months) for a 6-member team.'],

    tech: ['Angular', 'Microservices', 'C#', '.NET Core', 'Kafka', 'SQL']
  },
  {
    id: 1,
    role: 'Co-Founder & Backend Developer',
    company: 'AIESYS',
    period: 'AUG 2020 - FEB 2022',
    description: 'Co-founded a service-based software development group.',
    highlights: [
    'Built backend services using FastAPI.',
    'Deployed on Docker + AWS EC2.',
    'Used Kubernetes for basic deployment and scaling workflows.'],

    tech: ['FastAPI', 'Python', 'Docker', 'AWS', 'Kubernetes']
  },
  {
    id: 2,
    role: 'Electronic Communication Coordinator',
    company: 'IEEE SB ASIET',
    period: 'JUNE 2019 - JUNE 2021',
    description: 'Managed digital media and event promotions.',
    highlights: [
    'Managed digital media and event promotions for IEEE SB ASIET.',
    'Conducted workshops on Photoshop & Illustrator for KTU students.'],

    tech: ['Digital Media', 'Photoshop', 'Illustrator', 'Leadership']
  },
  {
    id: 3,
    role: 'Software Engineering Intern',
    company: 'Edith Industries',
    period: 'JAN 2020 - JUNE 2020',
    description: 'Worked on backend development for a SaaS web application.',
    highlights: [
    'Assisted in backend API development.',
    'Collaborated with senior engineers on database design.'],

    tech: ['Backend Dev', 'SaaS', 'API']
  }];

  return (
    <section id="experience" className="section-container">

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
              <span className="text-blue-500 font-mono text-2xl mr-2">02.</span>
              Experience
            </h2>
            <div className="h-px bg-white/10 flex-1 max-w-xs"></div>
          </div>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 pl-6 md:pl-8 space-y-12">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-cyan-400 origin-top"
            initial={{
              scaleY: 0
            }}
            animate={
            isInView ?
            {
              scaleY: 1
            } :
            {
              scaleY: 0
            }
            }
            transition={{
              duration: 1.5,
              ease: 'easeInOut'
            }} />
          

          {experiences.map((exp, index) =>
          <motion.div
            key={exp.id}
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
              delay: index * 0.2
            }}
            className="relative">
            
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 z-10" />

              <div
              className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${expandedId === exp.id ? 'ring-1 ring-blue-500/50' : 'hover:bg-white/10'}`}>
              
                <div
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() =>
                setExpandedId(expandedId === exp.id ? null : exp.id)
                }>
                
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {exp.role}
                      <span className="text-blue-400">@ {exp.company}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mt-2 font-mono">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>
                  <motion.div
                  animate={{
                    rotate: expandedId === exp.id ? 90 : 0
                  }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 self-start md:self-center shrink-0">
                  
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </div>

                <motion.div
                initial={false}
                animate={{
                  height: expandedId === exp.id ? 'auto' : 0,
                  opacity: expandedId === exp.id ? 1 : 0
                }}
                className="overflow-hidden">
                
                  <div className="p-6 pt-0 border-t border-white/5">
                    <p className="text-slate-300 mb-4 font-medium">
                      {exp.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {exp.highlights.map((highlight, i) =>
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-400 text-sm md:text-base">
                      
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                    )}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) =>
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
                      
                          {tech}
                        </span>
                    )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}