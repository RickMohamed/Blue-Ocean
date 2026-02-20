import { motion } from 'framer-motion';

export default function Join() {
  return (
    <section className="relative py-32 px-4 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center perspective-1000">
      {/* Background Coral/Ocean Floor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1546500840-ae38253aba9b?q=80&w=2000&auto=format&fit=crop" 
          alt="Coral Reef" 
          className="w-full h-full object-cover opacity-40 [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000510] via-[#000510]/90 to-transparent" />
      </div>

      {/* Portal Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-cyan-500/20"
            style={{ 
              width: `${100 - i * 20}%`, 
              height: `${100 - i * 20}%`,
              left: `${i * 10}%`,
              top: `${i * 10}%`,
              borderStyle: i % 2 === 0 ? 'solid' : 'dashed'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <h2 className="text-6xl md:text-8xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          DON'T MISS IT
        </h2>
        <h3 className="text-4xl md:text-6xl font-light mb-8 text-cyan-200 font-serif italic">
          Join us
        </h3>
        
        <p className="text-white/70 mb-12 max-w-md mx-auto text-lg">
          Don't miss our first release, what are you waiting for, join us
        </p>

        <div className="flex gap-4 justify-center">
          {[1, 2, 3, 4].map((dot, i) => (
            <motion.div 
              key={dot}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`w-3 h-3 rounded-full ${dot === 1 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between text-[10px] uppercase tracking-widest text-white/30 z-20 mix-blend-plus-lighter">
        <span>© 2025 Blue Ocean</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-cyan-300 transition-colors hover:scale-110 inline-block">Instagram</a>
          <a href="#" className="hover:text-cyan-300 transition-colors hover:scale-110 inline-block">Twitter</a>
        </div>
      </div>
    </section>
  );
}
