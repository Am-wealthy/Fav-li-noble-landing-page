import React, { useState } from 'react';
import officialLogo from '../assets/images/official_logo.png';
import officialLogoJpg from '../assets/images/official_logo.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPulse?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'w-10 h-10 sm:w-11 sm:h-11',
  size = 'md',
  showPulse = true,
}) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  const sources = [
    'https://i.postimg.cc/yxdv9wtQ/FAV-LI-NOBLE-Logo-Cosmic-Portal.png',
    officialLogo,
    officialLogoJpg,
    '/official_logo.png',
    '/official_logo.jpg'
  ];

  const handleError = () => {
    if (imgIndex < sources.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      {!hasError ? (
        <img
          src={sources[imgIndex]}
          alt="Fav Li$ Noble Logo"
          onError={handleError}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover rounded-xl border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
        />
      ) : (
        /* Bulletproof Stylized Quantum Shield Emblem Fallback */
        <div className="w-full h-full rounded-xl border border-cyan-400/60 bg-gradient-to-br from-cyan-950 via-slate-900 to-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] p-1.5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
          <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 fill-current drop-shadow-[0_0_8px_#06b6d4]">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="6" />
            <polygon points="50,22 78,38 78,62 50,78 22,62 22,38" fill="rgba(6, 182, 212, 0.25)" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="12" fill="#06b6d4" />
            <path d="M50 22 L50 78 M22 50 L78 50" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
          </svg>
        </div>
      )}

      {showPulse && (
        <>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping pointer-events-none" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full pointer-events-none" />
        </>
      )}
    </div>
  );
};
