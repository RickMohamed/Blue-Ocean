import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-exclusion"
    >
      <div className="w-full h-full rounded-full bg-white/80 blur-[2px]" />
      <div className="absolute inset-0 w-full h-full rounded-full bg-cyan-400/30 blur-[8px] animate-pulse" />
    </motion.div>
  );
}
