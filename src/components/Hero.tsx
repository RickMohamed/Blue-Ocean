import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000">
      {/* Background Image */}
      <motion.div 
        style={{ scale: scaleImg, y: yBg }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000510]/40 to-[#000510] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" 
          alt="Deep Ocean Jellyfish" 
          className="w-full h-full object-cover opacity-70"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 text-center flex flex-col items-center px-4"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-sm uppercase mb-6 text-cyan-200"
        >
          Team
        </motion.span>
        
        <div className="relative perspective-1000">
          <motion.h1 
            initial={{ opacity: 0, rotateX: 90, y: 100 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 50, damping: 20 }}
            className="text-[10rem] md:text-[16rem] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/10 mix-blend-overlay select-none"
          >
            Blue
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="absolute bottom-8 right-4 md:right-16 text-6xl md:text-8xl font-light tracking-normal text-white italic font-serif"
          >
            ocean.
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-bold tracking-[0.3em] text-white/80">HAKIM</h3>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">All rights reserved</p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent mb-2" />
        <div className="p-4 rounded-full border border-white/10 backdrop-blur-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
          <ArrowDown className="w-5 h-5 text-cyan-200" />
        </div>
      </motion.div>
    </section>
  );
}
