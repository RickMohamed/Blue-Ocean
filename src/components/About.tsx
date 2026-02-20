import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="relative py-32 px-4 flex flex-col items-center text-center overflow-hidden min-h-[60vh] justify-center">
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px] -z-10" 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto backdrop-blur-sm p-8 rounded-3xl border border-white/5 bg-black/20"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          A SPACE.
          <span className="block text-2xl md:text-3xl font-light mt-2 text-cyan-200">Unique and original</span>
        </h2>
        
        <p className="text-white/60 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          A space emerging from the depths of the ocean, designed for those who dare to explore the unknown.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 backdrop-blur-md text-sm uppercase tracking-widest hover:border-cyan-400/60 transition-colors shadow-[0_0_30px_rgba(8,145,178,0.2)] cursor-pointer"
        >
          Hakim Project
        </motion.button>
      </motion.div>
    </section>
  );
}
