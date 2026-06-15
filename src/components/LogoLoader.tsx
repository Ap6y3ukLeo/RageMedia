import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

// Case-logos/talent lookup to style indicators
const LOG_MESSAGES = [
  "SYS_INIT: RAGE_MEDIA_PORTAL...",
  "HOOKING INFLUENCER API SURFACES...",
  "ESTABLISHING EXCLUSIVE TALENT CONNECTIONS...",
  "INJECTING MAXIMUM AUDIENCE ENGAGEMENT...",
  "STABILIZING CORE ENGINE...",
  "RAGE PORTAL READY."
];

export function LogoLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [randomGlitch, setRandomGlitch] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);

  // Simulate progress
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Simulate natural progressive steps
      const increment = Math.floor(Math.random() * 5) + 3; // 3 to 7
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        
        // Step 1: Intense final glitched vibration
        setGlitchActive(true);

        // Step 2: Fade out the loading content 400ms after hitting 100%
        setTimeout(() => {
          setShowWebsite(true);
        }, 400);

        // Step 3: Trigger exit split panels animation 800ms after hitting 100%
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Periodic random glitches during load
  useEffect(() => {
    if (progress === 100) return;
    const interval = setInterval(() => {
      setRandomGlitch(true);
      setTimeout(() => setRandomGlitch(false), 120);
    }, 550);
    return () => clearInterval(interval);
  }, [progress]);

  // Get active log message
  const getLogMessage = () => {
    if (progress < 20) return LOG_MESSAGES[0];
    if (progress < 45) return LOG_MESSAGES[1];
    if (progress < 65) return LOG_MESSAGES[2];
    if (progress < 85) return LOG_MESSAGES[3];
    if (progress < 100) return LOG_MESSAGES[4];
    return LOG_MESSAGES[5];
  };

  // Chromatic aberration glitch styles
  const logoAnimate = {
    x: glitchActive ? [-12, 12, -8, 8, -4, 4, 0] : (randomGlitch ? [-4, 4, -2, 2, 0] : 0),
    y: glitchActive ? [-6, 6, -3, 3, 0] : (randomGlitch ? [-2, 2, 0] : 0),
    skewX: glitchActive ? [-15, 15, -5, 5, 0] : (randomGlitch ? [-5, 5, 0] : 0),
    scale: glitchActive ? [1, 1.15, 0.9, 1.05, 1] : 1,
    filter: (glitchActive || randomGlitch)
      ? [
          "drop-shadow(-4px 0px 0px #FF007A) drop-shadow(4px 0px 0px #ACFF2A) brightness(1.3)",
          "drop-shadow(4px 0px 0px #FF007A) drop-shadow(-4px 0px 0px #ACFF2A) brightness(1.5)",
          "drop-shadow(0px 0px 20px rgba(172,255,42,0.6))"
        ]
      : "drop-shadow(0px 0px 12px rgba(255,0,122,0.25))"
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: [1, 1] }}
      transition={{ duration: 1.0 }}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none flex items-center justify-center bg-transparent"
    >
      {/* Top sliding panel */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ ease: [0.77, 0, 0.175, 1], duration: 0.9 }}
        className="absolute top-0 left-0 w-full h-[50vh] bg-black border-b border-white/5 flex flex-col justify-end overflow-hidden"
      >
        {/* Dark blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {/* Bottom Jagged edge mask for Top Panel */}
        <div className="absolute bottom-0 inset-x-0 h-6 z-20 pointer-events-none transform translate-y-[1px]">
          <svg className="w-full h-full fill-black text-black" viewBox="0 0 1440 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 0 L 1440 0 L 1440 20 L 1410 8 L 1385 22 L 1360 4 L 1332 18 L 1310 2 L 1280 16 L 1255 6 L 1222 20 L 1200 4 L 1170 14 L 1145 2 L 1115 18 L 1088 8 L 1050 20 L 1030 4 L 998 16 L 975 6 L 944 20 L 910 4 L 888 16 L 850 2 L 825 18 L 802 6 L 777 16 L 748 4 L 715 16 L 688 6 L 660 20 L 635 8 L 602 18 L 577 4 L 550 16 L 522 8 L 490 20 L 465 4 L 433 14 L 405 6 L 377 18 L 350 8 L 320 22 L 295 6 L 266 16 L 238 4 L 210 16 L 180 6 L 155 18 L 122 8 L 98 18 L 66 4 L 44 16 L 15 2 L 0 18 Z" />
          </svg>
        </div>
        {/* Neon pink offset jagged highlight */}
        <div className="absolute bottom-0 inset-x-0 h-7 z-10 pointer-events-none transform translate-y-[2.5px] opacity-70">
          <svg className="w-full h-full fill-rage-pink text-rage-pink" viewBox="0 0 1440 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 0 L 1440 0 L 1440 20 L 1410 8 L 1385 22 L 1360 4 L 1332 18 L 1310 2 L 1280 16 L 1255 6 L 1222 20 L 1200 4 L 1170 14 L 1145 2 L 1115 18 L 1088 8 L 1050 20 L 1030 4 L 998 16 L 975 6 L 944 20 L 910 4 L 888 16 L 850 2 L 825 18 L 802 6 L 777 16 L 748 4 L 715 16 L 688 6 L 660 20 L 635 8 L 602 18 L 577 4 L 550 16 L 522 8 L 490 20 L 465 4 L 433 14 L 405 6 L 377 18 L 350 8 L 320 22 L 295 6 L 266 16 L 238 4 L 210 16 L 180 6 L 155 18 L 122 8 L 98 18 L 66 4 L 44 16 L 15 2 L 0 18 Z" />
          </svg>
        </div>
      </motion.div>

      {/* Bottom sliding panel */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ ease: [0.77, 0, 0.175, 1], duration: 0.9 }}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-black border-t border-white/5 overflow-hidden"
      >
        {/* Dark blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {/* Top Jagged edge mask for Bottom Panel */}
        <div className="absolute top-0 inset-x-0 h-6 z-20 pointer-events-none transform -translate-y-[1px]">
          <svg className="w-full h-full fill-black text-black" viewBox="0 0 1440 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 24 L 1440 24 L 1440 4 L 1410 16 L 1385 2 L 1360 20 L 1332 6 L 1310 22 L 1280 8 L 1255 18 L 1222 4 L 1200 20 L 1170 10 L 1145 22 L 1115 6 L 1088 16 L 1050 4 L 1030 20 L 998 8 L 975 18 L 944 4 L 910 20 L 888 8 L 850 22 L 825 6 L 802 18 L 777 8 L 748 20 L 715 8 L 688 18 L 660 4 L 635 16 L 602 6 L 577 20 L 550 8 L 522 16 L 490 4 L 465 20 L 433 10 L 405 18 L 377 6 L 350 16 L 320 2 L 295 18 L 266 8 L 238 20 L 210 8 L 180 18 L 155 6 L 122 16 L 98 6 L 66 20 L 44 8 L 15 22 L 0 6 Z" />
          </svg>
        </div>
        {/* Neon green offset jagged highlight */}
        <div className="absolute top-0 inset-x-0 h-7 z-10 pointer-events-none transform -translate-y-[2.5px] opacity-70">
          <svg className="w-full h-full fill-rage-brand text-rage-brand" viewBox="0 0 1440 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 24 L 1440 24 L 1440 4 L 1410 16 L 1385 2 L 1360 20 L 1332 6 L 1310 22 L 1280 8 L 1255 18 L 1222 4 L 1200 20 L 1170 10 L 1145 22 L 1115 6 L 1088 16 L 1050 4 L 1030 20 L 998 8 L 975 18 L 944 4 L 910 20 L 888 8 L 850 22 L 825 6 L 802 18 L 777 8 L 748 20 L 715 8 L 688 18 L 660 4 L 635 16 L 602 6 L 577 20 L 550 8 L 522 16 L 490 4 L 465 20 L 433 10 L 405 18 L 377 6 L 350 16 L 320 2 L 295 18 L 266 8 L 238 20 L 210 8 L 180 18 L 155 6 L 122 16 L 98 6 L 66 20 L 44 8 L 15 22 L 0 6 Z" />
          </svg>
        </div>
      </motion.div>

      {/* Main loading interface overlay */}
      <AnimatePresence>
        {!showWebsite && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            className="absolute inset-0 z-[10000] flex flex-col items-center justify-center p-4 bg-transparent"
          >
            <div className="relative w-72 sm:w-96 flex flex-col items-center justify-center p-4">
              
              {/* Logo container with aberration glitches */}
              <div className="relative w-56 sm:w-64 mb-6">
                
                {/* Sketchy Star - pops at 30% */}
                <AnimatePresence>
                  {progress >= 30 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -40, opacity: 0 }}
                      animate={{ scale: 1, rotate: -15, opacity: 0.85 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-6 -left-8 z-20 pointer-events-none"
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    >
                      <svg viewBox="0 0 100 100" className="w-8 h-8 text-white drop-shadow-[0_0_8px_#ffffff]">
                        <path d="M 50 10 L 50 90 M 10 50 L 90 50 M 25 25 L 75 75 M 25 75 L 75 25" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Graffiti Crown - pops at 65% */}
                <AnimatePresence>
                  {progress >= 65 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20, y: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 12, y: 0, opacity: 0.9 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-10 right-2 z-20 pointer-events-none"
                      transition={{ type: "spring", stiffness: 280, damping: 12 }}
                    >
                      <svg viewBox="0 0 100 100" className="w-10 h-10 text-rage-brand drop-shadow-[0_0_10px_#ACFF2A]">
                        <path d="M 15 80 L 10 35 L 35 55 L 50 20 L 65 55 L 90 35 L 85 80 Z" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M 5 80 L 95 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sketchy Arrow - pops at 85% */}
                <AnimatePresence>
                  {progress >= 85 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -10, opacity: 0 }}
                      animate={{ scale: 1, rotate: 25, opacity: 0.95 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -bottom-8 -right-8 z-20 pointer-events-none"
                      transition={{ type: "spring", stiffness: 250, damping: 15 }}
                    >
                      <svg viewBox="0 0 100 100" className="w-12 h-12 text-rage-pink drop-shadow-[0_0_12px_#FF007A]">
                        {/* Curve tail */}
                        <path d="M 15 25 Q 35 15, 65 45 T 75 75" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                        {/* Arrow head */}
                        <path d="M 45 75 L 75 75 L 75 45" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
                  animate={{
                    x: randomGlitch ? [-6, 6, -3, 3, 0] : 0,
                    y: randomGlitch ? [3, -3, 0] : 0,
                    filter: "hue-rotate(110deg) saturate(2)"
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <img src="/images/rage_logo_uploaded.webp" alt="" className="w-full h-auto object-contain pointer-events-none" width={625} height={427} loading="eager" fetchPriority="high" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
                  animate={{
                    x: randomGlitch ? [6, -6, 3, -3, 0] : 0,
                    y: randomGlitch ? [-3, 3, 0] : 0,
                    filter: "hue-rotate(-110deg) saturate(2)"
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <img src="/images/rage_logo_uploaded.webp" alt="" className="w-full h-auto object-contain pointer-events-none" width={625} height={427} loading="eager" fetchPriority="high" />
                </motion.div>

                <motion.div
                  className="relative z-10"
                  animate={logoAnimate}
                  transition={{ duration: 0.2 }}
                >
                  <img src="/images/rage_logo_uploaded.webp" alt="Rage Media" className="w-full h-auto object-contain select-none" width={625} height={427} loading="eager" fetchPriority="high" />
                </motion.div>
              </div>

              {/* Large styled digital progress counter */}
              <div className="font-display font-black text-6xl tracking-tighter text-white flex items-baseline select-none mb-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <span className="w-20 text-right">{progress}</span>
                <span className="text-rage-pink text-3xl font-black ml-1">%</span>
              </div>

              {/* Segmented Loading Bar */}
              <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-rage-pink to-rage-brand rounded-full shadow-[0_0_10px_rgba(172,255,42,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Hacker console log typewriter readout */}
              <div className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-rage-brand mt-4 text-center min-h-[16px] drop-shadow-[0_0_8px_rgba(172,255,42,0.5)]">
                [ {getLogMessage()} ]
              </div>

              {/* Background radial ambient light behind the logo */}
              <motion.div
                className="absolute inset-0 blur-3xl opacity-15 pointer-events-none flex items-center justify-center -z-10"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.12, 0.25, 0.12]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <div className="w-80 h-80 bg-rage-pink rounded-full" />
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
