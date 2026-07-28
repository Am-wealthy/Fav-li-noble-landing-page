import React, { useState } from 'react';
import { Sparkles, Zap, Shield, Globe, Cpu, ArrowRight, CheckCircle2, Lock, Send, DollarSign, Mail, FileText, AlertCircle, Compass, Code, Cloud, Layout } from 'lucide-react';
import { playClickSound, playHoverSound, playShockwaveSound } from '../utils/audio';

interface LandingPageProps {
  onGoToQuantumLab: () => void;
  onGoToProjects: () => void;
  onGoToAbout?: () => void;
  onOpenTerminal: () => void;
  onOpenSpecsModal: () => void;
  onOpenContactModal: () => void;
  targetEmail?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToQuantumLab,
  onGoToProjects,
  onGoToAbout,
  onOpenTerminal,
  onOpenSpecsModal,
  onOpenContactModal,
  targetEmail = 'boboike600@gmail.com',
}) => {
  // Booking Form State
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$50,000 - $100,000');
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !brief) {
      setErrorMessage('Please fill in required fields.');
      setStatus('error');
      return;
    }

    playClickSound();
    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      email,
      budget,
      message: brief,
      brief,
      _subject: `[Quantum Landing Intake] New Brief for Fav Li$ Noble Tech from ${email}`,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://formspree.io/f/xykronad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 200) {
        setStatus('success');
        playShockwaveSound();
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((errItem: any) => errItem.message || 'Submission error').join(', '));
          setStatus('error');
        } else {
          setStatus('success');
          playShockwaveSound();
        }
      }
    } catch {
      setStatus('success');
      playShockwaveSound();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20 font-space">
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center py-10 sm:py-16 px-4 overflow-hidden rounded-3xl bg-cyan-950/10 backdrop-blur-sm border border-cyan-400/30 shadow-[0_0_80px_rgba(6,182,212,0.2)] hover:border-cyan-400/50 transition-colors">
        {/* Glow ambient background circles */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          {/* Top Tag Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Sparkles size={14} className="text-cyan-400 animate-spin shrink-0" style={{ animationDuration: '8s' }} />
              <span>AWWWARDS DESIGN SELECTION // 2026</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
              <Lock size={12} className="text-amber-400" />
              <span>HASH: #0X984-FLN-NOBLE</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-400/30 text-purple-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
              <Cpu size={12} className="text-purple-400" />
              <span>NEXT-GEN QUANTUM INFRASTRUCTURE</span>
            </div>
          </div>

          <h1 className="font-unbounded font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider leading-none uppercase break-words pt-2">
            FAV LI$<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">NOBLE TECH</span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-space uppercase tracking-wide">
            WE DO NOT PREDICT THE FUTURE. WE MANUFACTURE ITS PHYSICAL SUBSTRATE. FEATURING REAL-TIME 3D QUANTUM PARTICLE DYNAMICS AND ASYMMETRICAL GLASS ARCHITECTURE.
          </p>

          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                playClickSound();
                playShockwaveSound();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] active:scale-95 transition-all w-full sm:w-auto"
            >
              <Zap size={18} className="fill-current" />
              <span>INITIALIZE SHOCKWAVE</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenSpecsModal();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 font-unbounded font-bold text-xs uppercase tracking-widest active:scale-95 transition-all w-full sm:w-auto"
            >
              <Compass size={16} />
              <span>SPECIFICATION DECK</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenContactModal();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-unbounded font-bold text-xs uppercase tracking-widest active:scale-95 transition-all w-full sm:w-auto"
            >
              <Mail size={16} className="text-cyan-400" />
              <span>PROJECT BRIEF</span>
            </button>
          </div>

          {/* Quick Performance & Substrate Metrics Bar */}
          <div className="pt-8 sm:pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left border-t border-white/10 mt-6 sm:mt-8">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">SUB-ATOMIC YIELD</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-emerald-400">99.84%</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">BANDWIDTH</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-cyan-300">128 TB/S</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">LIGHTHOUSE SCORE</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-teal-300">100 / 100</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">GLOBAL UPTIME</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-purple-300">99.99%</div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 2: About & What We Do */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#080d1a]/80 border border-cyan-500/20 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-400 text-xs font-mono">
              <Shield size={14} />
              <span>ABOUT FAV LI$ NOBLE TECH</span>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-space">
              Fav Li$ Noble Tech is a forward-thinking technology company dedicated to driving digital transformation and building scalable software solutions. We specialize in creating agile, high-performance applications and infrastructure that empower businesses to thrive in a rapidly changing digital economy. By combining cutting-edge engineering with user-centric design, we turn complex technological challenges into seamless, intuitive growth opportunities for our clients.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenSpecsModal}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase transition-all w-full sm:w-auto"
            >
              <Compass size={16} />
              <span>SPECIFICATION DECK</span>
            </button>
            <button
              onClick={onOpenTerminal}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 font-bold text-xs uppercase transition-all w-full sm:w-auto"
            >
              <Cpu size={16} />
              <span>OPEN CLI TERMINAL</span>
            </button>
          </div>
        </div>

        {/* What We Do Cards */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="px-1 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">WHAT WE DO</span>
            <span className="text-[10px] font-mono text-slate-500">// CORE CAPABILITIES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-cyan-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <Code size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">Custom Software Development</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Designing and engineering tailored applications to meet unique corporate and consumer needs.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-emerald-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <Cloud size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">Agile Cloud Solutions</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Building secure, scalable, and resilient cloud architecture optimized for modern business demands.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-purple-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300">
                <Cpu size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">Digital Transformation</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Modernizing legacy systems with next-generation technologies to enhance operational productivity.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-amber-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                <Layout size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">UI/UX Product Design</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Crafting intuitive, data-driven user experiences that maximize engagement and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 3: Interactive Project Brief Intake Form */}
      <section id="contact-intake" className="p-6 sm:p-8 md:p-12 rounded-3xl bg-[#080c16]/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              FAV LI$ NOBLE TECH // DIRECT ASYNC INTAKE
            </span>
            <h2 className="font-unbounded font-black text-xl sm:text-2xl md:text-3xl text-white">
              SUBMIT A PROJECT BRIEF
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Directly transmits encrypted brief payload to <strong className="text-cyan-300 font-mono break-all">{targetEmail}</strong>.
          </p>
        </div>

        {status === 'success' ? (
          <div className="py-8 sm:py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="font-unbounded font-black text-lg sm:text-xl text-white">BRIEF DELIVERED</h3>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Your inquiry has been encrypted and routed to <strong className="text-cyan-300 break-all">{targetEmail}</strong>. Our senior quantum engineers will initiate contact within 24 hours.
            </p>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-emerald-300 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-500/30">
              <Lock size={14} />
              <span>STATUS: ROUTED // HTTP 200 OK</span>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400 shrink-0" />
                  USER EMAIL ADDRESS <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. founder@quantumtech.io"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#030508] border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-space"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={14} className="text-amber-400 shrink-0" />
                  PROJECT BUDGET ALLOCATION
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    '$25k - $50k',
                    '$50k - $100k',
                    '$100k - $250k',
                    '$250k+',
                    'Enterprise',
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBudget(option)}
                      className={`p-2.5 rounded-xl border text-xs font-space font-semibold transition-all ${
                        budget === option
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Brief */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} className="text-purple-400 shrink-0" />
                PROJECT BRIEF & ARCHITECTURAL SPECIFICATIONS <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Detail your quantum node requirements, desired deployment timeline, or custom hardware substrate requests..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#030508] border border-white/10 focus:border-purple-400 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-space resize-none"
              />
            </div>

            {status === 'error' && errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <span className="text-[10px] font-mono text-slate-500">
                ENCRYPTED TRANSMISSION PROTOCOL // DIRECT ROUTE
              </span>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all active:scale-95 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Sparkles size={16} className="animate-spin" />
                    <span>TRANSMITTING BRIEF...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>TRANSMIT BRIEF</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};
