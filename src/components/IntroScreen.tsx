import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { playChargePulse, playShockwaveSound, initAudio } from '../utils/audio';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastAudioTime = useRef<number>(0);

  // Compact celestial moon circle dimensions
  const size = 210;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const progressRef = useRef(0);

  // Handle hold progress loop
  useEffect(() => {
    let active = true;

    const update = () => {
      if (!active) return;

      if (isHolding && !isExploding) {
        const next = Math.min(100, progressRef.current + 2.5);
        progressRef.current = next;
        setProgress(next);

        // Audio feedback pulse every 80ms
        const now = Date.now();
        if (now - lastAudioTime.current > 80) {
          playChargePulse(next);
          lastAudioTime.current = now;
        }

        if (next >= 100) {
          setIsExploding(true);
          playShockwaveSound();
          if (navigator.vibrate) {
            try {
              navigator.vibrate([100, 50, 200]);
            } catch (e) {}
          }
          setTimeout(() => {
            onComplete();
          }, 500);
          return;
        }
        requestRef.current = requestAnimationFrame(update);
      } else if (!isHolding && !isExploding) {
        if (progressRef.current > 0) {
          const next = Math.max(0, progressRef.current - 6);
          progressRef.current = next;
          setProgress(next);
          if (next > 0) {
            requestRef.current = requestAnimationFrame(update);
          }
        }
      }
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      active = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHolding, isExploding, onComplete]);

  const handleStartHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    initAudio();
    setIsHolding(true);
  };

  const handleEndHold = () => {
    if (!isExploding) {
      setIsHolding(false);
    }
  };

  // Vibration visual jitter calculation based on progress
  const jitterX = isHolding ? (Math.random() - 0.5) * (progress / 8) : 0;
  const jitterY = isHolding ? (Math.random() - 0.5) * (progress / 8) : 0;

  return (
    <div
      className={`fixed inset-0 z-50 bg-transparent flex flex-col items-center justify-between p-6 select-none overflow-hidden font-space transition-all duration-700 ${
        isExploding ? 'scale-125 opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Distant Celestial Moon Halo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-r from-cyan-500/20 via-teal-400/10 to-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Celestial View Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 my-auto pt-6">
        
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.3)] animate-fadeIn">
          <Logo className="w-9 h-9" showPulse={true} />
          <div className="text-left">
            <h2 className="font-unbounded font-black text-xs sm:text-sm text-white tracking-wider uppercase">
              FAV LI$ <span className="text-cyan-400">NOBLE</span>
            </h2>
            <p className="text-[9px] font-mono text-cyan-300/80 uppercase tracking-widest">
              QUANTUM SYSTEM // ONLINE
            </p>
          </div>
        </div>

        {/* The Distant Glowing Moon Circle */}
        <div
          onMouseDown={handleStartHold}
          onMouseUp={handleEndHold}
          onMouseLeave={handleEndHold}
          onTouchStart={handleStartHold}
          onTouchEnd={handleEndHold}
          style={{
            transform: `translate(${jitterX}px, ${jitterY}px) scale(${1 + (progress / 100) * 0.08})`,
          }}
          className={`relative cursor-pointer transition-transform duration-75 ease-out rounded-full flex items-center justify-center group ${
            isHolding
              ? 'shadow-[0_0_90px_rgba(6,182,212,0.9)]'
              : 'shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:shadow-[0_0_70px_rgba(6,182,212,0.6)]'
          }`}
        >
          {/* Outer Celestial Ring SVG */}
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Orbital Ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active Glowing Moon Progress Arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#moonGlowGradient)"
              strokeWidth={strokeWidth + 2}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75 ease-linear"
            />
            <defs>
              <linearGradient id="moonGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          {/* Celestial Moon Core */}
          <div className="absolute inset-2.5 rounded-full bg-gradient-to-b from-[#0a1224]/90 via-[#050914]/90 to-[#02040a]/95 border border-cyan-400/40 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center overflow-hidden shadow-[inset_0_0_25px_rgba(6,182,212,0.35)]">
            
            {/* FLN Pill */}
            <div className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 mb-1">
              <Sparkles size={9} className="animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
              <span>FLN TECH</span>
            </div>

            {/* Compact Brand Title Perfectly Fitted Inside Circle */}
            <h1 className="font-unbounded font-black text-xs sm:text-sm text-white tracking-wider uppercase leading-tight drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
              FAV LI$<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300">
                NOBLE
              </span>
            </h1>

            {/* Holding Action Feedback */}
            <div className="mt-1.5">
              {isHolding ? (
                <span className="text-[9px] font-mono font-bold text-emerald-300 uppercase tracking-widest flex items-center justify-center gap-1 animate-pulse">
                  <Zap size={10} />
                  {Math.floor(progress)}%
                </span>
              ) : (
                <span className="text-[9px] font-mono text-cyan-300/80 uppercase tracking-wider flex items-center justify-center gap-1 group-hover:text-cyan-200 transition-colors">
                  <Lock size={10} />
                  HOLD OR CLICK
                </span>
              )}
            </div>

          </div>
        </div>

        {/* User Interaction & Instant Enter Buttons */}
        <div className="text-center space-y-3 max-w-xs pt-1">
          <p className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>HOLD MOON OR TAP TO ENTER</span>
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playShockwaveSound();
              onComplete();
            }}
            className="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap size={14} className="fill-current shrink-0" />
            <span className="text-[11px] sm:text-xs">WELCOME TO FAV LI$ NOBLE TECH COMPANY</span>
          </button>
        </div>

      </div>

      {/* Silhouette of a person looking at the far away moon */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full pt-4">
        <svg width="120" height="70" viewBox="0 0 120 70" fill="none" className="opacity-90">
          {/* Cosmic Horizon Hill Line */}
          <path d="M0 65 Q 60 55 120 65 L 120 70 L 0 70 Z" fill="#080c16" />
          
          {/* Silhouette Person Standing Looking Up */}
          {/* Head */}
          <circle cx="60" cy="38" r="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="0.75" />
          {/* Body/Shoulders */}
          <path d="M 53 62 L 56 46 Q 60 44 64 46 L 67 62 Z" fill="#0f172a" stroke="#22d3ee" strokeWidth="0.75" />
          
          {/* Subtle Starlight Ray pointing up to the moon */}
          <line x1="60" y1="34" x2="60" y2="10" stroke="rgba(34,211,238,0.2)" strokeDasharray="2 2" />
        </svg>

        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest -mt-1">
          FAV LI$ NOBLE TECH CO.
        </p>
      </div>

    </div>
  );
};

