import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function LogoLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 500);
    const timer2 = setTimeout(() => setPhase(2), 1500);
    const timer3 = setTimeout(() => onComplete(), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="relative w-64 md:w-96 p-4">
        {/* Glitch layers */}
        <motion.div
          className="absolute inset-0 z-0 opacity-50"
          animate={{
            x: phase === 1 ? [-5, 5, -5, 2, -2, 0] : 0,
            y: phase === 1 ? [2, -2, 2, 0] : 0,
            filter: "hue-rotate(90deg) brightness(2)",
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <img src="/images/rage_logo_uploaded.png" alt="" className="w-full h-auto object-contain" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 z-0 opacity-50"
          animate={{
            x: phase === 1 ? [5, -5, 5, -2, 2, 0] : 0,
            y: phase === 1 ? [-2, 2, -2, 0] : 0,
            filter: "hue-rotate(-90deg) brightness(2)",
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <img src="/images/rage_logo_uploaded.png" alt="" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Main logo */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: phase === 2 ? [1, 1.1, 0.9, 0] : 1,
            opacity: phase === 2 ? 0 : 1,
            filter: phase === 1 ? [
              "drop-shadow(0 0 10px #ff007f)",
              "drop-shadow(0 0 20px #a3ff00)",
              "drop-shadow(0 0 10px #ff007f)"
            ] : "drop-shadow(0 0 10px #ff007f)"
          }}
          transition={{ duration: 0.5 }}
        >
          <img src="/images/rage_logo_uploaded.png" alt="Rage Media" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Neon glow */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-20 pointer-events-none flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-full h-full max-h-48 bg-rage-pink rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
