import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ParticleTopology, ParticleTheme } from './ParticleBackground';

interface HeaderHUDProps {
  topology: ParticleTopology;
  theme: ParticleTheme;
  audioEnabled: boolean;
  activePage: 'landing' | 'about' | 'projects' | 'lab';
  onSelectPage: (page: 'landing' | 'about' | 'projects' | 'lab') => void;
  onToggleAudio: () => void;
  onTriggerShockwave: () => void;
  onOpenTerminal: () => void;
  onOpenSpecsModal: () => void;
  onOpenContactModal: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  activePage,
  onSelectPage,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [fps, setFps] = useState<number>(60);

  // UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().replace('T', ' // ').substring(0, 22) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple FPS Monitor
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 md:px-8 py-3.5 backdrop-blur-lg bg-[#030508]/80 border-b border-white/10 ease-out-expo transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & System Status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 sm:w-11 sm:h-11 cursor-pointer" showPulse={true} />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span aria-label="Fav Lis Noble Tech Company" className="font-unbounded font-black text-xs sm:text-sm md:text-base tracking-wider text-white uppercase whitespace-nowrap">
                  FAV LI$ <span className="text-cyan-400">NOBLE</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-space font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 rounded">
                  TECH CO.
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-space text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                QUANTUM CORE // FLN-9840
              </p>
            </div>
          </div>
        </div>

        {/* Page Switcher Navigation Tabs */}
        <nav aria-label="Primary navigation" className="w-full md:w-auto flex items-center justify-center p-1 rounded-2xl bg-black/70 border border-white/10 text-[11px] sm:text-xs font-space overflow-x-auto gap-0.5">
          <button
            onClick={() => onSelectPage('landing')}
            className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
              activePage === 'landing'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => onSelectPage('about')}
            className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
              activePage === 'about'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ABOUT
          </button>
          <button
            onClick={() => onSelectPage('projects')}
            className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
              activePage === 'projects'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SEE PROJECTS
          </button>
          <button
            onClick={() => onSelectPage('lab')}
            className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold uppercase transition-all whitespace-nowrap ${
              activePage === 'lab'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            MATRIX LAB
          </button>
        </nav>

      </div>
    </header>
  );
};
