import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import LiquidImage from './LiquidImage';

const team = [
  {
    name: "Astaroth Schröder",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Koda Hakim",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Chloe D'onxony",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  }
];

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-cyan-300 transition-colors py-2 px-4 border border-transparent group-hover:border-cyan-500/30 rounded-full"
    >
      {children}
    </motion.button>
  );
}

export default function Team() {
  return (
    <section className="py-32 px-4 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end mb-16 px-4 border-b border-white/10 pb-4"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Administración</span>
        <span className="text-xs uppercase tracking-widest text-white/50">2025</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-40 h-40 mb-8 rounded-full p-1 border border-white/20 group-hover:border-cyan-400/50 transition-colors duration-500 overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <LiquidImage src={member.image} alt={member.name} />
              </div>
            </div>
            
            <h4 className="text-xl font-bold mb-2 group-hover:text-cyan-200 transition-colors">{member.name}</h4>
            <p className="text-xs text-cyan-200/70 uppercase tracking-wider mb-6">{member.role}</p>
            
            <MagneticButton>Enter</MagneticButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
