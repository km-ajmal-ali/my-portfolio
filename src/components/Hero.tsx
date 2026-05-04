import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code2, Terminal, Database, Cloud } from 'lucide-react';
import { useTypingEffect } from '../hooks/useTypingEffect';
const GRID_SIZE = 64; // 4rem
const MAX_RUNNERS = 60;
const MOUSE_INFLUENCE_RADIUS = 250;
const RUNNER_MIN_LENGTH = 15;
const RUNNER_MAX_LENGTH = 45;
const RUNNER_MIN_SPEED = 0.4;
const RUNNER_MAX_SPEED = 1.8;
interface Runner {
  x: number;
  y: number;
  length: number;
  speed: number;
  direction: 'horizontal' | 'vertical';
  sign: 1 | -1;
  opacity: number;
  hue: number; // 200-190 range for blue-cyan
  life: number;
  maxLife: number;
}
function createRunner(
canvasW: number,
canvasH: number,
nearX?: number,
nearY?: number)
: Runner {
  const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
  const sign = Math.random() > 0.5 ? 1 : -1 as 1 | -1;
  let x: number, y: number;
  if (nearX !== undefined && nearY !== undefined) {
    // Snap to nearest grid line near mouse
    if (direction === 'horizontal') {
      y = Math.round(nearY / GRID_SIZE) * GRID_SIZE;
      x = nearX + (Math.random() - 0.5) * GRID_SIZE * 2;
    } else {
      x = Math.round(nearX / GRID_SIZE) * GRID_SIZE;
      y = nearY + (Math.random() - 0.5) * GRID_SIZE * 2;
    }
  } else {
    // Random position on a grid line
    if (direction === 'horizontal') {
      const gridLineIndex = Math.floor(
        Math.random() * (canvasH / GRID_SIZE + 1)
      );
      y = gridLineIndex * GRID_SIZE;
      x = Math.random() * canvasW;
    } else {
      const gridLineIndex = Math.floor(
        Math.random() * (canvasW / GRID_SIZE + 1)
      );
      x = gridLineIndex * GRID_SIZE;
      y = Math.random() * canvasH;
    }
  }
  const maxLife = 120 + Math.random() * 200;
  return {
    x,
    y,
    length:
    RUNNER_MIN_LENGTH +
    Math.random() * (RUNNER_MAX_LENGTH - RUNNER_MIN_LENGTH),
    speed:
    RUNNER_MIN_SPEED + Math.random() * (RUNNER_MAX_SPEED - RUNNER_MIN_SPEED),
    direction,
    sign,
    opacity: 0.3 + Math.random() * 0.5,
    hue: 195 + Math.random() * 15,
    life: 0,
    maxLife
  };
}
export function Hero() {
  const titles = [
  'Full-Stack Engineer',
  'Product-Driven Developer',
  'Cloud & Microservices Expert'];

  const typedText = useTypingEffect(titles, 80, 40, 2000);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef<{
    x: number;
    y: number;
  }>({
    x: -1000,
    y: -1000
  });
  const runnersRef = useRef<Runner[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = {
      x: -1000,
      y: -1000
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // Initialize runners
    for (let i = 0; i < 30; i++) {
      runnersRef.current.push(createRunner(canvas.width, canvas.height));
    }
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const now = Date.now();
      // Spawn runners near mouse
      if (mouse.x > 0 && mouse.y > 0 && now - lastSpawnRef.current > 80) {
        if (runnersRef.current.length < MAX_RUNNERS) {
          runnersRef.current.push(
            createRunner(canvas.width, canvas.height, mouse.x, mouse.y)
          );
          lastSpawnRef.current = now;
        }
      }
      // Update and draw runners
      const aliveRunners: Runner[] = [];
      for (const runner of runnersRef.current) {
        runner.life++;
        // Calculate distance to mouse
        const dx = runner.x - mouse.x;
        const dy = runner.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = Math.max(0, 1 - dist / MOUSE_INFLUENCE_RADIUS);
        // Boost speed and opacity near mouse
        const boostedSpeed = runner.speed + mouseInfluence * 2.5;
        const boostedOpacity = Math.min(
          1,
          runner.opacity + mouseInfluence * 0.6
        );
        // Move runner along grid line
        if (runner.direction === 'horizontal') {
          runner.x += boostedSpeed * runner.sign;
        } else {
          runner.y += boostedSpeed * runner.sign;
        }
        // Fade in/out based on life
        const lifeFraction = runner.life / runner.maxLife;
        let lifeFade = 1;
        if (lifeFraction < 0.1) {
          lifeFade = lifeFraction / 0.1;
        } else if (lifeFraction > 0.75) {
          lifeFade = 1 - (lifeFraction - 0.75) / 0.25;
        }
        const finalOpacity = boostedOpacity * lifeFade;
        // Check if runner is still alive and on screen
        const isOnScreen =
        runner.x > -runner.length * 2 &&
        runner.x < canvas.width + runner.length * 2 &&
        runner.y > -runner.length * 2 &&
        runner.y < canvas.height + runner.length * 2;
        const isAlive = runner.life < runner.maxLife;
        if (isOnScreen && isAlive) {
          aliveRunners.push(runner);
          // Draw the runner as a glowing line segment
          const tailX =
          runner.direction === 'horizontal' ?
          runner.x - runner.length * runner.sign :
          runner.x;
          const tailY =
          runner.direction === 'vertical' ?
          runner.y - runner.length * runner.sign :
          runner.y;
          // Glow effect
          const gradient = ctx.createLinearGradient(
            tailX,
            tailY,
            runner.x,
            runner.y
          );
          gradient.addColorStop(0, `hsla(${runner.hue}, 90%, 65%, 0)`);
          gradient.addColorStop(
            0.3,
            `hsla(${runner.hue}, 90%, 65%, ${finalOpacity * 0.3})`
          );
          gradient.addColorStop(
            1,
            `hsla(${runner.hue}, 90%, 70%, ${finalOpacity})`
          );
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(runner.x, runner.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5 + mouseInfluence * 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();
          // Bright head dot
          ctx.beginPath();
          ctx.arc(runner.x, runner.y, 1.5 + mouseInfluence * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${runner.hue}, 95%, 80%, ${finalOpacity})`;
          ctx.fill();
          // Soft glow around head when mouse is near
          if (mouseInfluence > 0.2) {
            ctx.beginPath();
            ctx.arc(runner.x, runner.y, 4 + mouseInfluence * 6, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${runner.hue}, 90%, 70%, ${finalOpacity * mouseInfluence * 0.3})`;
            ctx.fill();
          }
        }
      }
      runnersRef.current = aliveRunners;
      // Replenish runners if below minimum
      while (runnersRef.current.length < 20) {
        runnersRef.current.push(createRunner(canvas.width, canvas.height));
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
          'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}>
      </div>

      {/* Running Lines Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none" />
      

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 w-full z-10 relative">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}
          className="space-y-6">
          
          <div className="flex items-center gap-3 font-mono text-blue-400 mb-4">
            <Terminal className="w-5 h-5" />
            <span>Hello, World. I am</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
            Ajmal Ali K M
          </h1>

          <div className="h-12 md:h-16 flex items-center">
            <h2 className="text-2xl md:text-4xl font-medium text-slate-400 flex items-center gap-2">
              <span className="text-blue-500 font-mono">{'<'}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {typedText}
              </span>
              <span className="w-0.5 h-8 md:h-10 bg-cyan-400 animate-pulse ml-1"></span>
              <span className="text-blue-500 font-mono">{'>'}</span>
            </h2>
          </div>

          <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed mt-8">
            I build scalable, meaningful software with an entrepreneurial
            mindset. Combining technical expertise in cloud-native systems with
            a strong sense of product design.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 pt-4">
            <button
              onClick={scrollToAbout}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2">
              
              Explore My Work
              <ChevronDown className="w-4 h-4" />
            </button>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg glass-card hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2">
              
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Floating Tech Icons */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-20">
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}>
            
            <Code2 className="w-12 h-12 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}>
            
            <Database className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -12, 0]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}>
            
            <Cloud className="w-12 h-12 text-blue-300" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1,
          duration: 1
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 cursor-pointer hover:text-blue-400 transition-colors"
        onClick={scrollToAbout}>
        
        <span className="font-mono text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
          
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>);

}