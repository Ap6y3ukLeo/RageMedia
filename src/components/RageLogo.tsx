import React from 'react';

interface RageLogoProps {
  className?: string;
}

export default function RageLogo({ className = "" }: RageLogoProps) {
  return (
    <div className={`relative select-none flex items-center ${className}`}>
      <img 
        src="/images/rage_logo_uploaded.png" 
        alt="Rage Media Logo" 
        className="h-9 sm:h-11 w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
