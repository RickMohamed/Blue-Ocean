import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const rules = [
  {
    id: "01",
    text: "250 mensajes semanales",
    subtext: "Communication flow"
  },
  {
    id: "02",
    text: "Cumplir con todas las actividades",
    subtext: "Complete all tasks"
  },
  {
    id: "03",
    text: "No tomar todo personal",
    subtext: "Professional mindset"
  }
];

function RuleCard({ rule, index }: { rule: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative h-72 w-full rounded-2xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm group perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 flex flex-col justify-center items-center text-center"
      >
        <span className="text-6xl font-light mb-6 text-white/90 group-hover:text-cyan-200 transition-colors duration-300 font-serif italic block">
          {rule.id}
        </span>
        <p className="text-lg font-medium tracking-wide text-white/90 mb-2">
          {rule.text}
        </p>
        <p className="text-xs text-white/40 uppercase tracking-wider">
          {rule.subtext}
        </p>
      </div>
    </motion.div>
  );
}

export default function Rules() {
  return (
    <section className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] uppercase tracking-widest text-white/50">First rules</span>
          <div className="px-2 py-0.5 rounded-full border border-white/20 text-[10px] uppercase">Team</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {rules.map((rule, index) => (
          <RuleCard key={rule.id} rule={rule} index={index} />
        ))}
      </div>
    </section>
  );
}
