import React from 'react';
import { Shield, CheckCircle2, Cpu, Globe, Zap, Compass, Mail, Terminal, Award, Users, Activity, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

const nobleCodesImg = 'https://i.postimg.cc/QHP7WzLG/img-2-1785254405271.jpg';
const lishanNobleImg = 'https://i.postimg.cc/CzdD5g20/img-5-1785254570606.jpg';
const jaxenDollarImg = 'https://i.postimg.cc/QHP7WzLZ/img-4-1785254561774.jpg';

interface AboutPageProps {
  onOpenContactModal: () => void;
  onOpenSpecsModal: () => void;
  onOpenTerminal: () => void;
  onGoToProjects: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenContactModal,
  onOpenSpecsModal,
  onOpenTerminal,
  onGoToProjects,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-space">
      
      {/* Hero Header */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#080d1a]/90 via-[#030508]/90 to-[#030508] border border-cyan-500/30 text-center space-y-6 relative overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)]">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <Shield size={14} className="text-cyan-400 animate-pulse" />
          <span>ABOUT FAV LIS NOBLE TECH COMPANY</span>
        </div>

        <h1 className="font-unbounded font-black text-3xl sm:text-5xl text-white tracking-wider uppercase leading-tight">
          FAV LIS NOBLE TECH COMPANY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">QUANTUM STANDARD</span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          At Fav Lis Noble Tech Company, we engineer mobile applications for iOS and Android, custom web applications, modern websites, and artificial intelligence automation solutions designed to solve real-world business problems and drive measurable growth.
        </p>

        {/* Quick Metrics Bar */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left border-t border-white/10 mt-6 max-w-4xl mx-auto">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">SUB-ATOMIC YIELD</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-cyan-300">99.84%</div>
            <div className="text-[10px] text-slate-400">Pure lattice purity</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">GLOBAL EDGE MESH</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-teal-300">128.4 TB/S</div>
            <div className="text-[10px] text-slate-400">Data throughput</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">PROJECTS DELIVERED</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-emerald-300">50+ APPS</div>
            <div className="text-[10px] text-slate-400">100/100 Performance</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">LATENCY</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-purple-300">0.003ms</div>
            <div className="text-[10px] text-slate-400">Zero-point response</div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 rounded-3xl bg-[#080d1a]/80 border border-cyan-500/20 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-400 text-xs font-mono">
              <Sparkles size={14} />
              <span>THE NOBLE MANIFESTO</span>
            </div>

            <h2 className="font-unbounded font-black text-xl sm:text-2xl text-white leading-snug">
              "INNOVATIVE WEB SOLUTIONS ENGINEERED FOR GLOBAL IMPACT."
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              At Fav Lis Noble Tech Company, we build custom mobile apps, scalable web applications, and AI-powered automation systems designed to solve real-world problems and accelerate digital transformation.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Sovereign atomic electron spin memory matrices with infinite read/write cycles</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Custom high-speed responsive web applications and 3D WebGL interfaces</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero-point fluctuation energy harvesting arrays with 99.84% sub-atomic yield</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onGoToProjects}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-unbounded font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Cpu size={16} />
              <span>VIEW PROJECTS DONE</span>
            </button>
            <button
              onClick={onOpenSpecsModal}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase transition-all"
            >
              <Compass size={16} />
              <span>SPECIFICATION DECK</span>
            </button>
          </div>
        </div>

        {/* Executive Founders Section */}
        <div className="p-8 rounded-3xl bg-[#080c16] border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-400/30 text-purple-300 text-xs font-mono">
              <Users size={14} />
              <span>EXECUTIVE LEADERSHIP & FOUNDERS</span>
            </div>

            <h2 className="font-unbounded font-black text-2xl text-white">
              PIONEERING ARCHITECTS
            </h2>

            <div className="space-y-4">
              {/* Founder 1: Noble Codes */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                <img
                  src={nobleCodesImg}
                  alt="Noble Codes, Chief Quantum Architect and AI Systems Engineer at Fav Lis Noble Tech Company"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0"
                />
                <div className="space-y-1">
                  <div className="font-unbounded font-bold text-sm text-cyan-300">NOBLE CODES</div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase">CHIEF QUANTUM ARCHITECT</div>
                  <p className="text-xs text-slate-300 pt-1">
                    Pioneered sub-atomic particle containment algorithms and thermal boundary elimination models.
                  </p>
                </div>
              </div>

              {/* Founder 2: Lady Lishan Noble */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                <img
                  src={lishanNobleImg}
                  alt="Lady Lishan Noble, VP of Global Cloud Infrastructure at Fav Lis Noble Tech Company"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0"
                />
                <div className="space-y-1">
                  <div className="font-unbounded font-bold text-sm text-emerald-300">LADY LISHAN NOBLE</div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase">VP OF GLOBAL INFRASTRUCTURE</div>
                  <p className="text-xs text-slate-300 pt-1">
                    Architect of zero-point mesh telemetry networks and high-throughput global server routing.
                  </p>
                </div>
              </div>

              {/* Founder 3: Jaxen $ */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                <img
                  src={jaxenDollarImg}
                  alt="Jaxen, Head of Mobile App, Web Application, and Frontend Labs at Fav Lis Noble Tech Company"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0"
                />
                <div className="space-y-1">
                  <div className="font-unbounded font-bold text-sm text-amber-300">JAXEN $</div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase">HEAD OF SOFTWARE & WEB LABS</div>
                  <p className="text-xs text-slate-300 pt-1">
                    Leads frontend WebGL 3D design, high-frequency WebSockets, and 100/100 Lighthouse web platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenContactModal}
              className="w-full py-3.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>CONTACT LEADERSHIP</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#080c16] border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">OUR CORE VALUES</span>
            <h2 className="font-unbounded font-black text-xl sm:text-2xl text-white">WHY CHOOSE US</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-400/40 transition-colors">
            <h3 className="text-sm font-unbounded font-bold text-cyan-300">Agile & Nimble</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-space">
              We adapt swiftly to shifting market trends, ensuring your business always stays ahead of the curve.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-teal-400/40 transition-colors">
            <h3 className="text-sm font-unbounded font-bold text-teal-300">Innovation-Driven</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-space">
              Our team continuously integrates emerging technologies to keep your products relevant and competitive.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-purple-400/40 transition-colors">
            <h3 className="text-sm font-unbounded font-bold text-purple-300">Client-Centric Focus</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-space">
              We work closely with you as a dedicated growth partner, aligning our technical strategy with your commercial vision.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
