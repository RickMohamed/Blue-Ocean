import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const classes = [
  {
    id: "01",
    title: "Sharks",
    desc: "A space where you can explore your creativity",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Fish",
    desc: "Come with us and be part of this adventure",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Whales",
    desc: "Share a warm moment with us",
    image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2073&auto=format&fit=crop"
  }
];

function ClassCard({ item, index }: { item: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative aspect-square rounded-3xl cursor-pointer perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-3xl overflow-hidden"
      >
        <motion.div 
          style={{ scale: 1.1, transform: "translateZ(-20px)" }}
          className="absolute inset-0"
        >
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </motion.div>
      </div>

      {/* Content */}
      <div 
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 p-8 flex flex-col justify-between items-center text-center z-10 pointer-events-none"
      >
        <div className="w-full pt-4">
          <div className="w-full h-[1px] bg-white/20 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
        
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-4xl font-bold mb-2 drop-shadow-lg">{item.title}</h3>
          <p className="text-xs text-white/80 max-w-[180px] mx-auto leading-relaxed font-medium drop-shadow-md">
            {item.desc}
          </p>
        </div>

        <div className="font-serif italic text-3xl text-white/40 group-hover:text-white transition-colors duration-300">
          {item.id}
        </div>
      </div>
    </motion.div>
  );
}

export default function Classes() {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto perspective-1000">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {classes.map((item, index) => (
          <ClassCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
