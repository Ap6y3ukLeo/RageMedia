import React from 'react';
import { motion } from 'motion/react';

export default function TornStrip() {
  return (
    <div className="relative w-full overflow-hidden py-16 md:py-20 select-none bg-rage-brand my-12 transform rotate-1 flex items-center justify-center">
      
      {/* Top Torn Edge Mask (Paints black jagged geometry on top of green background) */}
      <div className="absolute top-0 inset-x-0 h-8 z-10 select-none pointer-events-none transform translate-y-[-1px]">
        <svg
          className="w-full h-full fill-black text-black"
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 0 
                   L 1440 0 
                   L 1440 24 
                   L 1410 12 L 1385 28 L 1360 8 L 1332 24 L 1310 4 L 1280 20 L 1255 10 L 1222 26 L 1200 6 L 1170 18 L 1145 4 L 1115 22 L 1088 12 L 1050 26 L 1030 8 L 998 22 L 975 10 L 944 26 L 910 6 L 888 20 L 850 4 L 825 24 L 802 10 L 777 22 L 748 6 L 715 20 L 688 8 L 660 26 L 635 12 L 602 24 L 577 6 L 550 20 L 522 10 L 490 26 L 465 6 L 433 18 L 405 8 L 377 24 L 350 12 L 320 28 L 295 10 L 266 22 L 238 6 L 210 20 L 180 8 L 155 24 L 122 10 L 98 22 L 66 6 L 44 20 L 15 4 
                   L 0 24 
                   Z" />
        </svg>
      </div>

      {/* Bottom Torn Edge Mask (Paints black jagged geometry on bottom of green background) */}
      <div className="absolute bottom-0 inset-x-0 h-8 z-10 select-none pointer-events-none transform translate-y-[1px]">
        <svg
          className="w-full h-full fill-black text-black"
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 32 
                   L 1440 32 
                   L 1440 8 
                   L 1420 22 L 1395 10 L 1365 26 L 1340 8 L 1312 22 L 1290 6 L 1260 20 L 1235 8 L 1202 24 L 1180 10 L 1150 22 L 1125 6 L 1095 24 L 1068 10 L 1040 22 L 1015 8 L 988 24 L 965 10 L 934 26 L 910 8 L 888 22 L 850 6 L 825 24 L 802 12 L 777 24 L 748 10 L 715 26 L 688 12 L 660 26 L 635 8 L 602 22 L 577 10 L 550 24 L 522 12 L 490 26 L 465 8 L 433 22 L 405 10 L 377 24 L 350 12 L 320 28 L 295 8 L 266 22 L 238 10 L 210 24 L 180 12 L 155 26 L 122 8 L 98 22 L 66 10 L 44 24 L 15 8 
                   L 0 20 
                   Z" />
        </svg>
      </div>

      {/* Repeating background strip rotation structure for depth */}
      <div className="container mx-auto px-6 py-2 flex items-center justify-center relative">
        <div className="text-center font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-black uppercase tracking-tight leading-none select-none relative max-w-[90%] flex flex-wrap items-center justify-center gap-2">
          
          <span className="opacity-90">ПОКА ДРУГИЕ ПРОСТО СУЩЕСТВУЮТ</span>
          <span className="opacity-90">МЫ ДЕЛАЕМ</span>
          
          {/* Highlighted text "РАЗНИЦУ" wrapped in custom pen circle SVG */}
          <span className="relative inline-block px-4 py-1.5 font-sans font-black text-black">
            РАЗНИЦУ
            <svg
              className="absolute inset-0 w-full h-full text-rage-pink pointer-events-none"
              viewBox="0 0 160 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse 
                cx="80" 
                cy="27" 
                rx="74" 
                ry="22" 
                stroke="#FF007A" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeDasharray="500"
                strokeDashoffset="0"
                className="animate-[dash_1.5s_ease-out_infinite]"
              />
              <path 
                d="M 145 10 C 130 18, 120 42, 142 45 C 148 40, 150 12, 118 20" 
                stroke="#FF007A" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
