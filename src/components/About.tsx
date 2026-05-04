import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Globe, Lightbulb } from 'lucide-react';
import { useInView } from '../hooks/useInView';
export function About() {
  const [ref, isInView] = useInView({
    threshold: 0.2
  });
  const stats = [
  {
    label: 'Years Experience',
    value: '3+',
    icon: Globe
  },
  {
    label: 'Projects Delivered',
    value: '10+',
    icon: Code
  },
  {
    label: 'Microservices',
    value: '15+',
    icon: Cpu
  },
  {
    label: 'Hackathons Won',
    value: '2',
    icon: Lightbulb
  }];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <section id="about" className="section-container">

      <div className="md:pl-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}>
          
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span className="text-blue-500 font-mono text-2xl mr-2">
                  01.
                </span>
                About Me
              </h2>
              <div className="h-px bg-white/10 flex-1 max-w-xs"></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-slate-400 text-lg leading-relaxed">
              
              <p>
                I'm a full-stack developer passionate about building scalable
                and meaningful software with an{' '}
                <span className="text-blue-400 font-medium">
                  entrepreneurial mindset
                </span>
                .
              </p>
              <p>
                Beyond just writing code, I value engineering as a craft where
                curiosity, creativity, and purpose shape the work I do. I
                combine technical expertise in{' '}
                <span className="text-cyan-400 font-medium">
                  cloud-native systems
                </span>{' '}
                with a strong sense of product design and business impact.
              </p>
              <p>
                Currently, I'm a Product Engineer at Carestack, where I own
                end-to-end delivery of features for a HIPAA-compliant US Dental
                PMS, working across{' '}
                <span className="text-blue-400 font-medium">
                  microservices and Angular MFEs
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4">
              
              {stats.map((stat, index) =>
              <div
                key={index}
                className="glass-card p-6 rounded-xl hover:bg-white/10 transition-colors group">
                
                  <stat.icon className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-white mb-1 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>);

}