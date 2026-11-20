import React from 'react';
import { Logo } from './Logo';
import { ArrowUp, Shield, Terminal, Compass, Mail, Globe, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface FooterProps {
  onOpenTerminal?: () => void;
  onOpenSpecsModal?: () => void;
  onOpenContactModal?: () => void;
  onSelectPage?: (page: 'landing' | 'about' | 'projects' | 'lab') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerminal,
  onOpenSpecsModal,
  onOpenContactModal,
  onSelectPage,
}) => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full px-4 md:px-8 py-12 border-t border-white/10 bg-[#030508]/90 backdrop-blur-xl mt-12 font-space">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Banner Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10 sm:w-11 sm:h-11" showPulse={true} />
              <div className="flex items-center gap-2">
                <h2 className="font-unbounded font-black text-xl sm:text-2xl text-white tracking-wider uppercase">
                  FAV LI$ <span className="text-cyan-400">NOBLE</span> TECH CO.
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-space font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded">
                  VERIFIED
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              MANUFACTURING PHYSICAL QUANTUM SUBSTRATES AND HIGH-PERFORMANCE WEBSITES FOR THE NEXT EPOCH OF INTELLIGENCE.
            </p>
          </div>

          {/* Quick Actions in Footer */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenTerminal && (
              <button
                onClick={() => { playClickSound(); onOpenTerminal(); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 text-xs font-bold uppercase transition-all"
              >
                <Terminal size={14} />
                <span>CONSOLE</span>
              </button>
            )}

            {onOpenSpecsModal && (
              <button
                onClick={() => { playClickSound(); onOpenSpecsModal(); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase transition-all"
              >
                <Compass size={14} />
                <span>DECK</span>
              </button>
            )}

            {onOpenContactModal && (
              <button
                onClick={() => { playClickSound(); onOpenContactModal(); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Mail size={14} />
                <span>BRIEF</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <span>TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Navigation Page View Links */}
        {onSelectPage && (
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-mono font-bold uppercase">
            <span className="text-slate-500 text-[10px] tracking-widest mr-2">NAVIGATION //</span>
            <button
              onClick={() => { playClickSound(); onSelectPage('landing'); }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all"
            >
              HOME / LANDING
            </button>
            <button
              onClick={() => { playClickSound(); onSelectPage('about'); }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all"
            >
              ABOUT PAGE
            </button>
            <button
              onClick={() => { playClickSound(); onSelectPage('projects'); }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all"
            >
              PROJECTS DONE
            </button>
            <button
              onClick={() => { playClickSound(); onSelectPage('lab'); }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all"
            >
              QUANTUM MATRIX LAB
            </button>
          </div>
        )}

        {/* Bottom Links Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <Shield size={14} className="text-cyan-400 shrink-0" />
            <span>&copy; {new Date().getFullYear()} FAV LI$ NOBLE TECH COMPANY. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-[11px] sm:text-xs">
            <span className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap">QUANTUM PROTOCOL</span>
            <span className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap">PRIVACY MATRIX</span>
            <span className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap">ENTANGLEMENT LOGS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

