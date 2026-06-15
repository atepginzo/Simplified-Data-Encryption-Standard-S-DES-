import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 px-6">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative text-center">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[0.65rem] text-teal-400 uppercase tracking-[0.2em]">
            <span className="text-teal-600 mr-2">01 10</span> KRIPTOGRAFI SIMULATOR
          </span>
        </motion.div>

        <motion.h1
          className="font-header text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.05] uppercase tracking-tighter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="block text-base-50 drop-shadow-lg">SIMPLIFIED</span>
          <span className="block bg-gradient-to-r from-teal-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
            DATA ENCRYPTION
          </span>
          <span className="block text-base-50 drop-shadow-lg">STANDARD</span>
        </motion.h1>

        <motion.p
          className="font-body text-base text-base-400 mt-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Simulator interaktif untuk memahami setiap langkah algoritma S-DES secara visual mulai dari Key Generation, Jaringan Feistel, hingga Substitusi S-Box.
        </motion.p>
      </div>

      <div className="max-w-[1280px] mx-auto mt-16">
        <div className="as-divider" />
      </div>
    </section>
  );
}
