import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import {
  Code2,
  Server,
  Cloud,
  Database,
  Layout,
  Settings,
  Terminal,
  Cpu,
  Globe,
  GitBranch,
  Braces,
  FileCode,
  Monitor,
  Shield,
  Layers,
  Zap,
  Workflow,
  BoxIcon } from
'lucide-react';
// Orbital ring configuration
const orbitalRings = [
{
  radius: 120,
  duration: 35,
  direction: 1,
  icons: [
  {
    Icon: Code2,
    color: 'text-blue-400'
  },
  {
    Icon: Database,
    color: 'text-yellow-400'
  },
  {
    Icon: Cloud,
    color: 'text-cyan-400'
  },
  {
    Icon: Terminal,
    color: 'text-green-400'
  },
  {
    Icon: Layout,
    color: 'text-pink-400'
  }]

},
{
  radius: 220,
  duration: 50,
  direction: -1,
  icons: [
  {
    Icon: Server,
    color: 'text-green-400'
  },
  {
    Icon: GitBranch,
    color: 'text-orange-400'
  },
  {
    Icon: Shield,
    color: 'text-red-400'
  },
  {
    Icon: Cpu,
    color: 'text-purple-400'
  },
  {
    Icon: Braces,
    color: 'text-blue-300'
  },
  {
    Icon: Globe,
    color: 'text-cyan-300'
  },
  {
    Icon: Monitor,
    color: 'text-pink-300'
  }]

},
{
  radius: 330,
  duration: 70,
  direction: 1,
  icons: [
  {
    Icon: FileCode,
    color: 'text-blue-400'
  },
  {
    Icon: Layers,
    color: 'text-purple-300'
  },
  {
    Icon: Zap,
    color: 'text-yellow-300'
  },
  {
    Icon: Settings,
    color: 'text-slate-400'
  },
  {
    Icon: BoxIcon,
    color: 'text-green-300'
  },
  {
    Icon: Workflow,
    color: 'text-cyan-400'
  },
  {
    Icon: Database,
    color: 'text-yellow-400'
  },
  {
    Icon: Cloud,
    color: 'text-blue-300'
  },
  {
    Icon: Terminal,
    color: 'text-emerald-400'
  }]

}];

export function Skills() {
  const [ref, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const skillCategories = [
  {
    title: 'Frontend',
    icon: Layout,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20',
    skills: [
    'Angular (MFE)',
    'React (Beginner)',
    'TypeScript',
    'JavaScript',
    'HTML/CSS',
    'Tailwind']

  },
  {
    title: 'Backend',
    icon: Server,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    skills: ['.NET Core (C#)', 'FastAPI', 'Python', 'C++', 'Microservices']
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    skills: [
    'Azure',
    'Docker',
    'ArgoCD',
    'GitLab CI/CD',
    'Service Bus',
    'Storage Queues']

  },
  {
    title: 'Databases',
    icon: Database,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    skills: ['MySQL', 'MS SQL', 'DynamoDB', 'MongoDB', 'Redis']
  },
  {
    title: 'Architecture',
    icon: Settings,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    skills: [
    'System Design',
    'Event-Driven Systems',
    'MFE Architecture',
    'Performance Optimization']

  },
  {
    title: 'Other',
    icon: Code2,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
    skills: [
    'Agile Delivery',
    'Stakeholder Management',
    'Gen AI',
    'Cyber Security']

  }];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  return (
    <section id="skills" className="section-container relative overflow-hidden">
      {/* Rotating Orbital Background - Left Side */}
      <div
        className="absolute top-1/2 -left-40 -translate-y-1/2 pointer-events-none hidden lg:block"
        aria-hidden="true">
        
        {orbitalRings.map((ring, ringIndex) =>
        <motion.div
          key={ringIndex}
          className="absolute rounded-full border border-white/[0.03]"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            top: `calc(50% - ${ring.radius}px)`,
            left: `calc(50% - ${ring.radius}px)`
          }}
          animate={{
            rotate: 360 * ring.direction
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: 'linear'
          }}>
          
            {ring.icons.map((item, iconIndex) => {
            const angle = 360 / ring.icons.length * iconIndex;
            const rad = angle * Math.PI / 180;
            const x = Math.cos(rad) * ring.radius;
            const y = Math.sin(rad) * ring.radius;
            return (
              <motion.div
                key={iconIndex}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - 14px)`,
                  top: `calc(50% + ${y}px - 14px)`
                }}
                // Counter-rotate so icons stay upright
                animate={{
                  rotate: -360 * ring.direction
                }}
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: 'linear'
                }}>
                
                  <item.Icon
                  className={`w-7 h-7 ${item.color} opacity-[0.12]`} />
                
                </motion.div>);

          })}
          </motion.div>
        )}

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
      </div>

      <div className="md:pl-16 relative z-10">
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
              <span className="text-blue-500 font-mono text-2xl mr-2">03.</span>
              Technical Arsenal
            </h2>
            <div className="h-px bg-white/10 flex-1 max-w-xs"></div>
          </div>
          <p className="text-slate-400 max-w-2xl">
            A comprehensive overview of my technical skills and areas of
            expertise, built over years of hands-on experience in production
            environments.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {skillCategories.map((category, idx) =>
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`glass-card p-6 rounded-xl border-t-4 ${category.borderColor.replace('border-', 'border-t-')} hover:-translate-y-1 transition-transform duration-300`}>
            
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) =>
              <span
                key={i}
                className="px-3 py-1.5 rounded-md bg-slate-800/50 text-slate-300 text-sm border border-white/5 hover:border-white/20 hover:text-white transition-colors cursor-default">
                
                    {skill}
                  </span>
              )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}